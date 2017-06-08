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
    getCharacterClassById(id) {
        let ret = this.jobsById[id + ''];
        return ret || 'none';
    },
    getJobIdByCharacterClass(className) {
        for (let i in this.jobsById)
        {
            if (this.jobsById[i] === className)
            {
                return i;
            }
        }
        return null;
    },
    getFdBonus(clsid) {
        let cls = ClassInfo[clsid];
        if (cls && cls.bonuses)
        {
            return cls.bonuses.fd || null;
        }
        return null;
    },
    getCriticalBonus(clsid) {
        let cls = ClassInfo[clsid];
        if (cls && cls.bonuses)
        {
            return cls.bonuses.crit || null;
        }
        return null;
    },
    getBonus(clsid, stat) {
        let cls = ClassInfo[clsid];
        if (cls && cls.bonuses)
        {
            return cls.bonuses[stat] || null;
        }
        return null;
    }
});


const ClassInfo = {
        "ar_acrobat_tempest": {
			eleType: "none",
            dmgType: "physical"
        },
        "ar_acrobat_windwalker": {
			eleType: "none",
            dmgType: "physical"
        },
        "ar_hunter_silverhunter": {
			eleType: "light",
			dmgType: "magical",
            bonuses: {
                fd: {
                    nameKey: "fdskills.ar_hunter_silverhunter",
                    amount: 10
                }
            }
		},
        "ar_sharpshooter_sniper": {
			eleType: "none",
			dmgType: "physical"
		},
        "ar_sharpshooter_warden": {
			eleType: "none",
			dmgType: "magical"
		},
        "as_shinobi_raven": {
			eleType: "dark",
			dmgType: "physical"
		},
        "as_shinobi_reaper": {
			eleType: "fire",
			dmgType: "physical"
		},
        "as_taoist_abysswalker": {
			eleType: "dark",
			dmgType: "physical"
		},
        "as_taoist_lightbringer": {
			eleType: "light",
			dmgType: "physical"
		},
        "cl_heretic_archheretic": {
			eleType: "dark",
			dmgType: "physical",
            bonuses: {
                fd: {
                    nameKey: "fdskills.cl_heretic_archheretic",
                    amount: 10
                }
            }
		},
        "cl_paladin_crusader": {
			eleType: "light",
			dmgType: "mixed"
		},
        "cl_paladin_guardian": {
			eleType: "light",
			dmgType: "physical"
		},
        "cl_priest_inquisitor": {
			eleType: "light",
			dmgType: "magical"
		},
        "cl_priest_saint": {
			eleType: "light",
			dmgType: "magical"
		},
        "ka_dancer_bladedancer": {
			eleType: "none",
			dmgType: "physical"
		},
        "ka_dancer_spiritdancer": {
			eleType: "none",
			dmgType: "physical"
		},
        "ka_screamer_darksummoner": {
			eleType: "dark",
			dmgType: "magical"
		},
        "ka_screamer_souleater": {
			eleType: "dark",
			dmgType: "magical"
		},
        "le_lancer_dragoon": {
			eleType: "none",
			dmgType: "physical"
		},
        "le_lancer_valkyrie": {
			eleType: "light",
			dmgType: "magical"
		},
        "ma_patrona_defensio": {
			eleType: "none",
			dmgType: "physical",
            bonuses: {
                fd: {
                    nameKey: "fdskills.ma_patrona_defensio",
                    amount: 40
                }
            }
		},
        "ma_patrona_ruina": {
			eleType: "none",
			dmgType: "physical"
		},
        "so_elementalist_icewitch": {
			eleType: "ice",
			dmgType: "magical"
		},
        "so_elementalist_pyromancer": {
			eleType: "fire",
			dmgType: "magical"
		},
        "so_mystic_chaosmage": {
			eleType: "dark",
			dmgType: "magical"
		},
        "so_mystic_warmage": {
			eleType: "none",
			dmgType: "magical"
		},
        "so_mara_blackmara": {
			eleType: "dark",
			dmgType: "magical",
            bonuses: {
                fd: {
                    nameKey: "fdskills.so_mara_blackmara",
                    amount: 10
                }
            }
		},
        "ti_alchemist_adept": {
			eleType: "fire ice",
			dmgType: "magical"
		},
        "ti_alchemist_physician": {
			eleType: "dark",
			dmgType: "magical"
		},
        "ti_engineer_gearmaster": {
			eleType: "none",
			dmgType: "physical"
		},
        "ti_engineer_shootingstar": {
			eleType: "none",
			dmgType: "physical"
		},
        "wa_avenger_darkavenger": {
			eleType: "fire",
			dmgType: "physical",
            bonuses: {                
                fd: {
                    nameKey: "fdskills.wa_avenger_darkavenger",
                    amount: 10
                }
            }
		},
        "wa_mercenary_barbarian": {
			eleType: "none",
			dmgType: "physical"
		},
        "wa_mercenary_destroyer": {
			eleType: "none",
			dmgType: "physical"
		},
        "wa_swordsman_gladiator": {
			eleType: "none",
			dmgType: "physical"
		},
        "wa_swordsman_lunarknight": {
			eleType: "none",
			dmgType: "magical"
		},
        "none": {
            eleType: "unset",
            dmgType: "mixed"
        }
};