import Ember from 'ember';
import numeral from 'numeral';

export function basicStatValue(params/*, hash*/) {
    return numeral(params[0]).format('0,0');
}

export default Ember.Helper.helper(basicStatValue);
