import Ember from 'ember';

export default Ember.Controller.extend({
    job: Ember.inject.service(),
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
                let hash = JSON.parse(decoded);
                if (hash.classId) {
                    hash.characterClassId = this.get('job').getCharacterClassById(hash.classId);
                }
                this.processCard(hash, "ui.cards.import.error.dngsbad");
            } catch (err) {
                console.log(err);
                this.onCardImportError(err, "ui.cards.import.error.dngsbad");
            }
        }
    },
    processCard(hash, key)
    {
        try {
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
                try {
                    console.log(`Loading ${fi.name}`);
                    let hash = JSON.parse(reader.result);
                    this.processCard(hash, "ui.cards.import.error.badcard");
                } catch (err) {
                    console.log(err);
                    this.onCardImportError(err, "ui.cards.import.error.badcard");
                }
            };
            reader.readAsText(fi);
        }
    }
});
