import { getProfile } from "@/lib/content";

export function About() {
  const { about } = getProfile();

  return (
    <section id="about" className="border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        <h2 className="type-h2 text-h2 text-ink">About</h2>
        <p className="mt-8 max-w-[68ch] font-serif text-body text-ink">{about}</p>
      </div>
    </section>
  );
}
