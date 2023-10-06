function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Madrid", "London", "Paris", "Berlin"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the capital of Odisha?",
    options: ["Bhubaneswar", "Puri", "Delhi", "Saturn"],
    correctAnswer: "Bhubaneswar",
  },
  {
    question: "What is the capital of ?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
    correctAnswer: "Mitochondria",
  },
  {
    question: "Jeff Bezos is the founder of which billion dollar company?",
    options: ["Amazon", "Tesla", "Subway", "Apple"],
    correctAnswer: "Amazon",
  },
  {
    question: "Which of the following is the capital of India?",
    options: ["Bhubaneswar", "New Delhi", "Panaji", "Mumbai"],
    correctAnswer: "New Delhi",
  },
  {
    question: "What is the capital of America?",
    options: ["Newyork", "Washington DC", "Texas", "Berlin"],
    correctAnswer: "Washington DC",
  },
];

shuffleArray(questions);

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const restartButton = document.getElementById("restart");
const timerContainer = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timeRemaining = 30;
let timerInterval;

function startTimer() {
  timerContainer.innerHTML = `
        <div class="timer-container">
            <div class="timer" id="timer-${currentQuestion}"></div>
            <div class="progress-container">
                <div class="progress-bar" id="progress-bar-${currentQuestion}"></div>
            </div>
        </div>
    `;

  let timerElement = document.getElementById(`timer-${currentQuestion}`);
  let progressBarElement = document.getElementById(
    `progress-bar-${currentQuestion}`
  );

  timerInterval = setInterval(() => {
    timeRemaining--;
    timerElement.innerText = `${timeRemaining}s`;
    progressBarElement.style.width = `${(timeRemaining / 20) * 100}%`;

    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      showNext();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeRemaining = 30;
  timerContainer.innerText = `Time remaining: ${timeRemaining} seconds`;
}

function buildQuiz() {
  startTimer();
  const question = questions[currentQuestion];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = `<h2>Question ${currentQuestion + 1}: ${
    question.question
  }</h2>`;

  question.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="question${currentQuestion}" value="${option}"> ${option}<br>`;
    questionDiv.appendChild(label);
  });

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionDiv);

  nextButton.disabled = currentQuestion === questions.length - 1;
  prevButton.disabled = currentQuestion === 0;
}

function showResults() {
  resetTimer();
  const answerContainers = quizContainer.querySelectorAll(".question");
  const selector = `input[name=question${currentQuestion}]:checked`;
  const userAnswer = (answerContainers[0].querySelector(selector) || {}).value;

  if (userAnswer === questions[currentQuestion].correctAnswer) {
    score++;
  } else {
    displayFinalResults();
  }
}

function displayFinalResults() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  nextButton.style.display = "none";
  prevButton.style.display = "none";
  timerContainer.style.display = "none";
  resultsContainer.innerHTML = `You got ${score} out of ${questions.length} questions correct.`;
  resultsContainer.style.display = "block";
  restartButton.style.display = "block";
}

submitButton.addEventListener("click", showResults);
nextButton.addEventListener("click", showNext);
prevButton.addEventListener("click", showPrevious);
restartButton.addEventListener("click", restartQuiz);

function showNext() {
  resetTimer();
  const answerContainers = quizContainer.querySelectorAll(".question");
  const selector = `input[name=question${currentQuestion}]:checked`;
  const userAnswer = (answerContainers[0].querySelector(selector) || {}).value;
  if (userAnswer === questions[currentQuestion].correctAnswer) {
    score++;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    buildQuiz();
  } else {
    displayFinalResults();
  }
}

function showPrevious() {
  resetTimer();
  if (currentQuestion > 0) {
    currentQuestion--;
    buildQuiz();
  }
}

function restartQuiz() {
  resetTimer();
  currentQuestion = 0;
  score = 0;
  shuffleArray(questions);
  buildQuiz();
  resultsContainer.style.display = "none";
  quizContainer.style.display = "block";
  submitButton.style.display = "block";
  nextButton.style.display = "block";
  prevButton.style.display = "block";
  restartButton.style.display = "none";
  timerContainer.style.display = "block";
}

buildQuiz();


