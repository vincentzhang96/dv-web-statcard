import DS from 'ember-data';

export default DS.Model.extend({
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
    conversionStatus: DS.attr('string', { defaultValue: 'unset' }),
    statFire: DS.attr('number', { defaultValue: 0 }),
    statIce: DS.attr('number', { defaultValue: 0 }),
    statLight: DS.attr('number', { defaultValue: 0 }),
    statDark: DS.attr('number', { defaultValue: 0 }),
    statFD: DS.attr('number', { defaultValue: 0 }),
    statHeroLevel: DS.attr('number', { defaultValue: 0 })
});
