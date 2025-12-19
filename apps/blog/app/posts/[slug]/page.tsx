import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPosting, WithContext } from "schema-dts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PublishedAt } from "@/components/ui/published-at";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { components } from "@/lib/sanity/portable-text-components";
import { POST_QUERY } from "@/lib/sanity/queries";
import type { POST_QUERY_RESULT } from "@/lib/sanity/types";
import { getBaseUrl } from "@/lib/utils";

const baseUrl = getBaseUrl();

const getPost = async (props: PageProps<"/posts/[slug]">) => {
  try {
    const params = await props.params;
    return await client.fetch(POST_QUERY, {
      slug: params.slug,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export async function generateMetadata(props: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const post = await getPost(props);

  if (!post) {
    notFound();
  }

  const metadata: Metadata = {
    title: post.seo.title,
    description: post.seo.description,
  };

  if (post.seo.image) {
    metadata.openGraph = {
      images: {
        url: urlFor(post.seo.image).width(800).height(300).url(),
        width: 800,
        height: 300,
      },
    };
  }

  if (post.seo.noIndex) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}

const generatePostJsonLd = (post: POST_QUERY_RESULT): WithContext<BlogPosting> => {
  if (!post) {
    notFound();
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/posts/${post.slug?.current}`,
    },
    headline: post.seo?.title,
    description: post.seo?.description,
    image: post.seo?.image ? [urlFor(post.seo.image).width(800).height(300).url()] : undefined,
    author: post.author?.name ? { "@type": "Person", name: post.author.name } : undefined,
    publisher: {
      "@type": "Person",
      name: "John James",
    },
    datePublished: post.publishedAt ?? post._createdAt,
    dateModified: post._updatedAt,
  };
};

export default async function Page(props: PageProps<"/posts/[slug]">) {
  const post = await getPost(props);

  if (!post) {
    notFound();
  }

  const pageJson = JSON.stringify(generatePostJsonLd(post));

  return (
    <main className="container mx-auto flex min-h-screen justify-center px-2 py-4">
      <article className="prose prose-neutral dark:prose-invert w-full">
        <Card className="h-full border-none shadow-none">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex flex-col items-center gap-4">
              {post.mainImage ? (
                <Image
                  className="mt-0 mb-0 aspect-800/300 w-full rounded-xl"
                  src={urlFor(post.mainImage).width(800).height(300).quality(80).auto("format").url()}
                  alt={post?.mainImage?.alt || ""}
                  width={800}
                  height={300}
                  priority
                />
              ) : null}
              <h1 className="mb-0 text-center">{post.title}</h1>
            </CardTitle>
            <CardDescription>
              <PublishedAt publishedAt={post.publishedAt} />
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            {post.body ? <PortableText value={post.body} components={components} /> : null}
          </CardContent>

          {post.relatedPosts && post.relatedPosts.length > 0 ? (
            <CardFooter className="flex flex-col px-4 sm:px-6">
              <h3>See Also</h3>
              <ul className="list-none pl-0">
                {post.relatedPosts.map((relatedPost) => (
                  <li key={relatedPost._id}>
                    <Link href={`/posts/${relatedPost.slug?.current}`}>{relatedPost.title}</Link>
                  </li>
                ))}
              </ul>
            </CardFooter>
          ) : null}
        </Card>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pageJson }} />
    </main>
  );
}
