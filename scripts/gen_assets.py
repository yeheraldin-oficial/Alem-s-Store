#!/usr/bin/env python3
"""Genera ilustraciones SVG de productos de ropa infantil para Pequeño Sol."""
import os

OUT = "/home/z/my-project/public/products"
os.makedirs(OUT, exist_ok=True)

# Paleta de marca
CORAL = "#E85D75"
CORAL_LIGHT = "#FFB5C2"
YELLOW = "#FFC93C"
YELLOW_LIGHT = "#FFE082"
GREEN = "#6BCB77"
GREEN_LIGHT = "#B5E8BB"
CREAM = "#FFF8F3"
BROWN = "#8B5E3C"
WHITE = "#FFFFFF"
TEXT = "#5A3E36"

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

# 1. Body bebé
body = f'''
<g transform="translate(200,210)">
<path d="M -70 -90 L 70 -90 L 70 -40 L 90 0 L 80 30 L 60 10 L 60 110 L -60 110 L -60 10 L -80 30 L -90 0 L -70 -40 Z" fill="{CORAL}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-25" y="-30" width="50" height="60" rx="6" fill="{WHITE}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-45" cy="20" r="4" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="45" cy="20" r="4" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
{smile(0, 0, 12)}
</g>
'''
with open(f"{OUT}/body-bebe.svg", "w") as f:
    f.write(wrap(body))

# 2. Pijama osito
pijama = f'''
<g transform="translate(200,220)">
<rect x="-70" y="-50" width="140" height="160" rx="20" fill="{YELLOW}" stroke="{TEXT}" stroke-width="3"/>
<path d="M -70 -30 L 70 -30" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-30" cy="20" r="8" fill="{BROWN}"/>
<circle cx="30" cy="20" r="8" fill="{BROWN}"/>
<circle cx="-30" cy="20" r="3" fill="{YELLOW_LIGHT}"/>
<circle cx="30" cy="20" r="3" fill="{YELLOW_LIGHT}"/>
<path d="M -20 80 L 20 80 L 25 110 L -25 110 Z" fill="{BROWN}"/>
<circle cx="0" cy="-70" r="35" fill="{BROWN}" stroke="{TEXT}" stroke-width="3"/>
<circle cx="-12" cy="-78" r="10" fill="{BROWN}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="12" cy="-78" r="10" fill="{BROWN}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-12" cy="-78" r="5" fill="{CORAL_LIGHT}"/>
<circle cx="12" cy="-78" r="5" fill="{CORAL_LIGHT}"/>
{smile(0, -68, 14)}
</g>
'''
with open(f"{OUT}/pijama-osito.svg", "w") as f:
    f.write(wrap(pijama))

# 3. Vestido floral
vestido = f'''
<g transform="translate(200,215)">
<path d="M -40 -90 L 40 -90 L 50 -50 L 30 -40 L 90 110 L -90 110 L -30 -40 L -50 -50 Z" fill="{CORAL}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-35" y="-95" width="70" height="15" rx="4" fill="{CORAL_LIGHT}" stroke="{TEXT}" stroke-width="2"/>
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

# 4. Polover
polover = f'''
<g transform="translate(200,215)">
<path d="M -75 -50 L -55 -80 L -30 -95 L 30 -95 L 55 -80 L 75 -50 L 75 110 L -75 110 Z" fill="{GREEN}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-30" y="-100" width="60" height="20" rx="6" fill="{GREEN_LIGHT}" stroke="{TEXT}" stroke-width="2"/>
<line x1="-50" y1="0" x2="50" y2="0" stroke="{TEXT}" stroke-width="1.5" opacity="0.3"/>
<line x1="-50" y1="30" x2="50" y2="30" stroke="{TEXT}" stroke-width="1.5" opacity="0.3"/>
<line x1="-50" y1="60" x2="50" y2="60" stroke="{TEXT}" stroke-width="1.5" opacity="0.3"/>
</g>
'''
with open(f"{OUT}/polover.svg", "w") as f:
    f.write(wrap(polover))

# 5. Pantalón
pantalon = f'''
<g transform="translate(200,210)">
<path d="M -65 -90 L 65 -90 L 65 -40 L 60 110 L 20 110 L 10 -20 L -10 -20 L -20 110 L -60 110 L -65 -40 Z" fill="{BROWN}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-65" y="-90" width="130" height="20" rx="6" fill="{CORAL}" stroke="{TEXT}" stroke-width="2"/>
<line x1="0" y1="-70" x2="0" y2="-20" stroke="{TEXT}" stroke-width="2"/>
<circle cx="0" cy="-60" r="3" fill="{YELLOW}"/>
<circle cx="0" cy="-45" r="3" fill="{YELLOW}"/>
<rect x="-50" y="50" width="25" height="8" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<rect x="25" y="50" width="25" height="8" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
</g>
'''
with open(f"{OUT}/pantalon.svg", "w") as f:
    f.write(wrap(pantalon))

# 6. Conjunto verano
conjunto = f'''
<g transform="translate(200,215)">
<path d="M -55 -80 L -30 -90 L 30 -90 L 55 -80 L 60 -50 L 40 -40 L 40 10 L -40 10 L -40 -40 L -60 -50 Z" fill="{YELLOW}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="0" cy="-40" r="18" fill="{CORAL}"/>
<circle cx="0" cy="-40" r="10" fill="{YELLOW_LIGHT}"/>
{smile(0, -40, 10)}
<path d="M -40 20 L 40 20 L 45 90 L 15 90 L 10 50 L -10 50 L -15 90 L -45 90 Z" fill="{CORAL}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
</g>
'''
with open(f"{OUT}/conjunto-verano.svg", "w") as f:
    f.write(wrap(conjunto))

# 7. Gorro
gorro = f'''
<g transform="translate(200,210)">
<path d="M -70 30 Q -70 -90 0 -90 Q 70 -90 70 30 Z" fill="{CORAL}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<rect x="-70" y="20" width="140" height="25" rx="6" fill="{CORAL_LIGHT}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="0" cy="-90" r="14" fill="{YELLOW}" stroke="{TEXT}" stroke-width="2"/>
<path d="M -50 -20 L -50 20 M -25 -50 L -25 20 M 0 -65 L 0 20 M 25 -50 L 25 20 M 50 -20 L 50 20" stroke="{CORAL_LIGHT}" stroke-width="3"/>
</g>
'''
with open(f"{OUT}/gorro-lana.svg", "w") as f:
    f.write(wrap(gorro))

# 8. Medias
medias = f'''
<g transform="translate(200,210)">
<path d="M -50 -80 L 50 -80 L 50 40 Q 50 90 0 90 Q -50 90 -50 40 Z" fill="{YELLOW}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<path d="M -50 -80 L 50 -80 L 50 -60 L -50 -60 Z" fill="{CORAL}" stroke="{TEXT}" stroke-width="2"/>
<path d="M -50 0 L 50 0" stroke="{CORAL}" stroke-width="3"/>
<circle cx="-20" cy="60" r="6" fill="{GREEN}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="20" cy="65" r="6" fill="{GREEN}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="0" cy="55" r="6" fill="{GREEN}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="-20" cy="75" r="6" fill="{GREEN}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="20" cy="80" r="6" fill="{GREEN}" stroke="{TEXT}" stroke-width="1.5"/>
</g>
'''
with open(f"{OUT}/medias.svg", "w") as f:
    f.write(wrap(medias))

print("OK - 8 SVGs de productos generados en", OUT)

# Logo
logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
<rect width="200" height="80" rx="14" fill="{CREAM}"/>
<circle cx="32" cy="40" r="20" fill="{YELLOW}" stroke="{TEXT}" stroke-width="2.5"/>
<g stroke="{TEXT}" stroke-width="2.5" stroke-linecap="round">
<line x1="32" y1="6" x2="32" y2="14"/>
<line x1="32" y1="66" x2="32" y2="74"/>
<line x1="6" y1="40" x2="14" y2="40"/>
<line x1="50" y1="40" x2="58" y2="40"/>
<line x1="14" y1="22" x2="20" y2="28"/>
<line x1="44" y1="52" x2="50" y2="58"/>
<line x1="14" y1="58" x2="20" y2="52"/>
<line x1="44" y1="28" x2="50" y2="22"/>
</g>
{smile(32, 40, 8)}
<text x="68" y="36" font-family="Georgia, serif" font-size="22" font-weight="700" fill="{CORAL}">Pequeño</text>
<text x="68" y="58" font-family="Georgia, serif" font-size="22" font-weight="700" fill="{TEXT}">Sol</text>
</svg>'''
with open("/home/z/my-project/public/logo.svg", "w") as f:
    f.write(logo)
print("Logo generado")

# Banner
banner = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="{CORAL_LIGHT}"/>
<stop offset="0.5" stop-color="{YELLOW_LIGHT}"/>
<stop offset="1" stop-color="{GREEN_LIGHT}"/>
</linearGradient>
</defs>
<rect width="1200" height="480" fill="url(#bg)"/>
<circle cx="150" cy="100" r="40" fill="{YELLOW}" opacity="0.7"/>
<circle cx="1050" cy="380" r="60" fill="{CORAL}" opacity="0.5"/>
<circle cx="950" cy="80" r="25" fill="{GREEN}" opacity="0.6"/>
<g transform="translate(220,240)">
<circle cx="0" cy="0" r="70" fill="{YELLOW}" stroke="{TEXT}" stroke-width="4"/>
<g stroke="{TEXT}" stroke-width="4" stroke-linecap="round">
<line x1="0" y1="-90" x2="0" y2="-110"/>
<line x1="0" y1="90" x2="0" y2="110"/>
<line x1="-90" y1="0" x2="-110" y2="0"/>
<line x1="90" y1="0" x2="110" y2="0"/>
<line x1="-65" y1="-65" x2="-80" y2="-80"/>
<line x1="65" y1="65" x2="80" y2="80"/>
<line x1="-65" y1="65" x2="-80" y2="80"/>
<line x1="65" y1="-65" x2="80" y2="-80"/>
</g>
{smile(0, 0, 24)}
</g>
<text x="380" y="200" font-family="Georgia, serif" font-size="56" font-weight="700" fill="{TEXT}">Ropa que abraza</text>
<text x="380" y="260" font-family="Georgia, serif" font-size="56" font-weight="700" fill="{CORAL}">a tu pequeño</text>
<text x="380" y="310" font-family="Arial, sans-serif" font-size="22" fill="{TEXT}" opacity="0.85">Algodón orgánico · Hipoalergénico · Hecho con amor en Perú</text>
<rect x="380" y="350" width="280" height="56" rx="28" fill="{CORAL}" stroke="{TEXT}" stroke-width="3"/>
<text x="520" y="386" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="{WHITE}" text-anchor="middle">Ver catálogo</text>
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
