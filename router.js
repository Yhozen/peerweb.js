import localforage from 'localforage'

self.addEventListener('install', function (event) {
  console.log('Installing!')
})

self.addEventListener('fetch', function (event) {
  var request = event.request.url
  var scope = self.registration.scope
  var method = event.request.method

  if (method !== 'GET' || request.indexOf(scope) !== 0) {
    console.log('Request', request, 'is not part of scope', scope)
    console.log('Or method', method, 'is not get')
    return null
  }

  var path = request.substring(scope.length)
  console.log('Fetch request for:', path)
 
    event.respondWith(localforage.getItem(path).then(function (resp) {
      if (resp) {
        return self.fetch(resp)
      }
      return self.fetch(event.request)
    }))
  
})
