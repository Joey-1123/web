import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QaSection } from "./qa-section";

describe("QaSection", () => {
  it("renders the section heading", () => {
    render(<QaSection />);

    expect(screen.getByText("Q&A")).toBeInTheDocument();
    expect(screen.getByText("Ask me anything")).toBeInTheDocument();
  });

  it("renders initial questions", () => {
    render(<QaSection />);

    expect(
      screen.getByText(
        "How do you approach backend design when a project is still evolving fast?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Where does AI actually fit into your engineering workflow today?")
    ).toBeInTheDocument();
  });

  it("renders the question form", () => {
    render(<QaSection />);

    expect(
      screen.getByPlaceholderText("Your question")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ask/i })).toBeInTheDocument();
  });
});
