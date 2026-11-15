import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function genCode() {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `PS-${n}`
}

// GET /api/orders?status=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const where: Record<string, unknown> = {}
  if (status && status !== 'all') where.status = status
  const orders = await db.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ orders })
}

// POST /api/orders  (crear pedido desde el checkout)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    customerName,
    whatsapp,
    deliveryMode,
    address,
    reference,
    items,
    subtotal,
    discount,
    total,
    couponCode,
    paymentMethod,
    paymentStatus,
    notes,
  } = body

  if (!customerName || !whatsapp || !items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Faltan datos del pedido' }, { status: 400 })
  }

  // Generar código único
  let code = genCode()
  let attempts = 0
  while (await db.order.findUnique({ where: { code } }) && attempts < 5) {
    code = genCode()
    attempts++
  }

  // Validar stock y decrementar
  for (const it of items) {
    const prod = await db.product.findUnique({ where: { id: it.id } })
    if (!prod) {
      return NextResponse.json({ error: `Producto ${it.id} no existe` }, { status: 400 })
    }
    if (prod.stock < it.qty) {
      return NextResponse.json(
        { error: `Stock insuficiente para ${prod.name}. Disponible: ${prod.stock}` },
        { status: 400 }
      )
    }
  }
  for (const it of items) {
    await db.product.update({
      where: { id: it.id },
      data: { stock: { decrement: it.qty } },
    })
  }

  // Incrementar uso del cupón si aplica
  if (couponCode) {
    const coupon = await db.coupon.findUnique({ where: { code: couponCode } })
    if (coupon) {
      await db.coupon.update({
        where: { code: couponCode },
        data: { uses: { increment: 1 } },
      })
    }
  }

  const order = await db.order.create({
    data: {
      code,
      customerName,
      whatsapp,
      deliveryMode,
      address: address || null,
      reference: reference || null,
      items: JSON.stringify(items),
      subtotal: Number(subtotal),
      discount: Number(discount) || 0,
      total: Number(total),
      couponCode: couponCode || null,
      paymentMethod: paymentMethod || 'whatsapp',
      paymentStatus: paymentStatus || 'pending',
      notes: notes || null,
      status: paymentStatus === 'paid' ? 'paid' : 'new',
    },
  })

  return NextResponse.json({ order }, { status: 201 })
}
