import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cap-percent-labels', 'Integration | Component | cap percent labels', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cap-percent-labels}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cap-percent-labels}}
      template block text
    {{/cap-percent-labels}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
