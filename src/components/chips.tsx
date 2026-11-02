export function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 font-mono ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item} className="rounded-md border border-line bg-raised-2 px-2.5 py-1 text-xs text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
