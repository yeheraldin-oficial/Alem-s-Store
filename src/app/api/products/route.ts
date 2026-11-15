import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/products?category=&active=&q=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const active = searchParams.get('active')
  const q = searchParams.get('q')?.trim()

  const where: Record<string, unknown> = {}
  if (category && category !== 'Todas') where.category = category
  // active=true → solo activos | active=false → TODOS (activos e inactivos) | sin param → todos
  if (active === 'true') where.active = true
  if (q) where.name = { contains: q }

  const products = await db.product.findMany({
    where,
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json({ products })
}

// POST /api/products  (admin)
export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.id || !body.name || body.price == null) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }
  const product = await db.product.create({
    data: {
      id: body.id,
      name: body.name,
      description: body.description || '',
      price: Number(body.price),
      category: body.category || 'Sin categoría',
      image: body.image || '/products/body-bebe.jpg',
      stock: Number(body.stock) || 0,
      sizes: body.sizes || '',
      active: body.active !== false,
    },
  })
  return NextResponse.json({ product }, { status: 201 })
}
