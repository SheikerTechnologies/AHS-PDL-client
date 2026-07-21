/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import AnimatedBlogCard from "@/components/blog/AnimatedBlogCard";
import AnimatedSectionHeader from "@/components/blog/AnimatedSectionHeader";

// Revalidate every hour so new blog posts appear on the home page
// without a full rebuild.
export const revalidate = 3600;

export default async function BlogSection() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <section
      id="insights-section"
      className="w-full bg-surface-muted/30 py-16 md:py-20 border-t border-border-main/30 scroll-mt-24"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-8">
        {/* Header */}
        <AnimatedSectionHeader>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-text-secondary tracking-widest uppercase block mb-1">
              LATEST UPDATES
            </span>
            <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
              News &amp; Insights
            </h2>
            <p className="text-sm text-text-secondary">
              Stay informed with the latest news, market trends, and company updates from AHS Properties.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors shrink-0 group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        </AnimatedSectionHeader>

        {/* Blog Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <AnimatedBlogCard key={post.slug} index={idx}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="flex flex-col h-full bg-surface-alt rounded-2xl overflow-hidden border border-border-main shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-[#111827]/90 text-white text-[8px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-3 text-[11px] text-text-muted mb-2">
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

                    <h3 className="text-sm font-extrabold text-text-main tracking-tight line-clamp-2 group-hover:text-accent transition-colors duration-200 leading-snug">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-[11px] text-text-secondary leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </AnimatedBlogCard>
          ))}
        </div>

        {/* Mobile View All link */}
        <div className="md:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
