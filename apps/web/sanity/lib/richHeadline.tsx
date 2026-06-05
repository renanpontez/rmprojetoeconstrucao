import { Fragment, type ReactNode } from 'react'
import type { RichHeadline } from '../types'

type Span = { _key?: string; text?: string; marks?: string[] }

/**
 * Renders a `richHeadline` portable-text array. Spans marked with the
 * `italicAccent` decorator are wrapped in a span with the supplied class
 * (defaults to the serif italic accent used across the site).
 */
export function richHeadlineToReact(
  rh: RichHeadline | undefined,
  italicClass = 'font-serif font-light italic',
): ReactNode {
  if (!rh?.length) return null

  return rh.map((block, bi) => {
    if (!block || (block as { _type?: string })._type !== 'block') return null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = ((block as any).children ?? []) as Span[]
    return (
      <Fragment key={(block as { _key?: string })._key ?? `b-${bi}`}>
        {bi > 0 ? <br /> : null}
        {children.map((child, ci) => {
          const key = child._key ?? `${bi}-${ci}`
          const isItalic = child.marks?.includes('italicAccent')
          return isItalic ? (
            <span key={key} className={italicClass}>
              {child.text}
            </span>
          ) : (
            <Fragment key={key}>{child.text}</Fragment>
          )
        })}
      </Fragment>
    )
  })
}

/**
 * Hero variant — wraps each portable-text block in a `<span className="reveal-word">`
 * so per-line animations keep working (playbook §5).
 */
export function richHeadlineToHero(
  rh: RichHeadline | undefined,
  italicClass = 'font-serif font-light italic text-white/95',
): ReactNode {
  if (!rh?.length) return null

  return rh.map((block, bi) => {
    if (!block || (block as { _type?: string })._type !== 'block') return null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = ((block as any).children ?? []) as Span[]
    return (
      <Fragment key={(block as { _key?: string })._key ?? `b-${bi}`}>
        {bi > 0 ? <br className="hidden sm:block" /> : null}
        <span className="reveal-word">
          {children.map((child, ci) => {
            const key = child._key ?? `${bi}-${ci}`
            const isItalic = child.marks?.includes('italicAccent')
            return isItalic ? (
              <span key={key} className={italicClass}>
                {child.text}
              </span>
            ) : (
              <Fragment key={key}>{child.text}</Fragment>
            )
          })}
        </span>
      </Fragment>
    )
  })
}
