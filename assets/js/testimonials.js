// ===== SISTEMA DE TESTIMONIALS =====
class TestimonialsSystem {
    constructor() {
        this.testimonials = [
            {
                name: "BR Conecta",
                role: "Carta de Referência",
                company: "BR Conecta LTDA",
                text: "Demonstrou competência profissional e lealdade. Foi uma pessoa idônea, cumpridora dos seus deveres, sendo acessível, com facilidade para trabalhar em equipe e boa comunicação.",
                avatar: "https://ui-avatars.com/api/?name=BR+Conecta&background=4F46E5&color=fff",
                rating: 5,
                verified: true
            },
            {
                name: "Equipe Automotion",
                role: "Supervisor TI",
                company: "Automotion",
                text: "Excelente conhecimento em infraestrutura de TI. Sempre disponível para resolver problemas complexos e automatizar processos. Profissional dedicado e proativo.",
                avatar: "https://ui-avatars.com/api/?name=Automotion&background=06B6D4&color=fff",
                rating: 5,
                verified: false
            },
            {
                name: "Colegas FATEC",
                role: "Estudante GTI",
                company: "FATEC Tatuí",
                text: "Sempre disposto a colaborar em projetos acadêmicos. Tem facilidade com tecnologia e consegue explicar conceitos complexos de forma simples.",
                avatar: "https://ui-avatars.com/api/?name=FATEC&background=22C55E&color=fff",
                rating: 5,
                verified: false
            }
        ];
        this.init();
    }

    init() {
        this.createTestimonialsSection();
        this.setupSlider();
        this.addVerificationBadges();
    }

    createTestimonialsSection() {
        const testimonialsHtml = `
        <!-- Seção de Testimonials -->
        <section class="container py-16">
            <div class="text-center mb-12">
                <h2 class="subtitle">O Que Dizem Sobre Meu Trabalho</h2>
                <p class="text-gray-400">Feedback de colegas e supervisores</p>
            </div>
            
            <div class="testimonials-slider max-w-4xl mx-auto">
                <div class="testimonials-container overflow-hidden rounded-2xl">
                    <div class="testimonials-track flex transition-transform duration-500" id="testimonials-track">
                        ${this.testimonials.map((testimonial, index) => this.createTestimonialCard(testimonial, index)).join('')}
                    </div>
                </div>
                
                <!-- Controles do Slider -->
                <div class="flex justify-center items-center mt-6 gap-4">
                    <button class="slider-btn" id="prev-testimonial">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    
                    <div class="flex gap-2" id="testimonial-dots">
                        ${this.testimonials.map((_, index) => 
                            `<button class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
                        ).join('')}
                    </div>
                    
                    <button class="slider-btn" id="next-testimonial">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>`;

        // Insere antes da seção de contato
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.insertAdjacentHTML('beforebegin', testimonialsHtml);
        }
    }

    createTestimonialCard(testimonial, index) {
        return `
        <div class="testimonial-card flex-shrink-0 w-full px-4">
            <div class="card p-8 text-center max-w-2xl mx-auto">
                <!-- Stars Rating -->
                <div class="flex justify-center mb-4">
                    ${Array(testimonial.rating).fill().map(() => '<i class="fas fa-star text-yellow-400"></i>').join('')}
                </div>
                
                <!-- Quote -->
                <blockquote class="text-lg text-gray-300 mb-6 italic">
                    "${testimonial.text}"
                </blockquote>
                
                <!-- Author -->
                <div class="flex items-center justify-center gap-4">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" 
                         class="w-12 h-12 rounded-full border-2 border-primary/20">
                    
                    <div class="text-left">
                        <div class="flex items-center gap-2">
                            <h4 class="font-semibold text-white">${testimonial.name}</h4>
                            ${testimonial.verified ? '<i class="fas fa-check-circle text-primary text-sm" title="Verificado"></i>' : ''}
                        </div>
                        <p class="text-sm text-gray-400">${testimonial.role}</p>
                        <p class="text-xs text-gray-500">${testimonial.company}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }

    setupSlider() {
        let currentSlide = 0;
        const track = document.getElementById('testimonials-track');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');

        const updateSlider = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        // Controles
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % this.testimonials.length;
            updateSlider(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide === 0 ? this.testimonials.length - 1 : currentSlide - 1;
            updateSlider(currentSlide);
        });

        // Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider(currentSlide);
            });
        });

        // Auto-play (opcional)
        setInterval(() => {
            currentSlide = (currentSlide + 1) % this.testimonials.length;
            updateSlider(currentSlide);
        }, 10000); // 10 segundos
    }

    addVerificationBadges() {
        // Adiciona estilos para testimonials
        const styles = `
        <style>
        .testimonials-slider .slider-btn {
            @apply w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors;
        }
        
        .testimonials-slider .slider-dot {
            @apply w-3 h-3 rounded-full bg-gray-600 hover:bg-gray-400 transition-colors;
        }
        
        .testimonials-slider .slider-dot.active {
            @apply bg-primary;
        }
        
        .testimonial-card blockquote:before {
            content: """;
            @apply text-6xl text-primary/30 absolute -top-4 -left-4;
            position: absolute;
        }
        
        .testimonial-card {
            position: relative;
        }
        </style>`;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSystem();
});