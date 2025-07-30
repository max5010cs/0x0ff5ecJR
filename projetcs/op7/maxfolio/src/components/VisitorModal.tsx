'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import './VisitorModal.css'

export default function VisitorModal() {
  const [locked, setLocked] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [shouldShowModal, setShouldShowModal] = useState(true)
  const [showWelcomeBack, setShowWelcomeBack] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Follow mouse
  useEffect(() => {
    if (locked) return
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - 160,
        y: e.clientY - 237,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [locked])

  // Lock on first click
  useEffect(() => {
    const handleClick = () => setLocked(true)
    if (!localStorage.getItem('visitorName')) {
      window.addEventListener('click', handleClick, { once: true })
    }
    return () => window.removeEventListener('click', handleClick)
  }, [])

  // On load: hide modal if already visited
  useEffect(() => {
    const storedName = localStorage.getItem('visitorName')
    if (storedName) {
      setShouldShowModal(false)
      setShowWelcomeBack(true)
      setName(storedName)

      // Hide welcome popup after 2s
      setTimeout(() => setShowWelcomeBack(false), 2000)
    }
  }, [])

const handleSubmit = async () => {
  if (!name.trim()) return alert('Name is required.')

  // Try sending to Supabase
  const { error } = await supabase.from('visitors').insert([
    { name: name.trim(), company: company.trim() || null },
  ])

  if (error) {
    console.warn('[VisitorModal] Supabase error:', error.message)

    // Optional: show a friendly warning in the UI
    const failedMessage = document.createElement('div')
    failedMessage.textContent = 'Thanks. You may continue!'
    failedMessage.className = 'visitor-warning'
    document.body.appendChild(failedMessage)
    setTimeout(() => failedMessage.remove(), 3000)
  }

  // ✅ Proceed anyway
  localStorage.setItem('visitorName', name.trim())
  setSubmitted(true)

  const confetti = document.createElement('div')
  confetti.className = 'confetti'
  document.body.appendChild(confetti)
  setTimeout(() => confetti.remove(), 1000)

  setTimeout(() => {
    setShouldShowModal(false)
  }, 2000)
}


  return (
    <>
      {/* Backdrop blur only if modal is showing and not submitted */}
      {shouldShowModal && !submitted && <div className="visitor-backdrop" />}

      {/* Modal */}
      {shouldShowModal && (
        <div
          ref={modalRef}
          className={`visitor-modal ${submitted ? 'submitted' : ''}`}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {!submitted ? (
            <>
              <Image
                src="/avatar.png"
                alt="Avatar"
                className="visitor-avatar"
                width={60}
                height={60}
            />

              <h2>Who’s visiting?</h2>
              <input
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </>
          ) : (
            <div className="thanks-popup">
              <div className="confetti-burst" />
              <p>Thanks, {name}! 🎉</p>
            </div>
          )}
        </div>
      )}

      {/* Welcome Back Toast */}
      {showWelcomeBack && (
        <div className="welcome-back-popup">
          👋 Welcome back, {name}!
        </div>
      )}
    </>
  )
}
