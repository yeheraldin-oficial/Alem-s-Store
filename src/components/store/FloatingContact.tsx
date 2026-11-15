'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone, Mail, Instagram, Facebook, Baby, Send } from 'lucide-react'
import { BUSINESS } from '@/lib/business'

export function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  // Aparece después de hacer scroll
  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', handler)
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const openWhatsApp = () => {
    const msg = encodeURIComponent(`¡Hola ${BUSINESS.name}! 👋 Vi su tienda online y quiero más información.`)
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${msg}`, '_blank')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Panel expandible */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-72 overflow-hidden rounded-3xl border-2 border-white bg-white shadow-2xl"
              >
                {/* Header del panel - celeste */}
                <div className="bg-[var(--brand-blue)] p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">¡Contáctanos! 💬</p>
                      <p className="text-xs opacity-90">Respondemos rápido</p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-full p-1 hover:bg-white/20"
                      aria-label="Cerrar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Opciones */}
                <div className="p-3">
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openWhatsApp}
                    className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-[#25D366] p-3 text-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <Baby className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">WhatsApp</p>
                      <p className="text-xs opacity-90">{BUSINESS.whatsappDisplay}</p>
                    </div>
                    <Send className="ml-auto h-4 w-4" />
                  </motion.button>

                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-[var(--brand-pink)] p-3 text-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Instagram</p>
                      <p className="text-xs opacity-90">@alemsstore</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-[#1877F2] p-3 text-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <Facebook className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Facebook</p>
                      <p className="text-xs opacity-90">/alemsstore</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:hola@alemsstore.pe"
                    whileHover={{ x: 4 }}
                    className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-[var(--brand-pink)] p-3 text-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Email</p>
                      <p className="text-xs opacity-90">hola@alemsstore.pe</p>
                    </div>
                  </motion.a>

                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-1 rounded-xl bg-[var(--brand-blue-pale)] px-3 py-2 text-xs font-semibold text-[var(--brand-blue-dark)] hover:bg-[var(--brand-blue-pale)]/70"
                  >
                    <Phone className="h-3 w-3" />
                    Llamar: {BUSINESS.whatsappDisplay}
                  </a>
                </div>

                {/* Footer horario */}
                <div className="bg-[var(--brand-pink-pale)]/30 p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    🕐 Lun-Sáb 9am-7pm
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal flotante - celeste con parpadeo sutil */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-blue)] text-white shadow-2xl shadow-[var(--brand-blue)]/40"
            aria-label="Contáctanos"
          >
            {/* Parpadeo sutil (opacidad) - no molesto */}
            <motion.span
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-[var(--brand-blue)]"
            />

            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <MessageCircle className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tooltip "Contáctanos" cuando está cerrado */}
          <AnimatePresence>
            {!open && (
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--brand-text)] px-3 py-1.5 text-xs font-bold text-white shadow-lg"
              >
                Contáctanos
                <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-[var(--brand-text)]" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
