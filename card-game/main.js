document.addEventListener('DOMContentLoaded', function(event) {
  var btn = document.querySelector('#play');
  var allCards = document.querySelectorAll('.card');
  var timer = document.querySelector('#timer');

  var wasFlipped = false;
  var lock = true;
  var cardOne, cardTwo;
  var correctGuesses;

  btn.addEventListener('click', () => {
    //Initial game parameter values
    lock = false;
    wasFlipped = false;
    cardOne = null;
    cardTwo = null;
    correctGuesses = 0;

    // Hide game text
    document.querySelector('.congrats').classList.add('hide');
    document.querySelector('.gameOver').classList.add('hide');

    // Shuffle the cards
    allCards.forEach(
      card => (card.style.order = Math.floor(Math.random() * 12))
    );

    //Show cards and timer
    allCards.forEach(card => card.classList.add('flip'));
    document.querySelector('.timer').classList.remove('hide');

    //Start the timer
    var x = setInterval(() => {
      //Count down the time
      var time = timer.innerHTML;
      time = time - 1;
      timer.innerHTML = time;

      //If count down is over start the game and reset the timer.
      if (time <= 0) {
        clearInterval(x);

        //Hide timer
        document.querySelector('.timer').classList.add('hide');

        //Flip over the cards
        allCards.forEach(card => card.classList.remove('flip'));

        //Start the listeners
        allCards.forEach(card => card.addEventListener('click', flip));

        //reset the timer
        timer.innerHTML = 5;
      }
    }, 1000);
  });

  function flip() {
    // Check if board isn't locked and user is not clicking the same card
    if (!lock && this !== cardOne) {
      //flip the card
      this.classList.toggle('flip');

      //check if this was first or second flip
      if (!wasFlipped) {
        wasFlipped = true;
        cardOne = this;
      } else {
        wasFlipped = false;
        cardTwo = this;

        //Check if cards are matching
        if (cardOne.dataset.name === cardTwo.dataset.name) {
          //Cards are matching
          //lock the cards
          cardOne.removeEventListener('click', flip);
          cardTwo.removeEventListener('click', flip);

          //unlock the board and reset first and second card
          lock = false;
          cardOne = null;
          cardTwo = null;

          //increment the score
          correctGuesses = correctGuesses + 1;
          //win condition
          if (correctGuesses === 6) {
            //Show game text and lock the board
            document.querySelector('.congrats').classList.toggle('hide');
            lock = true;
          }
        } else {
          //Cards aren't matching, game is lost. Lock the board, flip over the cards and show game text
          lock = true;
          setTimeout(() => {
            allCards.forEach(card => card.classList.remove('flip'));
            document.querySelector('.gameOver').classList.toggle('hide');
          }, 1000);
        }
      }
    }
  }
});
