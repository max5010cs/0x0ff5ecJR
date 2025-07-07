'use client'
import { useGLTF } from '@react-three/drei'

export default function AnimeHead(props: any) {
  const { scene } = useGLTF('/anime-head.glb') // ← because it's directly in public/
  return <primitive object={scene} {...props} />
}
