import Image from "next/image";
import { getCertificates, type Certificate } from "@/lib/content";
import { Logo } from "@/components/logos";

const SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";
const SHELL = "flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface";

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
  const { image } = certificate;

  return (
    <li>
      {image ? (
        <a
          href={image}
          target="_blank"
          rel="noreferrer"
          className={`${SHELL} transition-[border-color] hover:border-signal`}
        >
          <Body certificate={certificate} />
        </a>
      ) : (
        <div className={SHELL}>
          <Body certificate={certificate} />
        </div>
      )}
    </li>
  );
}

function Body({ certificate }: { certificate: Certificate }) {
  const { title, detail, issuer, date, image, logo } = certificate;

  return (
    <>
      {/* Scans arrive in mixed portrait and landscape, so each is fitted whole
          into a shared frame rather than cropped. Where the document itself
          cannot be published, the issuer's mark stands in its place. */}
      <div className="relative flex aspect-[4/3] w-full items-center justify-center">
        {image && (
          <Image
            src={image}
            alt={`${title}, issued by ${issuer}`}
            fill
            sizes={SIZES}
            className="object-contain p-4"
          />
        )}
        {logo && <Logo name={logo} title={issuer} className="h-16 w-16 text-slate" />}
      </div>
      <div className="flex flex-1 flex-col border-t border-edge p-6">
        <h3 className="text-h3 font-semibold text-ink">{title}</h3>
        <p className="mt-2 font-serif text-body text-ink">{detail}</p>
        <p className="mt-auto pt-6 text-meta text-slate">
          {issuer}, {date}
        </p>
      </div>
    </>
  );
}
