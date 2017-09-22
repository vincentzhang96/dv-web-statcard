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
            let edit = $('.stat-value.edit.max');
            edit.focus();
            this.set('inputVisibleMax', true);
            if (edit.val() == "0") {
                window.setTimeout(() => edit.val(""));
            }
        });
    },
    activateMin()
    {
        this.set('showInputMin', true);
        Ember.run.scheduleOnce('afterRender', this, function() {
            let edit = $('.stat-value.edit.min');
            edit.focus();
            this.set('inputVisibleMin', true);
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
            if (this.get('inputVisibleMax') || this.get('inputVisibleMin')) {
                this.doUnfocus();
            }
        },
        focusMeMax() {
            this.activateMax();
        },
        focusMeMin() {
            this.activateMin();
        }
    }

});
