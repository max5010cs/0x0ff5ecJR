'use client'

import { motion } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">📬 Contact</h2>
        <p className="section-description">Get in touch with me soon.</p>
      </motion.div>
    </section>
  )
}
