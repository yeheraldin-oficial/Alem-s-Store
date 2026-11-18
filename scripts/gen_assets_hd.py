#!/usr/bin/env python3
"""Mejora la calidad de las ilustraciones SVG de productos Alem's Store - versión HD."""
import os

OUT = "/home/z/my-project/public/products"
os.makedirs(OUT, exist_ok=True)

PINK = "#FFB6C1"
PINK_DARK = "#FF8DA1"
PINK_LIGHT = "#FFD8E0"
BLUE = "#B5DDF5"
BLUE_DARK = "#87CEEB"
BLUE_LIGHT = "#D9EEFB"
CREAM = "#FFFBFC"
YELLOW = "#FFE5B4"
LAVENDER = "#E5D9F2"
WHITE = "#FFFFFF"
TEXT = "#5A4A6B"

def wrap(content, w=600, h=600):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
<defs>
<linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="{PINK_LIGHT}" stop-opacity="0.4"/>
<stop offset="0.5" stop-color="{BLUE_LIGHT}" stop-opacity="0.4"/>
<stop offset="1" stop-color="{LAVENDER}" stop-opacity="0.3"/>
</linearGradient>
<filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
<feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
<feOffset dx="0" dy="4" result="offsetblur"/>
<feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
</defs>
<rect width="{w}" height="{h}" fill="url(#bgGrad)"/>
{content}
</svg>'''

def smile(cx, cy, r=10, color=TEXT):
    return f'''<g>
<circle cx="{cx-r*0.4}" cy="{cy-r*0.2}" r="{r*0.18}" fill="{color}"/>
<circle cx="{cx+r*0.4}" cy="{cy-r*0.2}" r="{r*0.18}" fill="{color}"/>
<path d="M {cx-r*0.35} {cy+r*0.25} Q {cx} {cy+r*0.6} {cx+r*0.35} {cy+r*0.25}" stroke="{color}" stroke-width="{r*0.18}" fill="none" stroke-linecap="round"/>
<circle cx="{cx-r*0.6}" cy="{cy+r*0.1}" r="{r*0.25}" fill="{PINK_DARK}" opacity="0.4"/>
<circle cx="{cx+r*0.6}" cy="{cy+r*0.1}" r="{r*0.25}" fill="{PINK_DARK}" opacity="0.4"/>
</g>'''

def flower(cx, cy):
    return f'''<g transform="translate({cx},{cy})">
<circle cx="0" cy="0" r="9" fill="{YELLOW}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-12" cy="0" r="7" fill="{WHITE}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="12" cy="0" r="7" fill="{WHITE}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="0" cy="-12" r="7" fill="{WHITE}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="0" cy="12" r="7" fill="{WHITE}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="0" cy="0" r="4" fill="{PINK_DARK}"/>
</g>'''

def text_heart(cx, cy):
    return f'<text x="{cx}" y="{cy}" font-family="Arial" font-size="14" fill="{PINK_DARK}" text-anchor="middle">♥</text>'

def star(cx, cy, r=10, color=YELLOW):
    return f'<path d="M {cx} {cy-r} L {cx+r*0.3} {cy-r*0.3} L {cx+r} {cy-r*0.3} L {cx+r*0.5} {cy+r*0.2} L {cx+r*0.6} {cy+r} L {cx} {cy+r*0.5} L {cx-r*0.6} {cy+r} L {cx-r*0.5} {cy+r*0.2} L {cx-r} {cy-r*0.3} L {cx-r*0.3} {cy-r*0.3} Z" fill="{color}" stroke="{TEXT}" stroke-width="1.5"/>'

# 1. Body bebé - rosa con más detalles
body = f'''
<g transform="translate(300,300)" filter="url(#softShadow)">
<path d="M -100 -130 L 100 -130 L 100 -60 L 130 0 L 115 45 L 90 15 L 90 160 L -90 160 L -90 15 L -115 45 L -130 0 L -100 -60 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
<rect x="-38" y="-45" width="76" height="90" rx="10" fill="{WHITE}" stroke="{TEXT}" stroke-width="3"/>
<circle cx="-65" cy="30" r="6" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="65" cy="30" r="6" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="-65" cy="60" r="6" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="2"/>
<circle cx="65" cy="60" r="6" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="2"/>
<text x="0" y="10" font-family="Georgia, serif" font-size="14" font-weight="700" fill="{PINK_DARK}" text-anchor="middle">ALEM</text>
{star(0, -25, 10)}
{smile(0, 35, 8)}
</g>
<g opacity="0.4">
{star(100, 100, 8)}
{star(500, 480, 6, BLUE_DARK)}
<circle cx="520" cy="120" r="4" fill="{PINK_DARK}"/>
<circle cx="80" cy="500" r="5" fill="{BLUE_DARK}"/>
</g>
'''
with open(f"{OUT}/body-bebe.svg", "w") as f:
    f.write(wrap(body))

# 2. Pijama osito
pijama = f'''
<g transform="translate(300,320)" filter="url(#softShadow)">
<rect x="-105" y="-75" width="210" height="240" rx="30" fill="{BLUE}" stroke="{TEXT}" stroke-width="4"/>
<path d="M -105 -45 L 105 -45" stroke="{TEXT}" stroke-width="3"/>
<circle cx="-45" cy="30" r="12" fill="{PINK}" stroke="{TEXT}" stroke-width="2.5"/>
<circle cx="45" cy="30" r="12" fill="{PINK}" stroke="{TEXT}" stroke-width="2.5"/>
<circle cx="-45" cy="30" r="5" fill="{PINK_LIGHT}"/>
<circle cx="45" cy="30" r="5" fill="{PINK_LIGHT}"/>
<circle cx="0" cy="60" r="10" fill="{PINK}" stroke="{TEXT}" stroke-width="2"/>
<path d="M -30 120 L 30 120 L 38 165 L -38 165 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="3" stroke-linejoin="round"/>
<text x="0" y="150" font-family="Georgia, serif" font-size="12" font-weight="700" fill="{WHITE}" text-anchor="middle">A</text>
<circle cx="0" cy="-105" r="52" fill="{BLUE_LIGHT}" stroke="{TEXT}" stroke-width="4"/>
<circle cx="-18" cy="-117" r="15" fill="{BLUE_LIGHT}" stroke="{TEXT}" stroke-width="3"/>
<circle cx="18" cy="-117" r="15" fill="{BLUE_LIGHT}" stroke="{TEXT}" stroke-width="3"/>
<circle cx="-18" cy="-117" r="7" fill="{PINK}"/>
<circle cx="18" cy="-117" r="7" fill="{PINK}"/>
<ellipse cx="0" cy="-95" rx="22" ry="16" fill="{PINK_LIGHT}" stroke="{TEXT}" stroke-width="2.5"/>
<circle cx="0" cy="-100" r="4" fill="{TEXT}"/>
{smile(0, -102, 12)}
</g>
'''
with open(f"{OUT}/pijama-osito.svg", "w") as f:
    f.write(wrap(pijama))

# 3. Vestido floral
vestido = f'''
<g transform="translate(300,320)" filter="url(#softShadow)">
<path d="M -60 -135 L 60 -135 L 75 -75 L 45 -60 L 135 165 L -135 165 L -45 -60 L -75 -75 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
<rect x="-52" y="-142" width="104" height="22" rx="6" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="3"/>
<rect x="-50" y="-50" width="100" height="12" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="2"/>
{flower(-45, 30)}
{flower(30, 60)}
{flower(-15, 105)}
{flower(52, 125)}
{flower(-75, 135)}
</g>
'''
with open(f"{OUT}/vestido-floral.svg", "w") as f:
    f.write(wrap(vestido))

# 4. Polover
polover = f'''
<g transform="translate(300,320)" filter="url(#softShadow)">
<path d="M -110 -75 L -82 -120 L -45 -142 L 45 -142 L 82 -120 L 110 -75 L 110 165 L -110 165 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
<rect x="-45" y="-150" width="90" height="30" rx="10" fill="{BLUE_DARK}" stroke="{TEXT}" stroke-width="3"/>
<path d="M -75 0 L 75 0" stroke="{TEXT}" stroke-width="2" opacity="0.3"/>
<path d="M -75 45 L 75 45" stroke="{TEXT}" stroke-width="2" opacity="0.3"/>
<path d="M -75 90 L 75 90" stroke="{TEXT}" stroke-width="2" opacity="0.3"/>
{star(0, -20, 12)}
<text x="0" y="60" font-family="Georgia, serif" font-size="14" font-weight="700" fill="{WHITE}" text-anchor="middle" opacity="0.8">alem&#39;s</text>
</g>
'''
with open(f"{OUT}/polover.svg", "w") as f:
    f.write(wrap(polover))

# 5. Pantalón
pantalon = f'''
<g transform="translate(300,310)" filter="url(#softShadow)">
<path d="M -95 -135 L 95 -135 L 95 -60 L 90 165 L 30 165 L 15 -30 L -15 -30 L -30 165 L -90 165 L -95 -60 Z" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
<rect x="-95" y="-135" width="190" height="30" rx="10" fill="{BLUE}" stroke="{TEXT}" stroke-width="3"/>
<path d="M -10 -120 L 0 -100 L 10 -120" stroke="{TEXT}" stroke-width="2.5" fill="none"/>
<circle cx="0" cy="-90" r="4" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<circle cx="0" cy="-68" r="4" fill="{YELLOW}" stroke="{TEXT}" stroke-width="1.5"/>
<path d="M -75 75 L -40 75 L -38 100 L -75 100 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="2.5" opacity="0.7"/>
<path d="M 40 75 L 75 75 L 75 100 L 38 100 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="2.5" opacity="0.7"/>
<rect x="-90" y="145" width="60" height="14" fill="{BLUE}" stroke="{TEXT}" stroke-width="2"/>
<rect x="30" y="145" width="60" height="14" fill="{BLUE}" stroke="{TEXT}" stroke-width="2"/>
</g>
'''
with open(f"{OUT}/pantalon.svg", "w") as f:
    f.write(wrap(pantalon))

# 6. Conjunto verano
conjunto = f'''
<g transform="translate(300,320)" filter="url(#softShadow)">
<path d="M -82 -120 L -45 -135 L 45 -135 L 82 -120 L 90 -75 L 60 -60 L 60 15 L -60 15 L -60 -60 L -90 -75 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
<circle cx="0" cy="-60" r="27" fill="{YELLOW}" stroke="{TEXT}" stroke-width="3"/>
<g stroke="{TEXT}" stroke-width="3" stroke-linecap="round">
<line x1="0" y1="-95" x2="0" y2="-105"/>
<line x1="0" y1="-15" x2="0" y2="-25"/>
<line x1="-35" y1="-60" x2="-45" y2="-60"/>
<line x1="35" y1="-60" x2="45" y2="-60"/>
<line x1="-25" y1="-85" x2="-32" y2="-92"/>
<line x1="25" y1="-85" x2="32" y2="-92"/>
<line x1="-25" y1="-35" x2="-32" y2="-28"/>
<line x1="25" y1="-35" x2="32" y2="-28"/>
</g>
{smile(0, -60, 14)}
<path d="M -60 30 L 60 30 L 68 135 L 22 135 L 15 75 L -15 75 L -22 135 L -68 135 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
{star(-35, 100, 7)}
{star(35, 105, 7)}
</g>
'''
with open(f"{OUT}/conjunto-verano.svg", "w") as f:
    f.write(wrap(conjunto))

# 7. Gorro
gorro = f'''
<g transform="translate(300,310)" filter="url(#softShadow)">
<path d="M -100 45 Q -100 -135 0 -135 Q 100 -135 100 45 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
<rect x="-100" y="30" width="200" height="35" rx="10" fill="{PINK_DARK}" stroke="{TEXT}" stroke-width="3"/>
<circle cx="0" cy="-135" r="20" fill="{BLUE}" stroke="{TEXT}" stroke-width="3"/>
<circle cx="-5" cy="-140" r="6" fill="{BLUE_LIGHT}"/>
<path d="M -70 -30 L -70 30 M -35 -75 L -35 30 M 0 -100 L 0 30 M 35 -75 L 35 30 M 70 -30 L 70 30" stroke="{PINK_DARK}" stroke-width="4"/>
{star(0, 50, 8)}
</g>
'''
with open(f"{OUT}/gorro-lana.svg", "w") as f:
    f.write(wrap(gorro))

# 8. Medias
medias = f'''
<g transform="translate(300,310)" filter="url(#softShadow)">
<path d="M -75 -120 L 75 -120 L 75 60 Q 75 135 0 135 Q -75 135 -75 60 Z" fill="{BLUE}" stroke="{TEXT}" stroke-width="4" stroke-linejoin="round"/>
<path d="M -75 -120 L 75 -120 L 75 -90 L -75 -90 Z" fill="{PINK}" stroke="{TEXT}" stroke-width="3"/>
<path d="M -75 0 L 75 0" stroke="{PINK}" stroke-width="4"/>
{text_heart(-30, 90)}
{text_heart(30, 98)}
{text_heart(0, 83)}
{text_heart(-30, 113)}
{text_heart(30, 120)}
{star(-40, -70, 7)}
{star(40, -70, 7)}
</g>
'''
with open(f"{OUT}/medias.svg", "w") as f:
    f.write(wrap(medias))

print("✓ 8 SVGs HD generados (600x600 con sombras y detalles)")
