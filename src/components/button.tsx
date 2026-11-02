import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  primary?: boolean;
  small?: boolean;
  square?: boolean;
  newTab?: boolean;
  label?: string;
};

const BASE =
  "inline-flex items-center gap-2 rounded-lg border font-medium leading-none no-underline transition-colors duration-200";

export function Button({ href, children, primary, small, square, newTab, label }: Props) {
  const tone = primary
    ? "border-amber bg-amber text-amber-ink hover:bg-amber-hover"
    : "border-line bg-raised text-fg hover:border-line-strong hover:bg-raised-2";
  const size = small ? "h-9 px-3 text-[13px]" : "h-11 px-[18px] text-sm";
  const shape = square ? "w-11 justify-center px-0" : "";
  const external = newTab || href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${BASE} ${tone} ${size} ${shape}`}
    >
      {children}
    </a>
  );
}
