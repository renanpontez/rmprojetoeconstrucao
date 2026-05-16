import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  eyebrow?: string
  index?: string
  align?: 'left' | 'center'
  className?: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  index,
  align = 'center',
  className,
  tone = 'light',
}: SectionHeadingProps) {
  const isDark = tone === 'dark'
  return (
    <div
      className={cn(
        'mb-14 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {(eyebrow || index) && (
        <div
          className={cn(
            'mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em]',
            align === 'center' && 'justify-center',
            isDark ? 'text-white/65' : 'text-muted-foreground'
          )}
        >
          {index && (
            <span className={cn('font-serif text-sm italic', isDark ? 'text-white/80' : 'text-foreground')}>
              {index}
            </span>
          )}
          {index && eyebrow && <span className="h-px w-8 bg-primary" />}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}

      <h2
        className={cn(
          'font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]',
          isDark ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            isDark ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
