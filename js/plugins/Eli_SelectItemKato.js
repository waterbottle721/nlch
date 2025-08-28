//============================================================================
// Eli_SelectItemKato.js
//============================================================================

/*:
@plugindesc ♦5.0.0♦ - Changes Select item window.
@author Hakuen Studio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

Made for Kato-A!
https://forums.rpgmakerweb.com/index.php?threads/select-item-window-as-normal-item-window.145352/

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SelectItemKato = true

{

const Alias = {}

Alias.Window_EventItem_initialize = Window_EventItem.prototype.initialize
Window_EventItem.prototype.initialize = function (messageWindow) {
    Alias.Window_EventItem_initialize.call(this, messageWindow)
    this.createHelpAndLabelWindow()
}

Alias.Window_EventItem_update = Window_EventItem.prototype.update
Window_EventItem.prototype.update = function () {
    Alias.Window_EventItem_update.call(this)
    this._helpWindow.openness = this.openness
    this._itemWindowLabel.openness = this.openness
}

Window_EventItem.prototype.createHelpAndLabelWindow = function () {		
	this.createBackgroundSprite(); // 创建背景布局
    this._itemWindowLabel = new Window_Base(0, 0, this.width, this.fittingHeight(1))
    this._helpWindow = new Window_Help()
	this.addChildToBack(this._backgroundSprite);
    this.addChild(this._itemWindowLabel)
    this.addChild(this._helpWindow)
}

Window_EventItem.prototype.createBackgroundSprite = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture('equip'); 
    this._backgroundSprite.width = this.width; 
    this._backgroundSprite.height = this.height; 
    this._backgroundSprite.x = this.x;	
    this._backgroundSprite.y = this.y - 400; 
};

Window_EventItem.prototype.windowWidth = function () {
    return 640
}

Window_EventItem.prototype.numVisibleRows = function () {
    return 4
}

Window_EventItem.prototype.maxCols = function () {
    return 5
}

Window_EventItem.prototype.updatePlacement = function() {
    const topOffset = 24 // The space left on the top edge of the screen

    this.x = Graphics.boxWidth / 2 - this.width / 2
    this.y = this._itemWindowLabel.height + topOffset

    this._helpWindow.width = this.width
    this._helpWindow.y = this.height // Position Y below the item window

    this._itemWindowLabel.width = this.width
    this._itemWindowLabel.y = -this._itemWindowLabel.height // Position Y above the item window
    this.drawLabelText()
}

Window_EventItem.prototype.drawLabelText = function () {
    const texts = {
        0: $dataSystem.terms.commands[4],
        1: $dataSystem.terms.commands[14],
        2: "Hidden Items A",
        3: "Hidden Items B",
    }
    const label = texts[$gameMessage.itemChoiceItypeId()]
    const maxWidth = this.textWidth(label)
    const x = this._itemWindowLabel.contents.width/2 - maxWidth/2
    const y = 0
    const lineHeight = this._itemWindowLabel.lineHeight()

    this._itemWindowLabel.contents.clear()
    this._itemWindowLabel.drawText(label, x, y, maxWidth, lineHeight)
}

}