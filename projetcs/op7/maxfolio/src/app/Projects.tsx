'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './Projects.css'

const NUM_ROWS = 4
const CARDS_PER_ROW = 5

type Project = {
  image: string
  title: string
  description: string
  demo: string
  github: string
}

const originalProjects: Project[] = Array.from({ length: NUM_ROWS * CARDS_PER_ROW }, (_, i) => ({
  image: `/projects/card${i + 1}.png`,
  title: `Project ${i + 1}`,
  description: 'This is a dummy description for the project showcasing key features and tools used.',
  demo: '#',
  github: '#'
}))

export default function ProjectsScroller() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <section id="projects" className="projects-scroll-section" ref={sectionRef}>

      <div className="background-decor" aria-hidden />

      <h2 className="projects-heading">📁 My Projects</h2>

      {Array.from({ length: NUM_ROWS }).map((_, rowIndex) => {
        const isEven = rowIndex % 2 === 0
        const x = useTransform(scrollYProgress, [0, 1], isEven ? ['0%', '-25%'] : ['-25%', '0%'])

        const start = rowIndex * CARDS_PER_ROW
        const end = start + CARDS_PER_ROW
        const rowProjects = originalProjects.slice(start, end).concat(originalProjects.slice(start, end))

        return (
          <div className="project-row-container" key={`container-${rowIndex}`}> 
            <motion.div
              className="project-row infinite"
              style={{ x }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: rowIndex * 0.15 }}
            >
              {rowProjects.map((project, cardIndex) => (
                <motion.div
                  className="project-card"
                  key={`${rowIndex}-${cardIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: cardIndex * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-img-wrapper">
                    <img src={project.image} alt={project.title} className="project-img" />
                  </div>
                  <div className="project-meta">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-stack">Tech: React, Node.js</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )
      })}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="project-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-content">
                <div className="modal-left">
                  <img src={selectedProject.image} alt={selectedProject.title} className="modal-img" />
                </div>
                <div className="modal-right">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <p className="modal-description">{selectedProject.description}</p>
                  <div className="modal-actions">
                    <a href={selectedProject.demo} target="_blank">🔗 Live Demo</a>
                    <a href={selectedProject.github} target="_blank">🐙 GitHub</a>
                  </div>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
