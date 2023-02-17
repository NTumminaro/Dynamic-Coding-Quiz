////////////////////////////////////////////////////////////////////////////////////////
// HighScore List /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// grabbing the Ul that will be populated by the scores //////////////////////
var scoresUl = document.getElementById("scores");
// parses the local storage of highscores into an array ////////////////////
var highScoreList = JSON.parse(localStorage.getItem("saved scores"));

// Creates the list items of high scores and adds them to the page ///////
function populateHighScores() {
    // for each highscore in the array /////////////////////////////////
    for (var i = 0; i < highScoreList.length; i++) {
        // get the array item ////////////////////////////////////////
        var scored = highScoreList[i];
        // create an li with create element ////////////////////////
        var li = document.createElement("li");
        // set the text content of the li to the array item //////
        li.textContent = scored;
        // append it to the Ul we grabbed earlier //////////////
        scoresUl.appendChild(li);
    }
};

populateHighScores();