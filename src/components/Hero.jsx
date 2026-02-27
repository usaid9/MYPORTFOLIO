import { motion, useScroll, useTransform } from "framer-motion";
import TrueFocus from "../../components/TrueFocus";
import BlurText from "../../components/BlurText";
import GlareHover from "../../components/GlareHover";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Use lg breakpoint (1024px)
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();
  
  // Disable scroll animations ONLY on mobile/tablet
  const scale = useTransform(scrollYProgress, [0.1, 0.2], isMobile ? [1, 1] : [1, 0.8]);
  const y = useTransform(scrollYProgress, [0.1, 0.2], isMobile ? [0, 0] : [0, 50]);

  return (
    <section className="h-[80vh] lg:min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ scale, y }}
        className="w-full max-w-5xl"
      >
        {/* Main Heading */}
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Hi, I'm Usaid
        </h1>

        {/* Subheading with TrueFocus */}
        <div className="mt-9 text-gray-500 dark:text-gray-400 text-2xl lg:text-7xl font-medium">
          <TrueFocus
            sentence="MERN-Stack Graphics-Design 3D-Blender"
            manualMode={false}
            blurAmount={1}
            borderColor="#014348ae"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
        </div>

        <div className="mt-9 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 w-full max-w-4xl mx-auto">
          <a
            href="#contact"
            className=" sm:w-auto px-6 py-3 sm:px-8 sm:py-3 lg:px-12 bg-[#014348ae] text-white rounded-full hover:bg-[#014348f0] transition-colors duration-300"
          >
            <BlurText
              text="Contact me!"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-base sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap m-0"
            />
          </a>

          <a href="#" download className="w-full sm:w-auto">
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.8}
              glareAngle={-30}
              glareSize={200}
              transitionDuration={1050}
              playOnce
              style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                borderRadius: "9999px",
              }}
            >
              <h2 className="font-bold text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl m-0 px-6 py-3 sm:px-8 text-center">
                Download Resume
              </h2>
            </GlareHover>
          </a>
        </div>
      </motion.div>
    </section>
  );
}