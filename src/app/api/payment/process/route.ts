import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/payment/process  (simulación de pasarela en modo prueba)
// Body: { amount, method, cardLast4?, itemsCount, customerName }
// method: 'mercado_pago' | 'yape' | 'plin'
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { amount, method } = body

  if (!amount || amount <= 0) {
    return NextResponse.json(
      { ok: false, status: 'rejected', message: 'Monto inválido.' },
      { status: 400 }
    )
  }

  // Comisión según el método
  let commissionRate = 0.039 // Mercado Pago por defecto
  let methodName = 'Mercado Pago'

  if (method === 'yape') {
    commissionRate = 0 // Yape no cobra comisión al comerciante
    methodName = 'Yape'
  } else if (method === 'plin') {
    commissionRate = 0 // Plin tampoco cobra al pequeño comerciante
    methodName = 'Plin'
  } else {
    // Mercado Pago: leer comisión desde la base
    const setting = await db.setting.findUnique({ where: { id: 'payment_commission' } })
    if (setting) commissionRate = parseFloat(setting.value) || 0.039
  }

  const commission = +(amount * commissionRate).toFixed(2)
  const net = +(amount - commission).toFixed(2)

  // Simulación: Yape/Plin 98% aprobación, Mercado Pago 95%
  const approvalRate = method === 'yape' || method === 'plin' ? 0.98 : 0.95
  const approved = Math.random() < approvalRate

  // Generar ID de transacción como una pasarela real
  const prefix = method === 'yape' ? 'yape' : method === 'plin' ? 'plin' : 'mp'
  const txId = `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)
    .toString(36)
    .toUpperCase()}`

  if (!approved) {
    return NextResponse.json({
      ok: false,
      status: 'rejected',
      txId,
      message: `Pago rechazado por ${methodName}. Intenta nuevamente.`,
    })
  }

  return NextResponse.json({
    ok: true,
    status: 'approved',
    txId,
    method: method || 'mercado_pago',
    methodName,
    amount,
    commission,
    commissionRate: commissionRate * 100,
    net,
    message: `Pago aprobado con ${methodName} en modo de prueba.`,
    paidAt: new Date().toISOString(),
  })
}
