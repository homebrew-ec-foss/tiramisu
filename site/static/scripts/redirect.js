// Redirect after 2 seconds
let redirectTimeout;
let countdownInterval;
let cancelled = false;

function startRedirect() {
    redirectTimeout = setTimeout(function() {
        if (!cancelled) {
            window.location.href = '/apply';
        }
    }, 0);
}

startRedirect();