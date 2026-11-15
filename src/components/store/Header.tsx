'use client'
import Image from 'next/image'
import { ShoppingCart, Baby, Menu, X, ShieldCheck, User as UserIcon, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESS } from '@/lib/business'
import { useCart } from '@/lib/store'
import { useUser } from '@/lib/user-context'
import { SearchAutocomplete } from './SearchAutocomplete'

export function Header({
  onOpenCart,
  onOpenAdmin,
  onSearch,
  onOpenUserAuth,
  onOpenUserPanel,
}: {
  onOpenCart: () => void
  onOpenAdmin: () => void
  onSearch: (q: string) => void
  onOpenUserAuth: () => void
  onOpenUserPanel: () => void
}) {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="sticky top-0 z-40 w-full border-b border-[var(--brand-pink)]/20 bg-[var(--brand-cream)]/95 backdrop-blur supports-[backfilter]:bg-[var(--brand-cream)]/80"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        {/* Logo */}
        <motion.a
          href="#inicio"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo-alem.png"
            alt="Logo Alem's Store"
            width={210}
            height={80}
            className="h-12 w-auto md:h-14"
            priority
          />
        </motion.a>

        {/* Buscador con autocomplete (desktop) */}
        <div className="hidden flex-1 max-w-md md:block">
          <SearchAutocomplete onSearch={onSearch} />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Botón usuario / cuenta */}
          {user ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onOpenUserPanel}
                className="flex items-center gap-2 rounded-full bg-[var(--brand-blue)] px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--brand-blue)] text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden max-w-[80px] truncate sm:inline">
                  {user.name.split(' ')[0]}
                </span>
              </Button>
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-foreground hover:bg-[var(--brand-pink-pale)]"
              onClick={onOpenUserAuth}
            >
              <UserIcon className="mr-1 h-4 w-4" />
              Mi cuenta
            </Button>
          )}

          {/* Intranet (solo botón, no mostrarse si es usuario normal) */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex text-foreground hover:bg-[var(--brand-pink-pale)]"
            onClick={onOpenAdmin}
          >
            <ShieldCheck className="mr-1 h-4 w-4" />
            Intranet
          </Button>

          {/* Carrito */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onOpenCart}
              className="relative rounded-full bg-[var(--brand-pink)] px-4 text-white shadow-md shadow-[var(--brand-pink)]/40 hover:opacity-90"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-1 hidden sm:inline">Carrito</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.div
                    key={count}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-blue)] text-xs font-bold text-white shadow-md"
                  >
                    {count}
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--brand-pink)]/20 px-4 py-3 md:hidden"
          >
            <SearchAutocomplete onSearch={onSearch} variant="mobile" />

            {/* Botón usuario móvil */}
            {user ? (
              <Button
                className="mt-2 w-full justify-start bg-[var(--brand-blue)] text-white"
                onClick={() => {
                  onOpenUserPanel()
                  setMenuOpen(false)
                }}
              >
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--brand-blue)] text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="mt-2 w-full justify-start text-foreground"
                onClick={() => {
                  onOpenUserAuth()
                  setMenuOpen(false)
                }}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Mi cuenta
              </Button>
            )}

            <Button
              variant="ghost"
              className="mt-2 w-full justify-start text-foreground"
              onClick={() => {
                onOpenAdmin()
                setMenuOpen(false)
              }}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Intranet
            </Button>

            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[var(--brand-blue-dark)] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Baby className="h-4 w-4" />
              Pedir por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
