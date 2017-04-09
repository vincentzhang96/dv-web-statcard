import Ember from 'ember';

export default Ember.Helper.extend({
    job: Ember.inject.service('job'),
    compute(params) {
      return this.get('job').getFdBonus(params[0]) !== null;
    }
});

