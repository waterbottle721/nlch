/*:
 * 
 * @plugindesc 通过全局开关或JS代码条件判断来限制玩家朝特定方向移动
 * @author SumRndmDde
 *
 * @param Move Up Switch
 * @desc 标记开关后，该开关打开时将限制玩家向上移动，设置为0则不进行限制
 * @default 0
 *
 * @param Move Right Switch
 * @desc 标记开关后，该开关打开时将限制玩家向右移动，设置为0则不进行限制
 * @default 0
 *
 * @param Move Left Switch
 * @desc 标记开关后，该开关打开时将限制玩家向左移动，设置为0则不进行限制
 * @default 0
 *
 * @param Move Down Switch
 * @desc 标记开关后，该开关打开时将限制玩家向下移动，设置为0则不进行限制
 * @default 0
 *
 * @param Move Up Condition
 * @desc 写下JS代码条件句式后，执行返回为true时将限制玩家向上移动，该处留空则不进行限制
 * @default
 *
 * @param Move Right Condition
 * @desc 写下JS代码条件句式后，执行返回为true时将限制玩家向右移动，该处留空则不进行限制
 * @default
 *
 * @param Move Left Condition
 * @desc 写下JS代码条件句式后，执行返回为true时将限制玩家向左移动，该处留空则不进行限制
 * @default
 *
 * @param Move Down Condition
 * @desc 写下JS代码条件句式后，执行返回为true时将限制玩家向下移动，该处留空则不进行限制
 * @default
 *
 * @help
 *
 * Restrict Movement Directions/限制玩家移动方向
 * Version 1.00
 * SumRndmDde
 *
 * 不需要插件指令或注释，请在插件参数列表中进行预先设置
 *
 * 这个插件通过全局开关或JS代码条件判断来限制玩家朝特定方向移动 
 * 可以用来设计特定情景下玩家只能朝特定方向移动，或者为了剧情演出限制玩家进行移动
 *
 * 插件作者联系方式： 
 * http://youtube.com/c/SumRndmDde
 */

(function() {

	var p = PluginManager.parameters('SRD_RestrictMovementDirections');
	var switches = [Number(p['Move Down Switch']), Number(p['Move Left Switch']), Number(p['Move Right Switch']), 
		Number(p['Move Up Switch'])];
	var conditions = [String(p['Move Down Condition']).trim(), String(p['Move Left Condition']).trim(), 
		String(p['Move Right Condition']).trim(), String(p['Move Up Condition']).trim()];

	var _Game_Player_getInputDirection = Game_Player.prototype.getInputDirection;
	Game_Player.prototype.getInputDirection = function() {
    var direction = _Game_Player_getInputDirection.call(this);
    var index = (direction / 2) - 1;
    index = (index === -1) ? 0 : index;

    if (switches[index] !== 0 && $gameSwitches.value(switches[index])) {
        return 0;
    } else if (conditions[index] && conditions[index].length > 0 && eval(conditions[index])) {
        return 0;
    }

    return direction;
};

})();