import Ember from 'ember';

const MIN_LVL = 1;
const MAX_LVL = 100;
const MIN_STAT = 0;
const MAX_HP_MP = 99999999;
const MAX_STR_AGI_INT_VIT = 999999;
const MAX_DMG = 9999999;
const MAX_DEF = 999999;
const MAX_CRIT = 999999;
const MAX_CRITDMG = 999999;
const MAX_FD = 99999;
const MAX_HERO = 70;
const MAX_ELEMENTAL = 300;

export default Ember.Controller.extend({
    navigateIndex()
    {
        this.transitionToRoute('cards');
    },
    clamp(val, min, max) {
        return Math.min(max, Math.max(min, val));
    },
    clampProperty(obj, field, min, max) {
        let val = obj.get(field);
        obj.set(field, this.clamp(val, min, max));
    },
    validateAndFixModel(model)
    {
        this.clampProperty(model, 'level', MIN_LVL, MAX_LVL);
        this.clampProperty(model, 'statHp', MIN_STAT, MAX_HP_MP);
        this.clampProperty(model, 'statMana', MIN_STAT, MAX_HP_MP);
        this.clampProperty(model, 'statStr', MIN_STAT, MAX_STR_AGI_INT_VIT);
        this.clampProperty(model, 'statAgi', MIN_STAT, MAX_STR_AGI_INT_VIT);
        this.clampProperty(model, 'statInt', MIN_STAT, MAX_STR_AGI_INT_VIT);
        this.clampProperty(model, 'statVit', MIN_STAT, MAX_STR_AGI_INT_VIT);
        this.clampProperty(model, 'statPDmgMin', MIN_STAT, MAX_DMG);
        this.clampProperty(model, 'statPDmgMax', MIN_STAT, MAX_DMG);
        this.clampProperty(model, 'statMDmgMin', MIN_STAT, MAX_DMG);
        this.clampProperty(model, 'statMDmgMax', MIN_STAT, MAX_DMG);
        this.clampProperty(model, 'statPDef', MIN_STAT, MAX_DEF);
        this.clampProperty(model, 'statMDef', MIN_STAT, MAX_DEF);
        this.clampProperty(model, 'statCrit', MIN_STAT, MAX_CRIT);
        this.clampProperty(model, 'statCritDmg', MIN_STAT, MAX_CRITDMG);
        this.clampProperty(model, 'statFire', MIN_STAT, MAX_ELEMENTAL);
        this.clampProperty(model, 'statIce', MIN_STAT, MAX_ELEMENTAL);
        this.clampProperty(model, 'statLight', MIN_STAT, MAX_ELEMENTAL);
        this.clampProperty(model, 'statDark', MIN_STAT, MAX_ELEMENTAL);
        this.clampProperty(model, 'statFD', MIN_STAT, MAX_FD);
        this.clampProperty(model, 'statHeroLevel', MIN_STAT, MAX_HERO);
        //  Swap min and max if reversed
        let pmin = model.get('statPDmgMin');
        let pmax = model.get('statPDmgMax');
        model.set('statPDmgMin', Math.min(pmin, pmax));
        model.set('statPDmgMax', Math.max(pmin, pmax));
        let mmin = model.get('statMDmgMin');
        let mmax = model.get('statMDmgMax');
        model.set('statMDmgMin', Math.min(mmin, mmax));
        model.set('statMDmgMax', Math.max(mmin, mmax));
    },
    actions:
    {
        reallyDeleteCard()
        {
            let model = this.get('model');
            model.deleteRecord();
            model.save();
            this.navigateIndex();
        },
        saveChange()
        {
            let model = this.get('model');
            model.set('lastUpdated', new Date());
            this.validateAndFixModel(model);
            model.save();
            console.log("Changes saved");
        },
        unfocus()
        {
            document.activeElement.blur();
        },
        snapshot()
        {
            //  Save current edit status
            let old = this.get('showAllElements');
            let tthis = this;
            //  Hide it for now
            this.set('showAllElements', false);
            //  Render after UI updates
            Ember.run.scheduleOnce('afterRender', this, function() {
                let newWin = window.open('data:,Generating%20card%20image%2C%20please%20wait.%20This%20can%20take%20up%20to%2030%20seconds%20on%20slow%20machines.');
                html2canvas(document.getElementById('stat-card-active'), {
                    width: 800,
                    height: 500,
                    letterRendering: true,
                    logging: true,
                    useCORS: true,
                    onrendered: function(canvas) {
                        let img = canvas.toDataURL("image/png");
                        newWin.location = img;
                        //  Restore
                        tthis.set('showAllElements', old);
                    }
                });
            });
            
        },
        toggleEditElemental() {
            this.toggleProperty('showAllElements');
        }
    },
    showAllElements: false,
    editingElemental: false,
    checkEle(type) {
        return this.showAllElements || this.get(`model.stat${type}`) > 0 || ClassElemental[this.get('model.characterClassId')].indexOf(type.toLowerCase()) !== -1;
    },
    showFire: Ember.computed('showAllElements', 'model.{statFire,characterClassId}', function()
    {
        return this.checkEle('Fire');
    }),
    showIce: Ember.computed('showAllElements', 'model.{statIce,characterClassId}', function()
    {
        return this.checkEle('Ice');
    }),
    showLight: Ember.computed('showAllElements', 'model.{statLight,characterClassId}', function()
    {
        return this.checkEle('Light');
    }),
    showDark: Ember.computed('showAllElements', 'model.{statDark,characterClassId}', function()
    {
        return this.checkEle('Dark');
    }),
    showEle: Ember.computed('showAllElements', 'showFire', 'showIce', 'showLight', 'showDark', function()
    {
        return {
            fire: this.get('showFire'),
            ice: this.get('showIce'),
            light: this.get('showLight'),
            dark: this.get('showDark')
        };
    }),
    isElemental: Ember.computed('showEle', function()
    {
        return this.get(`model.statFire`) > 0 ||
            this.get(`model.statIce`) > 0 ||
            this.get(`model.statLight`) > 0 ||
            this.get(`model.statDark`) > 0;
    }),
    isNonElemental: Ember.computed('isElemental', 'model.characterClassId', function()
    {
        let ele = ClassElemental[this.get('model.characterClassId')];
        return (ele === 'none' || ele === 'unset') && !this.get('isElemental');
    }),
    isConverted: Ember.computed('isElemental', 'model.characterClassId', function()
    {
        let ele = ClassElemental[this.get('model.characterClassId')];
        return ele === 'none' && this.get('isElemental') && ele !== 'unset';
    }),
    isInnate: Ember.computed('isElemental', 'model.characterClassId', function()
    {
        let ele = ClassElemental[this.get('model.characterClassId')];
        return ele !== 'none' && ele !== 'unset';
    })
});


const ClassElemental = {
        "ar_acrobat_tempest": "none",
        "ar_acrobat_windwalker": "none",
        "ar_hunter_silverhunter": "light",
        "ar_sharpshooter_sniper": "none",
        "ar_sharpshooter_warden": "none",
        "as_shinobi_raven": "dark",
        "as_shinobi_reaper": "fire",
        "as_taoist_abysswalker": "dark",
        "as_taoist_lightbringer": "light",
        "cl_heretic_archheretic": "dark",
        "cl_paladin_crusader": "light",
        "cl_paladin_guardian": "light",
        "cl_priest_inquisitor": "light",
        "cl_priest_saint": "light",
        "ka_dancer_bladedancer": "none",
        "ka_dancer_spiritdancer": "none",
        "ka_screamer_darksummoner": "dark",
        "ka_screamer_souleater": "dark",
        "le_lancer_dragoon": "none",
        "le_lancer_valkyrie": "light",
        "ma_patrona_defensio": "none",
        "ma_patrona_ruina": "none",
        "so_elementalist_icewitch": "ice",
        "so_elementalist_pyromancer": "fire",
        "so_mystic_chaosmage": "dark",
        "so_mystic_warmage": "none",
        "so_mara_blackmara": "dark",
        "ti_alchemist_adept": "fire ice",
        "ti_alchemist_physician": "dark",
        "ti_engineer_gearmaster": "none",
        "ti_engineer_shootingstar": "none",
        "wa_avenger_darkavenger": "fire",
        "wa_mercenary_barbarian": "none",
        "wa_mercenary_destroyer": "none",
        "wa_swordsman_gladiator": "none",
        "wa_swordsman_lunarknight": "none",
        "none": "unset"
};
