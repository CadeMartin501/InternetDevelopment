(function() {
  'use strict';

  let timerId;
  let remainingSeconds;
  let setCount = 0;
  let currentlySelected = 0;

  window.addEventListener('load', init);

  function init() {
    id('start-btn').addEventListener('click', toggleView);
    id('back-btn').addEventListener('click', toggleView);
    id('refresh-btn').addEventListener('click', refreshBoard);
  }

  function toggleView() {
    let menu = id('menu-view');
    menu.classList.toggle('hidden');
    let game = id('game-view');
    game.classList.toggle('hidden');
    
    // Only start game if on menu.
    if (!game.classList.contains('hidden')) {
      startTimer();
      generateInitialBoard();
    } else {
      // Stopping game
      clearInterval(timerId);
      resetGame();
    }
  }
  
  function resetGame() {
    const board = id('board');
    board.innerHTML = ''; // Clear the board
    setCount = 0;
    id('set-count').textContent = '0';
    id('refresh-btn').disabled = false;
  }
  
  function generateInitialBoard() {
    const board = id('board');
    board.innerHTML = ''; // Clear any existing cards
    
    const isEasy = qs('input[name="diff"]:checked').value === 'easy';
    
    for (let i = 0; i < 12; i++) {
      let card = generateUniqueCard(isEasy);
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

  /**
   * Returns a randomly-generated array of string attributes in the form [COLOR, FILL, SHAPE, COUNT]
   * @param {boolean} isEasy - If the game mode is set to easy or not
   * @return {string[]} Array of attributes
   */
  function generateRandomAttributes(isEasy) {
    let colors = ["red", "purple", "green"];
    let fills = isEasy ? ["solid"] : ["outline", "solid", "striped"];
    let shapes = ["diamond", "oval", "squiggle"];
    let counts = ["1", "2", "3"];
    
    return [colors[Math.floor(Math.random() * colors.length)], fills[Math.floor(Math.random() * fills.length)], shapes[Math.floor(Math.random() * shapes.length)], counts[Math.floor(Math.random() * counts.length)]];
  }

  /**
   * Return a div element with COUNT number of img elements appended as children
   * @param {boolean} isEasy - If the game mode is set to easy or not
   * @return {HTMLElement} A new unique card element
   */
  function generateUniqueCard(isEasy) {
    let board = id('board');
    let existingIds = new Set([...board.children].map(c => c.id)); //gets each child of board (card) and maps it to it's id
    
    let attributes;
    let idStr;
    
    do {
      attributes = generateRandomAttributes(isEasy);
      idStr = attributes.join('-'); //gets it to the best form to get pngs 
    } while (existingIds.has(idStr));
    
    let card = document.createElement('div');
    card.classList.add(...attributes, 'card'); // makes each card a div and gives it 'card' class so it has styling.
    card.id = idStr; // Set ID for isASet function to work
    
    // Add the correct number of images based on the count
    let count = parseInt(attributes[3]);
    for (let i = 0; i < count; i++) {
      let img = document.createElement('img');
      img.src = `img/${attributes[0]}-${attributes[1]}-${attributes[2]}.png`;
      card.appendChild(img);
    }
    card.addEventListener('click', cardSelected);
    return card;
  }

  /**
   * Starts the timer for a new game.
   */
  function startTimer() {
    if (timerId) { //checks if timer has an interval
      clearInterval(timerId);
    }
    
    let select = qs('select'); // gets timer length for game
    remainingSeconds = parseInt(select.value);
    updateTimerDisplay();
    timerId = setInterval(advanceTimer, 1000);
  }

  function advanceTimer() {
    remainingSeconds--;
    updateTimerDisplay();
    if (remainingSeconds <= 0) {
      clearInterval(timerId);
      endGame();
    }
  }

  /**
   * Updates the timer display with the current time
   */
  function updateTimerDisplay() {
    let timeSpan = id('time');
    let minutes = Math.floor(remainingSeconds / 60).toString();
    let seconds = (remainingSeconds % 60).toString().padStart(2, '0');
    timeSpan.textContent = `${minutes}:${seconds}`;
  }

  /**
   * Ends the game, disabling all interactions
   */
  function endGame() {
    clearInterval(timerId);
    qsa('.card').forEach(card => {
      card.removeEventListener('click', cardSelected);
      card.classList.remove('selected');
    });
    id('refresh-btn').disabled = true;
    
    // Display end of game message
    let message = document.createElement('p');
    message.textContent = `Game Over! You found ${setCount} sets!`;
    id('board').appendChild(message);
  }

  /**
   * Handles the card selection logic
   */
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
      let isValidSet = isASet(selected);
      
      let board = id('board');
  
      if (isValidSet) {
        // Increase set count
        id('set-count').textContent = setCount;
        updateTimerDisplay();
        
        // Mark the cards as a SET!
        selected.forEach(card => {
          // Clear card content
          card.innerHTML = '';
          
          // Add "SET!" message
          let setText = document.createElement('p');
          setText.textContent = 'SET!';
          setText.style.fontSize = '24pt';
          setText.style.color = 'green';
          card.appendChild(setText);
        });
        
        // Replace cards after a short delay
        setTimeout(() => {
          const isEasy = qs('input[name="diff"]:checked').value === 'easy';
          selected.forEach(card => {
            // Create new card and insert at same position
            let newCard = generateUniqueCard(isEasy);
            board.replaceChild(newCard, card);
          });
          currentlySelected = 0;
        }, 1000);
      } else {
        // Create a temporary message for incorrect sets
        let message = document.createElement('p');
        message.textContent = 'Not a Set :(';
        message.classList.add('temp-message');
        message.style.position = 'absolute';
        message.style.fontSize = '24pt';
        message.style.fontWeight = 'bold';
        message.style.textAlign = 'center';
        message.style.width = '100%';
        message.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        
        // Display message
        board.insertBefore(message, board.firstChild);
        updateTimerDisplay();
        
        // Remove message and clear selections after a short delay
        setTimeout(() => {
          message.remove();
          selected.forEach(card => card.classList.remove('selected'));
          currentlySelected = 0;
        }, 1000);
      }
    }
  }

  function refreshBoard() {
    let board = id('board');
    board.innerHTML = '';
    
    const isEasy = qs('input[name="diff"]:checked').value === 'easy';
    for (let i = 0; i < 12; i++) {
      let card = generateUniqueCard(isEasy);
      board.appendChild(card);
    }
  }

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