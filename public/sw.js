const CACHE_NAME = 'v1'

globalThis.self.addEventListener('activate', (event) => {
  event.waitUntil((() => {
    const keys = globalThis.caches.keys()
    const deleteKeys = keys.filter((key) => key !== CACHE_NAME)
    return Promise.all(deleteKeys.map((key) => globalThis.caches.delete(key)))
  })())
})

globalThis.self.addEventListener('fetch', async (event) => {
  event.respondWith((async () => {
    const cache = await globalThis.caches.open(CACHE_NAME)
    const { request } = event
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      event.waitUntil((async () => {
        let response
        try {
          response = await fetch(request, {
            method: 'HEAD'
          })
        } catch (error) { return }
        const lastModified = response.headers.get('etag')
        const cachedLastModified = cachedResponse.headers.get('etag')
        if (lastModified !== cachedLastModified) {
          try {
            response = await fetch(request)
          } catch (error) { return }
          await cache.put(request, response)
          if (!event.clientId) return
          const client = await globalThis.self.clients.get(event.clientId)
          if (!client) return
          client.postMessage({
            type: 'CACHE_UPDATE',
            msg: 'Cache Updated'
          })
        }
      })())
      return cachedResponse
    }
    let response
    try {
      response = await fetch(request)
    } catch (error) { return new Response(null, { status: 404 }) }
    cache.put(request, response.clone())
    return response
  })())
})
