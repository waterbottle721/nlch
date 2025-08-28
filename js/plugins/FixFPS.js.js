//=============================================================================
 /*:
 * @plugindesc ------------------------------------------------------------
 * @author 
 */
//=============================================================================

(function() {
    var lastTime = 0;
    var frameDuration = 1000 / 60;

    // 重写 SceneManager 的 requestUpdate 方法来限制帧率
    var _SceneManager_requestUpdate = SceneManager.requestUpdate;
    SceneManager.requestUpdate = function() {
        var currentTime = performance.now();
        var deltaTime = currentTime - lastTime;

        if (deltaTime >= frameDuration) {
            lastTime = currentTime;
            _SceneManager_requestUpdate.call(this);
        } else {
            requestAnimationFrame(this.requestUpdate.bind(this));
        }
    };
})();