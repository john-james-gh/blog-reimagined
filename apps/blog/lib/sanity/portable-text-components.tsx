import type { PortableTextComponents } from "next-sanity";
import Image from "next/image";

import { urlFor } from "./image";

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          className="h-auto w-full rounded-lg"
          src={urlFor(props.value).width(800).height(300).quality(80).auto("format").url()}
          alt={props?.value?.alt || ""}
          width={800}
          height={300}
        />
      ) : null,
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <a href={value?.href} target="_blank" rel="noopener">
          {children}
        </a>
      );
    },
  },
};
