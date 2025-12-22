import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CollectionPage, ListItem, WebSite, WithContext } from "schema-dts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PublishedAt } from "@/components/ui/published-at";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import type { POSTS_QUERY_RESULT } from "@/lib/sanity/types";
import { getBaseUrl } from "@/lib/utils";

const baseUrl = getBaseUrl();

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "John James Blog",
    description: "Notes on web, JS/TS, CI/CD, and experiments.",
    openGraph: {
      type: "website",
      url: "/",
      siteName: "John James Blog",
      title: "John James Blog",
      description: "Notes on web, JS/TS, CI/CD, and experiments.",
      images: [{ url: "/og/home.png", width: 800, height: 300 }],
    },
  };
}

const generateWebsiteJsonLd = (): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: baseUrl,
  name: "John James Blog",
  inLanguage: "en-US",
});

const generateIndexJsonLd = (posts: POSTS_QUERY_RESULT): WithContext<CollectionPage> => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Posts",
  url: baseUrl,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: posts.length,
    itemListElement: posts.map(
      (post, i): ListItem => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/posts/${post?.slug?.current}`,
        name: post?.seo?.title,
      }),
    ),
  },
});

const getPosts = async () => {
  try {
    return await client.fetch(POSTS_QUERY);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export default async function Page() {
  const posts = await getPosts();

  const websiteJson = JSON.stringify(generateWebsiteJsonLd());
  const indexJson = JSON.stringify(generateIndexJsonLd(posts));

  return (
    <main className="container mx-auto flex min-h-screen justify-center px-2 py-4">
      <article className="prose prose-neutral dark:prose-invert w-full max-w-3xl">
        <Card className="h-full border-none shadow-none">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex flex-col items-center gap-4">
              <Image src="/logo.png" alt="Description" width={48} height={48} className="mt-0 mb-0" />
              <h1 className="mb-0 text-center">John James</h1>
            </CardTitle>
            <CardDescription>
              <p className="mt-0 mb-0 text-center">Notes on web, JS/TS, CI/CD, and experiments.</p>
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            <ul className="list-none pl-0">
              {posts.map((post) => (
                <li key={post._id} className="pl-0">
                  <Link href={`/posts/${post?.slug?.current}`} className="not-prose">
                    <Card className="bg-background border-none shadow-none">
                      <CardContent>{post?.title}</CardContent>
                      <CardFooter>
                        <CardDescription>
                          <PublishedAt publishedAt={post.publishedAt} />
                        </CardDescription>
                      </CardFooter>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: indexJson }} />
    </main>
  );
}
