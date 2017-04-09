import Ember from 'ember';

export default Ember.Controller.extend({
    job: Ember.inject.service('job'),
    navigateIndex()
    {
        this.transitionToRoute('cards');
    },
    navigateTo(card)
    {
        this.transitionToRoute('cards.card', card);
    },
    saveCard()
    {
        let model = this.get('model');
        model.set('lastUpdated', new Date());
        model.validateAndFixModel();
        model.save();
        console.log("Changes saved");
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
            this.saveCard();
        },
        duplicateCard() {
            let model = this.get('model');
            let thiss = this;
            model.copy().then(function(copy) 
            {
                copy.set('characterName', copy.get('characterName') + " (Copy)");
                copy.save();
                thiss.navigateTo(copy);
            });
        },
        unfocus()
        {
            document.activeElement.blur();
        },
        export()
        {
            let model = this.get('model');
            let expData = JSON.stringify(model);
            //  Remove ID (can't delete on model since that breaks Ember Data)
            model = JSON.parse(expData);
            delete model.id;
            expData = JSON.stringify(model);
            let dataBlob = new Blob([expData], {type: "application/json"});
            let dataUrl = URL.createObjectURL(dataBlob);
            let dummyLink = document.getElementById('export-dummy');
            dummyLink.download = `card-${model.characterName}.DVSTATCARD`;
            dummyLink.href = dataUrl;
            dummyLink.click();
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
        },
        toggleFdBonus() {
            this.toggleProperty('model.classFDBonus');
            this.saveCard();
        }
    },
    fdBonusOn: Ember.computed('model.{classFDBonus,characterClassId}', function()
    {
        let fdInfo = this.get('job').getFdBonus(this.get('model.characterClassId'));
        return fdInfo && this.get('model.classFDBonus');
    }),
    showAllElements: false,
    editingElemental: false,
    checkEle(type) {
        let clse = ClassElemental[this.get('model.characterClassId')] || 'none';
        return this.showAllElements || this.get(`model.stat${type}`) > 0 || clse.indexOf(type.toLowerCase()) !== -1;
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
