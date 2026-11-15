'use client'
import { useEffect, useState, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

import {
  Package,
  ClipboardList,
  Ticket,
  CreditCard,
  Plus,
  Trash2,
  RefreshCw,
  LogOut,
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Check,
  X,
} from 'lucide-react'
import { BUSINESS } from '@/lib/business'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  sizes: string
  active: boolean
}
interface Order {
  id: string
  code: string
  customerName: string
  whatsapp: string
  deliveryMode: string
  address?: string | null
  items: string
  subtotal: number
  discount: number
  total: number
  couponCode?: string | null
  paymentMethod?: string | null
  paymentStatus: string
  status: string
  createdAt: string
}
interface Coupon {
  id: string
  code: string
  type: string
  value: number
  minAmount: number
  description?: string | null
  active: boolean
  uses: number
}

const ORDER_STATUSES = ['new', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled']
const STATUS_LABELS: Record<string, string> = {
  new: 'Nuevo',
  confirmed: 'Confirmado',
  paid: 'Pagado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}
const STATUS_COLORS: Record<string, string> = {
  new: 'bg-[var(--brand-pink-light)] text-[var(--brand-text)]',
  confirmed: 'bg-blue-100 text-blue-700',
  paid: 'bg-[var(--brand-blue-dark)] text-white',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-[var(--brand-pink-dark)] text-white',
  cancelled: 'bg-red-100 text-red-700',
}

export function AdminDashboard({
  open,
  onOpenChange,
  onLogout,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onLogout: () => void
}) {
  const [tab, setTab] = useState('orders')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[95vh] w-[95vw] max-w-5xl flex-col overflow-hidden p-0" aria-describedby={undefined}>
        <DialogHeader className="shrink-0 border-b border-[var(--brand-pink-dark)]/20 bg-[var(--brand-cream)] px-3 py-2 md:px-5 md:py-3">
          <DialogTitle className="flex items-center justify-between text-[var(--brand-pink-dark)]">
            <span className="flex items-center gap-2 text-sm md:text-base">
              <Package className="h-5 w-5" /> Intranet · {BUSINESS.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-[var(--destructive)]"
            >
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Salir</span>
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <TabsList className="mx-3 mt-2 grid grid-cols-4 bg-[var(--brand-cream)] md:mx-5 md:mt-3">
            <TabsTrigger value="orders" className="data-[state=active]:bg-[var(--brand-pink-dark)] data-[state=active]:text-white text-xs md:text-sm px-1 md:px-3">
              <ClipboardList className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-[var(--brand-pink-dark)] data-[state=active]:text-white text-xs md:text-sm px-1 md:px-3">
              <Package className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Catálogo</span>
            </TabsTrigger>
            <TabsTrigger value="coupons" className="data-[state=active]:bg-[var(--brand-pink-dark)] data-[state=active]:text-white text-xs md:text-sm px-1 md:px-3">
              <Ticket className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Cupones</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-[var(--brand-pink-dark)] data-[state=active]:text-white text-xs md:text-sm px-1 md:px-3">
              <CreditCard className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Pasarela</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido con scroll en ambas direcciones (horizontal y vertical) */}
          <TabsContent value="orders" className="m-0 min-h-0 flex-1 overflow-auto">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="products" className="m-0 min-h-0 flex-1 overflow-auto">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="coupons" className="m-0 min-h-0 flex-1 overflow-auto">
            <CouponsTab />
          </TabsContent>
          <TabsContent value="payment" className="m-0 min-h-0 flex-1 overflow-auto">
            <PaymentTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// ===== Pedidos =====
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const load = useCallback(async () => {
    const res = await fetch(`/api/orders?status=${filter}`)
    const data = await res.json()
    return (data.orders || []) as Order[]
  }, [filter])

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    load()
      .then((ords) => {
        if (!cancelled) setOrders(ords)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [load])

  const changeStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    toast.success(`Pedido pasado a: ${STATUS_LABELS[status]}`)
    load()
  }

  const stats = {
    total: orders.length,
    revenue: orders.filter((o) => o.paymentStatus === 'paid').reduce((s, o) => s + o.total, 0),
    pending: orders.filter((o) => o.status === 'new' || o.status === 'confirmed').length,
    clients: new Set(orders.map((o) => o.whatsapp)).size,
  }

  return (
    <div className="px-3 pb-3 md:px-5 md:pb-5">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 py-3 md:grid-cols-4">
        <StatCard icon={<ShoppingBag className="h-4 w-4" />} label="Pedidos" value={stats.total} color="coral" />
        <StatCard icon={<DollarSign className="h-4 w-4" />} label="Ingresos" value={`S/${stats.revenue.toFixed(2)}`} color="green" />
        <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Pendientes" value={stats.pending} color="yellow" />
        <StatCard icon={<Users className="h-4 w-4" />} label="Clientes" value={stats.clients} color="brown" />
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="h-4 w-4" /> Actualizar
        </Button>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Cargando...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed py-12 text-center">
          <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-2 font-semibold">No hay pedidos {filter !== 'all' ? `con estado "${STATUS_LABELS[filter]}"` : 'todavía'}</p>
          <p className="text-sm text-muted-foreground">Haz un pedido desde la tienda para verlo aquí.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const items = JSON.parse(o.items || '[]') as Array<{
              name: string
              qty: number
              price: number
              size: string
            }>
            return (
              <div key={o.id} className="rounded-xl border border-[var(--brand-pink-dark)]/20 bg-white p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className={STATUS_COLORS[o.status]}>
                        {STATUS_LABELS[o.status] || o.status}
                      </Badge>
                      <span className="font-bold text-foreground">{o.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(o.createdAt).toLocaleString('es-PE')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground">
                      <strong>{o.customerName}</strong> · {o.whatsapp} · {o.deliveryMode}
                    </p>
                    {o.address && (
                      <p className="text-xs text-muted-foreground">📍 {o.address}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {o.paymentMethod === 'card' ? 'Tarjeta' : o.paymentMethod === 'yape' ? 'Yape 📱' : 'WhatsApp'} ·{' '}
                      {o.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                    </p>
                    <p className="text-lg font-extrabold text-[var(--brand-pink-dark)]">
                      S/ {o.total.toFixed(2)}
                    </p>
                    {o.couponCode && (
                      <Badge variant="outline" className="text-xs">
                        {o.couponCode}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-2 rounded-lg bg-[var(--brand-cream)] p-2 text-xs">
                  {items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span>
                        {it.qty}x {it.name} ({it.size})
                      </span>
                      <span>S/{(it.qty * it.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="mt-1 flex justify-between border-t border-[var(--brand-pink-dark)]/10 pt-1">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">S/{o.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Cambiar estado:</span>
                  <Select value={o.status} onValueChange={(v) => changeStatus(o.id, v)}>
                    <SelectTrigger className="h-8 w-40 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: 'coral' | 'green' | 'yellow' | 'brown'
}) {
  const colors = {
    coral: 'bg-[var(--brand-pink-light)]/40 text-[var(--brand-pink-dark)]',
    green: 'bg-[var(--brand-blue-light)]/40 text-[var(--brand-blue-dark)]',
    yellow: 'bg-[var(--brand-lavender)]/60 text-[var(--brand-text)]',
    brown: 'bg-[#E8D5C4]/60 text-[var(--brand-text)]',
  }
  return (
    <div className="rounded-xl border border-[var(--brand-pink-dark)]/15 bg-white p-3">
      <div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-extrabold text-foreground">{value}</p>
    </div>
  )
}

// ===== Productos (Catálogo) =====
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Product | null>(null)
  const [showNew, setShowNew] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/products?active=false')
    const data = await res.json()
    return (data.products || []) as Product[]
  }, [])

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    load()
      .then((prods) => {
        if (!cancelled) setProducts(prods)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [load])

  const toggleActive = async (p: Product) => {
    await fetch(`/api/products/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !p.active }),
    })
    toast.success(`${p.name}: ${!p.active ? 'Activo' : 'Inactivo'}`)
    load()
  }

  const quickStock = async (p: Product, delta: number) => {
    const newStock = Math.max(0, p.stock + delta)
    await fetch(`/api/products/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock }),
    })
    load()
  }

  const remove = async (p: Product) => {
    if (!confirm(`¿Eliminar "${p.name}"?`)) return
    await fetch(`/api/products/${p.id}`, { method: 'DELETE' })
    toast.success('Producto eliminado')
    load()
  }

  return (
    <div className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="flex items-center justify-between py-3">
        <h3 className="font-bold text-foreground">
          Catálogo · {products.length} producto(s)
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => setShowNew(true)} className="bg-[var(--brand-pink-dark)] text-white">
            <Plus className="h-4 w-4" /> Nuevo
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <div className="rounded-xl border border-[var(--brand-pink-dark)]/20"><div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--brand-cream)]">
                <TableHead>ID</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Activo</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-1 font-medium">{p.name}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{p.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{p.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold text-[var(--brand-pink-dark)]">
                    S/{p.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-1">
                      <button onClick={() => quickStock(p, -1)} className="h-6 w-6 rounded-full border text-xs hover:bg-[var(--brand-lavender)]">
                        −
                      </button>
                      <span className="w-8 font-bold">{p.stock}</span>
                      <button onClick={() => quickStock(p, 1)} className="h-6 w-6 rounded-full border text-xs hover:bg-[var(--brand-lavender)]">
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch checked={p.active} onCheckedChange={() => toggleActive(p)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditing(p)}>
                        ✎
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--destructive)]" onClick={() => remove(p)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      )}

      <p className="mt-3 rounded-xl bg-[var(--brand-lavender)]/40 p-3 text-xs text-muted-foreground">
        <strong className="text-foreground">Equivalente a Google Sheets:</strong> Esta tabla funciona
        como tu panel de catálogo. Cambios en precio, stock o &ldquo;activo&rdquo; se reflejan al instante
        en la tienda pública (sincronización).
      </p>

      {(editing || showNew) && (
        <ProductEditor
          product={editing}
          onClose={() => {
            setEditing(null)
            setShowNew(false)
          }}
          onSaved={() => {
            setEditing(null)
            setShowNew(false)
            load()
          }}
        />
      )}
    </div>
  )
}

function ProductEditor({
  product,
  onClose,
  onSaved,
}: {
  product: Product | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState<Product>(
    product || {
      id: '',
      name: '',
      description: '',
      price: 0,
      category: BUSINESS.categories[0],
      image: '/products/body-bebe.jpg',
      stock: 0,
      sizes: '',
      active: true,
    }
  )
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (!form.id || !form.name) {
      toast.error('ID y nombre son obligatorios')
      return
    }
    setSaving(true)
    const method = product ? 'PUT' : 'POST'
    const url = product ? `/api/products/${form.id}` : '/api/products'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    toast.success(product ? 'Producto actualizado' : 'Producto creado')
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-3 text-lg font-bold text-[var(--brand-pink-dark)]">
          {product ? 'Editar producto' : 'Nuevo producto'}
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <Label>ID *</Label>
              <Input
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value.toUpperCase() })}
                disabled={!!product}
                placeholder="P009"
              />
            </div>
            <div className="col-span-2">
              <Label>Nombre *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Descripción</Label>
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>Precio (S/)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Categoría</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS.categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Tallas (separadas por coma)</Label>
            <Input
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              placeholder="0-3m,3-6m,6-12m"
            />
          </div>
          <div>
            <Label>Imagen (ruta /public)</Label>
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/products/body-bebe.jpg"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={form.active}
              onCheckedChange={(v) => setForm({ ...form, active: v })}
            />
            <Label>Activo (visible en la tienda)</Label>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={save} disabled={saving} className="bg-[var(--brand-pink-dark)] text-white">
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ===== Cupones =====
function CouponsTab() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/coupons')
    const data = await res.json()
    return (data.coupons || []) as Coupon[]
  }, [])

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    load()
      .then((cps) => {
        if (!cancelled) setCoupons(cps)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [load])

  const toggleActive = async (c: Coupon) => {
    await fetch(`/api/coupons/${c.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !c.active }),
    })
    toast.success(`${c.code}: ${!c.active ? 'Activo' : 'Inactivo'}`)
    load()
  }

  const remove = async (c: Coupon) => {
    if (!confirm(`¿Eliminar cupón ${c.code}?`)) return
    await fetch(`/api/coupons/${c.id}`, { method: 'DELETE' })
    toast.success('Cupón eliminado')
    load()
  }

  return (
    <div className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="flex items-center justify-between py-3">
        <h3 className="font-bold text-foreground">Cupones · {coupons.length}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => setShowNew(true)} className="bg-[var(--brand-pink-dark)] text-white">
            <Plus className="h-4 w-4" /> Nuevo cupón
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <div className="rounded-xl border border-[var(--brand-pink-dark)]/20"><div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--brand-cream)]">
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Mín.</TableHead>
                <TableHead className="text-center">Usos</TableHead>
                <TableHead className="text-center">Activo</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <code className="font-mono font-bold text-[var(--brand-pink-dark)]">{c.code}</code>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {c.type === 'percentage' ? 'Porcentaje' : 'Monto fijo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {c.type === 'percentage' ? `${c.value}%` : `S/${c.value.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="text-right">S/{c.minAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{c.uses}</TableCell>
                  <TableCell className="text-center">
                    <Switch checked={c.active} onCheckedChange={() => toggleActive(c)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--destructive)]" onClick={() => remove(c)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      )}

      {showNew && (
        <CouponEditor
          onClose={() => setShowNew(false)}
          onSaved={() => {
            setShowNew(false)
            load()
          }}
        />
      )}
    </div>
  )
}

function CouponEditor({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    code: '',
    type: 'percentage',
    value: 10,
    minAmount: 0,
    description: '',
    active: true,
  })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (!form.code) {
      toast.error('Código obligatorio')
      return
    }
    setSaving(true)
    const res = await fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (data.coupon) {
      toast.success('Cupón creado')
      onSaved()
    } else {
      toast.error(data.error || 'Error')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-3 text-lg font-bold text-[var(--brand-pink-dark)]">Nuevo cupón</h3>
        <div className="space-y-3">
          <div>
            <Label>Código *</Label>
            <Input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              placeholder="BIENVENIDA10"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Tipo</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                  <SelectItem value="fixed">Monto fijo (S/)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Valor</Label>
              <Input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <Label>Monto mínimo (S/)</Label>
            <Input
              type="number"
              value={form.minAmount}
              onChange={(e) => setForm({ ...form, minAmount: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Descripción</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="10% en tu primera compra"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
            <Label>Activo</Label>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={save} disabled={saving} className="bg-[var(--brand-pink-dark)] text-white">
            {saving ? 'Guardando...' : 'Crear cupón'}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ===== Pasarela =====
function PaymentTab() {
  return (
    <div className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="py-3">
        <h3 className="font-bold text-foreground">Configuración de la pasarela de pagos</h3>
        <p className="text-sm text-muted-foreground">Modo de prueba · no se procesan pagos reales</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--brand-pink-dark)]/20 bg-white p-4">
          <p className="text-xs font-semibold text-muted-foreground">PASARELA ELEGIDA</p>
          <p className="text-lg font-bold text-foreground">{BUSINESS.paymentProvider}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Checkout Pro (redirección a la página de la pasarela).
          </p>
        </div>
        <div className="rounded-xl border border-[var(--brand-pink-dark)]/20 bg-white p-4">
          <p className="text-xs font-semibold text-muted-foreground">COMISIÓN</p>
          <p className="text-lg font-bold text-foreground">
            {(BUSINESS.paymentCommissionRate * 100).toFixed(1)}% por transacción
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[var(--brand-cream)] p-4">
        <p className="font-bold text-foreground">Ejemplo con un producto</p>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Precio de venta</span>
            <span className="font-medium">S/ 65.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Comisión {BUSINESS.paymentProvider} ({(BUSINESS.paymentCommissionRate * 100).toFixed(1)}%)
            </span>
            <span className="font-medium text-[var(--destructive)]">
              -S/ {(65 * BUSINESS.paymentCommissionRate).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-t border-[var(--brand-pink-dark)]/20 pt-1 text-base font-bold">
            <span>Recibes en tu cuenta</span>
            <span className="text-[var(--brand-blue-dark)]">
              S/ {(65 - 65 * BUSINESS.paymentCommissionRate).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--brand-blue-dark)]/30 bg-[var(--brand-blue-light)]/20 p-4">
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue-dark)]" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">Seguridad</p>
            <ul className="mt-1 list-disc pl-4 text-xs text-muted-foreground">
              <li>Tarjetas de prueba sandbox (no reales)</li>
              <li>Access Token nunca se incluye en el código visible</li>
              <li>Webhook firma la transacción</li>
              <li>Cumple PCI-DSS nivel 6 (pasarela)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--brand-pink-light)]/40 bg-[var(--brand-lavender)]/30 p-4">
        <div className="flex items-start gap-2">
          <X className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-text)]" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">Importante</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Las credenciales reales (Access Token, Public Key) NO se muestran en esta pantalla
              ni en el código fuente visible del cliente. Se guardan como variables de entorno en
              el servidor.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
