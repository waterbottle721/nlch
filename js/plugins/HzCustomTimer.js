/*:
 * @plugindesc タイマーの表示を変更します。
 * @author hiz
 *
 * @help
 * タイマーの表示を短時間の計測に適した表示に切り替えます。
 * ※ 計測時間は99秒以内推奨です。分表示には対応していません。
 *
 * 　プラグインコマンド:
 *   HzTimer on                 # タイマーの表示をカスタム表示に切り替えます。（表示位置は画面右上）
 *   HzTimer on 406 312         # タイマーの表示をカスタム表示に切り替え、表示位置を画面中央に移動します。
 *   HzTimer off                # タイマーの表示を標準に戻します。（表示位置は画面右上に戻ります）
 */

;(function () {
  var parameters = PluginManager.parameters('HzCustomTimer')
  var customTimerFlg = false
  var timerX, timerY

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args)
    // スクリプトコマンド「HZTIMER」
    if (command.toUpperCase() === 'HZTIMER') {
      customTimerFlg = args[0].toUpperCase() === 'ON' ? true : false
      timerX = args[1] != null ? Number(args[1]) : Graphics.width - 48
      timerY = args[2] != null ? Number(args[2]) : 48
    }
  }

  var _Sprite_Timer_createBitmap = Sprite_Timer.prototype.createBitmap
  Sprite_Timer.prototype.createBitmap = function () {
    this.bitmap = new Bitmap(96, 96)
  }

  var _Sprite_Timer_initialize = Sprite_Timer.prototype.initialize
  Sprite_Timer.prototype.initialize = function () {
    _Sprite_Timer_initialize.call(this)
    this._frames = 0
    this._maxSec = 1
  }

  var _Sprite_Timer_updateBitmap = Sprite_Timer.prototype.updateBitmap
  Sprite_Timer.prototype.updateBitmap = function () {
    if (customTimerFlg) {
      if (this._frames !== $gameTimer.frames()) {
        this._maxSec = $gameTimer.maxSec()
        this._frames = $gameTimer.frames()
        this.redraw()
      }
    } else {
      _Sprite_Timer_updateBitmap.call(this)
    }
  }

  function drawArc(graphics, x, y, outerRadius, innerRadius, startAngle, endAngle, color) {
    graphics.beginFill(color);
    graphics.lineStyle(0); // 无线条样式
    // 绘制外圈
    graphics.drawCircle(x, y, outerRadius);
    // 使用 BLEND_MODES.DST_OUT 来挖空内圈
    if (innerRadius > 0) {
      graphics.beginFill(0x000000, 1);
      graphics.drawCircle(x, y, innerRadius);
      graphics.endFill();
    }
    graphics.endFill();
  }

  var _Sprite_Timer_redraw = Sprite_Timer.prototype.redraw
Sprite_Timer.prototype.redraw = function() {
  if (customTimerFlg) {
    var sec = Math.ceil(this._frames / 60);
    var width = this.bitmap.width;
    var height = this.bitmap.height;

    // 清除旧的 Bitmap
    this.bitmap.clear();

    // 获取 Bitmap 的 context
    var context = this.bitmap._context;

    var outerRadius = 30; // 外圈半径
    var innerRadius = outerRadius + 10; // 内圈半径，比外圈大10
    var lineWidth = 10; // 线条粗细，减小这个值会使圆环更细
	var startAngle = -Math.PI / 2;

    // 开始绘制环形
    context.save(); // 保存当前绘图状态
    context.beginPath();
	
    // 绘制计时环形
    var endAngle = startAngle + (sec * Math.PI * 2) / this._maxSec; // 计算结束角度
    context.beginPath();
    context.arc(width / 2, height / 2, innerRadius, startAngle, endAngle, false);
    context.lineWidth = lineWidth;
    context.strokeStyle = '#ff98f7';
    context.stroke();

    context.restore(); // 恢复之前保存的绘图状态

    // 强制 Bitmap 更新其基于 WebGL 的纹理
    this.bitmap._setDirty();

  } else {
    _Sprite_Timer_redraw.call(this);
  }
};





  var _Sprite_Timer_timerText = Sprite_Timer.prototype.timerText
  Sprite_Timer.prototype.timerText = function () {
    if (customTimerFlg) {
      var sec = Math.ceil(this._frames / 60)
      return sec
    } else {
      return _Sprite_Timer_timerText.call(this)
    }
  }

  var _Sprite_Timer_updatePosition = Sprite_Timer.prototype.updatePosition
  Sprite_Timer.prototype.updatePosition = function () {
    if (customTimerFlg) {
      this.x = timerX - this.bitmap.width / 2
      this.y = timerY - this.bitmap.height / 2
    } else {
      this.x = Graphics.width - this.bitmap.width
      this.y = -24
    }
  }

  var _Game_Timer_initialize = Game_Timer.prototype.initialize
  Game_Timer.prototype.initialize = function () {
    _Game_Timer_initialize.call(this)
    this._maxSec = 1
  }

  var _Game_Timer_start = Game_Timer.prototype.start
  Game_Timer.prototype.start = function (count) {
    _Game_Timer_start.call(this, count)
    this._maxSec = Math.floor(count / 60)
  }

  Game_Timer.prototype.frames = function () {
    return this._frames
  }

  Game_Timer.prototype.maxSec = function () {
    return this._maxSec
  }
})()
