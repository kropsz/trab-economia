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

// Dados do Quiz
const quizData = [
  {
    question: 'Pergunta 1?',
    options: ['Resposta A', 'Resposta B', 'Resposta C', 'Resposta D'],
    correctAnswer: 0,
    selectedAnswer: null,
    explanation: 'Explicação da resposta correta para a pergunta 1.'
  },
  {
    question: 'Pergunta 2?',
    options: ['Resposta A', 'Resposta B', 'Resposta C', 'Resposta D'],
    correctAnswer: 1,
    selectedAnswer: null,
    explanation: 'Explicação da resposta correta para a pergunta 2.'
  },
  {
    question: 'Pergunta 3?',
    options: ['Resposta A', 'Resposta B', 'Resposta C', 'Resposta D'],
    correctAnswer: 2,
    selectedAnswer: null,
    explanation: 'Explicação da resposta correta para a pergunta 3.'
  },
];
