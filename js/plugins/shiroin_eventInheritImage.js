//=============================================================================
 /*:
 * @plugindesc 事件继承行走图图像
 * @author shiroin
 */
//=============================================================================

(function() {
    // 获取原始的 Game_Event.prototype.setupPage 方法
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    
    // 重写 Game_Event.prototype.setupPage 方法
    Game_Event.prototype.setupPage = function() {
        // 如果之前有事件页，并且当前事件页有注释标记 'Inherit Image'
        if (this._pageIndex > 0 && this.hasInheritImageComment()) {
            // 保存当前的图像设置
            var lastImage = this._characterName;
            var lastIndex = this._characterIndex;

            // 调用原始的 setupPage 方法
            _Game_Event_setupPage.call(this);

            // 恢复图像设置
            this.setImage(lastImage, lastIndex);
        } else {
            // 调用原始的 setupPage 方法
            _Game_Event_setupPage.call(this);
        }
    };

    // 新方法用于检查当前事件页是否有 'Inherit Image' 注释
    Game_Event.prototype.hasInheritImageComment = function() {
        var list = this.list();
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var command = list[i];
                if (command && command.code === 108 || command.code === 408) {
                    if (command.parameters[0].contains('Inherit Image')) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
})();

