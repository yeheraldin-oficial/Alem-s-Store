'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Reveal } from '@/components/motion/MotionWrapper'

const GUARANTEES = [
  {
    title: 'Calidad garantizada',
    description: 'Si la prenda presenta defectos de fabricación, la cambiamos sin costo en 30 días.',
    icon: '/images/icon-calidad.jpg',
  },
  {
    title: 'Cambios en 7 días',
    description: '¿No le quedó la talla? Lo cambias dentro de 7 días con etiqueta original.',
    icon: '/images/icon-cambios-7.jpg',
  },
  {
    title: 'Compra protegida',
    description: 'Tus datos y pagos están seguros. Cumplimos la Ley de Protección al Consumidor.',
    icon: '/images/icon-protegida.jpg',
  },
  {
    title: 'Envío seguro',
    description: 'Empaquetamos cada prenda con cuidado para que llegue perfecta a tu casa.',
    icon: '/images/icon-envio-seguro.jpg',
  },
]

export function Guarantee() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <Reveal>
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-[var(--brand-blue-dark)] px-3 py-1 text-xs font-bold text-white">
            Garantía y cambios
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Compra con total tranquilidad
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Respaldamos cada prenda que vendemos
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GUARANTEES.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 border-[var(--brand-pink)]/15 bg-white p-5 text-center shadow-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
                className="mx-auto mb-3 overflow-hidden rounded-full"
              >
                <Image
                  src={g.icon}
                  alt={g.title}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-cover"
                />
              </motion.div>
              <h3 className="text-base font-bold text-foreground">{g.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{g.description}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
