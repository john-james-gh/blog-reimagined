import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import Link from "next/link";

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
