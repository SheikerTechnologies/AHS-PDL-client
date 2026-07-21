'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays, Clock } from "lucide-react";
import type { BlogPostFrontmatter } from "@/lib/blog-types";

interface FeaturedArticleCardProps {
  post: BlogPostFrontmatter;
}

export default function FeaturedArticleCard({
  post,
}: FeaturedArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block"
      >
        <div className="relative grid md:grid-cols-2 gap-0 bg-surface-alt rounded-3xl overflow-hidden border border-border-main shadow-md hover:shadow-xl transition-all duration-300 dark:card-hover-glow">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Featured Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 bg-accent text-text-on-accent text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 md:p-10">
            {/* Category Badge */}
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
              {post.category}
            </span>

            <h3 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight group-hover:text-accent transition-colors duration-200">
              {post.title}
            </h3>

            <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="text-text-muted">by {post.author}</span>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:underline underline-offset-4">
              Read Article
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
