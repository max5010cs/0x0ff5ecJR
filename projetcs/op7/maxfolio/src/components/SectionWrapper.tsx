// src/components/SectionWrapper.tsx
import React from 'react'
import './SectionWrapper.css'

export default function SectionWrapper({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`section-wrapper ${className}`}>
      <div className="section-inner">{children}</div>
    </section>
  )
}
