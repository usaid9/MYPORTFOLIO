
import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            whileHover={{ y: -6 }}
            key={project.title}
            className="bg-gray-200 dark:bg-gray-900 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}