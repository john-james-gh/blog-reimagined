import { render, screen, waitFor } from "@testing-library/react";

import Page from "../app/page";

const mockPosts = [
  {
    _id: "test-id-1",
    title: "Test Post Title 1",
    slug: { current: "test-post-1" },
    publishedAt: "2024-01-01T00:00:00Z",
    seo: {
      title: "Test SEO Title 1",
    },
  },
  {
    _id: "test-id-2",
    title: "Test Post Title 2",
    slug: { current: "test-post-2" },
    publishedAt: "2024-01-02T00:00:00Z",
    seo: {
      title: "Test SEO Title 2",
    },
  },
];

jest.mock("next-sanity", () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(() => Promise.resolve(mockPosts)),
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

  it("renders the description text", async () => {
    const page = await Page();
    render(page);

    const description = screen.getByText("Notes on web, JS/TS, CI/CD, and experiments.");
    expect(description).toBeInTheDocument();
  });

  it("renders the logo image", async () => {
    const page = await Page();
    render(page);

    const logo = screen.getByRole("img", { name: "Description" });
    expect(logo).toBeInTheDocument();
  });

  it("renders all posts", async () => {
    const page = await Page();
    render(page);

    await waitFor(() => {
      expect(screen.getByText("Test Post Title 1")).toBeInTheDocument();
      expect(screen.getByText("Test Post Title 2")).toBeInTheDocument();
    });
  });

  it("renders post links with correct href", async () => {
    const page = await Page();
    render(page);

    await waitFor(() => {
      const link1 = screen.getByRole("link", { name: /Test Post Title 1/i });
      const link2 = screen.getByRole("link", { name: /Test Post Title 2/i });

      expect(link1).toHaveAttribute("href", "/posts/test-post-1");
      expect(link2).toHaveAttribute("href", "/posts/test-post-2");
    });
  });
});
