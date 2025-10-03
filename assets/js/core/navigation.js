// Smooth scroll
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu mobile
export function initMobileMenu() {
    const nav = document.querySelector('.nav-content');
    if (!nav) return;

    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button glass md:hidden';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(menuButton);

    const navLinks = nav.querySelector('div');
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Fecha menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

// Links ativos
export function initActiveLinks() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Navegação com scroll
export function initScrollNav() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}