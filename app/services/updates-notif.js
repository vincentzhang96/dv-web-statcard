import Ember from 'ember';

export default Ember.Service.extend({

    getLatestUpdate() {
        return UpdateInfo[0];
    },

    markAsRead() {
        let latest = this.getLatestUpdate().id;
        localStorage.setItem("dv-web-statcard.lastAcceptedUpdateId", latest);
        console.log(`Marking update ${latest} as read`);
    },

    getLatestReadUpdateId() {
        let ret = localStorage.getItem("dv-web-statcard.lastAcceptedUpdateId");
        if (!ret && ret !== 0) {
            return -1;
        }

        return ret;
    }

});

const UpdateInfo = [
    {
        id: 1,
        title: "TAB Key EX",
        message: "You can now use the TAB/SHIFT-TAB keys to move between stat fields. Also this new update notification system.",
        timestamp: "2017-08-16T15:57:19Z",
        version: "0.9.8-LAB.201708161557"
    }
];
