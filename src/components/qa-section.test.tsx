import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QaSection } from "./qa-section";

describe("QaSection", () => {
  it("renders the section heading", () => {
    render(<QaSection />);

    expect(screen.getByText("Questions")).toBeInTheDocument();
  });

  it("renders initial questions", () => {
    render(<QaSection />);

    expect(
      screen.getByText(
        "How do you approach backend design when a project is still evolving fast?"
      )
    ).toBeInTheDocument();
  });

  it("renders the question form", () => {
    render(<QaSection />);

    expect(
      screen.getByPlaceholderText("Your question...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ask/i })).toBeInTheDocument();
  });
});
