(function () {
  var form = document.getElementById('form-contato');
  if (!form) return;

  function mostrarErro(campoId, erroId, mostrar) {
    var campo = document.getElementById(campoId);
    var erro = document.getElementById(erroId);
    if (campo) campo.classList.toggle('invalido', mostrar);
    if (erro) erro.style.display = mostrar ? 'block' : 'none';
  }

  function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
  }

  function validarCampos() {
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var assunto = document.getElementById('assunto');
    var mensagem = document.getElementById('mensagem');

    var v1 = nome && nome.value.trim().length > 0;
    var v2 = email && emailValido(email.value);
    var v3 = assunto && assunto.value !== '';
    var v4 = mensagem && mensagem.value.trim().length > 0;

    mostrarErro('nome', 'erro-nome', !v1);
    mostrarErro('email', 'erro-email', !v2);
    mostrarErro('assunto', 'erro-assunto', !v3);
    mostrarErro('mensagem', 'erro-mensagem', !v4);

    return v1 && v2 && v3 && v4;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validarCampos()) {
      form.style.display = 'none';
      var sucesso = document.getElementById('form-sucesso');
      if (sucesso) sucesso.style.display = 'block';
    }
  });

  ['nome', 'email', 'assunto', 'mensagem'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () { el.classList.remove('invalido'); });
    }
  });

  /* Auto-expand textarea */
  var textarea = document.getElementById('mensagem');
  if (textarea) {
    textarea.addEventListener('input', function () {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }
})();
