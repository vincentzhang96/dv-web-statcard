import Ember from 'ember';

export default Ember.Helper.extend({
    job: Ember.inject.service('job'),
    compute(params) {
      let ret = this.get('job').getBonus(params[0], params[1]);
      if (params[2]) {
        return ret[params[2]];
      }
      return ret;
    }
});