(function() {
    'use strict';

    let timerId;
    let remainingSeconds;
    let setCount = 0;

    window.addEventListener('load', init);

    function init() {
      let startButton = id('start-btn');
      startButton.addEventListener('click', toggleView);
      let backButton = id('back-btn');
      backButton.addEventListener('click', toggleView);
    }

    function toggleView() {
      startTimer();
      console.log(remainingSeconds);
      let menu = id('menu-view');
      menu.classList.toggle('hidden');
      let game = id('game-view');
      game.classList.toggle('hidden');
      let isEasy =
      console.log(generateRandomAttributes(false));
    }

    /**
   * Checks to see if the three selected cards make up a valid set. This is done by comparing each
   * of the type of attribute against the other two cards. If each four attributes for each card are
   * either all the same or all different, then the cards make a set. If not, they do not make a set
   * @param {DOMList} selected - List of all selected cards to check if a set.
   * @return {boolean} True if valid set false otherwise.
   */
  function isASet(selected) {
    let attributes = [];
    for (let i = 0; i < selected.length; i++) {
      attributes.push(selected[i].id.split("-"));
    }
    for (let i = 0; i < attributes[0].length; i++) {
      let allSame = attributes[0][i] === attributes[1][i] &&
                    attributes[1][i] === attributes[2][i];
      let allDiff = attributes[0][i] !== attributes[1][i] &&
                    attributes[1][i] !== attributes[2][i] &&
                    attributes[0][i] !== attributes[2][i];
      if (!(allDiff || allSame)) {
        remainingSeconds = remainingSeconds-15;
        return false;
      }
    }
    remainingSeconds = remainingSeconds+15;
    return true;
    }

/**Returns a randomly-generated array of string attributes in the form [COLOR, FILL, SHAPE, COUNT]
 * @param {boolean} isEasy - If the game mode is set to easy or not
 */
  function generateRandomAttributes(isEasy) {
    let colors = ["Red", "Purple", "Green"];
    let fills = ["Outline", "Solid", "Striped"];
    let shapes = ["Diamond", "Oval", "Squiggle"];
    let counts = ["One", "Two", "Three"];
    if (!isEasy) {
    return [colors[Math.floor(Math.random()*colors.length)], fills[Math.floor(Math.random()*fills.length)], shapes[Math.floor(Math.random()*shapes.length)], counts[Math.floor(Math.random()*counts.length)]]
    } else {
      return [colors[Math.floor(Math.random()*colors.length)], shapes[Math.floor(Math.random()*shapes.length)], counts[Math.floor(Math.random()*counts.length)]]
    }
  }

//Return a div element with COUNT number of img elements appended as children
  function generateUniqueCard(isEasy) {

  }

//Starts the timer for a new game. No return value.
  function startTimer() {
    timerId = qs('select');
    remainingSeconds= timerId.value;
  }

//Updates the game timer (module-global and #time shown on page) by 1 second. No return value.
  function advanceTimer() {

  }

//Used when a card is selected, checking how many cards are currently selected. If 3 cards are selected, uses isASet (provided) to handle "correct" and "incorrect" cases. No return value.
  function cardSelected() {

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