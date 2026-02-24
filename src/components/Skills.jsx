import LogoLoop from "../../components/LogoLoop";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import TiltedCard from "../../components/TiltedCard";
import { skills } from "../data/skills.js";
import CurvedLoop from "../../components/CurvedLoop";
import { useState, useEffect } from "react";
import creato from "/creato.avif";
import coding from "/coding.avif";
import donut from "/donut.avif";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub,
  SiFigma,
} from "react-icons/si";

const techLogos = [
  {
    node: <SiHtml5 />,
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    node: <SiCss3 />,
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com/usaid9" },
  { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
];

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();
  
  const disableMotion = isMobile || shouldReduceMotion;
  
  const scale = useTransform(scrollYProgress, [0, 0.3], disableMotion ? [1, 1] : [1, 0.9]);  
  const scale2 = useTransform(scrollYProgress, [0, 0.3], disableMotion ? [1, 1] : [1, 0.9]);
  const scale3 = useTransform(scrollYProgress, [0, 0.3], disableMotion ? [1, 1] : [1.2, 1.1]); 
  const y = useTransform(scrollYProgress, [0, 0.3], disableMotion ? [0, 0] : [0, -20]);  
  const y2 = useTransform(scrollYProgress, [0, 0.3], disableMotion ? [0, 0] : [0, -50]);

  const springConfig = { damping: 25, stiffness: 100 };
  const springScale = useSpring(scale, springConfig);
  const springScale2 = useSpring(scale2, springConfig);
  const springScale3 = useSpring(scale3, springConfig);
  const springY = useSpring(y, springConfig);
  const springY2 = useSpring(y2, springConfig);

  const headingTransform = useTransform([springScale], ([s]) => `scale(${s}) translateZ(0)`);
  const logoTransform = useTransform([springScale2, springY], ([s, transY]) => 
    isMobile 
      ? `translateY(${transY}px) scale(${s}) translateZ(0)` 
      : `translateY(${transY}px) scale(${s}) perspective(1200px) rotateX(60deg) translateZ(0)`
  );
  const cardTransform = useTransform([springScale3, springY2], ([s, transY]) => `translateY(${transY}px) scale(${s}) translateZ(0)`);

  return (
    <section
      id="skills"
      className="w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-2 overflow-x-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          transform: headingTransform, 
          willChange: "transform",
        }}
        className="w-full"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-10 sm:mb-12 lg:mb-6 text-center lg:ml-[50vw] lg:-translate-x-22.5 lg:text-left">
          Skills
        </h2>
      </motion.div>

      <div style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ 
            transform: logoTransform, 
            willChange: "transform",
            marginLeft: isMobile ? "0" : undefined,
          }}
          className="mb-12 sm:mb-16 lg:mb-0"
        >
          <div className="relative w-full lg:-left-10">
            <LogoLoop
              logos={techLogos.slice(0, isMobile ? 8 : 13)} 
              speed={isMobile ? 40 : 80}
              direction="left"
              logoHeight="clamp(30px, 8vw, 80px)"
              gap="clamp(20px, 5vw, 60px)"
              hoverSpeed={0}
              scaleOnHover={!isMobile}
              fadeOut
              fadeOutColor="transparent"
              ariaLabel="Technology partners"
              style={{
                transformOrigin: "center center",
                width: isMobile ? "100%" : "150vw",
                marginLeft: isMobile ? "0" : "-25vw",
              }}
            />

            <LogoLoop
              logos={techLogos.slice(0, isMobile ? 8 : 13)}
              speed={isMobile ? 35 : 60} 
              direction="right"
              logoHeight="clamp(50px, 10vw, 90px)"
              gap="clamp(20px, 5vw, 80px)"
              hoverSpeed={0}
              fadeOut
              scaleOnHover={!isMobile}
              fadeOutColor="transparent"
              useCustomRender={false}
              className="mt-4 sm:mt-5"
              style={{
                transformOrigin: "center center",
                width: isMobile ? "100%" : "150vw",
                marginLeft: isMobile ? "0" : "-25vw",
              }}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ 
            transform: cardTransform, 
            willChange: "transform",
          }}
        >
          <div className="px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:mt-20 lg:p-4 sm:lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 place-items-center">
            <TiltedCard
              imageSrc={creato}
              altText="Donut"
              captionText="Donut in 3d"
              containerHeight={isMobile ? "250px" : "300px"}
              containerWidth={isMobile ? "250px" : "300px"}
              imageHeight={isMobile ? "250px" : "300px"}
              imageWidth={isMobile ? "250px" : "300px"}
              rotateAmplitude={isMobile ? 8 : 12}
              scaleOnHover={isMobile ? 1.02 : 1.05}
              showMobileWarning={false}
              showTooltip={!isMobile}
              displayOverlayContent
              overlayContent={
                <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-widest sm:tracking-[0.15em] leading-tight px-3 sm:px-4 max-w-[90%]">
                  Creating Websites
                  <br />
                  in React
                </p>
              }
            />
            <TiltedCard
              imageSrc={coding}
              altText="coding"
              captionText="clean code"
              containerHeight={isMobile ? "250px" : "300px"}
              containerWidth={isMobile ? "250px" : "300px"}
              imageHeight={isMobile ? "250px" : "300px"}
              imageWidth={isMobile ? "250px" : "300px"}
              rotateAmplitude={isMobile ? 8 : 12}
              scaleOnHover={isMobile ? 1.02 : 1.05}
              showMobileWarning={false}
              showTooltip={!isMobile}
              displayOverlayContent
              overlayContent={
                <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-widest sm:tracking-[0.15em] leading-tight px-3 sm:px-4 max-w-[90%]">
                  Structured
                  <br />
                  Development
                </p>
              }
            />
            <TiltedCard
              imageSrc={donut}
              altText="Donut"
              captionText="Donut in Blender"
              containerHeight={isMobile ? "250px" : "300px"}
              containerWidth={isMobile ? "250px" : "300px"}
              imageHeight={isMobile ? "250px" : "300px"}
              imageWidth={isMobile ? "250px" : "300px"}
              rotateAmplitude={isMobile ? 8 : 12}
              scaleOnHover={isMobile ? 1.02 : 1.05}
              showMobileWarning={false}
              showTooltip={!isMobile}
              displayOverlayContent
              overlayContent={
                <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-widest sm:tracking-[0.15em] leading-tight px-3 sm:px-4 max-w-[90%]">
                  3D Modeling
                  <br />
                  and Animation
                </p>
              }
            />
          </div>
        </motion.div>
      </div>
      <div
        className="mt-10 sm:mt-12 lg:mt-0"
        style={{
          transform: isMobile ? "none" : undefined,
          height: "clamp(150px, 30vw, 230px)",
        }}
      >
        <CurvedLoop
          marqueeText="Be ✦ Creative ✦ With ✦ React ✦"
          className="m-0 h-max"
        />
      </div>
    </section>
  );
}