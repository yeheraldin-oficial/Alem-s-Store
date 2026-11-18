import { db } from './db'

let initialized = false

// Asegura que la base de datos tenga tablas y datos mínimos
// Se llama desde API routes críticas para evitar errores en Vercel
export async function ensureDb() {
  if (initialized) return

  try {
    // Verificar si la tabla Product existe y tiene datos
    const count = await db.product.count()
    if (count > 0) {
      initialized = true
      return
    }
  } catch {
    // La tabla no existe - crear esquema con SQL raw
    try {
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

      // Sembrar datos básicos
      await db.product.createMany({
        data: [
          { id: 'P001', name: 'Body de bebé algodón orgánico', description: 'Body de algodón 100% orgánico, suave y transpirable.', price: 35, category: 'Bebés', image: '/products/body-bebe.jpg', stock: 24, sizes: '0-3m,3-6m,6-12m,12-24m', active: true },
          { id: 'P002', name: 'Conjunto pijama osito', description: 'Pijama de dos piezas con capucha de osito.', price: 55, category: 'Bebés', image: '/products/pijama-osito.jpg', stock: 15, sizes: '3-6m,6-12m,12-24m', active: true },
          { id: 'P003', name: 'Vestido floral primavera', description: 'Vestido ligero con estampado floral.', price: 65, category: 'Niñas', image: '/products/vestido-floral.jpg', stock: 18, sizes: '2-3a,3-4a,4-5a,5-6a', active: true },
          { id: 'P004', name: 'Polover cuello alto', description: 'Polover de punto suave con cuello alto.', price: 45, category: 'Niños', image: '/products/polover.jpg', stock: 22, sizes: '2-3a,3-4a,4-5a,5-6a', active: true },
          { id: 'P005', name: 'Pantalón deportivo unisex', description: 'Pantalón jogger de algodón elástico.', price: 40, category: 'Niños', image: '/products/pantalon.jpg', stock: 30, sizes: '2-3a,3-4a,4-5a,5-6a', active: true },
          { id: 'P006', name: 'Conjunto verano sol', description: 'Set de camiseta con sol + short.', price: 70, category: 'Verano', image: '/products/conjunto-verano.jpg', stock: 12, sizes: '2-3a,3-4a,4-5a', active: true },
          { id: 'P007', name: 'Gorro de lana tejido a mano', description: 'Gorro tejido a mano en lana merino.', price: 25, category: 'Invierno', image: '/products/gorro-lana.jpg', stock: 40, sizes: 'Único', active: true },
          { id: 'P008', name: 'Medias antideslizantes (par)', description: 'Medias con suela antideslizante.', price: 18, category: 'Accesorios', image: '/products/medias.jpg', stock: 50, sizes: '6-12m,12-24m,2-3a', active: true },
        ],
      })

      await db.coupon.createMany({
        data: [
          { code: 'BIENVENIDA10', type: 'percentage', value: 10, minAmount: 0, description: '10% de descuento, sin mínimo.', active: true },
          { code: 'VERANO15', type: 'percentage', value: 15, minAmount: 100, description: '15% desde S/100.', active: true },
          { code: 'ENVIOFREE', type: 'fixed', value: 15, minAmount: 80, description: 'S/15 off desde S/80.', active: true },
          { code: 'NAVIDAD20', type: 'percentage', value: 20, minAmount: 150, description: '20% desde S/150.', active: false },
        ],
      })

      await db.adminUser.create({ data: { username: 'admin', password: 'admin123' } })

      initialized = true
    } catch (err) {
      console.error('ensureDb: error creando tablas:', err)
    }
  }
}
