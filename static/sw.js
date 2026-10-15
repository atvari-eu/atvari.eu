// Offline safety net for the installed app.
//
// Deliberately conservative for a marketing site — freshness always wins
// when the network is reachable:
// - Navigations: network-first (short timeout), then the cache, then
//   /offline.html when offline. Successful responses are cached under
//   their pathname, so anything visited online becomes readable offline.
// - Same-origin static assets: stale-while-revalidate — instant cache,
//   refreshed in the background.
// - Priming: the "app shell" URL list is not hardcoded here. The flake
//   build generates /sw-core.json from the actual build output and stamps
//   this worker's VERSION with that list's hash (see flake.nix postBuild),
//   so a changed shell re-installs and purges the old cache on its own.
// - All cache keys are pathnames, so the ?h= cachebust queries Zola adds
//   to stylesheet URLs never duplicate or strand cache entries.
const VERSION = 'dev'; // build-stamped: 'atvari-core-<hash of sw-core.json>'
const OFFLINE_URL = '/offline.html';
const CORE_MANIFEST_URL = '/sw-core.json';
const NAVIGATION_TIMEOUT_MS = 3000;

// -- installation ----------------------------------------------------------

self.addEventListener('install', function (event) {
    event.waitUntil(
        (async function () {
            var cache = await caches.open(VERSION);
            try {
                var response = await fetch(CORE_MANIFEST_URL, { cache: 'reload' });
                if (response && response.ok) {
                    var urls = await response.json();
                    // Tolerant priming: one dead URL must not block installation.
                    await Promise.allSettled(
                        urls.map(function (url) {
                            return cache.add(url);
                        })
                    );
                }
            } catch (manifestError) {
                // No manifest available (e.g. plain dev serves): the runtime
                // caching below still covers everything actually opened.
            }
            await self.skipWaiting();
        })()
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches
            .keys()
            .then(function (keys) {
                return Promise.all(
                    keys.map(function (key) {
                        return key === VERSION ? null : caches.delete(key);
                    })
                );
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

// -- fetching --------------------------------------------------------------

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (new URL(request.url).origin !== self.location.origin) {
        return; // analytics and other third parties pass through untouched
    }
    if (request.mode === 'navigate') {
        event.respondWith(handleNavigation(event));
        return;
    }
    if (request.method !== 'GET') {
        return;
    }
    event.respondWith(staleWhileRevalidate(event));
});

async function handleNavigation(event) {
    var request = event.request;
    var cache = await caches.open(VERSION);
    var fresh;
    try {
        fresh = await fetchWithTimeout(request, NAVIGATION_TIMEOUT_MS);
    } catch (networkError) {
        // Installed-app launch or re-visit with the network gone: whatever
        // was fetched online most recently (or the primed start pages) wins.
        var cached = await cache.match(keyOf(request));
        if (cached) {
            return cached;
        }
        if (!self.navigator.onLine) {
            return (await cache.match(OFFLINE_URL)) || Response.error();
        }
        throw networkError; // cold visit on a slow link: behave like no SW
    }
    if (fresh && fresh.ok) {
        event.waitUntil(cache.put(keyOf(request), fresh.clone()));
    }
    return fresh;
}

async function staleWhileRevalidate(event) {
    var request = event.request;
    var cache = await caches.open(VERSION);
    var key = keyOf(request);
    var cached = await cache.match(key);
    var refresh = fetch(request)
        .then(function (response) {
            if (response && response.ok) {
                event.waitUntil(cache.put(key, response.clone()));
            }
            return response;
        })
        .catch(function () {
            return null;
        });
    return cached || (await refresh) || Response.error();
}

// -- helpers ---------------------------------------------------------------

function keyOf(request) {
    return new URL(request.url).pathname;
}

function fetchWithTimeout(request, ms) {
    return new Promise(function (resolve, reject) {
        var controller = new AbortController();
        var timer = setTimeout(function () {
            controller.abort();
        }, ms);
        fetch(request, { signal: controller.signal }).then(
            function (response) {
                clearTimeout(timer);
                // Non-ok responses (404, 502, …) are real answers, not network
                // failures: resolve with them so the visitor sees the server's
                // error page instead of silently getting a stale cached copy
                // of a page that no longer exists. The ok-gate in
                // handleNavigation keeps error responses out of the cache.
                resolve(response);
            },
            function (error) {
                clearTimeout(timer);
                reject(error);
            }
        );
    });
}
