import Ember from 'ember';

export default Ember.Controller.extend({
    navigateIndex()
    {
        this.transitionToRoute('cards');
    },
    actions:
    {
        reallyDeleteCard()
        {
            let model = this.get('model');
            model.deleteRecord();
            model.save();
            this.navigateIndex();
        },
        saveChange()
        {
            let model = this.get('model');
            model.set('lastUpdated', new Date());
            model.save();
            console.log("Changes saved");
        },
        unfocus()
        {
            document.activeElement.blur();
        },
        snapshot()
        {
            let newWin = window.open('data:,Generating%20card%20image%2C%20please%20wait.%20This%20can%20take%20up%20to%2030%20seconds%20on%20slow%20machines.');
            html2canvas(document.getElementById('stat-card-active'), {
                width: 800,
                height: 500,
                letterRendering: true,
                logging: true,
                useCORS: true,
                onrendered: function(canvas) {
                    let img = canvas.toDataURL("image/png");
                    newWin.location = img;
                }
            });
        }
    }

});
