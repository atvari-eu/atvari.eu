(function () {
    var STORAGE_KEY = 'theme';
    var ORDER = ['auto', 'light', 'dark'];
    var root = document.documentElement;

    function current() {
        var t = root.getAttribute('data-theme');
        return t === 'light' || t === 'dark' ? t : 'auto';
    }

    function apply(theme) {
        if (theme === 'light' || theme === 'dark') {
            root.setAttribute('data-theme', theme);
        } else {
            root.removeAttribute('data-theme');
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) {}
            apply(next);
        });
    });
})();
