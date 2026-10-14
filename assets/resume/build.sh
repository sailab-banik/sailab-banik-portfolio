#!/bin/sh
# Builds the resume in two versions, dated with today's mmddyy:
#
#   public/resume/sailab_banik_resume_<date>_masked.pdf   masked number, committed, linked from the site
#   assets/resume/sailab_banik_resume_<date>.pdf          real number, gitignored, for applications
#
# The real number lives in phone.local (gitignored, one line) and never enters
# the source. The full PDF is kept out of public/, because anything there is
# served at its own URL whether or not the site links to it.

set -e
cd "$(dirname "$0")"
date=$(date +%m%d%y)
name=sailab_banik_resume_$date
public=../../public/resume
tmp=$(mktemp -d "${TMPDIR:-/tmp}/resume.XXXXXX")
trap 'rm -rf "$tmp"' EXIT

tectonic -o "$tmp" sailab-banik-resume.tex
rm -f "$public"/*.pdf
mv "$tmp/sailab-banik-resume.pdf" "$public/${name}_masked.pdf"
sed -i '' "s|\"resume\": \"[^\"]*\"|\"resume\": \"/resume/${name}_masked.pdf\"|" ../../content/profile.json

if [ -f phone.local ]; then
  phone=$(cat phone.local)
  sed "s|{+91 87XXX XXXXX}|{$phone}|" sailab-banik-resume.tex > "$tmp/full.tex"
  # full.tex sits in $tmp, so fonts/ has to be found through the search path.
  tectonic -Z search-path="$PWD" -o "$tmp" "$tmp/full.tex"
  rm -f sailab_banik_resume_*.pdf
  mv "$tmp/full.pdf" "$name.pdf"
else
  echo "phone.local not found -- skipped the full build." >&2
fi
