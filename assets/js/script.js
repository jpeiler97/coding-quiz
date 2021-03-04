//QUERY SELECTORS
var highScoreButton = document.querySelector('.high-scores');
var timeText = document.querySelector('.timer-text');
var startArea = document.querySelector('.start-area');
var startButton = document.querySelector('.start-button');
var quizArea = document.querySelector('.quiz-area');
var endArea = document.querySelector('.end-area');
var questionText = document.querySelector('.question');
var correctText = document.querySelector('.correct-status');
var answerChoices = document.querySelector('.answer-choices');
var answerButton = document.querySelector('.answer');
var scoreText = document.querySelector('.score-text');
var submitButton = document.querySelector('.initials-submit');
var initialsForm = document.querySelector('.initials');

//Number of seconds to complete quiz
var seconds = 100;
//Number question in index
var questionIndex = 0;
//Score variable
var score = 0;

var highScores = [];

//Array of objects representing questions and their answers
var questions = [
	{
		question: 'What is 2+2?',
		possibleAnswers: [ '1', '5', '6', '4' ],
		answer: '4'
	},
	{
		question: 'What is the first letter?',
		possibleAnswers: [ 'A', 'C', 'Z', 'R' ],
		answer: 'A'
	},
	{
		question: 'What is my name?',
		possibleAnswers: [ 'JJ', 'JP', 'Bart', 'Zeus' ],
		answer: 'JP'
	}
];

//Gets new question
function getQuestion() {
	//Defines and displays question based on index
	var questionObject = questions[questionIndex];
	questionText.textContent = questionObject.question;

	//Gets answers and answer choices from questionObject to compare
	var answers = questionObject.possibleAnswers;

	//Fills buttons in game area with answers
	for (i = 0; i < answers.length; i++) {
		answerChoices.children[i].textContent = answers[i];
		answerChoices.children[i].addEventListener('click', checkQuestion);
	}
}

//Checks if answer selected is correct or incorrect, and if there are any questions left
function checkQuestion() {
	//Checks if there are no more questions, or if the timer ran out due to a question being wrong
	if (questionIndex === questions.length - 1 || seconds <= 0) {
		//Ensures the score gets incremented if the last question is correct
		if (event.target.textContent === questions[questionIndex].answer) {
			score++;
		}
		endGame();
	} else if (questionIndex < questions.length - 1) {
		//If there are questions left, this compares selected answer to actual answer
		//Upon selection of an answer, the index of the questions array is incremented by 1 to get the
		//next question in the array, the user is told if the answer is correct, and the next question is displayed.
		if (event.target.textContent === questions[questionIndex].answer) {
			correctText.textContent = 'Correct!';
			score++;
			questionIndex++;
			getQuestion();
		} else if (event.target.textContent !== questions[questionIndex].answer) {
			correctText.textContent = 'Incorrect!';
			seconds -= 10;
			questionIndex++;
			//Ensures that if the incorrect answer penalty causes the clock to go below zero, then the
			//next question will display.
			if (seconds > 0) {
				getQuestion();
			}
		}
	}
}

//Starts game by starting timer and showing first question
function startGame() {
	//Hides start section, displays quiz section
	startArea.style.display = 'none';
	quizArea.style.display = 'block';

	//Prevents first second on timer from not appearing on start
	timeText.textContent = seconds;

	//Starts timer and shows first question
	setTime();
	getQuestion();
}

//Ends game and shows game over section
function endGame() {
	quizArea.style.display = 'none';
	endArea.style.display = 'block';
	scoreText.textContent = score;
}

//Function to count down timer one second at a time
function setTime() {
	var timeInterval = setInterval(function() {
		seconds--;
		timeText.textContent = seconds;

		//Ends game when timer reaches 0
		if (seconds <= 0) {
			clearInterval(timeInterval);
			seconds = 0;
			timeText.textContent = seconds;
		}
	}, 1000);
}

function resetGame() {
	endArea.style.display = 'none';
	startArea.style.display = 'block';
	//Resets questionIndex and score for replay
	questionIndex = 0;
	score = 0;
	seconds = 0;
}

function submitScore() {
	var highScore = {
		scoreValue: 0,
		initials: ''
	};

	highScore.scoreValue = score;
	highScore.initials = initialsForm.value.toUpperCase();

	highScores.push(highScore);
	localStorage.setItem('High Scores', JSON.stringify(highScores));
	resetGame();
}

//Starts game when user clicks start button
startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', submitScore);
