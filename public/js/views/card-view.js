'use strict';

var app = app || {};

(module => {
  const cardView = {};

  cardView.initCards = () => {
    $('.container').hide();
    cardView.renderLang();
    cardView.renderCard();
    $('#cards-header').fadeIn(1000);
    $('#cards-main').fadeIn(1000);
  };

  // header message customized for chosen language
  cardView.renderLang = () => {
    $('#cards-header > h1').html('Your <span>' + localStorage.language + '</span> Flashcards');
    // $('#cards-header > p').html('These words are in ' + localStorage.language + ' because of your choice of translation direction. ')
  };

  cardView.randomNum = () => {
    return Math.floor(Math.random() * module.Flashcard.all.length);
  };

  // parses property from local storage to render desired translation direction
  // use random number generator to choose and render a random card from the currentFlashcards array
  cardView.renderCard = () => {
    $('#card').empty();
    $('#translation').empty();
    $('#buttons').empty();

    const chosenDirection = localStorage['translation-direction'];
    const chosenLang = localStorage.language.toLowerCase();
    const rand = cardView.randomNum();
    const wordEl = document.createElement('h1');
    const currentWord = module.Flashcard.all[rand];

    if (chosenDirection === 'native-eng') {
      wordEl.textContent = currentWord[chosenLang];
    } else if (chosenDirection === 'eng-native') {
      wordEl.textContent = currentWord.eng;
    }

    $('#card').append(wordEl);
    $('#card').on('click', function renderTranslation() {
      const translation = document.createElement('h2');
      if (chosenDirection === 'native-eng') {
        translation.textContent = currentWord.eng;
      } else if (chosenDirection === 'eng-native') {
        translation.textContent = currentWord[chosenLang];
      }
      $('#translation').append(translation);

      cardView.renderNextButton();
      $('#card').off('click', renderTranslation);
    });
  };

  cardView.renderNextButton = () => {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    $('#buttons').append(nextButton);
    $('#buttons').on('click', cardView.nextCard);
  };

  cardView.nextCard = e => {
    if (e.target.localName !== 'button') {
      return;
    } else {
      $('#buttons').off('click', cardView.nextCard);
      cardView.renderCard();
    }
  };

  module.cardView = cardView;
})(app);