import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Post not found</h1>
      <Link href="/">Return Home</Link>
    </main>
  );
}
