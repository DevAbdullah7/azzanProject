const cacheName = 'azzanTime-v2'
const assets = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/css/responsive.css',
    '/assets/js/main.js',
    '/assets/js/methods.js',
    '/assets/js/data/countries.js',
    '/assets/js/data/cities.js',
    '/assets/imgs/1.png',
    '/assets/imgs/2.png',
    '/assets/imgs/profileImg.png',
    '/assets/imgs/testLogo.png',
    '/assets/imgs/icons/settings.svg',
    '/assets/imgs/icons/close.svg',
    '/assets/imgs/icons/android.svg',
    '/assets/imgs/icons/playstoreStroke.svg',
    '/assets/imgs/icons/copyright.png',
    '/assets/imgs/icons/social/1.png',
    '/assets/imgs/icons/social/2.png',
    '/assets/imgs/icons/social/3.png',
    '/assets/imgs/icons/social/4.png',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets).then(() => {
                console.log('caching done !')
            }).catch()
        }).catch(err => {}),
        caches.keys().then(keys => {
            Promise.all(
                keys.filter(key => key != cacheName).map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key != cacheName).map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            return res || fetch(event.request).then(res => {
                return res
            }, err => {
                // Network Failure
            })
        })
    )
})