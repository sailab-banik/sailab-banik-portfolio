import Image from "next/image";
import { getProfile } from "@/lib/content";

const PORTRAIT_SIZE = 1000;

export function Hero() {
  const { name, role, statement, emphasis, location, portrait } = getProfile();
  const [given, family] = name.split(" ");
  const [before, after] = statement.split(emphasis);

  return (
    <section id="top" className="mx-auto w-full max-w-page px-6 pt-16 pb-section md:px-10 md:pt-24">
      <div className="flex flex-col gap-8 md:grid md:grid-cols-12 md:items-center md:gap-10">
        <div className="order-2 md:order-1 md:col-span-7">
          <h1 className="type-display text-display text-ink">
            {given}
            <br />
            {family}
          </h1>
          <p className="mt-8 max-w-[38ch] font-serif text-body text-ink">
            {before}
            <strong className="font-semibold text-signal">{emphasis}</strong>
            {after}
          </p>
          <p className="mt-6 text-ui text-slate">
            {role}, {location}
          </p>
        </div>

        <div className="order-1 mx-auto w-full max-w-[62vh] md:order-2 md:col-span-5 md:max-w-none">
          <Image
            src={portrait}
            alt={`${name}, ${role}`}
            width={PORTRAIT_SIZE}
            height={PORTRAIT_SIZE}
            sizes="(min-width: 768px) 40vw, 100vw"
            priority
            className="portrait block w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
