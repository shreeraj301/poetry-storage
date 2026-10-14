"use client";

import { motion } from "framer-motion";
import type { Poem } from "@/data/poems";

type Props = {
  poem: Poem;
  onOpen: (poem: Poem, el: HTMLElement) => void;
  reducedMotion: boolean;
};

export function PoemNote({ poem, onOpen, reducedMotion }: Props) {
  return (
    <motion.button
      type="button"
      className={`paper paper--${poem.variant}`}
      style={{
        left: poem.x,
        top: poem.y,
        width: poem.width,
        rotate: poem.rotation,
        backgroundColor: `var(--paper-${poem.mood.toLowerCase()})`,
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 18 }}
      whileHover={reducedMotion ? undefined : { scale: 1.03, zIndex: 20 }}
      onClick={(e) => onOpen(poem, e.currentTarget)}
      aria-label={`${poem.title}, ${poem.mood}. ${poem.variant} ${poem.variant === "sticky" ? "note" : "sheet"}`}
    >
      <span className="paper-mood">{poem.mood}</span>
      <span className="paper-title">{poem.title}</span>
      <span className="paper-excerpt">{poem.excerpt}</span>
    </motion.button>
  );
}
