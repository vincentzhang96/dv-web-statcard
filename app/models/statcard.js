import DS from 'ember-data';

export default DS.Model.extend({
    characterName: DS.attr('string'),
    remark: DS.attr('string'),
    characterClassId: DS.attr('string'),
    level: DS.attr('number', { defaultValue: 93 }),
    lastUpdated: DS.attr('date', 
    {
        defaultValue()
        {
            //  Default to now
            return new Date();
        }
    }),
    statHp: DS.attr('number'),
    statMana: DS.attr('number'),
    statStr: DS.attr('number'),
    statAgi: DS.attr('number'),
    statInt: DS.attr('number'),
    statVit: DS.attr('number'),
    statPDmgMin: DS.attr('number'),
    statPDmgMax: DS.attr('number'),
    statMDmgMin: DS.attr('number'),
    statMDmgMax: DS.attr('number'),
    statPDef: DS.attr('number'),
    statMDef: DS.attr('number'),
    statCrit: DS.attr('number'),
    statCritDmg: DS.attr('number'),
    statFire: DS.attr('number'),
    statIce: DS.attr('number'),
    statLight: DS.attr('number'),
    statDark: DS.attr('number'),
    statFD: DS.attr('number'),
    statHeroLevel: DS.attr('number')
});
