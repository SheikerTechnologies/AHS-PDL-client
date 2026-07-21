'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Image from "next/image";
import { motion } from "motion/react";

interface AuthorBoxProps {
  name: string;
  bio?: string;
  avatar?: string;
}

export default function AuthorBox({ name, bio, avatar }: AuthorBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-4 p-5 bg-surface-muted rounded-2xl border border-border-light"
    >
      {/* Avatar */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-surface-alt border-2 border-border-main">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="56px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/10 text-accent font-bold text-lg">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-text-main">{name}</h4>
        {bio && (
          <p className="mt-1 text-sm text-text-secondary leading-relaxed">
            {bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}
