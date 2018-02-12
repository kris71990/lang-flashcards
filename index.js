'use strict';

var sectionEl = document.getElementById('language');
var divEl = document.getElementById('to-cards');
var counter = 0;

sectionEl.addEventListener('click', selectLanguage);

// targets selected language and responds appropriately to user
function selectLanguage(e) {
  var langs = document.querySelectorAll('.lang');
  var target = e.srcElement;

  if (!e.target.name) {
    return;
  }

  for (var i = 0; i < langs.length; i++) {
    langs[i].id = '';
  }

  target.setAttribute('id', 'chosen');

  // when clicked, set flag of country of language to background image
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

  // counter prevents multiple creation and appending of buttons and changes button text
  // depending on language selection
  if (counter === 0) {
    var nativeToEngEl = document.createElement('button');
    nativeToEngEl.setAttribute('id', 'native-eng');
    var engToNativeEl = document.createElement('button');
    engToNativeEl.setAttribute('id', 'eng-native');
    nativeToEngEl.textContent = target.name + ' to English';
    engToNativeEl.textContent = 'English to ' + target.name;
    divEl.appendChild(nativeToEngEl);
    divEl.appendChild(engToNativeEl);

    divEl.addEventListener('click', function(e) {
      if (e.target.id === 'to-cards') {
        return;
      }
      sectionEl.removeEventListener('click', selectLanguage);
      localStorage.setItem('translation-direction', JSON.stringify(e.target.id));
      window.location.href = 'app.html';
    });

  } else if (counter > 0) {
    var nativetoEngButton = document.getElementById('native-eng');
    var engtoNativeButton = document.getElementById('eng-native');
    nativetoEngButton.textContent = target.name + ' to English';
    engtoNativeButton.textContent = 'English to ' + target.name;
  }
  counter += 1;
}
