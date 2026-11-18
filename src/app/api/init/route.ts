import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { PrismaClient } from '@prisma/client'

// POST /api/init - Siembra la base de datos si está vacía (auto-seed en Vercel)
export async function POST() {
  try {
    // Verificar si ya hay productos
    const count = await db.product.count()

    if (count > 0) {
      return NextResponse.json({ ok: true, message: 'DB ya tiene datos', count })
    }

    // Si no hay productos, necesitamos crear el esquema y sembrar
    // En Vercel, el esquema se crea con db:push durante el build
    // Pero la DB en /tmp se borra entre cold starts, así que sembramos aquí

    // Admin
    await db.adminUser.upsert({
      where: { username: 'admin' },
      update: {},
      create: { username: 'admin', password: 'admin123' },
    })

    // Productos
    const products = [
      {
        id: 'P001',
        name: 'Body de bebé algodón orgánico',
        description: 'Body de algodón 100% orgánico, suave y transpirable. Botones de presión de seguridad. Hipoalergénico, certificado OEKO-TEX.',
        price: 35,
        category: 'Bebés',
        image: '/products/body-bebe.jpg',
        stock: 24,
        sizes: '0-3m,3-6m,6-12m,12-24m',
        active: true,
      },
      {
        id: 'P002',
        name: 'Conjunto pijama osito',
        description: 'Pijama de dos piezas con capucha de osito. Tejido de algodón felpa, ideal para noches frescas. Diseño adorable y cálido.',
        price: 55,
        category: 'Bebés',
        image: '/products/pijama-osito.jpg',
        stock: 15,
        sizes: '3-6m,6-12m,12-24m',
        active: true,
      },
      {
        id: 'P003',
        name: 'Vestido floral primavera',
        description: 'Vestido ligero con estampado floral manual. Tela de algodón fresco, perfecto para días de sol. Cuello redondo cómodo.',
        price: 65,
        category: 'Niñas',
        image: '/products/vestido-floral.jpg',
        stock: 18,
        sizes: '2-3a,3-4a,4-5a,5-6a',
        active: true,
      },
      {
        id: 'P004',
        name: 'Polover cuello alto',
        description: 'Polover de punto suave con cuello alto. Abriga sin picar. Color celeste fresco, combina con todo.',
        price: 45,
        category: 'Niños',
        image: '/products/polover.jpg',
        stock: 22,
        sizes: '2-3a,3-4a,4-5a,5-6a',
        active: true,
      },
      {
        id: 'P005',
        name: 'Pantalón deportivo unisex',
        description: 'Pantalón jogger de algodón elástico. Cintura ajustable con cordón. Cómodo para jugar y dormir.',
        price: 40,
        category: 'Niños',
        image: '/products/pantalon.jpg',
        stock: 30,
        sizes: '2-3a,3-4a,4-5a,5-6a',
        active: true,
      },
      {
        id: 'P006',
        name: 'Conjunto verano sol',
        description: 'Set de camiseta con sol sonriente + short. Tela refrescante de algodón pima. Perfecto para el verano.',
        price: 70,
        category: 'Verano',
        image: '/products/conjunto-verano.jpg',
        stock: 12,
        sizes: '2-3a,3-4a,4-5a',
        active: true,
      },
      {
        id: 'P007',
        name: 'Gorro de lana tejido a mano',
        description: 'Gorro tejido a mano en lana merino suave. Mantiene la cabeza calientita. Con pompón decorativo.',
        price: 25,
        category: 'Invierno',
        image: '/products/gorro-lana.jpg',
        stock: 40,
        sizes: 'Único',
        active: true,
      },
      {
        id: 'P008',
        name: 'Medias antideslizantes (par)',
        description: 'Medias con suela antideslizante de silicona. Seguridad para los primeros pasos. Pack de 2 pares.',
        price: 18,
        category: 'Accesorios',
        image: '/products/medias.jpg',
        stock: 50,
        sizes: '6-12m,12-24m,2-3a',
        active: true,
      },
    ]

    for (const p of products) {
      await db.product.upsert({
        where: { id: p.id },
        update: {},
        create: p,
      })
    }

    // Cupones
    const coupons = [
      {
        code: 'BIENVENIDA10',
        type: 'percentage',
        value: 10,
        minAmount: 0,
        description: '10% de descuento en tu primera compra, sin mínimo.',
        active: true,
      },
      {
        code: 'VERANO15',
        type: 'percentage',
        value: 15,
        minAmount: 100,
        description: '15% en compras desde S/100. Válido en categoría Verano.',
        active: true,
      },
      {
        code: 'ENVIOFREE',
        type: 'fixed',
        value: 15,
        minAmount: 80,
        description: 'S/15 de descuento (cubre envío) en compras desde S/80.',
        active: true,
      },
      {
        code: 'NAVIDAD20',
        type: 'percentage',
        value: 20,
        minAmount: 150,
        description: '20% de descuento en compras desde S/150. Solo diciembre.',
        active: false,
      },
    ]

    for (const c of coupons) {
      await db.coupon.upsert({
        where: { code: c.code },
        update: {},
        create: c,
      })
    }

    // Settings de la pasarela
    await db.setting.upsert({
      where: { id: 'payment_provider' },
      update: {},
      create: { id: 'payment_provider', key: 'payment_provider', value: 'mercado_pago' },
    })
    await db.setting.upsert({
      where: { id: 'payment_commission' },
      update: {},
      create: { id: 'payment_commission', key: 'payment_commission', value: '0.039' },
    })

    return NextResponse.json({
      ok: true,
      message: 'Base de datos sembrada correctamente',
      products: products.length,
      coupons: coupons.length,
    })
  } catch (error) {
    // Si el error es que la tabla no existe, intentar crear el esquema
    console.error('Error en init:', error)

    // Intentar crear tabla con SQL directo si Prisma no funciona
    try {
      // Verificar si podemos crear las tablas con SQL raw
      await db.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS Product (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          price REAL NOT NULL,
          category TEXT NOT NULL DEFAULT '',
          image TEXT NOT NULL DEFAULT '',
          stock INTEGER NOT NULL DEFAULT 0,
          active BOOLEAN NOT NULL DEFAULT 1,
          sizes TEXT NOT NULL DEFAULT '',
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL
        )
      `)

      await db.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS Coupon (
          id TEXT PRIMARY KEY,
          code TEXT NOT NULL UNIQUE,
          type TEXT NOT NULL,
          value REAL NOT NULL,
          minAmount REAL NOT NULL DEFAULT 0,
          description TEXT,
          active BOOLEAN NOT NULL DEFAULT 1,
          uses INTEGER NOT NULL DEFAULT 0,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL
        )
      `)

      await db.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Order" (
          id TEXT PRIMARY KEY,
          code TEXT NOT NULL UNIQUE,
          customerName TEXT NOT NULL,
          whatsapp TEXT NOT NULL,
          deliveryMode TEXT NOT NULL,
          address TEXT,
          reference TEXT,
          items TEXT NOT NULL,
          subtotal REAL NOT NULL,
          discount REAL NOT NULL DEFAULT 0,
          total REAL NOT NULL,
          couponCode TEXT,
          paymentMethod TEXT,
          paymentStatus TEXT NOT NULL DEFAULT 'pending',
          status TEXT NOT NULL DEFAULT 'new',
          notes TEXT,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL
        )
      `)

      await db.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS AdminUser (
          id TEXT PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `)

      await db.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS Setting (
          id TEXT PRIMARY KEY,
          key TEXT NOT NULL UNIQUE,
          value TEXT NOT NULL
        )
      `)

      // Reintentar sembrado
      const adminExists = await db.adminUser.findUnique({ where: { username: 'admin' } })
      if (!adminExists) {
        await db.adminUser.create({ data: { username: 'admin', password: 'admin123' } })
      }

      const productCount = await db.product.count()
      if (productCount === 0) {
        await db.product.createMany({
          data: [
            { id: 'P001', name: 'Body de bebé algodón orgánico', description: 'Body de algodón 100% orgánico, suave y transpirable. Botones de presión de seguridad. Hipoalergénico, certificado OEKO-TEX.', price: 35, category: 'Bebés', image: '/products/body-bebe.jpg', stock: 24, sizes: '0-3m,3-6m,6-12m,12-24m', active: true },
            { id: 'P002', name: 'Conjunto pijama osito', description: 'Pijama de dos piezas con capucha de osito. Tejido de algodón felpa, ideal para noches frescas.', price: 55, category: 'Bebés', image: '/products/pijama-osito.jpg', stock: 15, sizes: '3-6m,6-12m,12-24m', active: true },
            { id: 'P003', name: 'Vestido floral primavera', description: 'Vestido ligero con estampado floral manual. Tela de algodón fresco, perfecto para días de sol.', price: 65, category: 'Niñas', image: '/products/vestido-floral.jpg', stock: 18, sizes: '2-3a,3-4a,4-5a,5-6a', active: true },
            { id: 'P004', name: 'Polover cuello alto', description: 'Polover de punto suave con cuello alto. Abriga sin picar.', price: 45, category: 'Niños', image: '/products/polover.jpg', stock: 22, sizes: '2-3a,3-4a,4-5a,5-6a', active: true },
            { id: 'P005', name: 'Pantalón deportivo unisex', description: 'Pantalón jogger de algodón elástico. Cintura ajustable con cordón.', price: 40, category: 'Niños', image: '/products/pantalon.jpg', stock: 30, sizes: '2-3a,3-4a,4-5a,5-6a', active: true },
            { id: 'P006', name: 'Conjunto verano sol', description: 'Set de camiseta con sol sonriente + short. Tela refrescante de algodón pima.', price: 70, category: 'Verano', image: '/products/conjunto-verano.jpg', stock: 12, sizes: '2-3a,3-4a,4-5a', active: true },
            { id: 'P007', name: 'Gorro de lana tejido a mano', description: 'Gorro tejido a mano en lana merino suave. Mantiene la cabeza calientita.', price: 25, category: 'Invierno', image: '/products/gorro-lana.jpg', stock: 40, sizes: 'Único', active: true },
            { id: 'P008', name: 'Medias antideslizantes (par)', description: 'Medias con suela antideslizante de silicona. Seguridad para los primeros pasos.', price: 18, category: 'Accesorios', image: '/products/medias.jpg', stock: 50, sizes: '6-12m,12-24m,2-3a', active: true },
          ],
        })
      }

      const couponCount = await db.coupon.count()
      if (couponCount === 0) {
        await db.coupon.createMany({
          data: [
            { code: 'BIENVENIDA10', type: 'percentage', value: 10, minAmount: 0, description: '10% de descuento en tu primera compra, sin mínimo.', active: true },
            { code: 'VERANO15', type: 'percentage', value: 15, minAmount: 100, description: '15% en compras desde S/100.', active: true },
            { code: 'ENVIOFREE', type: 'fixed', value: 15, minAmount: 80, description: 'S/15 de descuento en compras desde S/80.', active: true },
            { code: 'NAVIDAD20', type: 'percentage', value: 20, minAmount: 150, description: '20% en compras desde S/150. Solo diciembre.', active: false },
          ],
        })
      }

      return NextResponse.json({ ok: true, message: 'DB creada y sembrada con SQL raw' })
    } catch (err2) {
      console.error('Error en init fallback:', err2)
      return NextResponse.json(
        { ok: false, error: 'No se pudo inicializar la base de datos', detail: String(err2) },
        { status: 500 }
      )
    }
  }
}

// GET /api/init - Verificar estado
export async function GET() {
  try {
    const count = await db.product.count()
    return NextResponse.json({ ok: true, products: count })
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
