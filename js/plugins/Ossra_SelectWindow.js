var Ossra = Ossra || {};

Ossra.Window_EventItem_updatePlacement = Window_EventItem.prototype.updatePlacement;

Window_EventItem.prototype.updatePlacement = function() {
    Ossra.Window_EventItem_updatePlacement.call(this);

    if (this._helpWindow) {
      if (this.y === 0) {
        this._helpWindow.y = this.y + this.windowHeight();
      } else {
		this._helpWindow.x += 650;
        this._helpWindow.y = this.y - this._helpWindow.height;
      }
    }
};

Window_EventItem.prototype.setHelpWindow = function(helpWindow) {
    Window_ItemList.prototype.setHelpWindow.call(this, helpWindow);
    if (this._helpWindow) {
      this._helpWindow.hide();
      this._helpWindow.close();
    }
};

Window_EventItem.prototype.open = function() {
    Window_ItemList.prototype.open.call(this);
    if (this._helpWindow && (!this._messageWindow.isOpen() || this._messageWindow._positionType !== 1)) {
      this._helpWindow.show();
      this._helpWindow.open();
    }
};

Window_EventItem.prototype.close = function() {
    Window_ItemList.prototype.close.call(this);
    if (this._helpWindow) {
      this._helpWindow.hide();
      this._helpWindow.close();
    }
};

Ossra.Window_Message_subWindows = Window_Message.prototype.subWindows;

Window_Message.prototype.subWindows = function() {
  var tmpWindows = Ossra.Window_Message_subWindows.call(this);
  tmpWindows.push(this._helpWindow)
  return tmpWindows;
};

Ossra.Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;

Window_Message.prototype.createSubWindows = function() {
    Ossra.Window_Message_createSubWindows.call(this);
    this._helpWindow = new Window_Help();
	this._helpWindow.x += 650;
    this._helpWindow.y = this.y + 600;
    this._itemWindow.setHelpWindow(this._helpWindow);
};