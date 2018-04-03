'use strict';

var app = app || {};

(module => {
  const adminView = {};
  let formCounter;

  adminView.initAdminForm = () => {
    $('.container').hide();
    formCounter = 1;
    $('#vocab-form fieldset:not(:first)').empty();
    $('#add-vocab').fadeIn(750);
    $('#add-inputs').off('click', adminView.addFormField);
    $('#add-inputs').on('click', adminView.addFormField);
  };

  adminView.addFormField = e => {
    e.preventDefault();
    formCounter += 1;
    let $fieldset = $('fieldset:first').clone();
    $($fieldset[0].children[0]).text(formCounter);
    // $fieldset[0].children[0].text(counter);
    // let $inputs = $('fieldset:first label').remove();
    // console.log($inputs);
    let $buttons = $('#vocab-form button');
    $buttons.clone();
    $fieldset.appendTo($('#vocab-form'));
    $buttons.appendTo($('#vocab-form'));
  };

  module.adminView = adminView;
})(app);