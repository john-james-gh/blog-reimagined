import { render, screen, waitFor } from "@testing-library/react";

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
  mainImage: {
    alt: "Test Image Alt",
    asset: { _ref: "test-ref" },
  },
  body: [
    {
      _type: "block",
      children: [{ _type: "span", text: "Test content body" }],
    },
  ],
  relatedPosts: [
    {
      _id: "related-1",
      title: "Related Post 1",
      slug: { current: "related-post-1" },
    },
    {
      _id: "related-2",
      title: "Related Post 2",
      slug: { current: "related-post-2" },
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
      width: jest.fn(function () {
        return this;
      }),
      height: jest.fn(function () {
        return this;
      }),
      quality: jest.fn(function () {
        return this;
      }),
      auto: jest.fn(function () {
        return this;
      }),
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

  it("renders the post title", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    render(page);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });

  it("renders the main image", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    render(page);

    const image = screen.getByAltText("Test Image Alt");
    expect(image).toBeInTheDocument();
  });

  it("renders the post body", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    render(page);

    expect(screen.getByText(/Test content body/i)).toBeInTheDocument();
  });

  it("renders the related posts section", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    render(page);

    expect(screen.getByText("See Also")).toBeInTheDocument();
    expect(screen.getByText("Related Post 1")).toBeInTheDocument();
    expect(screen.getByText("Related Post 2")).toBeInTheDocument();
  });

  it("renders related post links with correct href", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    render(page);

    const link1 = screen.getByRole("link", { name: "Related Post 1" });
    const link2 = screen.getByRole("link", { name: "Related Post 2" });

    expect(link1).toHaveAttribute("href", "/posts/related-post-1");
    expect(link2).toHaveAttribute("href", "/posts/related-post-2");
  });

  it("renders JSON-LD structured data", async () => {
    const props: PageProps<"/posts/[slug]"> = {
      params: Promise.resolve({ slug: "slug" }),
      searchParams: Promise.resolve({}),
    };
    const page = await Page(props);
    const { container } = render(page);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(script?.textContent).toContain('"@type":"BlogPosting"');
  });
});
