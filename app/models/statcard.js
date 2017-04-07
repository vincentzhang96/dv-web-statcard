import DS from 'ember-data';
import Copyable from 'ember-cli-copyable';

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

export default DS.Model.extend(Copyable, {
    characterName: DS.attr('string', { defaultValue: 'New character' }),
    remark: DS.attr('string', { defaultValue: 'CLICK TO EDIT THIS TEXT' }),
    characterClassId: DS.attr('string', { defaultValue: 'none' }),
    level: DS.attr('number', { defaultValue: 93 }),
    lastUpdated: DS.attr('date', 
    {
        defaultValue()
        {
            //  Default to now
            return new Date();
        }
    }),
    statHp: DS.attr('number', { defaultValue: 0 }),
    statMana: DS.attr('number', { defaultValue: 0 }),
    statStr: DS.attr('number', { defaultValue: 0 }),
    statAgi: DS.attr('number', { defaultValue: 0 }),
    statInt: DS.attr('number', { defaultValue: 0 }),
    statVit: DS.attr('number', { defaultValue: 0 }),
    statPDmgMin: DS.attr('number', { defaultValue: 0 }),
    statPDmgMax: DS.attr('number', { defaultValue: 0 }),
    statMDmgMin: DS.attr('number', { defaultValue: 0 }),
    statMDmgMax: DS.attr('number', { defaultValue: 0 }),
    statPDef: DS.attr('number', { defaultValue: 0 }),
    statMDef: DS.attr('number', { defaultValue: 0 }),
    statCrit: DS.attr('number', { defaultValue: 0 }),
    statCritDmg: DS.attr('number', { defaultValue: 0 }),
    statFire: DS.attr('number', { defaultValue: 0 }),
    statIce: DS.attr('number', { defaultValue: 0 }),
    statLight: DS.attr('number', { defaultValue: 0 }),
    statDark: DS.attr('number', { defaultValue: 0 }),
    statFD: DS.attr('number', { defaultValue: 0 }),
    statHeroLevel: DS.attr('number', { defaultValue: 0 }),
    
    clamp(val, min, max) {
        return Math.min(max, Math.max(min, val));
    },
    clampProperty(obj, field, min, max) {
        let val = obj.get(field);
        obj.set(field, this.clamp(val, min, max));
    },
    validateAndFixModel()
    {
        let model = this;
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
        if (pmax !== 0) {
            model.set('statPDmgMin', Math.min(pmin, pmax));
            model.set('statPDmgMax', Math.max(pmin, pmax));
        }
        let mmin = model.get('statMDmgMin');
        let mmax = model.get('statMDmgMax');
        if (mmax !== 0) {
            model.set('statMDmgMin', Math.min(mmin, mmax));
            model.set('statMDmgMax', Math.max(mmin, mmax));
        }
        let lastUp = this.get('lastUpdated');
        if (lastUp === null || lastUp === undefined || lastUp === "") {
            this.set('lastUpdated', new Date());
        }
    }
});
