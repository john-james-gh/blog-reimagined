import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  _updatedAt,
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  slug,
  mainImage,
  publishedAt,
  _createdAt,
  _updatedAt,
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  "categories": coalesce(categories[]->{
      _id,
      slug,
      title
    }, []),
  author->{
    name,
    image
  },
  "relatedPosts": coalesce(relatedPosts[]->{
    _id,
    title,
    slug,
    publishedAt
  }, [])
}`);

export const SITEMAP_QUERY = defineQuery(`*[_type == "post" && defined(slug.current) && seo.noIndex != true] {
  "href": "/posts/" + coalesce(slug.current, ""),
  _updatedAt
}`);
