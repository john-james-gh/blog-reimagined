import { render, screen, waitFor } from "@testing-library/react";

import Page from "@/app/posts/[slug]/page";

jest.mock("next-sanity", () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(() => Promise.resolve([])),
  })),
  defineQuery: jest.fn((query) => query),
}));

jest.mock("@sanity/image-url", () => ({
  createImageUrlBuilder: jest.fn(() => ({
    image: jest.fn(() => ({
      url: jest.fn(() => "https://example.com/image.jpg"),
      width: jest.fn(() => ({ url: jest.fn(() => "https://example.com/image.jpg") })),
      height: jest.fn(() => ({ url: jest.fn(() => "https://example.com/image.jpg") })),
    })),
  })),
}));

describe("Page", () => {
  it("renders a heading", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    render(page);

    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });
});
