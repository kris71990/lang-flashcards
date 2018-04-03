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
    const $word = $('<h1></h1>').hide();
    const currentWord = module.Flashcard.all[rand];

    if (chosenDirection === 'native-eng') {
      $word.text(`${currentWord[chosenLang]}`);
    } else if (chosenDirection === 'eng-native') {
      $word.text(`${currentWord.english}`);
    }

    $('#card').append($word);
    $($word).fadeIn(500);
    $('#card').on('click', function renderTranslation() {
      $('#translation').empty();
      const $translation = $('<h2></h2>').hide();
      if (chosenDirection === 'native-eng') {
        $translation.text(`${currentWord.english}`);
      } else if (chosenDirection === 'eng-native') {
        $translation.text(`${currentWord[chosenLang]}`);
      }
      $('#translation').append($translation);
      $translation.fadeIn(1000);

      cardView.renderNextButton();
      $('#card').off('click', renderTranslation);
    });
  };

  cardView.renderNextButton = () => {
    $('#buttons').empty();
    const $next = $('<button></button>').hide();
    $next.text('Next');
    $('#buttons').append($next);
    $next.fadeIn(1500);
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