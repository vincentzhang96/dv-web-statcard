import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('update-notes-notif', 'Integration | Component | update notes notif', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{update-notes-notif}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#update-notes-notif}}
      template block text
    {{/update-notes-notif}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
