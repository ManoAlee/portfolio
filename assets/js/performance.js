// ===== MELHORIAS DE PERFORMANCE E UX =====

// Intersection Observer para animações lazy
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    // Animar cards quando aparecem na tela
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        animateOnScroll.observe(card);
    });

    // Preload de imagens importantes
    const criticalImages = [
        'https://raw.githubusercontent.com/ManoAlee/portfolio/refs/heads/main/gif.webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy load de imagens com placeholder
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.remove('img-loading');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        img.classList.add('img-loading');
        imageObserver.observe(img);
    });
});

// Debounce para scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        // Log apenas em desenvolvimento
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            console.log(`🚀 Página carregada em ${loadTime}ms`);
        }
    });
}

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso');
            })
            .catch(error => {
                console.log('Falha no registro do SW');
            });
    });
}