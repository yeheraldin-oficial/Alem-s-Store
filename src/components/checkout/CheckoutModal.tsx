'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tag,
  Check,
  Loader2,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  PartyPopper,
  Copy,
} from 'lucide-react'
import { useCart } from '@/lib/store'
import { BUSINESS } from '@/lib/business'
import { toast } from 'sonner'

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
}

type Step = 'datos' | 'cupon' | 'pago' | 'procesando' | 'exito' | 'whatsapp'
type PayMethod = 'whatsapp' | 'card' | 'yape'

export function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const items = useCart((s) => s.items)
  const subtotal = useCart((s) => s.subtotal())
  const discount = useCart((s) => s.discount)
  const total = useCart((s) => s.total())
  const couponCode = useCart((s) => s.couponCode)
  const setCoupon = useCart((s) => s.setCoupon)
  const clear = useCart((s) => s.clear)

  const [step, setStep] = useState<Step>('datos')
  const [form, setForm] = useState({
    customerName: '',
    whatsapp: '',
    deliveryMode: 'Delivery',
    address: '',
    reference: '',
  })
  const [couponInput, setCouponInput] = useState('')
  const [validating, setValidating] = useState(false)
  const [payMethod, setPayMethod] = useState<PayMethod>('whatsapp')
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvv: '' })
  const [paymentResult, setPaymentResult] = useState<null | {
    ok: boolean
    status: string
    txId?: string
    message?: string
    net?: number
    commission?: number
  }>(null)
  const [orderCode, setOrderCode] = useState<string>('')

  const reset = () => {
    setStep('datos')
    setPaymentResult(null)
    setOrderCode('')
    setCard({ number: '', name: '', exp: '', cvv: '' })
  }

  const handleClose = (v: boolean) => {
    onOpenChange(v)
    if (!v) setTimeout(reset, 200)
  }

  const validateCoupon = async () => {
    if (!couponInput.trim()) {
      toast.error('Escribe un código de cupón')
      return
    }
    setValidating(true)
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, subtotal }),
      })
      const data = await res.json()
      if (data.valid) {
        setCoupon(data.coupon.code, data.discount, {
          code: data.coupon.code,
          description: data.coupon.description || data.coupon.code,
        })
        toast.success(data.message)
      } else {
        setCoupon(null, 0, null)
        toast.error(data.message)
      }
    } catch {
      toast.error('Error al validar el cupón')
    } finally {
      setValidating(false)
    }
  }

  const removeCoupon = () => {
    setCoupon(null, 0, null)
    setCouponInput('')
    toast.info('Cupón removido')
  }

  const submitDatos = () => {
    // Validaciones con alertas claras campo por campo
    if (!form.customerName.trim()) {
      toast.error('Falta tu nombre completo', {
        description: 'Ingresa tu nombre para continuar con la compra',
      })
      return
    }
    if (form.customerName.trim().length < 3) {
      toast.error('Nombre muy corto', {
        description: 'Tu nombre debe tener al menos 3 caracteres',
      })
      return
    }
    if (!form.whatsapp.trim()) {
      toast.error('Falta tu WhatsApp', {
        description: 'Ingresa tu número de WhatsApp para coordinar la entrega',
      })
      return
    }
    if (form.whatsapp.replace(/\D/g, '').length < 6) {
      toast.error('WhatsApp inválido', {
        description: 'Revisa el número de WhatsApp ingresado (mínimo 6 dígitos)',
      })
      return
    }
    if (form.deliveryMode === 'Delivery' && !form.address.trim()) {
      toast.error('Falta tu dirección de entrega', {
        description: 'Ingresa la dirección donde quieres recibir tu pedido',
      })
      return
    }
    if (form.deliveryMode === 'Delivery' && form.address.trim().length < 5) {
      toast.error('Dirección muy corta', {
        description: 'Ingresa una dirección completa (calle, número, referencia)',
      })
      return
    }
    // Todo OK, avanzar
    setStep('cupon')
  }

  const submitPago = () => {
    if (payMethod === 'card') {
      if (!card.number.trim()) {
        toast.error('Falta el número de tarjeta', {
          description: 'Ingresa el número de tu tarjeta de prueba',
        })
        return
      }
      if (!card.name.trim()) {
        toast.error('Falta el nombre en la tarjeta', {
          description: 'Ingresa el nombre tal como aparece en tu tarjeta',
        })
        return
      }
      if (!card.exp.trim()) {
        toast.error('Falta la fecha de vencimiento', {
          description: 'Ingresa el vencimiento en formato MM/AA',
        })
        return
      }
      if (!card.cvv.trim()) {
        toast.error('Falta el CVV', {
          description: 'Ingresa el código de seguridad (3 dígitos al reverso)',
        })
        return
      }
    }
    setStep('procesando')
    procesarPago()
  }

  const procesarPago = async () => {
    try {
      if (payMethod === 'whatsapp') {
        // Crear pedido y redirigir a WhatsApp
        const orderRes = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            items,
            subtotal,
            discount,
            total,
            couponCode,
            paymentMethod: 'whatsapp',
            paymentStatus: 'pending',
          }),
        })
        const orderData = await orderRes.json()
        if (!orderData.order) {
          toast.error(orderData.error || 'Error al crear pedido')
          setStep('pago')
          return
        }
        setOrderCode(orderData.order.code)
        setStep('whatsapp')
      } else if (payMethod === 'yape') {
        // Yape: procesar pago sin comisión
        const payRes = await fetch('/api/payment/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            method: 'yape',
            itemsCount: items.reduce((n, i) => n + i.qty, 0),
            customerName: form.customerName,
          }),
        })
        const payData = await payRes.json()
        setPaymentResult(payData)

        if (payData.ok) {
          // Crear pedido pagado con Yape
          const orderRes = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...form,
              items,
              subtotal,
              discount,
              total,
              couponCode,
              paymentMethod: 'yape',
              paymentStatus: 'paid',
            }),
          })
          const orderData = await orderRes.json()
          if (orderData.order) setOrderCode(orderData.order.code)
          setStep('exito')
        } else {
          setStep('pago')
          toast.error(payData.message || 'Pago rechazado')
        }
      } else {
        // Pasarela Mercado Pago (tarjeta)
        const payRes = await fetch('/api/payment/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            method: 'mercado_pago',
            cardLast4: card.number.slice(-4),
            itemsCount: items.reduce((n, i) => n + i.qty, 0),
            customerName: form.customerName,
          }),
        })
        const payData = await payRes.json()
        setPaymentResult(payData)

        if (payData.ok) {
          // Crear pedido pagado
          const orderRes = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...form,
              items,
              subtotal,
              discount,
              total,
              couponCode,
              paymentMethod: 'card',
              paymentStatus: 'paid',
            }),
          })
          const orderData = await orderRes.json()
          if (orderData.order) setOrderCode(orderData.order.code)
          setStep('exito')
        } else {
          setStep('pago')
          toast.error(payData.message || 'Pago rechazado')
        }
      }
    } catch {
      toast.error('Error de conexión')
      setStep('pago')
    }
  }

  const buildWhatsappMessage = () => {
    const lines = [
      `¡Hola ${BUSINESS.name}! 👋`,
      `Soy ${form.customerName} y quiero confirmar mi pedido.`,
      ``,
      `*PEDIDO ${orderCode}*`,
      ...items.map(
        (i) =>
          `• ${i.qty}x ${i.name} (Talla ${i.size}) - S/${i.price.toFixed(2)} c/u = S/${(
            i.price * i.qty
          ).toFixed(2)}`
      ),
      ``,
      `Subtotal: S/${subtotal.toFixed(2)}`,
    ]
    if (discount > 0) {
      lines.push(`Descuento${couponCode ? ` (${couponCode})` : ''}: -S/${discount.toFixed(2)}`)
    }
    lines.push(`*Total: S/${total.toFixed(2)}*`, ``)
    lines.push(
      `*Datos de entrega*`,
      `Nombre: ${form.customerName}`,
      `WhatsApp: ${form.whatsapp}`,
      `Modalidad: ${form.deliveryMode}`
    )
    if (form.deliveryMode === 'Delivery') {
      lines.push(`Dirección: ${form.address}`)
      if (form.reference) lines.push(`Referencia: ${form.reference}`)
    }
    return encodeURIComponent(lines.join('\n'))
  }

  const openWhatsApp = () => {
    const msg = buildWhatsappMessage()
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${msg}`, '_blank')
  }

  const finalizar = () => {
    clear()
    handleClose(false)
    toast.success('¡Pedido enviado! Revisa tu WhatsApp.')
  }

  // ----- Render -----
  const totalItems = items.reduce((n, i) => n + i.qty, 0)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[92vh] w-[95vw] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--brand-pink-dark)]">
            {step === 'exito' ? (
              <>
                <PartyPopper className="h-5 w-5" /> ¡Pedido confirmado!
              </>
            ) : step === 'whatsapp' ? (
              <>
                <MessageCircle className="h-5 w-5" /> Envía tu pedido por WhatsApp
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" /> Finalizar compra
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === 'datos' && 'Paso 1 de 3 · Completa tus datos de entrega.'}
            {step === 'cupon' && 'Paso 2 de 3 · ¿Tienes un cupón? Aplícalo aquí.'}
            {step === 'pago' && 'Paso 3 de 3 · Elige cómo pagar tu pedido.'}
            {step === 'procesando' && 'Procesando tu pago...'}
            {step === 'exito' && 'Tu pago fue aprobado y tu pedido quedó registrado.'}
            {step === 'whatsapp' && 'Tu pedido fue registrado. Confírmalo por WhatsApp.'}
          </DialogDescription>
        </DialogHeader>

        {/* Resumen carrito siempre visible excepto en éxito */}
        {step !== 'exito' && step !== 'whatsapp' && (
          <div className="rounded-xl bg-[var(--brand-lavender)]/40 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{totalItems} prenda(s)</span>
              <span className="font-bold">S/ {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[var(--brand-blue-dark)]">
                <span>Descuento {couponCode && `(${couponCode})`}</span>
                <span>-S/ {discount.toFixed(2)}</span>
              </div>
            )}
            <Separator className="my-1.5" />
            <div className="flex justify-between text-base font-extrabold">
              <span>Total</span>
              <span className="text-[var(--brand-pink-dark)]">S/ {total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Paso 1: Datos */}
        {step === 'datos' && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                placeholder="Ej: María González"
              />
            </div>
            <div>
              <Label htmlFor="wa">WhatsApp *</Label>
              <Input
                id="wa"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="Ej: 987 390 211"
              />
            </div>
            <div>
              <Label>Modalidad de entrega *</Label>
              <RadioGroup
                value={form.deliveryMode}
                onValueChange={(v) => setForm({ ...form, deliveryMode: v })}
                className="mt-1.5 flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Delivery" id="r-del" />
                  <Label htmlFor="r-del">Delivery</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Recojo en tienda" id="r-rec" />
                  <Label htmlFor="r-rec">Recojo en tienda</Label>
                </div>
              </RadioGroup>
            </div>
            {form.deliveryMode === 'Delivery' && (
              <>
                <div>
                  <Label htmlFor="addr">Dirección de entrega *</Label>
                  <Input
                    id="addr"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Av. Example 123, Miraflores"
                  />
                </div>
                <div>
                  <Label htmlFor="ref">Referencia (opcional)</Label>
                  <Textarea
                    id="ref"
                    rows={2}
                    value={form.reference}
                    onChange={(e) => setForm({ ...form, reference: e.target.value })}
                    placeholder="Frente al parque, casa azul..."
                  />
                </div>
              </>
            )}
            <DialogFooter>
              <Button
                onClick={submitDatos}
                className="w-full rounded-full bg-[var(--brand-pink-dark)] text-white hover:bg-[var(--brand-pink-dark)]/90"
              >
                Continuar
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Paso 2: Cupón */}
        {step === 'cupon' && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="cupon">Código de cupón</Label>
              <div className="mt-1 flex gap-2">
                <Input
                  id="cupon"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Ej: BIENVENIDA10"
                  disabled={!!couponCode}
                />
                {couponCode ? (
                  <Button variant="outline" onClick={removeCoupon}>
                    Quitar
                  </Button>
                ) : (
                  <Button onClick={validateCoupon} disabled={validating}>
                    {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
                    Aplicar
                  </Button>
                )}
              </div>
            </div>

            {couponCode ? (
              <div className="flex items-center gap-2 rounded-xl border border-[var(--brand-blue-dark)] bg-[var(--brand-blue-light)]/30 p-3 text-sm">
                <Check className="h-4 w-4 text-[var(--brand-blue-dark)]" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{couponCode} aplicado</p>
                  <p className="text-xs text-muted-foreground">
                    Ahorras S/ {discount.toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-[var(--brand-cream)] p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Cupones de prueba</p>
                <p>· BIENVENIDA10 — 10% sin mínimo</p>
                <p>· VERANO15 — 15% desde S/100</p>
                <p>· ENVIOFREE — S/15 off desde S/80</p>
                <p>· NAVIDAD20 — inactivo (rechazado)</p>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep('datos')} className="rounded-full">
                Volver
              </Button>
              <Button
                onClick={() => setStep('pago')}
                className="flex-1 rounded-full bg-[var(--brand-pink-dark)] text-white hover:bg-[var(--brand-pink-dark)]/90"
              >
                Continuar al pago
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Paso 3: Pago */}
        {step === 'pago' && (
          <div className="space-y-3">
            <div>
              <Label>Método de pago</Label>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <button
                  onClick={() => setPayMethod('yape')}
                  className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition ${
                    payMethod === 'yape'
                      ? 'border-[#7D3494] bg-[#7D3494]/10'
                      : 'border-[var(--brand-pink-dark)]/20 bg-white hover:border-[#7D3494]/50'
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7D3494] text-sm font-extrabold text-white">
                    Y
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Yape</p>
                    <p className="text-xs text-muted-foreground">
                      Escanea el QR · sin comisión · al instante
                    </p>
                  </div>
                  {payMethod === 'yape' && <Check className="h-4 w-4 text-[#7D3494]" />}
                </button>

                <button
                  onClick={() => setPayMethod('whatsapp')}
                  className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition ${
                    payMethod === 'whatsapp'
                      ? 'border-[var(--brand-blue-dark)] bg-[var(--brand-blue-light)]/30'
                      : 'border-[var(--brand-pink-dark)]/20 bg-white hover:border-[var(--brand-blue-dark)]/50'
                  }`}
                >
                  <MessageCircle className="h-6 w-6 text-[var(--brand-blue-dark)]" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Pedido por WhatsApp</p>
                    <p className="text-xs text-muted-foreground">
                      Confirmas y pagas al recibir (efectivo/Yape)
                    </p>
                  </div>
                  {payMethod === 'whatsapp' && <Check className="h-4 w-4 text-[var(--brand-blue-dark)]" />}
                </button>

                <button
                  onClick={() => setPayMethod('card')}
                  className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition ${
                    payMethod === 'card'
                      ? 'border-[var(--brand-pink-dark)] bg-[var(--brand-pink-light)]/30'
                      : 'border-[var(--brand-pink-dark)]/20 bg-white hover:border-[var(--brand-pink-dark)]/50'
                  }`}
                >
                  <CreditCard className="h-6 w-6 text-[var(--brand-pink-dark)]" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Tarjeta (Mercado Pago)</p>
                    <p className="text-xs text-muted-foreground">
                      Checkout Pro · tarjetas de prueba · comisión 3.9%
                    </p>
                  </div>
                  {payMethod === 'card' && <Check className="h-4 w-4 text-[var(--brand-pink-dark)]" />}
                </button>
              </div>
            </div>

            {payMethod === 'yape' && (
              <div className="space-y-3 rounded-xl border-2 border-[#7D3494]/30 bg-[#7D3494]/5 p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-[#7D3494] text-xs font-bold text-white">
                    Y
                  </div>
                  <p className="text-sm font-bold text-foreground">Paga con Yape</p>
                  <span className="ml-auto rounded-full bg-[#00D5C0] px-2 py-0.5 text-[10px] font-bold text-white">
                    Sin comisión
                  </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-3 sm:flex-row">
                  {/* QR Yape */}
                  <div className="shrink-0">
                    <img
                      src="/yape-qr.svg"
                      alt="QR Yape"
                      className="h-auto w-[100px] rounded-lg border-2 border-[#7D3494]/20 sm:w-[120px]"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-foreground">Cómo pagar:</p>
                    <ol className="mt-1 list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
                      <li>Abre la app de Yape en tu celular</li>
                      <li>Escanea el QR con la cámara</li>
                      <li>Confirma el monto: <strong className="text-foreground">S/ {total.toFixed(2)}</strong></li>
                      <li>Toma captura del comprobante</li>
                    </ol>
                    <div className="mt-2 rounded-lg bg-[#7D3494]/10 p-2 text-xs">
                      <p className="font-semibold text-[#7D3494]">Yape a: {BUSINESS.yapeName}</p>
                      <p className="text-muted-foreground">📞 {BUSINESS.yapePhone}</p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Al continuar, simulamos el pago Yape y registramos tu pedido como pagado.
                </p>
              </div>
            )}

            {payMethod === 'card' && (
              <div className="space-y-2 rounded-xl border border-[var(--brand-pink-dark)]/20 bg-[var(--brand-cream)] p-3">
                <p className="text-xs font-semibold text-foreground">
                  Tarjeta de prueba (Mercado Pago sandbox):
                </p>
                <p className="text-xs text-muted-foreground">
                  Visa: 4509 9535 6623 3704 · CVV 123 · Vto 11/30
                </p>
                <Input
                  placeholder="Número de tarjeta"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />
                <Input
                  placeholder="Nombre en la tarjeta"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Vencimiento MM/AA"
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: e.target.value })}
                  />
                  <Input
                    placeholder="CVV"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Comisión {BUSINESS.paymentProvider}: S/{(total * BUSINESS.paymentCommissionRate).toFixed(2)} ·
                  Recibes: S/{(total - total * BUSINESS.paymentCommissionRate).toFixed(2)}
                </p>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep('cupon')} className="rounded-full">
                Volver
              </Button>
              <Button
                onClick={submitPago}
                className={`flex-1 rounded-full text-white hover:opacity-90 ${
                  payMethod === 'yape'
                    ? 'bg-[#7D3494]'
                    : 'bg-[var(--brand-pink-dark)]'
                }`}
              >
                {payMethod === 'card' && (
                  <>
                    <CreditCard className="mr-1 h-4 w-4" /> Pagar S/ {total.toFixed(2)}
                  </>
                )}
                {payMethod === 'yape' && (
                  <>
                    <span className="mr-1">Yapear</span> S/ {total.toFixed(2)}
                  </>
                )}
                {payMethod === 'whatsapp' && (
                  <>
                    <MessageCircle className="mr-1 h-4 w-4" /> Confirmar pedido
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Procesando */}
        {step === 'procesando' && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <Loader2 className="h-10 w-10 animate-spin text-[var(--brand-pink-dark)]" />
            <p className="font-semibold text-foreground">Procesando tu pago...</p>
            <p className="text-sm text-muted-foreground">Conectando con {BUSINESS.paymentProvider}</p>
          </div>
        )}

        {/* Éxito pago tarjeta */}
        {step === 'exito' && paymentResult && (
          <div className="space-y-3">
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-blue-dark)]">
                <Check className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-extrabold text-foreground">¡Pago aprobado!</p>
              <Badge className="bg-[var(--brand-pink-light)] text-[var(--brand-text)]">
                Pedido {orderCode}
              </Badge>
            </div>

            <div className="rounded-xl border border-[var(--brand-pink-dark)]/20 bg-[var(--brand-cream)] p-3 text-sm">
              <Row label="Método" value={
                payMethod === 'yape' ? 'Yape 📱' :
                payMethod === 'card' ? 'Tarjeta (Mercado Pago)' : 'WhatsApp'
              } />
              <Row label="Estado" value={paymentResult.status === 'approved' ? 'Aprobado ✓' : 'Rechazado'} />
              <Row label="ID transacción" value={paymentResult.txId || '-'} mono />
              <Row label="Monto pagado" value={`S/ ${total.toFixed(2)}`} />
              <Row
                label="Comisión"
                value={payMethod === 'yape' ? 'S/ 0.00 (sin comisión)' : `-S/ ${paymentResult.commission?.toFixed(2)}`}
              />
              <Row
                label="Recibes en cuenta"
                value={`S/ ${paymentResult.net?.toFixed(2)}`}
                highlight
              />
            </div>

            <Button onClick={finalizar} className="w-full rounded-full bg-[var(--brand-pink-dark)] text-white">
              ¡Listo!
            </Button>
          </div>
        )}

        {/* Confirmar por WhatsApp */}
        {step === 'whatsapp' && (
          <div className="space-y-3">
            <div className="flex flex-col items-center gap-2 py-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-blue-dark)]">
                <Check className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-extrabold text-foreground">¡Pedido registrado!</p>
              <Badge className="bg-[var(--brand-pink-light)] text-[var(--brand-text)]">
                Código: {orderCode}
              </Badge>
              <p className="px-4 text-sm text-muted-foreground">
                Tu pedido quedó en estado &ldquo;Nuevo&rdquo;. Ahora envíalo por WhatsApp para
                coordinar la entrega y el pago.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--brand-blue-dark)]/30 bg-[var(--brand-blue-light)]/20 p-3">
              <p className="text-xs font-semibold text-foreground">Mensaje que se enviará:</p>
              <pre className="mt-1 max-h-32 overflow-y-auto whitespace-pre-wrap break-words text-xs text-foreground/80">
                {decodeURIComponent(buildWhatsappMessage())}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-7 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(decodeURIComponent(buildWhatsappMessage()))
                  toast.success('Mensaje copiado')
                }}
              >
                <Copy className="mr-1 h-3 w-3" /> Copiar
              </Button>
            </div>

            <DialogFooter className="gap-2">
              <Button
                onClick={openWhatsApp}
                className="flex-1 rounded-full bg-[var(--brand-blue-dark)] text-white hover:opacity-90"
              >
                <MessageCircle className="mr-1 h-4 w-4" /> Abrir WhatsApp
              </Button>
              <Button onClick={finalizar} className="rounded-full bg-[var(--brand-pink-dark)] text-white">
                ¡Listo!
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Row({
  label,
  value,
  mono,
  highlight,
}: {
  label: string
  value: string
  mono?: boolean
  highlight?: boolean
}) {
  return (
    <div className="flex justify-between py-0.5">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`font-semibold ${mono ? 'font-mono text-xs' : ''} ${
          highlight ? 'text-[var(--brand-blue-dark)]' : 'text-foreground'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
