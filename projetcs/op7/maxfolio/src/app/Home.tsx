'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Home.css'

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'light' | 'dark'
    setTheme(current)

    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute('data-theme') as 'light' | 'dark'
      setTheme(updated)
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Fix auto-scroll to projects on refresh by forcing scroll to top
    window.scrollTo(0, 0)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className={`hero-section ${theme}`}>
      <div className="hero-container">
        {/* Left: Profile picture */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <img src="/pfp.png" alt="Max avatar" className="hero-img" />
        </motion.div>

        {/* Right: Text content */}
        <motion.div
          className="hero-right"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.h1
            className="hero-title"
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          >
            Hi, I’m <span className="gradient-name">Max</span>.
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          >
            I’m a security-focused full-stack developer building tools that put privacy and user experience first.
            <br />
            From secure infrastructure to intuitive interfaces, I create digital products that are both robust and human-friendly.
          </motion.p>
          <motion.a
            href="#projects"
            className="hero-cta"
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>

      <div className="scroll-hint">↓</div>
    </section>
  )
}
