//=============================================================================
 /*:
 * @plugindesc ------------------------------------------------------------
 * @author 
 */
//=============================================================================

(function() {

    // 初始化角色的 _PoisonOnAttack 变量
    var _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.call(this, actorId);
        this._PoisonOnAttack = 0;
        this.updatePoisonOnAttack();
    };

    // 更新角色的 _PoisonOnAttack 变量
    Game_Actor.prototype.updatePoisonOnAttack = function() {
        var poisonChance = 0;
        
        // 职业的攻击附加状态
        var classStates = this.currentClass().traits.filter(function(trait) {
            return trait.code === Game_BattlerBase.TRAIT_ATTACK_STATE;
        });
        poisonChance += this.extractStateChance(classStates, 11);

        // 装备的攻击附加状态
        var equips = this.equips();
        for (var i = 0; i < equips.length; i++) {
            var item = equips[i];
            if (item) {
                var equipStates = item.traits.filter(function(trait) {
                    return trait.code === Game_BattlerBase.TRAIT_ATTACK_STATE;
                });
                poisonChance += this.extractStateChance(equipStates, 11);
            }
        }

        // 持有的状态
        var states = this.states();
        for (var j = 0; j < states.length; j++) {
            var state = states[j];
            var stateStates = state.traits.filter(function(trait) {
                return trait.code === Game_BattlerBase.TRAIT_ATTACK_STATE;
            });
            poisonChance += this.extractStateChance(stateStates, 11);
        }

        // 更新 _PoisonOnAttack 变量
        this._PoisonOnAttack = poisonChance;
    };

    // 提取状态几率
    Game_Actor.prototype.extractStateChance = function(traits, stateId) {
        var chance = 0;
        for (var i = 0; i < traits.length; i++) {
            if (traits[i].dataId === stateId) {
                chance += traits[i].value;
            }
        }
        return chance;
    };

    // 当玩家更换装备时更新 _PoisonOnAttack 变量
    var _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        _Game_Actor_changeEquip.call(this, slotId, item);
        this.updatePoisonOnAttack();
    };

    // 当玩家强制更换装备时更新 _PoisonOnAttack 变量
    var _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        _Game_Actor_forceChangeEquip.call(this, slotId, item);
        this.updatePoisonOnAttack();
    };

})();

