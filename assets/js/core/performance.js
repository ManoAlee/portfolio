// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        
        this.init();
    }

    init() {
        this.initWebVitals();
        this.initResourceObserver();
        this.initNavigationTiming();
        this.initScrollPerformance();
    }

    initWebVitals() {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = lastEntry.startTime;
                    if (this.isDev()) console.log('LCP:', this.metrics.lcp);
                });

                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);
            } catch (e) {
                console.warn('LCP observer not supported');
            }

            // First Input Delay
            try {
                const fidObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                        if (this.isDev()) console.log('FID:', this.metrics.fid);
                    });
                });

                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);
            } catch (e) {
                console.warn('FID observer not supported');
            }

            // Cumulative Layout Shift
            let clsValue = 0;
            try {
                const clsObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            this.metrics.cls = clsValue;
                            if (this.isDev()) console.log('CLS:', this.metrics.cls);
                        }
                    }
                });

                clsObserver.observe({ entryTypes: ['layout-shift'] });
                this.observers.push(clsObserver);
            } catch (e) {
                console.warn('CLS observer not supported');
            }
        }
    }

    initResourceObserver() {
        if ('PerformanceObserver' in window) {
            try {
                const resourceObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        if (entry.duration > 100 && this.isDev()) {
                            console.warn(`Slow resource: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
                        }
                    });
                });

                resourceObserver.observe({ entryTypes: ['resource'] });
                this.observers.push(resourceObserver);
            } catch (e) {
                console.warn('Resource observer not supported');
            }
        }
    }

    initNavigationTiming() {
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.metrics.pageLoad = navigation.loadEventEnd - navigation.fetchStart;
                    this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
                    this.metrics.firstByte = navigation.responseStart - navigation.fetchStart;
                    
                    if (this.isDev()) {
                        console.log('🚀 Navigation Metrics:', {
                            pageLoad: `${this.metrics.pageLoad.toFixed(2)}ms`,
                            domContentLoaded: `${this.metrics.domContentLoaded.toFixed(2)}ms`,
                            firstByte: `${this.metrics.firstByte.toFixed(2)}ms`
                        });
                    }
                }
            }
        });
    }

    initScrollPerformance() {
        let scrollStart = null;
        let scrollFrames = 0;

        const measureScrollFPS = () => {
            if (scrollStart === null) {
                scrollStart = performance.now();
            }
            scrollFrames++;
            requestAnimationFrame(measureScrollFPS);
        };

        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                scrollStart = null;
                scrollFrames = 0;
                requestAnimationFrame(measureScrollFPS);

                setTimeout(() => {
                    isScrolling = false;
                    if (scrollStart !== null) {
                        const scrollDuration = performance.now() - scrollStart;
                        const fps = (scrollFrames / scrollDuration) * 1000;
                        if (fps < 30 && this.isDev()) {
                            console.warn(`Low scroll FPS: ${fps.toFixed(2)}`);
                        }
                    }
                }, 100);
            }
        });
    }

    isDev() {
        return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    }

    getMetrics() {
        return this.metrics;
    }

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Lazy Loading Images
class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            this.observeImages();
        } else {
            this.loadAllImages();
        }
    }

    observeImages() {
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        images.forEach(img => {
            img.classList.add('img-loading');
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
        }
        img.classList.remove('img-loading');
        img.classList.add('loaded');
    }

    loadAllImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => this.loadImage(img));
    }
}

// Resource Prefetching
class ResourcePrefetcher {
    constructor() {
        this.prefetchedResources = new Set();
        this.init();
    }

    init() {
        this.prefetchCriticalResources();
        this.setupHoverPrefetch();
    }

    prefetchCriticalResources() {
        const criticalResources = [
            'assets/css/styles.css',
            'assets/js/core/main.js',
            'https://raw.githubusercontent.com/ManoAlee/portfolio/refs/heads/main/gif.webp'
        ];

        criticalResources.forEach(resource => {
            this.prefetchResource(resource);
        });
    }

    setupHoverPrefetch() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !this.prefetchedResources.has(href)) {
                    this.prefetchResource(href);
                }
            });
        });
    }

    prefetchResource(url) {
        if (this.prefetchedResources.has(url)) return;

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        
        this.prefetchedResources.add(url);
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScroll();
    }

    setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px 0px -50px 0px'
            });

            const animatedElements = document.querySelectorAll('.card, .project-item, .skill-item');
            animatedElements.forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    setupSmoothScroll() {
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
    }
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Global Performance Initialization
function initPerformanceMonitoring() {
    const performanceMonitor = new PerformanceMonitor();
    const lazyLoader = new LazyLoader();
    const resourcePrefetcher = new ResourcePrefetcher();
    const animationController = new AnimationController();
    
    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/config/sw.js')
                .then(registration => {
                    if (performanceMonitor.isDev()) {
                        console.log('✅ Service Worker registrado com sucesso');
                    }
                })
                .catch(error => {
                    console.log('❌ Falha no registro do Service Worker:', error);
                });
        });
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        performanceMonitor.cleanup();
    });
}

// Export for use in main.js
window.initPerformanceMonitoring = initPerformanceMonitoring;