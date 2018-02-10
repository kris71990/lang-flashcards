'use strict';

var cardSectionEl = document.getElementById('card');
var headerEl = document.getElementsByTagName('h1')[0];
var translationSectionEl = document.getElementById('translation');
var buttonSectionEl = document.getElementById('buttons');

Flashcard.allFlashcards = [];
Flashcard.currentFlashcards = [];

// flaschard constructor
function Flashcard(lang, native, eng, type) {
  this.lang = lang;
  this.native = native;
  this.eng = eng;
  this.type = type;
  Flashcard.allFlashcards.push(this);
}

// create objects for all flashcards in all languages
new Flashcard('German', 'danke', 'thank you', 'phrase');
new Flashcard('German', 'bitte', 'please', 'phrase');
new Flashcard('French', 'merci', 'thank you', 'phrase');
new Flashcard('French', 's\'il vous plait', 'please', 'phrase');
new Flashcard('Dutch', 'dank je', 'thank you', 'phrase');
new Flashcard('Dutch', 'vrouw', 'woman', 'people');
new Flashcard('German', 'frau', 'woman', 'people');
new Flashcard('French', 'femme', 'woman', 'people');
new Flashcard('Dutch', 'man', 'man', 'people');
new Flashcard('German', 'mann', 'man', 'people');
new Flashcard('French', 'homme', 'man', 'people');
new Flashcard('Dutch', 'meisje', 'girl', 'people');
new Flashcard('German', 'madchen', 'girl', 'people');
new Flashcard('French', 'fille', 'girl', 'people');
new Flashcard('Dutch', 'drinken', 'to drink', 'verb');
new Flashcard('German', 'trinken', 'to drink', 'verb');
new Flashcard('French', 'boire', 'to drink', 'verb');
new Flashcard('Dutch', 'appel', 'apple', 'food');
new Flashcard('German', 'apfel', 'apple', 'food');
new Flashcard('French', 'pomme', 'apple', 'food');
new Flashcard('Dutch', 'jongen', 'boy', 'people');
new Flashcard('German', 'junge', 'boy', 'people');
new Flashcard('French', 'garcon', 'boy', 'people');
new Flashcard('Dutch', 'kind', 'child/kid', 'people');
new Flashcard('German', 'kind', 'child/kid', 'people');
new Flashcard('French', 'enfant', 'child/kid', 'people');
new Flashcard('Dutch', 'eten', 'to eat', 'verb');
new Flashcard('German', 'essen', 'to eat', 'verb');
new Flashcard('French', 'manger', 'to eat', 'verb');
new Flashcard('Dutch', 'melk', 'milk', 'food');
new Flashcard('German', 'milch', 'milk', 'food');
new Flashcard('French', 'lait', 'milk', 'food');
new Flashcard('Dutch', 'menu', 'menu', 'food');
new Flashcard('German', 'menu', 'menu', 'food');
new Flashcard('French', 'menu', 'menu', 'food');
new Flashcard('Dutch', 'boek', 'book', 'object');
new Flashcard('German', 'buch', 'book', 'object');
new Flashcard('French', 'livre', 'book', 'object');
new Flashcard('Dutch', 'spreken', 'to speak', 'verb');
new Flashcard('German', 'sprechen', 'to speak', 'verb');
new Flashcard('French', 'parler', 'to speak', 'verb');
new Flashcard('Dutch', 'lezen', 'to read', 'verb');
new Flashcard('German', 'lesen', 'to read', 'verb');
new Flashcard('French', 'lire', 'to read', 'verb');
new Flashcard('Dutch', 'krant', 'newspaper', 'object');
new Flashcard('German', 'zeitung', 'newspaper', 'object');
new Flashcard('French', 'journal', 'newspaper', 'object');
new Flashcard('Dutch', 'boterham', 'sandwich', 'food');
new Flashcard('German', 'sandwich', 'sandwich', 'food');
new Flashcard('French', 'sandwich', 'sandwich', 'food');
new Flashcard('Dutch', 'rijst', 'rice', 'food');
new Flashcard('German', 'reis', 'rice', 'food');
new Flashcard('French', 'riz', 'rice', 'food');
new Flashcard('Dutch', 'water', 'water', 'food');
new Flashcard('German', 'wasser', 'water', 'food');
new Flashcard('French', 'eau', 'water', 'food');
new Flashcard('Dutch', 'goedendag', 'hello/good day', 'phrase');
new Flashcard('German', 'guten tag', 'hello/good day', 'phrase');
new Flashcard('French', 'bonjour', 'hello/good day', 'phrase');
new Flashcard('Dutch', 'doei', 'bye', 'phrase');
new Flashcard('German', 'tschuss', 'bye', 'phrase');
new Flashcard('French', 'au revoir', 'bye', 'phrase');
new Flashcard('Dutch', 'het spijt me', 'i\'m sorry', 'phrase');
new Flashcard('German', 'es tut mir leid', 'i\'m sorry', 'phrase');
new Flashcard('French', 'je suis desole', 'i\'m sorry', 'phrase');
new Flashcard('Dutch', 'tot ziens', 'see you later', 'phrase');
new Flashcard('German', 'bis spater', 'see you later', 'phrase');
new Flashcard('French', 'a plus tard', 'see you later', 'phrase');
new Flashcard('Dutch', 'goedenavond', 'good evening', 'phrase');
new Flashcard('German', 'guten abend', 'good evening', 'phrase');
new Flashcard('French', 'bonsoir', 'good afternoon/evening', 'phrase');
new Flashcard('Dutch', 'goedemorgan', 'good morning', 'phrase');
new Flashcard('German', 'guten morgan', 'good morning', 'phrase');
new Flashcard('Dutch', 'Nederlands', 'Dutch', 'language');
new Flashcard('German', 'Deutsche', 'German', 'language');
new Flashcard('Dutch', 'Frans', 'French', 'language');
new Flashcard('German', 'Franzosisch', 'French', 'language');
new Flashcard('French', 'Allemand', 'German', 'language');
new Flashcard('French', 'Neerlandais', 'Dutch', 'language');
new Flashcard('Dutch', 'Duitse', 'German', 'language');
new Flashcard('German', 'Niederlandisch', 'Dutch', 'language');
new Flashcard('Dutch', 'goedenacht', 'good night', 'phrase');
new Flashcard('German', 'guten nacht', 'good night', 'phrase');
new Flashcard('French', 'bonne nuit', 'good night', 'phrase');
new Flashcard('Dutch', 'sap', 'juice', 'food');
new Flashcard('German', 'saft', 'juice', 'food');
new Flashcard('French', 'jus', 'juice', 'food');
new Flashcard('Dutch', 'een beetje', 'a little/a bit', 'food');
new Flashcard('German', 'ein bisschen', 'a little/a bit', 'food');
new Flashcard('French', 'un petit', 'a little/a bit', 'food');
new Flashcard('Dutch', 'kip', 'chicken', 'animal');
new Flashcard('German', 'hähnchen', 'chicken', 'animal');
new Flashcard('French', 'poulet', 'chicken', 'animal');
new Flashcard('Dutch', 'groente', 'vegeables', 'food');
new Flashcard('German', 'gemuse', 'vegeables', 'food');
new Flashcard('French', 'legumes', 'vegetables', 'food');
new Flashcard('Dutch', 'fruit', 'fruit', 'food');
new Flashcard('German', 'fruchte', 'fruit', 'food');
new Flashcard('French', 'fruit', 'fruit', 'food');
new Flashcard('Dutch', 'lekker', 'tasty', 'food');
new Flashcard('German', 'lecker', 'tasty', 'food');
new Flashcard('French', 'delicieux', 'tasty', 'food');
new Flashcard('Dutch', 'tomaat', 'tomato', 'food');
new Flashcard('German', 'tomate', 'tomato', 'food');
new Flashcard('French', 'tomate', 'tomato', 'food');
new Flashcard('Dutch', 'sinaasappel', 'orange', 'food');
new Flashcard('German', 'orange', 'orange', 'food');
new Flashcard('French', 'orange', 'orange', 'food');
new Flashcard('Dutch', 'ontbijt', 'breakfast', 'food');
new Flashcard('German', 'fruhstuck', 'breakfast', 'food');
new Flashcard('French', 'petit dejeuner', 'breakfast', 'food');
new Flashcard('Dutch', 'middageten', 'lunch', 'food');
new Flashcard('German', 'mittagessen', 'lunch', 'food');
new Flashcard('French', 'dejeuner', 'lunch', 'food');
new Flashcard('Dutch', 'avondeten', 'dinner', 'food');
new Flashcard('German', 'abendessen', 'dinner', 'food');
new Flashcard('French', 'diner', 'dinner', 'food');
new Flashcard('Dutch', 'honger', 'hungry', 'food');
new Flashcard('German', 'hungrig', 'hungry', 'food');
new Flashcard('French', 'affame', 'hungry', 'food');
new Flashcard('Dutch', 'dorst', 'thirsty', 'food');
new Flashcard('German', 'durstig', 'thirsty', 'food');
new Flashcard('French', 'assoiffe', 'thirsty', 'food');
new Flashcard('Dutch', 'kat', 'cat', 'animal');
new Flashcard('German', 'katze', 'cat', 'animal');
new Flashcard('French', 'chat', 'cat', 'animal');
new Flashcard('Dutch', 'hond', 'dog', 'animal');
new Flashcard('German', 'hund', 'dog', 'animal');
new Flashcard('French', 'chien', 'dog', 'animal');
new Flashcard('Dutch', 'muis', 'mouse', 'animal');
new Flashcard('German', 'maus', 'mouse', 'animal');
new Flashcard('French', 'souris', 'mouse', 'animal');
new Flashcard('Dutch', 'paard', 'horse', 'animal');
new Flashcard('German', 'pferd', 'horse', 'animal');
new Flashcard('French', 'cheval', 'horse', 'animal');
new Flashcard('Dutch', 'konijn', 'rabbit', 'animal');
new Flashcard('German', 'hase', 'rabbit', 'animal');
new Flashcard('French', 'lapin', 'rabbit', 'animal');
new Flashcard('Dutch', 'eend', 'duck', 'animal');
new Flashcard('German', 'ente', 'duck', 'animal');
new Flashcard('French', 'canard', 'duck', 'animal');
new Flashcard('Dutch', 'olifant', 'elephant', 'animal');
new Flashcard('German', 'elefant', 'elephant', 'animal');
new Flashcard('French', 'elephant', 'elephant', 'animal');
new Flashcard('Dutch', 'brood', 'bread', 'food');
new Flashcard('German', 'brot', 'bread', 'food');
new Flashcard('French', 'pain', 'bread', 'food');
new Flashcard('Dutch', 'schildpad', 'turtle', 'animal');
new Flashcard('German', 'schildkrote', 'turtle', 'animal');
new Flashcard('French', 'tortue', 'turtle', 'animal');
new Flashcard('Dutch', 'koe', 'cow', 'animal');
new Flashcard('German', 'kuh', 'cow', 'animal');
new Flashcard('French', 'vache', 'cow', 'animal');

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
  cardSectionEl.innerHTML = '';
  translationSectionEl.innerHTML = '';
  buttonSectionEl.innerHTML = '';
  var chosenDirection = JSON.parse(localStorage.getItem('translation-direction'));
  var rand = randomNum();
  var wordEl = document.createElement('h1');
  var currentWord = Flashcard.currentFlashcards[rand];

  if (chosenDirection === 'native-eng') {
    wordEl.textContent = currentWord.native;
  } else if (chosenDirection === 'eng-native') {
    wordEl.textContent = currentWord.eng;
  }
  cardSectionEl.appendChild(wordEl);
  cardSectionEl.addEventListener('click', function renderTranslation() {
    var translation = document.createElement('h2');
    if (chosenDirection === 'native-eng') {
      translation.textContent = currentWord.eng;
    } else if (chosenDirection === 'eng-native') {
      translation.textContent = currentWord.native;
    }
    translationSectionEl.appendChild(translation);
    renderNextButton();
    cardSectionEl.removeEventListener('click', renderTranslation);
  });
}

function renderNextButton() {
  var nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  buttonSectionEl.appendChild(nextButton);
  buttonSectionEl.addEventListener('click', nextCard);
}


function nextCard(e) {
  if (e.srcElement.textContent !== 'Next') {
    return;
  } else {
    removeEventListener('click', nextCard);
    renderCard();
  }
}


renderLang();
filterCards();
renderCard();