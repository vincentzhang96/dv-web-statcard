import Ember from 'ember';

export default Ember.Controller.extend({
    job: Ember.inject.service('job'),
    statConversion: Ember.inject.service('stat-conversion'),
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
            if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                ga('send', 'event', 'Image', 'Export', 'DeniedBrowser', 'IE/Edge');
                alert("This feature is not supported by Internet Explorer or Edge. Please use a real browser.");
                return;
            }

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
        let clse = this.get('job').getClassInfoByKey([this.get('model.characterClassId')]).eleType || 'none';
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
        let ele = this.get('job').getClassInfoByKey([this.get('model.characterClassId')]).eleType;
        return (ele === 'none' || ele === 'unset') && !this.get('isElemental');
    }),
    isConverted: Ember.computed('isElemental', 'model.characterClassId', function()
    {
        let ele = this.get('job').getClassInfoByKey([this.get('model.characterClassId')]).eleType;
        return ele === 'none' && this.get('isElemental') && ele !== 'unset';
    }),
    isInnate: Ember.computed('isElemental', 'model.characterClassId', function()
    {
        let ele = this.get('job').getClassInfoByKey([this.get('model.characterClassId')]).eleType;
        return ele !== 'none' && ele !== 'unset';
    }),
    isPhysical: Ember.computed('model.characterClassId', function()
    {
        let dmg = this.get('job').getClassInfoByKey([this.get('model.characterClassId')]).dmgType;
        return dmg === 'mixed' || dmg === 'physical';
    }),
    isMagical: Ember.computed('model.characterClassId', function()
    {
        let dmg = this.get('job').getClassInfoByKey([this.get('model.characterClassId')]).dmgType;
        return dmg === 'mixed' || dmg === 'magical';
    }),
    cDmg: Ember.computed('fdBonusOn', 'model.{characterClassId,statFire,statIce,statLight,statDark,statFD,statMDmgMax,statMDmgMin,statPDmgMax,statPDmgMin,statCritDmg}', function()
    {
        let model = this.get('model');
        let cls = this.get('job').getClassInfoByKey(model.get('characterClassId'));

        if (cls === undefined)
        {
            console.log("Class for " + model.get('characterClassId') + " not found");
            return 0;
        }

        let dmg = 0;
        if (cls.dmgType === "magical" || cls.dmgType === "mixed")
        {
            dmg += (+model.get('statMDmgMin') + +model.get('statMDmgMax')) / 2;
        }
        if (cls.dmgType === "physical" || cls.dmgType === "mixed")
        {
            dmg += (+model.get('statPDmgMin') + +model.get('statPDmgMax')) / 2;
        }

        //  Get max elemental
        let ele = Math.max(model.get('statFire'), model.get('statIce'), model.get('statLight'), model.get('statDark'));
        
        dmg *= (1 + ele);

        let fd = model.get('statFD');
        fd = this.get('statConversion').getFinalDamagePercent(fd, 93).result;
        if (this.get('fdBonusOn'))
        {
            fd += this.get('job').getBonus(model.get('characterClassId'), "fd").amount / 100;
        }

        dmg *= (1 + fd);

        let critdmg = model.get('statCritDmg');
        critdmg = this.get('statConversion').getCritDamagePercent(critdmg, 93).result;

        dmg *= critdmg;

        return Math.floor(dmg / 1000) + "K";
    }),
});
