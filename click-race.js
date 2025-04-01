(function() {
    "use strict";

    var timerActive = false;
    var timer;
    var timeRemaining=5.00;
    var wins = 0;

    window.addEventListener('load', init);

    function init() {
        const startButton = id('start-stop');
        startButton.addEventListener('click', startTimer);

    }

    function startTimer() {
        const startStopButton = id('start-stop');
        const timeRemainingPara = id('time-remaining');
        const text = parseFloat(timeRemainingPara.textContent);
        if (!timerActive) { //Starts the timer.
            startStopButton.textContent = 'Stop'
            timeRemaining = 5;
            timeRemainingPara.textContent = timeRemaining.toFixed(2);    
            timer = setInterval(countDown,10);
            timerActive = true;
        } else { //Stops the timer.
            clearInterval(timer);
            startStopButton.textContent = 'Start';
            timerActive = false;
        }
        if (text < 0.5 && text > -0.5 && timerActive==false) { //See if player won.
            wins++;
            console.log(wins);
            const newPara = document.createElement('p');
            const element = qs('body');
            newPara.textContent = 'Good job!';
            if (wins == 1) { //First time winning.
                element.id = 'winner';
                element.appendChild(newPara);
            } else if (wins >= 2) { //5th time winning, game won.
                newPara.textContent = 'Game over, you won!'
                element.appendChild(newPara);
                const startButton = id('start-stop');
                startButton.removeEventListener('click', startTimer);

            }
        }
    }

    function countDown() {
        const timeRemainingPara = id('time-remaining');
        const currentTime = parseFloat(timeRemainingPara.textContent);
        if (currentTime > -5) {
            timeRemainingPara.textContent = (currentTime - 0.01).toFixed(2);
        } else {
            clearInterval(timer);
            timerActive = false;
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