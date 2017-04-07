import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['dngsimport'],
    dngsimport: null,
    error: false,
    errorMsgKey: null,

    onCardCreated(newCard)
    {
        this.transitionToRoute('cards.card', newCard);
    },
    onCardImportError(err, key)
    {
        this.set('error', true);
        this.set('errMsgKey', key)
    },
    loadDNGSImport()
    {
        if (this.get('dngsimport') !== null)
        {
            try {
                let decoded = atob(this.get('dngsimport'));
                this.processCard(decoded, "ui.cards.import.error.dngsbad");
            } catch (err) {
                console.log(err);
                this.onCardImportError(err, "ui.cards.import.error.dngsbad");
            }
        }
    },
    processCard(jsonStr, key)
    {
        try {
            let hash = JSON.parse(jsonStr);
            delete hash.id;
            let newCard = this.get('store').createRecord('statcard', hash);
            newCard.set('lastUpdated', new Date());
            newCard.validateAndFixModel();
            newCard.save();
            this.onCardCreated(newCard);
        } catch (err) {
            console.log(err);
            this.onCardImportError(err, key);
        }
    },
    actions: 
    {
        import(evt) {
            this.set('error', false);
            let fi = evt.target.files[0];
            let reader = new FileReader();
            reader.onload = (file) => 
            {
                console.log(`Loading ${fi.name}`);
                this.processCard(reader.result, "ui.cards.import.error.badcard");
            };
            reader.readAsText(fi);
        }
    }
});
