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
            let edit = $('.stat-value.edit');
            edit.focus();
            this.set('inputVisible', true);
            if (edit.val() == "0") {
                window.setTimeout(() => edit.val(""));
            }
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
        },
        focusMe() {
            this.activate();
        }
    }
});
