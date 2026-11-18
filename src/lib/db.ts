import { PrismaClient } from '@prisma/client'

// En Vercel (producción), usar /tmp que es el único directorio escribible
// En desarrollo, usar la ruta local normal
const dbUrl = process.env.DATABASE_URL || (
  process.env.VERCEL
    ? 'file:/tmp/alems-store.db'
    : 'file:./db/custom.db'
)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: dbUrl,
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db