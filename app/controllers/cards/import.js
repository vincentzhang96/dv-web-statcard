import Ember from 'ember';

export default Ember.Controller.extend({
    error: false,

    onCardCreated(newCard)
    {
        this.transitionToRoute('cards.card', newCard);
    },
    onCardImportError(err)
    {
        this.set('error', true);
    },
    actions: 
    {
        import(evt) {
            this.set('error', false);
            let fi = evt.target.files[0];
            let reader = new FileReader();
            reader.onload = (file) => 
            {
                try {
                    console.log(`Loading ${fi.name}`);
                    let hash = JSON.parse(reader.result);
                    delete hash.id;
                    let newCard = this.get('store').createRecord('statcard', hash);
                    newCard.set('lastUpdated', new Date());
                    newCard.validateAndFixModel();
                    newCard.save();
                    this.onCardCreated(newCard);
                } catch (err) {
                    console.log(err);
                    this.onCardImportError(err);
                }
            };
            reader.readAsText(fi);
        }
    }
});
