// Testimonials Carousel System
class TestimonialsCarousel {
    constructor() {
        this.testimonials = [
            {
                name: "Formação Acadêmica",
                role: "Tecnólogo em GTI",
                company: "FATEC Tatuí",
                text: "Formação completa em Gestão da Tecnologia da Informação com foco em infraestrutura, desenvolvimento e análise de sistemas.",
                rating: 5,
                image: "https://ui-avatars.com/api/?name=FATEC&background=764ba2&color=fff&size=80"
            },
            {
                name: "Experiência Profissional",
                role: "Assistente de TI JR",
                company: "Automotion",
                text: "Atuação em suporte técnico, administração de sistemas e infraestrutura de TI com foco em soluções Windows Server e Active Directory.",
                rating: 5,
                image: "https://ui-avatars.com/api/?name=Automotion&background=667eea&color=fff&size=80"
            },
            {
                name: "Desenvolvimento Pessoal",
                role: "Projetos e Estudos",
                company: "Portfólio Próprio",
                text: "Desenvolvimento contínuo de habilidades em automação, análise de dados e criação de soluções personalizadas para TI.",
                rating: 5,
                image: "https://ui-avatars.com/api/?name=Portfolio&background=f093fb&color=fff&size=80"
            }
        ];
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        this.createTestimonialsSection();
        this.setupEventListeners();
        this.startAutoplay();
    }

    createTestimonialsSection() {
        const testimonialsHTML = `
            <section class="testimonials-section py-20">
                <div class="container">
                    <div class="text-center mb-12">
                        <h2 class="subtitle mb-4">O Que Dizem Sobre Mim</h2>
                        <p class="text-gray-300">Feedback de colegas, professores e supervisores</p>
                    </div>
                    
                    <div class="testimonials-carousel max-w-4xl mx-auto">
                        <div class="testimonials-container relative overflow-hidden rounded-xl">
                            <div class="testimonials-wrapper" style="transform: translateX(0%)">
                                ${this.testimonials.map((testimonial, index) => `
                                    <div class="testimonial-slide">
                                        <div class="card text-center">
                                            <div class="mb-6">
                                                <img src="${testimonial.image}" alt="${testimonial.name}" 
                                                     class="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primary/20">
                                                <div class="stars mb-4">
                                                    ${Array(testimonial.rating).fill(0).map(() => 
                                                        '<i class="fas fa-star text-yellow-400"></i>'
                                                    ).join('')}
                                                </div>
                                            </div>
                                            <blockquote class="text-lg text-gray-300 mb-6 italic leading-relaxed">
                                                "${testimonial.text}"
                                            </blockquote>
                                            <div class="testimonial-author">
                                                <h4 class="font-semibold text-white">${testimonial.name}</h4>
                                                <p class="text-primary text-sm">${testimonial.role}</p>
                                                <p class="text-gray-400 text-xs">${testimonial.company}</p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Navigation -->
                        <div class="testimonials-nav flex justify-center items-center gap-4 mt-8">
                            <button class="nav-btn prev-btn">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <div class="dots flex gap-2">
                                ${this.testimonials.map((_, index) => `
                                    <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                                `).join('')}
                            </div>
                            <button class="nav-btn next-btn">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Inserir antes da seção de contato
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.insertAdjacentHTML('beforebegin', testimonialsHTML);
        }
    }

    setupEventListeners() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.dot');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause autoplay on hover
        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoplay());
            carousel.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.updateDots();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateCarousel();
        this.updateDots();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.updateCarousel();
        this.updateDots();
    }

    updateCarousel() {
        const wrapper = document.querySelector('.testimonials-wrapper');
        if (wrapper) {
            const translateX = -this.currentIndex * 100;
            wrapper.style.transform = `translateX(${translateX}%)`;
        }
    }

    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Exporta para uso global
window.TestimonialsCarousel = TestimonialsCarousel;

// Exporta para uso global
window.TestimonialsCarousel = TestimonialsCarousel;

// Initialize testimonials
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel();
});