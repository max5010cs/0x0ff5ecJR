'use client'

import { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { ISourceOptions, Engine } from 'tsparticles-engine'

export default function ParticlesBackground() {
  const [options, setOptions] = useState<ISourceOptions | null>(null)

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  useEffect(() => {
    fetch('/tsParticles.json')
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.error('Failed to load tsParticles config:', err))
  }, [])

  if (!options) return null

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
    />
  )
}
