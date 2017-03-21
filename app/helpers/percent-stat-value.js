import Ember from 'ember';

export function percentStatValue(params/*, hash*/) {
    return numeral(params[0]).format('0.0%');
}

export default Ember.Helper.helper(percentStatValue);
