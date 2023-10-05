// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var startButton = document.getElementById("start");
var questionContainer = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var timeEl = document.getElementById("time");
var endScreen = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
var submitButton = document.getElementById("submit");
var feedbackEl = document.getElementById("feedback");  // Assuming there's a feedback element in the HTML

function startQuiz() {
  // hide start screen
  document.getElementById("start-screen").classList.add("hide");
  
  // un-hide questions section
  questionContainer.classList.remove("hide");
  
  // start timer
  timerId = setInterval(clockTick, 1000);
  
  // show starting time
  timeEl.textContent = time;
  
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  
  // update title with current question
  questionTitle.textContent = currentQuestion.title;
  
  // clear out any old question choices
  choicesEl.innerHTML = "";
  
  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);
    choiceButton.textContent = choice;
    choiceButton.onclick = questionClick;
    
    // display on the page
    choicesEl.appendChild(choiceButton);
  })
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    
    // display new time on page
    timeEl.textContent = time;
    
    // play "wrong" sound effect (assuming you have a wrong.mp3 file)
    var wrongSound = new Audio('assets/sounds/wrong.mp3');
    wrongSound.play();
    
    // flash wrong feedback
    feedbackEl.textContent = "Wrong!";
    feedbackEl.classList.remove("hide");
    setTimeout(function() {
      feedbackEl.classList.add("hide");
    }, 1000);  // hide after 1 second
  } else {
    // play "right" sound effect (assuming you have a right.mp3 file)
    var rightSound = new Audio('assets/sounds/right.mp3');
    rightSound.play();
    
    // flash right feedback
    feedbackEl.textContent = "Right!";
    feedbackEl.classList.remove("hide");
    setTimeout(function() {
      feedbackEl.classList.add("hide");
    }, 1000);  // hide after 1 second
  }

  // display feedback for half a second
  setTimeout(function() {
    feedbackEl.textContent = '';
  }, 500);
  
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  endScreen.classList.remove("hide");

  // show final score
  finalScoreEl.textContent = time;

  // hide questions section
  questionContainer.classList.add("hide");
}

function clockTick() {
  // update time
  time--;
  timeEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = document.getElementById("initials").value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to an empty array
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page (assuming a highscores.html page)
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.keyCode === 13) {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitButton.onclick = saveHighscore;

// user clicks button to start quiz
startButton.onclick = startQuiz;
