'use client'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash2, Plus, Minus, ShoppingBag, Tag, X, Sparkles } from 'lucide-react'
import { useCart } from '@/lib/store'
import { BUSINESS } from '@/lib/business'
import { toast } from 'sonner'

export function CartDrawer({
  open,
  onOpenChange,
  onCheckout,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onCheckout: () => void
}) {
  const items = useCart((s) => s.items)
  const remove = useCart((s) => s.remove)
  const setQty = useCart((s) => s.setQty)
  const clear = useCart((s) => s.clear)
  const couponCode = useCart((s) => s.couponCode)
  const couponInfo = useCart((s) => s.couponInfo)
  const discount = useCart((s) => s.discount)
  const subtotal = useCart((s) => s.subtotal())
  const total = useCart((s) => s.total())

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col border-l-4 border-[var(--brand-pink-dark)] sm:max-w-md">
        <SheetHeader className="border-b border-[var(--brand-pink)]/20">
          <SheetTitle className="flex items-center gap-2 text-[var(--brand-pink-dark)]">
            <ShoppingBag className="h-5 w-5" />
            Mi carrito ({items.reduce((n, i) => n + i.qty, 0)})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--brand-pink-light)]">
              <ShoppingBag className="h-10 w-10 text-[var(--brand-pink-dark)]" />
            </div>
            <p className="font-semibold text-foreground">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">
              ¡Agrega alguna prenda tierna para tu pequeño!
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="mt-2 rounded-full bg-[var(--brand-pink-dark)] text-white"
            >
              Ver catálogo
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {items.map((it) => (
                <div
                  key={`${it.id}-${it.size}`}
                  className="mb-3 flex gap-3 rounded-xl border border-[var(--brand-pink)]/15 bg-white p-3 shadow-sm"
                >
                  <Image
                    src={it.image}
                    alt={it.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg bg-[var(--brand-pink-light)]/30 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-semibold text-foreground">{it.name}</p>
                      <button
                        onClick={() => remove(it.id, it.size)}
                        className="shrink-0 text-muted-foreground hover:text-[var(--destructive)]"
                        aria-label="Quitar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">Talla: {it.size}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-[var(--brand-pink)]/30 bg-[var(--brand-pink-light)]/20 p-0.5">
                        <button
                          onClick={() => setQty(it.id, it.size, it.qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--brand-pink-dark)] hover:bg-[var(--brand-pink-light)]"
                          aria-label="Restar"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.id, it.size, it.qty + 1)}
                          disabled={it.qty >= it.stock}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--brand-pink-dark)] hover:bg-[var(--brand-pink-light)] disabled:opacity-40"
                          aria-label="Sumar"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[var(--brand-pink-dark)]">
                        S/ {(it.price * it.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {couponInfo && (
                <div className="mb-3 flex items-center gap-2 rounded-xl border border-[var(--brand-blue-dark)] bg-[var(--brand-blue-light)]/40 p-3 text-sm">
                  <Tag className="h-4 w-4 text-[var(--brand-blue-dark)]" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{couponInfo.code}</p>
                    <p className="text-xs text-muted-foreground">{couponInfo.description}</p>
                  </div>
                  <span className="font-bold text-[var(--brand-blue-dark)]">-S/ {discount.toFixed(2)}</span>
                </div>
              )}

              <button
                onClick={() => {
                  clear()
                  toast.info('Carrito vaciado')
                }}
                className="mx-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-[var(--destructive)]"
              >
                <Trash2 className="h-3 w-3" />
                Vaciar carrito
              </button>
            </div>

            <SheetFooter className="border-t border-[var(--brand-pink)]/20">
              <div className="space-y-1.5 py-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[var(--brand-blue-dark)]">
                    <span>Descuento</span>
                    <span>-S/ {discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between text-base font-extrabold">
                  <span>Total</span>
                  <span className="text-[var(--brand-pink-dark)]">S/ {total.toFixed(2)}</span>
                </div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-[var(--brand-pink-light)]" />
                  Envío se coordia por WhatsApp {BUSINESS.whatsappDisplay}
                </p>
              </div>
              <Button
                onClick={onCheckout}
                className="w-full rounded-full bg-[var(--brand-pink)] py-3 text-base font-bold text-white shadow-lg shadow-[var(--brand-pink)]/30 hover:opacity-90"
              >
                Finalizar compra
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
