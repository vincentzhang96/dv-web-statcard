import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['stat-percent'],
    classNameBindings: ['capped'],
    capped: Ember.computed('value', function() {
        return this.get('value').capped;
    })
});
