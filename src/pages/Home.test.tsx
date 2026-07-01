import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";
import { describe, expect, it } from "vitest";

describe("Home", () => {
  it("renders hero headline", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /site reliability engineer/i })).toBeInTheDocument();
  });

  it("renders contact links", () => {
    render(<Home />);

    const email = screen.getByRole("link", { name: /email/i });
    expect(email).toHaveAttribute("href", expect.stringMatching(/^mailto:/));

    const linkedIn = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/enggarranu/");
  });

  it("renders key sections", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /risk insight/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /things i do well/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /let’s connect/i })).toBeInTheDocument();
  });
});
