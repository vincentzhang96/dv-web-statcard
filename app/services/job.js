import Ember from 'ember';

export default Ember.Service.extend({
    jobsById: {
        "31": "ar_acrobat_tempest",
        "32": "ar_acrobat_windwalker",
        "81": "ar_hunter_silverhunter",
        "29": "ar_sharpshooter_sniper",
        "30": "ar_sharpshooter_warden",
        "64": "as_shinobi_raven",
        "63": "as_shinobi_reaper",
        "69": "as_taoist_abysswalker",
        "68": "as_taoist_lightbringer",
        "83": "cl_heretic_archheretic",
        "42": "cl_paladin_crusader",
        "41": "cl_paladin_guardian",
        "44": "cl_priest_inquisitor",
        "43": "cl_priest_saint",
        "58": "ka_dancer_bladedancer",
        "59": "ka_dancer_spiritdancer",
        "55": "ka_screamer_darksummoner",
        "56": "ka_screamer_souleater",
        "73": "le_lancer_dragoon",
        "74": "le_lancer_valkyrie",
        "78": "ma_patrona_defensio",
        "79": "ma_patrona_ruina",
        "36": "so_elementalist_icewitch",
        "35": "so_elementalist_pyromancer",
        "38": "so_mystic_chaosmage",
        "37": "so_mystic_warmage",
        "85": "so_mara_blackmara",
        "50": "ti_alchemist_adept",
        "51": "ti_alchemist_physician",
        "48": "ti_engineer_gearmaster",
        "47": "ti_engineer_shootingstar",
        "76": "wa_avenger_darkavenger",
        "25": "wa_mercenary_barbarian",
        "26": "wa_mercenary_destroyer",
        "23": "wa_swordsman_gladiator",
        "24": "wa_swordsman_lunarknight",
    },
    fdBonuses: {
        ma_patrona_defensio: {
            nameKey: "fdskills.ma_patrona_defensio",
            amount: 40
        },
        wa_avenger_darkavenger: {
            nameKey: "fdskills.wa_avenger_darkavenger",
            amount: 10
        },
        ar_hunter_silverhunter: {
            nameKey: "fdskills.ar_hunter_silverhunter",
            amount: 10
        },
        cl_heretic_archheretic: {
            nameKey: "fdskills.cl_heretic_archheretic",
            amount: 10
        },
        so_mara_blackmara: {
            nameKey: "fdskills.so_mara_blackmara",
            amount: 10
        }
    },
    getCharacterClassById(id) {
        let ret = this.jobsById[id + ''];
        return ret || 'none';
    },
    getFdBonus(clsid) {
        let ret = this.fdBonuses[clsid];
        return ret || null;
    }
});
