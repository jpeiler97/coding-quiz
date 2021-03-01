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
var seconds = 60;
//Number question in index
var questionIndex = 0;

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

	for (i = 0; i < answers.length; i++) {
		answerChoices.children[i].textContent = answers[i];
		answerChoices.children[i].addEventListener('click', checkQuestion);
	}
}

function checkQuestion() {
	if (questionIndex < questions.length - 1) {
		if (event.target.textContent === questions[questionIndex].answer) {
			correctText.textContent = 'Correct!';
			console.log('correct');
			questionIndex++;
			getQuestion();
		} else if (event.target.textContent !== questions[questionIndex].answer) {
			correctText.textContent = 'Incorrect!';
			console.log('incorrect');
			seconds -= 10;
			questionIndex++;
			getQuestion();
		}
	} else if (questionIndex === questions.length - 1) {
		endGame();
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
