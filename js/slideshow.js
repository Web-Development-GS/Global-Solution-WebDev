(function () {
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.slide-dot');
  var btnPrev = document.getElementById('slide-prev');
  var btnNext = document.getElementById('slide-next');
  var atual = 0;
  var intervalo;

  if (!slides.length) return;

  function mostrarSlide(idx) {
    slides.forEach(function (s) { s.classList.remove('ativo'); });
    dots.forEach(function (d) { d.classList.remove('ativo'); });
    atual = (idx + slides.length) % slides.length;
    slides[atual].classList.add('ativo');
    if (dots[atual]) dots[atual].classList.add('ativo');
  }

  function iniciarAutoplay() {
    intervalo = setInterval(function () { mostrarSlide(atual + 1); }, 4000);
  }

  function reiniciarAutoplay() {
    clearInterval(intervalo);
    iniciarAutoplay();
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () { mostrarSlide(atual - 1); reiniciarAutoplay(); });
  }
  if (btnNext) {
    btnNext.addEventListener('click', function () { mostrarSlide(atual + 1); reiniciarAutoplay(); });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      mostrarSlide(parseInt(dot.dataset.idx, 10));
      reiniciarAutoplay();
    });
  });

  iniciarAutoplay();
})();
