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

interface ArticleCardProps {
  post: BlogPostFrontmatter;
  index?: number;
}

export default function ArticleCard({ post, index = 0 }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block h-full"
      >
        <article className="flex flex-col h-full bg-surface-alt rounded-2xl overflow-hidden border border-border-main shadow-sm hover:shadow-lg transition-all duration-300 dark:card-hover-glow">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            {/* Category Badge */}
            <span className="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-3">
              {post.category}
            </span>

            <h3 className="text-lg font-bold text-text-main tracking-tight line-clamp-2 group-hover:text-accent transition-colors duration-200">
              {post.title}
            </h3>

            <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-3 text-[11px] text-text-muted border-t border-border-light pt-3">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
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
  );
}
