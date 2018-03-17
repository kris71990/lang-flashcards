'use strict';

const sectionEl = document.getElementById('language');
const divEl = document.getElementById('to-cards');
let counter = 0;

sectionEl.addEventListener('click', selectLanguage);

// targets selected language and responds appropriately to user
function selectLanguage(e) {
  const langs = document.querySelectorAll('.lang');
  const target = e.srcElement;

  if (!e.target.name) {
    return;
  }

  for (let i = 0; i < langs.length; i++) {
    langs[i].id = '';
  }

  target.setAttribute('id', 'chosen');

  const $chosen = $('#chosen');
  if ($chosen[0].name === 'Dutch') {
    $chosen.css({
      backgroundImage: 'url(img/netherlands.png)',
      backgroundRepeat: 'no-repeat'
    });
  } else if ($chosen[0].name === 'French') {
    $chosen.css({
      backgroundImage: 'url(img/france.png)',
      backgroundRepeat: 'no-repeat'
    });
  } else if ($chosen[0].name === 'German') {
    $chosen.css({
      backgroundImage: 'url(img/germany.png)',
      backgroundRepeat: 'no-repeat'
    });
  }

  for (let x = 0; x < langs.length; x++) {
    if (langs[x].id !== 'chosen') {
      langs[x].style.background = '';
    }
  }

  localStorage.setItem('language', target.name);

  // counter prevents multiple creation and appending of buttons and changes button text
  // depending on language selection
  if (counter === 0) {
    const nativeToEngEl = document.createElement('button');
    const engToNativeEl = document.createElement('button');

    nativeToEngEl.setAttribute('id', 'native-eng');
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
      localStorage.setItem('translation-direction', e.target.id);
      window.location.href = 'app.html';
    });

  } else if (counter > 0) {
    const nativetoEngButton = document.getElementById('native-eng');
    const engtoNativeButton = document.getElementById('eng-native');
    nativetoEngButton.textContent = target.name + ' to English';
    engtoNativeButton.textContent = 'English to ' + target.name;
  }
  counter += 1;
}
