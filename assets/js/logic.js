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
  

  // clear out any old question choices
  

  // loop over choices

    // create new button for each choice
 

    // display on the page
   
  
}

function questionClick(event) {
  

  // if the clicked element is not a choice button, do nothing.
 
  // check if user guessed wrong
  
    // penalize time
 

    // display new time on page


    // play "wrong" sound effect
   

  //else 
    // play "right" sound effect
   

  // flash right/wrong feedback on page for half a second

  // move to next question


  // check if we've run out of questions

}

function quizEnd() {
  // stop timer
  

  // show end screen


  // show final score


  // hide questions section

}

function clockTick() {
  // update time

  // check if user ran out of time
  
}

function saveHighscore() {
  // get value of input box
 

  // make sure value wasn't empty
 
    // get saved scores from localstorage, or if not any, set to empty array
   

    // format new score object for current user
    

    // save to localstorage
  

    // redirect to next page
   
  
}

function checkForEnter(event) {
  // "13" represents the enter key

}

// user clicks button to submit initials


// user clicks button to start quiz


// user clicks on element containing choices



