'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import type { BlogPostFrontmatter } from "@/lib/blog-types";

interface RelatedArticlesProps {
  posts: BlogPostFrontmatter[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border-main">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-main tracking-tight">
          Related Articles
        </h2>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4 transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block h-full"
            >
              <article className="flex flex-col h-full bg-surface-alt rounded-xl overflow-hidden border border-border-main shadow-sm hover:shadow-lg transition-all duration-300 dark:card-hover-glow">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <span className="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-bold text-text-main line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-3 flex items-center gap-2 text-[10px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(post.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4"
        >
          View all articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
