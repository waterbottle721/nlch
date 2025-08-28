//=============================================================================
// Yanfly Engine Plugins - Map Select Equip
// YEP_MapSelectEquip.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MapSelectEquip = true;

var Yanfly = Yanfly || {};
Yanfly.MSE = Yanfly.MSE || {};
Yanfly.MSE.version = 1.01;

//=============================================================================
/*:
* @plugindesc v1.01 Open up a window similar to the Select Item Window,
* but instead, returns weapon/armor ID's to a variable.
* @author Yanfly Engine Plugins
*
* @param Default Columns
* @type number
* @min 1
* @desc Default number of columns for the window.
* @default 2
*
* @param Default Rows
* @type number
* @min 1
* @desc Default number of rows for the window.
* @default 4
*
* @param Default X Position
* @type combo
* @option left
* @option center
* @option right
* @desc Default X Position of the window.
* left     center     right
* @default center
*
* @param Default Y Position
* @type combo
* @option top
* @option middle
* @option bottom
* @desc Default Y Position of the window.
* top     middle     bottom
* @default bottom
*
* @param Default Width
* @type number
* @min 0
* @desc Default width of the window.
* If set to 0, window width will be the screen width.
* @default 0
*
* @param Default Enable
* @type boolean
* @on Enable
* @off Disable
* @desc Enable all equips by default?
* NO - false     YES - true
* @default true
*
* @param Default Quantity
* @type boolean
* @on YES
* @off NO
* @desc Show the quantity of the equips by default?
* NO - false     YES - true
* @default true
*
* @help
* ============================================================================
* Introduction
* ============================================================================
*
* The Select Item event in RPG Maker MV does what it's supposed to: selects an
* item and then binds the value to a variable. However, it lacks the ability
* to allow the player to select weapons, armors, or both. This plugin gives
* you the functionality of selecting an equip and binding the ID of the equip
* to a variable.
*
* ============================================================================
* Plugin Commands
* ============================================================================
*
* Use the following plugin commands to utilize the Map Select Equip plugin.
*
* --- Plugin Commands ---
*
* MapSelectEquip var type
* - This will open up the Map Select Equip window. Replace 'var' with the ID
* of the variable you wish to set the selected item to. Replace 'type' with
* 'weapon', 'armor', or 'both'. The 'type' will decide the list type.
*
* MapSelectEquipColumns x
* - Sets the number of columns for the Map Select Equip Window to x.
*
* MapSelectEquipRows x
* - Sets the number of rows for the Map Select Equip Window to x.
*
* MapSelectEquipWidth x
* - Sets the width for the Map Select Equip Window to x. If 0 is used, then
* the window width will be the screen width.
*
* MapSelectEquipX left
* MapSelectEquipX center
* MapSelectEquipX right
* - Sets the Map Select Equip Window to be aligned to the left side of the
* screen, center of the screen, or right side of the screen.
*
* MapSelectEquipY top
* MapSelectEquipY middle
* MapSelectEquipY bottom
* - Sets the Map Select Equip Window to be aligned to the top of the screen,
* middle of the screen, or bottom of the screen.
*
* ShowMapSelectEquipQuantity
* - Show the quantity of the Equips in the Map Select Equip Window.
*
* HideMapSelectEquipQuantity
* - Hide the quantity of the Equips in the Map Select Equip Window.
*
* ============================================================================
* Changelog
* ============================================================================
*
* Version 1.01:
* - Updated for RPG Maker MV version 1.5.0.
*
* Version 1.00:
* - Finished Plugin!
*/
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MapSelectEquip');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSECol = Number(Yanfly.Parameters['Default Columns']);
Yanfly.Param.MSERow = Number(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSEPosX = String(Yanfly.Parameters['Default X Position']);
Yanfly.Param.MSEPosY = String(Yanfly.Parameters['Default Y Position']);
Yanfly.Param.MSEWidth = Number(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSEEnable = eval(String(Yanfly.Parameters['Default Enable']));
Yanfly.Param.MSEQuantity = eval(String(Yanfly.Parameters['Default Quantity']));

//=============================================================================
// Game_System
//=============================================================================

Yanfly.MSE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  Yanfly.MSE.Game_System_initialize.call(this);
  this.initMapSelectEquip();
};

Game_System.prototype.initMapSelectEquip = function () {
  this._MapSelectEquipWindowColumns = Yanfly.Param.MSECol;
  this._MapSelectEquipWindowRows = Yanfly.Param.MSERow;
  this._MapSelectEquipWindowPosX = Yanfly.Param.MSEPosX;
  this._MapSelectEquipWindowPosY = Yanfly.Param.MSEPosY;
  this._MapSelectEquipWindowWidth = Yanfly.Param.MSEWidth;
  this._MapSelectEquipWindowEnable = Yanfly.Param.MSEEnable;
  this._MapSelectEquipWindowQuantity = Yanfly.Param.MSEQuantity;
};

Game_System.prototype.getMapSelectEquipColumns = function () {
  if (this._MapSelectEquipWindowColumns === undefined) {
    this.initMapSelectEquip();
  }
  return this._MapSelectEquipWindowColumns;
};

Game_System.prototype.setMapSelectEquipColumns = function (value) {
  if (this._MapSelectEquipWindowColumns === undefined) {
    this.initMapSelectEquip();
  }
  this._MapSelectEquipWindowColumns = value;
};

Game_System.prototype.getMapSelectEquipRows = function () {
  if (this._MapSelectEquipWindowRows === undefined) {
    this.initMapSelectEquip();
  }
  return this._MapSelectEquipWindowRows;
};

Game_System.prototype.setMapSelectEquipRows = function (value) {
  if (this._MapSelectEquipWindowRows === undefined) {
    this.initMapSelectEquip();
  }
  this._MapSelectEquipWindowRows = value;
};

Game_System.prototype.getMapSelectEquipPosX = function () {
  if (this._MapSelectEquipWindowPosX === undefined) {
    this.initMapSelectEquip();
  }
  return this._MapSelectEquipWindowPosX;
};

Game_System.prototype.setMapSelectEquipPosX = function (value) {
  if (this._MapSelectEquipWindowPosX === undefined) {
    this.initMapSelectEquip();
  }
  this._MapSelectEquipWindowPosX = value;
};

Game_System.prototype.getMapSelectEquipPosY = function () {
  if (this._MapSelectEquipWindowPosY === undefined) {
    this.initMapSelectEquip();
  }
  return this._MapSelectEquipWindowPosY;
};

Game_System.prototype.setMapSelectEquipPosY = function (value) {
  if (this._MapSelectEquipWindowPosY === undefined) {
    this.initMapSelectEquip();
  }
  this._MapSelectEquipWindowPosY = value;
};

Game_System.prototype.getMapSelectEquipWidth = function () {
  if (this._MapSelectEquipWindowWidth === undefined) {
    this.initMapSelectEquip();
  }
  return this._MapSelectEquipWindowWidth;
};

Game_System.prototype.setMapSelectEquipWidth = function (value) {
  if (this._MapSelectEquipWindowWidth === undefined) {
    this.initMapSelectEquip();
  }
  this._MapSelectEquipWindowWidth = value;
};

Game_System.prototype.getMapSelectEquipEnable = function () {
  if (this._MapSelectEquipWindowEnable === undefined) {
    this.initMapSelectEquip();
  }
  return this._MapSelectEquipWindowEnable;
};

Game_System.prototype.setMapSelectEquipEnable = function (value) {
  if (this._MapSelectEquipWindowEnable === undefined) {
    this.initMapSelectEquip();
  }
  this._MapSelectEquipWindowEnable = value;
};

Game_System.prototype.getMapSelectEquipQuantity = function () {
  if (this._MapSelectEquipWindowQuantity === undefined) {
    this.initMapSelectEquip();
  }
  return this._MapSelectEquipWindowQuantity;
};

Game_System.prototype.setMapSelectEquipQuantity = function (value) {
  if (this._MapSelectEquipWindowQuantity === undefined) {
    this.initMapSelectEquip();
  }
  this._MapSelectEquipWindowQuantity = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.MSE.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  Yanfly.MSE.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'MapSelectEquip') {
    if (SceneManager._scene instanceof Scene_Map) {
      var varId = parseInt(args[0]);
      var line = String(args[1]);
      if (line.match(/WEAPON/i)) {
        var type = 'WEAPONS';
      } else if (line.match(/ARMOR/i)) {
        var type = 'ARMORS';
      } else if (line.match(/BOTH/i)) {
        var type = 'BOTH';
      } else {
        return;
      }
      SceneManager._scene.setupMapSelectEquip(varId, type, false);
      this.wait(10);
    }
  } else if (command === 'MapSelectEquipBase') {
    if (SceneManager._scene instanceof Scene_Map) {
      var varId = parseInt(args[0]);
      var line = String(args[1]);
      if (line.match(/WEAPON/i)) {
        var type = 'WEAPONS';
      } else if (line.match(/ARMOR/i)) {
        var type = 'ARMORS';
      } else if (line.match(/BOTH/i)) {
        var type = 'BOTH';
      } else {
        return;
      }
      SceneManager._scene.setupMapSelectEquip(varId, type, true);
      this.wait(10);
    }
  } else if (command === 'MapSelectEquipColumns') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectEquipColumns(value);
  } else if (command === 'MapSelectEquipRows') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectEquipRows(value);
  } else if (command === 'MapSelectEquipWidth') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectEquipWidth(value);
  } else if (command === 'MapSelectEquipX') {
    var value = String(args[0]).toLowerCase();
    $gameSystem.setMapSelectEquipPosX(value);
  } else if (command === 'MapSelectEquipY') {
    var value = String(args[0]).toLowerCase();
    $gameSystem.setMapSelectEquipPosY(value);
  } else if (command === 'ShowMapSelectEquipQuantity') {
    $gameSystem.setMapSelectEquipQuantity(true);
  } else if (command === 'HideMapSelectEquipQuantity') {
    $gameSystem.setMapSelectEquipQuantity(false);
  }
};

//=============================================================================
// Window_MapSelectEquip
//=============================================================================

function Window_MapSelectEquip() {
  this.initialize.apply(this, arguments);
}

Window_MapSelectEquip.prototype = Object.create(Window_ItemList.prototype);
Window_MapSelectEquip.prototype.constructor = Window_MapSelectEquip;

Window_MapSelectEquip.prototype.initialize = function () {
  var width = this.windowWidth();
  var height = this.windowHeight();
  Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
  //this.createButton();
  this.openness = 0;
};
Window_MapSelectEquip.prototype.createButton = function () {
  const bitmap = new Bitmap(100, 30);
  bitmap.fillAll($gameSwitches.value(446) ? ' #87CEEB' : '	#DC143C');
  this._sortOutBtn = new Sprite_Button();
  this._sortOutBtn.bitmap = bitmap;
  this._sortOutBtn.setClickHandler(() => {
    $gameSwitches.setValue(446, !$gameSwitches.value(446));
    bitmap.fillAll($gameSwitches.value(446) ? ' #87CEEB' : '	#DC143C');
    if (this.arrItem && !$gameSwitches.value(446)) {
      this.arrItem = [];
    }
    this.refresh();
  });
  this._sortOutBtn.x = 50;
  this._sortOutBtn.y = -30;
  this._sortOutBtn.visible = false;
  this.addChild(this._sortOutBtn);
}
Window_MapSelectEquip.prototype.itemRect = function (index) {
  var rect = new Rectangle();
  var maxCols = this.maxCols();
  rect.width = this.itemWidth();
  rect.height = this.itemHeight();
  rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
  rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
  return rect;
};

Window_MapSelectEquip.prototype.itemHeight = function () {
  return 84;
};

Window_MapSelectEquip.prototype.drawItemName = function (item, x, y, width) {
  width = width || 312;
  if (item) {
    this.resetTextColor();
    if (this.arrItem && this.arrItem.includes(item.id)) {
      const rect = this.itemRect(this._data.indexOf(item));
      // var color = '#00BFFF';
      // this.contents.fillRect(rect.x, rect.y, 82, 82, color);
      //ImageManager.reserveBitmap
      const img = ImageManager.loadBitmap('img/Menu__ui/', 'equip slot cursor');
      img.addLoadListener(bit => {
        this.contents.blt(bit, 0, 0, bit.width, bit.height, rect.x - 16, rect.y - 13);
      });

    };
    this.drawIcon(item.iconIndex, x + 5, y + 10);
    //var x = ($gameSystem.getMapSelectEquipWidth() - textWidth - iconBoxWidth) / 2;
    //this.drawItemNameLow(item.name, 660, 800, width);
    //this.drawText(item.name, x + iconBoxWidth, y + 48, width - iconBoxWidth, 'center');
  }
};
Window_MapSelectEquip.prototype.select = function (index) {
  Window_ItemList.prototype.select.call(this, index);
  if ($gameSwitches.value(446)) {
    this.arrItem = this.arrItem || [];
    if (!this.item()) return;
    const itemId = this.item().id;
    if (this.arrItem.includes(itemId)) {
      this.arrItem.splice(this.arrItem.indexOf(itemId), 1);
    } else {
      this.arrItem.push(itemId);
    }
	console.log(this.arrItem);
    this.refresh();
  }
}

//文本框高度
Window_MapSelectEquip.prototype.fittingHeight = function (col) {
  return col * this.itemHeight() + this.standardPadding() * 2;
};

Window_MapSelectEquip.prototype.windowWidth = function () {
  return this._windowWidth || Graphics.boxWidth;
};

Window_MapSelectEquip.prototype.windowHeight = function () {
  return this._windowHeight || this.fittingHeight(4);
};

Window_MapSelectEquip.prototype.setup = function (varId, type, base) {
  if (!varId) return;
  if (!type) return;
  this.updateWindowSettings();
  this._varId = varId;
  this._base = base;
  this.setType(type)
  this.refresh();
  this.activate();
  this.open();
  this.select(-1);
};

Window_MapSelectEquip.prototype.setType = function (type) {
  this._type = type.toUpperCase();
};

Window_MapSelectEquip.prototype.includes = function (item) {
  if (DataManager.isWeapon(item)) {
    return ['WEAPONS', 'BOTH'].contains(this._type);
  }
  if (DataManager.isArmor(item)) {
    return ['ARMORS', 'BOTH'].contains(this._type);
  }
  return false;
};

Window_MapSelectEquip.prototype.maxCols = function () {
  return $gameSystem.getMapSelectEquipColumns() || 1;
};

Window_MapSelectEquip.prototype.updateWindowSettings = function () {
  this.width = $gameSystem.getMapSelectEquipWidth() || Graphics.boxWidth;
  var col = $gameSystem.getMapSelectEquipRows() || 4;
  this.height = this.fittingHeight(col);   //窗口高度
  if ($gameSystem.getMapSelectEquipPosX() === 'left') {
    this.x = 0;
  } else if ($gameSystem.getMapSelectEquipPosX() === 'center') {
    this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
  } else {
    this.x = Graphics.boxWidth - this.width;
  }
  if ($gameSystem.getMapSelectEquipPosY() === 'top') {
    this.y = 0;
  } else if ($gameSystem.getMapSelectEquipPosY() === 'middle') {
    this.y = Math.floor((Graphics.boxHeight - this.height) / 2);
  } else {
    this.y = Graphics.boxHeight - this.height;
  }
  this.x += 36;
  this.y = 285;
};

Window_MapSelectEquip.prototype.updateCursor = function () {
  if (this._cursorAll) {
    var allRowsHeight = this.maxRows() * this.itemHeight();
    this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
    this.setTopRow(0);
  } else if (this.isCursorVisible()) {
    if ($gameSwitches.value(446)) {
      this.setCursorRect(0, 0, 0, 0);
    } else {
      var rect = this.itemRect(this.index());
      this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    }
  } else {
    this.setCursorRect(0, 0, 0, 0);
  }
};

Window_MapSelectEquip.prototype.drill_MCu_cursorEnabled = function () {
  return !$gameSwitches.value(446);
}


Window_MapSelectEquip.prototype.isEnabled = function (item) {
  if ($gameSystem.getMapSelectEquipEnable()) return true;
  return Window_ItemList.prototype.isEnabled.call(this, item);
};

Window_MapSelectEquip.prototype.drawItemNumber = function (item, x, y, width) {
  if ($gameSystem.getMapSelectEquipQuantity()) {
    Window_ItemList.prototype.drawItemNumber.call(this, item, x, y + 42, width);
  }
};

if (Imported.Drill_MenuCursor == true) {
  //适配Drill指针
  Window_MapSelectEquip.prototype.drill_MCu_cursorStyleId = function () {
    return 6;
  }
}


Window_MapSelectEquip.prototype.processOk = function() {
    // 走原本逻辑
    Window_ItemList.prototype.processOk.call(this);
 
};


Window_MapSelectEquip.prototype.open = function () {
  Window_Base.prototype.open.call(this);
  if (this._sortOutBtn) this._sortOutBtn.visible = true;
};

Window_MapSelectEquip.prototype.close = function () {
  Window_Base.prototype.close.call(this);
  if (this._sortOutBtn) this._sortOutBtn.visible = false;
  this.arrItem = [];
  this.select(-1); 
};

//=============================================================================
// Window_MapSelectAction
//=============================================================================

function Window_MapSelectAction() {
  this.initialize.apply(this, arguments);
}

Window_MapSelectAction.prototype = Object.create(Window_Command.prototype);
Window_MapSelectAction.prototype.constructor = Window_MapSelectAction;

Window_MapSelectAction.prototype.initialize = function (x, y) {
  Window_Command.prototype.initialize.call(this, x, y);
  this.createBackground();
};

Window_MapSelectAction.prototype.makeCommandList = function () {
  this.addCommand('  ', 'equip');
  this.addCommand('  ', 'cancel');
  this.addCommand('  ', 'discard');
};

Window_MapSelectAction.prototype.windowWidth = function () {
  return 240;
};

Window_MapSelectAction.prototype.maxCols = function () {
  return this.maxItems();
};

Window_MapSelectAction.prototype.numVisibleRows = function () {
  return 1;
};

Window_MapSelectAction.prototype.createBackground = function () {
  this._backgroundSprite = new Sprite();
  this._backgroundSprite.bitmap = ImageManager.loadSystem('EquipCommand');
  this._backgroundSprite.x = this.x - 870;
  this._backgroundSprite.y = this.y - 630;
  this.addChildToBack(this._backgroundSprite);
};

Window_MapSelectAction.prototype.isCommandEnabled = function (index) {
  return index !== 1; // 除了索引为2的命令，其他命令都是可用的
};

Window_MapSelectAction.prototype.select = function (index) {
	
  if (this.isCommandEnabled(index)) {
    Window_Command.prototype.select.call(this, index);
  } else {
    // 如果命令不可用，光标不移动，或者你可以将光标移动到下一个可用的命令
    if (index < this.maxItems() - 1) {
      this.select(index + 1);
    } else {
      this.select(index - 1);
    }
  }
};

Window_MapSelectAction.prototype.cursorRight = function (wrap) {
  var index = this.index();
  if (this.isCommandEnabled(index + 1)) {
    Window_Command.prototype.cursorRight.call(this, wrap);
  }
};

Window_MapSelectAction.prototype.cursorLeft = function (wrap) {
  var index = this.index();
  if (this.isCommandEnabled(index - 1)) {
    Window_Command.prototype.cursorLeft.call(this, wrap);
  }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.MSE.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
  Yanfly.MSE.Scene_Map_createAllWindows.call(this);
  this.createMapSelectEquipWindow();
  this.createMapSelectActionWindow();
};

Scene_Map.prototype.createMapSelectEquipWindow = function () {
  this._MapSelectEquipWindow = new Window_MapSelectEquip();
  this._MapSelectEquipWindow.setHandler('ok',
    this.onMapSelectEquipOk.bind(this));
  this._MapSelectEquipWindow.setHandler('cancel',
    this.onMapSelectEquipCancel.bind(this));
  this.addChild(this._MapSelectEquipWindow);
  this._MapSelectEquipWindow.opacity = 255;  //添加透明度为0
};

Scene_Map.prototype.createMapSelectActionWindow = function () {
  var x = 830;
  var y = (Graphics.boxHeight - this._MapSelectEquipWindow.fittingHeight(3)) / 2 + 185;
  this._MapSelectActionWindow = new Window_MapSelectAction(x, y);
  this._MapSelectActionWindow.setHandler('discard', this.onActionDiscard.bind(this));
  this._MapSelectActionWindow.setHandler('equip', this.onActionEquip.bind(this));
  this._MapSelectActionWindow.setHandler('cancel', this.onActionCancel.bind(this));
  this._MapSelectActionWindow.hide();
  this._MapSelectActionWindow.close();
  this.addChild(this._MapSelectActionWindow);
};

Scene_Map.prototype.setupMapSelectEquip = function (varId, type, base) {
  this._MapSelectEquipWindow.setup(varId, type, base);
  this._active = false;
};

Scene_Map.prototype.processMapSelectEquipOk = function () {
  //this._MapSelectEquipWindow.close();
  var item = this._MapSelectEquipWindow.item();
  var varId = this._MapSelectEquipWindow._varId;
  var itemId = 0;
  if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvBridge();
  if (!item) {
  } else {
    if (this._MapSelectEquipWindow._base && item.baseItemId) {
      itemId = item.baseItemId;
    } else {
      itemId = item.id;
    }
  }
  if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvent();
  $gameVariables.setValue(varId, itemId);
  return itemId;
};

Scene_Map.prototype.onMapSelectEquipCancel = function () {
		
  if ($gameSwitches.value(446)) {
  // 1. 先清掉所有触摸输入，防止同帧再被一次点击
  TouchInput.clear();  
  // 2. 停用输入，并撤掉光标
  this._MapSelectEquipWindow.deactivate();
  this._MapSelectEquipWindow.select(-1);
    const arrItem = this._MapSelectEquipWindow.arrItem || [];
	 $gameNumberArray.setValue(22,arrItem);
  }
  
  this._MapSelectEquipWindow.close();
  this._mapSelectEquipHelpWindow.close();
  var varId = this._MapSelectEquipWindow._varId;
  $gameVariables.setValue(varId, 0);
  this._active = true;
};

Scene_Map.prototype.onActionDiscard = function () {
  $gameSwitches.setValue(113, true);
  this.processMapSelectEquipOk();
  this._MapSelectActionWindow.hide();
  this._MapSelectActionWindow.close();
  this._MapSelectEquipWindow.close();
  this._mapSelectEquipHelpWindow.close();
  this._active = true;
};

Scene_Map.prototype.onActionEquip = function () {
  this.processMapSelectEquipOk();
  this._MapSelectActionWindow.hide();
  this._MapSelectActionWindow.close();
  this._MapSelectEquipWindow.close();
  this._mapSelectEquipHelpWindow.close();
  this._active = true;
};

Scene_Map.prototype.onActionCancel = function () {
  this._MapSelectActionWindow.hide();
  this._MapSelectActionWindow.close();
  this._mapSelectEquipHelpWindow.close();
  this._MapSelectEquipWindow.activate();
  this._MapSelectEquipWindow.open();
  this._mapSelectEquipHelpWindow.open();
};

Scene_Map.prototype.onMapSelectEquipOk = function () {

    if ($gameSwitches.value(446)) {
      //添加逻辑
      this._MapSelectEquipWindow.arrItem = this._MapSelectEquipWindow.arrItem || [];
      const arrItem = this._MapSelectEquipWindow.arrItem;
      const itemId = this._MapSelectEquipWindow.item().id;
      if (arrItem.includes(itemId)) {
        arrItem.splice(arrItem.indexOf(itemId), 1);
      } else {
        arrItem.push(itemId);
      }
      this._MapSelectEquipWindow.refresh();
      this._MapSelectEquipWindow.activate();
    } else {
      this._MapSelectActionWindow.show();
      this._MapSelectActionWindow.open();
      this._MapSelectActionWindow.activate();
    }
};

//=============================================================================
// End of File
//=============================================================================
