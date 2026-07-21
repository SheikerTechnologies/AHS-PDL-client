/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;
import {
  getPostBySlug,
  getAllSlugs,
  getRelatedPosts,
} from "@/lib/blog";
import ArticlePageClient from "./page-client";

const siteUrl = "https://ahspdl.com";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | AHS Properties Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — AHS Properties Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `${siteUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — AHS Properties Blog`,
      description: post.excerpt,
      images: [post.thumbnail],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: post.thumbnail,
    url: `${siteUrl}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "AHS Properties & Development Ltd.",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/ahspdLogoL.png`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.category, item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 4, name: post.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ArticlePageClient
        post={post}
        content={post.content}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
