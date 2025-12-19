import { render } from "@testing-library/react";

import Page from "@/app/posts/[slug]/page";

const mockPost = {
  _id: "test-id",
  _createdAt: "2024-01-01T00:00:00Z",
  _updatedAt: "2024-01-01T00:00:00Z",
  title: "Test Post Title",
  slug: { current: "slug" },
  publishedAt: "2024-01-01T00:00:00Z",
  seo: {
    title: "Test SEO Title",
    description: "Test SEO Description",
  },
  body: [
    {
      _type: "block",
      children: [{ _type: "span", text: "Test content" }],
    },
  ],
};

jest.mock("next-sanity", () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(() => Promise.resolve(mockPost)),
  })),
  defineQuery: jest.fn((query) => query),
  PortableText: jest.fn(({ value }) => <div>{JSON.stringify(value)}</div>),
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

describe("Snapshots", () => {
  it("renders homepage unchanged", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    const { container } = render(page);
    expect(container).toMatchSnapshot();
  });
});
