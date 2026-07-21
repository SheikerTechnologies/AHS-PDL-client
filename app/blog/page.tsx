/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogListingClient from "./page-client";

export const metadata: Metadata = {
  title: "Blog & Insights | AHS Properties & Development Ltd.",
  description:
    "Expert insights on Bangladesh's real estate market, property investment guides, company news, and community events from the AHS Properties team.",
  openGraph: {
    title: "Insights & Updates — AHS Properties Blog",
    description:
      "Expert perspectives on Bangladesh's real estate market, property investment guides, and company news from AHS Properties & Development Ltd.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AHS Properties Blog — Insights & Updates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Updates — AHS Properties Blog",
    description:
      "Expert perspectives on Bangladesh's real estate market, property investment guides, and company news from AHS Properties & Development Ltd.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://ahspdl.com/blog",
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogListingClient posts={posts} />;
}
