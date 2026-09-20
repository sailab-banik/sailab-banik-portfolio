import { Section } from "@/components/section";
import { Toolkit } from "@/components/toolkit";
import { getPrinciples } from "@/lib/content";

export function Approach() {
  const principles = getPrinciples();

  return (
    <Section name="approach">
      <ul>
        {principles.map(({ title, body }) => (
          <li
            key={title}
            className="mt-10 border-t border-edge pt-10 first:mt-0 first:border-t-0 first:pt-0"
          >
            <h3 className="type-h2 text-h3 max-w-[38ch] text-balance text-ink">{title}</h3>
            <p className="mt-4 max-w-[62ch] font-serif text-body text-ink">{body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14 border-t border-edge pt-10">
        <Toolkit />
      </div>
    </Section>
  );
}
