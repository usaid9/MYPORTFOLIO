import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Shapes from "./components/Shapes";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Mydock from "./components/Mydock";
import ThemeToggle from "./components/ThemeToggle";
import Aurora from '../components/Aurora';




export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="h-min dark">
      <div className="-z-50 fixed" style={{ width: '100vw', height: '100vh' }}>
        <Aurora
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          amplitude={.5}
          blend={0.5}
        />
      </div>
      <Shapes />
      <BackToTop />
      <div className="bg-gray-100 opacity-80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors scroll-smooth">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Contact dark={dark} />
        <Footer />
        <Mydock />

      </div>
    </div>
  );
}