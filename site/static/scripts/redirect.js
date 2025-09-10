// Redirect after 2 seconds
let redirectTimeout;
let countdownInterval;
let cancelled = false;

function startRedirect() {
    redirectTimeout = setTimeout(function() {
        if (!cancelled) {
            window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScn1MBjGJb0KE38cQkYLpizwP2ak6_iceYTm0slVtyypAU10w/viewform';
        }
    }, 5000);
}

startRedirect();