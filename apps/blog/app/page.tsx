import Link from "next/link";

import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";

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

  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id} className="list-none">
            <Link href={`/posts/${post?.slug?.current}`}>{post?.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
