import Ember from 'ember';

export default Ember.Controller.extend({
    onCardCreated(newCard)
    {
        this.transitionToRoute('cards.card', newCard);
    },

    actions:
    {
        createCard() 
        {
            let newCard = this.get('store').createRecord('statcard',{});
            newCard.save();
            this.onCardCreated(newCard);
        }
    }
});
