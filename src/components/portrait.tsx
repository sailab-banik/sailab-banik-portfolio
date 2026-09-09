"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SIZE = 1254;
const SIZES = "(min-width: 768px) 40vw, 100vw";

type Props = {
  src: string;
  alt: string;
};

export function Portrait({ src, alt }: Props) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current!;
    const settled = window.matchMedia(
      "(pointer: coarse), (prefers-reduced-motion: reduce)"
    );
    if (settled.matches) return;

    const track = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--px", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--py", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    const park = () => {
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };

    el.addEventListener("pointermove", track);
    el.addEventListener("pointerleave", park);
    return () => {
      el.removeEventListener("pointermove", track);
      el.removeEventListener("pointerleave", park);
    };
  }, []);

  return (
    <div ref={frame} className="portrait relative border border-edge bg-surface">
      <Image
        src={src}
        alt={alt}
        width={SIZE}
        height={SIZE}
        sizes={SIZES}
        priority
        className="portrait-duotone block w-full"
      />
      <Image
        src={src}
        alt=""
        aria-hidden
        width={SIZE}
        height={SIZE}
        sizes={SIZES}
        priority
        className="portrait-window absolute inset-0 block w-full"
      />
      <DuotoneFilters />
    </div>
  );
}

/* Luminance flattened to greyscale, then remapped onto a two-colour ramp:
   signal in the shadows, paper in the highlights. Reversed for dark mode. */
function DuotoneFilters() {
  return (
    <svg aria-hidden className="absolute h-0 w-0">
      <filter id="duotone-light" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0 0 0 1 0"
        />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.133 0.949" />
          <feFuncG type="table" tableValues="0.200 0.953" />
          <feFuncB type="table" tableValues="0.941 0.961" />
        </feComponentTransfer>
      </filter>
      <filter id="duotone-dark" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0 0 0 1 0"
        />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.055 0.353" />
          <feFuncG type="table" tableValues="0.067 0.408" />
          <feFuncB type="table" tableValues="0.086 1.000" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
