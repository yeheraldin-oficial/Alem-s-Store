#!/usr/bin/env python3
"""Genera QR de Yape + logo Yape + ilustración mapa Perú."""
import os

OUT = "/home/z/my-project/public"
os.makedirs(OUT, exist_ok=True)

# Colores Yape oficiales: morado #7D3494, verde #00D5C0
YAPE_PURPLE = "#7D3494"
YAPE_GREEN = "#00D5C0"
WHITE = "#FFFFFF"
TEXT = "#5A4A6B"

# QR Yape (simulado, con marca de Yape)
qr_yape = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 280" width="240" height="280">
<rect width="240" height="280" rx="16" fill="{WHITE}" stroke="{YAPE_PURPLE}" stroke-width="3"/>
<!-- Header Yape -->
<rect x="0" y="0" width="240" height="48" rx="16" fill="{YAPE_PURPLE}"/>
<rect x="0" y="32" width="240" height="16" fill="{YAPE_PURPLE}"/>
<text x="120" y="32" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="{WHITE}" text-anchor="middle">Yape</text>
<!-- QR code pattern -->
<g fill="{TEXT}" transform="translate(40,70)">
<rect x="0" y="0" width="50" height="50"/>
<rect x="130" y="0" width="50" height="50"/>
<rect x="0" y="130" width="50" height="50"/>
<rect x="8" y="8" width="34" height="34" fill="{WHITE}"/>
<rect x="138" y="8" width="34" height="34" fill="{WHITE}"/>
<rect x="8" y="138" width="34" height="34" fill="{WHITE}"/>
<rect x="20" y="20" width="10" height="10"/>
<rect x="150" y="20" width="10" height="10"/>
<rect x="20" y="150" width="10" height="10"/>
<rect x="65" y="0" width="10" height="10"/>
<rect x="85" y="10" width="15" height="10"/>
<rect x="65" y="25" width="20" height="15"/>
<rect x="100" y="0" width="10" height="20"/>
<rect x="115" y="10" width="10" height="10"/>
<rect x="65" y="65" width="10" height="10"/>
<rect x="80" y="70" width="20" height="10"/>
<rect x="105" y="65" width="15" height="15"/>
<rect x="130" y="65" width="10" height="20"/>
<rect x="150" y="70" width="20" height="10"/>
<rect x="65" y="90" width="15" height="15"/>
<rect x="90" y="95" width="10" height="10"/>
<rect x="110" y="90" width="20" height="20"/>
<rect x="140" y="95" width="10" height="15"/>
<rect x="0" y="65" width="10" height="15"/>
<rect x="15" y="80" width="15" height="10"/>
<rect x="0" y="95" width="20" height="20"/>
<rect x="25" y="100" width="10" height="10"/>
<rect x="65" y="115" width="20" height="10"/>
<rect x="90" y="120" width="10" height="10"/>
<rect x="110" y="115" width="15" height="15"/>
<rect x="130" y="120" width="20" height="10"/>
<rect x="155" y="115" width="15" height="15"/>
<rect x="0" y="115" width="10" height="10"/>
<rect x="20" y="120" width="15" height="15"/>
<rect x="65" y="140" width="10" height="10"/>
<rect x="85" y="135" width="20" height="20"/>
<rect x="110" y="140" width="15" height="15"/>
<rect x="135" y="135" width="10" height="20"/>
<rect x="155" y="140" width="20" height="10"/>
<rect x="65" y="155" width="20" height="15"/>
<rect x="95" y="160" width="10" height="10"/>
<rect x="115" y="155" width="20" height="15"/>
<rect x="140" y="160" width="15" height="10"/>
<rect x="0" y="155" width="15" height="15"/>
<rect x="25" y="160" width="20" height="10"/>
</g>
<!-- Info -->
<text x="120" y="245" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="{TEXT}" text-anchor="middle">Alem Store</text>
<text x="120" y="263" font-family="Arial, sans-serif" font-size="13" fill="{YAPE_PURPLE}" text-anchor="middle">987 390 211</text>
</svg>'''
with open(f"{OUT}/yape-qr.svg", "w") as f:
    f.write(qr_yape)
print("QR Yape generado")

# Logo Yape pequeño (para botones)
yape_logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 32" width="80" height="32">
<rect width="80" height="32" rx="6" fill="{YAPE_PURPLE}"/>
<text x="40" y="22" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="{WHITE}" text-anchor="middle">Yape</text>
</svg>'''
with open(f"{OUT}/yape-logo.svg", "w") as f:
    f.write(yape_logo)
print("Logo Yape generado")

# Ilustración Perú con corazón
peru = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
<!-- Bandera simplificada -->
<rect x="40" y="60" width="60" height="20" fill="#D91023"/>
<rect x="40" y="80" width="60" height="40" fill="{WHITE}"/>
<rect x="40" y="120" width="60" height="20" fill="#D91023"/>
<!-- Escudo simplificado -->
<circle cx="70" cy="100" r="8" fill="#FFD93C" stroke="#5A4A6B" stroke-width="1.5"/>
<!-- Texto -->
<text x="120" y="105" font-family="Georgia, serif" font-size="14" font-weight="700" fill="#5A4A6B">Hecho</text>
<text x="120" y="122" font-family="Georgia, serif" font-size="14" font-weight="700" fill="#5A4A6B">en Perú</text>
<!-- Corazón decorativo -->
<path d="M 100 155 C 95 150 88 150 88 158 C 88 165 95 170 100 175 C 105 170 112 165 112 158 C 112 150 105 150 100 155 Z" fill="#FF8DA1" stroke="#5A4A6B" stroke-width="1.5"/>
</svg>'''
with open(f"{OUT}/peru.svg", "w") as f:
    f.write(peru)
print("Ilustración Perú generada")
