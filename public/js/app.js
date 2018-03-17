'use strict';

var app = app || {};
const __API_URL__ = 'http://localhost:3000';

const cardSectionEl = document.getElementById('card');
const headerEl = document.getElementsByTagName('h1')[0];
const translationSectionEl = document.getElementById('translation');
const buttonSectionEl = document.getElementById('buttons');


(module => {

  let lang = localStorage.language.toLowerCase();
  Flashcard.all = [];

  // flaschard constructor
  function Flashcard(card) {
    this.eng = card.english;
    this.native = card[lang];
    this.type = card.type;
  }

  Flashcard.fetchAndLoadVocab = () => {
    $.get(`${__API_URL__}/api/${lang}/words`)
      .then(words => Flashcard.all = words.map(card => new Flashcard(card)))
      .catch(console.error);
  };

  module.Flaschard = Flashcard;
})(app);




// // header message customized for chosen language
// function renderLang() {
//   headerEl.innerHTML = 'Your <span>' + JSON.parse(localStorage.getItem('language')) + '</span> Flashcards';
// }

// // collects only cards from the chosen language
// function filterCards() {
//   const chosenLang = JSON.parse(localStorage.getItem('language'));
//   for (let i in Flashcard.allFlashcards) {
//     let values = Object.values(Flashcard.allFlashcards[i]);
//     for (let j in values) {
//       if (values[j] === chosenLang) {
//         Flashcard.currentFlashcards.push(Flashcard.allFlashcards[i]);
//       }
//     }
//   }
// }

// // random number generator
// function randomNum() {
//   return Math.floor(Math.random() * Flashcard.currentFlashcards.length);
// }

// // parses property from local storage to render desired translation direction
// // use random number generator to choose and render a random card from the
// // currentFlashcards array
// function renderCard() {
//   cardSectionEl.innerHTML = '';
//   translationSectionEl.innerHTML = '';
//   buttonSectionEl.innerHTML = '';
//   const chosenDirection = JSON.parse(localStorage.getItem('translation-direction'));
//   const rand = randomNum();
//   const wordEl = document.createElement('h1');
//   const currentWord = Flashcard.currentFlashcards[rand];

//   if (chosenDirection === 'native-eng') {
//     wordEl.textContent = currentWord.native;
//   } else if (chosenDirection === 'eng-native') {
//     wordEl.textContent = currentWord.eng;
//   }
//   cardSectionEl.appendChild(wordEl);
//   cardSectionEl.addEventListener('click', function renderTranslation() {
//     const translation = document.createElement('h2');
//     if (chosenDirection === 'native-eng') {
//       translation.textContent = currentWord.eng;
//     } else if (chosenDirection === 'eng-native') {
//       translation.textContent = currentWord.native;
//     }
//     translationSectionEl.appendChild(translation);

//     renderNextButton();
//     cardSectionEl.removeEventListener('click', renderTranslation);
//   });
// }

// function renderNextButton() {
//   const nextButton = document.createElement('button');
//   nextButton.textContent = 'Next';
//   buttonSectionEl.appendChild(nextButton);
//   buttonSectionEl.addEventListener('click', nextCard);
// }


// function nextCard(e) {
//   if (e.srcElement.textContent !== 'Next') {
//     return;
//   } else {
//     removeEventListener('click', nextCard);
//     renderCard();
//   }
// }


// renderLang();
// filterCards();
// renderCard();