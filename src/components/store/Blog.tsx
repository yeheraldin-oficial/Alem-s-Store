'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { Reveal } from '@/components/motion/MotionWrapper'

const POSTS = [
  {
    title: '5 tips para vestir a tu bebé en verano',
    excerpt: 'Aprende a elegir las telas correctas para mantener a tu pequeño fresco y cómodo durante los días calurosos.',
    date: '10 Nov 2026',
    category: 'Cuidados',
    readTime: '3 min',
    image: '/products/conjunto-verano.jpg',
    color: 'var(--brand-pink)',
  },
  {
    title: 'Algodón orgánico: por qué importa',
    excerpt: 'Descubre la diferencia entre algodón convencional y orgánico, y por qué es clave para la piel sensible.',
    date: '5 Nov 2026',
    category: 'Materiales',
    readTime: '5 min',
    image: '/products/body-bebe.jpg',
    color: 'var(--brand-blue)',
  },
  {
    title: 'Guía de tallas por edad',
    excerpt: '¿No sabes qué talla comprar? Te ayudamos a elegir la medida perfecta según la edad de tu bebé.',
    date: '1 Nov 2026',
    category: 'Guías',
    readTime: '4 min',
    image: '/products/vestido-floral.jpg',
    color: 'var(--brand-pink-dark)',
  },
]

export function Blog() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <Reveal>
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <span className="inline-block rounded-full bg-[var(--brand-pink)] px-3 py-1 text-xs font-bold text-white">
              Novedades
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
              Últimos artículos y consejos
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tips de cuidado, guías y novedades para tu bebé
            </p>
          </div>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-pink-dark)] px-4 py-2 text-sm font-bold text-white shadow-sm"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-pink-pale)]">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="h-full w-full object-contain p-4"
                />
                <span
                  className="absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-bold text-white"
                  style={{ backgroundColor: post.color }}
                >
                  {post.category}
                </span>
              </div>

              {/* Contenido */}
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                  <span>·</span>
                  {post.readTime} de lectura
                </div>
                <h3 className="line-clamp-2 font-bold text-foreground group-hover:text-[var(--brand-pink-dark)]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold"
                  style={{ color: post.color }}
                >
                  Leer más
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
