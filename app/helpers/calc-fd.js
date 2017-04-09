import Ember from 'ember';

export default Ember.Helper.extend({
    statConversion: Ember.inject.service('stat-conversion'),
    compute(params) {
      let mod = 0;
      if (params[2])
      {
        mod = parseInt(params[2]);
      }
      if (isNaN(mod)) {
        mod = 0;
      }
      mod /= 100;
      let ret = this.get('statConversion').getFinalDamagePercent(params[0], params[1]);
      ret.result += mod;
      return ret;
    }
});
