'use strict';

var sectionEl = document.getElementById('language');
var divEl = document.getElementById('to-cards');
var counter = 0;

sectionEl.addEventListener('click', selectLanguage);

function selectLanguage(e) {
  var langs = document.querySelectorAll('.lang');
  var target = e.srcElement;
  console.log(e);

  for (var i = 0; i < langs.length; i++) {
    langs[i].id = '';
  }

  target.setAttribute('id', 'chosen');

  if (e.target.name === 'Dutch') {
    e.target.setAttribute('style', 'background-image: url(img/netherlands.png); background-repeat: no-repeat');
    // target.style.background = 'url(img/netherlands.png)';
  } else if (e.target.name === 'German') {
    e.target.setAttribute('style', 'background-image: url(img/germany.png); background-repeat: no-repeat');
  } else if (e.target.name === 'French') {
    e.target.setAttribute('style', 'background-image: url(img/france.png); background-repeat: no-repeat');
  }

  for (var x = 0; x < langs.length; x++) {
    if (langs[x].id !== 'chosen') {
      langs[x].style.background = '';
    }
  }

  localStorage.setItem('language', JSON.stringify(target.name));

  if (counter === 0) {
    var nextEl = document.createElement('button');
    nextEl.textContent = 'To Flashcards';
    divEl.appendChild(nextEl);
    divEl.addEventListener('click', function() {
      window.location.href = 'app.html';
    });
  }

  counter += 1;
}
