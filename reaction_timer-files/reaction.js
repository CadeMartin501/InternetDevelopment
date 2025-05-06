(function() {
    'use strict';

    let started = false;
    let timer;
    let disqualified = false;
    let timeElapsed = 0;
    const delay = Math.trunc(Math.random() * 30) + 20;
    
    window.addEventListener('load', init);

    function init() {
        const start = id('start-btn');
        start.addEventListener('click', handleStart);
    }

    function handleStart() {
        if (!started) {
            started = true;
            const redLight = id('red-light');
            redLight.classList.toggle('on');
            redLight.classList.toggle('off');
            const yellowLight = id('yellow-light');
            yellowLight.classList.toggle('on');
            yellowLight.classList.toggle('off');

            // Set timer for a random number of tenths of seconds in the range [20, 50).
            setTimeout(turnOnGreen, delay*100);

            // Set stop button to stop the timer.
            const stopButton = id('stop-btn');
            stopButton.addEventListener('click', handleStop);
        }
        // Ignore press if things have already been started.
    }

    function turnOnGreen() {
        if (!disqualified) {
            const yellowLight = id('yellow-light');
            yellowLight.classList.toggle('on');
            yellowLight.classList.toggle('off');
            const greenLight = id('green-light');
            greenLight.classList.toggle('on');
            greenLight.classList.toggle('off');

            // Start a timer counting how many hundredths of a second elapse before the button press.
            timer = setInterval(tick, 10);
            
        }
    }

    function handleStop() {
        const lastResult = id('last-result');
        if (timeElapsed < delay) {
            lastResult.textContent = 'Disqualified!';
            disqualified = true;
        } else {
            // Stop the timer.
            clearInterval(timer);

            lastResult.textContent = `Your time: ${timeElapsed/100}s`;
        }
    }

    function tick() {
        timeElapsed += 1;
    }

    /////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

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