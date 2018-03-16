'use strict';

var app = app || {};
const __API_URL__ = 'http://localhost:3000';

const cardSectionEl = document.getElementById('card');
const headerEl = document.getElementsByTagName('h1')[0];
const translationSectionEl = document.getElementById('translation');
const buttonSectionEl = document.getElementById('buttons');

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
new Flashcard('Dutch', 'schoen', 'shoe', 'clothing');
new Flashcard('German', 'schuh', 'shoe', 'clothing');
new Flashcard('Dutch', 'broeken', 'pants', 'clothing');
new Flashcard('German', 'hose', 'pants', 'clothing');
new Flashcard('Dutch', 'dragen', 'to wear', 'verb');
new Flashcard('German', 'tragen', 'to wear', 'verb');
new Flashcard('Dutch', 'jurk', 'dress', 'clothing');
new Flashcard('German', 'kleid', 'dress', 'clothing');
new Flashcard('Dutch', 'jas', 'coat', 'clothing');
new Flashcard('German', 'mantel', 'coat', 'clothing');
new Flashcard('Dutch', 'trui', 'sweater', 'clothing');
new Flashcard('Dutch', 'hoed', 'hat', 'clothing');
new Flashcard('German', 'hut', 'hat', 'clothing');
new Flashcard('Dutch', 'sokken', 'socks', 'clothing');
new Flashcard('German', 'socken', 'socks', 'clothing');
new Flashcard('Dutch', 'kleren', 'clothes', 'clothing');
new Flashcard('German', 'kleidung', 'clothes', 'clothing');
new Flashcard('Dutch', 'rok', 'skirt', 'clothing');
new Flashcard('German', 'rock', 'skirt', 'clothing');
new Flashcard('Dutch', 'dier', 'animal', 'animal');
new Flashcard('German', 'tier', 'animal', 'animal');
new Flashcard('German', 'haustier', 'pet', 'animal');
new Flashcard('German', 'schmuck', 'jewelry', 'clothing');
new Flashcard('Dutch', 'sterk', 'strong', 'adjective');
new Flashcard('German', 'stark', 'strong', 'adjective');
new Flashcard('German', 'tasche', 'bag', 'object');
new Flashcard('German', 'tas', 'bag', 'object');
new Flashcard('German', 'jacke', 'jacket', 'clothing');
new Flashcard('Dutch', 'hemd', 'shirt', 'clothing');
new Flashcard('German', 'hemd', 'shirt', 'clothing');
new Flashcard('Dutch', 'bril', 'glasses', 'clothing');
new Flashcard('German', 'brillen', 'glasses', 'clothing');
new Flashcard('French', 'balein', 'whale', 'animal');
new Flashcard('French', 'singe', 'monkey', 'animal');
new Flashcard('French', 'serpent', 'snake', 'animal');
new Flashcard('French', 'cochon', 'pig', 'animal');
new Flashcard('French', 'poisson', 'fish', 'animal');
new Flashcard('French', 'abeille', 'bee', 'animal');
new Flashcard('French', 'spider', 'araignee', 'animal');
new Flashcard('French', 'butterfly', 'papillon', 'animal');
new Flashcard('French', 'oiseau', 'bird', 'animal');
new Flashcard('French', 'requin', 'shark', 'animal');
new Flashcard('French', 'ours', 'bear', 'animal');
new Flashcard('French', 'beurre', 'butter', 'food');
new Flashcard('French', 'oeuf', 'egg', 'food');
new Flashcard('German', 'ei', 'egg', 'food');
new Flashcard('Dutch', 'ei', 'egg', 'food');
new Flashcard('French', 'biere', 'beer', 'food');
new Flashcard('German', 'bier', 'beer', 'food');
new Flashcard('Dutch', 'bier', 'beer', 'food');
new Flashcard('French', 'sel', 'salt', 'food');
new Flashcard('German', 'salz', 'salt', 'food');
new Flashcard('Dutch', 'zout', 'salt', 'food');
new Flashcard('French', 'poivre', 'pepper', 'food');
new Flashcard('German', 'pfeffer', 'pepper', 'food');
new Flashcard('Dutch', 'peper', 'pepper', 'food');
new Flashcard('French', 'sucre', 'sugar', 'food');
new Flashcard('German', 'zucker', 'sugar', 'food');
new Flashcard('Dutch', 'suiker', 'sugar', 'food');
new Flashcard('French', 'Lundi', 'Monday', 'calendar');
new Flashcard('German', 'Montag', 'Monday', 'calendar');
new Flashcard('Dutch', 'Maandag', 'Monday', 'calendar');
new Flashcard('French', 'Mardi', 'Tuesday', 'calendar');
new Flashcard('German', 'Dienstag', 'Tuesday', 'calendar');
new Flashcard('Dutch', 'Dinsdag', 'Tuesday', 'calendar');
new Flashcard('French', 'Mercredi', 'Wednesday', 'calendar');
new Flashcard('German', 'Mittwoch', 'Wednesday', 'calendar');
new Flashcard('Dutch', 'Woensdag', 'Wednesday', 'calendar');
new Flashcard('French', 'Jeudi', 'Thursday', 'calendar');
new Flashcard('German', 'Donnerstag', 'Thursday', 'calendar');
new Flashcard('Dutch', 'Donderdag', 'Thursday', 'calendar');
new Flashcard('French', 'Vendredi', 'Friday', 'calendar');
new Flashcard('German', 'Freitag', 'Friday', 'calendar');
new Flashcard('Dutch', 'Vrijdag', 'Friday', 'calendar');
new Flashcard('French', 'Samedi', 'Saturday', 'calendar');
new Flashcard('German', 'Samstag', 'Saturday', 'calendar');
new Flashcard('Dutch', 'Zaterdag', 'Saturday', 'calendar');
new Flashcard('French', 'Dimanche', 'Sunday', 'calendar');
new Flashcard('German', 'Sonntag', 'Sunday', 'calendar');
new Flashcard('Dutch', 'Zondag', 'Sunday', 'calendar');
new Flashcard('French', 'journee', 'day', 'calendar');
new Flashcard('French', 'matin', 'morning', 'calendar');
new Flashcard('French', 'apres midi', 'afternoon', 'calendar');
new Flashcard('French', 'minuit', 'midnight', 'calendar');
new Flashcard('German', 'mitternacht', 'midnight', 'calendar');
new Flashcard('Dutch', 'middernacht', 'midnight', 'calendar');

// header message customized for chosen language
function renderLang() {
  headerEl.innerHTML = 'Your <span>' + JSON.parse(localStorage.getItem('language')) + '</span> Flashcards';
}

// collects only cards from the chosen language
function filterCards() {
  const chosenLang = JSON.parse(localStorage.getItem('language'));
  for (let i in Flashcard.allFlashcards) {
    let values = Object.values(Flashcard.allFlashcards[i]);
    for (let j in values) {
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
  const chosenDirection = JSON.parse(localStorage.getItem('translation-direction'));
  const rand = randomNum();
  const wordEl = document.createElement('h1');
  const currentWord = Flashcard.currentFlashcards[rand];

  if (chosenDirection === 'native-eng') {
    wordEl.textContent = currentWord.native;
  } else if (chosenDirection === 'eng-native') {
    wordEl.textContent = currentWord.eng;
  }
  cardSectionEl.appendChild(wordEl);
  cardSectionEl.addEventListener('click', function renderTranslation() {
    const translation = document.createElement('h2');
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
  const nextButton = document.createElement('button');
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