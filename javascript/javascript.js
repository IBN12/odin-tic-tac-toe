//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Program: javascript.js
// Description: The main javascript program for the tic-tac-toe application.
// Notes: -> Your main goal here is to have as little global code as possible. 
// Try tucking everything away inside of a module or factory. Rule of thumb: 
// if you only ever need ONE of something(gameBoard, displayController), use a module.
// If you need multiples of something (players!), create them with factories.
// TODO: Check if the player has three letters lined up in a row on the gameboard for the win.
//       I'm using an online resource to help me with this portion of the project
// ---> Completed
//
// TODO: -> Organize statements and functions inside each 'module function' and 'factory function'.
// ---> Completed
//
// -> Display that the player has actually won the game in the displayController module.
// ---> Completed
//
// -> The player should not be able to click on anymore board units after the game has
// been won, loss, or tied. The player will need to click the reset button to reset
// the game to play again. 
// ---> Completed
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Players factory function:
const Players = (playerNum) => {
    // playerSelection array - Will contain all the initial selections that each player has made on the board.
    let playerSelection = [];
    
    // playerGameResult - private variable that will contain win or loss result of the game.
    let playerGameResult = false;

    let playerGameName = '';

    // getPlayerNum method - Will return the player number (1=player 1 | 2=player 2) for each player. 
    const getPlayerNum = () => {
        return playerNum;
    }

    // setPlayerGameResult - N/A
    const setPlayerGameResult = (gameResult) => {
        playerGameResult = gameResult;
    }

    // getPlayerGameResult - N/A
    const getPlayerGameResult = () => {
        return playerGameResult;
    }

    // setPlayerName - Will set each player name.
    const setPlayerName = (playerName) => {
        playerGameName = playerName;
    }

    // getPlayerName - Will return the player name.
    const getPlayerName = () => {
        return playerGameName; 
    }

    return {getPlayerNum, setPlayerGameResult, getPlayerGameResult, setPlayerName, getPlayerName, playerSelection};
}

// Gameboard module: 
const Gameboard = (() => {
    // Gameboard array will store x's and o's:
    let gameboard = ["", " ", " ", " ", " ", " ", " ", " ", " "];

    // Gameboard index:
    let gameboardIndex = 0;

    // Gameboard win selections array:
    let defaultWinSelections = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]

    return {gameboard, gameboardIndex, defaultWinSelections};
}) ();

// DisplayController module:
const DisplayController = (() => {
    // displayGameResultWinner(): Function will display the 'winner' in the browser.
    const displayGameResultWinner = (player) => {
        if (player.getPlayerNum() === 1 || player.getPlayerNum() === 2)
        {
            console.log(`${player.getPlayerName()} Wins!`); // Testing
            const gameResult = document.querySelector('#game-results-section');
            gameResult.textContent = `${player.getPlayerName()} Win's!`;
            PlayerController.commenceGame();
        }
    }

    // displayGameResultDraw(): Function will display a 'draw' in the browser.
    const displayGameResultDraw = () => {
        console.log("Game is a draw..."); // Testing
        const gameResult = document.querySelector('#game-results-section');
        gameResult.textContent = `Draw`;
        PlayerController.commenceGame();
    }

    // displayPlayerTurn(): Function will display which player has the next move.
    const displayPlayerTurn = (player) => {
        const playerTurnSection = document.querySelector('#player-turn-section');
        playerTurnSection.textContent = `${player.getPlayerName()}'s Turn`;
    }

    return {displayGameResultWinner, displayGameResultDraw, displayPlayerTurn};
}) ();

// PlayerController module:
const PlayerController = (() => {
    console.log("|Node References|"); // Testing
    // Node reference for the units on the gameboard.
    const gameboardUnits = document.querySelectorAll('.gameboard-unit');
    console.log(gameboardUnits); // Testing

    // Node reference for the reset button.
    const resetButton = document.querySelector('button[type=submit]');
    console.log(resetButton); // Testing

    // Node reference for the Enter Name button.
    const enterName = document.querySelector('#enter-name-button-container > button');
    console.log(enterName); // Testing 

    // Node reference for the Enter Name Form.
    const enterNameForm = document.querySelector('#enter-name-form');
    console.log(enterNameForm); // Testing
    enterNameForm.classList.add('hide-elements'); // Hide the Enter Name Form by default.

    // Node reference for the Enter Name Submit button.
    const enterNameFormSubmitButton = document.querySelector('#enter-name-form > div:nth-child(3) > button');
    console.log(enterNameFormSubmitButton); // Testing

    // Node reference for player 1 to enter their name.
    const playerOneName = document.querySelector('#player-1-name');
    console.log(playerOneName); // Testing
                
    // Node reference for player 1 to enter their name.
    const playerTwoName = document.querySelector('#player-2-name');
    console.log(playerTwoName); // Testing

    // Node reference for the enter name form.
    const enterPlayerForm = document.querySelector('#enter-name-form');
    console.log(enterPlayerForm); // Testing

    console.log(`Dataset index for the first board unit: ${gameboardUnits[0].dataset.index}`); // Testing 
    console.log(`Gameboard starting length: ${Gameboard.gameboard.length}`); // Testing
    console.log(`Gameboard index starts at: ${Gameboard.gameboardIndex}`); // Testing 
    console.log("\n"); // Testing

    // Declaring playerOne and playerTwo of type Players and initiating each player object with their player number.
    const playerOne = Players(1);
    const playerTwo = Players(2);
    let playerTurns = 1; // Index variable that will change between the player numbers for their turns.

    // Testing: Displaying the default win selections in the developer console:
    console.log("|Default Win Selections|") // Testing
    Gameboard.defaultWinSelections.filter(selection => {
        console.log(selection);
    });
    console.log("\n");

    // playGame(): Will start the game up when the player clicks a unit of the gameboard. 
    const playGame = (e) => {
        const letterContainer = document.createElement('div');

        if (playerOne.getPlayerNum() === playerTurns) // Player One Turn 
        {
            console.log(`Player One hasn't clicked on this board unit yet.`); // Testing
            console.log(`Player One's Turn:`); // Testing
            DisplayController.displayPlayerTurn(playerTwo);

            Gameboard.gameboard[e.target.dataset.index] = 'X';
            console.log(`The dataset index that was initiated: ${e.target.dataset.index}`); // Testing 
            console.log(Gameboard.gameboard); // Testing
            console.log("\n"); // Testing

            // Will display the content on the gameboard.
            letterContainer.textContent = Gameboard.gameboard[e.target.dataset.index];
            letterContainer.style.color = 'red';
            letterContainer.classList.add('x-and-o');
            e.target.appendChild(letterContainer);

            // Remove the event from the unit that was already clicked on.
            e.target.removeEventListener('click', playGame);

            // Check for the win (Three in a row):
            checkForWinner(e.target.dataset.index, 1);

            playerTurns = 2;
            Gameboard.gameboardIndex++;
        }
        else if(playerTwo.getPlayerNum() === playerTurns)
        {
            console.log(`Player Two hasn't clicked on this board unit yet.`); // Testing
            console.log(`Player Two's turn:`); // Testing
            DisplayController.displayPlayerTurn(playerOne);

            Gameboard.gameboard[e.target.dataset.index] = "O";
            console.log(`The dataset index that was initiated: ${e.target.dataset.index}`); // Testing
            console.log(Gameboard.gameboard); // Testing
            console.log("\n"); // Testing

            // Wil display the content on the gameboard.
            letterContainer.textContent = Gameboard.gameboard[e.target.dataset.index];
            letterContainer.style.color = 'blue';
            letterContainer.classList.add('x-and-o');
            e.target.appendChild(letterContainer);
            
            // Remove the event from the unit that was already clicked.
            e.target.removeEventListener('click', playGame);

            // Check for the win (three in a row):
            checkForWinner(e.target.dataset.index, 2);

            playerTurns = 1;
            Gameboard.gameboardIndex++;
        }

    }

    // commenceGame(): Will allow the players to commence the tic-tac-toe game based on the win/loss results.
    const commenceGame = (e) => {
        // Default player name for player one.
        if (playerOne.getPlayerName() === '')
        {
            playerOne.setPlayerName('Player One');

        }

        // Default player name for player two.
        if (playerTwo.getPlayerName() === '')
        {
            playerTwo.setPlayerName('Player Two');

        }

        // Game will be played if there is no win or draw.
        if (playerOne.getPlayerGameResult() === false && playerTwo.getPlayerGameResult() === false && Gameboard.gameboardIndex < 8) // Current Game
        {
            // Allow the player to click on the gameboard.
            gameboardUnits.forEach(unit => {
                unit.addEventListener('click', playGame);
            });
        }
        else if (playerOne.getPlayerGameResult() === true || playerTwo.getPlayerGameResult() === true) // Win
        {
            console.log('Initiated: Please reset the game to play again.'); // Testing
            // Remove the addEventListener from each board unit after a win
            gameboardUnits.forEach(unit => {
                unit.removeEventListener('click', playGame);
            });
        }
        else if (playerOne.getPlayerGameResult() === false && playerTwo.getPlayerGameResult() === false) // Draw
        {
            console.log('Draw: Please reset the game to play again.');
            gameboardUnits.forEach(unit => {
                unit.removeEventListener('click', playGame);
            })
        }
    }

    // checkForWinner(): Will check for the winner each game played.
    const checkForWinner = (selection, playerTurns) => {
        for (let i = 0; i < Gameboard.defaultWinSelections.length; i++)
        {
            Gameboard.defaultWinSelections[i].forEach(defaultSelection => {
                if (playerTurns === 1)
                {
                    if (defaultSelection === parseInt(selection))
                    {
                        if (playerOne.playerSelection.includes(defaultSelection)) return;
                        playerOne.playerSelection.push(defaultSelection);
                    }
                }
                else if (playerTurns === 2)
                {
                    if (defaultSelection === parseInt(selection))
                    {
                        if (playerTwo.playerSelection.includes(defaultSelection)) return;
                        playerTwo.playerSelection.push(defaultSelection);
                    }
                }
            });
        }

        let playerOneMatch = 0;
        let playerTwoMatch = 0;
        let playerOneWins = false;
        let playerTwoWins = false;
        // Final test for the win.
        if (playerOne.playerSelection.length >= 3 && playerTurns === 1)
        {
            console.log("Final check for player one:"); // Testing
            Gameboard.defaultWinSelections.forEach(defaultSelectionIndex => {
                console.log(`Testing default selection: ${defaultSelectionIndex}`); // Testing

                defaultSelectionIndex.forEach(defaultElement => {
                    for (let i = 0; i < playerOne.playerSelection.length; i++)
                    {
                        if (playerOne.playerSelection[i] === defaultElement && playerOneMatch != 3)
                        {
                            console.log(`Matching: ${playerOne.playerSelection[i]} === ${defaultElement}`); // Testing
                            playerOneMatch++;
                        }
                    }

                    // If there are three initial matches then player one wins.
                    if (playerOneMatch === 3)
                    {
                        console.log(`Matches: ${playerOneMatch}`); // Testing
                        playerOneWins = true;
                        playerOne.setPlayerGameResult(playerOneWins);
                        DisplayController.displayGameResultWinner(playerOne);
                        console.log(`${playerOne.getPlayerName()} Wins!`); // Testing

                        console.log("\n"); // Testing 
                    }
                });
                console.log("\n"); // Testing
                playerOneMatch = 0; // reset the match back to zero for the next iteration.
            });
        }
        else if (playerTwo.playerSelection.length >= 3 && playerTurns === 2)
        {
            console.log("Final check for player two:"); // Testing
            Gameboard.defaultWinSelections.forEach(defaultSelectionIndex => {
                console.log(`Testing default selection: ${defaultSelectionIndex}`); // Testing

                defaultSelectionIndex.forEach(defaultElement => {
                    for (let i = 0; i < playerTwo.playerSelection.length; i++)
                    {
                        if (playerTwo.playerSelection[i] === defaultElement && playerTwoMatch != 3)
                        {
                            console.log(`Matching: ${playerTwo.playerSelection[i]} === ${defaultElement}`); // Testing
                            playerTwoMatch++;
                        }
                    }

                    // If there are three initial matchs then player two wins.
                    if (playerTwoMatch === 3)
                    {
                        console.log(`Matches: ${playerTwoMatch}`); // Testing
                        playerTwoWins = true;
                        playerTwo.setPlayerGameResult(playerTwoWins);
                        DisplayController.displayGameResultWinner(playerTwo);
                        console.log(`${playerTwo.getPlayerName()} Wins`); // Testing
                    }
                });
                console.log("\n"); // Testing
                playerTwoMatch = 0; // reset the match back to zero for the next iteration.
            });
        }

        console.log(`Outside Final Check Scope - Did ${playerOne.getPlayerName()} Win? ${playerOneWins}`); // Testing
        console.log(`Outside Final Check Scope - Did ${playerTwo.getPlayerName()} Win? ${playerTwoWins}`); // Testing
        console.log("\n");

        // If the gameboard index reaches 8 then the board is full and the game is draw.
        if (Gameboard.gameboardIndex === 8 && playerOne.getPlayerGameResult() === false && playerTwo.getPlayerGameResult() === false)
        {
            DisplayController.displayGameResultDraw();
        }
    }

    // reset(): Players can reset the game anytime.
    const resetGame = () => {
        location.reload();
    }

    // addName(): Submitting each players name in the form controls value attribute.
    const addName = (e) => {
        e.preventDefault(); // Prevents the form from redirecting the browser. 
        console.log("Testing Names"); // Testing
        playerOne.setPlayerName(playerOneName.value);
        playerTwo.setPlayerName(playerTwoName.value);
        console.log(`Player One Name: ${playerOne.getPlayerName()}`); // Testing
        console.log(`Player Two Name: ${playerTwo.getPlayerName()}`); // Testing
        enterPlayerForm.reset(); // Reset the form controls.
        enterNameForm.classList.add('hide-elements'); // Hide the remove the form controls.
        console.log("\n"); // Testing
    }

    // playerNames(): Display the form for the players to enter their names.
    const playerNames = () => {
        // Reveal the Enter Name Form.
        enterNameForm.classList.remove('hide-elements');
       
        enterNameFormSubmitButton.addEventListener('click', addName);
    }

    // reset: Allow the players to reset the game.
    resetButton.addEventListener('click', resetGame);

    // enter name: Allow players to enter their names before a game.
    enterName.addEventListener('click', playerNames);

    // commence the game.
    commenceGame();

    return {commenceGame};
}) ();



