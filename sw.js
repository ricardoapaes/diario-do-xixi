const CACHE_NAME = 'bedwetting-diary-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
];

// Instala o service worker e armazena o shell do aplicativo em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto e armazenando o shell do aplicativo');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => {
        console.error("Falha ao armazenar o shell do aplicativo em cache:", err);
      })
  );
});

// Serve conteúdo em cache quando offline e armazena novas solicitações em cache
self.addEventListener('fetch', (event) => {
  // Apenas lida com solicitações GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Tenta obter a resposta do cache
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        // Se encontrarmos uma correspondência no cache, a retornamos
        return cachedResponse;
      }

      // Se o recurso não estiver no cache, tenta buscá-lo na rede
      try {
        const networkResponse = await fetch(event.request);
        
        // Se a busca for bem-sucedida, clona a resposta e a armazena no cache
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          await cache.put(event.request, responseToCache);
        }
        
        // Retorna a resposta da rede
        return networkResponse;
      } catch (error) {
        // Se a busca falhar (por exemplo, offline), não temos uma versão em cache,
        // então a solicitação falhará. Uma página offline personalizada poderia ser retornada aqui.
        console.error('Busca falhou; o usuário provavelmente está offline e o recurso não está em cache.', error);
      }
    })
  );
});

// Limpa caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Excluindo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
