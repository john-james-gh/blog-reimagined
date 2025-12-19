import { Analytics } from "@vercel/analytics/next";
import { Roboto_Flex, Roboto_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";

import "./globals.css";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} dark`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
