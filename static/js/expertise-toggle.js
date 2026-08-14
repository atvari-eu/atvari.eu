(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.expertise__audience-toggle').forEach(function (toggle) {
            var wrapper = toggle.parentElement;
            var buttons = toggle.querySelectorAll('.expertise__audience-btn');
            var panels = wrapper.querySelectorAll('.expertise__intro');

            toggle.addEventListener('click', function (event) {
                var button = event.target.closest('.expertise__audience-btn');
                if (!button) return;
                var audience = button.getAttribute('data-audience');

                buttons.forEach(function (btn) {
                    btn.classList.toggle('is-active', btn === button);
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
