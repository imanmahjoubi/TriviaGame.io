var audioElement = document.createElement("audio");
var startScreen;
var gameHTML;
var counter = 30;
var soundArray = ["afghanistan","austria","bolivia","bulgaria","egypt","tunisia","guinea","peru"];
var questionArray = ["What is the capital of Afghanistan?", "How many language does Austria have?", "What is the capital of Bolivia?", "Who is the president of Bulgaria?", "What year the egyptian revolution started?", "Where Tunisia is located at??", "What is the first language in Guinea?", "How many provinces Peru has?"];
var answerArray = [["Ghazni", "Kabul", "Kandahar", "Adinapur"], ["1","2","3","4"], ["Pando", "Oruro", "Sucre", "Santa Cruz"], ["Korneliya Ninova","Boyko Borissov","Rumen Radev","Ognyan Gerdzhikov"], ["2009", "2011", "2012", "2014"], ["North Africa","South Asia","South America","Europe"], ["English", "Dutch", "Arabic", "French"], ["180","196","198","201"]];
var imageArray = ["<img class='center-block img-right' src='img/afghanistan.png'>", "<img class='center-block img-right' src='img/austria.png'>", "<img class='center-block img-right' src='img/bolivia.png'>", "<img class='center-block img-right' src='img/bulgaria.png'>", "<img class='center-block img-right' src='img/egypt.png'>", "<img class='center-block img-right' src='img/tunisia.png'>", "<img class='center-block img-right' src='img/guinea.png'>", "<img class='center-block img-right' src='img/peru.png'>"];
var correctAnswers = ["B. Kabul", "C. 3", "C. Sucre", "C. Rumen Radev", "B. 2011", "A. North Africa", "D. French", "B. 196"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");

$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	clickSound.play();
	generateHTML();

	timerWrapper();

});

$("body").on("click", ".answer", function(event){
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});

});

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);

}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateHTML() {
    audioElement.setAttribute("src", "sound/"+soundArray[questionCounter]+".mp3");
    audioElement.play();
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);

}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}
function mute() {
    audioElement.pause();
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}
