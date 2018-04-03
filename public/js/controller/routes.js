'use strict';

page('/', ctx => app.indexView.initIndex());
page('/cards', ctx => app.Flashcard.loadVocabFromLocal());
page('/admin', ctx => app.adminView.initAdminForm());
page();
