'use client'
import { motion } from 'framer-motion'
import { Heart, Leaf, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from '@/components/motion/MotionWrapper'

const VALUES = [
  {
    icon: Leaf,
    title: 'Algodón orgánico',
    description: 'Certificado OEKO-TEX, sin químicos tóxicos',
    color: 'var(--brand-blue)',
  },
  {
    icon: Heart,
    title: 'Hecho con amor',
    description: 'Cada prenda es revisada a mano',
    color: 'var(--brand-pink)',
  },
  {
    icon: Sparkles,
    title: 'Diseños únicos',
    description: 'Estampados propios, no genéricos',
    color: 'var(--brand-pink-dark)',
  },
  {
    icon: Users,
    title: 'Atención cercana',
    description: 'Te asesoramos por WhatsApp',
    color: 'var(--brand-blue-dark)',
  },
]

export function About() {
  return (
    <section id="nosotros" className="bg-[var(--brand-pink-pale)]/40 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Texto */}
          <Reveal>
            <span className="inline-block rounded-full bg-[var(--brand-pink)] px-3 py-1 text-xs font-bold text-white">
              Sobre nosotros
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
              Ropa pensada para la piel más delicada
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              En Alem&rsquo;s Store creemos que tu bebé merece lo mejor. Por eso cada prenda
              está confeccionada con algodón orgánico certificado, tintes hipoalergénicos y
              costura reforzada. No somos una tienda más: somos un equipo de padres y madres
              que entiende lo que tu pequeño necesita.
            </p>
            <p className="mt-3 text-base text-muted-foreground">
              Desde 2024 vestimos a cientos de bebés y niños de 0 a 6 años, con diseños tiernos
              que no encuentras en tiendas de retail. Calidad sobre cantidad, siempre.
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Stat number="500+" label="Clientes felices" color="var(--brand-pink)" />
              <Stat number="8" label="Productos propios" color="var(--brand-blue)" />
              <Stat number="4.9" label="Calificación promedio" color="var(--brand-pink-dark)" />
            </div>
          </Reveal>

          {/* Imagen / showcase */}
          <Reveal delay={0.15}>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mx-auto max-w-sm overflow-hidden rounded-3xl shadow-xl"
              >
                <Image
                  src="/images/about.jpg"
                  alt="Madre con bebé - Alem's Store"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </motion.div>
              {/* Badge flotante */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-2 top-4 rounded-2xl bg-[var(--brand-blue)] px-3 py-2 text-xs font-bold text-white shadow-lg"
              >
                OEKO-TEX certificado
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-2 bottom-8 rounded-2xl bg-[var(--brand-pink)] px-3 py-2 text-xs font-bold text-white shadow-lg"
              >
                100% algodón
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Valores */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <Reveal key={v.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-white p-4 text-center shadow-sm"
                >
                  <div
                    className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: v.color }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{v.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{v.description}</p>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Stat({
  number,
  label,
  color,
}: {
  number: string
  label: string
  color: string
}) {
  return (
    <div className="text-center">
      <p className="text-2xl font-extrabold" style={{ color }}>
        {number}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
