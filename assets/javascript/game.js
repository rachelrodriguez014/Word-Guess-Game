var userGuesses = document.getElementById("userGuesses");
var userAnswer = document.getElementById("userAnswer");
var userWins = document.getElementById("wins");
var userLosses = document.getElementById("losses");
var userTries = document.getElementById("guessesLeft");
var directions = document.getElementById("directions");
var img = document.getElementById("picture");
var message = document.getElementById("message");
var inputField = document.getElementById("textInput");

var gamePlay = {
    guessesLeft: 10,
    wins: 0,
    losses: 0,
    words: ["OUTER SPACE", "EARTH", "GALAXIES", "MOON", "SHOOTING STARS", "BLACK HOLE", "UNIVERSE", "SOLAR ECLIPSE", "ASTEROIDS"],
    images: ["outerspace.jpg", "earth.jpg", "galaxies.jpg", "shootingstars.jpg", "blackhole.jpg", "universe.jpeg", "solareclipse.jpg", "asteroids.jpg"],
    answers: "",
    imgSrc: "",
    wordDisplay: [],
    wrongGuess: [],
    rightGuess: [],

    gameStart: false,

    gameReset: function() {
        this.guessesLeft = 10;
        this.wrongGuess = [];
        this.rightGuess = [];
        this.wordDisplay = [];

        var randomNum = Math.floor(Math.random() * this.words.length)
        this.answers = this.words[randomNum]
        this.imgSrc = this.images[randomNum]

        this.wordDisplayBlank();

        message.textContent = "";
        userGuesses.textContent = "You guessed: ";
        attemptsLeft.textContent = this.triesLeft;
        inputField.value = "";
    },

    pastGuess: function(letter, state) {
        if (state == 1) {
            this.rightGuess.push(letter);
        }

        else if (state == 2) {
            this.wrongGuess.push(letter);
        }
    },

    wordDisplayBlank: function() {
        for (i=0; i<this.answers.length; i++) {
            if (isAlpha(this.answers.charCodeAt(i))) {
                this.wordDisplay.push('_');
            }
            else {
                this.wordDisplay.push(this.answers[i]);
            }
        }

        userAnswer.textContent = "";
        for (j=0; j<this.wordDisplay.length; j++){
            userAnswer.textContent += (this.displayWord[j] + "\xa0");
        }
    },
};

function isAlpha(keyCode) {
    return ((keyCode >= 65 && keyCode <= 90)||(keyCode >= 97 && keyCode <= 122));
}

function isInWord(letter){
    return (gamePlay.answers.indexOf(letter) != -1);
}

function replaceBlank(letter){
    for (i=0; i<gamePlay.wordDisplay.length; i++){
        if (letter == gamePlay.answers[i]){
            gamePlay.wordDisplay[i] = letter;
        }
    }

    userAnswer.textContent = "";
    for (j=0; j<gamePlay.wordDisplay.length; j++) {
        userAnswer.textContent += (gamePlay.wordDisplay[j] + "\xa0");
    }
}

function checkAnswer(){
    var inputWord = "";
    for (i=0; i<gamePlay.wordDisplay.length; i++){
        inputWord += gamePlay.displayWord[i];
    }
    return (inputWord == gamePlay.answers);
}


document.onkeyup = function(event){
    if (gamePlay.gameStart == false){
        inputField.value = "";
        gamePlay.gameStart = true;
        directions.textContent = "Enter a letter.";
        gamePlay.gameReset();
    }
    else if(checkAnswer()){
        gamePlay.gameReset();
        directions.textContent = "Enter a letter.";
    }
    else if (gamePlay.guessesLeft > 0){
        var userInput;
        var inputCode;
        if (inputField.value!=""){
            userInput = inputField.value;
            inputCode = userInput.charCodeAt(0);
            inputField.value = "";
        }
        else{
            userInput = event.key;
            inputCode = event.keyCode;
        }

        if(isAlpha(inputCode)){
            var inputUpper = userInput.toUpperCase();
            if(isInWord(inputUpper) && (gamePlay.rightGuess.indexOf(inputUpper) ==-1)){
                gamePlay.pastGuess(inputUpper, 1);
                replaceBlank(inputUpper);
                inputField.value = "";

                if(checkAnswer()){
                    gamePlay.wins++;
                    userWins.textContent = gamePlay.wins;
                    message.textContent = "You're Correct!!"
                    directions.textContent = "Press any key to continue";
                    img.src = "assets/images" + gamePlay.imgSrc;
                }
            }   
            else if ((gamePlay.wrongGuess.indexOf(inputUpper)==-1) && (gamePlay.rightGuess.indexOf(inputUpper)==-1)){
                gamePlay.pastGuess(inputUpper, 2);
                gamePlay.guessesLeft--;

                if(gamePlay.guessesLeft == 0){
                    directions.textContent = "Try Again! Press any key to continue!";
                    message.textContent = "Correct Answer:" + gamePlay.answers;
                }

                userGuesses.textContent += (inputUpper + "\xa0");
                guessesLeft.textContent = gamePlay.guessesLeft;
                inputField.value = "";
            }
        }
        else{
            alert("Only press letters!!!");
            inputField.value = ";"
        }
    }
    else{
        gamePlay.gameReset();
        gamePlay.losses++;
        userLosses.textContent = gamePlay.losses;
    }
}
    
