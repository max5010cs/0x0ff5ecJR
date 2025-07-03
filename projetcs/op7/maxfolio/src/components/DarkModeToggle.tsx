'use client'

interface Props {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function DarkModeToggle({ theme, toggleTheme }: Props) {
  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        padding: '8px 14px',
        borderRadius: '8px',
        background: theme === 'dark' ? '#333' : '#eee',
        color: theme === 'dark' ? '#fff' : '#000',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
    </button>
  )
}
