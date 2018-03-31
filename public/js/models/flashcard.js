'use strict';

var app = app || {};
const __API_URL__ = 'http://localhost:3000';


(module => {
  Flashcard.all = [];

  function Flashcard(card) {
    let lang = localStorage.language.toLowerCase();
    this.eng = card.english;
    this[lang] = card[lang];
    this.type = card.type;
  }

  Flashcard.loadVocab = words => {
    Flashcard.all = words.map(card => new Flashcard(card));
    localStorage.setItem('lang-cards', JSON.stringify(Flashcard.all));
    module.cardView.initCards();
  };

  Flashcard.fetchVocab = lang => {
    $.get(`${__API_URL__}/api/${lang}/words`)
      .then(Flashcard.loadVocab)
      .catch(console.error);
  };

  module.Flashcard = Flashcard;
})(app);
