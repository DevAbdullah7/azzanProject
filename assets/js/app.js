export const APP = {
    deferredInstall: null,
    SW: null,
    cacheName: 'azzanTime-v7',
    init() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').then((registration) => {
                console.log('serviceWorker registration successful with scop: ', registration.scope)
            }, function(err) {
                console.log('serviceWorker registration failed: ', err)
            })

            // Listen for 'appinsalled' event
            window.addEventListener('appinstalled', (evt) => {
                window.localStorage.setItem('appInstalled', 'true');
            })

            // Listen for 'beforeinstallprompt' event
            window.addEventListener('beforeinstallprompt', (evt) => {
                evt.preventDefault()
                APP.deferredInstall = evt
                window.localStorage.setItem('appInstalled', 'false');
            })
            
            let installBtn = document.querySelector('.installBtn')
            installBtn?.addEventListener('click', APP.startChromeInstall)
        }
        if (APP.deferredInstall != null) {
            document.querySelector('.installBtn').style['display'] = 'none'
        }
        APP.deleteCache()
        // APP.addCache()
        // APP.offlineCaching()
    },
    deleteCache() {
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key != APP.cacheName).map(key => {
                    caches.delete(key)
                })
            )
        })
    },
    addCache() {
        let cacheItems = [
            './index.html',
            './assets/css/main.css',
            './assets/css/responsive.css',
            './assets/js/main.js',
            './assets/js/methods.js',
            './assets/js/data/countries.js',
            './assets/js/data/cities.js',
            './assets/imgs/1.png',
            './assets/imgs/2.png',
            './assets/imgs/profileImg.png',
            './assets/imgs/testLogo.png',
            './assets/imgs/icons/settings.svg',
            './assets/imgs/icons/close.svg',
            './assets/imgs/icons/android.svg',
            './assets/imgs/icons/playstoreStroke.svg',
            './assets/imgs/icons/copyright.png',
            './assets/imgs/icons/social/1.png',
            './assets/imgs/icons/social/2.png',
            './assets/imgs/icons/social/3.png',
            './assets/imgs/icons/social/4.png',
        ]
        caches.open(APP.cacheName).then(cache => {
            cache.addAll(cacheItems).then(() => {
                console.log('cache has adding cache item seccefully !')
            })
        })
    },
    offlineCaching() {
        const putInCache = async (request, response) => {
            const cache = await caches.open(this.cacheName);
            await cache.put(request, response);
        };
            
        const cacheAndRespond = async ({ request, fallbackUrl }) => {
            // First try to get the resource from the cache
            const responseFromCache = await caches.match(request);
            if (responseFromCache) {
                return responseFromCache;
            }
            // Next try to get the resource from the network
            try {
                const responseFromNetwork = await fetch(request);
                putInCache(request, responseFromNetwork.clone());
                return responseFromNetwork;
            } catch (error) {
                const fallbackResponse = await caches.match(fallbackUrl);
                if (fallbackResponse) {
                    return fallbackResponse;
                }
                return new Response('Network error happened', {
                    status: 408,
                    headers: { 'Content-Type': 'text/plain' },
                });
            }
        };
    },
    startChromeInstall() {
        if (APP.deferredInstall) {
            console.log(APP.deferredInstall)
            APP.deferredInstall.prompt()
            APP.deferredInstall.userChoice.then((choice) => {
                if (choice.outcome == 'accepted') {
                    console.log('installed')
                    window.localStorage.setItem('appInstalled', 'true');
                    document.querySelector('.installBtn').style['display'] = 'none'
                } else {
                    window.localStorage.setItem('appInstalled', 'false');
                }
            })
        }
    },
    consolPrint() {
        console.log('APP work')
    }
}

document.addEventListener('DOMContentLoaded', APP.init)
// let installBtn = document.querySelector('.installBtn')
// installBtn?.addEventListener('click', () => {
//     console.log('good')
// })

// ----------------------------------------------------