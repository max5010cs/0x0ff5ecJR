'use client'

import { motion } from 'framer-motion'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">📁 Projects</h2>
        <p className="section-description">Coming soon: my favorite builds.</p>
      </motion.div>
    </section>
  )
}
