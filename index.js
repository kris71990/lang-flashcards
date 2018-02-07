'use strict';

var sectionEl = document.getElementById('language');
var divEl = document.getElementById('to-cards');

/* !!!! - function to prevent multiple language selections
function renderLangs() {
  var langs = document.querySelectorAll('.lang');
  console.log(langs);
}
*/

sectionEl.addEventListener('click', selectLanguage);

function selectLanguage(e) {
  var target = e.target;
  localStorage.setItem('language', JSON.stringify(target.name));
  e.srcElement.setAttribute('class', 'chosen');

  // if ()
  var nextEl = document.createElement('button');
  nextEl.textContent = 'To Flashcards';
  divEl.appendChild(nextEl);
  divEl.addEventListener('click', function() {
    window.location.href = 'app.html';
  });
}

// renderLangs();