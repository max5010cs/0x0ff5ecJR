'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close mobile menu on nav click
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact', cta: true },
  ]

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
          className="navbar-logo"
        >
          Max
        </a>

        <button
          className={`burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span></span>
        </button>

        <nav className={`navbar-links ${open ? 'show' : ''}`}>
          {links.map(({ id, label, cta }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(id)
                setOpen(false)
              }}
              className={`nav-link ${cta ? 'cta' : ''}`}
            >
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
