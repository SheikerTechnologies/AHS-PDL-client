'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarDays, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import type { BlogPostFrontmatter } from "@/lib/blog-types";
import ArticleBody from "@/components/blog/ArticleBody";
import type { ContentBlock } from "@/lib/blog-types";
import ShareButtons from "@/components/blog/ShareButtons";
import AuthorBox from "@/components/blog/AuthorBox";
import RelatedArticles from "@/components/blog/RelatedArticles";

interface ArticlePageClientProps {
  post: BlogPostFrontmatter;
  content: ContentBlock[];
  relatedPosts: BlogPostFrontmatter[];
}

export default function ArticlePageClient({
  post,
  content,
  relatedPosts,
}: ArticlePageClientProps) {
  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:50px_50px] opacity-40 dark:opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-text-muted">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5" />
            <li>
              <Link href="/blog" className="hover:text-accent transition-colors">
                Blog
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5" />
            <li>
              <span className="text-text-secondary">{post.category}</span>
            </li>
            <ChevronRight className="w-3.5 h-3.5" />
            <li className="text-text-secondary truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-[700px] mx-auto">
            {/* Category Badge */}
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span>by {post.author}</span>
            </div>

            {/* Share buttons */}
            <div className="mt-6">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-border-light"
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </motion.div>

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[700px] mx-auto mt-12"
        >
          <ArticleBody content={content} />
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[700px] mx-auto mt-12 p-6 md:p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20"
        >
          <h3 className="text-xl font-bold text-text-main tracking-tight">
            Thinking about developing your land?
          </h3>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            Get a free, no-obligation evaluation of your property. Our experts
            will help you understand the potential value and development
            opportunities for your land.
          </p>
          <Link
            href="/landowners"
            className="mt-4 inline-flex items-center gap-2 bg-accent text-text-on-accent px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent-hover transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Get a Free Evaluation
            <span className="text-lg">→</span>
          </Link>
        </motion.div>

        {/* Author Box */}
        <div className="max-w-[700px] mx-auto mt-10">
          <AuthorBox
            name={post.author}
            bio={post.authorBio}
            avatar={post.authorAvatar}
          />
        </div>

        {/* Related Articles */}
        <RelatedArticles posts={relatedPosts} />
      </div>
    </div>
  );
}
