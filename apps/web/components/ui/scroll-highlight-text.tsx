'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollHighlightTextProps {
  children: React.ReactNode
  className?: string
}

export function ScrollHighlightText({ children, className }: ScrollHighlightTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [highlightedWords, setHighlightedWords] = useState<Set<number>>(new Set())

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how much of the element is in view
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      )

      // Get all word spans
      const wordSpans = element.querySelectorAll('[data-word-index]')
      const totalWords = wordSpans.length

      // Calculate how many words should be highlighted based on scroll progress
      const wordsToHighlight = Math.floor(scrollProgress * totalWords)

      // Update highlighted words
      const newHighlighted = new Set<number>()
      for (let i = 0; i < wordsToHighlight; i++) {
        newHighlighted.add(i)
      }
      setHighlightedWords(newHighlighted)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Split text into words and wrap each in a span
  const renderHighlightedText = (text: string) => {
    const words = text.split(' ')
    return words.map((word, index) => (
      <span
        key={index}
        data-word-index={index}
        className={cn(
          'transition-colors duration-500 ease-out',
          highlightedWords.has(index) ? 'text-foreground' : 'text-muted-foreground/40'
        )}
      >
        {word}{index < words.length - 1 ? ' ' : ''}
      </span>
    ))
  }

  return (
    <div ref={ref} className={className}>
      {typeof children === 'string' ? renderHighlightedText(children) : children}
    </div>
  )
}
