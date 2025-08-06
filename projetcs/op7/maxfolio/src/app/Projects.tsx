'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import ParticlesBackground from '../components/ParticlesBackground'
import Image from 'next/image'
import './Projects.css'

const NUM_ROWS = 3
const CARDS_PER_ROW = 5

interface Project {
  image: string
  title: string
  description: string
  demo: string
  github: string
  techStack: string[]
}

const realProjects: Project[] = [
  {
    image: '/projects/placky.png',
    title: 'Placky – Fully Client-Side Encrypted Chat',
    description:
      'Placky is a fully client-side, end-to-end encrypted chatroom that prioritizes your privacy. No messages are stored, no data is sent to a server — everything happens securely in your browser. Designed for developers, privacy enthusiasts, and anyone who values secure communication.',
    demo: 'https://0x0ff5ec-jr.vercel.app',
    github: 'https://github.com/max5010cs/0x0ff5ec/op5',
    techStack: ['React', 'Vite', 'TypeScript', 'WebSocket', 'Crypto API']
  },
  {
    image: '/projects/secheaders.png',
    title: 'SecureScan – HTTP Security Header Analyzer',
    description:
      "SecureScan is a web-based tool that analyzes your website's HTTP security headers to help identify potential misconfigurations and vulnerabilities. It provides a comprehensive report on headers like Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, and more.",
    demo: 'https://github.com/max5010cs/security-header-analyzer.git',
    github: 'https://github.com/max5010cs/security-header-analyzer.git',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'Puppeteer']
  },
  {
    image: '/projects/maxrecon.png',
    title: 'MaxRecon – Modular Recon Tool for Web Targets',
    description:
      'MaxRecon is a modular, full-stack web reconnaissance platform designed for penetration testers and security researchers. It allows users to perform automated scans using tools like Nmap and HTTPX via a simple React-based frontend.',
    demo: 'https://github.com/yourusername/maxRecon.git',
    github: 'https://github.com/yourusername/maxRecon.git',
    techStack: ['React', 'TypeScript', 'Express', 'Nmap', 'HTTPX']
  },
  {
    image: '/projects/onepageresume.png',
    title: 'OnePageResume – AI Resume Generator',
    description:
      'OnePageResume is a full-stack AI tool that transforms raw personal and career data into polished, professional one-page resumes in seconds. The backend supports photo uploads, customizable themes, and PDF downloads.',
    demo: 'https://0x0ff5ec-jr-zmly.vercel.app',
    github: 'https://github.com/max5010cs/0x0ff5ecJR/tree/main/projetcs/op6/onepageresume',
    techStack: ['React', 'Vite', 'Node.js', 'OpenRouter', 'PDF Export']
  },
  {
    image: '/projects/lillocker.png',
    title: 'LockLoop – Auto Linux Screen Locker (Python)',
    description:
      'LockLoop is a simple Python tool that automatically locks your Linux screen at custom intervals and re-locks after each unlock. It uses xflock4 and is ideal for Kali Linux demos or scripting practice.',
    demo: 'https://github.com/max5010cs/0x0ff5ec/op3',
    github: 'https://github.com/max5010cs/0x0ff5ec/op3',
    techStack: ['Python', 'Bash', 'xflock4', 'TTY']
  },

  {
    image: '/projects/live_monitor.png',
    title: 'Live Monitoring Bot',
    description:
      'A Python automation tool that monitors the U.S. visa appointment calendar for changes, captures visual updates, and sends real-time screenshot alerts via Telegram. It uses Selenium and image diffing to ensure precise tracking of appointment slot availability.',
    demo: 'https://github.com/max5010cs/monitoring.git',
    github: 'https://github.com/max5010cs/monitoring.git',
    techStack: ['Python', 'Selenium', 'Pillow (Image Processing)', 'Telegram Bot API', 'Chrome DevTools Protocol', 'Bash / Linux environment (for scheduling)']
  },


    {
    image: '/projects/logger.png',
    title: '🛡️ Stealth Keylogger with Active Window Tracking',
    description:
      'A Python-based keylogger built for ethical debugging, user behavior research, and automation testing. It logs keystrokes along with active window titles and timestamps, and features a kill switch based on a secret phrase to safely stop logging. Compatible with both Linux and Windows systems.',
    demo: 'https://github.com/max5010cs/0x0ff5ec/op2',
    github: 'https://github.com/max5010cs/0x0ff5ec/op2',
    techStack: ['Python', 'Pynput', 'xdotool (Linux) / win32gui (Windows)', 'I/O logging', ' Flatpak']
  },


      {
    image: '/projects/chatroom.png',
    title: 'About building a chat app where even the server can not eavesdrop.',
    description:
      'The Idea\n\nI wanted to build a chatroom — but not just another chatroom.\n\nThis one had to be:\n\n- Fully end-to-end encrypted\n- Zero logs\n- No accounts\n- No message history\n- So ephemeral that closing the tab erases everything\n\nBasically, a secure chat where I, the developer, wouldn’t even be able to spy on the users — even if I wanted to.\n\nThat\'s how ShadowTalk started.\n\nBuilding It\n\n🔌 Real-Time Backbone — WebSockets\n\nI started with a Node.js backend and used the ws package to set up a raw WebSocket server. No fancy frameworks. The backend only had one job:\n\nRelay messages between peers — blindly.\n\nNo saving. No inspecting. Just receive, forward, forget.\n\nTo isolate conversations, I built a super lightweight room manager (rooms.js) that matches clients by room IDs. Think of it like "anonymous rooms" — two clients enter the same room ID, and they’re paired.',
    demo: 'https://0x0ff5ec-jr.vercel.app',
    github: 'https://0x0ff5ec-jr.vercel.app',
    techStack: ['Vite', 'Web Crypto API for AES', 'Node.js', 'ws', 'Stateless relay logic (no DB)']
  },


        {
    image: '/projects/encryption.png',
    title: 'Simulated Ransomware encryption for Educational Use',
    description:
      'This project is a Python-based ransomware simulation, created for educational and testing purposes. It encrypts a specified file using a randomly generated key, then protects that key using a password-derived lock (via PBKDF2). The victim receives a key.txt and an automatically generated decryptor.py file — but to unlock the data, they need to know the magic word.\n\nIt mimics the mechanics of real-world ransomware — but it is local, safe, and for study only.\n\n---\n\n## 🛠️ What It Does\n\n1. Encrypts important.txt and deletes the original  \n2. Generates a secure encryption key (Fernet)  \n3. Locks that key using a "magic word" via PBKDF2 key derivation  \n4. Saves a key.txt file that includes the salt and locked key  \n5. Auto-generates a decryption script (decryptor.py) for recovery\n\nThe result: the original file is gone, the encrypted version remains, and recovery is only possible via the correct passphrase.\n\n---\n\n## ⚠️ Disclaimer\n\nThis tool is for educational and ethical use only.\n\nDo not deploy this against others systems, use it to interfere with data you don’t own, or attempt to hide its behavior. This is intended to explore how encryption-based file-locking mechanisms work — particularly to help people understand, prevent, and analyze ransomware behavior.\n\nYou are fully responsible for how you use this code.',
    demo: 'https://github.com/max5010cs/0x0ff5ec/op1',
    github: 'https://github.com/max5010cs/0x0ff5ec/op1',
    techStack: ['Python 3', 'cryptography` library', 'AES-based symmetric encryption', 'ws', 'Salted + encoded secret key handling']
  },


          {
    image: '/projects/orderly.png',
    title: 'Phone-Based Auth System for a Multi-Feature Platform',
    description:
      'This is a modular login and registration system built for a full-stack restaurant-style platform with multiple feature dashboards: Queue Management, Dine-in Booking, and Pickup Ordering.\n\nUsers register with their phone number and a magic word (password), which acts as their secure credential. The process involves:\n\n1. Selecting a country and entering a phone number  \n2. Receiving a simulated OTP (currently mocked)  \n3. Verifying the code and entering a magic word  \n4. Selecting a feature (queue, dine-in, pickup) during registration\n\nOnce registered, users can log in by simply re-entering their phone and magic word. Based on the feature they registered with, they’re redirected to the appropriate dashboard.\n\n---\n\n## 🔐 Auth Flow Summary\n\n- OTP-based verification (mocked server-side)  \n- Magic word must be unique per user  \n- MongoDB stores user phone, magic word, and associated feature  \n- Login returns the feature name, which is used to dynamically route users to their personalized dashboard\n\n---\n\n## 🚨 Notes\n\nThis auth flow is designed with separation of features in mind — a user logs into the same platform but lands on different routes (/queuedashboard, /dineindashboard, etc.) depending on their role.\n\nFor testing/demo purposes, the OTP is not actually sent but logged in the backend',
    demo: '-',
    github: '-',
    techStack: ['Typescript', 'Node.js', 'React', 'MongoDB', 'Mongoose', 'Custom OTP']
  }
]


const originalProjects = realProjects

export default function ProjectsScroller() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  // Call useTransform a fixed number of times for each row
  const x0 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const x1 = useTransform(scrollYProgress, [0, 1], ['-25%', '0%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const transforms = [x0, x1, x2]

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <section id="projects" className="projects-scroll-section" ref={sectionRef}>
      <div className="particles-wrapper">
        <div className="gradient-bg" />
        <ParticlesBackground />
      </div>

      {/* 🔁 Project Rows */}
      {Array.from({ length: NUM_ROWS }).map((_, rowIndex) => {
        const x = transforms[rowIndex]
        const start = rowIndex * CARDS_PER_ROW
        const end = start + CARDS_PER_ROW
        const rowProjects = originalProjects.slice(start, end).concat(originalProjects.slice(start, end))

        return (
          <div className="project-row-container" key={`container-${rowIndex}`}>
            <motion.div
              className="project-row infinite"
              style={isMobile ? {} : { x }}
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
                  tabIndex={0}
                >
                  <div className="project-img-wrapper">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="project-img"
                      unoptimized
                    />
                  </div>
                  <div className="project-meta">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="tech-badges">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )
      })}

      {/* 🔍 Modal */}
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
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-content">
                <div className="modal-left">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={600}
                    height={350}
                    className="modal-img"
                    unoptimized
                  />
                </div>
                <div className="modal-right">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <p className="modal-description">{selectedProject.description}</p>
                  <div className="modal-tech tech-badges">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span className="tech-badge" key={idx}>{tech}</span>
                    ))}
                  </div>
                  <div className="modal-actions">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">🔗 Live Demo</a>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
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
