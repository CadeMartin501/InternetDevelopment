(function() {
    "use strict";

    var rollActive = false;
    var diceRoll1;
    var diceRoll2;
    var score;

    window.addEventListener('load', init);

    function init() {
        const rollButton = id('roll');
        const enterButton = qsa('.scoring-row > button');
        //create event listener for all enter buttons.
        for (var i = 0; i < enterButton.length; i ++) {
            enterButton[i].addEventListener('click', buttonPress);
        }
        rollButton.addEventListener('click', rollPress);
    }

    function rollPress() {
        const rollButton = id('roll');
        const status = id('status');
        
        if (!rollActive) {
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
        var enterButtonPressed = event.target.id;
        const correspondingUserBox = id(`user${enterButtonPressed[5]}`);
        if (rollActive && !correspondingUserBox.classList.contains('used')) {
            correspondingUserBox.classList.add('used');
            correspondingUserBox.value = score;
        }
        //Computer's turn.
        var computerScore = dieRoll() + dieRoll();
        console.log(computerScore);
        const numPicked = Math.floor(Math.random()*5+1);
        var boxPicked;
        boxPicked = id(`computer${numPicked}`);
        while (boxPicked.classList.contains('used')) {
            numPicked = (numPicked + 1) % 5;
            boxPicked = id(`computer${numPicked}`);
        }
        
        boxPicked.classList.add('used');

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