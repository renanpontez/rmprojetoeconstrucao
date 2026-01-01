'use client'

import { useEffect, useState } from 'react'

export function ParallaxBuilding() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / documentHeight, 1)

      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate the translateY based on scroll progress
  // Start from bottom (100%) and move to top (0%)
  const translateY = 100 - (scrollProgress * 100)

  return (
    <div className="fixed right-0 top-0 bottom-0 w-64 pointer-events-none z-0 overflow-hidden hidden lg:block">
      <div
        className="absolute right-0 bottom-0 w-full transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${translateY}%)`,
        }}
      >
        <BuildingSVG />
      </div>
    </div>
  )
}

function BuildingSVG() {
  return (
    <svg
      viewBox="0 0 200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto opacity-5"
    >
      {/* Building outline */}
      <rect x="40" y="0" width="120" height="600" stroke="currentColor" strokeWidth="2" fill="none" />

      {/* Vertical lines (structure) */}
      <line x1="70" y1="0" x2="70" y2="600" stroke="currentColor" strokeWidth="1.5" />
      <line x1="100" y1="0" x2="100" y2="600" stroke="currentColor" strokeWidth="1.5" />
      <line x1="130" y1="0" x2="130" y2="600" stroke="currentColor" strokeWidth="1.5" />

      {/* Floor 1 (bottom) - y: 540-600 */}
      <line x1="40" y1="540" x2="160" y2="540" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 1 */}
      <rect x="50" y="555" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="555" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="555" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="555" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 2 - y: 480-540 */}
      <line x1="40" y1="480" x2="160" y2="480" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 2 */}
      <rect x="50" y="495" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="495" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="495" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="495" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 3 - y: 420-480 */}
      <line x1="40" y1="420" x2="160" y2="420" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 3 */}
      <rect x="50" y="435" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="435" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="435" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="435" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 4 - y: 360-420 */}
      <line x1="40" y1="360" x2="160" y2="360" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 4 */}
      <rect x="50" y="375" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="375" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="375" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="375" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 5 - y: 300-360 */}
      <line x1="40" y1="300" x2="160" y2="300" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 5 */}
      <rect x="50" y="315" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="315" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="315" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="315" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 6 - y: 240-300 */}
      <line x1="40" y1="240" x2="160" y2="240" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 6 */}
      <rect x="50" y="255" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="255" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="255" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="255" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 7 - y: 180-240 */}
      <line x1="40" y1="180" x2="160" y2="180" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 7 */}
      <rect x="50" y="195" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="195" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="195" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="195" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 8 - y: 120-180 */}
      <line x1="40" y1="120" x2="160" y2="120" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 8 */}
      <rect x="50" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 9 - y: 60-120 */}
      <line x1="40" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="2" />
      {/* Windows Floor 9 */}
      <rect x="50" y="75" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="75" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="75" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="75" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Floor 10 (top) - y: 0-60 */}
      {/* Windows Floor 10 */}
      <rect x="50" y="15" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="75" y="15" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="108" y="15" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="133" y="15" width="12" height="20" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Roof detail */}
      <polygon points="40,0 100,0 160,0 160,10 40,10" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}
