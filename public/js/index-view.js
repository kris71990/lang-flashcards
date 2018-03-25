'use strict';

var app = app || {};

(module => {
  const indexView = {};

  indexView.initIndex = () => {
    $('.container').hide();
    $('#index-header').fadeIn(1000);
    $('$index-main').fadeIn(1000);
  };

  module.indexView = indexView;
})(app);