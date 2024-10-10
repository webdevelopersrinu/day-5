const questions = [
  {
    question: "Which of these option is correct about JavaScript ?",
    options: [
      { text: "Single Threaded Language", correct: true },
      { text: "Multi Threaded Language", correct: false },
      { text: "Asynchronous Language", correct: false },
      { text: "Limited to browser", correct: false },
    ],
  },

  {
    question:
      "What will be the output of the following code? <br><br> const sum = eval('10*10+5')",
    options: [
      { text: '"105"', correct: false },
      { text: "105", correct: true },
      { text: "TypeError", correct: false },
      { text: '"10*10+5"', correct: false },
    ],
  },

  {
    question:
      "The JavaScript global execution context creates two things for you: the global object, and the 'this' keyword.Is this statement true or false?",
    options: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "it depends", correct: false },
      { text: "independent", correct: false },
    ],
  },

  {
    question:
      "What will be the output of the following code? <br><br>console.log(typeof typeof 1);",
    options: [
      { text: '"number"', correct: false },
      { text: '"string"', correct: true },
      { text: '"object"', correct: false },
      { text: '"undefined"', correct: false },
    ],
  },

  {
    question: "Everything in JavaScript is either a...",
    options: [
      { text: "function or object", correct: false },
      { text: "trick question! only objects", correct: false },
      { text: "number or object", correct: false },
      { text: "primitive or object", correct: true },
    ],
  },

  {
    question:
      "What does setInterval() return ? <br><br>setInterval(() => console.log('Hi'), 1000);",
    options: [
      { text: "the amount of milliseconds specified", correct: false },
      { text: "a unique id", correct: true },
      { text: "the passed function", correct: false },
      { text: "undefined", correct: false },
    ],
  },

  {
    question: "What does JSON.parse() do ?",
    options: [
      { text: "Parses JSON to a JavaScript value", correct: true },
      { text: "Parses a JavaScript object to JSON", correct: false },
      { text: "Parses any JavaScript value to JSON", correct: false },
      { text: "Parses JSON to a JavaScript object only", correct: false },
    ],
  },

  {
    question: "What are the three phases of event propagation ?",
    options: [
      { text: "Target > Capturing > Bubbling", correct: false },
      { text: "Bubbling > Target > Capturing", correct: false },
      { text: "Target > Bubbling > Capturing", correct: false },
      { text: "Capturing > Target > Bubbling", correct: true },
    ],
  },

  {
    question:
      "What will be the output of the following code ? <br><br>let number = 0; <br>console.log(number++); <br>console.log(++number); <br>console.log(number);",
    options: [
      { text: "1 1 2", correct: false },
      { text: "1 2 2", correct: false },
      { text: "0 2 2", correct: true },
      { text: "0 1 2", correct: false },
    ],
  },

  {
    question:
      "What will be the output of the following code? <br><br>console.log(3 + 4 + '5');",
    options: [
      { text: '"345"', correct: false },
      { text: '"75"', correct: true },
      { text: "12", correct: false },
      { text: '"12"', correct: false },
    ],
  },
];

let questionElement = document.getElementById("question");
let answerBtns = document.getElementById("answer-btns");
let nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

let optionClass = [
  "shadow-xl",
  "bg-[#f5dada]",
  "px-3",
  "py-3",
  "rounded-xl",
  "text-center",
  "hover:text-white",
  "hover:bg-[#023047]",
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerHTML = option.text;
    btn.classList.add(...optionClass);
    answerBtns.appendChild(btn);
    if (option.correct) {
      btn.dataset.correct = option.correct;
    }
    btn.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.remove(
      "bg-[#f5dada]",
      "hover:text-white",
      "hover:bg-[#023047]"
    );

    selectedBtn.classList.add("bg-green-400");
    score++;
  } else {
    selectedBtn.classList.remove(
      "bg-[#f5dada]",
      "hover:text-white",
      "hover:bg-[#023047]"
    );
    selectedBtn.classList.add("bg-red-400");
  }
  Array.from(answerBtns.children).forEach((btn) => {
    btn.classList.remove(
      "bg-[#f5dada]",
      "hover:text-white",
      "hover:bg-[#023047]"
    );
    btn.classList.add("cursor-no-drop");
    if (btn.dataset.correct === "true") {
      btn.classList.add("bg-green-400");
    }
    btn.removeEventListener("click", selectAnswer);
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `your scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "play Again";
  nextBtn.style.display = "block";
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});
startQuiz();
