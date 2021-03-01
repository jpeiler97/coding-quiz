var highScoreButton = document.querySelector('.high-scores');
var timeText = document.querySelector('.timer-text');
var startArea = document.querySelector('.start-area');
var startButton = document.querySelector('.start-button');
var quizArea = document.querySelector('.quiz-area');
var endArea = document.querySelector('.end-area');

var seconds = 5;

function startGame() {
	startArea.style.display = 'none';
	quizArea.style.display = 'block';
	timeText.textContent = seconds;
	setTime();
}

function endGame() {
	quizArea.style.display = 'none';
	endArea.style.display = 'block';
}

function setTime() {
	var timeInterval = setInterval(function() {
		seconds--;
		timeText.textContent = seconds;

		if (seconds === 0) {
			clearInterval(timeInterval);
			endGame();
		}
	}, 1000);
}

startButton.addEventListener('click', startGame);
