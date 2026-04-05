import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <About />
      <Portfolio />
      <Experience />
      <Skills />
      <Services />
      <Contact />
    </Layout>
  );
}
