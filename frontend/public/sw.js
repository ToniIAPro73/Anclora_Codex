const CACHE_NAME = 'anclora-cortex-v1.0.0'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync for offline analysis
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-analysis') {
    event.waitUntil(doBackgroundAnalysis())
  }
})

async function doBackgroundAnalysis() {
  // Get pending analyses from IndexedDB
  const pendingAnalyses = await getPendingAnalyses()
  
  for (const analysis of pendingAnalyses) {
    try {
      // Try to send to server
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${analysis.token}`
        },
        body: JSON.stringify(analysis.data)
      })
      
      if (response.ok) {
        // Remove from pending queue
        await removePendingAnalysis(analysis.id)
        
        // Store result
        const result = await response.json()
        await storeAnalysisResult(analysis.id, result)
        
        // Notify user
        self.registration.showNotification('Análisis completado', {
          body: `Tu análisis de ${analysis.data.businessName} está listo`,
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          tag: 'analysis-complete',
          data: { analysisId: analysis.id }
        })
      }
    } catch (error) {
      console.error('Background analysis failed:', error)
    }
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de Anclora Cortex',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver análisis',
        icon: '/icon-explore.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icon-close.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Anclora Cortex', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    // Open the app to the analysis page
    event.waitUntil(
      clients.openWindow('/?analysis=' + event.notification.data.analysisId)
    )
  } else if (event.action === 'close') {
    // Just close the notification
    event.notification.close()
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Helper functions for IndexedDB operations
async function getPendingAnalyses() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AncloraCortexDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['pendingAnalyses'], 'readonly')
      const store = transaction.objectStore('pendingAnalyses')
      const getAllRequest = store.getAll()
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('pendingAnalyses')) {
        db.createObjectStore('pendingAnalyses', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('analysisResults')) {
        db.createObjectStore('analysisResults', { keyPath: 'id' })
      }
    }
  })
}

async function removePendingAnalysis(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AncloraCortexDB', 1)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['pendingAnalyses'], 'readwrite')
      const store = transaction.objectStore('pendingAnalyses')
      const deleteRequest = store.delete(id)
      
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

async function storeAnalysisResult(id, result) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AncloraCortexDB', 1)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['analysisResults'], 'readwrite')
      const store = transaction.objectStore('analysisResults')
      const addRequest = store.add({ id, result, timestamp: Date.now() })
      
      addRequest.onsuccess = () => resolve()
      addRequest.onerror = () => reject(addRequest.error)
    }
  })
}