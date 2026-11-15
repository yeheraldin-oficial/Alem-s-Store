'use client'
import { ProductCard, Product } from './ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { PackageSearch } from 'lucide-react'
import { motion } from 'framer-motion'

export function ProductGrid({
  products,
  loading,
  query,
}: {
  products: Product[]
  loading: boolean
  query: string
}) {
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--brand-pink)]/30 bg-white py-16 text-center"
        >
          <PackageSearch className="h-12 w-12 text-muted-foreground" />
          <p className="mt-3 font-semibold text-foreground">
            No encontramos productos
          </p>
          <p className="text-sm text-muted-foreground">
            {query
              ? `Sin resultados para "${query}". Prueba con otra palabra.`
              : 'Prueba con otra categoría.'}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div id="catalogo" className="mx-auto max-w-6xl px-4 md:px-6">
      <motion.div
        layout
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
      >
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </motion.div>
    </div>
  )
}
