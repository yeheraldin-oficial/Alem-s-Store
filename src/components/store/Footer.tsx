'use client'
import Image from 'next/image'
import { BUSINESS } from '@/lib/business'
import { Baby, Instagram, Facebook, Mail, MapPin, Phone, Heart, Truck, ShieldCheck, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/MotionWrapper'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'

export function Footer() {
  const [reclamoOpen, setReclamoOpen] = useState(false)

  return (
    <footer className="mt-auto border-t-4 border-[var(--brand-pink-dark)] bg-[var(--brand-pink-light)]/40">
      <div id="nosotros" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        {/* Sección envíos a Perú */}
        <Reveal>
          <div className="mb-8 rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-pink-light)] text-[var(--brand-pink-dark)]"
                >
                  <Truck className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-foreground">Envíos a todo Lima</h3>
                  <p className="text-sm text-muted-foreground">Delivery en 14 distritos · 1-2 días hábiles</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BUSINESS.deliveryDistricts.slice(0, 8).map((d, i) => (
                  <motion.span
                    key={d}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-full bg-[var(--brand-pink-light)]/50 px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {d}
                  </motion.span>
                ))}
                <span className="rounded-full bg-[var(--brand-blue-light)]/50 px-2.5 py-1 text-xs font-medium text-foreground">
                  +6 más
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Métodos de pago peruanos */}
        <Reveal delay={0.1}>
          <div className="mb-8 rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-blue-light)] text-[var(--brand-blue-dark)]"
                >
                  <ShieldCheck className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-foreground">Pagos seguros y peruanos</h3>
                  <p className="text-sm text-muted-foreground">Yape, Plin, Mercado Pago y BCP</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <PaymentBadge bg="#7D3494" label="Yape" />
                <PaymentBadge bg="#00A0DF" label="Plin" />
                <PaymentBadge bg="#E85D75" label="Mercado Pago" />
                <PaymentBadge bg="#1B4D9C" label="BCP" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <Reveal>
            <Image
              src="/logo-alem-lg.png"
              alt="Alem's Store"
              width={300}
              height={114}
              className="h-14 w-auto"
            />
            <p className="mt-3 text-sm text-foreground/80">
              {BUSINESS.slogan}. Ropa infantil de algodón orgánico, hipoalergénica, hecha con
              amor en {BUSINESS.city}.
            </p>
            <p className="mt-3 text-sm font-semibold text-[var(--brand-pink-dark)]">
              &ldquo;{BUSINESS.style.join(' · ')}&rdquo;
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
              © {new Date().getFullYear()} Alem's Store
            </div>
          </Reveal>

          {/* Contacto */}
          <Reveal delay={0.1}>
            <h3 className="font-bold text-foreground">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--brand-pink-dark)]" />
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {BUSINESS.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--brand-pink-dark)]" />
                <a href="mailto:hola@alemsstore.pe" className="hover:underline">
                  hola@alemsstore.pe
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--brand-pink-dark)]" />
                {BUSINESS.city}
              </li>
            </ul>
            <div className="mt-3 flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-pink-dark)] text-white hover:opacity-90"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-blue-dark)] text-white hover:opacity-90"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90"
                aria-label="WhatsApp"
              >
                <Baby className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.2}>
            <h3 className="font-bold text-foreground">Información</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>· Delivery en Lima: 1-2 días</li>
              <li>· Recojo en tienda: gratis</li>
              <li>· Cambios dentro de 7 días</li>
              <li>· Pago con Yape, Plin, tarjeta o BCP</li>
              <li>· Atención: Lun-Sáb 9am-7pm</li>
            </ul>
            <div className="mt-4 rounded-xl bg-white/80 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Propuesta de valor</p>
              <p className="mt-1">{BUSINESS.valueProposition}</p>
            </div>
          </Reveal>
        </div>

        {/* Libro de Reclamaciones */}
        <Reveal delay={0.15}>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setReclamoOpen(true)}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[var(--brand-pink-dark)]/30 bg-white px-4 py-4 text-foreground shadow-sm transition-all hover:border-[var(--brand-pink-dark)] hover:shadow-md"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-pink-light)] text-[var(--brand-pink-dark)]"
            >
              <BookOpen className="h-5 w-5" />
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">Libro de Reclamaciones</p>
              <p className="text-xs text-muted-foreground">
                Ley N° 29571 · Código de Protección y Defensa del Consumidor
              </p>
            </div>
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <span className="rounded-md bg-[var(--brand-pink-dark)] px-2 py-1 text-xs font-bold text-white">
                00000000
              </span>
              <span className="text-xs text-muted-foreground">→</span>
            </div>
          </motion.button>
        </Reveal>

        <div className="mt-6 border-t border-[var(--brand-pink)]/20 pt-4 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} {BUSINESS.name} · {BUSINESS.slogan} · Hecho con
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <Heart className="h-3 w-3 fill-[var(--brand-pink-dark)] text-[var(--brand-pink-dark)]" />
            </motion.span>
            · Todos los derechos reservados
          </p>
        </div>
      </div>

      <ReclamacionesModal open={reclamoOpen} onOpenChange={setReclamoOpen} />
    </footer>
  )
}

function ReclamacionesModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [tipo, setTipo] = useState<'reclamo' | 'queja'>('reclamo')
  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    email: '',
    direccion: '',
    producto: '',
    monto: '',
    detalle: '',
    pedido: '',
  })

  const handleSubmit = () => {
    if (!form.nombre || !form.dni || !form.detalle) {
      toast.error('Completa los campos obligatorios (*)')
      return
    }
    // Generar número de reclamo
    const numReclamo = `LR-${Date.now().toString().slice(-8)}`
    toast.success(`Reclamo registrado`, {
      description: `Código: ${numReclamo} · Responderemos en 30 días hábiles (Ley 29571)`,
    })
    onOpenChange(false)
    // Reset
    setForm({
      nombre: '',
      dni: '',
      telefono: '',
      email: '',
      direccion: '',
      producto: '',
      monto: '',
      detalle: '',
      pedido: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--brand-pink-dark)]">
            <BookOpen className="h-5 w-5" />
            Libro de Reclamaciones
          </DialogTitle>
          <DialogDescription>
            Ley N° 29571 - Código de Protección y Defensa del Consumidor. Tiempo de respuesta:
            30 días hábiles.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Tipo */}
          <div>
            <Label>Tipo *</Label>
            <RadioGroup
              value={tipo}
              onValueChange={(v) => setTipo(v as 'reclamo' | 'queja')}
              className="mt-2 flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="reclamo" id="r-reclamo" />
                <Label htmlFor="r-reclamo" className="font-normal">
                  Reclamo (disconformidad relacionada al producto/servicio)
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="queja" id="r-queja" />
                <Label htmlFor="r-queja" className="font-normal">
                  Queja (disconformidad sobre atención)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Datos del consumidor */}
          <div className="rounded-xl bg-[var(--brand-pink-light)]/30 p-3">
            <p className="mb-2 text-xs font-bold text-foreground">Datos del consumidor</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <Label htmlFor="rn">Nombre completo *</Label>
                <Input
                  id="rn"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Nombres y apellidos"
                />
              </div>
              <div>
                <Label htmlFor="rd">DNI / CE *</Label>
                <Input
                  id="rd"
                  value={form.dni}
                  onChange={(e) => setForm({ ...form, dni: e.target.value })}
                  placeholder="12345678"
                />
              </div>
              <div>
                <Label htmlFor="rt">Teléfono</Label>
                <Input
                  id="rt"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="987 390 211"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="re">Email</Label>
                <Input
                  id="re"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="ra">Dirección</Label>
                <Input
                  id="ra"
                  value={form.direccion}
                  onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                  placeholder="Av. Example 123, Miraflores"
                />
              </div>
            </div>
          </div>

          {/* Datos del producto/servicio */}
          <div className="rounded-xl bg-[var(--brand-blue-light)]/30 p-3">
            <p className="mb-2 text-xs font-bold text-foreground">Datos del producto / servicio</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <Label htmlFor="rp">Producto o servicio</Label>
                <Input
                  id="rp"
                  value={form.producto}
                  onChange={(e) => setForm({ ...form, producto: e.target.value })}
                  placeholder="Ej: Body bebé orgánico"
                />
              </div>
              <div>
                <Label htmlFor="rm">Monto reclamado (S/)</Label>
                <Input
                  id="rm"
                  type="number"
                  value={form.monto}
                  onChange={(e) => setForm({ ...form, monto: e.target.value })}
                  placeholder="35.00"
                />
              </div>
              <div>
                <Label htmlFor="rpc">N° de pedido</Label>
                <Input
                  id="rpc"
                  value={form.pedido}
                  onChange={(e) => setForm({ ...form, pedido: e.target.value })}
                  placeholder="AS-1234"
                />
              </div>
            </div>
          </div>

          {/* Detalle */}
          <div>
            <Label htmlFor="rde">Detalle del reclamo / queja *</Label>
            <Textarea
              id="rde"
              rows={4}
              value={form.detalle}
              onChange={(e) => setForm({ ...form, detalle: e.target.value })}
              placeholder="Describe qué pasó, fecha del hecho, y qué solución esperas..."
            />
          </div>

          <div className="rounded-xl bg-[var(--brand-pink-light)]/40 p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Información legal</p>
            <p className="mt-1">
              Conforme al D.S. 011-2011-PCM, su reclamo será atendido en un plazo máximo de
              30 días hábiles. Recibirá respuesta al correo o teléfono indicado.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-[var(--brand-pink-dark)] text-white hover:opacity-90"
          >
            <BookOpen className="mr-1 h-4 w-4" />
            Registrar reclamo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function PaymentBadge({ bg, label }: { bg: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -2 }}
      className="rounded-md px-3 py-1.5 text-xs font-bold text-white shadow-sm"
      style={{ backgroundColor: bg }}
    >
      {label}
    </motion.div>
  )
}
