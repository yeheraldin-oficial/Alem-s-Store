import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/products/search?q=texto  → devuelve hasta 6 sugerencias para autocomplete
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim().toLowerCase()

  if (!q || q.length < 1) {
    return NextResponse.json({ suggestions: [] })
  }

  // Buscar productos activos que coincidan por nombre, descripción o categoría
  const products = await db.product.findMany({
    where: {
      active: true,
      OR: [
        { name: { contains: q } },
        { description: { contains: q } },
        { category: { contains: q } },
      ],
    },
    take: 6,
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      category: true,
      stock: true,
    },
  })

  // También sugerir categorías que coincidan
  const cats = ['Bebés', 'Niñas', 'Niños', 'Accesorios', 'Verano', 'Invierno']
  const catMatches = cats
    .filter((c) => c.toLowerCase().includes(q))
    .slice(0, 2)
    .map((c) => ({ type: 'category' as const, name: c }))

  // Tags populares sugeridos si no hay suficiente
  const popularTags = ['body', 'vestido', 'pijama', 'algodón', 'verano']
  const tagMatches =
    products.length < 3
      ? popularTags
          .filter((t) => t.includes(q))
          .slice(0, 2)
          .map((t) => ({ type: 'tag' as const, name: t }))
      : []

  return NextResponse.json({
    suggestions: products.map((p) => ({
      type: 'product',
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.category,
      stock: p.stock,
    })),
    categories: catMatches,
    tags: tagMatches,
  })
}
