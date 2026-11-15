import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/coupons
export async function GET() {
  const coupons = await db.coupon.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ coupons })
}

// POST /api/coupons  (admin: crear cupón)
export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.code || !body.type || body.value == null) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }
  const coupon = await db.coupon.create({
    data: {
      code: String(body.code).toUpperCase().trim(),
      type: body.type,
      value: Number(body.value),
      minAmount: Number(body.minAmount) || 0,
      description: body.description || '',
      active: body.active !== false,
    },
  })
  return NextResponse.json({ coupon }, { status: 201 })
}
