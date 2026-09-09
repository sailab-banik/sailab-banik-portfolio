import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProfile } from "@/lib/content";

const profile = getProfile();

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "assets/fonts");
const extraBold = await readFile(join(fonts, "BricolageGrotesque-ExtraBold.ttf"));
const medium = await readFile(join(fonts, "BricolageGrotesque-Medium.ttf"));

/* The share card is the page's own lockup: paper ground, the name at the width
   of the card, and the statement below it. The only weight available above 500
   is the wdth-78 display cut the name uses, so the emphasis in the statement
   shifts colour rather than weight. */
export default function Image() {
  const { name, role, statement, emphasis, location } = profile;
  const [before, after] = statement.split(emphasis);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#eeefe8",
          color: "#15160f",
          padding: "64px 72px",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 268, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 0.88 }}>
            {name}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 40,
              maxWidth: 900,
              fontSize: 33,
              whiteSpace: "pre-wrap",
              fontWeight: 500,
              lineHeight: 1.45,
              color: "#3d3f34",
            }}
          >
            <span>{before}</span>
            <span style={{ color: "#15160f" }}>{emphasis}</span>
            <span style={{ width: 10 }} />
            <span>{after.trimStart()}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #dadbd0",
            paddingTop: 24,
            fontSize: 26,
            fontWeight: 500,
            color: "#6a6c60",
          }}
        >
          <span>{role}</span>
          <span>{location}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: extraBold, weight: 800, style: "normal" },
        { name: "Bricolage", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
