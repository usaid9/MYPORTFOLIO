import React from "react";
import { motion } from "framer-motion";
import BlurText from "../../components/BlurText";
import RotatingText from "../../components/RotatingText";
export default function About() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto px-6 py-16"
        >
            <h2 id="about" className="text-3xl font-semibold mb-6">About Me</h2>

            <RotatingText
                texts={['React', 'Bits', 'Is', 'Cool!']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />
            <BlurText
                text="Passionate About Creating Digital Excellence"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-base sm:text-xl md:text-2xl lg:text-4xl m-0  "
            />
            <p className="leading-relaxed max-w-3xl">
                I specialize in React-based frontends and scalable backend systems using
                Node.js and MongoDB. My focus is performance, accessibility, and clean UI.
            </p>
        </motion.section>
    );
}