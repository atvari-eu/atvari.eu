// Adaptive root language negotiation.
//
// Serves German browsers the German site when they arrive directly at the
// site root (typed URL, business card, app launch). Deep links, non-German
// browsers and visitors who already picked a language manually (recorded by
// lang-switch.js in localStorage) are served exactly the requested page.
// location.replace() keeps the Back button pointing outside the site, and
// /de/ never runs this script, so a redirect loop is impossible.
(function () {
    var choice;
    try {
        choice = window.localStorage.getItem('atvari-lang-choice');
    } catch (e) {
        choice = null;
    }
    if (choice) {
        return; // visitor picked a language manually; always respect it
    }

    var path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
        return; // deep links are honoured as requested
    }

    var languages = window.navigator.languages || [window.navigator.language];
    var primary = String(languages[0] || '').toLowerCase();
    if (primary !== 'de' && !primary.startsWith('de-')) {
        return; // only negotiate for German-preferring browsers
    }

    window.location.replace('/de/' + window.location.search + window.location.hash);
})();
