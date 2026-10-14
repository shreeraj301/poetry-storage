"use client";

import { useGesture } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { poemArchive, type Poem, type PoemMood } from "@/data/poems";
import { PoemNote } from "./PoemNote";

export function PoetryCanvas() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.7);
  const [selected, setSelected] = useState<Poem | null>(null);
  const [lastFocus, setLastFocus] = useState<HTMLElement | null>(null);
  const [activeMood, setActiveMood] = useState<PoemMood | "all">("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [nameplateAside, setNameplateAside] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], memo = positionRef.current, tap, event }) => {
        if (tap) return memo;
        if (window.innerWidth < 744) return memo;
        if (selected) return memo;
        const next = { x: memo.x + mx, y: memo.y + my };
        positionRef.current = next;
        setPosition(next);
        return memo;
      },
      onWheel: ({ event, delta: [, dy] }) => {
        event.preventDefault();
        const current = zoomRef.current;
        const nextZoom = Math.min(1.3, Math.max(0.4, current - dy * 0.001));
        zoomRef.current = nextZoom;
        setZoom(nextZoom);
      },
    },
    { drag: { filterTaps: true, threshold: 4 }, eventOptions: { passive: false } }
  );

  const visible = poemArchive.filter((p) => {
    const moodOk = activeMood === "all" || p.mood === activeMood;
    const q = query.trim().toLowerCase();
    const textOk = !q || [p.title, p.excerpt, p.fullText, p.mood].some((s) => s.toLowerCase().includes(q));
    return moodOk && textOk;
  });

  const searchResults = query.trim()
    ? poemArchive.filter((p) =>
        [p.title, p.excerpt, p.fullText, p.mood].some((s) => s.toLowerCase().includes(query.trim().toLowerCase()))
      )
    : [];

  const openPoem = useCallback((poem: Poem, el: HTMLElement) => {
    setLastFocus(el);
    setSelected(poem);
  }, []);

  const closeReader = useCallback(() => {
    setSelected(null);
    lastFocus?.focus();
  }, [lastFocus]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selected) closeReader();
        else if (searchOpen) setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, searchOpen, closeReader]);

  return (
    <main className="wall">
      <a href="#wall" className="skip">Skip to the wall</a>
      <header className="toolbar">
        <div className="brand">Paper Trail</div>
        <div className="search-wrap">
          <input
            type="search"
            placeholder="Search poems"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            aria-label="Search poems"
          />
          {searchOpen && query && (
            <div className="search-results" role="listbox">
              {searchResults.length === 0 ? (
                <div className="empty">No poems match “{query}”</div>
              ) : (
                searchResults.slice(0, 8).map((p) => (
                  <button key={p.id} role="option" onClick={() => openPoem(p, document.activeElement as HTMLElement)}>
                    <strong>{p.title}</strong> · {p.mood}
                  </button>
                ))
              )}
              <button className="clear" onClick={() => { setQuery(""); setSearchOpen(false); }}>Clear</button>
            </div>
          )}
        </div>
        <div className="filters" role="group" aria-label="Filter by mood">
          <button className={activeMood === "all" ? "active" : ""} onClick={() => setActiveMood("all")}>All poems</button>
          {(["Tender", "Longing", "Grief", "Joy", "Anger", "Wonder", "Unsorted"] as const).map((m) => (
            <button key={m} className={activeMood === m ? "active" : ""} onClick={() => setActiveMood(m)}>{m}</button>
          ))}
        </div>
        <div className="tools">
          <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))} aria-label="Zoom out">−</button>
          <button onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))} aria-label="Zoom in">+</button>
          <button onClick={() => { setPosition({ x: 0, y: 0 }); setZoom(0.7); }} aria-label="Recenter wall">Recenter</button>
          <button onClick={() => {
            setPosition({ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 });
          }}>Shuffle</button>
        </div>
      </header>

      <div id="wall" className="stage" ref={canvasRef} {...bind()}>
        <motion.div className="canvas" style={{ x: position.x, y: position.y, scale: zoom }}>
          {visible.map((poem) => (
            <PoemNote key={poem.id} poem={poem} onOpen={openPoem} reducedMotion={reducedMotion} />
          ))}
        </motion.div>
      </div>

      {!nameplateAside && (
        <div className="nameplate" style={{ bottom: 24, left: 24 }}>
          <div>Paper Trail</div>
          <div className="by">by Shreeraj Narwade</div>
          <button onClick={() => setNameplateAside(true)}>Place aside</button>
        </div>
      )}
      {nameplateAside && (
        <button className="restore-nameplate" onClick={() => setNameplateAside(false)}>Show nameplate</button>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="reader-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={closeReader}
          >
            <motion.div
              className="reader"
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={reducedMotion ? false : { y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="reader-meta">{selected.mood}</div>
              <h2>{selected.title}</h2>
              <div className="reader-body" style={{ whiteSpace: "pre-wrap" }}>{selected.fullText}</div>
              <div className="reader-actions">
                <button onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy link</button>
                <button onClick={closeReader}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
