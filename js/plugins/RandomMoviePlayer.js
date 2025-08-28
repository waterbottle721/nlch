/*:
 * @plugindesc 随机播放movies文件夹内视频
 * @author shiroin
 *
 * @help 
 * 
 * 插件指令:
 *  RandomMoviePlayer play  #开始播放一个随机视频
 *  视频播放期间可以通过单击确认键切换视频，双击确认键退出视频
 */

(function() {

    var lastSpacePress = 0;
    var spacePressCount = 0;

    function playRandomVideo() {
        var fs = require('fs');
        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        var moviesPath = path.join(base, 'movies');
        fs.readdir(moviesPath, function(err, files) {
            var webmFiles = files.filter(function(file) {
                return file.endsWith('.webm');
            });
            if (webmFiles.length > 0) {
                var randomIndex = Math.floor(Math.random() * webmFiles.length);
                var randomMovie = webmFiles[randomIndex];
                var moviePath = 'movies/' + randomMovie;
                Graphics.playVideo(moviePath);
            }
        });
    }

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'RandomMoviePlayer' && args[0] === 'play') {
            playRandomVideo();
        }
    };

    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.checkVideoSkip();
    };

    Scene_Map.prototype.checkVideoSkip = function() {
        if (Input.isTriggered('ok') || TouchInput.isCancelled()) {
            var now = performance.now();
            if (now - lastSpacePress < 500) { 
                spacePressCount++;
            } else {
                spacePressCount = 1;
            }
            lastSpacePress = now;

            if (spacePressCount === 1) {
                playRandomVideo();
            } else if (spacePressCount >= 2) {
                if (Graphics.isVideoPlaying()) {
                    Graphics._video.pause();
                    Graphics._onVideoEnd();
                }
            }
        }
    };

})();
