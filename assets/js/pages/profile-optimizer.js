class ProfileImageOptimizer {
    constructor(imageUrl, sizes) {
        this.imageUrl = imageUrl;
        this.sizes = sizes;
        this.optimizedImages = {};
    }

    async optimize() {
        try {
            const img = await this.loadImage(this.imageUrl);
            
            // Criar diferentes tamanhos
            for (const [size, quality] of Object.entries(this.sizes)) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = size;
                canvas.height = size;
                
                // Desenhar com suavização
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                
                // Recortar em quadrado
                const minDimension = Math.min(img.width, img.height);
                const startX = (img.width - minDimension) / 2;
                const startY = (img.height - minDimension) / 2;
                
                ctx.drawImage(
                    img,
                    startX, startY, minDimension, minDimension,
                    0, 0, size, size
                );
                
                // Converter para WebP com qualidade específica
                this.optimizedImages[size] = canvas.toDataURL('image/webp', quality);
            }
            
            return this.optimizedImages;
        } catch (error) {
            console.error('Erro na otimização da imagem:', error);
            return null;
        }
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }
}

// Uso do otimizador
const optimizer = new ProfileImageOptimizer('assets/images/profile.jpeg', {
    45: 0.9,   // 45x45px para mobile
    90: 0.95,  // 90x90px para retina
    180: 1     // 180x180px para retina @2x
});

// Aplicar imagens otimizadas
optimizer.optimize().then(images => {
    if (images) {
        const profileIcons = document.querySelectorAll('.profile-icon');
        profileIcons.forEach(icon => {
            // Configurar srcset para diferentes resoluções (apenas para <img>)
            try {
                if (icon && icon.tagName && icon.tagName.toLowerCase() === 'img') {
                    icon.setAttribute('srcset', `${images[45]} 1x, ${images[90]} 2x, ${images[180]} 3x`);
                    // fallback para src se necessário
                    if (!icon.getAttribute('src') || icon.getAttribute('src').trim() === '') {
                        icon.setAttribute('src', images[90]);
                    }
                } else {
                    // Se não for <img>, aplicar como background na wrapper mais próxima
                    const wrapper = icon.closest && icon.closest('.profile-icon-wrapper') ? icon.closest('.profile-icon-wrapper') : icon.parentElement;
                    if (wrapper) {
                        wrapper.style.backgroundImage = `url(${images[90]})`;
                        wrapper.style.backgroundSize = 'cover';
                        wrapper.style.backgroundPosition = 'center';
                    }
                    // Garantir acessibilidade mínima
                    if (icon && !icon.getAttribute('role')) icon.setAttribute('role', 'img');
                    if (icon && !icon.getAttribute('aria-label')) icon.setAttribute('aria-label', 'Foto de perfil otimizada');
                }
            } catch (err) {
                console.warn('profile-optimizer: falha ao aplicar imagens otimizadas', err);
            }
        });
    }
}); 