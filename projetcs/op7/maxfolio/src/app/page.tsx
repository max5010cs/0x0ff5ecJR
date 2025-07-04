'use client'

import VisitorModal from '@/components/VisitorModal'
import './styles/page.css'

export default function HomePage() {
  return (
    <div className="page-content">
      <VisitorModal />

      {/* 🎌 Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">👋 Hi, I’m Max</h1>
          <p className="hero-subtitle">Full‑stack & Cybersecurity Developer</p>
          <a href="#projects" className="hero-cta">View My Work ↓</a>
        </div>
      </section>

      {/* 🔧 Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="section-heading">🛠 Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>🔐 Placky</h3>
            <p>A secure real-time chatroom with encrypted messaging.</p>
          </div>
          <div className="project-card">
            <h3>📄 OnePageResume</h3>
            <p>AI-powered resume builder with downloadable PDFs.</p>
          </div>
        </div>
      </section>

      {/* 📬 Contact CTA */}
      <section className="contact-banner">
        <h2>🤝 Let’s build something great together</h2>
        <a href="/contact" className="contact-button">Contact Me</a>
      </section>
    </div>
  )
}
