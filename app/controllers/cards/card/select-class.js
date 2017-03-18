import Ember from 'ember';

export default Ember.Controller.extend({

    navigateCard(card)
    {
        this.transitionToRoute('cards.card', card);
    },

    actions: {
        select(clazz)
        {
            let model = this.get('model').card;
            model.set('characterClassId', clazz);
            model.set('lastUpdated', new Date());
            model.save();
            this.navigateCard(model);
        },
        cancelConfirm()
        {
            let model = this.get('model').card;
            this.navigateCard(model);
        }
    }

});
