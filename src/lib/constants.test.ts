import { describe, it, expect } from "vitest";
import { EMAIL, GITHUB_URL, TELEGRAM_URL, FORMSUBMIT_ENDPOINT } from "./constants";

describe("constants", () => {
  it("has a valid email", () => {
    expect(EMAIL).toContain("@");
    expect(EMAIL).toContain(".");
  });

  it("has a valid GitHub URL", () => {
    expect(GITHUB_URL).toMatch(/^https:\/\/github\.com\//);
  });

  it("has a valid Telegram URL", () => {
    expect(TELEGRAM_URL).toMatch(/^https:\/\/t\.me\//);
  });

  it("FormSubmit endpoint includes the email", () => {
    expect(FORMSUBMIT_ENDPOINT).toContain(EMAIL);
    expect(FORMSUBMIT_ENDPOINT).toMatch(/^https:\/\/formsubmit\.co\/ajax\//);
  });
});
