'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Plus, Minus, ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/store'
import { toast } from 'sonner'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  sizes: string
  active: boolean
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [qty, setQty] = useState(1)
  const [liked, setLiked] = useState(false)

  const sizes = product.sizes ? product.sizes.split(',').filter(Boolean) : []
  const size = selectedSize || (sizes.length > 0 ? sizes[0] : 'Único')

  const handleAdd = () => {
    if (product.stock <= 0) {
      toast.error('Producto agotado')
      return
    }
    add(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        stock: product.stock,
      },
      qty
    )
    toast.success(`${product.name} (${size}) agregado al carrito`, {
      description: `Cantidad: ${qty} · S/${(product.price * qty).toFixed(2)}`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.4,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-[var(--brand-pink)]/15 bg-white shadow-sm transition-all duration-300 hover:border-[var(--brand-pink-dark)]/40 hover:shadow-xl hover:shadow-[var(--brand-pink)]/20">
        {/* Botón like flotante */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.15 }}
          onClick={() => setLiked((v) => !v)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-all"
          aria-label="Me gusta"
        >
          <motion.div
            animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                liked ? 'fill-[var(--brand-pink-dark)] text-[var(--brand-pink-dark)]' : 'text-muted-foreground'
              }`}
            />
          </motion.div>
        </motion.button>

        <div className="relative aspect-square overflow-hidden bg-[var(--brand-pink-light)]/30">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </motion.div>
          {product.stock <= 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[var(--brand-text)]">
                Agotado
              </span>
            </motion.div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Badge className="absolute left-3 top-3 bg-[var(--brand-pink-dark)] text-white shadow-md">
                ¡Solo {product.stock}!
              </Badge>
            </motion.div>
          )}
          <Badge className="absolute bottom-3 left-3 bg-white/95 text-[var(--brand-blue-dark)] shadow-md backdrop-blur">
            {product.category}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-3 md:p-4">
          <h3 className="line-clamp-2 text-sm font-bold text-foreground md:text-base">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {product.description}
          </p>

          {/* Tallas */}
          {sizes.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 text-xs font-semibold text-muted-foreground">Talla</p>
              <div className="flex flex-wrap gap-1">
                {sizes.map((s) => (
                  <motion.button
                    key={s}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-md border px-2 py-1 text-xs font-medium transition ${
                      size === s
                        ? 'border-[var(--brand-pink-dark)] bg-[var(--brand-pink-dark)] text-white'
                        : 'border-[var(--brand-pink)]/30 bg-white text-foreground hover:border-[var(--brand-pink-dark)]'
                    }`}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Precio</p>
              <p className="text-xl font-extrabold text-[var(--brand-pink-dark)]">
                S/ {product.price.toFixed(2)}
              </p>
            </div>
            {/* Cantidad */}
            <div className="flex items-center gap-1 rounded-full border border-[var(--brand-pink)]/30 bg-[var(--brand-pink-light)]/20 p-0.5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--brand-pink-dark)] shadow-sm hover:bg-[var(--brand-pink-light)]"
                aria-label="Restar"
              >
                <Minus className="h-3.5 w-3.5" />
              </motion.button>
              <motion.span
                key={qty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-6 text-center text-sm font-bold"
              >
                {qty}
              </motion.span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                disabled={qty >= product.stock}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--brand-pink-dark)] shadow-sm hover:bg-[var(--brand-pink-light)] disabled:opacity-40"
                aria-label="Sumar"
              >
                <Plus className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className="mt-3 w-full rounded-full bg-[var(--brand-pink)] text-white shadow-md shadow-[var(--brand-pink)]/30 transition-all hover:shadow-lg hover:shadow-[var(--brand-pink)]/40 hover:opacity-90 disabled:opacity-50"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
