(function() {
    'use strict';
    
    window.addEventListener('load', init);
    function init() {
        let spots = qsa('.spot');
        for (let i = 0; i< spots.length; i++) {
            spots[i].addEventListener('click', growSpot);
        }
    }
    
    function growSpot() {
        let currImg = document.createElement('img');
        
        if (this.classList.contains('sprout')) {
            this.classList.remove('sprout');
            this.classList.add('tulip');
            
            const tulipMap = new Map([
                [0, 'red-tulip'],
                [1, 'purple-tulip'],
                [2,'yellow-tulip']
            ]);
            this.children[0].src = `images/${tulipMap.get(Math.floor(Math.random()*3))}.png`;
            this.removeEventListener(this, growSpot);
        }

        if (this.classList.contains('empty')) {
           this.classList.remove('empty');
           this.classList.add('sprout');
           currImg.src = 'images/sprout.png';
           this.appendChild(currImg);
       }
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