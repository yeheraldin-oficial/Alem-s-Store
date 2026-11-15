'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Reveal } from '@/components/motion/MotionWrapper'

const TESTIMONIALS = [
  {
    name: 'María González',
    location: 'Miraflores, Lima',
    rating: 5,
    text: 'El body de algodón orgánico es suavecito y no le irritó la piel a mi bebé. La atención por WhatsApp fue rapidísima. ¡Recomendado 100%!',
    initial: 'M',
    color: 'var(--brand-pink)',
  },
  {
    name: 'Carla Ramírez',
    location: 'Surco, Lima',
    rating: 5,
    text: 'Compré el vestido floral para mi niña de 3 años y quedó hermoso. La calidad es excelente, se nota que es algodón orgánico de verdad.',
    initial: 'C',
    color: 'var(--brand-blue)',
  },
  {
    name: 'José Mendoza',
    location: 'San Isidro, Lima',
    rating: 5,
    text: 'Pedí el pijama osito para mi hijo de 1 año. Llegó al día siguiente, bien empaquetado y con un detalle de cortesía. Volveré a comprar seguro.',
    initial: 'J',
    color: 'var(--brand-pink-dark)',
  },
  {
    name: 'Andrea Quispe',
    location: 'Barranco, Lima',
    rating: 5,
    text: 'Me encantó que tengan Yape como pago. Hice todo desde el celular y el pedido llegó perfecto. Las tallas son exactas.',
    initial: 'A',
    color: 'var(--brand-blue-dark)',
  },
  {
    name: 'Fiorela Soto',
    location: 'La Molina, Lima',
    rating: 5,
    text: 'El gorro de lana es adorable y abriga muchísimo. Mi bebé se ve tierno y está calientito. Calidad precio inmejorable.',
    initial: 'F',
    color: 'var(--brand-pink)',
  },
  {
    name: 'Rosa Torres',
    location: 'San Borja, Lima',
    rating: 5,
    text: 'La intranet de pedidos me pareció genial, pude ver el estado de mi compra en tiempo real. Profesionalidad de principio a fin.',
    initial: 'R',
    color: 'var(--brand-blue)',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <Reveal>
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-[var(--brand-blue)] px-3 py-1 text-xs font-bold text-white">
            Testimonios
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Más de 500 familias confían en Alem&rsquo;s Store
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="relative rounded-2xl bg-white p-5 shadow-sm"
            >
              {/* Quote icon */}
              <Quote className="absolute right-4 top-4 h-8 w-8 opacity-10" style={{ color: t.color }} />

              {/* Estrellas */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-[var(--brand-yellow)] text-[var(--brand-yellow)]"
                  />
                ))}
              </div>

              {/* Texto */}
              <p className="text-sm text-foreground/80">&ldquo;{t.text}&rdquo;</p>

              {/* Autor */}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
