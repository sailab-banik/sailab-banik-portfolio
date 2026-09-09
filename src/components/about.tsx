import { Section } from "@/components/section";
import { Toolkit } from "@/components/toolkit";
import { getProfile } from "@/lib/content";

export function About() {
  const { about } = getProfile();

  return (
    <Section name="about">
      <p className="max-w-[58ch] font-serif text-lead text-ink">{about}</p>
      <div className="mt-14 border-t border-edge pt-10">
        <Toolkit />
      </div>
    </Section>
  );
}
