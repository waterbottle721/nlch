//===========================================================================
// MPI_OneTimeParallelCommonEvent.js
//===========================================================================

/*:
 * @plugindesc 设置开关打开时只执行一次的并行公共事件。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param コモンイベントID
 * @text 公共事件ID
 * @desc 设置开关接通时只执行一次的并行公共事件的ID。可以用逗号分隔指定多个。
 * @default 
 *
 * @param イベント実行時にスイッチをOFFにする
 * @text 执行事件时关闭开关
 * @desc 执行公共事件时，关闭开关时设置true，不关闭时设置false。
 * @default false
 *
 * @help
 * [ 概要 ] ...
 *  设置开关接通时只执行一次的并行公共事件。
 *
 *  通常，在作为执行条件的开关ON的期间，
 *  并行处理中设定的公共事件被反复执行。
 *  抑制本插件设置的公共事件，只执行一次。
 *  想再次执行时，将开关置于OFF。
 *
 * [ 插件参数 ] ...
 *  コモンイベントID
 *    スイッチがONになったときに一度だけ実行する並列コモンイベントのIDを指定しま
 *    す。IDは、カンマ区切りで複数指定することができます。指定するコモンイベント
 *    は、トリガーを「並列処理」に設定しておいてください。
 *
 *  イベント実行時にスイッチをOFFにする
 *    このパラメータを true に設定すると、コモンイベントを実行すると同時に、その
 *    コモンイベントの実行条件に指定されたスイッチを、自動的にOFFにします。
 *
 * [ その他の仕様 ] ...
 *  本プラグインで指定されたコモンイベントは、イベント実行中にスイッチをOFFにし
 *  ても、イベントを最後まで実行し続けます。ただし、イベント実行中にスイッチを
 *  OFF→ONとした場合、イベントは最初から実行しなおされることになります。
 *
 * [ 插件命令 ] ...
 *  没有插件命令。
 *
 * [ 使用条款 ] ................................................................
 *  ・本插件的使用仅限于RPG工具MV/RPGMakerMV的正版用户。
 *  ・无论是商用、非商用、有偿、无偿、面向公众还是成人，均可使用。
 *  ・使用时不需要联系或报告。 另外，也不需要记载制作者姓名等。
 *  ・请勿以与导入插件的作品随附的形式以外的形式重新分发、转载。
 *  ・基本上不接受故障应对以外的支持和请求。
 *  ・对于本插件产生的任何问题，概不负责。
 * [ 改訂履歴 ] ................................................................
 *   Version 1.00  2016/11/09  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2016 Nekoma Otobuki
 */

var Imported = Imported || {};
Imported.MPI_OneTimeParallelCommonEvent = true;

var Makonet = Makonet || {};
Makonet.OPC = {};

(function(){
    'use strict';

    var OPC        = Makonet.OPC;
    OPC.product    = 'MPI_OneTimeParallelCommonEvent';
    OPC.parameters = PluginManager.parameters(OPC.product);
    OPC.commonId   = OPC.parameters['コモンイベントID'].trim().split(/ *, */).map(function(value){ return +value });
    OPC.autoOff    = OPC.parameters['イベント実行時にスイッチをOFFにする'] == 'true';

    function _(object) {
        return object[OPC.product] = object[OPC.product] || {};
    }

    //==============================================================================
    // Game_CommonEvent
    //==============================================================================

    (function(p, c) {
        var f = p[c]; p[c] = function(commonEventId) {
            _(this).isOneTime = OPC.commonId.contains(commonEventId);
            _(this)._active = [false, false];
            f.apply(this, arguments);
        };
    }(Game_CommonEvent.prototype, 'initialize'));
    
    (function(p, c) {
        var f = p[c]; p[c] = function() {
            f.apply(this, arguments);
            if (_(this).isOneTime) {
                if (!_(this)._active[0] && _(this)._active[1]) {
                    this._interpreter = new Game_Interpreter();
                    if (OPC.autoOff) {
                        $gameSwitches.setValue(this.event().switchId, false);
                    }
                }
            }
        };
    }(Game_CommonEvent.prototype, 'refresh'));
    
    (function(p, c) {
        var f = p[c]; p[c] = function() {
            var active = f.apply(this, arguments);
            if (_(this).isOneTime) {
                _(this)._active.push(active);
                _(this)._active.shift();
                return _(this).isRunning = _(this).isRunning || (!_(this)._active[0] && _(this)._active[1]);
            }
            return active;
        };
    }(Game_CommonEvent.prototype, 'isActive'));
    
    (function(p, c) {
        var f = p[c]; p[c] = function() {
            f.apply(this, arguments);
            if (_(this).isOneTime) {
                if (this._interpreter && !this._interpreter.isRunning()) {
                    this._interpreter = null;
                    _(this).isRunning = false;
                }
            }
        };
    }(Game_CommonEvent.prototype, 'update'));
}());
