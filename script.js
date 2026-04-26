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

function demoAnswer(btn, isCorrect, message) {
  const card = btn.closest('.demo-card');
  const feedback = card.querySelector('.demo-feedback');

  card.querySelectorAll('button').forEach(function (b) {
    b.disabled = true;
    b.classList.remove('demo-good', 'demo-bad');
  });

  btn.classList.add(isCorrect ? 'demo-good' : 'demo-bad');

  feedback.innerHTML = message || (isCorrect
    ? 'Richtig! +5 XP'
    : 'Nicht ganz. Schau dir die richtige Lösung an.');

  feedback.style.display = 'block';
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
