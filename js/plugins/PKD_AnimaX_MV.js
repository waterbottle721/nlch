/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 */

 // * CHANGELOG ===================
 //
 // v1.0 (20.03.2021)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.0)[BASIC] Characters animations system
 * @author Pheonix KageDesu
 * @target MV
 * @url http://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 *
 * Detailed guide: http://kdworkshop.net/animax-plugin-guide/
 * (!better read guid and download Demo, it's not simple to use plugin)
 *
 * Plugin working directory: img\charactersAA\
 *
 * Add animations for characers in Plugin Parameters
 *
 * === Animations:
 *
 * For Actor, add Note: <xAnima:NAME>
 * For equipments (weapons), add Note: <xAnimaSet:NAME>
 * For event, add Comment: XA:NAME
 * 
 * === Extra layers:
 *
 * For equipments (weapons), add Note:
 * <xAnimaLayer:NAME>
 * <xAnimaLayerRelative:NAME>
 *
 * ===
 * Alpha ABS Z should be Below this plugin in Plugin Manager
 *
 * === Plugin have Plugin Commands
 *
 * ---------------------------------------------------------------------------
 Plugin commands:- ChangePlayerAnimationSet NAME       Where NAME - animation settings from Animations List plugin parameter- ResetPlayerAnimationSet       Where NAME - animation settings from Animations List plugin parameter       Example: StartLockpicking 1- PlayAnimationAction ACTION_NAME CHAR_ID IS_LOOP IS_WAIT       Where ACTION_NAME - animation action name       (should be defined for character current animation)       CHAR_ID - 0 for player, -1 for this event or number = event ID       IS_LOOP - true of false       IS_WAIT - true of false       (wait until animation is end before next event command)- StopAnimationAction CHAR_ID- AddAnimaLayer CHAR_ID LAYER_NAME IS_RELATIVE- RemoveAnimaLayer CHAR_ID LAYER_NAME- ClearAnimaLayers CHAR_IDSee guide on my site for better understanding plugin commands
  * This is BASIC plugin version and have some restrictions: *    - You can add only 3 extra layers per character *    - You can define only 3 actions for animation *    - Diagonal animation not supported (DL, DR, UR, UL frames) *    - Plugin usage allowed only in Non-Commercial project *  *  PRO version of plugin don't have this restrictions!
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * 

 * @param xAnimations:structA
 * @text Animations List
 * @type struct<LAnimaX>[]
 * @default []
 * @desc XAnima System Animations List
 * 
 * @param xAnimaParts:structA
 * @text Animation Layers List
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc XAnima System animation layers list
 * 


 */
/*~struct~LAnimaXPart:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for layer (also folder Name)
  
 * @param isLowerBodyPart:b
 * @text Is Lower Body Layer?
 * @type boolean
 * @default false
 * @desc If true - this layer will be half transparent when character in bushes
 
 * @param sortingLevel:i
 * @text Sorting order
 * @type number
 * @default 0
 * @min -100
 * @desc Layer sorting order
 *
 * @param layerRule:struct
 * @text Layer Settings
 * @type struct<LAnimaXPartDirLevel>
 * @default {"noDir:b":"false","dirD:b":"false","dirL:b":"false","dirR:b":"false","dirU:b":"false","8wayGroup":"","dirDL:b":"false","dirDR:b":"false","dirUR:b":"false","dirUL:b":"false"}
 * @desc Setting of layer direciton sprites positions
 *
 * @param baseRule:struct
 * @text Base Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Default animation layer settings. Using for all action without own rules

 * @param moveRule:struct
 * @text Move Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for moving

 * @param idleRule:struct
 * @text Idle Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for idle

 * @param actionRules:structA
 * @text Actions Rules
 * @type struct<LAnimaXPartActionRule>[]
 * @default []
 * @desc [Optional] Animation layer settings for actions
*/

/*~struct~LAnimaXPartActionRule:

 * @param actionName
 * @text Action Name
 * @default
 * @desc Name of action that rules for

 * @param fileName
 * @text Extra File Name
 * @default 
 * @desc Filename for this action, leave empty to use filename same as Action Name

 * @param enabled:b
 * @text Is Enabled?
 * @type boolean
 * @default true
 * @desc If false - this layer will hide completly when this action is playing

 * @param actionRule:struct
 * @text Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Layer settings only for this action

*/

/*~struct~LAnimaXPartDefRule:

 * @param isHaveDirections:b
 * @text Is change direction?
 * @type boolean
 * @default true
 * @desc Layer have direction related sprites _D, _U, _R, _L ?
 
 * @param isHaveFrames:b
 * @text Is have frames?
 * @type boolean
 * @default true
 * @desc If false - layer have only one frame (0 - zero), if true - layer have same frame count as parent animation

*/

/*~struct~LAnimaXPartDirLevel:

 * @param noDir:b
 * @text Default
 * @type boolean
 * @on Below
 * @off Above
 * @default false
 * @desc Is layer sprite with no directions will be below character sprite?

 * @param dirD:b
 * @text Down (_D)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down direction sprites will be below character sprite?

 * @param dirL:b
 * @text Left (_L)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left direction sprites will be below character sprite?

 * @param dirR:b
 * @text Right (_R)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Right direction sprites will be below character sprite?

 * @param dirU:b
 * @text Up (_U)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up direction sprites will be below character sprite?

 * @param 8wayGroup
 * @text Diagonal Settings

 * @param dirDL:b
 * @parent 8wayGroup
 * @text Down Left (_DL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down Left direction sprites will be below character sprite?

 * @param dirDR:b
 * @parent 8wayGroup
 * @text Down Right (_DR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left Right direction sprites will be below character sprite?

 * @param dirUR:b
 * @parent 8wayGroup
 * @text Up Right (_UR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Right direction sprites will be below character sprite?

 * @param dirUL:b
 * @parent 8wayGroup
 * @text Up Left (_UL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Left direction sprites will be below character sprite?

*/

/*~struct~LAnimaX:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for animation (also folder Name)
 * 
 * @param base:s
 * @text Base
 * @type struct<LAnimaXSet>
 * @default
 * @desc Base animation set (for movement)
 * 
 * @param ABSZe
 * @text AABS Z
 * @default Only for Alpha ABS Z
 *
 * @param inBattle:s
 * @parent ABSZe
 * @text In Battle
 * @type struct<LAnimaXSet>
 * @default
 * @desc Battle state animation set
 * 
 * @param dead:s
 * @parent ABSZe
 * @text Dead
 * @type struct<LAnimaXSet>
 * @default
 * @desc Dead state animation set
 *
 * @param actions:structA
 * @text Actions
 * @type struct<LAnimaXAction>[]
 * @default []
 * @desc Actions List
*/
/*~struct~LAnimaXSet:
 * @param move:s
 * @text Movement
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Movement animation settings
 * 
 * @param idle:s
 * @text Idle
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Idle animation settings
 * 
 * @param moveToIdleDelay:i
 * @text Idle Delay
 * @type number
 * @default 30
 * @min 0
 * @desc Speed of change from movement to idle when character is not moving
*/
/*~struct~LAnimaXAction:
 * @param name
 * @text Action Name
 * @default Action
 * @desc Name for aciton
 * 
 * @param animation:s
 * @text Settings
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Action animation settings
*/
/*~struct~LAnimaXParameters:
 * @param isOneDirection:b
 * @text One Direction?
 * @type boolean
 * @default false
 * @desc Animation will use only one direciton (without _D, _L, _R, _U frames)
 * 
 * @param frames:i
 * @text Frames Count
 * @type number
 * @default 3
 * @min 1
 * @desc Frames count
 * 
 * @param speed:i
 * @text Speed
 * @type number
 * @default 15
 * @min 1
 * @desc Frames change speed in frames
 * 
 * @param expandFirstFrame:i
 * @text Repeat first frame times
 * @type number
 * @default 0
 * @min 0
 * @max 100
 * @desc Times to repeat first frame (make only first frame dalayed)
 * 
 * @param is8Way:b
 * @text Is Support Diagonal?
 * @type boolean
 * @default false
 * @desc Animatin support 8 way diagonal movement, require _DL, _DR, _UL, _UR frames images
 * 
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Animation offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Animation offset by Y coordinate
*/
var Imported = Imported || {};
Imported.PKD_AnimaX = true;

var PKD_ANIMAX = {};
PKD_ANIMAX.version = 100; // 1.0.0

// Generated by CoffeeScript 2.3.0
// * Классы и методы из KDCore
PKD_ANIMAX.isMV = function() {
  return Utils.RPGMAKER_NAME.contains("MV");
};

// * Utils =========================================================
PKD_ANIMAX.getEventCommentValue = function(commentCode, list) {
  var comment, e, i, item;
  try {
    if (list && list.length > 1) {
      i = 0;
      while (i < list.length) {
        item = list[i++];
        if (!item) {
          continue;
        }
        if (item.code === 108) {
          comment = item.parameters[0];
          if (comment.contains(commentCode)) {
            return comment;
          }
        }
      }
    }
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return null;
};

PKD_ANIMAX.hasMeta = function(symbol, obj) {
  return (obj.meta != null) && (obj.meta[symbol] != null);
};

PKD_ANIMAX.getValueFromMeta = function(symbol, obj) {
  if (!PKD_ANIMAX.hasMeta(symbol, obj)) {
    return null;
  }
  return obj.meta[symbol];
};

// * Array ========================================================
Array.prototype.delete = function() {
  var L, a, ax, what;
  what = void 0;
  a = arguments;
  L = a.length;
  ax = void 0;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

// * String ========================================================
String.prototype.isEmpty = function() {
  return this.length === 0 || !this.trim();
};

String.isNullOrEmpty = function(str) {
  return (str == null) || str.isEmpty();
};

String.any = function(str) {
  return !String.isNullOrEmpty(str);
};

// * ParametersManager
//------------------------------------------------------------------------------
PluginManager.getPluginParametersByRoot = function(rootName) {
  var pluginParameters, property;
  for (property in this._parameters) {
    if (this._parameters.hasOwnProperty(property)) {
      pluginParameters = this._parameters[property];
      if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
        return pluginParameters;
      }
    }
  }
  return PluginManager.parameters(rootName);
};

PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
  return pluginParameters[key] != null;
};

//! Нету обработки цвета
//@[AUTO EXTEND]
PKD_ANIMAX.ParamLoader = class ParamLoader {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
    this.params = this.parseParameters(this.paramsRaw);
  }

  parseParameters(paramSet) {
    var clearKey, key, params, typeKey, value;
    params = {};
    for (key in paramSet) {
      value = paramSet[key];
      clearKey = this.parseKey(key);
      typeKey = this.parseKeyType(key);
      params[clearKey] = this.parseParamItem(typeKey, value);
    }
    return params;
  }

  parseKey(keyRaw) {
    return keyRaw.split(":")[0];
  }

  parseKeyType(keyRaw) {
    return keyRaw.split(":")[1];
  }

  // * Проверка, загружены ли параметры плагина
  isLoaded() {
    return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
  }

  // * Имя параметра без ключа
  isHasParameter(paramName) {
    return this.params[paramName] != null;
  }

  
  // * Возвращает значение параметра (def - по умолчанию, если не найден)
  getParam(paramName, def) {
    if (this.isHasParameter(paramName)) {
      return this.params[paramName];
    } else {
      return def;
    }
  }

  // * Данные ключи должны идти после названия параметра через :
  // * Пример: @param ShowDelay:int, @param TestBool:bool
  // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
  parseParamItem(type, item) {
    var e;
    if (type == null) {
      return item;
    }
    try {
      switch (type) {
        case "int":
        case "i":
          return parseInt(item);
        case "intA": // * массив чисел
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("int", e);
            });
          } else {
            return [];
          }
          break;
        case "bool":
        case "b":
        case "e":
          return eval(item);
        case "struct":
        case "s":
          if (String.any(item)) {
            return this.parseParameters(JsonEx.parse(item));
          } else {
            return null;
          }
          break;
        case "structA": // * массив структур
          return JsonEx.parse(item).map((e) => {
            return this.parseParameters(JsonEx.parse(e));
          });
        case "str":
          return item;
        case "strA":
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("str", e);
            });
          } else {
            return [];
          }
          break;
        case "note": // * если несколько строк в тексте
          return JsonEx.parse(item);
        default:
          return item;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return item;
    }
  }

};

// Generated by CoffeeScript 2.5.1
// * Классы и методы из KDCore
PKD_ANIMAX.isMV = function() {
  return Utils.RPGMAKER_NAME.contains("MV");
};

// * Utils =========================================================
PKD_ANIMAX.getEventCommentValue = function(commentCode, list) {
  var comment, e, i, item;
  try {
    if (list && list.length > 1) {
      i = 0;
      while (i < list.length) {
        item = list[i++];
        if (!item) {
          continue;
        }
        if (item.code === 108) {
          comment = item.parameters[0];
          if (comment.contains(commentCode)) {
            return comment;
          }
        }
      }
    }
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return null;
};

PKD_ANIMAX.hasMeta = function(symbol, obj) {
  return (obj.meta != null) && (obj.meta[symbol] != null);
};

PKD_ANIMAX.getValueFromMeta = function(symbol, obj) {
  if (!PKD_ANIMAX.hasMeta(symbol, obj)) {
    return null;
  }
  return obj.meta[symbol];
};

// * Array ========================================================
Array.prototype.delete = function() {
  var L, a, ax, what;
  what = void 0;
  a = arguments;
  L = a.length;
  ax = void 0;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

// * String ========================================================
String.prototype.isEmpty = function() {
  return this.length === 0 || !this.trim();
};

String.isNullOrEmpty = function(str) {
  return (str == null) || str.isEmpty();
};

String.any = function(str) {
  return !String.isNullOrEmpty(str);
};

// * ParametersManager
//------------------------------------------------------------------------------
PluginManager.getPluginParametersByRoot = function(rootName) {
  var pluginParameters, property;
  for (property in this._parameters) {
    if (this._parameters.hasOwnProperty(property)) {
      pluginParameters = this._parameters[property];
      if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
        return pluginParameters;
      }
    }
  }
  return PluginManager.parameters(rootName);
};

PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
  return pluginParameters[key] != null;
};

//! Нету обработки цвета
//@[AUTO EXTEND]
PKD_ANIMAX.ParamLoader = class ParamLoader {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
    this.params = this.parseParameters(this.paramsRaw);
  }

  parseParameters(paramSet) {
    var clearKey, key, params, typeKey, value;
    params = {};
    for (key in paramSet) {
      value = paramSet[key];
      clearKey = this.parseKey(key);
      typeKey = this.parseKeyType(key);
      params[clearKey] = this.parseParamItem(typeKey, value);
    }
    return params;
  }

  parseKey(keyRaw) {
    return keyRaw.split(":")[0];
  }

  parseKeyType(keyRaw) {
    return keyRaw.split(":")[1];
  }

  // * Проверка, загружены ли параметры плагина
  isLoaded() {
    return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
  }

  // * Имя параметра без ключа
  isHasParameter(paramName) {
    return this.params[paramName] != null;
  }

  
    // * Возвращает значение параметра (def - по умолчанию, если не найден)
  getParam(paramName, def) {
    if (this.isHasParameter(paramName)) {
      return this.params[paramName];
    } else {
      return def;
    }
  }

  // * Данные ключи должны идти после названия параметра через :
  // * Пример: @param ShowDelay:int, @param TestBool:bool
  // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
  parseParamItem(type, item) {
    var e;
    if (type == null) {
      return item;
    }
    try {
      switch (type) {
        case "int":
        case "i":
          return parseInt(item);
        case "intA": // * массив чисел
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("int", e);
            });
          } else {
            return [];
          }
          break;
        case "bool":
        case "b":
        case "e":
          return eval(item);
        case "struct":
        case "s":
          if (String.any(item)) {
            return this.parseParameters(JsonEx.parse(item));
          } else {
            return null;
          }
          break;
        case "structA": // * массив структур
          return JsonEx.parse(item).map((e) => {
            return this.parseParameters(JsonEx.parse(e));
          });
        case "str":
          return item;
        case "strA":
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("str", e);
            });
          } else {
            return [];
          }
          break;
        case "note": // * если несколько строк в тексте
          return JsonEx.parse(item);
        default:
          return item;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return item;
    }
  }

};

// Generated by CoffeeScript 2.5.1
PKD_ANIMAX.LoadPluginSettings = function() {
  var a, animList, i, len, partsList;
  PKD_ANIMAX.Params = new PKD_ANIMAX.ParamLoader("xAnimations:structA");
  animList = PKD_ANIMAX.Params.getParam("xAnimations", []);
  for (i = 0, len = animList.length; i < len; i++) {
    a = animList[i];
    a.actions = XAnimaTools.convertActionsFromParameters(a.actions);
  }
  PKD_ANIMAX.Animations = animList;
  partsList = PKD_ANIMAX.Params.getParam("xAnimaParts", []);
  PKD_ANIMAX.AnimationParts = partsList;
  PKD_ANIMAX.RegisterPluginCommnads();
};

PKD_ANIMAX.RegisterPluginCommnads = () => {

    //@[ALIAS]
    var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand_3434.call(this, command, args);
        if (command === 'ChangePlayerAnimationSet') {
            try {
                let animSetId = args[0];
                if(String.any(animSetId)) {
                    PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet(animSetId);
                }
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ResetPlayerAnimationSet') {
            try {
                PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet(null);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'PlayAnimationAction') {
            try {
                let actionName = args[0];
                let charaId = parseInt(args[1]);
                let isLoop = eval(args[2]);
                let isWait = eval(args[3]);
                PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'StopAnimationAction') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'AddAnimaLayer') {
            try {
                let charaId = parseInt(args[0]);
                let layerName = args[1];
                let isRelative = eval(args[2]);
                PKD_ANIMAX.PluginCommand_AddPart(charaId, layerName, isRelative);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'RemoveAnimaLayer') {
            try {
                let charaId = parseInt(args[0]);
                let layerName = args[1];
                PKD_ANIMAX.PluginCommand_RemovePart(charaId, layerName);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ClearAnimaLayers') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_ClearParts(charaId);
            } catch (e) {
                console.warn(e);
            }
        }
    };


};
(function () {

    PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet = (animationSetName) => {
        try {
            $gamePlayer.setExternalAnimaX(animationSetName);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_PlayAnimationAction = (actionName, charaId, isLoop, isWait) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                if(!String.any(actionName)) {
                    char.resetXAnima();
                } else {
                    if(char.startAnimaXCustomAction(actionName, isLoop, isWait)) {
                        if(isWait == true && isLoop == false) {
                            PKD_ANIMAX.SetInterpreterToWait(char);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_StopAnimationAction = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.resetXAnima();
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_AddPart = (charaId, partId, isRelative) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.addNewXAnimPart(partId, isRelative);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_RemovePart = (charaId, partId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.removeXAnimPart(partId);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_ClearParts = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.clearXAnimParts();
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.GetProperCharacter = (charId) => {
        var char = null;
        try {
            if (!charId || charId == 0) {
                char = $gamePlayer;
            } else if (charId < 0) {
                let int = $gameMap._interpreter;
                charId = int.eventId();
                if (charId > 0) {
                    char = $gameMap.event(charId);
                } else {
                    return null;
                }
            } else {
                char = $gameMap.event(charId);
            }
            if (!char) return null;
            if (!char.isAnimX()) return null;
            return char;
        } catch (e) {
            console.warn(e, "Can't find character with ID " + charId + " for PlayAnimationAction");
        }
    };

    PKD_ANIMAX.SetInterpreterToWait = (char) => {
        let int = $gameMap._interpreter;
        int.xAnimaTarget = char;
        int._waitMode = 'xAnima';
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    PKD_ANIMAX.LoadPluginSettings();
    return ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    // * Слои которые надо снять, после обновления экипировки
    this.axPreviousLayers = [];
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    this.refreshAnimaXLayers();
    this.requestRefreshAnimaX();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  _.requestRefreshAnimaX = function() {
    return this._isNeedAnimaXRefresh = true;
  };
  _.isNeedAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh === true;
  };
  _.onAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh = null;
  };
  _.getAnimaXEquipmentSet = function() {
    var e, equipSet, i, len, ref;
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipSet = PKD_ANIMAX.getValueFromMeta('xAnimaSet', e);
      if (String.any(equipSet)) {
        return equipSet;
      }
    }
    return null;
  };
  // * Чтобы не удалялись части, которые добавленны параметром плагина
  // * используется массив axPreviousLayers, в котором храняться части
  // * которые были в прошлый раз, но в этот их уже нету - т.е. их надо удалить
  _.refreshAnimaXLayers = function() {
    var e, equipLayer, i, len, ref;
    this.axPreviousLayers = [...this.axLayersByEquips, ...this.axLayersByEquipsRelative];
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipLayer = PKD_ANIMAX.getValueFromMeta('xAnimaLayer', e);
      this._registerLayerByEquip(equipLayer, false);
      equipLayer = PKD_ANIMAX.getValueFromMeta('xAnimaLayerRelative', e);
      this._registerLayerByEquip(equipLayer, true);
    }
  };
  _._registerLayerByEquip = function(name, isRelative) {
    if (!String.any(name)) {
      return;
    }
    this.axPreviousLayers.delete(name);
    if (isRelative === true) {
      this.axLayersByEquipsRelative.push(name);
    } else {
      this.axLayersByEquips.push(name);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x16bc=['IkZgr','UMwwQ','push','addNewXAnimPart','_setAnimaXToMovement','isLoop','isHaveAnimaXState','Pkzpl','186214AiGGFa','getCurrentAnimX','clearXAnimParts','jlhmZ','moveSet','isAnimXPartsChanged','createAnimaXActionSet','YhvRo','_setAnimaXToIdle','_axAvailableActionsList','isHaveIdleAnimaX','WePlg','FsUxQ','idleSet','xKAtR','CankJ','74287MIqnDN','gDrHP','_xAnimaPartsRequireRefresh','_xAnimaToIdleTimer','fwGRx','_updateMoveIdleAnimaX','VxSgo','moveToIdleDelay','isAction','resetXAnimaState','onAnimaXActionEnd','onAnimaXActionStart','_getAnimaXMoveToIdleDelay','createXAnimaSetForMove','isInMovementAnimaX','isMoving','isInIdleAnimaX','iNoGF','_axPreloadedActions','LimxT','_axState','resetXAnima','neNXX','JKcOS','contains','flopk','oHZbC','_createXAnimaSetsForState','dZOPJ','299351urqmHL','KEPaL','HoZFn','_createAnimaXSetFromParams','createXAnimaSetForIdle','deTkt','registerAnimaXAction','createXAnimaPart','7DOhGLm','tslGV','isInAnimXAction','fhelK','406539ptyQoH','waitActionEnd','ZUMLu','qKTrg','clearAnimaX','startAnimaXCustomAction','gTWpa','qfNsA','_axCurrent','isShouldWaitAnimaXAction','animaXParts','487232AxMATr','FRKxt','_updateAnimXRefresh','base','warn','switchToXAnimaState','jtTJT','_isHaveAnimaX','lvSgp','DYKKb','jJvLj','MeqvD','IvaWc','_axId','startAnimaXAction','getPreloadAnimaXActionSet','isAnimX','_axMovement','_axIdle','_inAnimXAction','preLoad','_axStates','registerAnimaXState','SrSyV','111749nGpddY','getXAnimaParamsForAction','ZELNU','RBRyY','isWait','_initMembersAnimaX','move','513531JoEDIm','_updateMovingAnimX','KeKWl','onAnimXPartsRefreshed','initAnimaX','INnXt','animXId'];var a0_0x230e=function(_0x14bb85,_0xb8d318){_0x14bb85=_0x14bb85-0x173;var _0x16bc39=a0_0x16bc[_0x14bb85];return _0x16bc39;};(function(_0x18e0bc,_0x2ebf82){var _0x4be9a6=a0_0x230e;while(!![]){try{var _0x15f33f=-parseInt(_0x4be9a6(0x1cc))+-parseInt(_0x4be9a6(0x179))+-parseInt(_0x4be9a6(0x198))*-parseInt(_0x4be9a6(0x1bd))+parseInt(_0x4be9a6(0x1c1))+parseInt(_0x4be9a6(0x1b5))+-parseInt(_0x4be9a6(0x1e4))+parseInt(_0x4be9a6(0x188));if(_0x15f33f===_0x2ebf82)break;else _0x18e0bc['push'](_0x18e0bc['shift']());}catch(_0x427c56){_0x18e0bc['push'](_0x18e0bc['shift']());}}}(a0_0x16bc,0x49251),function(){var _0x38db50;_0x38db50=Game_Character['prototype'],function(){var _0x31536a=a0_0x230e;if(_0x31536a(0x1ae)!=='oXqYq')_0x38db50['isAnimX']=function(){var _0x490b60=_0x31536a;if('RBRyY'===_0x490b60(0x175))return this[_0x490b60(0x1d3)]===!![];else{function _0x13984d(){var _0x2ae01a=_0x490b60;this[_0x2ae01a(0x1ad)](),this[_0x2ae01a(0x1d3)]=![],this[_0x2ae01a(0x17d)](null,null);}}},_0x38db50[_0x31536a(0x17f)]=function(){var _0x183e84=_0x31536a;return this[_0x183e84(0x1d9)];},_0x38db50[_0x31536a(0x192)]=function(){var _0x2cec69=_0x31536a;return this[_0x2cec69(0x1de)]()!=null;},_0x38db50[_0x31536a(0x186)]=function(_0xd4db6f){var _0x4d7952=_0x31536a;return this[_0x4d7952(0x1e1)][_0xd4db6f]!=null;},_0x38db50[_0x31536a(0x1bf)]=function(){var _0x52adb0=_0x31536a;return this[_0x52adb0(0x1dc)]()&&this['getCurrentAnimX']()[_0x52adb0(0x1a0)]();},_0x38db50[_0x31536a(0x1a6)]=function(){var _0x2d2bad=_0x31536a;if(_0x2d2bad(0x1ba)!==_0x2d2bad(0x1d5))return this[_0x2d2bad(0x1c9)]===this[_0x2d2bad(0x1dd)]();else{function _0x554377(){var _0x1c0f71=_0x2d2bad;this[_0x1c0f71(0x1ac)]='base',!this[_0x1c0f71(0x1bf)]()&&this[_0x1c0f71(0x1ad)]();}}},_0x38db50[_0x31536a(0x1a8)]=function(){var _0x317ce5=_0x31536a;return this[_0x317ce5(0x1c9)]===this[_0x317ce5(0x1de)]();},_0x38db50[_0x31536a(0x1a3)]=function(){var _0x234909=_0x31536a;if(_0x234909(0x1a9)!==_0x234909(0x199))return this['_xAnimaToIdleTimer']=0x0;else{function _0x24f59b(){var _0x47a140=_0x234909;return this[_0x47a140(0x1d9)];}}},_0x38db50[_0x31536a(0x1a2)]=function(){var _0x37e1f4=_0x31536a;if(_0x37e1f4(0x1d6)!==_0x37e1f4(0x1d6)){function _0x11c122(){var _0xbaf795=_0x37e1f4;this[_0xbaf795(0x1e1)][_0xd313c3]={},_0x46465f['preLoad'](),this[_0xbaf795(0x1e1)][_0x4e0e01][_0xbaf795(0x18c)]=_0x3757a0,_0x43cac0!=null?(_0x4eb135[_0xbaf795(0x185)]=!![],_0x5acbe6['preLoad'](),this[_0xbaf795(0x1e1)][_0x3d6c65][_0xbaf795(0x195)]=_0x58c97a):this[_0xbaf795(0x1e1)][_0x374132][_0xbaf795(0x195)]=null;}}else return this['resetXAnima']();},_0x38db50['isShouldWaitAnimaXAction']=function(){var _0x2edfd2=_0x31536a,_0x13e376;if(this['isInMovementAnimaX']()){if('oHZbC'!==_0x2edfd2(0x1b2)){function _0x4b8d67(){var _0x208023=_0x2edfd2;_0x26d17e!=null&&(_0x2d3851=_0x581cb3[_0x208023(0x1b9)](this[_0x208023(0x17f)](),_0x55b241,_0x1fdc6c));}}else return![];}if(!this['isInAnimXAction']()){if(_0x2edfd2(0x197)!==_0x2edfd2(0x17e))return![];else{function _0x3ecda5(){var _0x4caec3=_0x2edfd2;this['_axStates'][_0x2794dd][_0x4caec3(0x195)]=null;}}}return _0x13e376=this[_0x2edfd2(0x189)](),_0x13e376[_0x2edfd2(0x1a0)]()&&_0x13e376[_0x2edfd2(0x176)]();},_0x38db50['isHaveAnimaXActionWithName']=function(_0x46936d){var _0x3a2065=_0x31536a;return this[_0x3a2065(0x191)][_0x3a2065(0x1b0)](_0x46936d);},_0x38db50[_0x31536a(0x189)]=function(){var _0x3dc935=_0x31536a;return this[_0x3dc935(0x1c9)];},_0x38db50[_0x31536a(0x1da)]=function(_0x56e9d2){var _0x2e276b=_0x31536a;return this[_0x2e276b(0x1c9)]=_0x56e9d2;},_0x38db50[_0x31536a(0x1d1)]=function(_0x3b4d5c){var _0x3774cf=_0x31536a;if(this[_0x3774cf(0x186)](_0x3b4d5c))this[_0x3774cf(0x1ac)]=_0x3b4d5c,!this[_0x3774cf(0x1bf)]()&&this[_0x3774cf(0x1ad)]();else{if(_0x3774cf(0x1c3)!==_0x3774cf(0x1c3)){function _0x38618e(){var _0x5e7482=_0x3774cf;return this[_0x5e7482(0x19d)]();}}else this[_0x3774cf(0x1a1)]();}},_0x38db50[_0x31536a(0x17d)]=function(_0x23ba7f,_0x5cc26f){var _0x3daa12=_0x31536a;this[_0x3daa12(0x1d9)]=_0x23ba7f,this['clearXAnimParts'](),this[_0x3daa12(0x191)]=[],this['_axPreloadedActions']={},this[_0x3daa12(0x1e1)]={},this[_0x3daa12(0x1ac)]=_0x3daa12(0x1cf),this[_0x3daa12(0x1e2)](this[_0x3daa12(0x1ac)],_0x5cc26f);if(this[_0x3daa12(0x1e1)][this[_0x3daa12(0x1ac)]]==null)return;this[_0x3daa12(0x1ad)](),this['_isHaveAnimaX']=!![];},_0x38db50[_0x31536a(0x1e2)]=function(_0xa8b1e7,_0x5eaa95){var _0x97566f=_0x31536a;if(_0x97566f(0x19c)==='wSSCV'){function _0x2af8bd(){var _0x981dad=_0x97566f,_0x1455c7;if(this[_0x981dad(0x1a6)]())return![];if(!this[_0x981dad(0x1bf)]())return![];return _0x1455c7=this[_0x981dad(0x189)](),_0x1455c7[_0x981dad(0x1a0)]()&&_0x1455c7[_0x981dad(0x176)]();}}else{var _0x34bff8,_0x341432,_0x58e013;try{if('kpEiG'!==_0x97566f(0x1b4)){if(_0x5eaa95==null)return;_0x58e013=this[_0x97566f(0x1b8)](0x0,_0xa8b1e7,_0x5eaa95[_0x97566f(0x178)]);if(_0x58e013==null)return;_0x58e013['preLoad'](),_0x341432=this[_0x97566f(0x1b8)](0x1,_0xa8b1e7,_0x5eaa95['idle']);if(_0x341432!=null){if(_0x97566f(0x1af)!==_0x97566f(0x196))_0x341432['preLoad']();else{function _0x1d4c0f(){var _0x11a3d3=_0x97566f;_0x5c2be4=_0x156898[_0x11a3d3(0x173)](_0x2a0175,this['animXId']()),_0x3364a9=this['createAnimaXActionSet'](_0x392e98);}}}_0x341432!=null&&_0x5eaa95[_0x97566f(0x19f)]!=null&&(_0x341432[_0x97566f(0x19f)]=_0x5eaa95[_0x97566f(0x19f)]),this[_0x97566f(0x1b3)](_0xa8b1e7,_0x58e013,_0x341432);}else{function _0x440c47(){return;}}}catch(_0x4344e5){if(_0x97566f(0x1c8)===_0x97566f(0x1c8))_0x34bff8=_0x4344e5,console[_0x97566f(0x1d0)](_0x34bff8),this['_axStates'][_0xa8b1e7]=null;else{function _0xf42919(){var _0x49e446=_0x97566f;this[_0x49e446(0x1cb)][_0x540564]=null,delete this[_0x49e446(0x1cb)][_0x5a63e4],this[_0x49e446(0x19a)]=!![];}}}}},_0x38db50[_0x31536a(0x1a1)]=function(){var _0x57d8af=_0x31536a;if('WePlg'!==_0x57d8af(0x193)){function _0x4f86de(){return this['_xAnimaPartsRequireRefresh']=![];}}else{this[_0x57d8af(0x1ac)]=_0x57d8af(0x1cf);if(!this[_0x57d8af(0x1bf)]()){if('ivVmm'===_0x57d8af(0x1b6)){function _0x7859bf(){var _0x470668=_0x57d8af;this[_0x470668(0x186)](_0xf06dd8)?(this[_0x470668(0x1ac)]=_0x22c9cb,!this[_0x470668(0x1bf)]()&&this[_0x470668(0x1ad)]()):this[_0x470668(0x1a1)]();}}else this[_0x57d8af(0x1ad)]();}}},_0x38db50[_0x31536a(0x1ad)]=function(){var _0x53503a=_0x31536a;this[_0x53503a(0x1df)]=![],this[_0x53503a(0x19b)]=0x0,this[_0x53503a(0x184)]();},_0x38db50[_0x31536a(0x1bb)]=function(_0x11dba0){var _0x501311=_0x31536a;if(_0x501311(0x1c4)===_0x501311(0x174)){function _0xa01d02(){var _0x404a89=_0x501311;this[_0x404a89(0x19b)]++;if(this[_0x404a89(0x19b)]>=this['_getAnimaXMoveToIdleDelay']())return this[_0x404a89(0x190)]();}}else return this[_0x501311(0x191)][_0x501311(0x182)](_0x11dba0);},_0x38db50[_0x31536a(0x177)]=function(){var _0x837234=_0x31536a;return this['_xAnimaPartsRequireRefresh']=![],this['_xAnimaToIdleTimer']=0x0,this[_0x837234(0x1d3)]=![];},_0x38db50[_0x31536a(0x1b3)]=function(_0x1021ec,_0x158307,_0x5678c5){var _0x2da339=_0x31536a;this[_0x2da339(0x1e1)][_0x1021ec]={},_0x158307[_0x2da339(0x1e0)](),this[_0x2da339(0x1e1)][_0x1021ec][_0x2da339(0x18c)]=_0x158307;if(_0x5678c5!=null)_0x5678c5['isLoop']=!![],_0x5678c5[_0x2da339(0x1e0)](),this[_0x2da339(0x1e1)][_0x1021ec][_0x2da339(0x195)]=_0x5678c5;else{if(_0x2da339(0x187)!==_0x2da339(0x187)){function _0x37307c(){var _0x4cf34b=_0x2da339;_0x4c0a89[_0x4cf34b(0x19f)]=_0x46f4fd[_0x4cf34b(0x19f)];}}else this['_axStates'][_0x1021ec][_0x2da339(0x195)]=null;}},_0x38db50[_0x31536a(0x1b8)]=function(_0x56385,_0x25c24d,_0x7d0fd0){var _0x1956c9=_0x31536a,_0x4c5f1c,_0x5415bb;_0x4c5f1c=null;try{if(_0x56385===0x0){if(_0x1956c9(0x1c7)!==_0x1956c9(0x1d2))_0x7d0fd0!=null&&(_0x4c5f1c=XAnimaTools[_0x1956c9(0x1a5)](this[_0x1956c9(0x17f)](),_0x25c24d,_0x7d0fd0));else{function _0x461b72(){var _0x482360=_0x1956c9;this[_0x482360(0x1d9)]=_0x3e409d,this[_0x482360(0x18a)](),this[_0x482360(0x191)]=[],this[_0x482360(0x1aa)]={},this[_0x482360(0x1e1)]={},this['_axState']=_0x482360(0x1cf),this[_0x482360(0x1e2)](this[_0x482360(0x1ac)],_0x346661);if(this['_axStates'][this[_0x482360(0x1ac)]]==null)return;this['resetXAnima'](),this[_0x482360(0x1d3)]=!![];}}}else _0x7d0fd0!=null&&(_0x4c5f1c=XAnimaTools['createXAnimaSetForIdle'](this[_0x1956c9(0x17f)](),_0x25c24d,_0x7d0fd0));}catch(_0x560a81){_0x5415bb=_0x560a81,console['warn'](_0x5415bb),_0x4c5f1c=null;}return _0x4c5f1c;},_0x38db50['_updateAnimX']=function(){var _0x8073dc=_0x31536a;this['_updateAnimXRefresh']();if(this[_0x8073dc(0x1ca)]()){if(_0x8073dc(0x181)!==_0x8073dc(0x1d8))return;else{function _0x447fc7(){this['resetXAnimaState']();}}}this[_0x8073dc(0x17a)]();if(this[_0x8073dc(0x192)]()&&this[_0x8073dc(0x1a6)]())return this[_0x8073dc(0x19d)]();},_0x38db50[_0x31536a(0x17a)]=function(){var _0x56b387=_0x31536a;if(!this[_0x56b387(0x1a7)]())return;this[_0x56b387(0x19b)]=0x0;if(!this[_0x56b387(0x1a6)]()){if(_0x56b387(0x19e)===_0x56b387(0x19e))return this['resetXAnima']();else{function _0x51e587(){var _0x4aadb1=_0x56b387;return this[_0x4aadb1(0x1c9)]=_0x368c83;}}}},_0x38db50['_updateMoveIdleAnimaX']=function(){var _0x442147=_0x31536a;if(!this[_0x442147(0x1a7)]()){if(_0x442147(0x1d4)===_0x442147(0x1ab)){function _0x4a3e91(){return this['_xAnimaToIdleTimer']=0x0;}}else{this['_xAnimaToIdleTimer']++;if(this[_0x442147(0x19b)]>=this[_0x442147(0x1a4)]())return this[_0x442147(0x190)]();}}},_0x38db50[_0x31536a(0x1a4)]=function(){var _0x525089=_0x31536a;return this[_0x525089(0x1de)]()['moveToIdleDelay'];},_0x38db50[_0x31536a(0x1dd)]=function(){var _0x1fcc33=_0x31536a;return this[_0x1fcc33(0x1e1)][this[_0x1fcc33(0x1ac)]][_0x1fcc33(0x18c)];},_0x38db50[_0x31536a(0x1de)]=function(){var _0x1e21c2=_0x31536a;if(_0x1e21c2(0x1e3)!=='VasIt')return this[_0x1e21c2(0x1e1)][this['_axState']][_0x1e21c2(0x195)];else{function _0x184e31(){return this['resetXAnima']();}}},_0x38db50[_0x31536a(0x190)]=function(){var _0x2949a1=_0x31536a;return this['_axCurrent']=this[_0x2949a1(0x1de)]();},_0x38db50[_0x31536a(0x184)]=function(){var _0x3df5db=_0x31536a;return this[_0x3df5db(0x1c9)]=this[_0x3df5db(0x1dd)]();},_0x38db50[_0x31536a(0x1c5)]=function(){var _0x532edd=_0x31536a;this[_0x532edd(0x1ad)](),this[_0x532edd(0x1d3)]=![],this[_0x532edd(0x17d)](null,null);},_0x38db50[_0x31536a(0x18d)]=function(){var _0x551e0d=_0x31536a;if(_0x551e0d(0x18f)===_0x551e0d(0x18f))return this[_0x551e0d(0x19a)]===!![];else{function _0x3f6519(){var _0x5cb760=_0x551e0d;_0x70f4b4=_0xc7df89[_0x5cb760(0x1a5)](this[_0x5cb760(0x17f)](),_0x3e9d73,_0xa94135);}}},_0x38db50[_0x31536a(0x17c)]=function(){var _0x1b608b=_0x31536a;if(_0x1b608b(0x17b)!==_0x1b608b(0x194))return this[_0x1b608b(0x19a)]=![];else{function _0x2899e7(){return;}}},_0x38db50[_0x31536a(0x183)]=function(_0x898c2c,_0x1a7681=![]){var _0x18fb72=_0x31536a;if('dcDPu'!==_0x18fb72(0x1c0)){var _0x5dda3a;if(this[_0x18fb72(0x1cb)][_0x898c2c]!=null)return;_0x5dda3a=XAnimaTools[_0x18fb72(0x1bc)](this[_0x18fb72(0x17f)](),_0x898c2c,_0x1a7681);if(_0x5dda3a==null)return;this['animaXParts'][_0x898c2c]=_0x5dda3a,this[_0x18fb72(0x19a)]=!![];}else{function _0x3c0f5d(){var _0x5c37b7=_0x18fb72;_0x4ed457=this[_0x5c37b7(0x1db)](_0x225c47);}}},_0x38db50['removeXAnimPart']=function(_0x358844){var _0x581b2b=_0x31536a;if(_0x581b2b(0x1cd)===_0x581b2b(0x1cd))this[_0x581b2b(0x1cb)][_0x358844]=null,delete this[_0x581b2b(0x1cb)][_0x358844],this['_xAnimaPartsRequireRefresh']=!![];else{function _0x545508(){this['resetXAnima']();}}},_0x38db50[_0x31536a(0x18a)]=function(){var _0x5b1862=_0x31536a;if(_0x5b1862(0x1d7)!==_0x5b1862(0x1b1))this[_0x5b1862(0x1cb)]={},this['_xAnimaPartsRequireRefresh']=!![];else{function _0x4bcad4(){var _0x2c9071=_0x5b1862;this[_0x2c9071(0x1ce)]();if(this[_0x2c9071(0x1ca)]())return;this[_0x2c9071(0x17a)]();if(this[_0x2c9071(0x192)]()&&this['isInMovementAnimaX']())return this[_0x2c9071(0x19d)]();}}},_0x38db50[_0x31536a(0x1c6)]=function(_0xe6843f,_0x530138=![],_0x52505b=![]){var _0xc55ec4=_0x31536a,_0x3f9b5c,_0x3d508e;if(!this['isHaveAnimaXActionWithName'](_0xe6843f)){if(_0xc55ec4(0x1be)===_0xc55ec4(0x1be))return![];else{function _0x521c41(){return![];}}}if(this['isAnimaXActionIsPreloaded'](_0xe6843f)){if(_0xc55ec4(0x1b7)==='zsTUH'){function _0x3eaa0b(){return![];}}else _0x3d508e=this['getPreloadAnimaXActionSet'](_0xe6843f);}else{if('IkZgr'===_0xc55ec4(0x180))_0x3f9b5c=XAnimaTools[_0xc55ec4(0x173)](_0xe6843f,this[_0xc55ec4(0x17f)]()),_0x3d508e=this[_0xc55ec4(0x18e)](_0x3f9b5c);else{function _0x444a43(){return;}}}if(_0x3d508e!=null){if(_0xc55ec4(0x18b)!==_0xc55ec4(0x18b)){function _0x225ed3(){var _0x14426c=_0xc55ec4;return this[_0x14426c(0x1de)]()!=null;}}else return _0x3d508e[_0xc55ec4(0x1c2)]=_0x52505b,_0x3d508e[_0xc55ec4(0x185)]=_0x530138,this['startAnimaXAction'](_0x3d508e),!![];}return![];};else{function _0x5266ce(){return;}}}();}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Система анимации XAnima и ABS
    // -----------------------------------------------------------------------
    // * Предзагрузить действие
    _.preloadAnimaXAction = function(actionParams, isWaiting) {
      var animaSet;
      if (actionParams == null) {
        return;
      }
      animaSet = this.createAnimaXActionSet(actionParams);
      if (animaSet != null) {
        animaSet.preLoad();
      }
      this._axPreloadedActions[actionParams.name] = animaSet;
    };
    // * Создать AnimaXSet из параметров плагина анимации
    _.createAnimaXActionSet = function(actionParams) {
      var animaSet, name;
      name = actionParams.name;
      animaSet = XAnimaTools.createXAnimaSetForAction(this.animXId(), actionParams);
      animaSet.preLoad();
      return animaSet;
    };
    _.isAnimaXActionIsPreloaded = function(actionName) {
      return this.getPreloadAnimaXActionSet(actionName) != null;
    };
    _.getPreloadAnimaXActionSet = function(actionName) {
      return this._axPreloadedActions[actionName];
    };
    _.refreshAnimaX = function() {
      var animaXProfile;
      animaXProfile = this.getCurrentAnimaXProfile();
      if ((this._currentAnimaXProfile != null) && (animaXProfile == null)) {
        this._currentAnimaXProfile = null;
        if (this.isAnimX()) {
          this.clearAnimaX();
        }
        return;
      }
      if (this._currentAnimaXProfile === animaXProfile) {

      } else {
        this.createNewAnimaXForCharacter(animaXProfile);
      }
    };
    _.createNewAnimaXForCharacter = function(animaXProfile) {
      var animaX;
      animaX = XAnimaTools.getXAnimaParamsForState('base', animaXProfile);
      if (animaX == null) {
        if (String.any(animaXProfile)) {
          console.warn("Can't find Base animation settings for " + animaXProfile);
        }
        return;
      }
      this._currentAnimaXProfile = animaXProfile;
      this.initAnimaX(animaXProfile, animaX);
      this.registerAnimaXActions(animaXProfile);
      this.refreshAnimaXLayers();
    };
    // * Получить профиль анимации (для загрузки)
    _.getCurrentAnimaXProfile = function() {
      return null;
    };
    // * Получить начальный профиль персонажа (без экипировки)
    _.getInitialXProfile = function() {
      return null;
    };
    // * Регистрация действий (названий) и предзагрузка
    _.registerAnimaXActions = function(animaXProfile) {
      var action, actionList, i, len;
      actionList = XAnimaTools.getXAnimaActionList(animaXProfile);
      for (i = 0, len = actionList.length; i < len; i++) {
        action = actionList[i];
        this.registerAnimaXAction(action.name);
        if (this.isAnimaXAADefaultAction(action.name)) {
          this.preloadAnimaXAction(action);
        }
      }
    };
    // * Набор имён стандартных действий (нужны для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Проверка обновления состояния анимации на Battler
    _._updateAnimXRefresh = function() {
      var b;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return;
      }
      if (b.isNeedAnimaXRefresh()) {
        this.refreshAnimaX();
        this.refreshAnimaXLayers();
        b.onAnimaXRefresh();
      }
    };
    _.getBattlerForAnimaX = function() {
      return null;
    };
    // * Получить набор экипировки для Анимации
    _._getEquipmentAnimaXSet = function() {
      var b, equipmentXSet;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return null;
      }
      equipmentXSet = b.getAnimaXEquipmentSet();
      if (equipmentXSet != null) {
        return this.getInitialXProfile() + "_" + equipmentXSet;
      }
      return null;
    };
    // * Обновить слои с учётом экипировки
    return _.refreshAnimaXLayers = function() {
      var actor, e, i, j, k, l, len, len1, len2, ref, ref1, ref2;
      if (!this.isAnimX()) {
        return;
      }
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return;
      }
      try {
        ref = actor.axLayersByEquips;
        for (i = 0, len = ref.length; i < len; i++) {
          l = ref[i];
          this.addNewXAnimPart(l, false);
        }
        ref1 = actor.axLayersByEquipsRelative;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          l = ref1[j];
          this.addNewXAnimPart(l, true);
        }
        ref2 = actor.axPreviousLayers;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          l = ref2[k];
          this.removeXAnimPart(l);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
  })();
  (function() {    // * Действия
    // -----------------------------------------------------------------------
    _.startAnimaXAA_Attack = function() {
      return this.startAnimaXCustomAction('Attack', false, true);
    };
    return _.startAnimaXAA_Defense = function() {
      return this.startAnimaXCustomAction('Defense', true, false);
    };
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    
    // * Персонаж использует XAnima
    _.isAnimX = function() {
      return false;
    };
    // * ID набора анимаций
    _.animXId = function() {
      return null;
    };
    // * Когда запускается действие
    _.onAnimaXActionStart = function() {};
    // * Когда действие заканчивается
    _.onAnimaXActionEnd = function() {};
    
    // * Находится ли анимация в действии
    _.isInAnimXAction = function() {
      return false;
    };
    // * Находится ли анимация в действии и необходимо ждать завершения
    _.isAnimXIsBusy = function() {
      return this.isAnimX() && this.isInAnimXAction() && this.isShouldWaitAnimaXAction();
    };
    // * Находится ли анимация в движении (имеется в виду moveSet)
    _.isInMovementAnimaX = function() {
      return false;
    };
    // * Находится ли анимация в Idle
    _.isInIdleAnimaX = function() {
      return false;
    };
    // * Есть ли Idle анимация у текущего состояния
    _.isHaveIdleAnimaX = function() {
      return false;
    };
    // * Есть ли анимация для состояния
    _.isHaveAnimaXState = function() {
      return false;
    };
    // * Есть ли данное действие у текущей XAnima конфигурации
    _.isHaveAnimaXActionWithName = function() {
      return false;
    };
    // * Должен ли ждать завершения действия
    _.isShouldWaitAnimaXAction = function() {
      return false;
    };
    // * Отключить анимацию
    _.clearAnimaX = function() {};
    // * Действие является стандартным (используется для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Анимация действия была предзагруженна
    _.isAnimaXActionIsPreloaded = function() {
      return false;
    };
    // * Были ли изменены слои (части) анимации?
    _.isAnimXPartsChanged = function() {
      return false;
    };
  })();
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setupPage, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__setupPage = _.setupPage;
  _.setupPage = function() {
    ALIAS__setupPage.call(this);
    this._isHaveAnimaX = false;
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.getCurrentAnimaXProfile = function() {
    var animXParameter, list;
    if (this.page() == null) {
      return null;
    }
    list = this.page().list;
    animXParameter = PKD_ANIMAX.getEventCommentValue('XA:', list);
    if (animXParameter != null) {
      return this._parseAnimaXAParameterForEvent(animXParameter);
    }
    return null;
  };
  _._parseAnimaXAParameterForEvent = function(animXParameter) {
    var id, parts;
    if (animXParameter == null) {
      return;
    }
    parts = animXParameter.split(":");
    id = parts[1];
    return id;
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    var actor;
    actor = this.getBattlerForAnimaX();
    if (actor == null) {
      return null;
    }
    return PKD_ANIMAX.getValueFromMeta('xAnima', actor.actor());
  };
  _.getBattlerForAnimaX = function() {
    return this.actor();
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateWaitMode, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'xAnima') {
      return this._updateXAnimaWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _._updateXAnimaWait = function() {
    var waiting;
    waiting = this.xAnimaTarget.isInAnimXAction();
    if (!waiting) {
      this._waitMode = '';
      this.xAnimaTarget = null;
    }
    return waiting;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function(actorId) {
    var actor;
    ALIAS__addActor.call(this, actorId);
    // * Чтобы приминялась анимация с оружием (если была)
    if (this._actors.includes(actorId)) { // * Если был добавлен
      actor = $gameActors.actor(actorId);
      if (actor != null) {
        actor.refresh();
      }
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima
  // -----------------------------------------------------------------------
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (this.isAnimXIsBusy()) {
      // * Дополнительная проверка анимации, т.к. Game_Player перекрывает метод canMove из Character_Base
      return false;
    }
    return ALIAS__canMove.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (sceneActive) {
      if (this.isAnimX()) {
        return this._updateAnimX();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima и ABS
  // -----------------------------------------------------------------------
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    if (String.any($gameSystem.lastPlayerAnimaXExternProfile)) {
      return $gameSystem.lastPlayerAnimaXExternProfile;
    } else {
      return PKD_ANIMAX.getValueFromMeta('xAnima', $gameParty.leader().actor());
    }
  };
  _.isAnimaXAADefaultAction = function(actionName) {
    return ['Attack', 'Defense', 'Skill'].contains(actionName);
  };
  _.getBattlerForAnimaX = function() {
    return $gameParty.leader();
  };
  _.setExternalAnimaX = function(name) {
    $gameSystem.lastPlayerAnimaXExternProfile = name;
    return this.refresh();
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadAnimaX = function(filename) {
    return this.loadBitmap('img/charactersAA/', filename, 0, false);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Спрайт для анимации слоя (части)
var Sprite_AnimaXPart;

Sprite_AnimaXPart = class Sprite_AnimaXPart extends Sprite {
  constructor(animPart, rootAnimation) {
    super();
    this.animPart = animPart;
    this.animPart.applyRootAnimation(rootAnimation);
    this.visible = !this.animPart.isDisabled();
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.isLowerBodyPart = this.animPart.isLowerBodyPart;
  }

  refreshPart(frame, dir) {
    return this.bitmap = this.animPart.getPartBitmap(dir, frame);
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__characterBlockX, ALIAS__characterBlockY, ALIAS__characterPatternX, ALIAS__characterPatternY, ALIAS__isEmptyCharacter, ALIAS__isImageChanged, ALIAS__patternHeight, ALIAS__patternWidth, ALIAS__updateBitmap, ALIAS__updateFrame, ALIAS__updatePosition, ALIAS__updateVisibility, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__isEmptyCharacter = _.isEmptyCharacter;
  _.isEmptyCharacter = function() {
    if (this.isAnimX()) {
      return false;
    } else {
      return ALIAS__isEmptyCharacter.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateBitmap = _.updateBitmap;
  _.updateBitmap = function() {
    if (this.isAnimX()) {
      this._updateBitmapAnimX();
    } else {
      ALIAS__updateBitmap.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateVisibility = _.updateVisibility;
  _.updateVisibility = function() {
    if (this.isAnimX()) {
      return this._updateVisibilityAnimX();
    } else {
      return ALIAS__updateVisibility.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateFrame = _.updateFrame;
  _.updateFrame = function() {
    ALIAS__updateFrame.call(this);
    if (this.isAnimX()) {
      this._axCntr.update(this._character);
      if (this._animaXParts != null) {
        this._updateAnimaXPartsDepth();
        this._updateAnimaXParts();
      }
    }
  };
  //@[ALIAS]
  ALIAS__updatePosition = _.updatePosition;
  _.updatePosition = function() {
    ALIAS__updatePosition.call(this);
    if (this.isAnimX()) {
      this.x += this._axCntr.rootAnimation.dx;
      this.y += this._axCntr.rootAnimation.dy;
    }
  };
  
  //@[ALIAS]
  ALIAS__isImageChanged = _.isImageChanged;
  _.isImageChanged = function() {
    if (this.isAnimX()) {
      return this._animaXSet !== this._character.getCurrentAnimX();
    } else {
      return ALIAS__isImageChanged.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__patternWidth = _.patternWidth;
  _.patternWidth = function() {
    if (this.isAnimX()) {
      return this.bitmap.width;
    } else {
      return ALIAS__patternWidth.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__patternHeight = _.patternHeight;
  _.patternHeight = function() {
    if (this.isAnimX()) {
      return this.bitmap.height;
    } else {
      return ALIAS__patternHeight.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__characterBlockX = _.characterBlockX;
  _.characterBlockX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockX.call(this);
  };
  
  //@[ALIAS]
  ALIAS__characterBlockY = _.characterBlockY;
  _.characterBlockY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockY.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternX = _.characterPatternX;
  _.characterPatternX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternX.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternY = _.characterPatternY;
  _.characterPatternY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternY.call(this);
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    _.isAnimX = function() {
      return this._character.isAnimX();
    };
    _._updateVisibilityAnimX = function() {
      if (PKD_ANIMAX.isMV()) {
        Sprite_Base.prototype.updateVisibility.call(this);
      } else {
        Sprite.prototype.updateVisibility.call(this);
      }
      if (this._character.isTransparent()) {
        this.visible = false;
      } else {
        if (this._character instanceof Game_Follower) {
          this.visible = this._character.isVisible();
        }
      }
    };
    _._updateBitmapAnimX = function() {
      if (this.isImageChanged()) {
        this._animaXSet = this._character.getCurrentAnimX();
        this._refreshAnimXSetController();
        this._createAnimaXParts();
      } else if (this.isXAnimPartsChanged()) {
        this._createAnimaXParts();
      }
      if (this._axCntr.isChanged()) {
        this._refreshAnimaXBitmap();
        this._refreshAnimXPartSprites();
      }
    };
    return _._refreshAnimXSetController = function() {
      this._axCntr = new XAnimaSetController(this._character.direction(), this._animaXSet);
      return this._refreshAnimaXBitmap();
    };
  })();
  (function() {    // * Система анимации XAnima - Части (слои)
    // -----------------------------------------------------------------------
    // * Синхронизируем координаты нижнего слоя
    _._updateAnimaXParts = function() {
      this._animaXPartBelow.x = this.x;
      return this._animaXPartBelow.y = this.y;
    };
    // * Чтобы lower и upper body прозрачность была (в кустах)
    _._updateAnimaXPartsDepth = function() {
      var i, j, len, len1, p, ref, ref1;
      // * Не обновлять, если не изменилась прозрачность
      if (this.__lBushDepth === this._bushDepth) {
        return;
      }
      this.__lBushDepth = this._bushDepth;
      if (this._bushDepth > 0) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.isLowerBodyPart === true) {
            p.opacity = 128;
          }
        }
      } else {
        ref1 = this.__tAnimxParts;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          p = ref1[j];
          p.opacity = 255;
        }
      }
    };
    _.isXAnimPartsChanged = function() {
      if (this.isAnimX()) {
        return this._character.isAnimXPartsChanged();
      } else {
        return false;
      }
    };
    _._refreshAnimXPartSprites = function() {
      var i, len, part, ref;
      if (this._animaXParts == null) {
        return;
      }
      ref = this.__tAnimxParts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.refreshPart(this._axCntr.cFrame, this._axCntr.cDir);
        this._addPartOnSpriteByDirection(part, this._axCntr.cDir);
      }
    };
    _._refreshAnimaXBitmap = function() {
      return this.bitmap = this._axCntr.bitmap();
    };
    _._createAnimaXParts = function() {
      if (this._animaXParts != null) {
        this._destroyAnimaXParts();
      }
      // * Все части которые добавленны
      this.__tAnimxParts = [];
      // * Части над персонажем (стандарт)
      this._animaXParts = new Sprite();
      this._animaXParts.anchor.x = 0.5;
      this._animaXParts.anchor.y = 1;
      // * Части под персонажем
      this._animaXPartBelow = new Sprite();
      this._animaXPartBelow.anchor.x = 0.5;
      this._animaXPartBelow.anchor.y = 1;
      this._animaXPartBelow.z = 1;
      this._addAllAnimaXParts();
      this.addChild(this._animaXParts);
      this.parent.addChild(this._animaXPartBelow);
      this._character.onAnimXPartsRefreshed();
    };
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
      if (this.__tAnimxParts != null) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          p.parent.removeChild(p);
          p.visible = false;
        }
        this.__tAnimxParts = null;
      }
      this.__lBushDepth = null;
    };
    _._addAllAnimaXParts = function() {
      var animaXPart, i, id, len, part, partData, parts, unsortedParts;
      parts = this._character.animaXParts;
      // * Преобразование в массив
      unsortedParts = [];
      for (id in parts) {
        partData = parts[id];
        unsortedParts.push(partData);
      }
      // * Сортировка
      unsortedParts.sort(function(a, b) {
        if (a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          return 0;
        }
        return -1;
      });
      for (i = 0, len = unsortedParts.length; i < len; i++) {
        part = unsortedParts[i];
        animaXPart = new Sprite_AnimaXPart(part, this._axCntr.rootAnimation);
        this.__tAnimxParts.push(animaXPart);
        this._addPartOnSpriteByDirection(animaXPart, this._axCntr.cDir);
      }
    };
    // * Добаить часть (слой) на персонажа с учётом "уровня" слоя (за или перед)
    _._addPartOnSpriteByDirection = function(part, dir) {
      var level;
      level = part.animPart.isBelowCharacter(dir);
      if (level === true) {
        this._animaXParts.removeChild(part);
        this._animaXPartBelow.addChild(part);
      } else {
        this._animaXPartBelow.removeChild(part);
        this._animaXParts.addChild(part);
      }
    };
  })();
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    _.isAnimX = function() {
      return this._character.isAnimX();
    };
    _._updateVisibilityAnimX = function() {
      if (PKD_ANIMAX.isMV()) {
        Sprite_Base.prototype.updateVisibility.call(this);
      } else {
        Sprite.prototype.updateVisibility.call(this);
      }
      if (this._character.isTransparent()) {
        this.visible = false;
      } else {
        if (this._character instanceof Game_Follower) {
          this.visible = this._character.isVisible();
        }
      }
    };
    _._updateBitmapAnimX = function() {
      if (this.isImageChanged()) {
        this._animaXSet = this._character.getCurrentAnimX();
        this._refreshAnimXSetController();
        this._createAnimaXParts();
      } else if (this.isXAnimPartsChanged()) {
        this._createAnimaXParts();
      }
      if (this._axCntr.isChanged()) {
        this._refreshAnimaXBitmap();
        this._refreshAnimXPartSprites();
      }
    };
    return _._refreshAnimXSetController = function() {
      this._axCntr = new XAnimaSetController(this._character.direction(), this._animaXSet);
      return this._refreshAnimaXBitmap();
    };
  })();
  (function() {    // * Система анимации XAnima - Части (слои)
    // -----------------------------------------------------------------------
    // * Синхронизируем координаты нижнего слоя
    _._updateAnimaXParts = function() {
      this._animaXPartBelow.x = this.x;
      return this._animaXPartBelow.y = this.y;
    };
    // * Чтобы lower и upper body прозрачность была (в кустах)
    _._updateAnimaXPartsDepth = function() {
      var i, j, len, len1, p, ref, ref1;
      // * Не обновлять, если не изменилась прозрачность
      if (this.__lBushDepth === this._bushDepth) {
        return;
      }
      this.__lBushDepth = this._bushDepth;
      if (this._bushDepth > 0) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.isLowerBodyPart === true) {
            p.opacity = 128;
          }
        }
      } else {
        ref1 = this.__tAnimxParts;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          p = ref1[j];
          p.opacity = 255;
        }
      }
    };
    _.isXAnimPartsChanged = function() {
      if (this.isAnimX()) {
        return this._character.isAnimXPartsChanged();
      } else {
        return false;
      }
    };
    _._refreshAnimXPartSprites = function() {
      var i, len, part, ref;
      if (this._animaXParts == null) {
        return;
      }
      ref = this.__tAnimxParts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.refreshPart(this._axCntr.cFrame, this._axCntr.cDir);
        this._addPartOnSpriteByDirection(part, this._axCntr.cDir);
      }
    };
    _._refreshAnimaXBitmap = function() {
      return this.bitmap = this._axCntr.bitmap();
    };
    _._createAnimaXParts = function() {
      if (this._animaXParts != null) {
        this._destroyAnimaXParts();
      }
      // * Все части которые добавленны
      this.__tAnimxParts = [];
      // * Части над персонажем (стандарт)
      this._animaXParts = new Sprite();
      this._animaXParts.anchor.x = 0.5;
      this._animaXParts.anchor.y = 1;
      // * Части под персонажем
      this._animaXPartBelow = new Sprite();
      this._animaXPartBelow.anchor.x = 0.5;
      this._animaXPartBelow.anchor.y = 1;
      this._animaXPartBelow.z = 1;
      this._addAllAnimaXParts();
      this.addChild(this._animaXParts);
      this.parent.addChild(this._animaXPartBelow);
      this._character.onAnimXPartsRefreshed();
    };
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
      if (this.__tAnimxParts != null) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          p.parent.removeChild(p);
          p.visible = false;
        }
        this.__tAnimxParts = null;
      }
      this.__lBushDepth = null;
    };
    _._addAllAnimaXParts = function() {
      var animaXPart, i, id, len, part, partData, parts, unsortedParts;
      parts = this._character.animaXParts;
      // * Преобразование в массив
      unsortedParts = [];
      for (id in parts) {
        partData = parts[id];
        unsortedParts.push(partData);
      }
      // * Сортировка
      unsortedParts.sort(function(a, b) {
        if (a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          return 0;
        }
        return -1;
      });
      for (i = 0, len = unsortedParts.length; i < len; i++) {
        part = unsortedParts[i];
        animaXPart = new Sprite_AnimaXPart(part, this._axCntr.rootAnimation);
        this.__tAnimxParts.push(animaXPart);
        this._addPartOnSpriteByDirection(animaXPart, this._axCntr.cDir);
      }
    };
    // * Добаить часть (слой) на персонажа с учётом "уровня" слоя (за или перед)
    _._addPartOnSpriteByDirection = function(part, dir) {
      var level;
      level = part.animPart.isBelowCharacter(dir);
      if (level === true) {
        this._animaXParts.removeChild(part);
        this._animaXPartBelow.addChild(part);
      } else {
        this._animaXPartBelow.removeChild(part);
        this._animaXParts.addChild(part);
      }
    };
  })();
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Анимация (одна единица анимации, последовательность кадров)

//* STORABLE - значит класс сохраняется в сохранение (т.е. создаётся на игровом объекте)
//@[STORABLE]
var XAnima;

XAnima = class XAnima {
  constructor(framesCount, fileName) {
    this.framesCount = framesCount;
    this.fileName = fileName;
    this.frames = [];
    this._parseFrames();
  }

  // * Хранит только названия картинок кадров
  _parseFrames() {
    var i, j, ref, results;
    results = [];
    for (i = j = 0, ref = this.framesCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(this.frames.push(this.fileName + "_" + i));
    }
    return results;
  }

  // * Умножить первый кадр times раз
  expandFirstFrame(times) {
    var i, j, ref, results;
    this.framesCount += times;
    results = [];
    for (i = j = 0, ref = times; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(this.frames.splice(1, 0, this.frames[0]));
    }
    return results;
  }

  preLoad() {
    var f, j, len, ref, results;
    ref = this.frames;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      f = ref[j];
      results.push(ImageManager.loadAnimaX(f));
    }
    return results;
  }

  getFrame(index) {
    return ImageManager.loadAnimaX(this.frames[index]);
  }

};

//TODO: Загрузка всех анимаций при запуске игры?

// Generated by CoffeeScript 2.5.1
// * Дополнительный слой анимации

//@[STORABLE]
var XAnimaPart;

XAnimaPart = class XAnimaPart {
  constructor(filename, isLowerBodyPart, level) {
    this.filename = filename;
    this.isLowerBodyPart = isLowerBodyPart;
    this.level = level;
    this.animations = [];
    this.rules = {};
    this.disabledActions = [];
    if (this.isLowerBodyPart == null) {
      this.isLowerBodyPart = false;
    }
    if (this.level == null) {
      this.level = 0;
    }
    // D, L, R, U, DL, DR, UL, UR, noDir
    this.directionsLevels = [false, false, false, false, false, false, false, false, false];
    this._isDisabled = false;
    this.setDefaultRule(true, true);
  }

  isDisabled() {
    return this._isDisabled === true;
  }

  // * Тут задаётся стандартное правило
  setDefaultRule(haveDirs, haveFrames) {
    return this.rules['Basic'] = [haveDirs, haveFrames];
  }

  setRuleForMovement(haveDirs, haveFrames) {
    return this.rules['Move'] = [haveDirs, haveFrames];
  }

  setRuleForIdle(haveDirs, haveFrames) {
    return this.rules['Idle'] = [haveDirs, haveFrames];
  }

  setRuleForAction(actionName, haveDirs, haveFrames, fileName) {
    return this.rules[actionName] = [haveDirs, haveFrames, fileName];
  }

  disableForAction(actionName) {
    return this.disabledActions.push(actionName);
  }

  applyRootAnimation(xAnimaSet) {
    var cFileName, frames, isNoDir, rule, setName;
    setName = xAnimaSet.getActionName();
    if (this.disabledActions.contains(setName)) {
      this._isDisabled = true;
      return;
    } else {
      this._isDisabled = false;
    }
    rule = this.rules[setName];
    if (rule == null) {
      rule = this.rules['Basic'];
      cFileName = this.filename + setName;
    } else {
      if (String.any(rule[2])) {
        cFileName = this.filename + rule[2];
      } else {
        cFileName = this.filename + setName;
      }
    }
    frames = xAnimaSet.frames;
    if (!rule[1]) {
      frames = 1;
    }
    isNoDir = !rule[0];
    return this._setupAnimations(frames, cFileName, isNoDir, xAnimaSet.is8Way, frames === 1);
  }

  _setupAnimations(frames, cFileName, isNoDir, is8way, isNoFrames) {
    this.isOneFrame = isNoFrames;
    this.isNoDirections = isNoDir;
    if (this.isNoDirections === true) {
      this.animations[0] = new XAnima(frames, cFileName);
    } else {
      this.animations[0] = new XAnima(frames, cFileName + "_D");
      this.animations[1] = new XAnima(frames, cFileName + "_L");
      this.animations[2] = new XAnima(frames, cFileName + "_R");
      this.animations[3] = new XAnima(frames, cFileName + "_U");
      if (is8way === true) {
        this.animations[4] = new XAnima(frames, this.filename + "_DL");
        this.animations[5] = new XAnima(frames, this.filename + "_DR");
        this.animations[6] = new XAnima(frames, this.filename + "_UL");
        this.animations[7] = new XAnima(frames, this.filename + "_UR");
      }
      return;
    }
    this.preLoad();
  }

  preLoad() {
    var anim, i, len, ref, results;
    ref = this.animations;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      results.push(anim.preLoad());
    }
    return results;
  }

  getPartBitmap(dir, frame) {
    if (this.isOneFrame === true) {
      frame = 0;
    }
    return this.getAnimationByDirection(dir).getFrame(frame);
  }

  // * Часть (слой) должна быть под персонажем?
  isBelowCharacter(dir) {
    if (this.isNoDirections === true) {
      // * Отдельная настройка 8 позиция
      return this.directionsLevels[8];
    } else {
      switch (dir) {
        case 8:
          return this.directionsLevels[3];
        case 2:
          return this.directionsLevels[0];
        case 4:
          return this.directionsLevels[1];
        case 6:
          return this.directionsLevels[2];
        case 1: // * DL
          if (this.is8WayAnimation()) {
            return this.animations[4];
          } else {
            return this.animations[1];
          }
          break;
        case 3: // * DR
          if (this.is8WayAnimation()) {
            return this.animations[5];
          } else {
            return this.animations[2];
          }
          break;
        case 7: // * UL
          if (this.is8WayAnimation()) {
            return this.animations[6];
          } else {
            return this.animations[1];
          }
          break;
        case 9: // * UR
          if (this.is8WayAnimation()) {
            return this.animations[7];
          } else {
            return this.animations[2];
          }
      }
      return this.directionsLevels[8];
    }
  }

  getAnimationByDirection(dir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    }
    switch (dir) {
      case 8:
        return this.animations[3];
      case 2:
        return this.animations[0];
      case 4:
        return this.animations[1];
      case 6:
        return this.animations[2];
      case 1: // * DL
        if (this.is8WayAnimation()) {
          return this.animations[4];
        } else {
          return this.animations[1];
        }
        break;
      case 3: // * DR
        if (this.is8WayAnimation()) {
          return this.animations[5];
        } else {
          return this.animations[2];
        }
        break;
      case 7: // * UL
        if (this.is8WayAnimation()) {
          return this.animations[6];
        } else {
          return this.animations[1];
        }
        break;
      case 9: // * UR
        if (this.is8WayAnimation()) {
          return this.animations[7];
        } else {
          return this.animations[2];
        }
    }
    return this.animations[0];
  }

};

// Generated by CoffeeScript 2.5.1
// * Набор анимаций для всех направлений

//DIRECTIONS:
// 2 - DOWN
// 8 - UP
// 4 - LEFT
// 6 - RIGHT

//TYPE:
// 0 - movement
// 1 - idle
// 2 - action

//@[STORABLE]
var XAnimaSet;

XAnimaSet = class XAnimaSet {
  constructor(type, filename, frames, speed, isNoDirections, is8Way = false) {
    this.type = type;
    this.filename = filename;
    this.frames = frames;
    this.speed = speed;
    this.isNoDirections = isNoDirections;
    this.is8Way = is8Way;
    this._setupAnimations();
    this.isLoop = false;
    this.actionName = "Action";
    this.moveToIdleDelay = 30;
    this.waitActionEnd = true;
  }

  _setupAnimations() {
    this.animations = [];
    if (this.isNoDirections === true) {
      this.animations[0] = new XAnima(this.frames, this.filename);
    } else {
      this.animations[0] = new XAnima(this.frames, this.filename + "_D");
      this.animations[1] = new XAnima(this.frames, this.filename + "_L");
      this.animations[2] = new XAnima(this.frames, this.filename + "_R");
      this.animations[3] = new XAnima(this.frames, this.filename + "_U");
      if (this.is8WayAnimation()) {
        this.animations[4] = new XAnima(this.frames, this.filename + "_DL");
        this.animations[5] = new XAnima(this.frames, this.filename + "_DR");
        this.animations[6] = new XAnima(this.frames, this.filename + "_UL");
        this.animations[7] = new XAnima(this.frames, this.filename + "_UR");
      }
      return;
    }
    this.preLoad();
  }

  setActionName(actionName) {
    this.actionName = actionName;
  }

  // * Имя действия используется частями, чтобы определять правила и анимации нужные
  getActionName() {
    switch (this.type) {
      case 0:
        return "Move";
      case 1:
        return "Idle";
      default:
        return this.actionName;
    }
  }

  preLoad() {
    var anim, i, len, ref, results;
    ref = this.animations;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      results.push(anim.preLoad());
    }
    return results;
  }

  isNoFrames() {
    return this.frames === 1;
  }

  isWait() {
    return this.waitActionEnd === true;
  }

  expandFirstFrameTimes(times) {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.expandFirstFrame(times);
    }
    return this.frames += times;
  }

  //? Оптимизация заменой метода?
  getAnimationByDirection(dir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    }
    switch (dir) {
      case 8:
        return this.animations[3];
      case 2:
        return this.animations[0];
      case 4:
        return this.animations[1];
      case 6:
        return this.animations[2];
      case 1: // * DL
        if (this.is8WayAnimation()) {
          return this.animations[4];
        } else {
          return this.animations[1];
        }
        break;
      case 3: // * DR
        if (this.is8WayAnimation()) {
          return this.animations[5];
        } else {
          return this.animations[2];
        }
        break;
      case 7: // * UL
        if (this.is8WayAnimation()) {
          return this.animations[6];
        } else {
          return this.animations[1];
        }
        break;
      case 9: // * UR
        if (this.is8WayAnimation()) {
          return this.animations[7];
        } else {
          return this.animations[2];
        }
    }
    return this.animations[0];
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  isMovement() {
    return this.type === 0;
  }

  isAction() {
    return this.type === 2;
  }

  isIdle() {
    return this.type === 1;
  }

};

// Generated by CoffeeScript 2.5.1
// * Контроллер анимации (смена кадров, направлений)
// * rootAnimation - это XAnimaSet
// * Контроллер хранится в Sprite_Character
var XAnimaSetController;

XAnimaSetController = class XAnimaSetController {
  constructor(startDirection, rootAnimation) {
    this.rootAnimation = rootAnimation;
    this.cFrame = 0;
    this.cDir = startDirection;
    this._timer = 0;
    this._sKoef = 0;
    this._requireRefresh = true;
    this._animPlaying = false;
    this._initialFrame = false;
  }

  isPlaying() {
    return this._animPlaying === true;
  }

  // * Класс каждый раз получает character, не хранит
  update(character) {
    this._requireRefresh = false;
    this._updateDirection(character);
    return this._updateFrames(character);
  }

  _updateDirection(character) {
    var cDir;
    if (this.rootAnimation.is8WayAnimation()) {
      cDir = character._diagonalDir;
      if (cDir == null) {
        //console.warn('You try start 8 way diagonal animation, but game not support 8 way movement')
        cDir = character.direction();
      }
      if (cDir === false) {
        cDir = character.direction();
      }
    } else {
      //console.log(cDir)
      cDir = character.direction();
    }
    if (cDir !== this.cDir) {
      this.requestRefresh();
    }
    this.cDir = cDir;
  }

  _updateFrames(character) {
    if (this.rootAnimation.isMovement()) {
      if (!this.rootAnimation.isNoFrames()) { // * IDLE AND ACTION SAME WAY
        return this._updateMovement(character);
      }
    } else {
      return this._updateAction(character);
    }
  }

  _updateMovement(c) {
    if (c.isMoving()) {
      this._sKoef = c.realMoveSpeed();
      this._setInitialFrame(1);
      this._animPlaying = true;
      this._updateTimer(c.isDashing());
      if (this._timer === 0) {
        return this._nextMovementFrame();
      }
    } else {
      this._sKoef = 0;
      this._updateTimer(false);
      if (this._timer === 0) {
        if (this.cFrame !== 0) {
          this.requestRefresh();
        }
        return this.resetAnimation();
      }
    }
  }

  _setInitialFrame(frameIndex) {
    if (this._initialFrame === true) { // * Установка начального кадра
      return;
    }
    this.cFrame = frameIndex;
    this._initialFrame = true;
    this._timer = 0;
    return this.requestRefresh();
  }

  _updateTimer(isFast) {
    this._timer += 1;
    if (isFast) {
      this._timer += 0.5;
    }
    if (this._timer >= this._speed()) {
      return this._timer = 0;
    }
  }

  _speed() {
    return this.rootAnimation.speed - this._sKoef;
  }

  _nextMovementFrame() {
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 1; // * Не 0, 0 - когда стоит
    }
    return this.requestRefresh();
  }

  _updateAction(c) {
    if (this._initialFrame === false) {
      this._setInitialFrame(0);
      c.onAnimaXActionStart();
    }
    this._updateTimer(false);
    if (this._timer === 0) {
      return this._nextActionFrame(c);
    }
  }

  _nextActionFrame(c) {
    this._animPlaying = true;
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 0;
      if (!this.rootAnimation.isLoop) {
        this.resetAnimation();
        c.onAnimaXActionEnd();
      }
    }
    return this.requestRefresh();
  }

  resetAnimation() {
    this._timer = 0;
    this.cFrame = 0;
    this._animPlaying = false;
    return this._initialFrame = false;
  }

  // * Если спрайт должен отрисовать новый кадр, то запрашиваем refresh
  requestRefresh() {
    return this._requireRefresh = true;
  }

  bitmap() {
    return this.rootAnimation.getAnimationByDirection(this.cDir).getFrame(this.cFrame);
  }

  isChanged() {
    return this._requireRefresh;
  }

};

// Generated by CoffeeScript 2.5.1
// * Менеджер для работы с БД анимаций
var XAnimaTools;

XAnimaTools = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ XAnimaTools.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = XAnimaTools;
  _.animationsDB = function() {
    return PKD_ANIMAX.Animations;
  };
  _.animationPartsDB = function() {
    return PKD_ANIMAX.AnimationParts;
  };
  // * Список всех действий анимации
  _.getXAnimaActionList = function(id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return [];
    }
    return data.actions;
  };
  // * Анимация по имени (ID)
  _.getXAnimaSetById = function(id) {
    var data;
    data = this.animationsDB();
    return data != null ? data.find(function(d) {
      return d.id === id;
    }) : void 0;
  };
  // * Настройки анимации для состояния
  _.getXAnimaParamsForState = function(state, id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return null;
    }
    return data[state];
  };
  // * Настройки анимации для действия
  _.getXAnimaParamsForAction = function(actionName, setId) {
    var data;
    data = this.getXAnimaActionList(setId);
    return data != null ? data.find(function(a) {
      return a.name === actionName;
    }) : void 0;
  };
  // * Часть анимации (слой) по имени
  _.getXAnimaPartById = function(id) {
    var data;
    data = this.animationPartsDB();
    return data != null ? data.find(function(a) {
      return a.id === id;
    }) : void 0;
  };
  
  // * Конвертировать массив Actions из параметров плагина в более компактный вид
  _.convertActionsFromParameters = function(actions) {
    var action, i, item, len, shrinked;
    shrinked = [];
    for (i = 0, len = actions.length; i < len; i++) {
      action = actions[i];
      item = action.animation;
      item.name = action.name;
      shrinked.push(item);
    }
    return shrinked;
  };
  _.createXAnimaSetForAction = function(id, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 2, null, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForMove = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 0, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForIdle = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 1, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _._createXAnimaSetFromParams = function(id, type, state, params) {
    var animaSet, e, filename, frames, is8Way, isOneDirection, speed;
    try {
      ({frames, speed, isOneDirection, is8Way} = params);
      if (type === 2) { // * Action
        filename = this.createFilenameForAnimaAction(id, params.name);
      } else {
        filename = this.createFilenameForAnimaState(id, state, type);
      }
      animaSet = new XAnimaSet(type, filename, frames, speed, isOneDirection, is8Way);
      animaSet.dx = params.dx || 0;
      animaSet.dy = params.dy || 0;
      if (params.expandFirstFrame > 0) {
        animaSet.expandFirstFrameTimes(params.expandFirstFrame);
      }
      if (type === 2) {
        // * Задать имя действия
        animaSet.setActionName(params.name);
      }
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createFilenameForAnimaState = function(id, state, type) {
    var path;
    path = id + "/";
    if (state !== 'base') {
      path += state + "/";
    }
    if (type === 0) {
      path += "Move";
    } else {
      path += "Idle";
    }
    return path;
  };
  _.createFilenameForAnimaAction = function(id, name) {
    var path;
    path = id + "/Actions/" + name;
    return path;
  };
  _.createFilenameForAnimaPart = function(id, name, isRelative) {
    var path;
    if (isRelative) {
      path = id + "/Layers/" + name + "/";
    } else {
      path = "CommonLayers/" + name + "/";
    }
    return path;
  };
  _.createXAnimaPart = function(id, partName, isRelative = false) {
    var animaPartSet, e, params;
    try {
      params = this.getXAnimaPartById(partName);
      if (params == null) {
        return null;
      }
      animaPartSet = this._createXAnimaPartFromParams(id, partName, params, isRelative);
      return animaPartSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * isRelative - относительно ID анимации, например Harold\Parts\hat
  // * Если isRealtive = false, то будет Parts\hat
  _._createXAnimaPartFromParams = function(axId, partName, params, isRelative = false) {
    var actionRules, animaPart, baseRule, e, filename, i, idleRule, isLowerBodyPart, layerRule, len, moveRule, rule, sortingLevel;
    try {
      ({isLowerBodyPart, sortingLevel, baseRule, moveRule, idleRule, actionRules, layerRule} = params);
      filename = this.createFilenameForAnimaPart(axId, partName, isRelative);
      animaPart = new XAnimaPart(filename, isLowerBodyPart, sortingLevel);
      animaPart.directionsLevels = this._convertLayerRuleToDirectionLevels(layerRule);
      if (baseRule != null) {
        animaPart.setDefaultRule(baseRule.isHaveDirections, baseRule.isHaveFrames);
      }
      if (moveRule != null) {
        animaPart.setRuleForMovement(moveRule.isHaveDirections, moveRule.isHaveFrames);
      }
      if (idleRule != null) {
        animaPart.setRuleForIdle(idleRule.isHaveDirections, idleRule.isHaveFrames);
      }
      try {
        for (i = 0, len = actionRules.length; i < len; i++) {
          rule = actionRules[i];
          if (rule == null) {
            continue;
          }
          if (rule.enabled === false) {
            animaPart.disableForAction(rule.actionName);
          } else {
            animaPart.setRuleForAction(rule.actionName, rule.actionRule.isHaveDirections, rule.actionRule.isHaveFrames, rule.fileName);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return animaPart;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * Преобразовать структуру LAnimaXPartDirLevel в массив directionsLevels для слоя
  _._convertLayerRuleToDirectionLevels = function(layerRule) {
    return [layerRule.dirD, layerRule.dirL, layerRule.dirR, layerRule.dirU, layerRule.dirDL, layerRule.dirDR, layerRule.dirUL, layerRule.dirUR, layerRule.noDir];
  };
})();

// ■ END XAnimaTools.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x235f=['1hJaOxR','112Vcdjin','21145GPpxpq','expandFirstFrame','5638uGkXot','yzLno','warn','_createXAnimaSetFromParams','WLSgd','17wWaUTI','666239uXlBqV','586617TTtfVZ','itwrs','fLvUA','name','668147mxjshP','createFilenameForAnimaState','3781xUDrqM','expandFirstFrameTimes','setActionName','createFilenameForAnimaAction','fxYwf','776652QTpvfu','1dCUNVL','20kanyvT'];var a0_0x509a=function(_0x22ba07,_0x50036b){_0x22ba07=_0x22ba07-0x19b;var _0x235f90=a0_0x235f[_0x22ba07];return _0x235f90;};var a0_0x5636b4=a0_0x509a;(function(_0x367cb6,_0x39bbac){var _0x472e7d=a0_0x509a;while(!![]){try{var _0x143ba9=-parseInt(_0x472e7d(0x1a1))*-parseInt(_0x472e7d(0x1ab))+-parseInt(_0x472e7d(0x1ac))+-parseInt(_0x472e7d(0x1a2))*parseInt(_0x472e7d(0x1a5))+parseInt(_0x472e7d(0x1b0))*parseInt(_0x472e7d(0x19f))+parseInt(_0x472e7d(0x1a0))*-parseInt(_0x472e7d(0x1a3))+parseInt(_0x472e7d(0x19e))+-parseInt(_0x472e7d(0x1aa))*parseInt(_0x472e7d(0x1b2));if(_0x143ba9===_0x39bbac)break;else _0x367cb6['push'](_0x367cb6['shift']());}catch(_0x26e51a){_0x367cb6['push'](_0x367cb6['shift']());}}}(a0_0x235f,0x6311c),XAnimaTools[a0_0x5636b4(0x1a8)]=function(_0x1ddf1b,_0x435150,_0xef58a7,_0x306591){var _0xec437=a0_0x5636b4,_0x3a51dd,_0x5f41cb,_0x2fbd7f,_0x573413,_0x59aaa9,_0x5cdafe;try{({frames:_0x573413,speed:_0x5cdafe,isOneDirection:_0x59aaa9}=_0x306591);if(_0x435150===0x2)_0x2fbd7f=this[_0xec437(0x19c)](_0x1ddf1b,_0x306591['name']);else{if(_0xec437(0x1ae)==='fLvUA')_0x2fbd7f=this[_0xec437(0x1b1)](_0x1ddf1b,_0xef58a7,_0x435150);else{function _0x1cefbe(){var _0x5cab37=_0xec437;_0x166210=this[_0x5cab37(0x19c)](_0x5a5849,_0x4024a1[_0x5cab37(0x1af)]);}}}_0x3a51dd=new XAnimaSet(_0x435150,_0x2fbd7f,_0x573413,_0x5cdafe,_0x59aaa9,![]),_0x3a51dd['dx']=_0x306591['dx']||0x0,_0x3a51dd['dy']=_0x306591['dy']||0x0;if(_0x306591[_0xec437(0x1a4)]>0x0){if(_0xec437(0x1ad)==='itwrs')_0x3a51dd[_0xec437(0x1b3)](_0x306591[_0xec437(0x1a4)]);else{function _0x2796d1(){var _0x53e283=_0xec437;_0x7d272d=this[_0x53e283(0x1b1)](_0x34dd97,_0x30cd98,_0x1594c0);}}}if(_0x435150===0x2){if(_0xec437(0x1a6)!==_0xec437(0x1a9))_0x3a51dd[_0xec437(0x19b)](_0x306591['name']);else{function _0x12ef11(){return _0x2e988d=_0x1ebf54,_0x3a4e0c['warn'](_0x3d7346),null;}}}return _0x3a51dd;}catch(_0x16d160){if(_0xec437(0x19d)!=='rWxXW')return _0x5f41cb=_0x16d160,console[_0xec437(0x1a7)](_0x5f41cb),null;else{function _0x3408f7(){var _0x27a4a2=_0xec437;_0x15074c[_0x27a4a2(0x1b3)](_0x4d5191[_0x27a4a2(0x1a4)]);}}}});
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x3ed5=['9718cfFoCz','382210yCvFPG','_axAvailableActionsList','612428avBUON','registerAnimaXAction','59XFQlxP','10393CaMkUi','length','2ybYYxS','call','108497UQfovQ','434QOqPer','3kFPgQs','523yOmpME','185851VIUzwq','prototype','addNewXAnimPart','entries','2IyIllA'];var a0_0x3b7d=function(_0x5ca662,_0x47b369){_0x5ca662=_0x5ca662-0x1e2;var _0x3ed5df=a0_0x3ed5[_0x5ca662];return _0x3ed5df;};(function(_0x46b1b9,_0x4746ce){var _0xca6881=a0_0x3b7d;while(!![]){try{var _0x3f1ef4=-parseInt(_0xca6881(0x1eb))+parseInt(_0xca6881(0x1e2))*-parseInt(_0xca6881(0x1e3))+-parseInt(_0xca6881(0x1ea))*parseInt(_0xca6881(0x1e8))+-parseInt(_0xca6881(0x1e7))*parseInt(_0xca6881(0x1ef))+parseInt(_0xca6881(0x1f1))+-parseInt(_0xca6881(0x1f0))*parseInt(_0xca6881(0x1e9))+parseInt(_0xca6881(0x1f3))*parseInt(_0xca6881(0x1e5));if(_0x3f1ef4===_0x4746ce)break;else _0x46b1b9['push'](_0x46b1b9['shift']());}catch(_0x24b1fe){_0x46b1b9['push'](_0x46b1b9['shift']());}}}(a0_0x3ed5,0x51c32),function(){var _0x549a9a=a0_0x3b7d,_0x421f7d,_0x57cf70,_0xf3598b;_0xf3598b=Game_Character[_0x549a9a(0x1ec)],_0x57cf70=_0xf3598b[_0x549a9a(0x1f4)],_0xf3598b[_0x549a9a(0x1f4)]=function(_0x283ab5){var _0x473803=_0x549a9a;if(this[_0x473803(0x1f2)][_0x473803(0x1e4)]>=0x3)return;_0x57cf70['call'](this,_0x283ab5);},_0x421f7d=_0xf3598b['addNewXAnimPart'],_0xf3598b[_0x549a9a(0x1ed)]=function(_0x5b5df7,_0xeb07ba){var _0x1ef3d2=_0x549a9a;if(Object[_0x1ef3d2(0x1ee)](this['animaXParts'])[_0x1ef3d2(0x1e4)]>=0x3)return;_0x421f7d[_0x1ef3d2(0x1e6)](this,_0x5b5df7,_0xeb07ba);};}());
})();

//Plugin PKD_AnimaX automatic build by PKD PluginBuilder 1.9.2 20.03.2021
