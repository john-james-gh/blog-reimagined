import dayjs from "dayjs";

import type { POST_QUERY_RESULT } from "@/lib/sanity/types";

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERY_RESULT>["publishedAt"];
};

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  return publishedAt ? <p className="mb-0">Published on {dayjs(publishedAt).format("MMMM D, YYYY")}</p> : null;
}
