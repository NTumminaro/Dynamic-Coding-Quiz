////////////////////////////////////////////////////////////////////////////////////////
// Query Selectors ////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var startBtn = document.querySelector("#start");
var endBtn = document.querySelector("#end");
var iEntry = document.querySelector("#iEntry");
var resultEl = document.querySelector("#result");
var scoreEl = document.querySelector("#score");

// starts the quiz at the first question, and starts the score at 0 /////////////////////////
var qNumber = 0;
var startingScore = 0;

////////////////////////////////////////////////////////////////////////////////////////
// Prompts ////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// Array that contains the test question, the answers, and the correct answer for multiple questions. ///////////////////////////
var prompts = [
    {
        test: "arrays in JavaScript can be used to store _____.",
        answers: [
            "numbers of strings",
            "other arrays",
            "booleans",
            "all of the above",
        ],
        correctAnswer: "all of the above",
    },

    {
        test: "Commonly used data types do not include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers",
        ],
        correctAnswer: "alerts",
    },

    {
        test: "The condition in an if / else statement is enclosed with _____.",
        answers: [
            "quotes",
            "curly brackets",
            "parenthesis",
            "square brackets",
        ],
        correctAnswer: "parenthesis",
    },

    {
        test: "string values must be enclosed within _____ when being assigned to variables",
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis",
        ],
        correctAnswer: "quotes",
    },

    {
        test: "A very useful tool used during development and debugging for printing content to the console is:",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log",
        ],
        correctAnswer: "console.log",
    }

];

////////////////////////////////////////////////////////////////////////////////////////
// Quiz Generator /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// Creates and populates the quiz with the information from the prompts array //////
function genQuiz(qNumber) {
    if (qNumber <= 4) {
        // Finds the correct question to put ///////////////////////////////////////////
        var question = prompts[qNumber];
        questionEl.textContent = question.test;
        // adds the answers with innerHTML to a string ///////////////////////////////
        var answerChoice = "";
        for (var i = 0; i < question.answers.length; i++) {
            // buttons for each answer choice //////////////////////////////////////
            answerChoice += "<li><button>" + question.answers[i] + "</button></li>"
        }
        // adds the answerChoice string under the answers Ul /////////////////////
        answersEl.innerHTML = answerChoice;
    } else {
        // If all the questions have been asked, or time runs out //////////////
        // Display the initials entry and the submit button ///////////////////
        questionEl.textContent = "You Finished the Quiz!";
        answersEl.style.display = "none";
        iEntry.style.display = "block";
    }
    // Increments the qNumber so the next questions populate /////////////////////
    qNumber++;
};

// This is the function that checks if the answer chosen matches the correctAnswer from the array /////////////////////////////////////////
function checkAnswer(index, selectedAnswer) {
    var correctAnswer = prompts[index].correctAnswer;
    return correctAnswer === selectedAnswer;
};

////////////////////////////////////////////////////////////////////////////////////////
// Answer checker /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// This calls the checkAnswer function when one of the four buttons is picked ///////////
answersEl.addEventListener("click", function(event){
    var target = event.target;
    // Checks to see if a button was clicked on, not the whole Ul //////////////////
    if (target.matches("button")) {
        // runs the checkAnswer function, with the argument of the current questions number, and the textContent of the button. //////////////////////////
        var correct = checkAnswer(qNumber, target.textContent);
        // if the checkAnswer function returns true, add points ////////////////////
        if (correct) {
            // Updates the score if the player is correct /////////////////////////
            var currentScore = startingScore + 100;
            scoreEl.textContent = currentScore;
            // Writes Correct! on the page if correct ///////////////////////////
            resultEl.textContent = "Correct!";
            // updates the starting score in Global ///////////////////////////
            startingScore = currentScore;
        // if it does not, do not add points, and subtract time ////////////////////
        } else {
            // If inccorect, subtract 5 from the second variable and write wrong to the page //////
            second = second - 5;
            resultEl.textContent = "Wrong...";
        }
    }
    // For some spaghetti code reason if I remove this increment, everything breaks ////////////
    qNumber++;
    genQuiz(qNumber);
});

////////////////////////////////////////////////////////////////////////////////////////
// Timer //////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// Sets a pseudo 30 seconds /////////////////////////////////////////////////////////
var second = 30;

function timer() {
    // every 1000 milliseconds, subtract one from the pseudo 30 seconds //////////
    second = second - 1;
    // If the seconds are less than 0, end the quiz /////////////////////////////
    if (second < 0) {
        genQuiz(5);
        return;
    }
    // set the text of the time element to the current second we are on ///////
    document.getElementById("time").innerHTML = second;

};

////////////////////////////////////////////////////////////////////////////////////////
// Start Button ///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

startBtn.addEventListener("click", function(event){
    // Add code to start timer 
    setInterval(timer, 1000);
    startBtn.style.display = "none";
    genQuiz(qNumber);
});

////////////////////////////////////////////////////////////////////////////////////////
// Save Score Button //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

endBtn.addEventListener("click", function(event){
    // Stop the button from doing its default action //////////////////////////////
    event.preventDefault();
    // run the saving Score function ////////////////////////////////////////////
    addToHighScore();
    // move you to the highscore page /////////////////////////////////////////
    window.location.href = "./highscores.html";
});

////////////////////////////////////////////////////////////////////////////////////////
// Saving Score ///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// sets the highscore array to be empty at first ///////////////////////////
var highScores = [];

function addToHighScore() {
    // grabs the text from the form input ////////////////////////////////
    var initials = iEntry.initials.value;
    // grabs the highscore //////////////////////////////////////////////
    var highScore = startingScore;
	// if there isn't a score list yet /////////////////////////////////
	if (localStorage.getItem("saved scores") === null){
		var highScoreString = JSON.stringify(highScores);
		localStorage.setItem("saved scores", highScoreString);
	};
	// Parse the score list and populates the empty highScore array ////////////////////////
	highScores = JSON.parse(localStorage.getItem("saved scores"));
	// sets maximum length of score list to 10 scores so you can't have too many //////////
	if (highScores.length <= 10) {
        // combines the initials from the form and the highscore into a string ///////////
		highScores.push(initials + " - " + highScore);
		var highScoreString = JSON.stringify(highScores);
        // adds it to the highScores array to the local storage ////////////////////////
		localStorage.setItem("saved scores", highScoreString);
	// if the score list is full, console log ////////////////////////////////////////
	} else {
		console.log("Too Many Highscores!");
	}
};
