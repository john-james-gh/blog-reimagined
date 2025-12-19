import { render } from "@testing-library/react";

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

describe("Snapshots", () => {
  it("renders homepage unchanged", async () => {
    const page = await Page();
    const { container } = render(page);
    expect(container).toMatchSnapshot();
  });
});
