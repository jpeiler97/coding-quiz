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

//Number of seconds to complete quiz
var seconds = 566;

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

//Array of questions that haven't been asked, questions removed each time they are asked
var currentQuestions = questions;

//Gets new question
function getQuestion() {
	//Gets a random index from the currentQuestions array
	var questionIndex = Math.floor(Math.random() * currentQuestions.length);

	//Displays random question from currentQuestions array
	var questionObject = currentQuestions[questionIndex];
	questionText.textContent = questionObject.question;

	var answers = questionObject.possibleAnswers;
	var correctAnswer = questionObject.answer;
	function spliceQuestion() {
		if ((currentQuestions.length = 0)) {
			return;
		} else {
			currentQuestions.splice(questionIndex, 1);
		}
	}
	function checkQuestion() {
		if (currentQuestions.length > 0) {
			if (event.target.textContent === correctAnswer) {
				correctText.textContent = 'Correct!';
				spliceQuestion();
				getQuestion();
			} else if (event.target.textContent !== correctAnswer) {
				correctText.textContent = 'Incorrect!';
				spliceQuestion();
				getQuestion();
			}
		} else {
			endGame();
		}
	}
	for (i = 0; i < answers.length; i++) {
		answerChoices.children[i].textContent = answers[i];
		answerChoices.children[i].addEventListener('click', checkQuestion);
	}
	//Removes question that has been displayed from currentQuestions
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
}

//Function to count down timer one second at a time
function setTime() {
	var timeInterval = setInterval(function() {
		seconds--;
		timeText.textContent = seconds;

		//Ends game when timer reaches 0
		if (seconds === 0) {
			clearInterval(timeInterval);
			endGame();
		}
	}, 1000);
}

//Starts game when user clicks start button
startButton.addEventListener('click', startGame);
