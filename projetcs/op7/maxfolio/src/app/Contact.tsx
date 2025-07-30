'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

type Command = {
  cmd: string
  label: string
  url: string
  logs: string[]
}

const commands: Command[] = [
  {
    cmd: 'contact --telegram',
    label: 'Telegram',
    url: 'https://t.me/levelup1853',
    logs: [
      '[SYS] Initiating Telegram protocol...',
      '[NET] Resolving t.me DNS…',
      '[OK] DNS lookup successful.',
      '[SEC] Establishing TLS handshake…',
      '[OK] Secure channel open.',
      '[CMD] Preparing redirect payload…',
    ],
  },
  {
    cmd: 'contact --email',
    label: 'Email',
    url: 'max5010cs@gmail.com',
    logs: [
      '[SYS] Initiating Email protocol...',
      '[NET] Looking up MX records…',
      '[OK] MX records found.',
      '[SEC] Encrypting headers…',
      '[OK] SMTP handshake ready.',
      '[CMD] Preparing redirect payload…',
    ],
  },
  {
    cmd: 'contact --whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/998948900038',
    logs: [
      '[SYS] Initiating WhatsApp WebStack…',
      '[NET] Contacting web.whatsapp.com…',
      '[OK] Session token validated.',
      '[SEC] Negotiating encryption…',
      '[OK] Channel secure.',
      '[CMD] Preparing redirect payload…',
    ],
  },
]

const getRealLogs = () => {
  try {
    return [
      `[ENV] UserAgent: ${navigator.userAgent}`,
      `[ENV] Platform: ${navigator.platform}`,
      `[ENV] Resolution: ${window.innerWidth}x${window.innerHeight}`,
      `[ENV] Time: ${new Date().toLocaleTimeString()}`,
    ]
  } catch {
    return []
  }
}

export default function Contact() {
  const [logs, setLogs] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [processing, setProcessing] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState('')

  const typeLine = (line: string, speed = 20 + Math.random() * 40) =>
    new Promise<void>((resolve) => {
      let idx = 0
      const interval = setInterval(() => {
        idx++
        setCurrentLine(line.slice(0, idx))
        if (idx >= line.length) {
          clearInterval(interval)
          setLogs((prev) => [...prev, line])
          setCurrentLine('')
          resolve()
        }
      }, speed)
    })

  const sleep = (ms: number) =>
    new Promise((res) => setTimeout(res, ms))

  const runLogs = async (allLogs: string[], url: string) => {
    setLogs([])
    setCurrentLine('')
    setProcessing(true)
    setSelectedUrl(url)

    for (let log of allLogs) {
      const speedType = Math.random()
if (speedType < 0.2) {
  // very fast log — now twice as fast
  setLogs((prev) => [...prev, log])
  await sleep(40 + Math.random() * 40)
} else if (speedType < 0.5) {
  // medium speed — faster typing
  await typeLine(log, 5 + Math.random() * 10)
} else {
  // slow, typing log — also faster
  await typeLine(log, 15 + Math.random() * 20)
}
await sleep(50 + Math.random() * 100) // inter-line delay also halved
    }

    await sleep(500)
    window.location.href = url
  }

  const handleClick = (cmd: Command) => {
    if (processing) return

    const fullLog = [
      `> ${cmd.cmd}`,
      ...cmd.logs.slice(0, 3),
      ...getRealLogs(),
      ...cmd.logs.slice(3),
      '[OK] Payload deployed.',
      `> Redirecting to ${cmd.label}…`,
    ]
    runLogs(fullLog, cmd.url)
  }

  return (
    <section id="contact" className="section contact">
      <motion.div
        className="contact-terminal large"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="terminal-title">MaxCLI ~ contact</span>
        </div>
        <div className="terminal-body">
          {!processing ? (
            <>
              <p className="prompt">{'>'} Select your channel:</p>
              {commands.map((c, i) => (
                <div
                  key={i}
                  className="command-line"
                  onClick={() => handleClick(c)}
                >
                  <span className="prompt">&gt; </span>
                  {c.cmd}
                </div>
              ))}
            </>
          ) : (
            <div className="log-section">
              {logs.map((l, i) => (
                <p key={i} className="log-line">{l}</p>
              ))}
              {currentLine && (
                <p className="log-line">
                  {currentLine}
                  <span className="cursor">█</span>
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
