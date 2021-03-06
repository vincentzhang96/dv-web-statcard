import Ember from 'ember';

export default Ember.Controller.extend({
    navigateToCard(newCard)
    {
        this.transitionToRoute('cards.card', newCard);
    },

    actions:
    {
        createCard() 
        {
            let newCard = this.get('store').createRecord('statcard', {});
            newCard.save();
            this.navigateToCard(newCard);
        },
        loadCard(id)
        {
            let newCard = this.get('store').findRecord('statcard', id);
            this.navigateToCard(newCard);
        }
    }
});
