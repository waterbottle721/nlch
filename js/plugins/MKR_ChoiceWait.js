//=============================================================================
// MKR_ChoiceWait.js
//=============================================================================
// Copyright (c) 2016 mankind
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.4 2016/11/26 Fixed a bug where the second choice would be the first choice
//
// 1.0.3 2016/11/26 Fixed a bug that some options cannot be selected with keyboard.
//
// 1.0.2 2016/11/23 Bug fixes
//
// 1.0.1 2016/11/23 Plugin command added, to enable / disable this function
//
// 1.0.0 2016/11/23 First released
// ----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//=============================================================================

/*:
 *
 * @plugindesc (v 1.0.4) Adds a delay when choice display
 * @author mankind
 *
 * @help
 * When choice are displayed with a delay until the default choice is selected.
 * Delays are specified by number of frames. Default: 60 frames (1 second)
 *
 * Instructions:
 * When a selection operation with the direction key occurs-
 * Default choice is immediately selected. Delay can be changed with parameter.
 *
 *
 * Plugin command:
 *   ChoiceWait ON
 *     ・Enables the function of this plugin.
 *       (Enabled by default)
 *
 *   ChoiceWait OFF
 *     ・Disables this plugin function.
 *
 *
 * Script call:
 *   None
 *
 *
 * Info：
 *   ・Note box setting regarding this plugin, plug-in command / parameter,
 *     Control characters are not case sensitive.
 *
 *   ・In the description of parameters- marked [Variable Allowed] can use \v[n],
 *    which is a control character that represents a variable for the setting value.
 *
 *   ・In the description of parameters- marked [Switchable] can use the control character \s[n],
 *    that represents the switch as the setting value.
 *
 *
 * Terms of Use:
 *   ・It's possible modify and redistribute this plugin without author's permission.
 *     (However please include copyright part of the header.)
 *
 *   ・There are no usage restrictions (free game, commercial game, R-18 work etc.).
 *     Please use it freely.
 *
 *   ・The author is not responsible for problems caused by using this plugin.
 *
 *
 * @param Choice_Wait
 * @desc [Variable] The number of frames before the default choice is selected. (60 frames = 1 second)
 * @default 60
 *
*/
(function () {
    'use strict';
    var PN = "MKR_ChoiceWait";

    var CheckParam = function(type, param, def, min, max) {
        var Parameters, regExp, value;
        Parameters = PluginManager.parameters(PN);

        if(arguments.length < 4) {
            min = -Infinity;
            max = Infinity;
        }
        if(arguments.length < 5) {
            max = Infinity;
        }
        if(param in Parameters) {
            value = String(Parameters[param]);
        } else {
            throw new Error("[CheckParam] Missing parameters: " + param);
        }

        value = value.replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');

        regExp = /^\x1bV\[\d+\]$/i;
        if(!regExp.test(value)) {
            switch(type) {
                case "num":
                    if(value == "") {
                        value = (isFinite(def))? parseInt(def, 10) : 0;
                    } else {
                        value = (isFinite(value))? parseInt(value, 10) : (isFinite(def))? parseInt(def, 10) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                default:
                    throw new Error("[CheckParam] " + param + "Invalid type: " + type);
                    break;
            }
        }

        return [value, type, def, min, max, param];
    }

    var CEC = function(params) {
        var text, value, type, def, min, max, param;
        type = params[1];
        text = String(params[0]);
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        type = params[1];
        def = params[2];
        min = params[3];
        max = params[4];
        param = params[5];

        text = convertEscapeCharacters(text)

        switch(type) {
            case "num":
                value = (isFinite(text))? parseInt(text, 10) : (isFinite(def))? parseInt(def, 10) : 0;
                value = value.clamp(min, max);
                break;
            default:
                throw new Error("[CEC] " + param + "Invalid type: " + type);
                break;
        }

        return value;
    };

    var convertEscapeCharacters = function(text) {
        var windowChild;

        if(typeof text == "string") {
            if(SceneManager._scene) {
                windowChild = SceneManager._scene._windowLayer.children[0];
                text = windowChild ? windowChild.convertEscapeCharacters(text) : text;
            } else {
                text = ConvVb(text);
            }
        }

        return text;
    };

    var ConvVb = function(text) {
        var num;

        if(typeof text == "string") {
            text = text.replace(/\x1bV\[(\d+)\]/i, function() {
                num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            }.bind(this));
            text = text.replace(/\x1bV\[(\d+)\]/i, function() {
                num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            }.bind(this));
        }

        return text;
    }

    var Choice_Wait;
    Choice_Wait = CheckParam("num", "Choice_Wait", 60, 0);


    //=========================================================================
    // Game_Interpreter
    //  ・Define default choice weight control plugin command
    //=========================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === "choicewait") {
            switch (args[0].toLowerCase()) {
                case "on":// Function enabled
                    $gameSystem.onChoiceWait();
                    break;
                case "off":// Function enabled
                    $gameSystem.offChoiceWait();
                    break;
            }
        }
    };


    //=========================================================================
    // Game_System
    //  ・Define default choice wait control
    //=========================================================================
    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(){
        _Game_System_initialize.call(this);
        this._choiceWait = true;
    };

    Game_System.prototype.onChoiceWait = function(choiceWait) {
        if(!this.isChoiceWait()) {
            this._choiceWait = true;
        }
    };

    Game_System.prototype.offChoiceWait = function(choiceWait) {
        if(this.isChoiceWait()) {
            this._choiceWait = false;
        }
    };

    Game_System.prototype.isChoiceWait = function() {
        if('_choiceWait' in this) {
            return this._choiceWait;
        } else {
            return true;
        }
    };


    //=========================================================================
    // Window_ChoiceList
    //  ・Extends functionality of the choice display window.
    //
    //=========================================================================
    var _Window_ChoiceList_start = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function() {
        _Window_ChoiceList_start.call(this);

        if($gameSystem.isChoiceWait()) {
            this.select(-1);
        }
    };

    Window_ChoiceList.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);

        var waitCount = CEC(Choice_Wait);

        if(this.isOpen() && $gameSystem.isChoiceWait()) {
            if(this._index == -1 && this._stayCount >= waitCount) {
                this.selectDefault();
            }
        }
    };

    Window_ChoiceList.prototype.cursorUp = function(wrap) {
        var index, maxItems, maxCols;
        index = this.index();
        maxItems = this.maxItems();
        maxCols = this.maxCols();

        if($gameSystem.isChoiceWait()) {
            if (index >= maxCols || (wrap && maxCols === 1)) {
                if(index == -1) {
                    if($gameMessage.choiceDefaultType() > -1) {
                        this.selectDefault();
                    } else {
                        this.select(0);
                    }
                } else {
                    this.select((index - maxCols + maxItems) % maxItems);
                }
            }
        } else {
            Window_Selectable.prototype.cursorUp.call(this, wrap);
        }
    };

    Window_ChoiceList.prototype.cursorDown = function(wrap) {
        var index, maxItems, maxCols;
        index = this.index();
        maxItems = this.maxItems();
        maxCols = this.maxCols();

        if($gameSystem.isChoiceWait()) {
            if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
                if(index == -1) {
                    if($gameMessage.choiceDefaultType() > -1) {
                        this.selectDefault();
                    } else {
                        this.select(0);
                    }
                } else {
                    this.select((index + maxCols) % maxItems);
                }
            }
        } else {
            Window_Selectable.prototype.cursorDown.call(this, wrap);
        }
    };

})();