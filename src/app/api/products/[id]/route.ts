import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT /api/products/[id]  (admin: actualizar precio, stock, activo, etc.)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const data: Record<string, unknown> = {}
  if (body.name !== undefined) data.name = body.name
  if (body.description !== undefined) data.description = body.description
  if (body.price !== undefined) data.price = Number(body.price)
  if (body.category !== undefined) data.category = body.category
  if (body.image !== undefined) data.image = body.image
  if (body.stock !== undefined) data.stock = Number(body.stock)
  if (body.sizes !== undefined) data.sizes = body.sizes
  if (body.active !== undefined) data.active = !!body.active

  const product = await db.product.update({ where: { id }, data })
  return NextResponse.json({ product })
}

// DELETE /api/products/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await db.product.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
