/**
 * Portfolio Configuration
 * Configuração central do portfolio
 */

const portfolioConfig = {
  // Informações básicas
  site: {
    title: "Manoel Alexandre - Portfolio",
    description: "Desenvolvedor Full Stack especializado em Python, JavaScript e análise de dados",
    url: "https://manoalee.github.io/portfolio",
    author: "Manoel Alexandre",
    // contato público para o portfólio
    email: "ale_meneses2004@hotmail.com"
  },

  // Configurações de tema
  theme: {
    defaultTheme: "dark",
    enableSystemTheme: true,
    transitionDuration: 300
  },

  // Configurações de performance
  performance: {
    enableLazyLoading: true,
    enablePrefetch: true,
    enableServiceWorker: true,
    cacheVersion: "v1.0.0"
  },

  // APIs e integrações
  integrations: {
    github: {
      username: "ManoAlee",
      repository: "portfolio"
    },
    analytics: {
      enabled: false,
      trackingId: ""
    }
  },

  // Configurações de SEO
  seo: {
    sitemap: true,
    robots: true,
    openGraph: true,
    structuredData: true
  },

  // Caminhos dos assets
  paths: {
    css: {
      main: "/assets/css/styles.css",
      base: "/assets/css/base/",
      components: "/assets/css/components/",
      pages: "/assets/css/pages/"
    },
    js: {
      core: "/assets/js/core/",
      components: "/assets/js/components/",
      pages: "/assets/js/pages/",
      utils: "/assets/js/utils/"
    },
    images: "/assets/images/",
    icons: "/assets/icons/",
    fonts: "/assets/fonts/"
  },

  // Configurações de build
  build: {
    minify: true,
    sourceMaps: false,
    compression: true
  }
};

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioConfig;
}

// Disponibilizar globalmente no browser
if (typeof window !== 'undefined') {
  window.portfolioConfig = portfolioConfig;
}