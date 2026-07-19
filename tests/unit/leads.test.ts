import { describe, expect, it, vi, beforeEach } from "vitest";

const sendMock = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { notifyLead, validateLead, LeadValidationError, type LeadSubmission } from "@/lib/leads";

const validSubmission: LeadSubmission = {
  companyName: "Acme Telehealth",
  contactName: "Jordan Rivera",
  contactEmail: "jordan@acmetelehealth.com",
  expectedPatientVolume: "200-500/month",
  conditionsUnderEvaluation: "GLP-1, HRT",
  currentVendor: "",
};

describe("lead capture (constitution Article IV)", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "test" }, error: null });
    process.env.RESEND_API_KEY = "test-key";
    process.env.LEAD_NOTIFICATION_FROM = "leads@shrimd.com";
    process.env.LEAD_NOTIFICATION_TO = "ops@shrimd.com";
  });

  it("SC-002: sends a notification for a valid submission and touches nothing else", async () => {
    await notifyLead(validSubmission);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const call = sendMock.mock.calls[0][0];
    expect(call.subject).toContain("Acme Telehealth");
    expect(call.text).toContain("jordan@acmetelehealth.com");
  });

  it("rejects a submission missing required fields before ever calling the email API", async () => {
    const incomplete = { ...validSubmission, companyName: "" };
    await expect(notifyLead(incomplete)).rejects.toThrow(LeadValidationError);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("validateLead lists every missing required field, not just the first", () => {
    const incomplete: LeadSubmission = {
      companyName: "",
      contactName: "",
      contactEmail: "test@example.com",
      expectedPatientVolume: "100",
      conditionsUnderEvaluation: "",
      currentVendor: "",
    };
    try {
      validateLead(incomplete);
      throw new Error("expected validateLead to throw");
    } catch (err) {
      expect(err).toBeInstanceOf(LeadValidationError);
      expect((err as LeadValidationError).fields).toEqual(
        expect.arrayContaining(["companyName", "contactName", "conditionsUnderEvaluation"]),
      );
    }
  });

  it("currentVendor is genuinely optional", async () => {
    await notifyLead({ ...validSubmission, currentVendor: "" });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("surfaces a send failure as a real error rather than silently succeeding", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
    await expect(notifyLead(validSubmission)).rejects.toThrow(/boom/);
  });
});
