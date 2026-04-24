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
