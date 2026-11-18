#!/usr/bin/env python3
"""Genera ilustraciones SVG de productos de ropa infantil para Alem's Store - paleta rosa/celeste."""
import os

OUT = "/home/z/my-project/public/products"
os.makedirs(OUT, exist_ok=True)

# Paleta de marca Alem's Store - rosa y celeste claros
PINK = "#FFB6C1"        # rosa claro principal
PINK_DARK = "#FF8DA1"   # rosa medio
PINK_LIGHT = "#FFD8E0"  # rosa muy claro
BLUE = "#B5DDF5"        # celeste claro principal
BLUE_DARK = "#87CEEB"   # celeste medio
BLUE_LIGHT = "#D9EEFB"  # celeste muy claro
CREAM = "#FFFBFC"       # fondo blanco rosado
YELLOW = "#FFE5B4"      # amarillo vainilla suave (acento)
LAVENDER = "#E5D9F2"    # lavanda suave (acento secundario)
WHITE = "#FFFFFF"
TEXT = "#5A4A6B"        # slate violeta suave
MINT = "#C7E9C9"        # menta suave

def wrap(content, w=400, h=400):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
<rect width="{w}" height="{h}" fill="{CREAM}"/>
{content}
</svg>'''

def smile(cx, cy, r=8):
    return f'''<g>
<circle cx="{cx-r*0.4}" cy="{cy-r*0.2}" r="2" fill="{TEXT}"/>
<circle cx="{cx+r*0.4}" cy="{cy-r*0.2}" r="2" fill="{TEXT}"/>
<path d="M {cx-r*0.4} {cy+r*0.3} Q {cx} {cy+r*0.7} {cx+r*0.4} {cy+r*0.3}" stroke="{TEXT}" stroke-width="2" fill="none" stroke-linecap="round"/>
</g>'''

# 1. Body bebé - rosa
body = f'''
<g transform="translate(200,210)">
<path d="M -70 -90 L 70 -90 L 70 -40 L 90 0 L 80 30 L 60 10 L 60 110 L -60 110 L -60 10 L -80 30 L -90 0 L -70 -40 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-25" y="-30" width="50" height="60" rx="6" fill="{WHITE}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-45" cy="20" r="4" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="45" cy="20" r="4" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="1.5"/>
{smile(0, 0, 12)}
</g>
'''
with open(f"{OUT}/body-bebe.svg", "w") as f:
    f.write(wrap(body))

# 2. Pijama osito - celeste
pijama = f'''
<g transform="translate(200,220)">
<rect x="-70" y="-50" width="140" height="160" rx="20" fill="{BLUE}" stroke="{TEXT}" stroke-width="3"/>
<path d="M -70 -30 L 70 -30" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-30" cy="20" r="8" fill="{PINK}"/>
<circle cx="30" cy="20" r="8" fill="{PINK}"/>
<circle cx="-30" cy="20" r="3" fill="{PINK_LIGHT}"/>
<circle cx="30" cy="20" r="3" fill="{PINK_LIGHT}"/>
<path d="M -20 80 L 20 80 L 25 110 L -25 110 Z" fill="{PINK}"/>
<circle cx="0" cy="-70" r="35" fill="{PINK_LIGHT}" stroke="{TEXT}" stroke-width="3"/>
<circle cx="-12" cy="-78" r="10" fill="{PINK_LIGHT}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="12" cy="-78" r="10" fill="{PINK_LIGHT}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-12" cy="-78" r="5" fill="{PINK}"/>
<circle cx="12" cy="-78" r="5" fill="{PINK}"/>
{smile(0, -68, 14)}
</g>
'''
with open(f"{OUT}/pijama-osito.svg", "w") as f:
    f.write(wrap(pijama))

# 3. Vestido floral - rosa
vestido = f'''
<g transform="translate(200,215)">
<path d="M -40 -90 L 40 -90 L 50 -50 L 30 -40 L 90 110 L -90 110 L -30 -40 L -50 -50 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-35" y="-95" width="70" height="15" rx="4" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-30" cy="20" r="6" fill="{YELLOW}"/>
<circle cx="20" cy="40" r="6" fill="{YELLOW}"/>
<circle cx="-10" cy="70" r="6" fill="{YELLOW}"/>
<circle cx="35" cy="85" r="6" fill="{YELLOW}"/>
<circle cx="-50" cy="90" r="6" fill="{YELLOW}"/>
<circle cx="-30" cy="20" r="2.5" fill="{WHITE}"/>
<circle cx="20" cy="40" r="2.5" fill="{WHITE}"/>
<circle cx="-10" cy="70" r="2.5" fill="{WHITE}"/>
</g>
'''
with open(f"{OUT}/vestido-floral.svg", "w") as f:
    f.write(wrap(vestido))

# 4. Polover - celeste
polover = f'''
<g transform="translate(200,215)">
<path d="M -75 -50 L -55 -80 L -30 -95 L 30 -95 L 55 -80 L 75 -50 L 75 110 L -75 110 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-30" y="-100" width="60" height="20" rx="6" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="2"/>
<line x1="-50" y1="0" x2="50" y2="0" stroke="{TEXT}" stroke-width="1.5" opacity="0.3"/>
<line x1="-50" y1="30" x2="50" y2="30" stroke="{TEXT}" stroke-width="1.5" opacity="0.3"/>
<line x1="-50" y1="60" x2="50" y2="60" stroke="{TEXT}" stroke-width="1.5" opacity="0.3"/>
<circle cx="0" cy="-20" r="6" fill="{PINK}" stroke="{TEXT}" stroke-width="1.5"/>
</g>
'''
with open(f"{OUT}/polover.svg", "w") as f:
    f.write(wrap(polover))

# 5. Pantalón deportivo - rosa medio
pantalon = f'''
<g transform="translate(200,210)">
<path d="M -65 -90 L 65 -90 L 65 -40 L 60 110 L 20 110 L 10 -20 L -10 -20 L -20 110 L -60 110 L -65 -40 Z" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-65" y="-90" width="130" height="20" rx="6" fill="{BLUE}" stroke="{TEXT}" stroke-width="2"/>
<line x1="0" y1="-70" x2="0" y2="-20" stroke="{TEXT}" stroke-width="2"/>
<circle cx="0" cy="-60" r="3" fill="{YELLOW}"/>
<circle cx="0" cy="-45" r="3" fill="{YELLOW}"/>
<rect x="-50" y="50" width="25" height="8" fill="{BLUE}" stroke="{TEXT}" stroke-width="1.5"/>
<rect x="25" y="50" width="25" height="8" fill="{BLUE}" stroke="{TEXT}" stroke-width="1.5"/>
</g>
'''
with open(f"{OUT}/pantalon.svg", "w") as f:
    f.write(wrap(pantalon))

# 6. Conjunto verano - celeste + rosa
conjunto = f'''
<g transform="translate(200,215)">
<path d="M -55 -80 L -30 -90 L 30 -90 L 55 -80 L 60 -50 L 40 -40 L 40 10 L -40 10 L -40 -40 L -60 -50 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="0" cy="-40" r="18" fill="{PINK}"/>
<circle cx="0" cy="-40" r="10" fill="{PINK_LIGHT}"/>
{smile(0, -40, 10)}
<path d="M -40 20 L 40 20 L 45 90 L 15 90 L 10 50 L -10 50 L -15 90 L -45 90 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
</g>
'''
with open(f"{OUT}/conjunto-verano.svg", "w") as f:
    f.write(wrap(conjunto))

# 7. Gorro lana - rosa
gorro = f'''
<g transform="translate(200,210)">
<path d="M -70 30 Q -70 -90 0 -90 Q 70 -90 70 30 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-70" y="20" width="140" height="25" rx="6" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="0" cy="-90" r="14" fill="{BLUE}" stroke="{TEXT}" stroke-width="2"/>
<path d="M -50 -20 L -50 20 M -25 -50 L -25 20 M 0 -65 L 0 20 M 25 -50 L 25 20 M 50 -20 L 50 20" stroke="{PINK_DARK}" stroke-width="3"/>
</g>
'''
with open(f"{OUT}/gorro-lana.svg", "w") as f:
    f.write(wrap(gorro))

# 8. Medias antideslizantes - celeste
medias = f'''
<g transform="translate(200,210)">
<path d="M -50 -80 L 50 -80 L 50 40 Q 50 90 0 90 Q -50 90 -50 40 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<path d="M -50 -80 L 50 -80 L 50 -60 L -50 -60 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="2"/>
<path d="M -50 0 L 50 0" stroke="{PINK}" stroke-width="3"/>
<circle cx="-20" cy="60" r="6" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="20" cy="65" r="6" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="0" cy="55" r="6" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="-20" cy="75" r="6" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="20" cy="80" r="6" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
</g>
'''
with open(f"{OUT}/medias.svg", "w") as f:
    f.write(wrap(medias))

print("OK - 8 SVGs de productos generados en", OUT)

# Logo Alem's Store - corazon rosa + celeste
logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 80" width="220" height="80">
<rect width="220" height="80" rx="14" fill="{CREAM}"/>
<!-- Corazón -->
<g transform="translate(34,40)">
<path d="M 0 -6 C -8 -16 -22 -16 -22 -4 C -22 6 -8 16 0 22 C 8 16 22 6 22 -4 C 22 -16 8 -16 0 -6 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="2.5"/>
<path d="M -8 -4 C -12 -8 -16 -8 -16 -2 C -16 4 -8 8 -2 12" fill="{PINK_LIGHT}" opacity="0.7"/>
<!-- Estrella celeste -->
<path d="M 0 -2 L 2 4 L 8 4 L 3 8 L 5 14 L 0 10 L -5 14 L -3 8 L -8 4 L -2 4 Z" fill="{BLUE_DARK}" transform="translate(0,2) scale(0.5)"/>
</g>
<text x="72" y="34" font-family="Georgia, serif" font-size="20" font-weight="700" fill="{PINK_DARK}">Alem&#39;s</text>
<text x="72" y="56" font-family="Georgia, serif" font-size="20" font-weight="700" fill="{TEXT}">Store</text>
</svg>'''
with open("/home/z/my-project/public/logo.svg", "w") as f:
    f.write(logo)
print("Logo Alem's Store generado")

# Banner - hero moderno con layout split feeling
banner = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480">
<defs>
<linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="{PINK_LIGHT}"/>
<stop offset="0.5" stop-color="{BLUE_LIGHT}"/>
<stop offset="1" stop-color="{LAVENDER}"/>
</linearGradient>
<linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="{WHITE}" stop-opacity="0.9"/>
<stop offset="1" stop-color="{WHITE}" stop-opacity="0.6"/>
</linearGradient>
</defs>
<rect width="1200" height="480" fill="url(#bgGrad)"/>
<!-- Manchas decorativas -->
<circle cx="120" cy="80" r="50" fill="{PINK}" opacity="0.5"/>
<circle cx="1080" cy="400" r="70" fill="{BLUE}" opacity="0.5"/>
<circle cx="1000" cy="100" r="30" fill="{YELLOW}" opacity="0.6"/>
<circle cx="200" cy="420" r="40" fill="{LAVENDER}" opacity="0.6"/>
<!-- Nube decorativa -->
<path d="M 950 60 Q 940 40 960 40 Q 970 30 985 40 Q 1000 30 1005 50 Q 1015 55 1005 65 Q 990 75 970 65 Q 955 75 945 65 Q 935 65 950 60 Z" fill="{WHITE}" opacity="0.8"/>
<!-- Lado izquierdo: texto -->
<text x="80" y="180" font-family="Georgia, serif" font-size="52" font-weight="700" fill="{TEXT}">Ropa que crece</text>
<text x="80" y="240" font-family="Georgia, serif" font-size="52" font-weight="700" fill="{PINK_DARK}">contigo</text>
<text x="80" y="290" font-family="Arial, sans-serif" font-size="20" fill="{TEXT}" opacity="0.8">Algodón orgánico · Hipoalergénico · Hecho con amor</text>
<!-- Botón CTA -->
<rect x="80" y="330" width="240" height="56" rx="28" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="2"/>
<text x="200" y="366" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="{WHITE}" text-anchor="middle">Ver catálogo</text>
<!-- Lado derecho: tarjeta de producto destacado -->
<g transform="translate(820,140)">
<rect x="-110" y="-30" width="220" height="280" rx="20" fill="url(#cardGrad)" stroke="{WHITE}" stroke-width="3"/>
<!-- Body bebé miniatura -->
<g transform="translate(0,90)">
<path d="M -45 -55 L 45 -55 L 45 -25 L 58 0 L 50 20 L 35 8 L 35 75 L -35 75 L -35 8 L -50 20 L -58 0 L -45 -25 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="-16" y="-20" width="32" height="40" rx="4" fill="{WHITE}" stroke="{TEXT}" stroke-width="1.5"/>
{smile(0, -8, 8)}
</g>
<text x="0" y="220" font-family="Georgia, serif" font-size="18" font-weight="700" fill="{TEXT}" text-anchor="middle">Body bebé orgánico</text>
<text x="0" y="240" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="{PINK_DARK}" text-anchor="middle">S/ 35.00</text>
</g>
<!-- Estrellas decorativas -->
<g fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5">
<path d="M 700 80 L 705 95 L 720 95 L 708 105 L 713 120 L 700 110 L 687 120 L 692 105 L 680 95 L 695 95 Z"/>
<path d="M 750 350 L 753 360 L 763 360 L 755 366 L 758 376 L 750 370 L 742 376 L 745 366 L 737 360 L 747 360 Z"/>
</g>
</svg>'''
with open("/home/z/my-project/public/banner.svg", "w") as f:
    f.write(banner)
print("Banner generado")

# QR placeholder (enlace de la tienda)
qr = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
<rect width="200" height="200" fill="{WHITE}" stroke="{TEXT}" stroke-width="3"/>
<g fill="{TEXT}">
<rect x="20" y="20" width="40" height="40"/>
<rect x="140" y="20" width="40" height="40"/>
<rect x="20" y="140" width="40" height="40"/>
<rect x="30" y="30" width="20" height="20" fill="{WHITE}"/>
<rect x="150" y="30" width="20" height="20" fill="{WHITE}"/>
<rect x="30" y="150" width="20" height="20" fill="{WHITE}"/>
<rect x="80" y="20" width="10" height="10"/>
<rect x="100" y="30" width="10" height="10"/>
<rect x="80" y="50" width="20" height="10"/>
<rect x="110" y="60" width="10" height="10"/>
<rect x="80" y="80" width="10" height="10"/>
<rect x="100" y="90" width="20" height="10"/>
<rect x="130" y="80" width="10" height="20"/>
<rect x="150" y="90" width="10" height="10"/>
<rect x="170" y="80" width="10" height="10"/>
<rect x="80" y="110" width="10" height="20"/>
<rect x="100" y="120" width="10" height="10"/>
<rect x="120" y="110" width="20" height="10"/>
<rect x="150" y="120" width="10" height="20"/>
<rect x="170" y="110" width="10" height="10"/>
<rect x="90" y="140" width="10" height="10"/>
<rect x="110" y="150" width="20" height="10"/>
<rect x="140" y="140" width="10" height="10"/>
<rect x="160" y="150" width="10" height="20"/>
<rect x="180" y="140" width="10" height="10"/>
<rect x="80" y="170" width="20" height="10"/>
<rect x="110" y="180" width="10" height="10"/>
<rect x="130" y="170" width="20" height="10"/>
<rect x="160" y="180" width="10" height="10"/>
</g>
</svg>'''
with open("/home/z/my-project/public/qr.svg", "w") as f:
    f.write(qr)
print("QR generado")
