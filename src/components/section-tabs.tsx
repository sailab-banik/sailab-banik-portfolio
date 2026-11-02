"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/content";

/* The one piece of state in the header: which section is under it. A section
   becomes current once its top passes just below the header, and the last one
   wins at the bottom of the page, where a short final section never reaches
   that line. */
const THRESHOLD = 120;

export function SectionTabs({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    const sections = items.map(({ id }) => document.getElementById(id) as HTMLElement);

    function update() {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const passed = sections.filter((el) => el.getBoundingClientRect().top <= THRESHOLD);
      setActive(atBottom ? items[items.length - 1].id : (passed.at(-1) ?? sections[0]).id);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="Sections" className="flex items-stretch gap-0.5 overflow-x-auto font-mono">
      {items.map(({ id, label }) => {
        const on = id === active;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={on ? "location" : undefined}
            className={`flex items-center border-b-2 px-3.5 text-[13px] whitespace-nowrap transition-colors hover:bg-raised hover:text-fg ${
              on ? "border-amber text-fg" : "border-transparent text-muted max-sm:hidden"
            }`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
