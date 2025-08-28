//=============================================================================
// DescriptionExtend.js
// ----------------------------------------------------------------------------
// (C)2015-2018 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2018/05/22 プラグインの機能を無効化するスイッチを追加
// 1.0.0 2018/05/20 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:ja
 * @plugindesc DescriptionExtendPlugin
 * @author triacontane
 *
 * @param swapDescription
 * @desc 元の説明文を無視してメモ欄の値で置き換えます。OFFの場合は元の説明文の次行に表示されます。
 * @default true
 * @type boolean
 *
 * @param helpLines
 * @desc ヘルプウィンドウの高さを変更したい場合は指定してください。0の場合は何もしません。
 * @default 0
 * @type number
 *
 * @param validSwitch
 * @desc 指定した番号のスイッチがONのときのみプラグインが有効になります。0の場合は常に有効になります。
 * @default 0
 * @type switch
 *
 * @param notePrefix
 * @desc 他のプラグインとメモ欄もしくはプラグインコマンドの名称が被ったときに指定する接頭辞です。通常は指定不要です。
 * @default
 *
 * @help DescriptionExtend.js
 *
 * ヘルプウィンドウの説明欄を拡張します。3行目以降を表示できるようになります。
 * メモ欄に以下の通り設定してください。
 * <ExtendDesc:aaa> // [aaa]を追加表示します。
 * <拡張説明:aaa>   // 同上
 *
 * This plugin is released under the MIT License.
 */
/*:
 * @plugindesc 说明扩展插件
 * @author トリアコンタン
 *
 * @param swapDescription
 * @text 说明置换
 * @desc 忽略原始说明文，用备注中的值替换。 如果它是OFF，它将显示在原始说明的下一行。 
 * @default true
 * @type boolean
 *
 * @param helpLines
 * @text 说明行数
 * @desc 指定是否要更改说明窗口的高度。0的情况下什么都不做。
 * @default 0
 * @type number
 *
 * @param validSwitch
 * @text 有效开关
 * @desc 仅在指定编号的开关为ON时插件才有效。如果为0，则始终有效。
 * @default 0
 * @type switch
 *
 * @param notePrefix
 * @text 备注字段前缀
 * @desc 当备注字段或插件命令的名称被其他插件覆盖时设置此前缀。通常不需要指定。
 * @default
 *
 * @help DescriptionExtend.js
 *
 * 展开说明窗口的描述部分。 将能够显示第三行和后续行。
 * 请在备注栏进行如下设置。
 * <ExtendDesc:aaa> // [aaa]添加显示行数。
 * <拡張説明:aaa>   // 同上
 *
 * 此插件没有插件命令。
 *
 * 使用条款:
 * 可擅自修改、重新发布给作者，使用方式(商用、18禁使用等)
 * 也没有限制。
 * 这个插件已经是你的了。
 */

(function() {
    'use strict';

    /**
     * Get database meta information.
     * @param object Database item
     * @param name Meta name
     * @returns {String} meta value
     */
    var getMetaValue = function(object, name) {
        var tagName = param.notePrefix + name;
        return object.meta.hasOwnProperty(tagName) ? convertEscapeCharacters(object.meta[tagName]) : null;
    };

    /**
     * Get database meta information.(for multi language)
     * @param object Database item
     * @param names Meta name array (for multi language)
     * @returns {String} meta value
     */
    var getMetaValues = function(object, names) {
        var metaValue;
        names.some(function(name) {
            metaValue = getMetaValue(object, name);
            return metaValue !== null;
        });
        return metaValue;
    };

    /**
     * Convert escape characters.(require any window object)
     * @param text Target text
     * @returns {String} Converted text
     */
    var convertEscapeCharacters = function(text) {
        var windowLayer = SceneManager._scene._windowLayer;
        return windowLayer ? windowLayer.children[0].convertEscapeCharacters(text.toString()) : text;
    };

    /**
     * Create plugin parameter. param[paramName] ex. param.commandPrefix
     * @param pluginName plugin name(EncounterSwitchConditions)
     * @returns {Object} Created parameter
     */
    var createPluginParameter = function(pluginName) {
        var paramReplacer = function(key, value) {
            if (value === 'null') {
                return value;
            }
            if (value[0] === '"' && value[value.length - 1] === '"') {
                return value;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        };
        var parameter     = JSON.parse(JSON.stringify(PluginManager.parameters(pluginName), paramReplacer));
        PluginManager.setParameters(pluginName, parameter);
        return parameter;
    };

    var param = createPluginParameter('DescriptionExtend');

    /**
     * Window_Help
     * 拡張説明を追記します。
     */
    var _Window_Help_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function(numLines) {
        _Window_Help_initialize.call(this, numLines || param.helpLines);
    };

    var _Window_Help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function(item) {
        _Window_Help_setItem.apply(this, arguments);
        if (!item || !this.isValidDescriptionExtend()) {
            return;
        }
        var extendText = getMetaValues(item, ['拡張説明', 'ExtendDesc']);
        if (extendText) {
            this.setText((param.swapDescription ? '' : this._text + '\n') + extendText);
        }
    };

    Window_Help.prototype.isValidDescriptionExtend = function() {
        return !param.validSwitch || $gameSwitches.value(param.validSwitch)
    };
})();
