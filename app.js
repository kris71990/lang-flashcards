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
new Flashcard('Dutch', 'vrouw', 'woman');
new Flashcard('German', 'frau', 'woman');
new Flashcard('French', 'femme', 'woman');
new Flashcard('Dutch', 'man', 'man');
new Flashcard('German', 'mann', 'man');
new Flashcard('French', 'homme', 'man');
new Flashcard('Dutch', 'meisje', 'girl');
new Flashcard('German', 'madchen', 'girl');
new Flashcard('French', 'fille', 'girl');
new Flashcard('Dutch', 'drinken', 'to drink');
new Flashcard('German', 'trinken', 'to drink');
new Flashcard('French', 'boire', 'to drink');
new Flashcard('Dutch', 'appel', 'apple');
new Flashcard('German', 'apfel', 'apple');
new Flashcard('French', 'pomme', 'apple');
new Flashcard('Dutch', 'jongen', 'boy');
new Flashcard('German', 'junge', 'boy');
new Flashcard('French', 'garcon', 'boy');
new Flashcard('Dutch', 'kind', 'child/kid');
new Flashcard('German', 'kind', 'child/kid');
new Flashcard('French', 'enfant', 'child/kid');
new Flashcard('Dutch', 'eten', 'to eat');
new Flashcard('German', 'essen', 'to eat');
new Flashcard('French', 'manger', 'to eat');
new Flashcard('Dutch', 'melk', 'milk');
new Flashcard('German', 'milch', 'milk');
new Flashcard('French', 'lait', 'milk');
new Flashcard('Dutch', 'menu', 'menu');
new Flashcard('German', 'menu', 'menu');
new Flashcard('French', 'menu', 'menu');
new Flashcard('Dutch', 'boek', 'book');
new Flashcard('German', 'buch', 'book');
new Flashcard('French', 'livre', 'book');
new Flashcard('Dutch', 'spreken', 'to speak');
new Flashcard('German', 'sprechen', 'to speak');
new Flashcard('French', 'parler', 'to speak');
new Flashcard('Dutch', 'lezen', 'to read');
new Flashcard('German', 'lesen', 'to read');
new Flashcard('French', 'lire', 'to read');
new Flashcard('Dutch', 'krant', 'newspaper');
new Flashcard('German', 'zeitung', 'newspaper');
new Flashcard('French', 'journal', 'newspaper');
new Flashcard('Dutch', 'boterham', 'sandwich');
new Flashcard('German', 'sandwich', 'sandwich');
new Flashcard('French', 'sandwich', 'sandwich');
new Flashcard('Dutch', 'rijst', 'rice');
new Flashcard('German', 'reis', 'rice');
new Flashcard('French', 'riz', 'rice');
new Flashcard('Dutch', 'water', 'water');
new Flashcard('German', 'wasser', 'water');
new Flashcard('French', 'eau', 'water');
new Flashcard('Dutch', 'goedendag', 'hello/good day');
new Flashcard('German', 'guten tag', 'hello/good day');
new Flashcard('French', 'bonjour', 'hello/good day');
new Flashcard('Dutch', 'doei', 'bye');
new Flashcard('German', 'tschuss', 'bye');
new Flashcard('French', 'au revoir', 'bye');
new Flashcard('Dutch', 'het spijt me', 'i\'m sorry');
new Flashcard('German', 'es tut mir leid', 'i\'m sorry');
new Flashcard('French', 'je suis desole', 'i\'m sorry');
new Flashcard('Dutch', 'tot ziens', 'see you later');
new Flashcard('German', 'bis spater', 'see you later');
new Flashcard('French', 'a plus tard', 'see you later');
new Flashcard('Dutch', 'goedenavond', 'good evening');
new Flashcard('German', 'guten abend', 'good evening');
new Flashcard('French', 'bonsoir', 'good afternoon/evening');
new Flashcard('Dutch', 'goedemorgan', 'good morning');
new Flashcard('German', 'guten morgan', 'good morning');
new Flashcard('Dutch', 'Nederlands', 'Dutch');
new Flashcard('German', 'Deutsche', 'German');
new Flashcard('Dutch', 'Frans', 'French');
new Flashcard('German', 'Franzosisch', 'French');
new Flashcard('French', 'Allemand', 'German');
new Flashcard('French', 'Neerlandais', 'Dutch');
new Flashcard('Dutch', 'Duitse', 'German');
new Flashcard('German', 'Niederlandisch', 'Dutch');
new Flashcard('Dutch', 'goedenacht', 'good night');
new Flashcard('German', 'guten nacht', 'good night');
new Flashcard('French', 'bonne nuit', 'good night');
new Flashcard('Dutch', 'water', 'water');
new Flashcard('German', 'wasser', 'water');
new Flashcard('French', 'eau', 'water');
new Flashcard('Dutch', 'sap', 'juice');
new Flashcard('German', 'saft', 'juice');
new Flashcard('French', 'jus', 'juice');
new Flashcard('Dutch', 'een beetje', 'a little/a bit');
new Flashcard('German', 'ein bisschen', 'a little/a bit');
new Flashcard('French', 'un petit', 'a little/a bit');
new Flashcard('Dutch', 'kip', 'chicken');
new Flashcard('German', 'hähnchen', 'chicken');
new Flashcard('French', 'poulet', 'chicken');
new Flashcard('Dutch', 'groente', 'vegeables');
new Flashcard('German', 'gemuse', 'vegeables');
new Flashcard('French', 'legumes', 'vegetables');
new Flashcard('Dutch', 'fruit', 'fruit');
new Flashcard('German', 'fruchte', 'fruit');
new Flashcard('French', 'fruit', 'fruit');
new Flashcard('Dutch', 'lekker', 'tasty');
new Flashcard('German', 'lecker', 'tasty');
new Flashcard('French', 'delicieux', 'tasty');
new Flashcard('Dutch', 'tomaat', 'tomato');
new Flashcard('German', 'tomate', 'tomato');
new Flashcard('French', 'tomate', 'tomato');
new Flashcard('Dutch', 'sinaasappel', 'orange');
new Flashcard('German', 'orange', 'orange');
new Flashcard('French', 'orange', 'orange');
new Flashcard('Dutch', 'ontbijt', 'breakfast');
new Flashcard('German', 'fruhstuck', 'breakfast');
new Flashcard('French', 'petit dejeuner', 'breakfast');
new Flashcard('Dutch', 'middageten', 'lunch');
new Flashcard('German', 'mittagessen', 'lunch');
new Flashcard('French', 'dejeuner', 'lunch');
new Flashcard('Dutch', 'avondeten', 'dinner');
new Flashcard('German', 'abendessen', 'dinner');
new Flashcard('French', 'diner', 'dinner');
new Flashcard('Dutch', 'honger', 'hungry');
new Flashcard('German', 'hungrig', 'hungry');
new Flashcard('French', 'affame', 'hungry');
new Flashcard('Dutch', 'dorst', 'thirsty');
new Flashcard('German', 'durstig', 'thirsty');
new Flashcard('French', 'assoiffe', 'thirsty');
new Flashcard('Dutch', 'kat', 'cat');
new Flashcard('German', 'katze', 'cat');
new Flashcard('French', 'chat', 'cat');
new Flashcard('Dutch', 'hond', 'dog');
new Flashcard('German', 'hund', 'dog');
new Flashcard('French', 'chien', 'dog');
new Flashcard('Dutch', 'muis', 'mouse');
new Flashcard('German', 'maus', 'mouse');
new Flashcard('French', 'souris', 'mouse');
new Flashcard('Dutch', 'paard', 'horse');
new Flashcard('German', 'pferd', 'horse');
new Flashcard('French', 'cheval', 'horse');
new Flashcard('Dutch', 'konijn', 'rabbit');
new Flashcard('German', 'hase', 'rabbit');
new Flashcard('French', 'lapin', 'rabbit');
new Flashcard('Dutch', 'eend', 'duck');
new Flashcard('German', 'ente', 'duck');
new Flashcard('French', 'canard', 'duck');
new Flashcard('Dutch', 'olifant', 'elephant');
new Flashcard('German', 'elefant', 'elephant');
new Flashcard('French', 'elephant', 'elephant');
new Flashcard('Dutch', 'brood', 'bread');
new Flashcard('German', 'brot', 'bread');
new Flashcard('French', 'pain', 'bread');
new Flashcard('Dutch', 'schildpad', 'turtle');
new Flashcard('German', 'schildkrote', 'turtle');
new Flashcard('French', 'tortue', 'turtle');
new Flashcard('Dutch', 'koe', 'cow');
new Flashcard('German', 'kuh', 'cow');
new Flashcard('French', 'vache', 'cow');

// header message customized for chosen language
function renderLang() {
  headerEl.innerHTML = 'Your <span>' + JSON.parse(localStorage.getItem('language')) + '</span> Flashcards';
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

// parses property from local storage to render desired translation direction
// use random number generator to choose and render a random card from the
// currentFlashcards array
function renderCard() {
  sectionEl.innerHTML = '';
  var chosenDirection = JSON.parse(localStorage.getItem('translation-direction'));
  var rand = randomNum();
  var wordEl = document.createElement('h1');

  if (chosenDirection === 'native-eng') {
    wordEl.textContent = Flashcard.currentFlashcards[rand].native;
  } else if (chosenDirection === 'eng-native') {
    wordEl.textContent = Flashcard.currentFlashcards[rand].eng;
  }
  sectionEl.appendChild(wordEl);
  renderNextButton();
}

function renderNextButton() {
  var nextButton = document.createElement('button');
  nextButton.textContent = 'Next Card';
  sectionEl.appendChild(nextButton);
  sectionEl.addEventListener('click', function(e) {
    if (e.srcElement.textContent !== 'Next Card') {
      return;
    } else {
      renderCard();
    }
  });
}

renderLang();
filterCards();
renderCard();