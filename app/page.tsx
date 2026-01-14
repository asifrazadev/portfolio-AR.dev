import { Hero } from "./components/hero/Hero"
import { Work } from "./components/work/Work"
import { Experience } from "./components/experience/Experience"
import { Skills } from "./components/skills/Skills"
import { About } from "./components/about/About"
import { Contact } from "./components/contact/Contact"

export default function Home() {
  return (
    <main className="main-container" id="home">
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </main>
  )
}
