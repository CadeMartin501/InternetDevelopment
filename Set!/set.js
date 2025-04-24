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
      const board = id('board');
      for (let i = 0; i<12; i++) {
        let card = generateUniqueCard(false);
        card.classList.add('card');
        card.addEventListener('click', cardSelected);
        let shape = document.createElement('img');
        shape.src = `img/${card.classList[0]}-${card.classList[1]}-${card.classList[2]}.png`;
        for (let i = 0; i< card.classList[3]; i++) {
        card.appendChild(shape);
        }
        board.appendChild(card);
      }
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
    setCount++;
    return true;
    }

/**Returns a randomly-generated array of string attributes in the form [COLOR, FILL, SHAPE, COUNT]
 * @param {boolean} isEasy - If the game mode is set to easy or not
 */
  function generateRandomAttributes(isEasy) {
    let colors = ["red", "purple", "green"];
    let fills = ["outline", "solid", "striped"];
    let shapes = ["diamond", "oval", "squiggle"];
    let counts = [1, 2, 3];
    
    return [colors[Math.floor(Math.random()*colors.length)], fills[Math.floor(Math.random()*fills.length)], shapes[Math.floor(Math.random()*shapes.length)], counts[Math.floor(Math.random()*counts.length)]]
  }

//Return a div element with COUNT number of img elements appended as children
  function generateUniqueCard(isEasy) {
    let attributes = generateRandomAttributes(isEasy);
    let newCard = document.createElement('div');
    newCard.classList.add(attributes[0]); //Color
    newCard.classList.add(attributes[1]); //Fill
    newCard.classList.add(attributes[2]); //Shape
    newCard.classList.add(attributes[3]); //Count

    if (isEasy) {
      newCard.classList.remove(attributes[1]);
      newCard.classList.add('Solid');
       }

    return newCard;
    // let cards = qsa('board > div');
  }

//Starts the timer for a new game. No return value.
  function startTimer() {
    timerId = qs('select');
    remainingSeconds= timerId.value;
    setInterval(advanceTimer, 1000);
  }

//Updates the game timer (module-global and #time shown on page) by 1 second. No return value.
  function advanceTimer() {
    remainingSeconds--;
  }

//Used when a card is selected, checking how many cards are currently selected. If 3 cards are selected, uses isASet (provided) to handle "correct" and "incorrect" cases. No return value.
  function cardSelected() {
    this.classList.add('selected');
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