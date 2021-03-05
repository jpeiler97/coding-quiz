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
var highscoreArea = document.querySelector('.highscore-area');
var returnButton = document.querySelector('.return-button');

//Number of seconds to complete quizw
var seconds = 80;
//Number question in index
var questionIndex = 0;
//Score variable
var score = 0;

//Game over state
var gameOver = false;

//Array of objects representing questions and their answers
var questions = [
	{
		question: 'What does JSON stand for?',
		possibleAnswers: [
			'JavaScript Object Notation',
			'JQuery Selector Object Node',
			'Jason Says Oh No!',
			'Javascript Status: Object Null'
		],
		answer: 'JavaScript Object Notation'
	},
	{
		question: 'Which snippet of code would you use to define a variable as the first array element?',
		possibleAnswers: [ 'array{element: 1};', 'array = index[1];', 'var el = array[1];', 'var el = array[0];' ],
		answer: 'var el = array[0];'
	},
	{
		question: 'What does the Javascript keyword "this." mean?',
		possibleAnswers: [
			'It returns a random variable from the document.',
			'It accesses the method being used following the period.',
			'It refers to its parent object.',
			'It is not applicable to Javascript.'
		],
		answer: 'It refers to its parent object.'
	},
	{
		question: 'What is meant by the content between parentheses in a function declaration?',
		possibleAnswers: [
			'They represent a parameter to be used when the function is called.',
			'They are notes for developers for what goes inside the code.',
			'They represent a return value.',
			'They are defining a global variable.'
		],
		answer: 'They represent a parameter to be used when the function is called.'
	},
	{
		question: 'What is the difference between the === and == operators?',
		possibleAnswers: [
			'One compares booleans and the other compares numbers',
			'They both do the exact same thing.',
			'One compares both value and type, and the other compares value only',
			'One is compatible with IE7, the other is not.'
		],
		answer: 'One compares both value and type, and the other compares value only'
	},
	{
		question: 'What specification does Javascript conform to?',
		possibleAnswers: [ 'ECMAScript', 'HTML', 'Chromium', 'None of the Above' ],
		answer: 'ECMAScript'
	},
	{
		question: 'Which is the correct syntax for a for loop?',
		possibleAnswers: [
			'(for i = 0, i = array.length, i++);',
			'for i = 0, (i < array.length; i++);',
			'for (i = 0; i < array.length; i++);',
			'for{ i < array.length; i++};'
		],
		answer: 'for (i = 0; i < array.length; i++);'
	},
	{
		question: 'Which is the correct way to define an object?',
		possibleAnswers: [
			'var object = {element1: 1, element2: 2};',
			'var object(element1, element2) = 1, 2;',
			'object exampleObject = {element1: 1, element2: 2};',
			'var object = [element1: 1, element2: 2];'
		],
		answer: 'var object = {element1: 1, element2: 2};'
	},
	{
		question: 'How do you structure an if/else statement?',
		possibleAnswers: [
			'if apples === oranges, (doThing()), else (doNothing());',
			'if (apples !== oranges), (doThing()) or else (doNothing());',
			'if (apples !== oranges) { doThing(); } else { doNothing(); };',
			'if (apples !== oranges) = doThing() else doNothing();'
		],
		answer: 'if (apples !== oranges) { doThing(); } else { doNothing(); };'
	},
	{
		question: 'How do you link Javascript into an HTML file?',
		possibleAnswers: [
			'<script src= ".../script.js"></script>',
			'<link href= ".../script.js">',
			'<js src= "script.js"><js>',
			'The browser will automatically link it, no worries.'
		],
		answer: '<script src= ".../script.js"></script>'
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
	highScoreButton.style.display = 'none';
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
	//Sets boolean gameOver to true. setTime() will check if gameOver is true so that the
	//clock will reset if the game ends before the timer does
	gameOver = true;
}

//Function to count down timer one second at a time
function setTime() {
	var timeInterval = setInterval(function() {
		seconds--;
		timeText.textContent = seconds;

		//Ends game when timer reaches 0
		if (seconds <= 0 || gameOver) {
			endGame();
			clearInterval(timeInterval);
			seconds = 0;
			timeText.textContent = seconds;
		}
	}, 1000);
}

//Function to bring user back to starting screen
function resetGame() {
	endArea.style.display = 'none';
	highScoreButton.style.display = 'block';
	startArea.style.display = 'block';
	//Resets gameOver to false so the timer can start again
	gameOver = false;
	//Resets questionIndex and score for replay
	questionIndex = 0;
	score = 0;
	seconds = 80;
}

function addScore() {
	//Makes an empty object to store the high score and initials
	var highScore = {
		scoreValue: 0,
		initials: ''
	};

	//Sets values in highScore object based on user input and their score
	highScore.scoreValue = score;
	highScore.initials = initialsForm.value.toUpperCase();

	//Creates an empty array if there is no high scores in local storage, or gets the high scores if there is
	var highScores = JSON.parse(localStorage.getItem('highScores') || '[]');

	//Adds high score to array
	highScores.push(highScore);

	//Sets array with new score added to local storage
	localStorage.setItem('highScores', JSON.stringify(highScores));
}

//function to submit user score and initials
function submitScore() {
	addScore();
	//Returns to start screen upon score submission
	resetGame();
}
//Function to from the high score screen to the start screen
function startScreen() {
	highscoreArea.style.display = 'none';
	highScoreButton.style.display = 'block';
	startArea.style.display = 'block';
}

//Function to display scores in an ordered list
function viewScores() {
	startArea.style.display = 'none';
	highscoreArea.style.display = 'block';
	highScoreButton.style.display = 'none';

	//Stores scores from local storage in a new variable currentScores
	var currentScores = JSON.parse(localStorage.getItem('highScores'));

	//defines HTML element for list of scores as variable
	var scoreList = document.querySelector('.score-list');

	//Sorts currentScores from highest score to lowest
	currentScores.sort((a, b) => b.scoreValue - a.scoreValue);

	//adds currentScores to scoreList
	for (i = 0; i < currentScores.length; i++) {
		scoreList.children[i].textContent = `${currentScores[i].initials} --- Score: ${currentScores[i].scoreValue}`;
	}
}

//Button event listeners
startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', submitScore);
highScoreButton.addEventListener('click', viewScores);
returnButton.addEventListener('click', startScreen);
