import Ember from 'ember';
import numeral from 'numeral';

export function basicStatValue(params/*, hash*/) {
    let ret = numeral(params[0]).format('0,0');
    if (params[1])
    {
        ret += params[1];
    }
    return ret;
}

export default Ember.Helper.helper(basicStatValue);
