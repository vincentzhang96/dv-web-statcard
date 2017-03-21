import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cap-percent-stat/stat-percent', 'Integration | Component | cap percent stat/stat percent', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cap-percent-stat/stat-percent}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cap-percent-stat/stat-percent}}
      template block text
    {{/cap-percent-stat/stat-percent}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
