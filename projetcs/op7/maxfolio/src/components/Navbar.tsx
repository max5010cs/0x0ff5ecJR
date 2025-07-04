'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact', cta: true },
  ]

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">Max</Link>

        <button
          className="burger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={open ? 'open' : ''}></span>
        </button>

        <nav className={`navbar-links ${open ? 'show' : ''}`}>
          {links.map(({ href, label, cta }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname === href ? 'active' : ''} ${cta ? 'cta' : ''}`}
              onClick={() => setOpen(false)} // close on mobile click
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
