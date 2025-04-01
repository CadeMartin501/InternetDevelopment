(function() {
    "use strict";

    var rollActive = false;

    window.addEventListener('load', init);

    function init() {
        const rollButton = id('roll');
        rollButton.addEventListener('click', rollDice);
    }

    function rollDice() {
        const rollButton = id('roll');
        if (!rollActive) {
        var diceRoll1 = Math.floor(Math.random()*6+1);
        var diceRoll2 = + Math.floor(Math.random()*6+1);
        var score = diceRoll1 + diceRoll2
        const status = id('status');
        status.textContent = `${diceRoll1} + ${diceRoll2} = ${score}`;
        rollActive = true; //can't repress the roll button,
        }
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