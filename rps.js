const buttons = document.querySelectorAll('button');
const outcome = document.querySelector('.outcome');
const playerScoreSpan = document.querySelector('.player-score');
const robotScoreSpan = document.querySelector('.robot-score');
const resetButton = document.querySelector('.reset-button');
const roundWinner = document.createElement('p');
const gameWinner = document.createElement('p');

let playerScore = 0;
let robotScore = 0;


function getComputerChoice() {
    // choices to pick from
    let choices = ['rock', 'paper', 'scissors'];
    // math.Floor is used to round down the number 
    //math.random is used to pick a number 0 - 1 
    //math.random is multiplied by choice.length to set the range 
    let randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
}
function checkWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "Tie";
    }
    else if (
        (playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "paper" && computerSelection == "rock") ||
        (playerSelection == "Scissors" && computerSelection == "paper")
    ) {
        return "Player";
    }
    else {
        return "Computer";
    }

}

function playRound(playerSelection, computerSelection) {
    let result = checkWinner(playerSelection, computerSelection);
    if (result == "Tie") {
        roundWinner.innerText = "You both tied and picked " + playerSelection;
    }
    else if (result == "Player") {
        playerScore += 1;
        roundWinner.innerText = `${playerSelection} beats ${computerSelection} \n player wins round`;
        
    }
    else {
        robotScore += 1;
        roundWinner.innerText = `${computerSelection} beats ${playerSelection} \n Robot Wins Round`;
        
    }
    outcome.appendChild(roundWinner);

}

function playGame(playerScore, robotScore) {
    if (playerScore === 5) {
        outcome.removeChild(roundWinner);
        gameWinner.innerText = "YOU WIN";
        gameWinner.style.color = "green";
        buttons.forEach(button => {
            button.disabled = true;
            resetButton.disabled = false;
        })
    }
    else if (robotScore === 5) {
        outcome.removeChild(roundWinner);
        gameWinner.innerText = "YOU LOSE";
        gameWinner.style.color = "red";
        buttons.forEach(button => {
            button.disabled = true;
            resetButton.disabled = false;
        })
    }

    outcome.appendChild(gameWinner);

}

function scoreTrack(playerScore, robotScore) {
    playerScoreSpan.innerText = (`Player Score: ${playerScore}`);
    robotScoreSpan.innerText = (`Robot Score: ${robotScore}`);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const playerSelection = `${button.className}`;
        const computerSelection = getComputerChoice();
        playRound(playerSelection, computerSelection);
        playGame(playerScore, robotScore);
        scoreTrack(playerScore,robotScore);


    })
})

resetButton.addEventListener("click", () => location.reload())
