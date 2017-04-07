import Ember from 'ember';

export default Ember.Controller.extend({
    onCardCreated(newCard)
    {
        this.transitionToRoute('cards.card', newCard);
    },
    actions: 
    {
        import(evt) {
            let reader = new FileReader();
            reader.onload = (file) => 
            {
                console.log(`Loading ${file.name}`);
                let hash = JSON.parse(reader.result);
                delete hash.id;
                let newCard = this.get('store').createRecord('statcard', hash);
                newCard.save();
                this.onCardCreated(newCard);
            };
            reader.readAsText(evt.target.files[0]);
        }
    }
});
