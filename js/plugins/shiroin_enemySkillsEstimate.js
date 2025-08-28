/*:
 * @plugindesc 触发敌人的技能效果
 * @author shiroin
 * @help 通过插件命令 "敌人技能判定"来触发技能判定。
 */


(function() {
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args); // 调用原始的 pluginCommand 方法
        if (command === '敌人技能判定') {
            var skills = $gameNumberArray.value(25);
            for (var s = 0; s < skills.length; s++) {
                var skillId = skills[s];
                var skill = $dataSkills[skillId];
                var skillSuccessRate = skill.successRate;
                var chance = Math.randomInt(100) + 1;
                if (chance <= skillSuccessRate && skill.scope === 1) {
                    // 攻击技能触发
                    var damage = $gameMap.getSkillDamage(skillId, 3, 1);
                    var animation = $dataSkills[skillId].animationId;
                    $gameVariables.setValue(143, damage);
					console.log(damage);
                    $gameVariables.setValue(153, animation); // 标记对应技能的动画ID
                    $gameSwitches.setValue(130, true);
                } else if (chance <= skillSuccessRate && skill.scope === 2) {
                    $gameNumberArray.value(27).push(skillId);
                }
            }
        }
    };
})(); 

		