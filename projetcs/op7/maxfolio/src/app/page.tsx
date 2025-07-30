'use client'

import VisitorModal from '@/components/VisitorModal'
import Home from './Home'
import Projects from './Projects'
import Services from './Services'
import Contact from './Contact'
import './page.css'

export default function Page() {
  return (
    <>
      <VisitorModal />
      <main className="page-content">
        <Home />
        <Projects />
        <Services />
        <Contact />
      </main>
    </>
  )
}
