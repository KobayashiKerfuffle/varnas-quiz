// Store the main elements in variables for easier reference.
const startBtn = document.getElementById('start-btn');
const questionContainer = document.querySelector('.quiz-section');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const timerEl = document.getElementById('timer'); // Updated to select the correct timer element.
const scoreSection = document.querySelector('.score-section');
const initialsInput = document.getElementById('initials');
const saveBtn = document.getElementById('save-score-btn'); // Updated the element ID to match the provided HTML.
const highScoresEl = document.getElementById('high-scores'); // Updated to select the correct high scores element.

// Questions and answers for the quiz
const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            'Hyper Text Markup Language',
            'High Technology Modern Language',
            'Hyperlinking Text Management Language',
            'Hyper Transfer Markup Language'
        ],
        correct: 'Hyper Text Markup Language'
    },
    {
        question: 'Which of the following is the correct way to comment out multiple lines in JavaScript?',
        answers: [
            '// This is a comment',
            '/* This is a comment */',
            '<!-- This is a comment -->',
            '- - This is a comment - -'
        ],
        correct: '/* This is a comment */'
    },
    {
        question: 'How do you declare a JavaScript variable?',
        answers: [
            'varName = "John"',
            'v name = "John"',
            'var name = "John"',
            'variable name = "John"'
        ],
        correct: 'var name = "John"'
    },
    {
        question: 'Which HTML tag is used to define an internal style sheet?',
        answers: [
            '<css>',
            '<style>',
            '<script>',
            '<stylesheet>'
        ],
        correct: '<style>'
    },
    {
        question: 'Which CSS property is used to set the background color of an element?',
        answers: [
            'bgcolor',
            'color',
            'background-color',
            'background'
        ],
        correct: 'background-color'
    },
    {
        question: 'How do you call a function named "myFunction" in JavaScript?',
        answers: [
            'call myFunction',
            'myFunction()',
            'call function myFunction()',
            'Execute myFunction()'
        ],
        correct: 'myFunction()'
    },
    {
        question: 'How can you add a comment in a CSS file?',
        answers: [
            '// This is a comment',
            '/* This is a comment */',
            '<!-- This is a comment -->',
            '- - This is a comment - -'
        ],
        correct: '/* This is a comment */'
    },
    {
        question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
        answers: [
            'longdesc',
            'description',
            'alt',
            'src'
        ],
        correct: 'alt'
    },
    {
        question: 'In JavaScript, what is the correct syntax for referring to an external script called "script.js"?',
        answers: [
            '<script href="script.js">',
            '<script source="script.js">',
            '<script ref="script.js">',
            '<script src="script.js">'
        ],
        correct: '<script src="script.js">'
    },
    {
        question: 'Which CSS unit is relative to the root element of a document?',
        answers: [
            'em',
            'px',
            'cm',
            'rem'
        ],
        correct: 'rem'
    }
];

let currentQuestionIndex = 0; // Keep track of the current question.
let timeLeft = 60; // 60 seconds for the quiz.

// When the "Start Quiz" button is clicked.
startBtn.addEventListener('click', function() {
    startQuiz();
});

function startQuiz() {
    // Initialize the quiz.
    startBtn.style.display = 'none'; // Hide start button.
    questionContainer.style.display = 'block'; // Display the question section.
    showQuestion(); // Display the first question.
    startTimer(); // Begin the timer countdown.
}

function showQuestion() {
    // Display the current question and its answer options.
    const question = questions[currentQuestionIndex];

    questionEl.textContent = question.question;
    answersEl.innerHTML = '';
    question.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.addEventListener('click', selectAnswer);
        const li = document.createElement('li'); // Create a list item for each button.
        li.appendChild(btn); // Append the button to the list item.
        answersEl.appendChild(li); // Append the list item to the answers list.
    });
}

function selectAnswer(e) {
    // Handle the selected answer.
    const selectedAnswer = e.target.textContent;
    if (selectedAnswer === questions[currentQuestionIndex].correct) {
        // Move to the next question if the answer is correct.
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz(); // End the quiz if all questions are answered.
        }
    } else {
        timeLeft -= 10; // Deduct 10 seconds for a wrong answer.
    }
}

function startTimer() {
    // Handle the countdown timer.
    const timer = setInterval(function() {
        timeLeft--; // Reduce time by 1 second.
        timerEl.textContent = `${timeLeft} seconds`; // Update the displayed timer.

        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timer); // Stop the timer when it reaches 0 or all questions are answered.
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    // End the quiz and show the score.
    questionContainer.style.display = 'none'; // Hide the question section.
    scoreSection.style.display = 'block'; // Display the score section.
    document.getElementById('score').textContent = timeLeft; // Display the final score.
}

// Save the score with initials when the save button is clicked.
saveBtn.addEventListener('click', function() {
    const initials = initialsInput.value;
    const score = {
        initials: initials,
        score: timeLeft
    };
    // Here, you'd typically save the score to local storage or a database.
    displayHighScores(score);
});

function displayHighScores(score) {
    // Display the saved high scores.
    scoreSection.style.display = 'none'; // Hide the score section.
    highScoresEl.style.display = 'block'; // Display the high scores section.

    // For this example, we're simply adding the current score to the list. In a real scenario, you'd retrieve all scores from storage.
    const li = document.createElement('li');
    li.textContent = `${score.initials}: ${score.score}`;
    highScoresEl.appendChild(li);
}
