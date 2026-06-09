(function () {
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.slide-dot');
  var btnPrev = document.getElementById('slide-prev');
  var btnNext = document.getElementById('slide-next');
  var slideshowEl = document.getElementById('slideshow-inner');
  var atual = 0;
  var intervalo;

  if (!slides.length) return;

  function mostrarSlide(idx) {
    slides[atual].classList.remove('ativo');
    if (dots[atual]) dots[atual].classList.remove('ativo');
    atual = (idx + slides.length) % slides.length;
    slides[atual].classList.add('ativo');
    if (dots[atual]) dots[atual].classList.add('ativo');
  }

  function iniciarAutoplay() {
    intervalo = setInterval(function () { mostrarSlide(atual + 1); }, 5000);
  }

  function reiniciarAutoplay() {
    clearInterval(intervalo);
    iniciarAutoplay();
  }

  if (btnPrev) btnPrev.addEventListener('click', function () { mostrarSlide(atual - 1); reiniciarAutoplay(); });
  if (btnNext) btnNext.addEventListener('click', function () { mostrarSlide(atual + 1); reiniciarAutoplay(); });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      mostrarSlide(parseInt(dot.dataset.idx, 10));
      reiniciarAutoplay();
    });
  });

  /* Teclado */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { mostrarSlide(atual - 1); reiniciarAutoplay(); }
    if (e.key === 'ArrowRight') { mostrarSlide(atual + 1); reiniciarAutoplay(); }
  });

  /* Touch / swipe */
  if (slideshowEl) {
    var touchX = 0;
    slideshowEl.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    slideshowEl.addEventListener('touchend', function (e) {
      var diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) mostrarSlide(atual + 1);
        else          mostrarSlide(atual - 1);
        reiniciarAutoplay();
      }
    }, { passive: true });
  }

  /* Pausar no hover */
  if (slideshowEl) {
    slideshowEl.addEventListener('mouseenter', function () { clearInterval(intervalo); });
    slideshowEl.addEventListener('mouseleave', iniciarAutoplay);
  }

  iniciarAutoplay();
})();
