import Ember from 'ember';

export function div(params/*, hash*/) {
  let ret = params[0] / params[1];
  // if (Number.isNaN(ret)) {
  //   ret = 0;
  // }
  return ret;
}

export default Ember.Helper.helper(div);
