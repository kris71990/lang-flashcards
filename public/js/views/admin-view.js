'use strict';

var app = app || {};

(module => {
  const adminView = {};

  adminView.initAdminForm = () => {
    $('.container').hide();
    $('#vocab-form fieldset:not(:first)').empty();
    $('#add-vocab').fadeIn(750);
    $('#add-inputs').off('click', adminView.addFormField);
    $('#add-inputs').on('click', adminView.addFormField);
  };

  adminView.addFormField = e => {
    e.preventDefault();
    let $fieldset = $('fieldset:first').clone();
    // let $inputs = $('fieldset:first label').remove();
    // console.log($inputs);
    let $buttons = $('#vocab-form button');
    $buttons.clone();
    $fieldset.appendTo($('#vocab-form'));
    $buttons.appendTo($('#vocab-form'));
  };

  module.adminView = adminView;
})(app);