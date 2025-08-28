//=============================================================================
// BackUpDatabase.js
// ----------------------------------------------------------------------------
// (C)2015-2018 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.1 2018/05/13 1.1.0でエラーになる問題を修正
// 1.1.0 2018/05/13 バックアップフォルダを時間単位で作成できる機能を追加
// 1.0.0 2018/04/21 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc データバックアッププラグイン
 * @author トリアコンタン
 *
 * @param backUpPath
 * @text バックアップパス
 * @desc 文件的输出路径。可以使用相对路径和绝对路径。
 * @default /backup
 *
 * @param includeSave
 * @text セーブデータも含む
 * @desc 存档也会备份。
 * @default false
 * @type boolean
 *
 * @param timeUnit
 * @text 時間単位でフォルダ作成
 * @desc 启用后以时间为单位创建文件夹。如果禁用，则以日期为单位创建文件夹。
 * @default false
 * @type boolean
 *
 * @help BackUpDatabase.js
 *
 * 每次启动游戏时，将数据文件夹集复制到指定位置。
 * 文件夹按日期存储，没有上限。
 * 此插件仅在正常测试时有效。
 * 在正常游玩，战斗测试，事件测试和浏览器游戏中不做任何事情。
 *
 * 尽管我们已经对该插件的运行进行了彻底的测试，但是在出现问题时，
 * 该插件并不能总是保证项目的恢复。
 *
 * 该插件没有插件命令。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';

    if (!Utils.isNwjs()) {
        return;
    }

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

    var param = createPluginParameter('BackUpDatabase');
    var node  = {
        fs  : require('fs'),
        path: require('path')
    };

    //=============================================================================
    // SceneManager
    //  バックアップ処理を呼び出します。
    //=============================================================================
    var _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize      = function() {
        _SceneManager_initialize.apply(this, arguments);
        DataManager.backupAllData();
    };

    //=============================================================================
    // DataManager
    //  バックアップを実行します。
    //=============================================================================
    DataManager.backupAllData = function() {
        if (!Utils.isOptionValid('test') || this.isBattleTest() || this.isEventTest()) {
            return;
        }
        this.backupDataBase();
        this.backupRpgProject();
        if (param.includeSave) {
            this.backupSaveData();
        }
    };

    DataManager.backupDataBase = function() {
        var targetPath   = StorageManager.makeBackupDirectory('data');
        var originalPath = StorageManager.localDataDirectoryPath();
        StorageManager.copyAllFiles(originalPath, targetPath);
    };

    DataManager.backupRpgProject = function() {
        var targetPath   = StorageManager.getBackupRoot();
        var originalPath = StorageManager.getProjectRoot() + '/';
        StorageManager.copyFile(originalPath, targetPath, 'Game.rpgproject');
    };

    DataManager.backupSaveData = function() {
        var targetPath   = StorageManager.makeBackupDirectory('save');
        var originalPath = StorageManager.localFileDirectoryPath();
        StorageManager.copyAllFiles(originalPath, targetPath);
    };

    //=============================================================================
    // StorageManager
    //  バックアップに必要なファイルアクセス処理を提供します。
    //=============================================================================
    StorageManager.copyAllFiles = function(originalPath, targetPath) {
        var copyFile = this.copyFile.bind(this, originalPath, targetPath);
        node.fs.readdir(originalPath, function(error, list) {
            if (error || !list) {
                console.warn(error);
                return;
            }
            list.forEach(function(fileName) {
                copyFile(fileName);
            });
        });
    };

    StorageManager.copyFile = function(originalPath, targetPath, fileName) {
        node.fs.createReadStream(originalPath + fileName).pipe(node.fs.createWriteStream(targetPath + fileName));
    };

    StorageManager.getProjectRoot = function() {
        return node.path.dirname(process.mainModule.filename);
    };

    StorageManager.localDataDirectoryPath = function() {
        return node.path.join(this.getProjectRoot(), 'data/');
    };

    StorageManager.getBackupRoot = function() {
        var filePath = param.backUpPath;
        if (!filePath.match(/^[A-Z]:/)) {
            filePath = node.path.join(this.getProjectRoot(), filePath);
        }
        return filePath.match(/\/$/) ? filePath : filePath + '/';
    };

    StorageManager.getBackupPath = function(prefix) {
        var date = new Date();
        return `${prefix}_${date.getFullYear()}-${(date.getMonth() + 1).padZero(2)}-${date.getDate().padZero(2)}${this.getBackupTimePath()}/`;
    };

    StorageManager.getBackupTimePath = function() {
        if (!param.timeUnit) {
            return '';
        }
        var date = new Date();
        return `_${date.getHours().padZero(2)}${date.getMinutes().padZero(2)}${date.getSeconds().padZero(2)}`;
    };

    StorageManager.makeBackupDirectory = function(type) {
        var filePath = this.getBackupRoot();
        this.makeDirectoryIfNeed(filePath);
        filePath += this.getBackupPath(type);
        this.makeDirectoryIfNeed(filePath);
        return filePath;
    };

    StorageManager.makeDirectoryIfNeed = function(dirPath) {
        if (!node.fs.existsSync(dirPath)) {
            node.fs.mkdirSync(dirPath);
        }
    };
})();
