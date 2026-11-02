import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProfile } from "@/lib/content";

const profile = getProfile();

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "assets/fonts");
const [regular, semibold, mono] = await Promise.all([
  readFile(join(fonts, "Geist-Regular.ttf")),
  readFile(join(fonts, "Geist-SemiBold.ttf")),
  readFile(join(fonts, "GeistMono-Regular.ttf")),
]);

/* The share card is the hero in miniature: the name, the headline with its
   emphasis in amber, and a mono status line, on the page's own ground. */
export default function Image() {
  const { name, headline, emphasis, location, domain } = profile;
  const [before, after] = headline.split(emphasis);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e110f",
          color: "#e8eae3",
          padding: "72px 80px",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 600 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#f5b942",
              color: "#0e110f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Geist Mono",
              fontSize: 22,
            }}
          >
            sb
          </div>
          <span style={{ display: "flex" }}>
            {domain.split(".")[0]}
            <span style={{ color: "#7e877f" }}>.{domain.split(".")[1]}</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}>{name}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 32,
              maxWidth: 960,
              fontSize: 38,
              fontWeight: 400,
              lineHeight: 1.35,
              whiteSpace: "pre-wrap",
            }}
          >
            <span>{before}</span>
            <span style={{ color: "#f5b942" }}>{emphasis}</span>
            <span>{after}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #252b27",
            paddingTop: 24,
            fontFamily: "Geist Mono",
            fontSize: 24,
            color: "#7e877f",
          }}
        >
          <span>{location}</span>
          <span>{domain}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
