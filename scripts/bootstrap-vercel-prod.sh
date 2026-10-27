#!/usr/bin/env bash
# Create (or reuse) shri-md/ehr-marketing-app-prod, copy lead-capture env
# from the existing dev project, and attach www.shrimd.com + apex redirect.
# Does not change public DNS. Prints only project IDs and domain records.
set -euo pipefail

TOKEN="${VERCEL_TOKEN:?VERCEL_TOKEN is required}"
TEAM="${VERCEL_ORG_ID:?VERCEL_ORG_ID is required}"
SOURCE_PROJECT="${VERCEL_PROJECT_ID:?VERCEL_PROJECT_ID is required}"
NAME="${VERCEL_PROD_PROJECT_NAME:-ehr-marketing-app-prod}"
API="https://api.vercel.com"
PRIMARY_DOMAIN="www.shrimd.com"
APEX_DOMAIN="shrimd.com"

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

json_error() {
  local body="$1"
  local code
  code="$(jq -r '.error.code // .error // empty' <<<"$body" 2>/dev/null || true)"
  [[ -n "$code" && "$code" != "null" ]]
}

echo "Looking up ${NAME} on team ${TEAM}"
existing="$(api GET "/v9/projects/${NAME}" || true)"
if json_error "$existing"; then
  echo "Creating ${NAME}"
  created="$(api POST "/v11/projects" --data "{\"name\":\"${NAME}\",\"framework\":\"nextjs\"}")"
  if json_error "$created"; then
    echo "Failed to create project:" >&2
    jq -c '{error}' <<<"$created" >&2
    exit 1
  fi
  PROJECT_ID="$(jq -r '.id' <<<"$created")"
else
  PROJECT_ID="$(jq -r '.id' <<<"$existing")"
  echo "Reusing existing project"
fi

if [[ -z "$PROJECT_ID" || "$PROJECT_ID" == "null" ]]; then
  echo "Could not resolve project id" >&2
  exit 1
fi

echo "PROJECT_ID=${PROJECT_ID}"
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "project_id=${PROJECT_ID}" >>"$GITHUB_OUTPUT"
fi

copy_env() {
  local key="$1"
  local source_envs dest_envs dest_has value env_type
  source_envs="$(api GET "/v10/projects/${SOURCE_PROJECT}/env")"
  dest_envs="$(api GET "/v10/projects/${PROJECT_ID}/env")"
  dest_has="$(jq -r --arg key "$key" '[.envs[]? | select(.key == $key)] | length' <<<"$dest_envs")"
  if [[ "$dest_has" != "0" ]]; then
    echo "Env ${key} already present on prod"
    return 0
  fi

  local env_id
  env_id="$(jq -r --arg key "$key" '.envs[]? | select(.key == $key) | .id' <<<"$source_envs" | head -n 1)"
  if [[ -z "$env_id" || "$env_id" == "null" ]]; then
    echo "Env ${key} missing on source project — skipped"
    return 0
  fi

  local decrypted
  decrypted="$(api GET "/v1/projects/${SOURCE_PROJECT}/env/${env_id}")"
  if json_error "$decrypted"; then
    echo "Could not read ${key} from source — skipped (value not printed)"
    return 0
  fi
  value="$(jq -r '.value // empty' <<<"$decrypted")"
  env_type="$(jq -r '.type // "encrypted"' <<<"$decrypted")"
  if [[ -z "$value" ]]; then
    echo "Env ${key} empty on source — skipped"
    return 0
  fi

  local payload created_env
  payload="$(jq -n --arg key "$key" --arg value "$value" --arg type "$env_type" \
    '{key:$key, value:$value, type:$type, target:["production","preview","development"]}')"
  created_env="$(api POST "/v10/projects/${PROJECT_ID}/env" --data "$payload")"
  if json_error "$created_env"; then
    echo "Failed to copy ${key} (value not printed)"
    jq -c '{error}' <<<"$created_env"
    return 0
  fi
  echo "Copied ${key} to prod"
}

copy_env RESEND_API_KEY
copy_env LEAD_NOTIFICATION_FROM
copy_env LEAD_NOTIFICATION_TO

add_domain() {
  local body="$1"
  local name
  name="$(jq -r '.name' <<<"$body")"
  local result
  result="$(api POST "/v10/projects/${PROJECT_ID}/domains" --data "$body")"
  if json_error "$result"; then
    local code
    code="$(jq -r '.error.code // empty' <<<"$result")"
    if [[ "$code" == "domain_already_exists" || "$code" == "bad_request" ]]; then
      echo "Domain ${name} already attached or rejected as duplicate"
      jq -c '{error, name: $n}' --arg n "$name" <<<"$result" || true
      return 0
    fi
    # Re-dispatch after first attach: Vercel reports domain_already_in_use
    # with this project's id. Treat same-project as success so deploy runs.
    if [[ "$code" == "domain_already_in_use" ]]; then
      local in_use_project
      in_use_project="$(jq -r '.error.projectId // empty' <<<"$result")"
      if [[ "$in_use_project" == "$PROJECT_ID" ]]; then
        echo "Domain ${name} already attached to this project"
        return 0
      fi
    fi
    echo "Failed to add ${name}:" >&2
    jq -c '{error}' <<<"$result" >&2
    exit 1
  fi
  echo "Attached domain ${name}"
  jq -c '{
    name,
    verified,
    redirect,
    recommendedCNAME: (.verification // []),
    verification
  }' <<<"$result"
}

add_domain "$(jq -n --arg name "$PRIMARY_DOMAIN" '{name:$name}')"
add_domain "$(jq -n --arg name "$APEX_DOMAIN" --arg redirect "$PRIMARY_DOMAIN" \
  '{name:$name, redirect:$redirect, redirectStatusCode:308}')"

echo "Listing attached domains (names and verification only)"
api GET "/v9/projects/${PROJECT_ID}/domains" | jq -c '.domains[]? | {name, verified, redirect, verification}'

mkdir -p .vercel
jq -n --arg projectId "$PROJECT_ID" --arg orgId "$TEAM" --arg projectName "$NAME" \
  '{projectId:$projectId, orgId:$orgId, projectName:$projectName}' >.vercel/project.json
echo "Wrote .vercel/project.json for the subsequent deploy step"
