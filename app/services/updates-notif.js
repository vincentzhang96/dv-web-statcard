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
        id: 3,
        title: "CDMG calculations",
        message: "CDMG calculations have been updated to use your character's level and to take into account critical chance. Also resolved an incorrect calculation issue relating to how elemental attack was handled.",
        timestamp: "2017-09-22T17:53:24Z",
        version: "0.9.8-LAB.201709221753"
    },
    {
        id: 2,
        title: "Card Image Export Fix & Upgrades",
        message: "The card image export feature has been upgraded due to Chrome removing a feature that the old system relied on. Internet Explorer and Edge are still not supported since they don't support the features the image exporter relies on.",
        timestamp: "2017-08-27T20:46:28Z",
        version: "0.9.8-LAB.201708272046"
    },
    {
        id: 1,
        title: "TAB Key EX",
        message: "You can now use the TAB/SHIFT-TAB keys to move between stat fields. Also this new update notification system.",
        timestamp: "2017-08-16T15:57:19Z",
        version: "0.9.8-LAB.201708161557"
    }
];
