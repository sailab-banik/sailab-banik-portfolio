#!/bin/sh
# Builds the resume into public/resume/.
#
#   sailab-banik-resume.pdf        masked number, committed, linked from the site
#   sailab-banik-resume-full.pdf   real number, gitignored, for applications
#
# The real number lives in phone.local (gitignored, one line) and never enters
# the source. Anything committed under public/ is served at its own URL whether
# or not the site links to it, so the full PDF must stay out of the repo.

set -e
cd "$(dirname "$0")"
out=../../public/resume
mkdir -p "$out"

tectonic -o "$out" sailab-banik-resume.tex

if [ -f phone.local ]; then
  phone=$(cat phone.local)
  sed "s|{+91 87XXX XXXXX}|{$phone}|" sailab-banik-resume.tex > sailab-banik-resume-full.tex
  tectonic -o "$out" sailab-banik-resume-full.tex
  rm sailab-banik-resume-full.tex
else
  echo "phone.local not found -- skipped the full build." >&2
fi
