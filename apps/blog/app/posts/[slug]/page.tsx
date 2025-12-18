import { client } from "@/lib/sanity/client";
import { components } from "@/lib/sanity/portable-text-components";
import { POST_QUERY } from "@/lib/sanity/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

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

export default async function Page(props: PageProps<"/posts/[slug]">) {
  const post = await getPost(props);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>
      {post.mainImage ? (
        <Image
          className="aspect-800/300 w-full rounded-xl"
          src={urlFor(post.mainImage).width(800).height(300).quality(80).auto("format").url()}
          alt={post?.mainImage?.alt || ""}
          width={800}
          height={300}
          priority
        />
      ) : null}
      <article>{post.body ? <PortableText value={post.body} components={components} /> : null}</article>
    </main>
  );
}
