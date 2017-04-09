import Ember from 'ember';

export default Ember.Helper.extend({
    job: Ember.inject.service('job'),
    compute(params) {
      let ret = this.get('job').getFdBonus(params[0]);
      if (params[1]) {
        return ret[params[1]];
      }
      return ret;
    }
});