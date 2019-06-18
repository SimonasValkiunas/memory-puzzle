document.addEventListener('DOMContentLoaded', function(event) {
  var btn = document.querySelector('#play');
  var allCards = document.querySelectorAll('.card');
  var timer = document.querySelector('#timer');

  var wasFlipped = false;
  var lock = true;
  var cardOne, cardTwo;
  var correctGuesses;

  btn.addEventListener('click', () => {
    lock = false;
    wasFlipped = false;
    cardOne = null;
    cardTwo = null;
    correctGuesses = 0;
    console.log('initialize');
    document.querySelector('.congrats').classList.add('hide');
    document.querySelector('.gameOver').classList.add('hide');
    allCards.forEach(
      card => (card.style.order = Math.floor(Math.random() * 12))
    );
    console.log('Shuffled');
    allCards.forEach(card => card.classList.add('flip'));
    console.log('Face up');
    document.querySelector('.timer').classList.remove('hide');

    var x = setInterval(() => {
      var time = timer.innerHTML;
      time = time - 1;
      timer.innerHTML = time;
      if (time <= 0) {
        clearInterval(x);
        document.querySelector('.timer').classList.add('hide');
        allCards.forEach(card => card.classList.remove('flip'));
        allCards.forEach(card => card.addEventListener('click', toggleFlip));
        timer.innerHTML = 5;
      }
    }, 1000);
  });

  function toggleFlip() {
    console.log('Lock: ' + lock + ' This: ' + this + ' Card ONE: ' + cardOne);

    if (lock === false && this !== cardOne) {
      console.log(lock);

      this.classList.toggle('flip');

      if (!wasFlipped) {
        wasFlipped = true;
        cardOne = this;
      } else {
        wasFlipped = false;
        cardTwo = this;

        if (cardOne.dataset.name === cardTwo.dataset.name) {
          cardOne.removeEventListener('click', toggleFlip);
          cardTwo.removeEventListener('click', toggleFlip);
          lock = false;
          cardOne = null;
          cardTwo = null;
          correctGuesses = correctGuesses + 1;
          if (correctGuesses === 6) {
            document.querySelector('.congrats').classList.toggle('hide');
            lock = true;
          }
        } else {
          lock = true;
          allCards.forEach(card => card.classList.remove('flip'));
          document.querySelector('.gameOver').classList.toggle('hide');
          cardOne = null;
          cardTwo = null;
        }
      }
    }
  }
});
