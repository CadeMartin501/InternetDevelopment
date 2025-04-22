(function() {
    'use strict';

    window.addEventListener('load', init);

    function init() {
        let startButton = id('start-btn');
        startButton.addEventListener('click', toggleView);
        let backButton = id('back-btn');
        backButton.addEventListener('click', toggleView);

    }

    function toggleView() {
        let menu = id('menu-view');
        menu.classList.toggle('hidden');
        let game = id('game-view');
        game.classList.toggle('hidden');
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