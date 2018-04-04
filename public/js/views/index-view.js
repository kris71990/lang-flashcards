'use strict';

var app = app || {};

(module => {
  const indexView = {};
  let counter;

  indexView.initIndex = () => {
    $('.container').hide();
    $('.lang').css({backgroundImage: ''});
    counter = 0;
    $('#to-cards').html('');
    $('#login input').val('');

    if (localStorage.user) {
      indexView.verifiedUser(JSON.parse(localStorage.user));
    } else {
      $('#login').fadeIn(1000);
    }

    $('#index-header').fadeIn(1000);
    $('#index-main').fadeIn(1000);
    $('#language').off('click', indexView.selectLanguage);
    $('#login').off('submit', indexView.getLogin);
    $('#login').on('submit', indexView.getLogin);
    $('#language').on('click', indexView.selectLanguage);
  };

  indexView.getLogin = e => {
    e.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    module.User.loginData(username, password);
  };

  indexView.verifiedUser = user => {
    $('#login').hide();
    localStorage.setItem('user', JSON.stringify(user));
    $('#verified').html(`<h1>Welcome Back ${user.username}!</h1>`).fadeIn(1000);
    if (user.username === 'kris') {
      if ($('nav li').last()[0].textContent === 'Profile') {
        let $admin = $('<li></li>').html('<a href="/admin">Admin</a>');
        $admin.addClass('userButtons');
        $('nav ul').append($admin);
      }
    }
    if ($('nav li').last()[0].textContent !== 'Logout') {
      let $logout = $('<li></li>').html('<a href="/">Logout</a>');
      $logout.addClass('userButtons');
      $('nav ul').append($logout);
      $('nav ul li:last').on('click', indexView.handleLogout);
    }
  };

  indexView.notVerified = () => {
    $('#verified').html('<h2>Username/password incorrect, try again</h2>').fadeIn(200);
  };

  indexView.handleLogout = () => {
    $('nav ul li:last').off('click', indexView.handleLogout);
    $('.userButtons').remove();
    localStorage.clear();
  };

  indexView.selectLanguage = e => {
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