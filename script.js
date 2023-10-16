// JavaScript para lidar com o quiz
const quizForm = document.getElementById('quizForm');
const feedback = document.querySelector('.feedback');
const feedbackMessage = document.querySelector('.feedback-message');
const feedbackExplanation = document.querySelector('.feedback-explanation');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const options = document.querySelectorAll('.custom-radio');

let currentQuestion = 0;
let score = 0;

function showQuestion(questionNumber) {
  options.forEach(option => {
    option.classList.remove('selected');
  });

  const currentQuizData = quizData[questionNumber];
  const question = currentQuizData.question;
  const optionsHTML = currentQuizData.options
    .map(
      (option, index) => `
      <label class="custom-radio">
        <input type="radio" name="answer" value="${index}">
        <span class="option-label">${option}</span>
      </label>
    `
    )
    .join('');

  quizForm.innerHTML = `
    <h2>${question}</h2>
    ${optionsHTML}
    <button type="submit">Enviar Resposta</button>
  `;

  const selectedOption = document.querySelector(
    `input[name="answer"][value="${currentQuizData.selectedAnswer}"]`
  );
  if (selectedOption) {
    selectedOption.checked = true;
    selectedOption.parentElement.classList.add('selected');
    selectedOption.addEventListener('selected', addBlobAnimation);
  }

  if (questionNumber === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.disabled = false;
  }

  if (questionNumber === quizData.length - 1) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
}

function showFeedback() {
  const currentQuizData = quizData[currentQuestion];
  const selectedOption = document.querySelector(
    `input[name="answer"][value="${currentQuizData.selectedAnswer}"]`
  );
  const correctOption = document.querySelector(
    `input[name="answer"][value="${currentQuizData.correctAnswer}"]`
  );

  options.forEach(option => {
    option.removeEventListener('mouseover', addBlobAnimation);
    option.removeEventListener('mouseout', removeBlobAnimation);
  });

  feedback.style.display = 'block';
  if (currentQuizData.selectedAnswer === currentQuizData.correctAnswer) {
    feedbackMessage.textContent = 'Resposta correta!';
    feedbackMessage.style.color = 'green';
    score++;
  } else {
    feedbackMessage.textContent = 'Resposta incorreta!';
    feedbackMessage.style.color = 'red';
    selectedOption.parentElement.classList.add('selected-wrong');
    feedbackExplanation.style.display = 'block';
    feedbackExplanation.textContent = `Explicação da resposta correta: ${currentQuizData.explanation}`;
  }

  correctOption.parentElement.classList.add('selected-correct');
}

function addBlobAnimation() {
  this.classList.add('blob');
}

function removeBlobAnimation() {
  this.classList.remove('blob');
}

quizForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedOption = document.querySelector(
    `input[name="answer"]:checked`
  );

  if (selectedOption) {
    quizData[currentQuestion].selectedAnswer = parseInt(
      selectedOption.value
    );

    options.forEach(option => {
      option.classList.remove('selected');
    });

    selectedOption.parentElement.classList.add('selected');
    showFeedback();
  }
});

btnPrev.addEventListener('click', function () {
  currentQuestion--;
  feedback.style.display = 'none';
  feedbackExplanation.style.display = 'none';
  showQuestion(currentQuestion);
});

btnNext.addEventListener('click', function () {
  currentQuestion++;
  feedback.style.display = 'none';
  feedbackExplanation.style.display = 'none';
  showQuestion(currentQuestion);
});


options.forEach(option => {
  option.addEventListener('mouseover', addBlobAnimation);
  option.addEventListener('mouseout', removeBlobAnimation);
}); 

function redirectToHome() {
  window.location.href = "index.html"; // Substitua pela URL da sua página inicial
}



// Dados do Quiz
const quizData = [
  {
    question: 'Como as empresas em um mercado de concorrência monopolística tentam se destacar?',
    options: ['Oferecendo produtos idênticos aos concorrentes', 'Praticando preços baixos', 'Diferenciando seus produtos', 'Reduzindo a produção'],
    correctAnswer: 2,
    selectedAnswer: null,
    explanation: 'Empresas em concorrência monopolística tentam se destacar oferecendo produtos diferenciados para atrair os consumidores.'
  },
  {
    question: 'Como o poder de negociação é distribuído em um monopsônio?',
    options: ['Os vendedores têm mais poder de negociação', 'O poder de negociação é igual entre vendedores e compradores', 'O comprador tem mais poder de negociação', 'O poder de negociação é determinado pelo governo'],
    correctAnswer: 2,
    selectedAnswer: null,
    explanation: ' No monopsônio, o comprador único possui considerável poder de negociação devido à falta de alternativas para os vendedores.'
  },
  {
    question: 'Quais são algumas das barreiras à entrada que podem contribuir para a formação de um mercado de monopólio?  ',
    options: ['Concorrência intensa e produtos homogêneos', 'Muitas empresas competindo e diferenciação de produtos', 'Alta demanda e baixa oferta', ' Controle exclusivo de recursos e tecnologia, além de regulamentações governamentais'],
    correctAnswer: 3,
    selectedAnswer: null,
    explanation: 'Barreiras à entrada, como o controle exclusivo de recursos, tecnologia e regulamentações governamentais favoráveis, podem permitir a formação de um mercado de monopólio.'
  },
  {
    question: 'O que é um exemplo de um mercado de oligopólio? ',
    options: ['Mercado de agricultura local com muitos produtores independentes', 'Mercado de fabricantes de automóveis com algumas empresas dominantes', 'Mercado de pequenas lojas de conveniência em uma cidade', ' Mercado de vendedores ambulantes em um parque'],
    correctAnswer: 1,
    selectedAnswer: null,
    explanation: 'O mercado de fabricantes de automóveis frequentemente é caracterizado por um pequeno número de empresas dominantes que influenciam as decisões do mercado, configurando um oligopólio.'
  },
  {
    question: 'Em qual estrutura de mercado existem muitos vendedores e produtos homogêneos? ',
    options: [' Concorrência perfeita ', 'Concorrência monopolística', 'Monopsônio ', ' Oligopólio '],
    correctAnswer: 0,
    selectedAnswer: null,
    explanation: ' A concorrência perfeita é caracterizada por muitos vendedores que oferecem produtos idênticos (homogêneos) e nenhum deles tem controle significativo sobre o preço.'
  },
  {
    question: 'No mercado de um medicamento patenteado, uma única empresa detém os direitos exclusivos de produção e venda desse medicamento. Em qual mercado esse cenário se enquadra?    ',
    options: [' Oligopólio ', 'Monopólio ', 'Concorrência Monopolística ', ' Monopsônio '],
    correctAnswer: 1,
    selectedAnswer: null,
    explanation: ' Um medicamento patenteado é um exemplo clássico de monopólio, onde uma única empresa possui o controle exclusivo sobre a produção e venda desse produto.'
  },
];


const btnInicio = document.querySelector('.btn-inicio');

btnInicio.addEventListener('click', redirectToHome);


function showFinalMessage() {
  const container = document.querySelector('.container');
  
  const finalMessage = document.createElement('div');
  finalMessage.classList.add('final-message');

  const scoreMessage = document.createElement('p');
  scoreMessage.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;

  const message = document.createElement('p');
  if (score === quizData.length) {
    message.textContent = "Parabéns! Você acertou todas as perguntas!";
  } else {
    message.textContent = "Quiz finalizado. Obrigado por participar!";
  }

  const btnInicio = document.createElement('button');
  btnInicio.textContent = 'Voltar à Página Inicial';
  btnInicio.classList.add('btn-inicio');
  btnInicio.addEventListener('click', redirectToHome);

  finalMessage.appendChild(scoreMessage);
  finalMessage.appendChild(message);
  finalMessage.appendChild(btnInicio);

  container.innerHTML = ''; // Limpa o conteúdo atual
  container.appendChild(finalMessage);
}

quizForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedOption = document.querySelector(
    `input[name="answer"]:checked`
  );

  if (selectedOption) {
    quizData[currentQuestion].selectedAnswer = parseInt(
      selectedOption.value
    );

    options.forEach(option => {
      option.classList.remove('selected');
    });

    selectedOption.parentElement.classList.add('selected');
    showFeedback();

    if (currentQuestion === quizData.length - 1) {
      showFinalMessage();
    }
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Embaralhar as perguntas antes de iniciar o quiz
shuffleArray(quizData);



// Exibe a primeira pergunta ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  showQuestion(currentQuestion);
});



