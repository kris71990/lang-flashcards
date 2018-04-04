'use strict';

var app = app || {};
// const __API_URL__ = 'http://localhost:3000';
const __API_URL__ = 'https://language-cards.herokuapp.com';


(module => {
  Flashcard.all = [];

  function Flashcard(card) {
    let lang = localStorage.language.toLowerCase();
    this.english = card.english;
    this[lang] = card[lang];
    this.type = card.type;
  }

  Flashcard.loadVocabFromLocal = () => {
    Flashcard.all = JSON.parse(localStorage['lang-cards']).map(card => new Flashcard(card));
    module.cardView.initCards();
  };

  Flashcard.loadVocabFromDB = words => {
    Flashcard.all = words.map(card => new Flashcard(card));
    localStorage.setItem('lang-cards', JSON.stringify(Flashcard.all));
    module.cardView.initCards();
  };

  Flashcard.fetchVocab = lang => {
    $.get(`${__API_URL__}/api/${lang}/words`)
      .then(Flashcard.loadVocabFromDB)
      .catch(console.error);
  };

  module.Flashcard = Flashcard;
})(app);
