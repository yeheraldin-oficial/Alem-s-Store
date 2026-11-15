'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Reveal } from '@/components/motion/MotionWrapper'

const BENEFITS = [
  {
    title: 'Envío rápido',
    description: 'Delivery en 1-2 días hábiles a todo Lima. Recojo en tienda gratis.',
    icon: '/images/icon-envio.jpg',
  },
  {
    title: 'Cambios fáciles',
    description: '7 días para cambios y devoluciones sin preguntas.',
    icon: '/images/icon-cambios.jpg',
  },
  {
    title: 'Pago seguro',
    description: 'Yape, Plin, Mercado Pago y BCP. Tus datos siempre protegidos.',
    icon: '/images/icon-pago-seguro.jpg',
  },
  {
    title: 'Atención rápida',
    description: 'Respondemos por WhatsApp en menos de 30 minutos en horario de atención.',
    icon: '/images/icon-atencion.jpg',
  },
  {
    title: 'Múltiples pagos',
    description: 'Yape sin comisión, tarjeta, transferencia BCP o efectivo al recibir.',
    icon: '/images/icon-pagos.jpg',
  },
  {
    title: 'Soporte dedicado',
    description: 'Te asesoramos en la talla ideal y combinaciones para tu pequeño.',
    icon: '/images/icon-soporte.jpg',
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-[var(--brand-blue-pale)]/40 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-[var(--brand-pink-dark)] px-3 py-1 text-xs font-bold text-white">
              Por qué elegirnos
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
              Beneficios de comprar en Alem&rsquo;s Store
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Más que una tienda, una experiencia completa para ti y tu bebé
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group flex gap-4 rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={b.icon}
                    alt={b.title}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
