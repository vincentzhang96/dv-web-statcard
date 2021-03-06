import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.get('store').findRecord('statcard', params.card_id);
    },
    actions: {
        error(error, transition) 
        {
            this.replaceWith('cards');
        }
    }
});
