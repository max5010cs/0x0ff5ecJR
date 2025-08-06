// src/app/layout.tsx

import './styles/global.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RouteTransition from '@/components/RouteTransition'
import ThemeToggle from '@/components/ThemeToggle'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Max — Developer & Builder',
  description: 'Portfolio of full-stack and cybersecurity projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Navbar />
        <ThemeToggle />
        <main className="layout-main">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
