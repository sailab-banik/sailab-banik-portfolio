import Image from "next/image";
import { getCertificates, type Certificate } from "@/lib/content";

const SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";

export function Credentials() {
  const certificates = getCertificates();

  return (
    <section id="credentials" className="border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        <h2 className="type-h2 text-h2 text-ink">Credentials</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <Card key={certificate.title} certificate={certificate} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({ certificate }: { certificate: Certificate }) {
  const { title, detail, issuer, date, image } = certificate;

  return (
    <li>
      <a
        href={image}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface transition-[border-color] hover:border-signal"
      >
        {/* Scans arrive in mixed portrait and landscape, so each is fitted
            whole into a shared frame rather than cropped. */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={image}
            alt={`${title}, issued by ${issuer}`}
            fill
            sizes={SIZES}
            className="object-contain p-4"
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-edge p-6">
          <h3 className="text-h3 font-semibold text-ink">{title}</h3>
          <p className="mt-2 font-serif text-body text-ink">{detail}</p>
          <p className="mt-auto pt-6 text-meta text-slate">
            {issuer}, {date}
          </p>
        </div>
      </a>
    </li>
  );
}
