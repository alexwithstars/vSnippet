const CACHE_NAME = 'v1'

globalThis.self.addEventListener('activate', (event) => {
  event.waitUntil(() => {
    const keys = globalThis.caches.keys()
    const deleteKeys = keys.filter((key) => key !== CACHE_NAME)
    return Promise.all(deleteKeys.map((key) => globalThis.caches.delete(key)))
  })
})

const cacheResponse = async (request) => {
  const cache = await globalThis.caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)
  if (cachedResponse) {
    try {
      const response = await fetch(request, {
        method: 'HEAD'
      })
      const lastModified = response.headers.get('etag')
      const cachedLastModified = cachedResponse.headers.get('etag')
      if (lastModified === cachedLastModified) {
        return cachedResponse
      }
    } catch (error) {
      return cachedResponse
    }
  }
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    return new Response(error.message, { status: 404 })
  }
}

globalThis.self.addEventListener('fetch', (event) => {
  event.respondWith(cacheResponse(event.request))
})
