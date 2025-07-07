'use client'

import { motion } from 'framer-motion'
import './Services.css'

export default function Services() {
  return (
    <section id="services" className="section services">
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">🛠 Services</h2>
        <p className="section-description">Services I offer will go here.</p>
      </motion.div>
    </section>
  )
}
