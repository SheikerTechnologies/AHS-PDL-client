'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Thin animation wrapper for blog cards used on the home page.
 * Keeps motion/animation code in a client component while the
 * card markup itself stays in the server component.
 */

import { type ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedBlogCardProps {
  children: ReactNode;
  index: number;
}

export default function AnimatedBlogCard({
  children,
  index,
}: AnimatedBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
