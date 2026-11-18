'use client'
import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/store/Header'
import { Hero } from '@/components/store/Hero'
import { CategoryFilter } from '@/components/store/CategoryFilter'
import { ProductGrid } from '@/components/store/ProductGrid'
import { Product } from '@/components/store/ProductCard'
import { Footer } from '@/components/store/Footer'
import { CartDrawer } from '@/components/store/CartDrawer'
import { CheckoutModal } from '@/components/checkout/CheckoutModal'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { FloatingContact } from '@/components/store/FloatingContact'
import { DealOfTheDay } from '@/components/store/DealOfTheDay'
import { ShopByCategory } from '@/components/store/ShopByCategory'
import { TrendingPromos } from '@/components/store/TrendingPromos'
import { About } from '@/components/store/About'
import { Testimonials } from '@/components/store/Testimonials'
import { WhyChooseUs } from '@/components/store/WhyChooseUs'
import { Guarantee } from '@/components/store/Guarantee'
import { Blog } from '@/components/store/Blog'
import { UserAuthModal } from '@/components/store/UserAuthModal'
import { UserPanel } from '@/components/store/UserPanel'
import { BUSINESS } from '@/lib/business'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('Todas')
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [adminLoginOpen, setAdminLoginOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [adminAuthed, setAdminAuthed] = useState(false)
  const [userAuthOpen, setUserAuthOpen] = useState(false)
  const [userPanelOpen, setUserPanelOpen] = useState(false)

  const loadProducts = useCallback(async () => {
    const params = new URLSearchParams()
    params.set('active', 'true')
    if (category !== 'Todas') params.set('category', category)
    if (query) params.set('q', query)
    const res = await fetch(`/api/products?${params.toString()}`)
    const data = await res.json()
    return (data.products || []) as Product[]
  }, [category, query])

  // Auto-inicializar la base de datos al cargar (para Vercel)
  useEffect(() => {
    fetch('/api/init', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log('DB init:', data.message)
        }
      })
      .catch(() => {
        // Silencioso - no bloquea la UI
      })
  }, [])

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    loadProducts()
      .then((prods) => {
        if (!cancelled) setProducts(prods)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [loadProducts])

  // Escuchar eventos de selección de categoría desde ShopByCategory y TrendingPromos
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string
      if (detail) setCategory(detail)
    }
    window.addEventListener('selectCategory', handler)
    return () => window.removeEventListener('selectCategory', handler)
  }, [])

  // Cerrar carrito al abrir checkout
  const openCheckout = () => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  const openAdmin = () => {
    if (adminAuthed) setAdminOpen(true)
    else setAdminLoginOpen(true)
  }

  // Login admin directo (cuando se detectan credenciales admin en UserAuthModal)
  const directAdminLogin = () => {
    setAdminAuthed(true)
    setUserAuthOpen(false)
    setAdminOpen(true)
  }

  const handleAdminLoginSuccess = () => {
    setAdminAuthed(true)
    setAdminLoginOpen(false)
    setAdminOpen(true)
  }

  const handleLogout = () => {
    setAdminAuthed(false)
    setAdminOpen(false)
    setAdminLoginOpen(false)
  }

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        onOpenCart={() => setCartOpen(true)}
        onOpenAdmin={openAdmin}
        onSearch={setQuery}
        onOpenUserAuth={() => setUserAuthOpen(true)}
        onOpenUserPanel={() => setUserPanelOpen(true)}
      />

      <main className="flex-1">
        <Hero onVerCatalogo={scrollToCatalog} />

        {/* Deal of the Day con countdown */}
        <DealOfTheDay />

        {/* Catálogo */}
        <section className="py-4">
          <div className="mx-auto mb-3 max-w-6xl px-4 md:px-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
                Nuestro catálogo
              </h2>
              <p className="text-sm text-muted-foreground">
                {products.length} producto(s)
              </p>
            </div>
          </div>
          <CategoryFilter active={category} onChange={setCategory} />
          <div className="mt-4">
            <ProductGrid products={products} loading={loading} query={query} />
          </div>
        </section>

        {/* Sobre Nosotros */}
        <About />

        {/* Shop by Category */}
        <ShopByCategory />

        {/* Por qué elegirnos */}
        <WhyChooseUs />

        {/* Trending Promos */}
        <TrendingPromos />

        {/* Garantía y cambios */}
        <Guarantee />

        {/* Testimonios */}
        <Testimonials />

        {/* Novedades / Blog */}
        <Blog />
      </main>

      <Footer />

      {/* Botón flotante Contáctanos */}
      <FloatingContact />

      {/* Overlays */}
      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={openCheckout}
      />
      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      />
      <UserAuthModal
        open={userAuthOpen}
        onOpenChange={setUserAuthOpen}
        onAdminLogin={directAdminLogin}
      />
      <UserPanel
        open={userPanelOpen}
        onOpenChange={setUserPanelOpen}
      />
      <AdminLogin
        open={adminLoginOpen}
        onOpenChange={setAdminLoginOpen}
        onSuccess={handleAdminLoginSuccess}
      />
      <AdminDashboard
        open={adminOpen}
        onOpenChange={setAdminOpen}
        onLogout={handleLogout}
      />
    </div>
  )
}
