import Ember from 'ember';

export default Ember.Helper.extend({
    job: Ember.inject.service('job'),
    compute(params) {
      return this.get('job').getBonus(params[0], params[1]) !== null;
    }
});

