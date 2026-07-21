'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Image from "next/image";
import type { ContentBlock } from "@/lib/blog-types";

interface ArticleBodyProps {
  content: ContentBlock[];
}

function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getBlockText(block: ContentBlock): string {
  if (block.text) return block.text;
  const b = block as unknown as Record<string, unknown>;
  if (Array.isArray(b.children)) {
    return b.children
      .map((c: unknown) =>
        typeof c === "string" ? c : (c as Record<string, unknown>)?.text ?? ""
      )
      .join("");
  }
  return "";
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={idx} className="text-2xl font-bold text-text-main tracking-tight mt-10 mb-4">
          {getBlockText(block)}
        </h2>
      );
    case "paragraph":
      return (
        <p key={idx} className="text-base text-text-secondary leading-relaxed mb-5">
          {getBlockText(block)}
        </p>
      );
    case "image":
      if (!block.url) return null;
      return (
        <div key={idx} className="relative aspect-video my-8 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={block.url}
            alt={getBlockText(block) || ""}
            fill
            className="object-cover"
            sizes="(max-width: 700px) 100vw, 700px"
          />
        </div>
      );
    case "video":
      if (!block.url || !isYouTubeUrl(block.url)) return null;
      return (
        <div key={idx} className="relative aspect-video my-8 rounded-2xl overflow-hidden shadow-md">
          <iframe
            src={block.url}
            title={getBlockText(block) || "Video"}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      );
    default:
      return null;
  }
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="max-w-none">
      {content.map((block, idx) => renderBlock(block, idx))}
    </div>
  );
}
