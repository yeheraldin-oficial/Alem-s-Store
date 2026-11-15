import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/coupons/validate  { code, subtotal }
export async function POST(req: NextRequest) {
  const { code, subtotal } = await req.json()
  if (!code) {
    return NextResponse.json({ valid: false, message: 'Ingresa un código.' })
  }
  const coupon = await db.coupon.findUnique({
    where: { code: String(code).toUpperCase().trim() },
  })
  if (!coupon) {
    return NextResponse.json({ valid: false, message: 'El cupón no existe.' })
  }
  if (!coupon.active) {
    return NextResponse.json({ valid: false, message: 'El cupón está inactivo.' })
  }
  if (subtotal < coupon.minAmount) {
    return NextResponse.json({
      valid: false,
      message: `Necesitas un mínimo de S/${coupon.minAmount.toFixed(2)} para usar este cupón.`,
    })
  }
  const discount =
    coupon.type === 'percentage'
      ? +(subtotal * (coupon.value / 100)).toFixed(2)
      : +coupon.value.toFixed(2)
  const cappedDiscount = Math.min(discount, subtotal)
  return NextResponse.json({
    valid: true,
    message: `Cupón aplicado: ${coupon.description || coupon.code}`,
    coupon: {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      description: coupon.description,
    },
    discount: cappedDiscount,
  })
}
