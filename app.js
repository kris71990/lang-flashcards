'use strict';

var sectionEl = document.getElementById('card');
var headerEl = document.getElementsByTagName('h1')[0];

Flashcard.allFlashcards = [];
Flashcard.currentFlashcards = [];

// flaschard constructor
function Flashcard(lang, native, eng) {
  this.lang = lang;
  this.native = native;
  this.eng = eng;
  Flashcard.allFlashcards.push(this);
}

// create objects for all flashcards in all languages
new Flashcard('German', 'danke', 'thank you');
new Flashcard('German', 'bitte', 'please');
new Flashcard('French', 'merci', 'thank you');
new Flashcard('French', 's\'il vous plait', 'please');
new Flashcard('Dutch', 'dank je', 'thank you');
new Flashcard('Dutch', 'alsjeblieft', 'please');

// header message customized for chosen language
function renderLang() {
  headerEl.innerHTML = 'Your ' + JSON.parse(localStorage.getItem('language')) + ' Flashcards';
}

// collects only cards from the chosen language
function filterCards() {
  var chosenLang = JSON.parse(localStorage.getItem('language'));
  for (var i in Flashcard.allFlashcards) {
    var values = Object.values(Flashcard.allFlashcards[i]);
    for (var j in values) {
      if (values[j] === chosenLang) {
        Flashcard.currentFlashcards.push(Flashcard.allFlashcards[i]);
      }
    }
  }
}

// random number generator
function randomNum() {
  return Math.floor(Math.random() * Flashcard.currentFlashcards.length);
}

// use random number generator to choose and render a random card from the
// currentFlascards array
function renderCard() {
  var rand = randomNum();
  var wordEl = document.createElement('h1');
  wordEl.textContent = Flashcard.currentFlashcards[rand].native;
  sectionEl.appendChild(wordEl);
}

renderLang();
filterCards();
renderCard();