import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>post not found</h1>
      <Link href="/">return home</Link>
    </main>
  );
}
