(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var links = Array.prototype.slice.call(document.querySelectorAll('.main-navigation [data-nav-anchor]'));
        if (!links.length || typeof IntersectionObserver === 'undefined') {
            return;
        }

        // Multiple links (e.g. the "Services" toggle and its "Overview" dropdown
        // item) can share the same anchor id, so they're grouped here and later
        // toggled together rather than tracked one-to-one with a section.
        var sectionsById = {};
        links.forEach(function (link) {
            var id = link.getAttribute('data-nav-anchor');
            if (!sectionsById[id]) {
                var el = document.getElementById(id);
                if (el) {
                    sectionsById[id] = el;
                }
            }
        });
        var ids = Object.keys(sectionsById);
        if (!ids.length) {
            return;
        }

        function setActive(id) {
            links.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('data-nav-anchor') === id);
            });
            // "home" is the default scroll position, so it's left un-anchored
            // rather than writing a "#home" hash into the URL.
            var hash = id === 'home' ? '' : '#' + id;
            if (window.location.hash !== hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search + hash);
            }
        }

        var observer = new IntersectionObserver(function (entries) {
            var visible = entries.filter(function (entry) {
                return entry.isIntersecting;
            });
            if (!visible.length) {
                return;
            }
            visible.sort(function (a, b) {
                return a.boundingClientRect.top - b.boundingClientRect.top;
            });
            var topEl = visible[0].target;
            var id = ids.find(function (candidate) {
                return sectionsById[candidate] === topEl;
            });
            if (id) {
                setActive(id);
            }
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

        ids.forEach(function (id) {
            observer.observe(sectionsById[id]);
        });

        // Clicking "Home" would otherwise let the browser follow the "#home"
        // href natively and write that hash into the URL before the scroll
        // even happens; scroll there ourselves instead so it never gets set.
        if (sectionsById.home) {
            links.forEach(function (link) {
                if (link.getAttribute('data-nav-anchor') === 'home') {
                    link.addEventListener('click', function (event) {
                        event.preventDefault();
                        sectionsById.home.scrollIntoView({ behavior: 'smooth' });
                    });
                }
            });
        }
    });
})();
