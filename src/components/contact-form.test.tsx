import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  it("renders the form with all fields", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send/i })
    ).toBeInTheDocument();
  });

  it("has a hidden honeypot field", () => {
    render(<ContactForm />);

    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
  });

  it("does not show status before submission", () => {
    render(<ContactForm />);

    const status = screen.queryByRole("status");
    expect(status).toBeNull();
  });
});
