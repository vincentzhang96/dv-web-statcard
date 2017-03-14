import Ember from 'ember';

export default Ember.Helper.extend({
    i18n: Ember.inject.service(),
    compute(params, hash) {
        if (hash) {

        }
        if (params[0] === "none")
        {
            return "No class";
        }
        return this.get('i18n').t(`classes.${params}`);
    }
});
