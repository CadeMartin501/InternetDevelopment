(function() {
    'use strict';

    let timerId;
    let remainingSeconds;
    let setCount = 0;
    let currentlySelected = 0;

    window.addEventListener('load', init);

    function init() {
      let startButton = id('start-btn');
      startButton.addEventListener('click', toggleView);
      let backButton = id('back-btn');
      backButton.addEventListener('click', toggleView);
      let refreshBtn = id('refresh-btn')
      refreshBtn.addEventListener('click', refreshBoard);
    }

    function toggleView() {
      startTimer();
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
    let board = id('board');
    let existingIds = new Set([...board.children].map(c => c.id));
    let card, attributes, idStr;
    do {
      attributes = generateRandomAttributes(isEasy);
      idStr = attributes.join('-');
    } while (existingIds.has(idStr));
    
    card = document.createElement('div');
    card.classList.add(...attributes);
    card.classList.add('card');
    card.id = idStr;

    for (let i = 0; i < attributes[3]-1; i++) {
      let img = document.createElement('img');
      img.src = `img/${attributes[0]}-${attributes[1]}-${attributes[2]}.png`
      card.appendChild(img);
    }

    card.addEventListener('click', cardSelected);
    return card;
  }

//Starts the timer for a new game. No return value.
  function startTimer() {
    let select = qs('select');
    remainingSeconds= parseInt(select.value);
    updateTimerDisplay();
    timerId = setInterval(advanceTimer,1000);
  }

//Updates the game timer (module-global and #time shown on page) by 1 second. No return value.
  function advanceTimer() {
    remainingSeconds--;
    updateTimerDisplay();
    if (remainingSeconds <= 0) {
      clearInterval(timerId);
      endGame();
    }
  }

  function updateTimerDisplay() {
    let timeSpan = id('time');
    let minutes = Math.floor(remainingSeconds/60).toString();
    let seconds = (remainingSeconds%60).toString();
    timeSpan.textContent = `${minutes}:${seconds}`;
  }

  function endGame() {
    clearInterval(timerId);
    qsa('.card').forEach(card => {
      card.removeEventListener('click', cardSelected);
      card.classList.remove('selected');
    });
    id('refresh-btn').disabled = true;
  }


  function cardSelected() {
    if (remainingSeconds <= 0) return;
  
    // Toggle selection
    if (!this.classList.contains('selected')) {
      this.classList.add('selected');
      currentlySelected++;
    } else {
      this.classList.remove('selected');
      currentlySelected--;
    }
  
    let selected = qsa('.card.selected');
  
    // Only evaluate when exactly 3 cards are selected
    if (selected.length === 3) {
      let message = document.createElement('p');
      message.classList.add('temp-message'); // Optional: for styling or removal
      let board = id('board');
  
      if (isASet(selected)) {
        message.textContent = 'SET!';
        id('set-count').textContent = setCount;
  
        // Remove and replace cards
        selected.forEach(card => card.remove());
        for (let i = 0; i < 3; i++) {
          let isEasy = qs('input[name="diff"]:checked').value === 'easy';
          let newCard = generateUniqueCard(isEasy);
          board.appendChild(newCard);
        }
      } else {
        message.textContent = 'Not a Set :(';
        remainingSeconds = Math.max(0, remainingSeconds - 15);
      }
  
      // Display message directly in the board (or anywhere else you'd like)
      board.appendChild(message);
  
      setTimeout(() => {
        message.remove();
        qsa('.card.selected').forEach(card => card.classList.remove('selected'));
        currentlySelected = 0;
      }, 1000);
    }
  }

  function refreshBoard() {
    let board = id('board');
    board.innerHTML = '';
    for (let i = 0; i< 12; i++) {
      let isEasy = qs('input[name="diff"]:checked').value === 'easy';
      let card = generateUniqueCard(isEasy);
      board.appendChild(card);
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