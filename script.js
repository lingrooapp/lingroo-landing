function goToApp() {
  window.location.href = "https://www.lingroo.de/";
}

function scrollToSection(id) {
  var el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// COOKIE BANNER
function initCookieBanner() {
  const consent = localStorage.getItem('cookie_consent');

  if (!consent) {
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'block';
  }
}

function acceptCookies() {
  localStorage.setItem('cookie_consent', 'accepted');
  hideCookieBanner();
}

function declineCookies() {
  localStorage.setItem('cookie_consent', 'declined');
  hideCookieBanner();
}

function hideCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.display = 'none';
}

// INIT
document.addEventListener('DOMContentLoaded', initCookieBanner);
