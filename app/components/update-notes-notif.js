import Ember from 'ember';

export default Ember.Component.extend({
    updatesNotif: Ember.inject.service('updates-notif'),

    display: false,
    info: null,

    init() {
        this._super(...arguments);


        let latest = this.get("updatesNotif").getLatestUpdate();
        this.set("info", latest);

        let latestReadId = this.get("updatesNotif").getLatestReadUpdateId();

        if (latest.id > latestReadId) {
            this.set("display", true);
        }
    },

    actions: {
        dismiss() {
            this.get("updatesNotif").markAsRead();
            this.set("display", false);
        }
    }
});
