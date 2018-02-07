'use strict';

var sectionEl = document.getElementById('card');
var headerEl = document.getElementsByTagName('h1')[0];

Flashcard.allFlashcards = [];

function Flashcard(native, eng) {
  this.native = native;
  this.eng = eng;
  Flashcard.allFlashcards.push(this);
}

new Flashcard('danke', 'thank you');
new Flashcard('bitte', 'please');

function renderLang() {
  headerEl.innerHTML = 'Your ' + JSON.parse(localStorage.getItem('language')) + ' Flashcards';
}

function randomCard() {
  return Math.floor(Math.random() * Flashcard.allFlashcards.length);
}

function renderCard() {
  var rand = randomCard();
  var wordEl = document.createElement('h1');
  wordEl.textContent = Flashcard.allFlashcards[rand].native;
  sectionEl.appendChild(wordEl);
}

renderLang();
renderCard();