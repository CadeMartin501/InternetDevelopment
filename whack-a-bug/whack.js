/*
 * CSE 154 Section Exercise - Whack a Bug
 * Handles whacking bugs.
 */


(function() {
  'use strict';
  window.addEventListener('load', init);
  
  /**
   * TODO
   * Set up event listeners for the bugs.
   */
  function init() {
    let antList = qsa('#bug-container>img');
        for (let i=0; i<antList.length; i++) {
            antList[i].addEventListener('click', whackBug);
        }
  }

  /**
   * TODO
   * whacks the clicked bug and increments the score. The bug cannot be whacked again afterwards.
   */
  function whackBug(event) {
    let clicked = event.currentTarget;
    let score = document.getElementById('score');
    if (!clicked.classList.contains('whacked')) {
      score.textContent = parseInt(score.textContent) + 1;
    }
    if (parseInt(score.textContent)==qsa('#bug-container > img').length) {
      let text = document.getElementById('text');
      text.textContent = "Game Over!"
    }
        clicked.classList.add('whacked');
        clicked.src="bug-whacked.png";
  }

/* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();
