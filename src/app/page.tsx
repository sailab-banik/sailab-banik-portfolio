import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";
import { Credentials } from "@/components/credentials";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Experience />
        <Work />
        <Writing />
        <Credentials />
        <About />
      </main>
      <Footer />
    </>
  );
}
