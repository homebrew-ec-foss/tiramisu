// Redirect after 2 seconds
let redirectTimeout;
let countdownInterval;
let cancelled = false;

function startRedirect() {
    redirectTimeout = setTimeout(function() {
        if (!cancelled) {
            window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScn1MBjGJb0KE38cQkYLpizwP2ak6_iceYTm0slVtyypAU10w/viewform';
        }
    }, 2000);
}

function cancelRedirect() {
    cancelled = true;
    clearTimeout(redirectTimeout);
    clearInterval(countdownInterval);
    
    const countdownElement = document.getElementById('countdown');
    const redirectMessage = document.getElementById('redirect-message');
    
    if (countdownElement) {
        countdownElement.textContent = 'Cancelled';
    }
    if (redirectMessage) {
        redirectMessage.style.display = 'none';
    }
}

// Start the redirect
startRedirect();

// Optional: Show a countdown or loading message
let countdown = 2;
const countdownElement = document.getElementById('countdown');
const closeButton = document.getElementById('close-redirect');

if (countdownElement) {
    countdownInterval = setInterval(function() {
        if (cancelled) return;
        
        countdownElement.textContent = countdown;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(countdownInterval);
            if (!cancelled) {
                countdownElement.textContent = 'Redirecting...';
            }
        }
    }, 1000);
}

// Add click event to close button
if (closeButton) {
    closeButton.addEventListener('click', cancelRedirect);
}

// Apply green color styling
const redirectMessage = document.getElementById('redirect-message');
if (redirectMessage) {
    redirectMessage.style.color = '#00fb6b';
    redirectMessage.style.backgroundColor = 'rgba(0, 251, 107, 0.1)';
    redirectMessage.style.border = '1px solid #00fb6b';
}

if (countdownElement) {
    countdownElement.style.color = '#00fb6b';
    countdownElement.style.fontWeight = 'bold';
}
