'use strict';

var app = app || {};

(module => {
  const indexView = {};
  let counter = 0;

  indexView.initIndex = () => {
    $('.container').hide();
    $('#index-header').fadeIn(1000);
    $('#index-main').fadeIn(1000);
    $('#language').on('click', indexView.selectLanguage);
  };

  indexView.selectLanguage = e => {
    console.log(e.target.name);
    const langs = document.querySelectorAll('.lang');
    const target = e.target;

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
      const $nativeToEng = $('<button></button>');
      const $engToNative = $('<button></button>');

      $nativeToEng.attr('id', 'native-eng');
      $engToNative.attr('id', 'eng-native');
      $nativeToEng.text(`${target.name} to English`);
      $engToNative.text(`English to ${target.name}`);
      $('#to-cards').append($nativeToEng);
      $('#to-cards').append($engToNative);

      $('#to-cards').on('click', function(e) {
        if (e.target.id === 'to-cards') {
          return;
        }
        $('#language').off('click', indexView.selectLanguage);
        localStorage.setItem('translation-direction', e.target.id);
        let lang = localStorage.language.toLowerCase();
        module.Flashcard.fetchVocab(lang);
      });
    } else if (counter > 0) {
      const $nativeToEng = $('#native-eng');
      const $engToNative = $('#eng-native');
      $nativeToEng.text(`${target.name} to English`);
      $engToNative.text(`English to ${target.name}`);
    }
    counter += 1;
  };

  module.indexView = indexView;
})(app);

$(function () {
  app.indexView.initIndex();
});