"use client";

import { useEffect, useId, useRef, useState } from "react";

export function LivePortfolioPreview({ src, title }: { src: string; title: string }) {
  const [active, setActive] = useState(false);
  const id = useId();
  const shell = useRef<HTMLDivElement>(null);
  const activate = useRef<HTMLButtonElement>(null);
  const exit = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  function deactivate() {
    restoreFocus.current = true;
    setActive(false);
  }

  useEffect(() => {
    if (!active) {
      if (restoreFocus.current) {
        activate.current?.focus({ preventScroll: true });
        restoreFocus.current = false;
      }
      return;
    }
    exit.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreFocus.current = true;
        setActive(false);
      }
    };
    const onOutside = (event: Event) => {
      // Safari briefly focuses the body when leaving a cross-origin frame.
      // Keep the exit control mounted until focus reaches a real destination.
      if (event.type === "focusin" && event.target === document.body) return;
      if (event.target instanceof Node && !shell.current?.contains(event.target)) {
        setActive(false);
      }
    };
    const mobile = window.matchMedia("(max-width: 639px)");
    const onMobile = () => {
      if (mobile.matches) setActive(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    mobile.addEventListener("change", onMobile);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      mobile.removeEventListener("change", onMobile);
    };
  }, [active]);

  const buttonStyle = "rounded-full bg-[#E6B8A2] px-5 py-3 text-sm font-semibold text-[#0B0B0C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6B8A2]";

  return (
    <div ref={shell} className="hidden sm:block" data-live-preview data-active={active}>
      <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0F0F10] px-4 py-3">
        <p id={`${id}-help`} className="text-xs leading-5 text-[#C9C9C3]" aria-live="polite">
          {active ? "Preview active. Exit preview to resume page scrolling." : "Preview paused. Scroll the page or choose to explore."}
        </p>
        {active ? (
          <button
            ref={exit}
            type="button"
            onClick={deactivate}
            className={buttonStyle}
            aria-label={`Exit preview: ${title}`}
            aria-controls={id}
          >
            Exit Preview
          </button>
        ) : null}
      </div>
      <div className="browser-stage relative h-[400px] overflow-hidden border-t border-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_18px_30px_rgba(0,0,0,0.14)] before:pointer-events-none before:absolute before:inset-0 before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_22px_30px_rgba(0,0,0,0.18),inset_0_-22px_28px_rgba(0,0,0,0.12)] lg:h-[500px]">
        <iframe
          id={id}
          src={src}
          title={`${title} website preview`}
          loading="lazy"
          inert={!active}
          tabIndex={active ? 0 : -1}
          aria-describedby={`${id}-help`}
          className={`h-full w-full border-0 bg-white ${active ? "" : "pointer-events-none"}`}
        />
        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 ${active ? "hidden" : ""}`}>
          <button
            ref={activate}
            type="button"
            onClick={() => setActive(true)}
            className={buttonStyle}
            aria-label={`Explore Live Preview: ${title}`}
            aria-controls={id}
            aria-expanded={active}
          >
            Explore Live Preview
          </button>
        </div>
      </div>
    </div>
  );
}
