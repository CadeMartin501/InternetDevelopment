(function() {
    "use strict";

    var timerActive = false;
    var timer;

    window.addEventListener('load', init);

    function init() {
        // Periodic timer.
        const startButton = id('start-timer');
        startButton.addEventListener('click', startTimer);

        //Fires once timer.
        const showButton = id('show-button');
        showButton.addEventListener('click',show);
    }

    function show() {
        const newPara = document.createElement('p');
        newPara.textContent = 'Yay!';
        newPara.id = 'yay';
        const body = qs('body');
        body.appendChild(newPara);
        setTimeout(remove, 2000);
    }

    function remove() {
        const yay = id('yay');
        yay.remove();
    }


    function startTimer() {
        if (!timerActive) {
            const timeRemainingPara = id('time-remaining');
            timeRemainingPara.textContent = 15;    
            timer = setInterval(countDown,1000);
            timerActive = true;
        }
    }

    function countDown() {
        const timeRemainingPara = id('time-remaining');
        const currentTime = parseInt(timeRemainingPara.textContent);
        if (currentTime > 0) {
            timeRemainingPara.textContent = currentTime - 1;
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