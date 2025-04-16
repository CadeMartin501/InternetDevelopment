(function() {
    "use strict";

    let rollActive = false;
    let diceRoll1;
    let diceRoll2;
    let score;
    let turns = 0;

    window.addEventListener('load', init);

    function init() {
        const rollButton = id('roll');
        const enterButton = qsa('.scoring-row > button');
        //create event listener for all enter buttons.
        for (let i = 0; i < enterButton.length; i ++) {
            enterButton[i].addEventListener('click', buttonPress);
        }
        rollButton.addEventListener('click', rollPress);
    }

    function rollPress() {
        const rollButton = id('roll');
        const status = id('status');
        
        if (!rollActive && turns<5) {
            diceRoll1 = dieRoll();
            diceRoll2 = dieRoll();
            score = diceRoll1 + diceRoll2;
            status.textContent = `${diceRoll1} + ${diceRoll2} = ${score}`;
            rollActive = true; //can't repress the roll button.
        } else {
            status.textContent += '!'; //need to change this later to make background flash red for 0.5 seconds.
        }
    }

    function buttonPress(event) {
        let enterButtonPressed = event.target.id;
        const correspondingUserBox = id(`user${enterButtonPressed[5]}`);
        if (rollActive && !correspondingUserBox.classList.contains('used')) {
            correspondingUserBox.classList.add('used');
            correspondingUserBox.value = score;
        
        //Computer's turn.
            diceRoll1 = dieRoll();
            diceRoll2 = dieRoll();
            const status = id('status');
            let computerRoll = diceRoll1 + diceRoll2;
            console.log(computerRoll);
            let numPicked = Math.floor(Math.random()*5+1);
            let boxPicked;
            boxPicked = id(`computer${numPicked}`);
            while (boxPicked.classList.contains('used')) {
                numPicked = Math.floor(Math.random()*5 + 1);
                boxPicked = id(`computer${numPicked}`);
            }
            
            
            boxPicked.classList.add('used');
            boxPicked.value = computerRoll;
            status.textContent = `Computer rolled ${diceRoll1} + ${diceRoll2} = ${computerRoll}`;

            turns++;
            rollActive = false;
        }
        if (turns == 5) {
            let inputs=qsa('input');
            console.log(inputs[0].value);
            let playerScore = 0;
            let computerScore = 0;
            inputs[0].value > inputs[1].value ? playerScore +=1 : computerScore+=1;
            inputs[2].value > inputs[3].value ? playerScore +=2 : computerScore+=2;
            inputs[4].value > inputs[5].value ? playerScore +=3 : computerScore+=3;
            inputs[6].value > inputs[7].value ? playerScore +=4 : computerScore+=4;
            inputs[8].value > inputs[9].value ? playerScore +=5 : computerScore+=5;
            playerScore > computerScore ? id('status').textContent = `User Wins ${playerScore} to ${computerScore}!` :
            id('status').textContent = `Computer Wins ${computerScore} to ${playerScore} :(`;

        }
    }

    function dieRoll() {
        return Math.floor(Math.random()*6+1);
    }



    /////////////////////////////////////////////////////////////////////
    // Helper functions
    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();