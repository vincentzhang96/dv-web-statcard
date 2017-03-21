import Ember from 'ember';

export default Ember.Helper.extend({
    statConversion: Ember.inject.service('stat-conversion'),
    compute(params) {
      return this.get('statConversion').getCritDamagePercent(params[0], params[1]);
    }
});
