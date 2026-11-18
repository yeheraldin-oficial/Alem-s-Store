'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Clock, Flame, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/store'
import { toast } from 'sonner'

// Productos en oferta del día
const DEALS = [
  {
    id: 'P001',
    name: 'Body de bebé algodón orgánico',
    image: '/products/body-bebe.jpg',
    originalPrice: 45,
    dealPrice: 35,
    category: 'Bebés',
    sizes: '0-3m,3-6m,6-12m,12-24m',
    stock: 22,
  },
  {
    id: 'P003',
    name: 'Vestido floral primavera',
    image: '/products/vestido-floral.jpg',
    originalPrice: 85,
    dealPrice: 65,
    category: 'Niñas',
    sizes: '2-3a,3-4a,4-5a,5-6a',
    stock: 18,
  },
]

export function DealOfTheDay() {
  const add = useCart((s) => s.add)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  // Countdown hasta medianoche
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAddDeal = (deal: typeof DEALS[0]) => {
    const sizes = deal.sizes.split(',')
    add(
      {
        id: deal.id,
        name: deal.name,
        price: deal.dealPrice,
        image: deal.image,
        size: sizes[0] || 'Único',
        stock: deal.stock,
      },
      1
    )
    toast.success(`${deal.name} agregado`, {
      description: `Oferta: S/${deal.dealPrice.toFixed(2)} (antes S/${deal.originalPrice.toFixed(2)})`,
    })
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl bg-[var(--brand-pink)] p-6 shadow-xl md:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center text-white md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur"
            >
              <Flame className="h-6 w-6" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">Oferta del día</h2>
              <p className="text-sm opacity-90">Ofertas por 24 horas solamente</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <div className="flex gap-1 sm:gap-1.5">
              {[
                { label: 'Hrs', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Seg', value: timeLeft.seconds },
              ].map((unit, i) => (
                <motion.div
                  key={unit.label}
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  className="flex flex-col items-center rounded-xl bg-white/20 px-2 py-1.5 backdrop-blur sm:px-3 sm:py-2"
                >
                  <span className="text-base font-extrabold tabular-nums sm:text-xl">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase opacity-90 sm:text-[10px]">{unit.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de ofertas */}
        <div className="grid gap-4 sm:grid-cols-2">
          {DEALS.map((deal, idx) => {
            const discount = Math.round(
              ((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100
            )
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -4 }}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="relative shrink-0">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-xl bg-[var(--brand-pink-pale)] object-cover"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-pink)] text-xs font-extrabold text-white shadow-md"
                  >
                    -{discount}%
                  </motion.span>
                </div>

                <div className="flex flex-1 flex-col">
                  <span className="mb-1 inline-flex w-fit rounded-full bg-[var(--brand-blue-pale)] px-2 py-0.5 text-[10px] font-bold text-[var(--brand-blue-dark)]">
                    {deal.category}
                  </span>
                  <h3 className="line-clamp-1 text-sm font-bold text-foreground">{deal.name}</h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-[var(--brand-pink)]">
                      S/ {deal.dealPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      S/ {deal.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAddDeal(deal)}
                    className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[var(--brand-pink)] px-3 py-2 text-xs font-bold text-white shadow-sm"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Agregar
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
