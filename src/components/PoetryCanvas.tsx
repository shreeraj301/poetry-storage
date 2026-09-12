"use client";

import { useGesture } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { genreLabels, poemArchive, type Poem, type PoemGenre } from "@/data/poems";
import { PoemNote } from "@/components/PoemNote";

const COLORS: { genre: PoemGenre; label: string; color: string }[] = [
  { genre: "melancholy", label: "melancholy", color: "#A8B5C2" },
  { genre: "nature", label: "nature / growth", color: "#BBC4A7" },
  { genre: "love", label: "love / passion", color: "#D59A8E" },
  { genre: "observations", label: "observations", color: "#E3D5C4" },
];

export function PoetryCanvas() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.62);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [activeGenre, setActiveGenre] = useState<PoemGenre | "all">("all");
  const positionRef = useRef(position);
  const zoomRef = useRef(zoom);
  const canvasRef = useRef<HTMLDivElement>(null);

  const bind = useGesture({
    onDrag: ({ movement: [mx, my], memo = positionRef.current }) => {
      if (selectedPoem) return memo;
      const nextPosition = { x: memo.x + mx, y: memo.y + my };
      positionRef.current = nextPosition;
      setPosition(nextPosition);
      return memo;
    },
    onWheel: ({ event, delta: [, dy] }) => {
      const currentZoom = zoomRef.current;
      const nextZoom = Math.min(1.22, Math.max(0.28, currentZoom - dy * 0.001));
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const pointerX = event.clientX - rect.left - rect.width / 2;
        const pointerY = event.clientY - rect.top - rect.height / 2;
        const ratio = nextZoom / currentZoom - 1;
        const nextPosition = { x: positionRef.current.x - pointerX * ratio, y: positionRef.current.y - pointerY * ratio };
        positionRef.current = nextPosition;
        setPosition(nextPosition);
      }
      zoomRef.current = nextZoom;
      setZoom(nextZoom);
    },
  }, { drag: { filterTaps: true, threshold: 2 }, eventOptions: { passive: false } });

  const visiblePoems = activeGenre === "all" ? poemArchive : poemArchive.filter((poem) => poem.genre === activeGenre);

  return (
    <main className="archive-shell">
      <header className="archive-header">
        <div className="archive-mark" aria-label="The Drift Archive">
          <span className="archive-mark__symbol">◌</span>
          <span>THE DRIFT<br /><em>archive</em></span>
        </div>
        <div className="archive-header__center">
          <span className="eyebrow">A spatial collection of small weather</span>
          <h1>Poetry, held in place<br /><em>by the air.</em></h1>
        </div>
        <div className="archive-header__meta">
          <span>Volume 01 / 2024—25</span>
          <span>{poemArchive.length} pieces collected</span>
        </div>
      </header>

      <div className="archive-stage" ref={canvasRef} {...bind()}>
        <div className="stage-hint">drag to drift <span>↗</span></div>
        <div className="stage-zoom" aria-live="polite">{Math.round(zoom * 100)}%</div>
        <motion.div className="poetry-wall" style={{ x: position.x, y: position.y, scale: zoom }}>
          {visiblePoems.map((poem) => (
            <PoemNote key={poem.id} poem={poem} zoom={zoom} onOpen={setSelectedPoem} />
          ))}
        </motion.div>
      </div>

      <footer className="archive-footer">
        <div className="legend">
          <span className="legend__label">paper taxonomy</span>
          <button className={activeGenre === "all" ? "is-active" : ""} onClick={() => setActiveGenre("all")}>all notes</button>
          {COLORS.map(({ genre, label, color }) => (
            <button key={genre} className={activeGenre === genre ? "is-active" : ""} onClick={() => setActiveGenre(genre)}>
              <i style={{ backgroundColor: color }} />{label}
            </button>
          ))}
        </div>
        <div className="archive-footer__note">move through the collection slowly<br />some things only arrive at the edge of attention</div>
      </footer>

      <AnimatePresence>
        {selectedPoem && (
          <motion.div className="reading-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPoem(null)}>
            <motion.div className="reading-note" layoutId={`poem-${selectedPoem.id}`} style={{ "--note-color": selectedPoem.color } as React.CSSProperties} onClick={(event) => event.stopPropagation()}>
              <div className="reading-note__topline"><span>{selectedPoem.date}</span><span>{genreLabels[selectedPoem.genre]}</span></div>
              <h2>{selectedPoem.title}</h2>
              <p>{selectedPoem.fullText}</p>
              <div className="reading-note__bottom"><span>the drift archive / 01</span><button onClick={() => setSelectedPoem(null)} aria-label="Close poem">close <span>×</span></button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
