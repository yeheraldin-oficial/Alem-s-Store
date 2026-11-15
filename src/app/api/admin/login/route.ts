import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/admin/login  { username, password }
export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password) {
    return NextResponse.json({ ok: false, error: 'Faltan credenciales' }, { status: 400 })
  }
  const admin = await db.adminUser.findUnique({ where: { username } })
  if (!admin || admin.password !== password) {
    return NextResponse.json({ ok: false, error: 'Usuario o contraseña incorrectos' }, { status: 401 })
  }
  // Token simple (no seguro - solo demo académica)
  const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
  return NextResponse.json({ ok: true, token, username })
}
