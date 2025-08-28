Scene_Title.prototype = Object.create(Scene_Base.prototype);
 
Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
};
 
Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
};
