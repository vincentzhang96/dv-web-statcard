import Ember from 'ember';

export default Ember.Component.extend({
    showInput: false,
    inputVisible: false,
    doUnfocus() {
        this.set('showInput', false);
        this.set('inputVisible', false);
        this.sendAction('onEdit');
    },
    activate()
    {
        this.set('showInput', true);
        Ember.run.scheduleOnce('afterRender', this, function() {
            $('.stat-value.edit').focus();
            this.set('inputVisible', true);
        });
    },
    actions: {
        unfocus()
        {
            this.doUnfocus();
        },
        focusOut()
        {
            if (this.get('inputVisible')) {
                this.doUnfocus();
            }
        }
    }
});
