import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Writing } from "@/components/writing";
import { Footer } from "@/components/footer";
import { RevealObserver } from "@/components/reveal-observer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1 scroll-mt-14">
        <Hero />
        <Experience />
        <Projects />
        <Writing />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
