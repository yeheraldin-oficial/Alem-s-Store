'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const shown = sessionStorage.getItem('alem-preloader-shown')
    if (shown) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('alem-preloader-shown', '1')
    }, 2400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          {/* Manchas de fondo que cambian forma (blob morphing) */}
          <motion.div
            animate={{
              borderRadius: [
                '50% 50% 50% 50%',
                '40% 60% 70% 30%',
                '60% 40% 30% 70%',
                '50% 50% 50% 50%',
              ],
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute h-80 w-80 bg-[var(--brand-pink)] blur-3xl"
          />
          <motion.div
            animate={{
              borderRadius: [
                '50% 50% 50% 50%',
                '60% 40% 30% 70%',
                '40% 60% 70% 30%',
                '50% 50% 50% 50%',
              ],
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute h-80 w-80 bg-[var(--brand-blue)] blur-3xl"
          />

          {/* Contenido central */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo con entrada elegante */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 16,
                delay: 0.15,
              }}
              className="relative"
            >
              {/* Anillo orbitando el logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-6 rounded-full border-2 border-dashed border-[var(--brand-pink)]/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-3 rounded-full border-2 border-dashed border-[var(--brand-blue)]/40"
              />

              {/* Logo */}
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2"
              >
                <Image
                  src="/logo-alem-lg.png"
                  alt="Alem's Store"
                  width={300}
                  height={114}
                  className="h-16 w-auto md:h-20"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Indicador: 3 puntos saltarines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      i === 0
                        ? 'var(--brand-pink)'
                        : i === 1
                        ? 'var(--brand-blue)'
                        : 'var(--brand-pink-dark)',
                  }}
                />
              ))}
            </motion.div>

            {/* Texto */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
              className="text-xs font-medium text-[var(--brand-text)]"
            >
              Preparando tu tienda...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
