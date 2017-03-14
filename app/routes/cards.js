import Ember from 'ember';

export default Ember.Route.extend({
    i18n: Ember.inject.service(),
    localeSetting: Ember.inject.service('locale-setting'),
    beforeModel() {
        this.get('localeSetting').loadStoredLocale();
    },
    model() {
        return this.get('store').findAll('statcard');
    },
    forceReload() {
        location.reload();
    },
    actions:
    {
        setLocale(locale)
        {
            this.get('localeSetting').setLocale(locale);
            this.forceReload();
        }
    }
});
