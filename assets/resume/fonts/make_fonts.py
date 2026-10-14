"""Derives ResumeSans from Source Sans Pro for the resume.

Source Sans Pro maps several code points to one glyph (the hyphen glyph is
U+002D, U+00AD, U+2010 and U+2011). XeTeX writes only one of them into the
PDF's ToUnicode map and picks U+2011, so ATS parsers read every hyphen as a
non-breaking one. Dropping the non-ASCII aliases of ASCII glyphs from the cmap
leaves XeTeX only the ASCII code point to write.

The OFL reserves the name "Source", so the modified fonts are renamed.

    python make_fonts.py <dir with SourceSansPro-*.otf>
"""

import sys
from pathlib import Path

from fontTools.ttLib import TTFont

STYLES = ["Regular", "RegularIt", "Bold", "BoldIt"]


def strip_aliases(font):
    for table in font["cmap"].tables:
        ascii_glyphs = {g for cp, g in table.cmap.items() if cp < 0x80}
        for cp in [cp for cp, g in table.cmap.items() if cp >= 0x80 and g in ascii_glyphs]:
            del table.cmap[cp]


def rename(font):
    for record in font["name"].names:
        if record.nameID in (0, 13, 14):
            continue
        text = record.toUnicode()
        text = text.replace("Source Sans Pro", "Resume Sans").replace("SourceSansPro", "ResumeSans")
        record.string = text
    cff = font["CFF "].cff
    cff.fontNames = [n.replace("SourceSansPro", "ResumeSans") for n in cff.fontNames]
    top = cff.topDictIndex[0]
    for key in ("FullName", "FamilyName"):
        if key in top.rawDict:
            setattr(top, key, getattr(top, key).replace("Source Sans Pro", "Resume Sans"))


def main(source):
    out = Path(__file__).parent
    for style in STYLES:
        font = TTFont(Path(source) / f"SourceSansPro-{style}.otf")
        strip_aliases(font)
        rename(font)
        font.save(out / f"ResumeSans-{style}.otf")


if __name__ == "__main__":
    main(sys.argv[1])
