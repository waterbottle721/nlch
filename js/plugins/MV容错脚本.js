/*: 
 * @plugindesc 当游戏出现文件缺失错误时，处理后续动作。
 * @author 同能网∮轻々言·№
 * 
 * @param Default Error Mode
 * @desc 设置默认的文件缺失错误处理模式。0: 报错停止游戏, 1: 报错不停止游戏, 2: 后台记录错误。
 * @type number
 * @min 0
 * @max 2
 * @default 0
 * 
 * @help
 * 插件命令:
 *   SetErrorMode 0      # 设置错误模式为0，报错并停止游戏
 *   SetErrorMode 1      # 设置错误模式为1，报错但游戏不停止
 *   SetErrorMode 2      # 设置错误模式为2，只在后台记录错误
 *                      （后台记录错误文件会以file_error.log的名称出现在游戏的文件夹中）
 *
 * 用法:
 *   使用上述插件命令来动态改变游戏出现文件缺失错误时的错误处理模式。
 *   你也可以在游戏事件中使用脚本调用来设置错误模式：
 *      $gameSystem.setFileErrorMode(0); // 报错并停止游戏
 *      $gameSystem.setFileErrorMode(1); // 报错但游戏不停止
 *      $gameSystem.setFileErrorMode(2); // 只在后台记录错误
 *
 */
var QYan = QYan || {};QYan.Eror = QYan.Eror || {};

var parameters = PluginManager.parameters('MV容错脚本');
var defaultErrorMode = Number(parameters['Default Error Mode'] || 0);

// --------------------------------------------------------------------------
// ● 定义文件缺失模式
// --------------------------------------------------------------------------
QYan.Eror.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	QYan.Eror.Game_System_initialize.call(this);this.setFileErrorMode(defaultErrorMode);
};
// --------------------------------------------------------------------------
// ● 插件指令
// --------------------------------------------------------------------------
var QYan_Eror_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    QYan_Eror_pluginCommand.call(this, command, args);
    if (command === 'SetErrorMode') {
        var mode = Number(args[0]);
        $gameSystem.setFileErrorMode(mode);
    }
};
// --------------------------------------------------------------------------
// ● 设置当前游戏的报错模式（0:报错且停止游戏、1:报错但不影响游戏、2:只在后台记录到文件）
// --------------------------------------------------------------------------
Game_System.prototype.setFileErrorMode = function(mode) {
	this.file_error_mode = mode || 0;
}
// --------------------------------------------------------------------------
// ● 捕获位图、音乐文件缺失
// --------------------------------------------------------------------------
ResourceHandler.createLoader = function(url, retryMethod, resignMethod, retryInterval) {
  return QYan.Eror.pushErrorFile.bind(QYan.Eror, url);
};
// --------------------------------------------------------------------------
// ● 错误信息显示行号等情况
// --------------------------------------------------------------------------
var QYan_Lineno_SceneManager_onError = SceneManager.onError;
SceneManager.onError = function(e) {
	if (e.lineno && e.filename) {
		this.errorMsg = e.filename.substr(e.filename.lastIndexOf('/') + 1).trim();;
		this.errorMsg += ' - ' + e.lineno + ':' + e.colno;
	}
	QYan_Lineno_SceneManager_onError.call(this, e);
};
SceneManager.errorMsg = '';
var QYan_Lineno_SceneManager_catchException = SceneManager.catchException;
SceneManager.catchException = function(e) {
	this.errorMsg = '';
	if (e instanceof Error) {
		if (!e.lineno && !e.filename) {
			var st = e.stack.split(' at ');
			for (var i = 1; i < st.length; i++) {
				if (st[i].indexOf('rpg_') == -1) {
					this.errorMsg = st[i].substr(0, st[i].indexOf('(')).trim();
					this.errorMsg += ' - ' + st[i].substr(st[i].lastIndexOf('/') + 1).trim();
					this.errorMsg = this.errorMsg.substr(0, this.errorMsg.length - 1);
					break;
				}
			}
		}
	}
	QYan_Lineno_SceneManager_catchException.call(this, e);
};
var QYan_Lineno_Graphics_makeErrorHtmn = Graphics._makeErrorHtml;
Graphics._makeErrorHtml = function(name, message) {
	var show_line = !message.includes("·"), message = message.replace("·","");
	var html = QYan_Lineno_Graphics_makeErrorHtmn.call(this, name, message);
	if (show_line) html += '<font color="#FFCC00">' + decodeURIComponent(SceneManager.errorMsg) + '</font>';
	return html;
};
var showError = function(message) {
	AudioManager.stopAll();SceneManager.stop();
	Graphics.printError('系统错误', message);throw new Error(message);
}
//--------------------------------------------------------------------------
QYan.Eror.ErrorFileNames = [];
QYan.Eror.ErrorFileLog = "file_error.log";
QYan.Eror.pushErrorFile = function(fileName) {
    if (!this.ErrorFileNames.includes(fileName)) {
        var message = '文件缺失 : ' + fileName;
        if (!$gameSystem || $gameSystem.file_error_mode == 0) {
            Graphics.printError('Loading Error', message);
            SceneManager.stop();
        } else if ($gameSystem.file_error_mode == 1) {
            alert(message);
        } else if ($gameSystem.file_error_mode == 2) {
            var fs = require('fs');
            var path = require('path');
            var logFilePath = path.join(path.dirname(process.mainModule.filename), this.ErrorFileLog);
            fs.appendFile(logFilePath, message + "\n", function(err) {
                if (err) {
                    console.error('无法写入文件错误日志:', err);
                }
            });
        }
        this.ErrorFileNames.push(fileName);
    }
}
