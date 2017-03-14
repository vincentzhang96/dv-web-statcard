import Ember from 'ember';

export default Ember.Route.extend({
    i18n: Ember.inject.service(),
    model() {
        return this.get('store').findAll('statcard');
    }
});
