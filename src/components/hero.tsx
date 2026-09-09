import { getProfile } from "@/lib/content";
import { Portrait } from "@/components/portrait";

export function Hero() {
  const { name, role, statement, location, portrait } = getProfile();
  const [given, family] = name.split(" ");

  return (
    <section id="top" className="mx-auto w-full max-w-page px-6 pt-16 pb-section md:px-10 md:pt-24">
      <div className="flex flex-col gap-12 md:grid md:grid-cols-12 md:items-end md:gap-10">
        <div className="order-2 md:order-1 md:col-span-7">
          <h1 className="type-display text-display text-ink">
            {given}
            <br />
            {family}
          </h1>
          <p className="mt-8 max-w-[38ch] font-serif text-body text-ink">{statement}</p>
          <p className="mt-6 text-ui text-slate">
            {role}, {location}
          </p>
        </div>

        <div className="order-1 mx-auto w-full max-w-[62vh] md:order-2 md:col-span-5 md:max-w-none">
          <Portrait src={portrait} alt={`${name}, ${role}`} />
        </div>
      </div>
    </section>
  );
}
