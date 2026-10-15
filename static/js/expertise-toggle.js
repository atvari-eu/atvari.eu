(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.expertise__audience-toggle').forEach(function (toggle) {
            var buttons = toggle.querySelectorAll('.expertise__audience-btn');
            var scope = toggle.parentElement;
            while (scope && !scope.querySelector('.expertise__intro')) {
                scope = scope.parentElement;
            }
            var panels = (scope || document).querySelectorAll('.expertise__intro');

            toggle.addEventListener('click', function (event) {
                var button = event.target.closest('.expertise__audience-btn');
                if (!button) return;
                var audience = button.getAttribute('data-audience');

                buttons.forEach(function (btn) {
                    var isActive = btn === button;
                    btn.classList.toggle('is-active', isActive);
                    btn.setAttribute('aria-pressed', String(isActive));
                });
                panels.forEach(function (panel) {
                    var active = panel.getAttribute('data-audience') === audience;
                    panel.classList.toggle('is-active', active);
                    panel.hidden = !active;
                });
            });
        });
    });
})();
