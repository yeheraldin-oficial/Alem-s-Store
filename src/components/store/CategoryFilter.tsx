'use client'
import { BUSINESS } from '@/lib/business'
import { motion } from 'framer-motion'

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string
  onChange: (c: string) => void
}) {
  const cats = ['Todas', ...BUSINESS.categories]
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {cats.map((c, idx) => {
          const isActive = active === c
          return (
            <motion.button
              key={c}
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.04, y: -2 }}
              onClick={() => onChange(c)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? idx % 2 === 0
                    ? 'bg-[var(--brand-pink-dark)] text-white shadow-md shadow-[var(--brand-pink)]/40'
                    : 'bg-[var(--brand-blue-dark)] text-white shadow-md shadow-[var(--brand-blue)]/40'
                  : 'bg-white text-foreground hover:bg-[var(--brand-pink-light)] border border-[var(--brand-pink)]/20'
              }`}
            >
              {c}
              {isActive && (
                <motion.span
                  layoutId="active-category"
                  className="absolute inset-0 -z-10 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
