// Configuración central del negocio "Alem's Store" (Parte 1 del reto)
export const BUSINESS = {
  name: "Alem's Store",
  slogan: 'Ropa que crece contigo',
  whatWeSell:
    'Ropa infantil de algodón orgánico e hipoalergénico para bebés y niños de 0 a 6 años',
  categories: ['Bebés', 'Niñas', 'Niños', 'Accesorios', 'Verano', 'Invierno'],
  style: ['Suave', 'Fresco', 'Soñador'],
  whatsapp: '51987390211', // formato internacional sin + ni espacios
  whatsappDisplay: '+51 987 390 211',
  // Métodos de pago peruanos
  yapePhone: '987 390 211',
  yapeName: 'Alem Store',
  plinPhone: '987 390 211',
  plinName: 'Alem Store',
  bcpAccount: '194-1234567890-0-12',
  bcpCCI: '00219400123456789012',
  // Distritos de Lima con delivery
  deliveryDistricts: [
    'Miraflores', 'San Isidro', 'Barranco', 'Surco', 'San Borja',
    'La Molina', 'Jesús María', 'Lince', 'Magdalena', 'Pueblo Libre',
    'Surquillo', 'Chorrillos', 'Monterrico', 'Santiago de Surco'
  ],
  deliveryModes: ['Delivery', 'Recojo en tienda'],
  city: 'Lima, Perú',
  // Propuesta de valor
  valueProposition:
    'Ayudo a padres y madres con hijos de 0 a 6 años a vestir a sus pequeños con ropa cómoda, segura y adorable gracias a mi algodón orgánico certificado, tintes hipoalergénicos y costura reforzada pensada para la piel sensible del bebé.',
  // Cliente ideal
  idealClient: {
    who: 'Padres y madres de 25 a 40 años, clase media, con hijos de 0 a 6 años',
    where: 'Lima Metropolitana y provincias del Perú con compras online',
    interests:
      'Crianza respetuosa, productos eco-friendly, calidad sobre cantidad, redes de maternidad',
    needs:
      'Ropa suave que no irrite la piel sensible del bebé, fácil de lavar, duradera y con diseños tiernos que no sea genérica de retail',
  },
  // Catálogo sync (simula la hoja de Google Sheets publicada)
  catalogSheetUrl: 'https://docs.google.com/spreadsheets/d/e/alems-store-catalogo/pub?output=csv',
  // Tienda publicada (Parte 5)
  storeUrl: 'https://alems-store.vercel.app',
  repoUrl: 'https://github.com/alems-store/tienda',
  // Intranet (Parte 7)
  intranetUrl: 'https://alems-store.vercel.app/admin',
  adminUser: 'admin',
  adminPassword: 'admin123', // solo demo académica
  // Pasarela (Parte 6)
  paymentProvider: 'Mercado Pago',
  paymentCommissionRate: 0.039, // 3.9%
  paymentCheckoutType: 'Checkout Pro (redirección)',
  // Yape - sin comisión para pequeños negocios
  yapeEnabled: true,
  yapeCommissionRate: 0, // Yape no cobra comisión al comerciante
}

export const CATEGORIES = BUSINESS.categories

// Paleta (Parte 2) - Colores oficiales de marca: #70d6ff + #ff70a6
export const PALETTE = {
  primary: '#ff70a6', // rosa oficial
  primaryDark: '#e85d8f', // rosa más oscuro (hover)
  primaryLight: '#ffb3cd', // rosa claro
  primaryPale: '#ffe0eb', // rosa muy pálido
  secondary: '#70d6ff', // celeste oficial
  secondaryDark: '#4ec5ff', // celeste más oscuro
  secondaryLight: '#b3e8ff', // celeste claro
  secondaryPale: '#e0f4ff', // celeste muy pálido
  background: '#F8FCFF', // blanco con tint celeste
  accent: '#FFE5B4', // amarillo vainilla
  text: '#2D3748', // slate oscuro
  gradient: 'linear-gradient(135deg, #ff70a6 0%, #70d6ff 100%)',
}

// Tipografía (Parte 2)
export const TYPOGRAPHY = {
  titles: 'Geist Sans (sans-serif moderna y redondeada)',
  body: 'Geist Sans / system-ui',
}
