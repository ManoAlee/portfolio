// Service Worker para Cache e Performance
const CACHE_NAME = 'alessandro-portfolio-v2.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/css/utilities.css',
  '/assets/css/animations.css',
  '/assets/js/main.js',
  '/assets/js/performance.js',
  '/assets/js/footer.js',
  '/manifest.json',
  '/assets/images/profile.jpeg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

const DYNAMIC_CACHE_URLS = [
  '/pages/',
  '/data/',
  'https://images.unsplash.com/',
  'https://raw.githubusercontent.com/'
];

// Instala o Service Worker
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cache criado');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker: Recursos estáticos em cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Erro na instalação', error);
      })
  );
});

// Ativa o Service Worker
self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Removendo cache antigo', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Ativado com sucesso');
        return self.clients.claim();
      })
  );
});

// Intercepta requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Estratégia Cache First para recursos estáticos
  if (STATIC_CACHE_URLS.some(staticUrl => request.url.includes(staticUrl))) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
        .catch(() => {
          // Fallback para páginas offline
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        })
    );
    return;
  }
  
  // Estratégia Network First para conteúdo dinâmico
  if (DYNAMIC_CACHE_URLS.some(dynamicUrl => request.url.includes(dynamicUrl))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }
  
  // Para outros recursos, usar estratégia padrão
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Background Sync para melhor UX offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Service Worker: Background sync executado');
  }
});

// Push notifications (futuro)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/assets/images/profile.jpeg',
    badge: '/assets/images/profile.jpeg',
    vibrate: [200, 100, 200],
    tag: 'portfolio-update',
    actions: [
      {
        action: 'view',
        title: 'Ver'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Alessandro Meneses Portfolio', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});