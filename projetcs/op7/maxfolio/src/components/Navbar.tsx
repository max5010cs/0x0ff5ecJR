import Link from 'next/link'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">Max</Link>
        <nav className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
          {/* Add this if using /services */}
          {/* <Link href="/services">Services</Link> */}
        </nav>
      </div>
    </header>
  )
}
