import Ember from 'ember';

export default Ember.Component.extend({
    showInputMax: false,
    showInputMin: false,
    inputVisibleMax: false,
    inputVisibleMin: false,
    doUnfocus() {
        this.set('showInputMax', false);
        this.set('showInputMin', false);
        this.set('inputVisibleMax', false);
        this.set('inputVisibleMin', false);
        this.sendAction('onEdit');
    },
    activateMax()
    {
        this.set('showInputMax', true);
        Ember.run.scheduleOnce('afterRender', this, function() {
            $('.stat-value.edit.max').focus();
            this.set('inputVisibleMax', true);
        });
    },
    activateMin()
    {
        this.set('showInputMin', true);
        Ember.run.scheduleOnce('afterRender', this, function() {
            $('.stat-value.edit.min').focus();
            this.set('inputVisibleMin', true);
        });
    },
    actions: {
        unfocus()
        {
            this.doUnfocus();
        },
        focusOut()
        {
            if (this.get('inputVisibleMax') || this.get('inputVisibleMin')) {
                this.doUnfocus();
            }
        }
    }

});
