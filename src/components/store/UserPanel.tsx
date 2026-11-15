'use client'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LogOut, Package, User as UserIcon, Mail, Phone, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUser } from '@/lib/user-context'
import { toast } from 'sonner'

interface Order {
  id: string
  code: string
  customerName: string
  whatsapp: string
  items: string
  subtotal: number
  discount: number
  total: number
  status: string
  paymentMethod?: string | null
  paymentStatus: string
  createdAt: string
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Nuevo',
  confirmed: 'Confirmado',
  paid: 'Pagado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-[var(--brand-yellow)] text-[var(--brand-text)]',
  confirmed: 'bg-[var(--brand-blue)] text-white',
  paid: 'bg-[var(--brand-pink)] text-white',
  shipped: 'bg-[var(--brand-blue-dark)] text-white',
  delivered: 'bg-[var(--brand-pink-dark)] text-white',
  cancelled: 'bg-red-100 text-red-700',
}

interface UserPanelProps {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function UserPanel({ open, onOpenChange }: UserPanelProps) {
  const { user, logout } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !user) return
    // Cargar pedidos del usuario (por email o nombre)
    const loadOrders = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/orders?status=all`)
        const data = await res.json()
        const allOrders: Order[] = data.orders || []
        // Filtrar pedidos que coincidan con el nombre o email del usuario
        const myOrders = allOrders.filter(
          (o) =>
            o.customerName.toLowerCase().includes(user.name.toLowerCase().split(' ')[0]) ||
            (user.phone && o.whatsapp.includes(user.phone.replace(/\D/g, '')))
        )
        setOrders(myOrders)
      } catch {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [open, user])

  const handleLogout = () => {
    logout()
    toast.info('Sesión cerrada', {
      description: 'Has cerrado sesión correctamente',
    })
    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--brand-pink)]">
            <UserIcon className="h-5 w-5" />
            Mi cuenta
          </DialogTitle>
          <DialogDescription>
            Hola <strong>{user.name}</strong>, estos son tus datos y pedidos
          </DialogDescription>
        </DialogHeader>

        {/* Datos del usuario */}
        <div className="rounded-2xl bg-[var(--brand-pink-pale)]/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-pink)] text-lg font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user.email}
              </p>
              {user.phone && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {user.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pedidos del usuario */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-bold text-foreground">
            <Package className="h-4 w-4 text-[var(--brand-pink)]" />
            Mis pedidos ({orders.length})
          </h3>

          {loading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Cargando tus pedidos...
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border-2 border-dashed border-[var(--brand-pink)]/20 py-8 text-center"
            >
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm font-semibold text-foreground">
                Aún no tienes pedidos
              </p>
              <p className="text-xs text-muted-foreground">
                Cuando hagas tu primera compra aparecerá aquí
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {orders.map((order, i) => {
                const items = JSON.parse(order.items || '[]') as Array<{
                  name: string
                  qty: number
                  price: number
                  size: string
                }>
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl border border-[var(--brand-pink)]/15 bg-white p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={STATUS_COLORS[order.status] || 'bg-gray-200'}>
                            {STATUS_LABELS[order.status] || order.status}
                          </Badge>
                          <span className="font-bold text-foreground">{order.code}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleString('es-PE')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {order.paymentMethod === 'yape'
                            ? 'Yape'
                            : order.paymentMethod === 'card'
                            ? 'Tarjeta'
                            : 'WhatsApp'}
                          {' · '}
                          {order.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                        </p>
                        <p className="text-lg font-extrabold text-[var(--brand-pink)]">
                          S/ {order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mt-2 rounded-lg bg-[var(--brand-pink-pale)]/30 p-2 text-xs">
                      {items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {it.qty}x {it.name} ({it.size})
                          </span>
                          <span>S/{(it.qty * it.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        {/* Cerrar sesión */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full rounded-full text-[var(--brand-pink)] hover:bg-[var(--brand-pink-pale)]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </DialogContent>
    </Dialog>
  )
}
