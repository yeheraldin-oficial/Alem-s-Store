'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CATEGORY_CARDS = [
  {
    name: 'Bebés',
    description: '0-24 meses',
    image: '/products/body-bebe.jpg',
    bgColor: 'bg-[var(--brand-pink-pale)]',
    accentColor: 'var(--brand-pink)',
    size: 'large',
  },
  {
    name: 'Niñas',
    description: '2-6 años',
    image: '/products/vestido-floral.jpg',
    bgColor: 'bg-[var(--brand-blue-pale)]',
    accentColor: 'var(--brand-blue)',
    size: 'medium',
  },
  {
    name: 'Niños',
    description: '2-6 años',
    image: '/products/polover.jpg',
    bgColor: 'bg-[var(--brand-pink-light)]',
    accentColor: 'var(--brand-pink-dark)',
    size: 'medium',
  },
  {
    name: 'Accesorios',
    description: 'Gorros, medias',
    image: '/products/gorro-lana.jpg',
    bgColor: 'bg-[var(--brand-blue-light)]',
    accentColor: 'var(--brand-blue-dark)',
    size: 'medium',
  },
  {
    name: 'Verano',
    description: 'Colección fresca',
    image: '/products/conjunto-verano.jpg',
    bgColor: 'bg-[var(--brand-yellow)]',
    accentColor: 'var(--brand-pink)',
    size: 'medium',
  },
  {
    name: 'Invierno',
    description: 'Abrígalo bien',
    image: '/products/pijama-osito.jpg',
    bgColor: 'bg-[var(--brand-lavender)]',
    accentColor: 'var(--brand-blue-dark)',
    size: 'medium',
  },
]

interface ShopByCategoryProps {
  onSelectCategory?: (category: string) => void
}

export function ShopByCategory({ onSelectCategory }: ShopByCategoryProps) {
  const handleClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category)
    } else {
      // Scroll al catálogo y dispara evento
      const event = new CustomEvent('selectCategory', { detail: category })
      window.dispatchEvent(event)
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 text-center"
      >
        <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
          Compra por categoría
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Encuentra lo que buscas rápido
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {CATEGORY_CARDS.map((cat, idx) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(cat.name)}
            className={`group relative overflow-hidden rounded-2xl ${cat.bgColor} p-4 shadow-sm transition-all hover:shadow-lg`}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="relative h-20 w-20 md:h-24 md:w-24"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-contain drop-shadow-md"
                />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{cat.name}</p>
                <p className="text-[10px] text-muted-foreground">{cat.description}</p>
              </div>
            </div>

            {/* Flecha que aparece al hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <ArrowRight className="h-3 w-3 text-foreground" />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
