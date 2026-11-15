'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sparkles, Leaf, Heart, Truck, Star, MapPin } from 'lucide-react'
import { BUSINESS } from '@/lib/business'
import { fadeInUp, staggerContainer, floating, floatingSlow, bounceIn } from '@/components/motion/MotionWrapper'

export function Hero({ onVerCatalogo }: { onVerCatalogo: () => void }) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Fondo con manchas decorativas animadas - colores oficiales #ff70a6 + #70d6ff */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[5%] top-[10%] h-32 w-32 rounded-full bg-[#ff70a6] opacity-40 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[10%] top-[40%] h-48 w-48 rounded-full bg-[#70d6ff] opacity-40 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[40%] bottom-[5%] h-40 w-40 rounded-full bg-[var(--brand-lavender)] opacity-50 blur-3xl"
        />
        {/* Gradient diagonal sutil */}
        <div className="absolute inset-0 bg-[var(--brand-pink-pale)]/20" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-8 md:grid-cols-2"
        >
          {/* Columna izquierda: texto */}
          <div className="text-center md:text-left">
            <motion.div
              variants={bounceIn}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand-pink-dark)]/30 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[var(--brand-pink-dark)] shadow-sm backdrop-blur"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="h-3.5 w-3.5" />
              </motion.span>
              Nueva colección Primavera 2026
              <span className="ml-1 inline-flex items-center gap-0.5 rounded-full bg-[var(--brand-pink-dark)] px-1.5 py-0.5 text-[10px] text-white">
                <MapPin className="h-2.5 w-2.5" /> Lima
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl font-extrabold leading-tight text-foreground md:text-6xl"
            >
              Ropa que <span className="text-[var(--brand-pink-dark)]">crece</span> contigo
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base text-muted-foreground md:text-lg"
            >
              Algodón orgánico, hipoalergénico y tierno. Diseñado para la piel sensible de
              tu bebé, hecho con amor.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={onVerCatalogo}
                  className="rounded-full bg-[var(--brand-pink)] px-8 py-3 text-base font-bold text-white shadow-lg shadow-[var(--brand-pink)]/40 hover:opacity-90"
                >
                  Ver catálogo
                </Button>
              </motion.div>
              <motion.a
                href="#nosotros"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer rounded-full border-2 border-[var(--brand-pink-dark)]/40 bg-white/60 px-8 py-3 text-base font-bold text-foreground backdrop-blur hover:bg-white"
              >
                Conócenos
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center justify-center gap-6 md:justify-start"
            >
              <div>
                <p className="text-2xl font-extrabold text-[var(--brand-pink-dark)]">8+</p>
                <p className="text-xs text-muted-foreground">Productos</p>
              </div>
              <div className="h-8 w-px bg-[var(--brand-pink)]/30" />
              <div>
                <p className="text-2xl font-extrabold text-[var(--brand-blue-dark)]">14</p>
                <p className="text-xs text-muted-foreground">Distritos</p>
              </div>
              <div className="h-8 w-px bg-[var(--brand-pink)]/30" />
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    >
                      <Star className="h-4 w-4 fill-[var(--brand-yellow)] text-[var(--brand-yellow)]" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">5.0 calidad</p>
              </div>
            </motion.div>

            {/* Métodos de pago peruanos */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              <span className="text-xs text-muted-foreground">Pagas con:</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#7D3494] px-2 py-0.5 text-[10px] font-bold text-white">
                Yape
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#00A0DF] px-2 py-0.5 text-[10px] font-bold text-white">
                Plin
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#E85D75] px-2 py-0.5 text-[10px] font-bold text-white">
                Mercado Pago
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#1B4D9C] px-2 py-0.5 text-[10px] font-bold text-white">
                BCP
              </span>
            </motion.div>
          </div>

          {/* Columna derecha: showcase visual animado */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* Blob de fondo animado */}
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[var(--brand-pink-light)]"
              />

              <motion.div
                variants={floating}
                initial="hidden"
                animate="animate"
                className="rounded-[2.5rem] border-4 border-white bg-white/40 p-6 shadow-2xl backdrop-blur"
              >
                <Image
                  src="/products/body-bebe.jpg"
                  alt="Body de bebé orgánico Alem's Store"
                  width={400}
                  height={400}
                  className="mx-auto w-full max-w-xs"
                  priority
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 rounded-2xl bg-white/90 p-3 text-center shadow-sm"
                >
                  <p className="text-sm font-bold text-foreground">Body bebé orgánico</p>
                  <p className="text-lg font-extrabold text-[var(--brand-pink-dark)]">S/ 35.00</p>
                </motion.div>
              </motion.div>

              {/* Badges flotantes animados */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-8, -12, -8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-4 top-8 -rotate-[8deg] rounded-2xl bg-[var(--brand-pink-dark)] px-3 py-2 text-xs font-bold text-white shadow-lg"
              >
                ¡Nuevo!
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [8, 12, 8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 bottom-12 rotate-[8deg] rounded-2xl bg-[var(--brand-blue-dark)] px-3 py-2 text-xs font-bold text-white shadow-lg"
              >
                -10% hoy
              </motion.div>

              {/* Badge "Nuevo" flotante en la esquina superior */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 right-8 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-md"
              >
                <span className="text-[10px] font-bold text-[var(--brand-pink)]">Nuevo</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Value props bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          <ValueProp icon={<Leaf className="h-5 w-5" />} title="Algodón orgánico" sub="Certificado OEKO-TEX" delay={0} />
          <ValueProp icon={<Heart className="h-5 w-5" />} title="Hipoalergénico" sub="Para piel sensible" delay={0.1} />
          <ValueProp icon={<Sparkles className="h-5 w-5" />} title="0 a 6 años" sub="Tallas disponibles" delay={0.2} />
          <ValueProp icon={<Truck className="h-5 w-5" />} title="Delivery en Lima" sub="14 distritos" delay={0.3} />
        </motion.div>
      </div>
    </section>
  )
}

function ValueProp({
  icon,
  title,
  sub,
  delay,
}: {
  icon: React.ReactNode
  title: string
  sub: string
  delay: number
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex items-center gap-3 rounded-2xl border border-[var(--brand-pink)]/20 bg-white p-3 shadow-sm md:p-4"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-pink-light)] text-[var(--brand-pink-dark)] md:h-12 md:w-12"
      >
        {icon}
      </motion.div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-foreground md:text-base">{title}</p>
        <p className="truncate text-xs text-muted-foreground md:text-sm">{sub}</p>
      </div>
    </motion.div>
  )
}
