(function () {
  var temas = ['tema-espaco', 'tema-roxo', 'tema-verde'];
  var botoes = document.querySelectorAll('.tema-btn');

  function aplicarTema(tema) {
    temas.forEach(function (t) { document.body.classList.remove(t); });
    document.body.classList.add(tema);
    botoes.forEach(function (btn) {
      btn.classList.toggle('ativo', btn.dataset.tema === tema);
    });
    localStorage.setItem('tema-orbitrace', tema);
  }

  botoes.forEach(function (btn) {
    btn.addEventListener('click', function () { aplicarTema(btn.dataset.tema); });
  });

  var temaSalvo = localStorage.getItem('tema-orbitrace');
  if (temaSalvo && temas.indexOf(temaSalvo) !== -1) {
    aplicarTema(temaSalvo);
  }
})();
