(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var suffix = window.location.search + window.location.hash;
        if (!suffix) return;
        document.querySelectorAll('.lang-switch-link[href]').forEach(function (link) {
            link.href += suffix;
        });
    });
})();
