/*:ja
 * @plugindesc 前回の場所移動前の座標に戻ります
 * @author hiz
 *
 * @help
 * プラグインコマンド:
 *   Retrun                 # 前回の場所移動前の座標に戻ります。（デフォルト：向きはそのまま・デフォルト：黒フェード）
 *   Return -1              # 前回の場所移動前の座標に戻ります。（-1:前回移動前の向き・デフォルト：黒フェード）
 *   Return 8 2             # 前回の場所移動前の座標に戻ります。（8:下向き・2:フェードなし(0:黒フェード・1：白フェード・2：フェードなし））
 */


(function() {
	var parameters = PluginManager.parameters('Return');

	var _preMap = null;
	var _preX   = 0;
	var _preY   = 0;
	var _preD   = 2;

	// 場所移動前のマップID・座標・向きを記憶
	var _game_player_reserveTransfer = Game_Player.prototype.reserveTransfer;
	Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
		_preMap = $gameMap.mapId();
		_preX   = this._x;
		_preY   = this._y;
		_preD   = this._direction;
    	_game_player_reserveTransfer.call(this, mapId, x, y, d, fadeType);
	};

	// 前回の場所移動前のマップ・座標に移動
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Return') {
        	var dir = $gamePlayer._direction;
			var fadeType = 0;
			if(args.length >= 1) {
				var d = parseInt(args[0]);
				if(d == -1) dir = _preD;
				else if(d ==  0) dir = $gamePlayer._direction;
				else {
					dir = d;
				}
			}
			if(args.length >= 2) {
				fadeType = parseInt(args[1]);
			}
        	$gamePlayer.reserveTransfer(_preMap, _preX, _preY, dir, fadeType)
        }
    }
})();