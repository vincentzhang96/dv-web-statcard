import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        select(clazz)
        {
            console.log(clazz);
            this.sendAction('action', clazz);
        }
    }

});
