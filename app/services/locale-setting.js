import Ember from 'ember';

export default Ember.Service.extend({
    i18n: Ember.inject.service(),
    setLocale(locale)
    {
        this.set('i18n.locale', locale);
        localStorage.setItem('dv-web-locale', locale);
    },
    getLocale()
    {
        return this.get('i18n.locale');
    },
    getStoredLocale()
    {
        return localStorage.getItem('dv-web-locale') || "en-us";
    },
    loadStoredLocale()
    {
        this.set('i18n.locale', this.getStoredLocale());
    }
});
