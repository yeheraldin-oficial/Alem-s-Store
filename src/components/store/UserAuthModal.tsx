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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { User as UserIcon, Mail, Phone, Lock, UserPlus, LogIn, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUser } from '@/lib/user-context'
import { BUSINESS } from '@/lib/business'
import { toast } from 'sonner'

interface UserAuthModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  onAdminLogin: () => void
}

export function UserAuthModal({ open, onOpenChange, onAdminLogin }: UserAuthModalProps) {
  const { login } = useUser()
  const [tab, setTab] = useState<'login' | 'register'>('login')

  // Form login
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  // Form registro
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleLogin = () => {
    // Validaciones
    if (!loginForm.email.trim()) {
      toast.error('Falta tu email', {
        description: 'Ingresa tu correo para continuar',
      })
      return
    }
    if (!loginForm.password.trim()) {
      toast.error('Falta tu contraseña', {
        description: 'Ingresa tu contraseña para continuar',
      })
      return
    }
    // Validar formato email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      toast.error('Email inválido', {
        description: 'Revisa el formato de tu correo',
      })
      return
    }

    // Detectar si son credenciales admin
    if (
      loginForm.email === 'admin@alemsstore.pe' ||
      loginForm.email === 'admin'
    ) {
      if (loginForm.password === 'admin123') {
        toast.success('Acceso de administrador', {
          description: 'Redirigiendo a la intranet...',
        })
        onOpenChange(false)
        // Limpiar form
        setLoginForm({ email: '', password: '' })
        // Abrir intranet después de un breve delay
        setTimeout(() => {
          onAdminLogin()
        }, 600)
        return
      } else {
        toast.error('Contraseña de admin incorrecta', {
          description: 'La contraseña no coincide con el usuario administrador',
        })
        return
      }
    }

    // Login de usuario normal - simular éxito
    // Extraer nombre del email
    const name = loginForm.email
      .split('@')[0]
      .split(/[._-]/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')

    login({
      name,
      email: loginForm.email,
    })

    toast.success(`¡Bienvenido(a), ${name}!`, {
      description: 'Has iniciado sesión correctamente',
    })

    onOpenChange(false)
    setLoginForm({ email: '', password: '' })
  }

  const handleRegister = () => {
    // Validaciones campo por campo con alertas claras
    if (!registerForm.name.trim()) {
      toast.error('Falta tu nombre', {
        description: 'Ingresa tu nombre completo para crear la cuenta',
      })
      return
    }
    if (registerForm.name.trim().length < 3) {
      toast.error('Nombre muy corto', {
        description: 'Tu nombre debe tener al menos 3 caracteres',
      })
      return
    }
    if (!registerForm.email.trim()) {
      toast.error('Falta tu email', {
        description: 'Ingresa tu correo electrónico',
      })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      toast.error('Email inválido', {
        description: 'Revisa el formato: ejemplo@correo.com',
      })
      return
    }
    if (!registerForm.phone.trim()) {
      toast.error('Falta tu teléfono', {
        description: 'Ingresa tu WhatsApp o teléfono',
      })
      return
    }
    if (registerForm.phone.replace(/\D/g, '').length < 6) {
      toast.error('Teléfono inválido', {
        description: 'Revisa el número de teléfono ingresado',
      })
      return
    }
    if (!registerForm.password.trim()) {
      toast.error('Falta tu contraseña', {
        description: 'Crea una contraseña para tu cuenta',
      })
      return
    }
    if (registerForm.password.length < 4) {
      toast.error('Contraseña muy corta', {
        description: 'Usa al menos 4 caracteres',
      })
      return
    }

    // Registrar y logear
    login({
      name: registerForm.name.trim(),
      email: registerForm.email.trim(),
      phone: registerForm.phone.trim(),
    })

    toast.success(`¡Cuenta creada! Bienvenido(a), ${registerForm.name.trim()}`, {
      description: 'Tu cuenta fue creada y ya estás logueado(a)',
    })

    onOpenChange(false)
    setRegisterForm({ name: '', email: '', phone: '', password: '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--brand-pink)]">
            <UserIcon className="h-5 w-5" />
            Mi cuenta
          </DialogTitle>
          <DialogDescription>
            Inicia sesión o crea tu cuenta para llevar un seguimiento de tus pedidos
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2 bg-[var(--brand-pink-pale)]">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-[var(--brand-pink)] data-[state=active]:text-white"
            >
              <LogIn className="mr-1 h-4 w-4" />
              Iniciar sesión
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-[var(--brand-blue)] data-[state=active]:text-white"
            >
              <UserPlus className="mr-1 h-4 w-4" />
              Crear cuenta
            </TabsTrigger>
          </TabsList>

          {/* LOGIN */}
          <TabsContent value="login" className="space-y-3">
            <div>
              <Label htmlFor="login-email">
                Email <span className="text-[var(--brand-pink)]">*</span>
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  className="pl-10"
                  placeholder="tu@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="login-pass">
                Contraseña <span className="text-[var(--brand-pink)]">*</span>
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-pass"
                  type="password"
                  className="pl-10"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                onClick={handleLogin}
                className="w-full rounded-full bg-[var(--brand-pink)] py-2.5 text-white hover:opacity-90"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Button>
            </DialogFooter>

            {/* Credenciales demo */}
            <div className="rounded-xl bg-[var(--brand-blue-pale)]/40 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-1 font-semibold text-foreground">
                <ShieldCheck className="h-3 w-3 text-[var(--brand-blue-dark)]" />
                Acceso de administrador
              </p>
              <p className="mt-1">
                Si eres admin, ingresa: <code className="font-mono">admin@alemsstore.pe</code> /{' '}
                <code className="font-mono">admin123</code>
              </p>
            </div>
          </TabsContent>

          {/* REGISTRO */}
          <TabsContent value="register" className="space-y-3">
            <div>
              <Label htmlFor="reg-name">
                Nombre completo <span className="text-[var(--brand-pink)]">*</span>
              </Label>
              <div className="relative mt-1">
                <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="reg-name"
                  className="pl-10"
                  placeholder="Ej: María González"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reg-email">
                Email <span className="text-[var(--brand-pink)]">*</span>
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="reg-email"
                  type="email"
                  className="pl-10"
                  placeholder="tu@email.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reg-phone">
                WhatsApp / teléfono <span className="text-[var(--brand-pink)]">*</span>
              </Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="reg-phone"
                  className="pl-10"
                  placeholder="987 390 211"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reg-pass">
                Contraseña <span className="text-[var(--brand-pink)]">*</span>
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="reg-pass"
                  type="password"
                  className="pl-10"
                  placeholder="Mínimo 4 caracteres"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                onClick={handleRegister}
                className="w-full rounded-full bg-[var(--brand-blue)] py-2.5 text-white hover:opacity-90"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Crear mi cuenta
              </Button>
            </DialogFooter>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-[var(--brand-pink-pale)]/40 p-3 text-xs text-muted-foreground"
            >
              <p className="flex items-center gap-1 font-semibold text-foreground">
                <Sparkles className="h-3 w-3 text-[var(--brand-pink)]" />
                Beneficios de tu cuenta
              </p>
              <p className="mt-1">
                · Guarda tus datos para pedidos más rápidos · Historial de tus pedidos ·
                Ofertas exclusivas
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
