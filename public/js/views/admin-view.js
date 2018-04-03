'use strict';

var app = app || {};

(module => {
  const adminView = {};

  adminView.initAdminForm = () => {
    $('.container').hide();
    $('#add-vocab').fadeIn(750);
    $('#add-inputs').on('click', adminView.addFormField);
  };

  adminView.addFormField = e => {
    e.preventDefault();
    let $fieldset = $('fieldset:first').clone();
    console.log($fieldset);
    $fieldset.appendTo($('#vocab-form'));
  };

  module.adminView = adminView;
})(app);