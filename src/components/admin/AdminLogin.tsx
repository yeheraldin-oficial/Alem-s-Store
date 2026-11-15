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
import { ShieldCheck, Loader2, Lock } from 'lucide-react'
import { toast } from 'sonner'

export function AdminLogin({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSuccess: () => void
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!username || !password) {
      toast.error('Escribe usuario y contraseña')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.ok) {
        toast.success(`Bienvenido, ${data.username}`)
        onSuccess()
      } else {
        toast.error(data.error || 'Credenciales incorrectas')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--brand-pink-dark)]">
            <Lock className="h-5 w-5" /> Intranet · Acceso
          </DialogTitle>
          <DialogDescription>
            Panel privado para seguimiento de pedidos y administración.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="u">Usuario</Label>
            <Input
              id="u"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>
          <div>
            <Label htmlFor="p">Contraseña</Label>
            <Input
              id="p"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>
          <div className="rounded-xl bg-[var(--brand-lavender)]/40 p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Credenciales de prueba</p>
            <p>Usuario: <code className="font-mono">admin</code></p>
            <p>Contraseña: <code className="font-mono">admin123</code></p>
            <p className="mt-1">Los pedidos se guardan en la base de datos (no publicada en la web).</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={submit}
            disabled={loading}
            className="w-full rounded-full bg-[var(--brand-pink-dark)] text-white hover:bg-[var(--brand-pink-dark)]/90"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            Ingresar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
