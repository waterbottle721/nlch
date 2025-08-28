var krz = krz || {};
krz.memory = krz.memory || {};
krz.memory = 0.015;
krz._mm = krz._mm || {};
//=============================================================================
 /*:
 * @plugindesc v0.02  菜单里显示当前内存使用。
 * 适用于1.5.1以及以上。
 * 
 * @author KRZ
 *
 * @param ---General---
 * @default
 *
 * @param show on map
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否在地图上也显示
 *  NO - false     YES - true
 * @default true 
 *
 * @param show in battle
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否在战斗中也显示
 *  NO - false     YES - true
 * @default true  
 *
 *
 * @param window x
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 窗口x轴位置
 * Default: 500
 * @default 500
 *
 * @param window y
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 窗口y轴位置
 * Default: 500
 * @default 500
 *
 * @param window height
 * @parent ---General---
 * @desc 窗口高度 可以是代码
 * Default: this.fittingHeight(1);
 * @default this.fittingHeight(1);
 *
 * @param window width
 * @parent ---General---
 * @desc 窗口宽度 可以是代码
 * Default: 240;
 * @default 240;
 *
 * @param refresh time
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 刷新帧数
 * Default: 60
 * @default 60
 *
 * @param dangerous time
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 危险提示百分比
 * Default: 95
 * @default 95
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *  游戏老是蹦怎么办？玩的好好的没有前兆就闪退！
 *  坏孩子没事游戏一开半个下午闪退还骂人？
 *  垃圾电脑玩了半小时游戏直接爆炸？
 *  游戏差评：闪退！(点名饭大师
 *  
 *  玩家苦不堪言，作者没有办法的结局被逆转了！
 *   
 *   现在玩家可以直观的看到游戏当前虚拟内存占用情况，
 *   在达到限额时还会温馨提示，让玩家没有借口！
 *    
 *   PS：当然你作者写的bug出的错把游戏搞闪退了和我没关系
 * 2021年12月12日15:45:18 加入了开关
 * 2021年12月14日11:24:28  $gameSystem._closememory = true可以关闭
 */
//=============================================================================

//=============================================================================
// 
//=============================================================================
krz.Parameters = PluginManager.parameters('krz_menu_memory');
krz.Param = krz.Param || {};
krz.Param.memoryonmap = eval(String(krz.Parameters['memory on map']));
krz.Param.memoryrefresh = Number(krz.Parameters['refresh time']);
krz.Param.memorydangerous = Number(krz.Parameters['dangerous time']);
krz.Param.memorywindowx = Number(krz.Parameters['window x']);
krz.Param.memorywindowy = Number(krz.Parameters['window y']);
krz.Param.memorywindoww = String(krz.Parameters['window width']);
krz.Param.memorywindowh = String(krz.Parameters['window height']);
krz.Param.memoryshowonmap = String(krz.Parameters['show on map']);
krz.Param.memoryshowinbattle = String(krz.Parameters['show in battle']);

if(ConfigManager.memorycache ==undefined) ConfigManager.memorycache  =  true;

krz._mm.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = krz._mm.ConfigManager_makeData.call(this);
    config.memorycache = this.memorycache;
    return config;
};

krz._mm.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    this.memorycache = this.readMemoryFlag(config, 'memorycache');
	krz._mm.ConfigManager_applyData.call(this, config);
};

ConfigManager.readMemoryFlag = function(config, name) {
    var value = config[name];
    if (value !== undefined && value !== NaN) {
        return value;
    } else {
		config.memorycache = true;
        return true;
    }
};

krz._mm.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	krz._mm.Window_Options_addGeneralOptions.call(this);
	this.addCommand('虚拟内存使用量', 'memorycache');
};
//////////////////
krz._mm.Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    krz._mm.Scene_Menu_create.call(this);
    this.creatememoryWindow();
};
Scene_Menu.prototype.creatememoryWindow = function() {
	if(ConfigManager.memorycache && !$gameSystem._closememory){
    this._memoryWindow = new Window_memory(0, 0);
    this._memoryWindow.y = krz.Param.memorywindowy;
	this._memoryWindow.x = krz.Param.memorywindowx;
    this.addChild(this._memoryWindow);
	}
};

krz._mm.Scene_Map_create = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    krz._mm.Scene_Map_create.call(this);
    if(eval(krz.Param.memoryshowonmap)) this.creatememoryWindow();
};
Scene_Map.prototype.creatememoryWindow = function() {
	if(ConfigManager.memorycache && !$gameSystem._closememory){
    this._memoryWindow = new Window_memory(0, 0);
    this._memoryWindow.y = krz.Param.memorywindowy;
	this._memoryWindow.x = krz.Param.memorywindowx;
    this.addWindow(this._memoryWindow);
	}
};

krz._mm.Scene_Battle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
    krz._mm.Scene_Battle_create.call(this);
    if(eval(krz.Param.memoryshowinbattle)) this.creatememoryWindow();
};
Scene_Battle.prototype.creatememoryWindow = function() {
	if(ConfigManager.memorycache && !$gameSystem._closememory){
    this._memoryWindow = new Window_memory(0, 0);
    this._memoryWindow.y = krz.Param.memorywindowy;
	this._memoryWindow.x = krz.Param.memorywindowx;
    this.addChild(this._memoryWindow);
	}
};
//-----------------------------------------------------------------------------
// Window_memory
//
// The window for displaying the party's memory.

function Window_memory() {
    this.initialize.apply(this, arguments);
}

Window_memory.prototype = Object.create(Window_Base.prototype);
Window_memory.prototype.constructor = Window_memory;

Window_memory.prototype.initialize = function(x, y) {
    var width = eval(krz.Param.memorywindoww);
    var height = eval(krz.Param.memorywindowh);
	this._list = eval(krz.Param.memorywindowmemory);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._refreshtime = 0;
	this.opacity = 0;
    this.refresh();
};

Window_memory.prototype.windowWidth = function() {
    return eval(krz.Param.memorywindoww);
};

Window_memory.prototype.windowHeight = function() {
    return eval(krz.Param.memorywindowh);
};
krz._mm.Window_memory_update = Window_memory.prototype.update;
Window_memory.prototype.update = function(){
	if($gameSystem._closememory){
		this.visible =false;
	}else{
		this.visible = true;
	}
	krz._mm.Window_memory_update.call(this);
	this._refreshtime += 1;
	if(this._refreshtime>=krz.Param.memoryrefresh){
		this._refreshtime = 0;
		this.refresh();
	}	
}

Window_memory.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	if(process.memoryUsage().heapUsed/process.memoryUsage().heapTotal) {
		var rate = process.memoryUsage().heapUsed/process.memoryUsage().heapTotal
		if(rate>0.95){
			this.changeTextColor(this.textColor(18));
		}else if(rate>0.9){
			this.changeTextColor(this.textColor(10));
		}else if(rate>0.85){
			this.changeTextColor(this.textColor(20));
		}else{
			this.changeTextColor(this.textColor(3));
		}
		this.drawText('内存:'+Math.floor(rate*100)+'%',x,0,width);	
		if(rate>=krz.Param.memorydangerous/100 && !$gameTemp._onceshowsave){
		$gameTemp._onceshowsave = true
		alert('当前虚拟内存使用量超过'+krz.Param.memorydangerous+'%，请注意存档后重启!')
		}	
	}
};

Window_memory.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};




