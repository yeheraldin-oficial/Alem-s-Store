// Seed: catálogo de ropa infantil "Alem's Store" + cupones + admin
import { db } from '../src/lib/db'

async function main() {
  // Admin user (password: admin123) - en producción debería ser hash
  await db.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: 'admin123' },
  })

  // Catálogo de productos
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
      description: 'Polover de punto suave con cuello alto. Abriga sin picar. Color verde fresco, combina con todo.',
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
      update: p,
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
      active: false, // inactivo de ejemplo
    },
  ]

  for (const c of coupons) {
    await db.coupon.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    })
  }

  // Configuración de la pasarela (modo prueba)
  await db.setting.upsert({
    where: { id: 'payment_provider' },
    update: {},
    create: {
      id: 'payment_provider',
      key: 'payment_provider',
      value: 'mercado_pago',
    },
  })
  await db.setting.upsert({
    where: { id: 'payment_commission' },
    update: {},
    create: {
      id: 'payment_commission',
      key: 'payment_commission',
      value: '0.039', // 3.9%
    },
  })

  console.log('Seed OK: 8 productos, 4 cupones, 1 admin, settings')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
