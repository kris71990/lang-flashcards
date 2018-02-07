'use strict';

var sectionEl = document.getElementById('language');
var divEl = document.getElementById('to-cards');
var counter = 0;

sectionEl.addEventListener('click', selectLanguage);

function selectLanguage(e) {
  var langs = document.querySelectorAll('.lang');

  for (var i = 0; i < langs.length; i++) {
    langs[i].id = '';
  }

  var target = e.srcElement;

  if (target.id !== 'chosen') {
    target.setAttribute('id', 'chosen');
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
