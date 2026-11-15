'use client'
import { motion } from 'framer-motion'
import { Sparkles, Sun, Heart, ArrowRight } from 'lucide-react'

const PROMOS = [
  {
    title: 'Festivales',
    subtitle: 'Moda festiva',
    description: 'Conjuntos para fiestas y celebraciones',
    discount: '30% de descuento',
    icon: Sparkles,
    bgColor: 'bg-[var(--brand-pink)]',
    bgPattern: 'bg-[var(--brand-pink-pale)]',
  },
  {
    title: 'Primavera-Verano',
    subtitle: 'Accesorios en tendencia',
    description: 'Gorros, medias y más para el calor',
    discount: '25% de descuento',
    icon: Sun,
    bgColor: 'bg-[var(--brand-blue)]',
    bgPattern: 'bg-[var(--brand-blue-pale)]',
  },
  {
    title: 'Comodidad infantil',
    subtitle: 'Ropa suave',
    description: 'Algodón orgánico para pieles sensibles',
    discount: '20% de descuento',
    icon: Heart,
    bgColor: 'bg-[var(--brand-pink-dark)]',
    bgPattern: 'bg-[var(--brand-lavender)]',
  },
]

export function TrendingPromos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 text-center"
      >
        <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
          Últimas tendencias
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Promos que están arrasando
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {PROMOS.map((promo, idx) => {
          const Icon = promo.icon
          return (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl ${promo.bgColor} p-6 shadow-lg`}
            >
              {/* Patrón de fondo decorativo */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.5,
                }}
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white blur-2xl"
              />

              <div className="relative z-10 text-white">
                <div className="mb-3 flex items-center justify-between">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.3,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <span className="rounded-full bg-white px-2 py-1 text-xs font-extrabold text-foreground shadow-sm">
                    {promo.discount}
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                  {promo.subtitle}
                </p>
                <h3 className="mt-1 text-xl font-extrabold md:text-2xl">{promo.title}</h3>
                <p className="mt-1 text-sm opacity-90">{promo.description}</p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const event = new CustomEvent('selectCategory', { detail: 'Todas' })
                    window.dispatchEvent(event)
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-foreground shadow-sm transition-all hover:shadow-md"
                >
                  Ver ofertas
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
