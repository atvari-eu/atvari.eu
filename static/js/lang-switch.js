(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.lang-switch-link[href]').forEach(function (link) {
            var base = link.getAttribute('href');
            link.addEventListener('click', function () {
                try {
                    window.localStorage.setItem('atvari-lang-choice', '1');
                } catch (e) {}
                link.href = base + window.location.search + window.location.hash;
            });
        });
    });
})();
