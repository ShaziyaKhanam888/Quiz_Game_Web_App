const quesJSON = [
  {
    question: "HTML stands for?",
    correctAnswer: "HyperText Markup Language",
    options: [
      "Hyperlink Markup Language",
      "Hypertext language",
      "HyperText Markup Language",
      "TextLanguage",
    ],
  },
  {
    question: "Which tag is used for inserting a line break in HTML?",
    correctAnswer: "<br>",
    options: ["<break>", "<lb>", "<br>", "<hr>"],
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    correctAnswer: "style",
    options: ["class", "style", "styles", "font"],
  },
  {
    question: "What does CSS stand for?",
    correctAnswer: "Cascading Style Sheets",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
    ],
  },
  {
    question: "Which property is used to change the background color?",
    correctAnswer: "background-color",
    options: ["color", "bgcolor", "background-color", "background"],
  },
  {
    question: "How do you add a comment in CSS?",
    correctAnswer: "/* comment */",
    options: ["// comment", "<!-- comment -->", "/* comment */", "' comment"],
  },
  {
    question: "What does JS stand for?",
    correctAnswer: "JavaScript",
    options: ["JavaSyntax", "JavaSource", "JavaScript", "JavaServer"],
  },
  {
    question: "How do you create a function in JavaScript?",
    correctAnswer: "function myFunction()",
    options: [
      "function:myFunction()",
      "function = myFunction()",
      "function myFunction()",
      "function => myFunction()",
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    correctAnswer: "=",
    options: ["-", "=", "*", "/"],
  },
  {
    question: "How do you call a function named 'myFunction'?",
    correctAnswer: "myFunction()",
    options: [
      "call myFunction()",
      "myFunction()",
      "call function myFunction()",
      "Call.myFunction()",
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    correctAnswer: "onclick",
    options: ["onmouseclick", "onchange", "onclick", "onmouseover"],
  },
  {
    question: "How do you declare a JavaScript variable?",
    correctAnswer: "var x;",
    options: ["variable x;", "var x;", "v x;", "x variable;"],
  },
  {
    question: "Which method converts JSON data to a JavaScript object?",
    correctAnswer: "JSON.parse()",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.object()",
      "JSON.convert()",
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    correctAnswer: "alert('Hello World');",
    options: [
      "msg('Hello World');",
      "alertBox('Hello World');",
      "alert('Hello World');",
      "msgBox('Hello World');",
    ],
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    correctAnswer: "<style>",
    options: ["<script>", "<style>", "<css>", "<link>"],
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    correctAnswer: "color",
    options: ["text-color", "font-color", "color", "fgcolor"],
  },
  {
    question: "How do you select elements with the class name 'test'?",
    correctAnswer: ".test",
    options: ["#test", ".test", "test", "*test"],
  },
  {
    question: "Which property is used to change the font of an element?",
    correctAnswer: "font-family",
    options: ["font-style", "font-weight", "font-family", "font"],
  },
  {
    question: "Which value is the default for the position property?",
    correctAnswer: "static",
    options: ["relative", "absolute", "fixed", "static"],
  },
  {
    question: "Which CSS property controls the text size?",
    correctAnswer: "font-size",
    options: ["text-style", "font-style", "font-size", "text-size"],
  },
];

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 60; // seconds

// Accessing elements
const startBtn = document.getElementById("start");
const exitBtn = document.getElementById("exit-quiz");
const startQuiz = document.getElementById("start-quiz");
const rules = document.getElementById("some-rules");
const questions = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score");
const timerElement = document.getElementById("time");

// Hide rules and next button initially
rules.style.display = "none";
nextBtn.style.display = "none";
document.getElementById("timer").style.display = "none";

// Start button click event
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  rules.style.display = "block";
});

// Exit quiz button click event
exitBtn.addEventListener("click", () => {
  startBtn.style.display = "block";
  rules.style.display = "none";
});

// Start quiz button click event
startQuiz.addEventListener("click", () => {
  rules.style.display = "none";
  document.getElementById("timer").style.display = "flex";
  displayQuestion();
  startTimer();
});

// Function to display the current question and options
function displayQuestion() {
  if (currentQuestion >= quesJSON.length) {
    endQuiz();
    return;
  }

  // Destructure the current question object
  const { question, options } = quesJSON[currentQuestion];

  // Clear previous content
  questions.innerHTML = "";
  optionsContainer.innerHTML = "";

  // Create and append question element
  const questionElement = document.createElement("h3");
  questionElement.textContent = `Q.${currentQuestion + 1} ${question}`;
  questions.appendChild(questionElement);

  // Create and append option buttons
  options.forEach((option) => {
    const optionBtn = document.createElement("button");
    optionBtn.textContent = option;
    optionBtn.classList.add("option-btn");
    optionsContainer.appendChild(optionBtn);

    // Add click event to option buttons
    optionBtn.addEventListener("click", () => {
      if (option === quesJSON[currentQuestion].correctAnswer) {
        optionBtn.classList.add("correct");
        score++;
      } else {
        optionBtn.classList.add("incorrect");
      }
      nextBtn.style.display = "block";
      disableOptions();
    });
  });
}

// Function to disable options after selection
function disableOptions() {
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach((btn) => {
    btn.disabled = true;
  });
}

// Function to start the timer
function startTimer() {
  let timeLeft = timeLimit;
  timerElement.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (currentQuestion < quesJSON.length) {
        // If quiz is still in progress, end it
        endQuiz("Time Up! Quiz Completed");
      }
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz(message = "Quiz Completed!") {
  questions.innerHTML = `<h3>${message}</h3>`;
  document.getElementById("timer").style.display = "none";
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";
  scoreContainer.innerHTML = `Your Score: ${score} / ${quesJSON.length}`;
}

// Next button click event
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion >= quesJSON.length) {
    endQuiz();
  } else {
    displayQuestion();
    nextBtn.style.display = "none";
  }
});
