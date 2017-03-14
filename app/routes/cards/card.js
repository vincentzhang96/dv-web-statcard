import Ember from 'ember';

export default Ember.Route.extend({
    i18n: Ember.inject.service(),
    model(params) {
        return this.get('store').findRecord('statcard', params.card_id);
    }
});
