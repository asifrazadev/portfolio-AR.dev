import dynamic from 'next/dynamic'
import { Hero } from "./components/hero/Hero"
import { Work } from "./components/work/Work"
import { RecentBlogs } from "./components/blog/RecentBlogs"

// Dynamic imports for below-the-fold content to reduce initial JS bundle
const Experience = dynamic(() => import("./components/experience/Experience").then(mod => mod.Experience), { ssr: true })
const Skills = dynamic(() => import("./components/skills/Skills").then(mod => mod.Skills), { ssr: true })
const Contact = dynamic(() => import("./components/contact/Contact").then(mod => mod.Contact), { ssr: true })

export default function Home() {
  return (
    <main className="main-container" id="home">
      <Hero />
      <Work />
      <RecentBlogs />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
