'use strict';

var app = app || {};

(module => {
  const adminView = {};

  adminView.initAdminForm = () => {
    $('.container').hide();
    $('#add-vocab').fadeIn(750);
  };

  module.adminView = adminView;
})(app);