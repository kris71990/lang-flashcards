'use strict';

var app = app || {};

(module => {
  const cardView = {};

  cardView.initCards = () => {
    $('.container').hide();
    $('#cards-header').fadeIn(1000);
    $('$cards-main').fadeIn(1000);
  };

  module.cardView = cardView;
})(app);