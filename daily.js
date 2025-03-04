const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again"); 

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

// Select the word and the hint from the list
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    
    console.log(currentWord);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
    correctLetters = [];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
   
};

// Function to reset the game state
const resetGame = () => {
   
    correctLetters = [];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
};

// Function to handle the end of the game (win or lose)
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `you found the word it was:` : `the correct word was:`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.querySelector("h4").innerHTML = `${isVictory ? `Congrats!` : `Game Over!`}`;
        
        gameModal.classList.add("show");
    }, 300);
};

// Handle a letter guess
const initGame = (button, clickedLetter) => {
    if (wrongGuessCount >= maxGuesses) return; // Prevent game from continuing after max guesses

    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter && !correctLetters.includes(letter)) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        
    }

    // Disable the clicked letter button and update the guesses text
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check if game is over
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Creating the keyboard element and event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

// Initialize a random word and start the game
getRandomWord();

// Add event listener for "Play Again" button
playAgainBtn.addEventListener("click", () => {
    getRandomWord(); // Select a new word
    resetGame(); // Reset the game state
});

