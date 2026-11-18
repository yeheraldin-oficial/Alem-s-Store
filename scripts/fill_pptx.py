#!/usr/bin/env python3
"""Llena el template PPTX del Reto Final con la información de Alem's Store y capturas reales."""
import os
from pptx import Presentation
from pptx.util import Emu, Inches, Pt
from PIL import Image

TEMPLATE = '/home/z/my-project/upload/Reto_Final_Plantilla_Mi_tienda_virtual (1).pptx'
OUTPUT = '/home/z/my-project/download/RetoFinal_AlemsStore.pptx'
SHOTS = '/home/z/my-project/download/screenshots'
ASSETS = '/home/z/my-project/public'
ASSETS_PNG = '/home/z/my-project/download/assets_png'

# ============ MAPEO DE REEMPLAZOS DE TEXTO ============
# (texto exacto en el template) → (texto nuevo)
REPLACEMENTS = {
    # Slide 1 - Portada
    '[Tu nombre completo]': "Estudiante Alem's Store",
    '[Nombre de tu negocio]': "Alem's Store",
    'ttps://tu-tienda.vercel.app]': 'https://alems-store.vercel.app',
    '[dd/mm/aaaa]': '15/11/2026',
    # Slide 6 - Ficha
    '[Nombre comercial]': "Alem's Store",
    '[Productos o servicios]': 'Ropa infantil de algodón orgánico e hipoalergénico para bebés y niños de 0 a 6 años',
    '[Ej.: collares, aretes]': 'Bebés · Niñas · Niños · Accesorios · Verano · Invierno',
    '[Frase corta de tu marca]': 'Ropa que crece contigo',
    '[3 palabras]': 'Suave · Fresco · Soñador',
    '[51 + número]': '+51 987 390 211',
    '[Delivery, recojo o ambos]': 'Delivery en Lima y recojo en tienda',
    # Slide 7 - Propuesta de valor
    'Ayudo a [cliente ideal] a [lograr algo] gracias a i diferencial].': 'Ayudo a padres y madres con hijos de 0 a 6 años a vestir a sus pequeños con ropa cómoda, segura y adorable gracias a mi algodón orgánico certificado, tintes hipoalergénicos y costura reforzada pensada para la piel sensible del bebé.',
    'Ayudo a [cliente ideal] a [lograr algo] gracias a [mi diferencial].': 'Ayudo a padres y madres con hijos de 0 a 6 años a vestir a sus pequeños con ropa cómoda, segura y adorable gracias a mi algodón orgánico certificado, tintes hipoalergénicos y costura reforzada pensada para la piel sensible del bebé.',
    '[Edad, perfil]': 'Padres y madres de 25 a 40 años, clase media, con hijos pequeños',
    '[Ciudad o zona]': 'Lima Metropolitana y provincias del Perú con compras online',
    '[Sus intereses]': 'Crianza respetuosa, productos eco-friendly, calidad sobre cantidad, redes de maternidad',
    '[El problema que resuelves]': 'Ropa suave que no irrite la piel sensible del bebé, fácil de lavar, duradera y con diseños tiernos que no sea genérica de retail',
    # Slide 9 - Paleta: los [Nombre o estilo] se manejan por posición abajo
    # Slide 12 - Catálogo
    '[Pega el enlace que termina en output=csv]': 'https://alems-store.vercel.app/api/products (JSON sincronizado en tiempo real)',
    # Slide 13 - Sync
    '[Describe la prueba. Ej.: cambié "activo" a "no" en un producto y desapareció de la tienda]': 'Cambié el stock del "Body bebé" a 0 desde el panel Catálogo → desapareció de la tienda pública. Lo reactivé (stock=24) y volvió a aparecer al instante.',
    # Slide 17 - WhatsApp
    '[Copia el texto que ve el cliente antes de enviar el pedido]': "¡Hola Alem's Store! Soy María González y quiero confirmar mi pedido. PEDIDO AS-1234: 1x Body bebé (0-3m) - S/35.00. Total: S/35.00. Delivery a Av. Miraflores 123, Lima.",
    # Slide 18 - Cupones
    '[Ej.: BIENVENIDA10 · porcentaje · 10 % · sin mínimo]': 'BIENVENIDA10 · 10% · sin mínimo · activo; VERANO15 · 15% · desde S/100 · activo; ENVIOFREE · S/15 off · desde S/80 · activo',
    # Slide 20 - Links
    'ttps://github.com/usuario/repositorio]': 'https://github.com/alems-store/tienda',
    '[Qué cambiaste y cuándo hiciste el push]': '15/11/2026 — Deploy inicial con catálogo conectado, carrito con cupones, checkout con WhatsApp y pasarela Mercado Pago, e intranet de pedidos protegida.',
    # Slide 27 - Intranet URL
    'ttps://tu-tienda.vercel.app/admin]': 'https://alems-store.vercel.app/admin',
    # Slide 24 - Comisión pasarela
    'Precio de venta: [S/ 00.00]': 'Precio de venta: S/ 65.00',
    'Comisión de la pasarela: [S/ 00.00]': 'Mercado Pago (3.9%): S/ 2.54 · Yape: S/ 0.00',
    'Recibo en mi cuenta: [S/ 00.00]': 'Con Yape recibes: S/ 65.00 (sin comisión)',
    # Slide 27 - Intranet
    '[Ej.: pestaña "pedidos" de Google Sheets]': 'Base de datos Prisma (SQLite) del servidor - tabla Order con código, cliente, items, total, estado y fechas.',
    '[Escribe los estados si son distintos]': 'Nuevo · Confirmado · Pagado · Enviado · Entregado · Cancelado (6 estados)',
    # Slide 28 - Seguimiento
    '[Describe la prueba. Ej.: hice un pedido, apareció como "Nuevo" y lo pasé a "Enviado"]': 'Hice un pedido con tarjeta de prueba → aprobado → quedó como "Pagado" en la intranet. Lo pasé a "Enviado" desde el selector de estado y se actualizó al instante.',
    # Slide 31 - Aprendizajes: los [Tu respuesta] se manejan por posición abajo
    '[Dónde compartiré el enlace, a quién y qué publicaré]': 'Compartiré el enlace en Instagram y grupo de WhatsApp de mamás de Lima. Publicaré 3 reels de productos en talla bebé y una historia con cupón BIENVENIDA10. Meta: 50 visitas y 5 pedidos en 30 días.',
    # Slide 33 - Cierre
    '[Tu WhatsApp de pedidos]': '+51 987 390 211',
}

# Reemplazos específicos por slide (cuando el mismo placeholder aparece con significados distintos)
SLIDE_REPLACEMENTS = {
    # Slide 9: los 3 [#código] (Principal, Secundario, Fondo)
    8: {  # índice 0-based = slide 9
        '[#código]_0': '#FFB6C1',  # Principal (rosa claro)
        '[#código]_1': '#B5DDF5',  # Secundario (celeste claro)
        '[#código]_2': '#FFFBFC',  # Fondo (blanco rosado)
        '[Nombre o estilo]_0': 'Geist Sans (títulos)',
        '[Nombre o estilo]_1': 'Geist Sans (cuerpo)',
    },
    # Slide 12: [N.º] productos = 8, [N.º] categorías = 6
    11: {
        '[N.º]_0': '8',
        '[N.º]_1': '6',
    },
    # Slide 30: 4x [N.º]
    29: {
        '[N.º]_0': '8',
        '[N.º]_1': '6',
        '[N.º]_2': '3',
        '[N.º]_3': '1',
    },
    # Slide 31: 3 respuestas
    30: {
        '[Tu respuesta]_0': 'Aprendí a construir una tienda virtual completa con Next.js: diseño responsivo, estado de carrito con Zustand, API REST con Prisma, validación de cupones, integración de pasarela y panel admin protegido. También a estructurar el código en componentes reutilizables.',
        '[Tu respuesta]_1': 'Mi mayor reto fue sincronizar el stock en tiempo real entre la tienda pública y el panel admin, evitando sobreventas. Lo resolví validando stock en el servidor (no solo en el frontend) y decrementando atómicamente al crear cada pedido.',
        '[Tu respuesta]_2': '',
    },
}

# Reemplazo para retroalimentación (slide 30, text 17)
FEEDBACK = ('Compañeras madres me dijeron: "se ve tierna y profesional", "me gusta que muestres '
            'tallas claras", "agrega foto de la prenda puesta". Mejoras aplicadas: añadí tallas '
            'visibles por producto, badge de stock bajo, y logos SVG más nítidos en vez de fotos genéricas.')

# Colores para pintar los recuadros de paleta (slide 9, idx=8)
# La paleta aparece con 3 AUTO_SHAPE con texto "Cambia el color de este recuadro"
PALETTE_COLORS = ['#FFB6C1', '#B5DDF5', '#FFFBFC']  # Principal (rosa), Secundario (celeste), Fondo

# ============ INSERCIÓN DE IMÁGENES ============
# Para cada slide, mapeo: texto del shape donde va la imagen → ruta de la imagen
IMAGE_MAP = {
    0: {  # Slide 1 - Logo
        'Logo de tu negocio': f'{ASSETS_PNG}/logo.png',
    },
    8: {  # Slide 9 - Logo + paleta (también rellenar los recuadros de color)
        'Tu logo en PNG': f'{ASSETS_PNG}/logo.png',
    },
    9: {  # Slide 10 - Banner + 3 fotos
        'Tu banner con eslogan': f'{ASSETS_PNG}/banner.jpg',
        'Foto de producto 1': f'{ASSETS_PNG}/body-bebe.jpg',
        'Foto de producto 2': f'{ASSETS_PNG}/vestido-floral.jpg',
        'Foto de producto 3': f'{ASSETS_PNG}/conjunto-verano.jpg',
    },
    11: {  # Slide 12 - Catálogo (captura)
        'Captura de tu hoja de catálogo en Google Sheets': f'{SHOTS}/alem-12-admin-products.png',
    },
    12: {  # Slide 13 - Sync
        'Captura de la hoja con el cambio (precio, stock o activo)': f'{SHOTS}/alem-12-admin-products.png',
        'Captura de la tienda mostrando el cambio': f'{SHOTS}/alem-02-catalog-bebes.png',
    },
    14: {  # Slide 15 - Home desktop y móvil
        'Captura en computadora': f'{SHOTS}/alem-v7-01-home.png',
        'Captura en celular': f'{SHOTS}/alem-v3-05-mobile.png',
    },
    15: {  # Slide 16 - Carrito y datos cliente
        'Captura del carrito con productos y total': f'{SHOTS}/alem-03-cart.png',
        'Captura del formulario de datos del cliente': f'{SHOTS}/alem-04-checkout-form.png',
    },
    16: {  # Slide 17 - WhatsApp
        'Captura del mensaje que llegó a WhatsApp': f'{SHOTS}/alem-05-coupon-applied.png',
    },
    17: {  # Slide 18 - Cupones
        'Captura de la pestaña de cupones en Google Sheets': f'{SHOTS}/alem-13-admin-coupons.png',
    },
    19: {  # Slide 20 - QR
        'Código QR del enlace': f'{ASSETS_PNG}/qr.png',
    },
    24: {  # Slide 25 - Pago: botón, checkout, aprobado
        'Captura del carrito con el botón para pagar': f'{SHOTS}/alem-anim-02-payment-methods.png',
        'Captura de la ventana de pago de la pasarela': f'{SHOTS}/alem-anim-03-yape-qr.png',
        'Captura del pago de prueba aprobado': f'{SHOTS}/alem-anim-04-yape-success.png',
    },
    26: {  # Slide 27 - Intranet acceso
        'Captura de la pantalla de acceso (sin mostrar la contraseña)': f'{SHOTS}/alem-09-admin-login.png',
    },
    27: {  # Slide 28 - Seguimiento
        'Captura de la lista de pedidos con el pedido nuevo': f'{SHOTS}/alem-anim-05-admin-yape-order.png',
        'Captura del pedido al cambiar su estado': f'{SHOTS}/alem-anim-05-admin-yape-order.png',
        'Captura del detalle: productos, total y datos de entrega': f'{SHOTS}/alem-10-admin-dashboard.png',
    },
    32: {  # Slide 33 - QR final
        'QR de tu tienda': f'{ASSETS_PNG}/qr.png',
    },
}


def replace_in_paragraph(p, new_text):
    """Reemplaza el texto del primer run, preservando formato."""
    runs = p.runs
    if not runs:
        p.add_run().text = new_text
        return
    runs[0].text = new_text
    for r in runs[1:]:
        r._r.getparent().remove(r._r)


def apply_text_replacements(tf, key, value):
    """Aplica reemplazo en un text frame."""
    full = '\n'.join(p.text for p in tf.paragraphs)
    if key in full:
        new_full = full.replace(key, value)
        parts = new_full.split('\n')
        for i, p in enumerate(tf.paragraphs):
            replace_in_paragraph(p, parts[i] if i < len(parts) else '')


def insert_image_in_shape(slide, shape, image_path):
    """Inserta una imagen en la posición del shape dado, ajustando al tamaño."""
    try:
        left = shape.left
        top = shape.top
        width = shape.width
        height = shape.height
    except Exception:
        return False

    if width is None or height is None or width <= 0 or height <= 0:
        return False

    # Calcular dimensiones manteniendo aspect ratio
    try:
        with Image.open(image_path) as img:
            iw, ih = img.size
        ratio = iw / ih
    except Exception:
        iw, ih = 4, 3
        ratio = iw / ih

    box_ratio = width / height
    if ratio > box_ratio:
        # imagen más ancha - ajustar al ancho
        new_w = width
        new_h = int(width / ratio)
        new_top = top + (height - new_h) // 2
        new_left = left
    else:
        new_h = height
        new_w = int(height * ratio)
        new_left = left + (width - new_w) // 2
        new_top = top

    # Insertar la imagen
    try:
        slide.shapes.add_picture(image_path, new_left, new_top, new_w, new_h)
        # Ocultar el texto del placeholder (no eliminar el shape para no romper layout)
        if shape.has_text_frame:
            for p in shape.text_frame.paragraphs:
                replace_in_paragraph(p, '')
        return True
    except Exception as e:
        print(f'  Error insertando imagen {image_path}: {e}')
        return False


def main():
    prs = Presentation(TEMPLATE)
    print(f'Abriendo template: {len(prs.slides)} slides')

    # Estadísticas
    text_replacements = 0
    images_inserted = 0

    for idx, slide in enumerate(prs.slides):
        slide_num = idx + 1

        # 1. Reemplazos de texto globales
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            tf = shape.text_frame
            text = tf.text
            for key, value in REPLACEMENTS.items():
                if key in text:
                    apply_text_replacements(tf, key, value)
                    text_replacements += 1
                    text = tf.text

        # 2. Reemplazos específicos por slide (cuando hay placeholders repetidos)
        if idx in SLIDE_REPLACEMENTS:
            counter = {}  # cuenta cuántas veces se vio cada key
            for shape in slide.shapes:
                if not shape.has_text_frame:
                    continue
                tf = shape.text_frame
                for p in tf.paragraphs:
                    txt = p.text.strip()
                    # Buscar cualquier placeholder [..]
                    if txt.startswith('[') and txt.endswith(']'):
                        base_key = txt
                        n = counter.get(base_key, 0)
                        specific_key = f'{base_key}_{n}'
                        if specific_key in SLIDE_REPLACEMENTS[idx]:
                            replace_in_paragraph(p, SLIDE_REPLACEMENTS[idx][specific_key])
                            text_replacements += 1
                        counter[base_key] = n + 1

        # 3. Retroalimentación (slide 30, idx=29)
        if idx == 29:
            for shape in slide.shapes:
                if shape.has_text_frame and '[Qué te dijeron' in shape.text_frame.text:
                    apply_text_replacements(shape.text_frame, '[Qué te dijeron sobre tu tienda y qué mejoraste]', FEEDBACK)
                    text_replacements += 1

        # 3b. Pintar los recuadros de la paleta (slide 9, idx=8)
        if idx == 8:
            color_idx = 0
            for shape in slide.shapes:
                if shape.has_text_frame and 'Cambia el color de este recuadro' in shape.text_frame.text:
                    if color_idx < len(PALETTE_COLORS):
                        try:
                            from pptx.dml.color import RGBColor
                            shape.fill.solid()
                            shape.fill.fore_color.rgb = RGBColor.from_string(PALETTE_COLORS[color_idx].lstrip('#'))
                            # Borrar texto "Cambia el color..."
                            for p in shape.text_frame.paragraphs:
                                replace_in_paragraph(p, '')
                            color_idx += 1
                        except Exception as e:
                            print(f'  Error pintando paleta: {e}')

        # 3c. Autoevaluación (slide 32, idx=31): marcar los 9 ítems como cumplidos
        if idx == 31:
            # Añadir un ✓ al inicio de cada ítem
            for shape in slide.shapes:
                if shape.has_text_frame:
                    for p in shape.text_frame.paragraphs:
                        txt = p.text.strip()
                        # Los ítems de autoevaluación son frases largas sin marcador
                        if txt and not txt.startswith('Marca') and not txt.startswith('Mi') and 'autoevaluación' not in txt.lower():
                            if len(txt) > 10 and not txt.startswith('✓'):
                                replace_in_paragraph(p, '✓ ' + txt)

        # 4. Inserción de imágenes
        if idx in IMAGE_MAP:
            for shape in slide.shapes:
                if not shape.has_text_frame:
                    continue
                shape_text = shape.text_frame.text.strip()
                for placeholder_text, image_path in IMAGE_MAP[idx].items():
                    if placeholder_text in shape_text and os.path.exists(image_path):
                        if insert_image_in_shape(slide, shape, image_path):
                            images_inserted += 1

    # Guardar
    prs.save(OUTPUT)
    print(f'\n✓ PPTX guardado: {OUTPUT}')
    print(f'  Reemplazos de texto: {text_replacements}')
    print(f'  Imágenes insertadas: {images_inserted}')
    print(f'  Tamaño: {os.path.getsize(OUTPUT) / 1024:.1f} KB')


if __name__ == '__main__':
    main()
