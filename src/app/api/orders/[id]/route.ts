import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PATCH /api/orders/[id]  (cambiar estado del pedido - intranet)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const data: Record<string, unknown> = {}
  if (body.status) data.status = body.status
  if (body.paymentStatus) data.paymentStatus = body.paymentStatus
  if (body.notes !== undefined) data.notes = body.notes

  const order = await db.order.update({ where: { id }, data })
  return NextResponse.json({ order })
}

// GET /api/orders/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const order = await db.order.findUnique({ where: { id } })
  if (!order) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ order })
}
