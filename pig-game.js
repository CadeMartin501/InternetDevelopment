(function() {
    "use strict";

    window.addEventListener("load", init);

    function init() {
        let rollButton = document.getElementById('roll-button');
        rollButton.addEventListener('click', rollButtonClick);
    }

    function rollButtonClick() {
        let dieRoll = Math.trunc(Math.random()*6+1);
        console.log(`Rolled ${dieRoll}`);
        let die = document.getElementById('die');
        die.src=`kenney_boardgame-pack/PNG/Dice/dieWhite_border${dieRoll}.png`;

        let roundScore = document.getElementById('round-score');
        if (dieRoll==6) {
            roundScore.textContent = '0';
        } else {
        roundScore.textContent = parseInt(roundScore.textContent) + dieRoll;
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
}
)