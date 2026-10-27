#!/usr/bin/env bash
# Inspect recent prod deployments, cancel stuck BUILDING/QUEUED ones on
# this team (they hold the single concurrent build slot), then alias the
# newest READY deployment to www.shrimd.com.
# Prints only deployment ids, states, and alias hostnames — no secrets.
set -euo pipefail

TOKEN="${VERCEL_TOKEN:?VERCEL_TOKEN is required}"
TEAM="${VERCEL_ORG_ID:?VERCEL_ORG_ID is required}"
PROJECT="${VERCEL_PROJECT_ID:?VERCEL_PROJECT_ID is required}"
API="https://api.vercel.com"
ALIAS="${PROD_ALIAS:-www.shrimd.com}"
POLL_SECONDS="${POLL_SECONDS:-90}"

api() {
  local method="$1"
  local path="$2"
  shift 2
  curl -sS -X "$method" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    "${API}${path}?teamId=${TEAM}" \
    "$@"
}

echo "Listing recent deployments for ${PROJECT}"
list="$(api GET "/v6/deployments" --get --data-urlencode "projectId=${PROJECT}" --data-urlencode "limit=15")"
jq -c '.deployments[]? | {uid, url, readyState, created}' <<<"$list"

echo "Canceling team BUILDING/QUEUED deployments that are not this project's newest"
team_list="$(api GET "/v6/deployments" --get --data-urlencode "limit=20")"
newest_uid="$(jq -r '.deployments[0].uid // empty' <<<"$list")"
jq -r '.deployments[]? | select(.readyState == "BUILDING" or .readyState == "QUEUED") | [.uid, .name, .readyState] | @tsv' <<<"$team_list" \
  | while IFS=$'\t' read -r uid name state; do
      if [[ "$uid" == "$newest_uid" ]]; then
        echo "Keeping ${uid} (${name} ${state})"
        continue
      fi
      echo "Canceling stuck ${uid} (${name} ${state})"
      api POST "/v12/deployments/${uid}/cancel" >/dev/null || true
    done

# Alias the newest deployment only — never fall back to the previous
# production SHA if this upload is still BUILDING or ERROR.
if [[ -z "$newest_uid" ]]; then
  echo "No deployments on prod project" >&2
  exit 1
fi

ready_uid=""
deadline=$((SECONDS + POLL_SECONDS))
while (( SECONDS < deadline )); do
  meta="$(api GET "/v13/deployments/${newest_uid}")"
  state="$(jq -r '.readyState // .status // empty' <<<"$meta")"
  echo "Newest ${newest_uid} readyState=${state}"
  if [[ "$state" == "READY" ]]; then
    ready_uid="$newest_uid"
    break
  fi
  if [[ "$state" == "ERROR" || "$state" == "CANCELED" ]]; then
    echo "Newest deployment ${newest_uid} is ${state}" >&2
    jq -c '{uid: .uid, readyState, errorMessage}' <<<"$meta" >&2 || true
    exit 1
  fi
  sleep 5
done

if [[ -z "$ready_uid" ]]; then
  echo "Newest deployment ${newest_uid} not READY after ${POLL_SECONDS}s" >&2
  exit 1
fi

echo "Aliasing ${ALIAS} -> ${ready_uid}"
alias_body="$(jq -n --arg alias "$ALIAS" --arg deploymentId "$ready_uid" \
  '{alias:$alias, deploymentId:$deploymentId}')"
result="$(api POST "/v2/aliases" --data "$alias_body")"
if jq -e '.error' <<<"$result" >/dev/null; then
  echo "Alias failed:" >&2
  jq -c '{error}' <<<"$result" >&2
  exit 1
fi
jq -c '{alias, deployment: {id: .deployment.id}}' <<<"$result"
echo "Aliased ${ALIAS}"
