import { About } from "./components/About"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Inquiry } from "./components/Inquiry"
import { Process } from "./components/Process"
import { Projects } from "./components/Projects"
import { Services } from "./components/Services"

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7efe2] text-[#2b2118]">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Process />
      <Inquiry />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
