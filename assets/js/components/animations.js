// Configuração do observador de interseção
const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px'
};

// Observador para animações de scroll
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerConfig);

// Observador para fade-in
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerConfig);

// Inicialização de todas as animações
export function initAnimations() {
    // Animações de scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Fade-in para cards e títulos
    document.querySelectorAll('.card, .title, .subtitle').forEach(el => {
        fadeObserver.observe(el);
    });

    // Animação de entrada das seções
    const sections = document.querySelectorAll('.section-card');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Efeito de parallax
export function initParallax() {
    const hero = document.querySelector('header');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Efeito de hover nos cards
export function initCardHover() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Efeito de typing
export function initTypewriter() {
    const title = document.querySelector('.title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
} 