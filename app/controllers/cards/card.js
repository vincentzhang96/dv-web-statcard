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
                }
            });
        }
    }

});
