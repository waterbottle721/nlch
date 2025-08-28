//============================================================================
// Eli_BalloonPosition.js
//============================================================================

/*:
@plugindesc ♦5.1.0♦ Set custom balloon positions for events and players!
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
============================================================================
Plugin Requirements
============================================================================

Need Eli Book.
Order After Eli Book

============================================================================
Features
============================================================================

Changing the position of the balloons:
• Through the file name.
• Through the notes field.
• Through comments on the event pages.

============================================================================
How to use
============================================================================

To use this plugin it is necessary to keep in mind that it will not assign 
a new position for the balloon, but rather, add (or subtract) a value from 
the original position. 
That is, it works as an offset.

Thus, the balloon's standard X position is equivalent to the character's 
X position (on the screen). The balloon's Y position is equal to the 
character's Y position - the height of the sprite (this.y - this.height).
Having understood that, it is very easy to use the plugin.

You can change the balloon position with the following methods. 
Keep in mind that they are listed in order of priority.

• File name:
- You need to add "bpos[x, y]" in the file name. For example:
Actor1_bpos[30,40].png

• Notes field:
- Put the following in the notes field (for event and player - It is 
case-sensitive):
<BalloonPos: x, y>
Replace X and Y with the values ​​you want.
*For the player use the note field from the actor database.

• Comments (Only works for events)
- Add the same as the notes field:
<BalloonPos: x, y>
However, it is not case sensitive here.

============================================================================
Update Log
============================================================================

https://docs.google.com/document/d/1GLpFmIwQ8MWsdmkLrJIJiN4v0w4ozMrGF2R-t30Ta1Y/edit?usp=sharing

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_BalloonPosition = true

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */
{
const pluginName = "Eli Balloon Position"
const requiredVersion = 5.09
const messageVersion = "5.0.9"

if(!Eli.Book){

    const msg = `${pluginName}:\nYou are missing the core plugin: Eli Book.\nPlease, click ok to download it now.`
    if(window.confirm(msg)){
        nw.Shell.openExternal("https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz")
    }

}else if(Eli.Book.version < requiredVersion){

    const msg = `${pluginName}:\nYou need Eli Book version ${messageVersion} or higher.\nPlease, click ok to download it now.`
    if(window.confirm(msg)){
        nw.Shell.openExternal("https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz")
    }
}

}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.BalloonPosition = {

    version: 5.10,
    url: "https://hakuenstudio.itch.io/eli-balloon-position-for-rpg-maker-mv",
    parameters: {},
    alias: {},
    
    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){},

    param(){
        return this.parameters
    },

}

const Plugin = Eli.BalloonPosition
const Alias = Eli.BalloonPosition.alias

Plugin.initialize()

const COMMENT_TAG = "<balloonpos:"
const FILE_TAG = "bpos["

/* --------------------------- GAME CHARACTER BASE -------------------------- */
{

Alias.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers
Game_CharacterBase.prototype.initMembers = function(){
    Alias.Game_CharacterBase_initMembers.call(this)
    this._balloonX = 0
    this._balloonY = 0
}

Alias.Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage
Game_CharacterBase.prototype.setImage = function(characterName, characterIndex){
    Alias.Game_CharacterBase_setImage.call(this, characterName, characterIndex)

    if(this.filenameHasBalloonPosition(characterName)){
        this.setBalloonPositionByString(characterName, FILE_TAG, "]")
    }
}

Game_CharacterBase.prototype.filenameHasBalloonPosition = function(filename){
    return filename.toLowerCase().includes(FILE_TAG)
}   

Game_CharacterBase.prototype.setBalloonPositionByString = function(balloonString, openTag, closeTag) {
    const trimmedBallonString = Eli.String.removeSpaces(balloonString).toLowerCase()
    const start = trimmedBallonString.indexOf(openTag) + openTag.length
    const str = trimmedBallonString.substring(start)
    const end = str.indexOf(closeTag)
    const data = str.substring(0, end)
    const [x, y] = data.split(",")

    this._balloonX = Number(x)
    this._balloonY = Number(y)
}

Game_CharacterBase.prototype.balloonX = function(){
    return this._balloonX
}

Game_CharacterBase.prototype.balloonY = function(){
    return this._balloonY
}

Game_CharacterBase.prototype.hasBalloonNoteTag = function(note){
    return note.toLowerCase().includes(COMMENT_TAG)
}

}

/* ------------------------------- GAME PLAYER ------------------------------ */
{

Alias.Game_Player_startBalloon = Game_Player.prototype.startBalloon
Game_Player.prototype.startBalloon = function() {
    this.setBalloonPosition()
    Alias.Game_Player_startBalloon.call(this)
}

Game_Player.prototype.setBalloonPosition = function() {
    const leader = $gameParty.leader()
    if(leader && !this.filenameHasBalloonPosition(this.characterName())){
        const note = leader.actor().note

        if(this.hasBalloonNoteTag(note)){
            this.setBalloonPositionByString(note, COMMENT_TAG, ">")
        }
    }
}

}

/* ------------------------------ GAME FOLLOWER ----------------------------- */
{

Alias.Game_Follower_startBalloon = Game_Follower.prototype.startBalloon
Game_Follower.prototype.startBalloon = function() {
    this.setBalloonPosition()
    Alias.Game_Follower_startBalloon.call(this)
}

Game_Follower.prototype.setBalloonPosition = function() {
    if(this.actor()){
        const note = this.actor().note

        if(this.hasBalloonNoteTag(note)){
            this.setBalloonPositionByString(note, COMMENT_TAG, ">")
        }
    }
}

}

/* ------------------------------- GAME EVENT ------------------------------- */
{

Alias.Game_Event_beforeSetupPage = Game_Event.prototype.beforeSetupPage
Game_Event.prototype.beforeSetupPage = function(){
    Alias.Game_Event_beforeSetupPage.call(this)
    this._balloonX = 0
    this._balloonY = 0
}

Alias.Game_Event_afterSetupPage = Game_Event.prototype.afterSetupPage
Game_Event.prototype.afterSetupPage = function(){
    Alias.Game_Event_afterSetupPage.call(this)
    this.setupBalloonPosition()
}

Game_Event.prototype.setupBalloonPosition = function(){
    if(this.needCheckForBalloonPosition()){

        if(this.hasBalloonNoteTag(this.event().note)){
            this.setBalloonPositionByString(this.event().note, COMMENT_TAG, ">")
            this.needIterateList = this.needIterateList || false
    
        }else{
            this.needIterateList = true
        }
    }
}

Game_Event.prototype.needCheckForBalloonPosition = function(){
    return this.balloonX() === 0 && this.balloonY() === 0
}

Alias.Game_Event_onListIteration = Game_Event.prototype.onListIteration
Game_Event.prototype.onListIteration = function(index){
    const aliasIndex = Alias.Game_Event_onListIteration.call(this, index)
    this.findBalloonPositionComment(aliasIndex)

    return aliasIndex
}

Game_Event.prototype.findBalloonPositionComment = function(index){
    const cmd = this.list()[index]

    if(this.commandHasBalloonPositionComment(cmd, COMMENT_TAG)){
        this.setBalloonPositionByString(cmd.parameters[0], COMMENT_TAG, ">")
    }
}

Game_Event.prototype.commandHasBalloonPositionComment = function(cmd, balloonComment){
    return  cmd && (cmd.code === 108 || cmd.code === 408) && 
            cmd.parameters[0].toLowerCase().includes(balloonComment)
}

}

/* ---------------------------- SPRITE CHARACTER ---------------------------- */
{

Alias.Sprite_Character_updateBalloon = Sprite_Character.prototype.updateBalloon
Sprite_Character.prototype.updateBalloon = function() {
    Alias.Sprite_Character_updateBalloon.call(this)
    this.updateBallonPosition()
}

Sprite_Character.prototype.updateBallonPosition = function(){
    if (this._balloonSprite) {
        this._balloonSprite.x += this.balloonX()
        this._balloonSprite.y += this.balloonY()
    }
}

Sprite_Character.prototype.balloonX = function(){
    return this._character.balloonX()
}

Sprite_Character.prototype.balloonY = function(){
    return this._character.balloonY()
}

}

}