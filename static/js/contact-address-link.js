(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var link = document.getElementById('contact-address-link');
        if (!link) return;
        if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
            link.href = 'geo:0,0?q=' + link.dataset.geoQuery;
            link.removeAttribute('target');
        }
    });
})();
