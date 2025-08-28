//=============================================================================
// KY_Optimize.js
//=============================================================================
/*:
 * @plugindesc 优化事件运行
 * @author KYjoke
 * 
 * @param MaxTardiness
 * @text 最大延迟时间
 * @desc 事件逻辑帧最大会延迟多少帧
 * @type number
 * @default 100
 * 
 * @param TardinessRatio
 * @text 延迟比例
 * @desc 当事件距离玩家越远，延迟的帧数将成设定的倍数增长
 * @type number
 * @default 5
 * 
 * @help
 * v1.2
 * -2024.5.8 优化了部分代码，
 * 增加了备注过滤器，增加了维持事件正常移动
 * 增加了一个清除未使用的bitmap的功能
 * 完善了渲染帧逻辑，现在即使距离很远肉眼也看不出来事件变慢。
 * -2024.4.9 现在只对并行处理的事件生效
 * 
 * 分离事件的渲染帧和逻辑帧
 * 使用曼哈顿算法判断玩家和时间的距离
 * 距离越远则成倍降低逻辑帧的刷新频率
 * 渲染帧仅仅更新事件的移动和图像动画
 * 从而实现动态资源管理
 * 
 * 用人话来说，在距离玩家远处的事件，
 * 可能十帧才运行一次内部逻辑，而在玩家近处的事件则实时更新
 * 同时为了让玩家肉眼无法察觉，哪怕这个事件十帧有九帧不运行
 * 也会一直更新事件的图像和移动，来让玩家觉得运行流畅
 *
 * 如果你有不想要被降低刷新频率的事件（比如一颗子弹），请在事件的备注加上加上<NoOptimize>
 * 
 * 每隔一分钟强制清除太多（100个以上）的bitmap的功能（也许只能应对内存溢出？）
 * （注意，这是个测试功能，虽然可以成功的清除缓存，但是我不确定到底有没有太大作用）
 */
(function() {
	var KY_parameters_OP = PluginManager.parameters('KY_Optimize'); // 获取插件管理类
	// 获取插件参数
	var KY_TardinessRatio = Number(KY_parameters_OP['TardinessRatio'] || 10);
	var KY_MaxTardiness = Number(KY_parameters_OP['MaxTardiness'] || 100);

	var KY_Game_Event_update = Game_Event.prototype.update; // 保存原始的Game_Event的update方法
	Game_Event.prototype.update = function() {
		if (this.KY_NoOptimize) { // 如果事件包含"NoOptimize"字段，那么不进行优化
			KY_Game_Event_update.call(this);
			return;
		} else {
			var KY_OP__currentTime = performance.now(); // 获取当前时间
			var dist = Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y); //获取事件距离
			var KY_OP__fixedDeltaTime = Math.min((dist) * KY_TardinessRatio, KY_MaxTardiness); // 根据事件距离调整逻辑帧间隔
			if (KY_OP__currentTime - this.KY_OP__lastUpdate > KY_OP__fixedDeltaTime && this._trigger === 4) { // 如果当前时间与上次更新时间的差大于固定的时间间隔，则进行更新
				KY_Game_Event_update.call(this); // 调用原始的update方法
				this.KY_OP__lastUpdate = KY_OP__currentTime; // 更新上次更新时间
			} else { //渲染帧
				// 更新动画
				this.updateAnimation();
				// 更新移动
				if (this.isMoving()) {
					this.updateMove();
				} else {
					this.updateStop();
				}
			}
		}
	};

	var KY_Game_Event_initialize = Game_Event.prototype.initialize; // 保存原始的Game_Event的initialize方法
	Game_Event.prototype.initialize = function(mapId, eventId) { // 重写Game_Event的initialize方法
		KY_Game_Event_initialize.call(this, mapId, eventId); // 调用原始的initialize方法
		this.KY_OP__lastUpdate = performance.now(); // 设置事件的上次更新时间为当前时间
		this.KY_NoOptimize = this.event().note.includes("NoOptimize"); // 检查事件备注，如果包含"NoOptimize"字段，设置KY_NoOptimize为true来跳过优化
	};

})();
