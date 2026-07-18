'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Minimal animation wrapper for the blog section header.
 * Keeps the server component clean while adding a subtle
 * entrance animation to the heading + "View all" link.
 */

import { type ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedSectionHeaderProps {
  children: ReactNode;
}

export default function AnimatedSectionHeader({
  children,
}: AnimatedSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
