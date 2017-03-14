import Ember from 'ember';

export default Ember.Component.extend({

    actions:
    {
        showConfirmDialog()
        {
            this.set('confirmShown', true);
        },
        submitConfirm()
        {
            this.get('onConfirm')();
            this.set('confirmShown', false);
        },
        cancelConfirm()
        {
            this.set('confirmShown', false);
        }
    }
});
