// Suppress the browser-driven install banner (Chrome Android's mini-infobar,
// shown after engagement once install criteria are met). Per the Web App
// Manifest processing model, calling preventDefault() stops the user agent
// from showing its own prompt. Installation stays available through all
// user-initiated paths (omnibox/dialer menu "Install app", share menu on iOS);
// this site deliberately never surfaces an in-page prompt.
window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
});
