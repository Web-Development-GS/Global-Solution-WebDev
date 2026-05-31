(function () {
  var perguntas = [
    {
      pergunta: 'Quantos detritos espaciais são rastreados atualmente pela NORAD?',
      opcoes: ['~5.000', '~27.000', '~100.000', '~1.000.000'],
      correta: 1
    },
    {
      pergunta: 'Qual é o nome do primeiro satélite 100% projetado e fabricado no Brasil?',
      opcoes: ['CBERS-4A', 'SCD-2', 'Amazonia-1', 'SGDC-1'],
      correta: 2
    },
    {
      pergunta: 'A que altitude (aproximada) o satélite CBERS-4A opera em sua órbita polar?',
      opcoes: ['200 km', '400 km', '628 km', '1.200 km'],
      correta: 2
    },
    {
      pergunta: 'Qual algoritmo padrão da NORAD é usado para calcular a posição orbital de detritos?',
      opcoes: ['GPS4', 'SGP4', 'TLE1', 'LEO3'],
      correta: 1
    },
    {
      pergunta: 'Qual é a velocidade média dos detritos em órbita terrestre baixa (LEO)?',
      opcoes: ['1.000 km/h', '5.000 km/h', '27.000 km/h', '50.000 km/h'],
      correta: 2
    },
    {
      pergunta: 'Qual é o custo anual estimado de uma licença do STK, ferramenta americana concorrente ao Orbitrace?',
      opcoes: ['US$ 2.000', 'US$ 5.000', 'US$ 20.000+', 'US$ 100.000+'],
      correta: 2
    },
    {
      pergunta: 'Em que ano o satélite Amazonia-1 foi lançado ao espaço?',
      opcoes: ['2015', '2018', '2021', '2023'],
      correta: 2
    },
    {
      pergunta: 'O que significa a sigla TLE, utilizada no rastreamento de objetos orbitais?',
      opcoes: [
        'Tipo de Lançamento Espacial',
        'Two-Line Element',
        'Transmissão de Localização Espacial',
        'Terminal de Leitura de Estrelas'
      ],
      correta: 1
    },
    {
      pergunta: 'A qual ODS (Objetivo de Desenvolvimento Sustentável) da ONU o Orbitrace está alinhado?',
      opcoes: ['ODS 7 — Energia Limpa', 'ODS 9 — Indústria e Inovação', 'ODS 11 — Cidades Sustentáveis', 'ODS 13 — Ação Climática'],
      correta: 1
    },
    {
      pergunta: 'Qual fonte pública e gratuita de dados TLE o Orbitrace utiliza para calcular riscos de colisão?',
      opcoes: ['NASA Open Data Portal', 'Celestrak / Space-Track', 'ESA EO Browser', 'INPE DataCatalog'],
      correta: 1
    }
  ];

  var atual = 0;
  var acertos = 0;
  var respondeu = false;

  var elPergunta      = document.getElementById('quiz-pergunta');
  var elOpcoes        = document.getElementById('quiz-opcoes');
  var elProgresso     = document.getElementById('quiz-progresso-texto');
  var elPontos        = document.getElementById('quiz-pontos-texto');
  var elBarra         = document.getElementById('quiz-barra');
  var elResultado     = document.getElementById('quiz-resultado');
  var elResultTitulo  = document.getElementById('quiz-resultado-titulo');
  var elResultDesc    = document.getElementById('quiz-resultado-desc');
  var elReiniciar     = document.getElementById('quiz-reiniciar');
  var elPerguntaBox   = document.getElementById('quiz-pergunta-box');

  if (!elPergunta) return;

  function renderPergunta() {
    var q = perguntas[atual];
    respondeu = false;
    elProgresso.textContent = 'Pergunta ' + (atual + 1) + ' de ' + perguntas.length;
    elPontos.textContent = acertos + (acertos !== 1 ? ' acertos' : ' acerto');
    elBarra.style.width = ((atual / perguntas.length) * 100) + '%';
    elPergunta.textContent = q.pergunta;
    elOpcoes.innerHTML = '';
    q.opcoes.forEach(function (op, i) {
      var btn = document.createElement('button');
      btn.className = 'quiz-opcao';
      btn.textContent = op;
      btn.addEventListener('click', function () { responder(i); });
      elOpcoes.appendChild(btn);
    });
  }

  function responder(idx) {
    if (respondeu) return;
    respondeu = true;
    var q = perguntas[atual];
    var btns = elOpcoes.querySelectorAll('.quiz-opcao');
    btns[q.correta].classList.add('correta');
    if (idx !== q.correta) {
      btns[idx].classList.add('errada');
    } else {
      acertos++;
    }
    elPontos.textContent = acertos + (acertos !== 1 ? ' acertos' : ' acerto');

    setTimeout(function () {
      atual++;
      if (atual < perguntas.length) {
        renderPergunta();
      } else {
        mostrarResultado();
      }
    }, 1200);
  }

  function mostrarResultado() {
    elPerguntaBox.style.display = 'none';
    elResultado.style.display = 'block';
    elBarra.style.width = '100%';
    elProgresso.textContent = 'Quiz concluído!';
    elPontos.textContent = acertos + ' de ' + perguntas.length + ' acertos';

    var titulo, desc;
    if (acertos === 10) {
      titulo = 'Especialista em Detritos Espaciais!';
      desc = 'Parabéns! Você acertou todas as 10 perguntas. Domina o tema dos detritos orbitais e do programa espacial brasileiro.';
    } else if (acertos >= 7) {
      titulo = 'Ótimo conhecimento!';
      desc = 'Você acertou ' + acertos + ' de 10 perguntas. Boa performance! Tem um bom domínio sobre o Orbitrace e o espaço orbital.';
    } else if (acertos >= 4) {
      titulo = 'Conhecimento intermediário';
      desc = 'Você acertou ' + acertos + ' de 10 perguntas. Explore mais o conteúdo desta página para aprofundar seus conhecimentos!';
    } else {
      titulo = 'Continue aprendendo!';
      desc = 'Você acertou ' + acertos + ' de 10 perguntas. Role a página para aprender sobre os satélites brasileiros e os detritos espaciais.';
    }

    elResultTitulo.textContent = titulo;
    elResultDesc.textContent = desc;
  }

  if (elReiniciar) {
    elReiniciar.addEventListener('click', function () {
      atual = 0;
      acertos = 0;
      elPerguntaBox.style.display = 'block';
      elResultado.style.display = 'none';
      renderPergunta();
    });
  }

  renderPergunta();
})();
