import Image from "next/image";
import { Section } from "@/components/section";
import { getCertificates, type Certificate } from "@/lib/content";

const SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";

export function Credentials() {
  const certificates = getCertificates();

  return (
    <Section name="credentials">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <Card key={certificate.title} certificate={certificate} />
        ))}
      </ul>
    </Section>
  );
}

function Card({ certificate }: { certificate: Certificate }) {
  const { title, detail, issuer, date, image } = certificate;

  return (
    <li className="flex flex-col overflow-hidden rounded-lg border border-edge bg-surface">
      {/* Scans are cropped to a common landscape ratio, so they fill the frame
          at the same size rather than one letterboxing against the others. */}
      <div className="relative aspect-[4/3] w-full border-b border-edge">
        <Image src={image} alt={`${title}, issued by ${issuer}`} fill sizes={SIZES} className="object-contain p-4" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3 font-semibold text-ink">{title}</h3>
        <p className="mt-2 font-serif text-body text-slate">{detail}</p>
        <p className="mt-auto pt-6 text-meta text-slate">
          {issuer}, {date}
        </p>
      </div>
    </li>
  );
}
