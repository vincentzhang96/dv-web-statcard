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
        let clse = ClassInfo[this.get('model.characterClassId')].eleType || 'none';
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
        let ele = ClassInfo[this.get('model.characterClassId')].eleType;
        return (ele === 'none' || ele === 'unset') && !this.get('isElemental');
    }),
    isConverted: Ember.computed('isElemental', 'model.characterClassId', function()
    {
        let ele = ClassInfo[this.get('model.characterClassId')].eleType;
        return ele === 'none' && this.get('isElemental') && ele !== 'unset';
    }),
    isInnate: Ember.computed('isElemental', 'model.characterClassId', function()
    {
        let ele = ClassInfo[this.get('model.characterClassId')].eleType;
        return ele !== 'none' && ele !== 'unset';
    }),
    isPhysical: Ember.computed('model.characterClassId', function()
    {
        let dmg = ClassInfo[this.get('model.characterClassId')].dmgType;
        return dmg === 'mixed' || dmg === 'physical';
    }),
    isMagical: Ember.computed('model.characterClassId', function()
    {
        let dmg = ClassInfo[this.get('model.characterClassId')].dmgType;
        return dmg === 'mixed' || dmg === 'magical';
    }),
    cDmg: Ember.computed('fdBonusOn', 'model.{characterClassId,statFire,statIce,statLight,statDark,statFD,statMDmgMax,statMDmgMin,statPDmgMax,statPDmgMin,statCritDmg', function()
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


const ClassInfo = {
        "ar_acrobat_tempest": 
        {
			"eleType": "none",
            "dmgType": "physical"
        },
        "ar_acrobat_windwalker": 
        {
			"eleType": "none",
            "dmgType": "physical"
        },
        "ar_hunter_silverhunter": {
			"eleType": "light",
			"dmgType": "magical"
		},
        "ar_sharpshooter_sniper": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "ar_sharpshooter_warden": {
			"eleType": "none",
			"dmgType": "magical"
		},
        "as_shinobi_raven": {
			"eleType": "dark",
			"dmgType": "physical"
		},
        "as_shinobi_reaper": {
			"eleType": "fire",
			"dmgType": "physical"
		},
        "as_taoist_abysswalker": {
			"eleType": "dark",
			"dmgType": "physical"
		},
        "as_taoist_lightbringer": {
			"eleType": "light",
			"dmgType": "physical"
		},
        "cl_heretic_archheretic": {
			"eleType": "dark",
			"dmgType": "physical"
		},
        "cl_paladin_crusader": {
			"eleType": "light",
			"dmgType": "mixed"
		},
        "cl_paladin_guardian": {
			"eleType": "light",
			"dmgType": "physical"
		},
        "cl_priest_inquisitor": {
			"eleType": "light",
			"dmgType": "magical"
		},
        "cl_priest_saint": {
			"eleType": "light",
			"dmgType": "magical"
		},
        "ka_dancer_bladedancer": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "ka_dancer_spiritdancer": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "ka_screamer_darksummoner": {
			"eleType": "dark",
			"dmgType": "magical"
		},
        "ka_screamer_souleater": {
			"eleType": "dark",
			"dmgType": "magical"
		},
        "le_lancer_dragoon": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "le_lancer_valkyrie": {
			"eleType": "light",
			"dmgType": "magical"
		},
        "ma_patrona_defensio": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "ma_patrona_ruina": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "so_elementalist_icewitch": {
			"eleType": "ice",
			"dmgType": "magical"
		},
        "so_elementalist_pyromancer": {
			"eleType": "fire",
			"dmgType": "magical"
		},
        "so_mystic_chaosmage": {
			"eleType": "dark",
			"dmgType": "magical"
		},
        "so_mystic_warmage": {
			"eleType": "none",
			"dmgType": "magical"
		},
        "so_mara_blackmara": {
			"eleType": "dark",
			"dmgType": "magical"
		},
        "ti_alchemist_adept": {
			"eleType": "fire ice",
			"dmgType": "magical"
		},
        "ti_alchemist_physician": {
			"eleType": "dark",
			"dmgType": "magical"
		},
        "ti_engineer_gearmaster": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "ti_engineer_shootingstar": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "wa_avenger_darkavenger": {
			"eleType": "fire",
			"dmgType": "physical"
		},
        "wa_mercenary_barbarian": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "wa_mercenary_destroyer": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "wa_swordsman_gladiator": {
			"eleType": "none",
			"dmgType": "physical"
		},
        "wa_swordsman_lunarknight": {
			"eleType": "none",
			"dmgType": "magical"
		},
        "none": {
            "eleType": "unset",
            "dmgType": "mixed"
        }
};
