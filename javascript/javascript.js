///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Program: javascript.js
// Description: The main javascript program for the application.
// Notes: N/A
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameboardUnits = document.querySelectorAll('#gameboard > div');

const newGameButton = document.querySelector('#new-game-button');

const opponentChoice = document.querySelector('.user-buttons > div:nth-child(2)');
opponentChoice.classList.add('hide-opponent-choice-buttons');
const twoPlayerChoiceButton = document.querySelector('#two-players');
const computerChoiceButton = document.querySelector('#computer');

const chooseXOrOButtons = document.querySelector('.user-buttons > div:nth-child(3)');
chooseXOrOButtons.classList.add('hide-x-o-buttons');
const xButton = document.querySelector('#choose-x');
const oButton = document.querySelector('#choose-o');

/**************************************************************************************************************************/
// Testing
console.log(gameboardUnits);
console.log(newGameButton);
console.log(chooseXOrOButtons);
console.log(opponentChoice);
console.log(twoPlayerChoiceButton);
console.log(computerChoiceButton);
console.log(xButton);
console.log(oButton);
console.log("\n");
/**************************************************************************************************************************/
// Gameboard Module
const Gameboard = (()=>{
    let myGameboard = []; // My Gameboard array to store the gameboard units. 
    return {myGameboard};
})();

// Player One Function Factory
const PlayerOne = (pOneNum, boardLetter) => {
    let playerBoardLetter = boardLetter;

    const getBoardLetter = () => playerBoardLetter;
    
    function setBoardLetter(bLetter){ playerBoardLetter = bLetter};

    const getPlayerNumber = () => pOneNum;

    return {getBoardLetter, setBoardLetter, getPlayerNumber};
}

// Player Two Function Factory
const PlayerTwo = (pTwoNum) => {
    const playerOneObj = PlayerOne();
    return {playerOneObj};
}
/**************************************************************************************************************************/

// displayGame() - Will display the game.
function displayGame(opponent, boardLetter){
    console.log("displayGame Called!"); // Testing
    console.log(`opponent: ${opponent} --- boardLetter: ${boardLetter}`); // Testing
    console.log(`myGameboard array in displayGame() after iteration: ${Gameboard.myGameboard}`); // Testing
    
    if (opponent === 2)
    {
        // There will be two players taking turns (Note: PlayerOne will always move first for now) 
        const playerOne = PlayerOne(1, boardLetter);
        const playerTwo = PlayerTwo(2);

        // Set playerTwo's board letter
        if (playerOne.getBoardLetter() === 'X')
        {
            playerTwo.playerOneObj.setBoardLetter('O');
        }
        else if (playerOne.getBoardLetter() === 'O')
        {
            playerTwo.playerOneObj.getBoardLetter('X'); 
        }

        let nextMove = 1;
        Gameboard.myGameboard.forEach(boardUnits => {

            boardUnits.addEventListener('click',()=>{
                console.log("The player clicked a board unit."); // Testing

                // Create board letter container that will hold the board letter after every player click. 
                const boardLetterContainer = document.createElement('div');
                
                if (boardUnits.hasChildNodes())
                {
                    console.log("That spot is already taken"); // Testing
                    console.log("\n");
                }
                else
                {
                    if (nextMove === 1)
                    {
                        // Set a data-attribute number that will match each player number when the players click on the board units.
                        boardUnits.dataset.playerMove = nextMove;
                        console.log(`Testing for the players lastMove: ${boardUnits.dataset.playerMove}`); // Testing
                        console.log(`Testing for playerOne'ss board letter: ${playerOne.getBoardLetter()}`); // Testing
                        console.log("\n"); // Testing
    
                        boardLetterContainer.innerHTML = playerOne.getBoardLetter();
                        boardUnits.appendChild(boardLetterContainer);
    
                        nextMove = 2;
                    }
                    else if (nextMove === 2)
                    {
                        // Set a data-attribute number that will match each player number when the players click on the board units.
                        boardUnits.dataset.playerMove = nextMove;
                        console.log(`Testing for the players lastMove: ${boardUnits.dataset.playerMove}`); // Testing
                        console.log(`Testing for playerTwo's board letter: ${playerTwo.playerOneObj.getBoardLetter()}`);
                        console.log("\n");

                        boardLetterContainer.innerHTML = playerTwo.playerOneObj.getBoardLetter();
                        boardUnits.appendChild(boardLetterContainer); 
    
                        nextMove = 1;
                    }

                }
    
            });


        });
    }
}

// newGame() - The settings for the new game of tic tac toe.
function newGame(){
    opponentChoice.classList.remove('hide-opponent-choice-buttons');

    // iterates each gameboard unit into myGameboard array.
    for (let i = 0; i < gameboardUnits.length; i++){
        Gameboard.myGameboard[i] = gameboardUnits[i];
    }

    // Chooses a second player to play against:
    twoPlayerChoiceButton.addEventListener('click', ()=>{
        let opponent = 2;
        chooseXOrOButtons.classList.remove('hide-x-o-buttons');

        // Chooses x or o to start with:
        xButton.addEventListener('click', ()=>{
            let boardLetter = 'X';
            displayGame(opponent, boardLetter);
        });
    });

}

// New Game Button - Will start a new game of Tic Tac Toe when the user clicks the button.
newGameButton.addEventListener('click',newGame);
