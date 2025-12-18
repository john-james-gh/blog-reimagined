import { render, screen, waitFor } from "@testing-library/react";

import Page from "../app/page";

jest.mock("next-sanity", () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(() => Promise.resolve([])),
  })),
  defineQuery: jest.fn((query) => query),
}));

describe("Page", () => {
  it("renders a heading", async () => {
    const page = await Page();
    render(page);

    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });
});
