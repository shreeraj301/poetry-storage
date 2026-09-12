"use client";

import { motion } from "framer-motion";
import type { Poem } from "@/data/poems";

type PoemNoteProps = {
  poem: Poem;
  zoom: number;
  onOpen: (poem: Poem) => void;
  isOpen?: boolean;
};

export function PoemNote({ poem, zoom, onOpen, isOpen = false }: PoemNoteProps) {
  const textOpacity = Math.min(1, Math.max(0, (zoom - 0.34) / 0.42));

  return (
    <motion.article
      layoutId={`poem-${poem.id}`}
      className={`poem-note ${isOpen ? "poem-note--open" : ""}`}
      style={{
        "--note-color": poem.color,
        "--note-rotate": `${poem.rotation}deg`,
        "--note-width": `${poem.width}px`,
        left: poem.x,
        top: poem.y,
      } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.84 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 18, delay: poem.id * 0.018 }}
      whileHover={{ scale: 1.02, rotateX: 0, rotateY: 0, zIndex: 30, transition: { type: "spring", stiffness: 500, damping: 28 } }}
      onClick={() => onOpen(poem)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen(poem);
      }}
      aria-label={`Read ${poem.title}`}
    >
      <span className="poem-note__edge" />
      <span className="poem-note__meta">{poem.date}</span>
      <h2 className="poem-note__title">{poem.title}</h2>
      <p className="poem-note__excerpt" style={{ opacity: textOpacity }}>{poem.excerpt}</p>
      <span className="poem-note__genre">{poem.genre}</span>
    </motion.article>
  );
}
