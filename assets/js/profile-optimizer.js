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
            // Configurar srcset para diferentes resoluções
            icon.srcset = `
                ${images[45]} 1x,
                ${images[90]} 2x,
                ${images[180]} 3x
            `;
        });
    }
}); 