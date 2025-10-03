#!/usr/bin/env python3
"""
Script para criar ícones PNG a partir do design do portfolio
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size=192):
    """Cria um ícone PNG com as iniciais AM"""
    
    # Criar imagem com fundo gradiente
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Desenhar círculo de fundo com gradiente simulado
    center = size // 2
    radius = size // 2 - 10
    
    # Criar gradiente simulado usando múltiplos círculos
    for i in range(radius):
        alpha = int(255 * (1 - i / radius))
        # Cor do gradiente: de azul (#4F46E5) para roxo (#7C3AED)
        r = int(79 + (124 - 79) * (i / radius))
        g = int(70 + (58 - 70) * (i / radius))
        b = int(229 + (237 - 229) * (i / radius))
        
        draw.ellipse(
            [center - radius + i, center - radius + i, 
             center + radius - i, center + radius - i],
            fill=(r, g, b, alpha)
        )
    
    # Tentar carregar uma fonte, usar padrão se não encontrar
    try:
        font_size = size // 3
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.load_default()
        except:
            font = None
    
    # Desenhar as letras "AM"
    text = "AM"
    if font:
        # Calcular posição centralizada
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - 5  # Ajuste vertical
        
        # Sombra do texto
        draw.text((x + 2, y + 2), text, font=font, fill=(0, 0, 0, 128))
        # Texto principal
        draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))
    else:
        # Fallback: desenhar letras simples
        # A
        draw.line([size*0.3, size*0.7, size*0.4, size*0.3], fill='white', width=6)
        draw.line([size*0.4, size*0.3, size*0.5, size*0.7], fill='white', width=6)
        draw.line([size*0.35, size*0.55, size*0.45, size*0.55], fill='white', width=4)
        
        # M
        draw.line([size*0.55, size*0.7, size*0.55, size*0.3], fill='white', width=6)
        draw.line([size*0.55, size*0.3, size*0.65, size*0.5], fill='white', width=6)
        draw.line([size*0.65, size*0.5, size*0.75, size*0.3], fill='white', width=6)
        draw.line([size*0.75, size*0.3, size*0.75, size*0.7], fill='white', width=6)
    
    return img

def main():
    """Criar ícones nos tamanhos necessários"""
    
    assets_dir = "/workspaces/portfolio/assets/images"
    os.makedirs(assets_dir, exist_ok=True)
    
    # Criar ícone 192x192
    icon_192 = create_icon(192)
    icon_192.save(os.path.join(assets_dir, "icon-192.png"), "PNG")
    print(f"✅ Criado: {assets_dir}/icon-192.png")
    
    # Criar ícone 512x512
    icon_512 = create_icon(512)
    icon_512.save(os.path.join(assets_dir, "icon-512.png"), "PNG")
    print(f"✅ Criado: {assets_dir}/icon-512.png")
    
    # Criar favicon 32x32
    favicon = create_icon(32)
    favicon.save(os.path.join("/workspaces/portfolio", "favicon.ico"), "ICO")
    print(f"✅ Criado: /workspaces/portfolio/favicon.ico")
    
    print("🎉 Todos os ícones foram criados com sucesso!")

if __name__ == "__main__":
    main()