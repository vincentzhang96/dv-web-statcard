import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({

    model()
    {
        return RSVP.hash({
            classes: GameClasses,
            card: this.modelFor('cards.card')
        });
    }

});

const GameClasses = [
    {
        "base": "wa_warrior",
        "specializations": [
            "wa_swordsman_gladiator",
            "wa_swordsman_lunarknight",
            "wa_mercenary_barbarian",
            "wa_mercenary_destroyer",
            "wa_avenger_darkavenger"
        ]
    },
    {
        "base": "ar_archer",
        "specializations": [
            "ar_sharpshooter_sniper",
            "ar_sharpshooter_warden",
            "ar_acrobat_tempest",
            "ar_acrobat_windwalker",
            "ar_hunter_silverhunter",
        ]
    },
    {
        "base": "so_sorceress",
        "specializations": [
            "so_mystic_chaosmage",
            "so_mystic_warmage",
            "so_elementalist_icewitch",
            "so_elementalist_pyromancer",
            "so_mara_blackmara"
        ]
    },
    {
        "base": "cl_cleric",
        "specializations": [
            "cl_paladin_crusader",
            "cl_paladin_guardian",
            "cl_priest_inquisitor",
            "cl_priest_saint",
            "cl_heretic_archheretic"
        ]
    },
    {
        "base": "ti_tinkerer",
        "specializations": [
            "ti_engineer_gearmaster",
            "ti_engineer_shootingstar",
            "ti_alchemist_adept",
            "ti_alchemist_physician",
            "ti_mechanic_raymechanic"
        ]
    },
    {
        "base": "ka_kali",
        "specializations": [
            "ka_screamer_darksummoner",
            "ka_screamer_souleater",
            "ka_dancer_bladedancer",
            "ka_dancer_spiritdancer",
            "ka_oracle_oracleelder"
        ]
    },
    {
        "base": "as_assassin",
        "specializations": [
            "as_shinobi_raven",
            "as_shinobi_reaper",
            "as_taoist_abysswalker",
            "as_taoist_lightbringer",
            "as_phantom_bleedphantom"
        ]
    },
    {
        "base": "le_ma_lencea_machina",
        "specializations": [
            "le_lancer_dragoon",
            "le_lancer_valkyrie",
            "ma_patrona_defensio",
            "ma_patrona_ruina"
        ]
    }
];
