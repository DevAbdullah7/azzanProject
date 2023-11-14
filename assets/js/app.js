export const APP = {
    deferredInstall: null,
    SW: null,
    cacheName: 'azzanTime-v1',
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
        // APP.deleteCache()
    },
    // deleteCache() {
    //     caches.keys().then(keys => {
    //         return Promise.all(
    //             keys.filter(key => key != APP.cacheName).map(key => {
    //                 caches.delete(key)
    //             })
    //         )
    //     })
    // },
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