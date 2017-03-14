import Ember from 'ember';

export default Ember.Route.extend({
    i18n: Ember.inject.service(),
    model() {
        return this.get('store').findAll('statcard');
    },
    afterModel(model) {
        if (model.get('length') > 0) {
            this.transitionTo('cards.card', model.get('firstObject'));
        }
    }
});
