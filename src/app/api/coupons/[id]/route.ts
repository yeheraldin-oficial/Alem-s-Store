import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PATCH /api/coupons/[id]  (activar/desactivar o actualizar)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const data: Record<string, unknown> = {}
  if (body.active !== undefined) data.active = !!body.active
  if (body.value !== undefined) data.value = Number(body.value)
  if (body.minAmount !== undefined) data.minAmount = Number(body.minAmount)
  if (body.description !== undefined) data.description = body.description
  if (body.type !== undefined) data.type = body.type

  const coupon = await db.coupon.update({ where: { id }, data })
  return NextResponse.json({ coupon })
}

// DELETE /api/coupons/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await db.coupon.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
