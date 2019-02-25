'use strict';

page('/', ctx => app.indexView.initIndex());
page('/cards', ctx => {
  localStorage['lang-cards'] ? app.Flashcard.loadVocabFromLocal() : page('/');
});
page('/admin', ctx => app.adminView.initAdminForm());
page();

