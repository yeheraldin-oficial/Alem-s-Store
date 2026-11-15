'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Tag, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SuggestionProduct {
  type: 'product'
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
}
interface SuggestionCategory {
  type: 'category'
  name: string
}
interface SuggestionTag {
  type: 'tag'
  name: string
}

const POPULAR_SEARCHES = ['body', 'vestido', 'pijama', 'verano', 'gorro']

export function SearchAutocomplete({
  onSearch,
  className,
  variant = 'desktop',
}: {
  onSearch: (q: string) => void
  className?: string
  variant?: 'desktop' | 'mobile'
}) {
  const [q, setQ] = useState('')
  const [suggestions, setSuggestions] = useState<{
    products: SuggestionProduct[]
    categories: SuggestionCategory[]
    tags: SuggestionTag[]
  }>({ products: [], categories: [], tags: [] })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!q.trim()) {
      setSuggestions({ products: [], categories: [], tags: [] })
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setSuggestions({
          products: data.suggestions || [],
          categories: data.categories || [],
          tags: data.tags || [],
        })
      } catch {
        setSuggestions({ products: [], categories: [], tags: [] })
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [q])

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const totalResults =
    suggestions.products.length + suggestions.categories.length + suggestions.tags.length

  const submitSearch = (term: string) => {
    setQ(term)
    onSearch(term)
    setOpen(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items: Array<{ type: string; value: string }> = [
      ...suggestions.categories.map((c) => ({ type: 'category', value: c.name })),
      ...suggestions.tags.map((t) => ({ type: 'tag', value: t.name })),
      ...suggestions.products.map((p) => ({ type: 'product', value: p.name })),
    ]
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, items.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, -1))
    } else if (e.key === 'Enter') {
      if (highlighted >= 0 && items[highlighted]) {
        e.preventDefault()
        submitSearch(items[highlighted].value)
      } else if (q.trim()) {
        submitSearch(q)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar body, vestido, pijama..."
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          onSearch(e.target.value)
          setOpen(true)
          setHighlighted(-1)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-full border-2 border-[var(--brand-pink)]/30 bg-white px-5 py-2.5 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-[var(--brand-pink)] focus:outline-none focus:shadow-md focus:shadow-[var(--brand-pink)]/20"
      />
      {q && (
        <button
          onClick={() => {
            setQ('')
            onSearch('')
            setOpen(false)
            inputRef.current?.focus()
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-[var(--brand-pink-pale)] hover:text-[var(--brand-pink)]"
          aria-label="Limpiar"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border-2 border-[var(--brand-pink)]/20 bg-white shadow-2xl shadow-[var(--brand-pink)]/10"
          >
            {/* Estado vacío con búsquedas populares */}
            {!q.trim() && (
              <div className="p-3">
                <p className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  Búsquedas populares
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => submitSearch(term)}
                      className="rounded-full border border-[var(--brand-blue)]/30 bg-[var(--brand-blue-pale)] px-3 py-1 text-xs font-medium text-[var(--brand-blue-dark)] hover:bg-[var(--brand-blue)] hover:text-white transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && q.trim() && (
              <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="h-4 w-4 rounded-full border-2 border-[var(--brand-pink)] border-t-transparent"
                />
                Buscando...
              </div>
            )}

            {/* Sin resultados */}
            {!loading && q.trim() && totalResults === 0 && (
              <div className="p-6 text-center">
                <p className="text-sm font-semibold text-foreground">Sin resultados</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  No encontramos productos para &ldquo;{q}&rdquo;
                </p>
              </div>
            )}

            {/* Resultados */}
            {!loading && totalResults > 0 && (
              <div className="max-h-[420px] overflow-y-auto">
                {/* Categorías */}
                {suggestions.categories.length > 0 && (
                  <div className="border-b border-[var(--brand-pink)]/10 p-2">
                    <p className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      <Tag className="h-3 w-3" />
                      Categorías
                    </p>
                    {suggestions.categories.map((c, i) => {
                      const idx = i
                      return (
                        <button
                          key={c.name}
                          onClick={() => submitSearch(c.name)}
                          onMouseEnter={() => setHighlighted(idx)}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                            highlighted === idx ? 'bg-[var(--brand-pink-pale)]' : 'hover:bg-[var(--brand-pink-pale)]/50'
                          }`}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--brand-pink)] text-xs font-bold text-white">
                            {c.name[0]}
                          </span>
                          <span className="font-medium text-foreground">{c.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">Categoría</span>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Productos */}
                {suggestions.products.length > 0 && (
                  <div className="p-2">
                    <p className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      <Package className="h-3 w-3" />
                      Productos ({suggestions.products.length})
                    </p>
                    {suggestions.products.map((p, i) => {
                      const idx = suggestions.categories.length + i
                      return (
                        <button
                          key={p.id}
                          onClick={() => submitSearch(p.name)}
                          onMouseEnter={() => setHighlighted(idx)}
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors ${
                            highlighted === idx ? 'bg-[var(--brand-pink-pale)]' : 'hover:bg-[var(--brand-pink-pale)]/50'
                          }`}
                        >
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-lg border border-[var(--brand-pink)]/20 bg-[var(--brand-blue-pale)] object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 text-sm font-semibold text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-[var(--brand-pink)]">S/ {p.price.toFixed(2)}</p>
                            {p.stock <= 5 && p.stock > 0 && (
                              <p className="text-[10px] font-semibold text-orange-500">¡Solo {p.stock}!</p>
                            )}
                            {p.stock === 0 && (
                              <p className="text-[10px] font-semibold text-red-500">Agotado</p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Footer del dropdown */}
                <div className="border-t border-[var(--brand-pink)]/10 bg-[var(--brand-blue-pale)]/30 p-2">
                  <button
                    onClick={() => submitSearch(q)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand-pink)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
                  >
                    <Search className="h-4 w-4" />
                    Ver todos los resultados para &ldquo;{q}&rdquo;
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
