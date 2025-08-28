/*:
 * @plugindesc 鼠标贴图扩展——动态读取 $gameStrings.value(3) 来决定光标
 * @author 
 *
 * 你只需在游戏脚本/事件中修改第 36 号字符串表的值即可切换光标：
 *   $gameStrings.setValue(36, 'pointer');      // 系统“链接”光标
 *   $gameStrings.setValue(36, 'myCursor');     // 加载 img/pictures/myCursor.png
 *   $gameStrings.setValue(36, 'tiles/cursor'); // 加载 img/tiles/cursor.png
 *

 */
(function() {
    'use strict';

    // ----------------------------------------
    // SceneManager：每帧更新，读取 $gameStrings.value(36)
    // ----------------------------------------
  const _SceneManager_updateScene = SceneManager.updateScene;
  SceneManager.updateScene = function() {
    _SceneManager_updateScene.apply(this, arguments);
    if (!this._scene) return;
    // —— 新增：只有当 $gameStrings 真正就绪时才去 value()
    if (!$gameStrings || typeof $gameStrings.value !== 'function') return;

    // 读取第 3 号字符串作为 cursor 类型
    let raw = $gameStrings.value(36) || '';
    raw = raw.trim().toLowerCase();

    // 空或仅有空格时，回落到 “默认自动” 模式
    if (!raw) {
      Graphics.setPointerType('auto');
    } else {
      Graphics.setPointerType(raw);
    }
  };

    SceneManager.updateMousePointer = function() {
        const raw = $gameStrings.value(36) || 'auto';
        const typeStr = String(raw).toLowerCase();
        Graphics.setPointerType(typeStr);
    };

    // ----------------------------------------
    // Input/TouchInput：任何按键隐藏光标，鼠标移动恢复
    // ----------------------------------------
    const _Input_update = Input.update;
    Input.update = function() {
        const oldDate = this.date;
        _Input_update.apply(this, arguments);
        if (this.date !== oldDate) Graphics.setHiddenPointer(true);
    };

    const _TouchInput_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        _TouchInput_onMouseMove.apply(this, arguments);
        Graphics.setHiddenPointer(false);
    };

    // ----------------------------------------
    // Graphics：核心贴图逻辑
    // ----------------------------------------
    Graphics._PointerType   = 'auto';
    Graphics._hiddenPointer = false;

    // 隐藏或显示光标
    Graphics.setHiddenPointer = function(value) {
        this._hiddenPointer = !!value;
        this.updateMousePointer();
    };

    Graphics.setPointerType = function(rawValue) {
        // ---------- 新增：空或全空白时直接用 auto ----------
        let pointerType = String(rawValue || '').trim().toLowerCase();
        if (!pointerType) {
            pointerType = 'auto';
        }
        // --------------------------------------------------

        this._PointerType = null;
        const std = ['auto','none','default','pointer','crosshair','move','text','wait','help'];
        if (std.includes(pointerType)) {
            // 系统自带
            this._PointerType = pointerType;
            this.updateMousePointer();

        } else {
            // 当作图片文件名来处理
			/*
            let fileName = pointerType;
            if (!/\.[a-z]+$/i.test(fileName)) fileName += '.png';
            const base = fileName.includes('/') ? 'img/' : 'img/pictures/';
            const url  = base + fileName;
            const img  = new Image();
            img.onload  = () => {
                const hx = Math.floor(img.width  / 2);
                const hy = Math.floor(img.height / 2);
                this._PointerType = `url(${url}) ${hx} ${hy}, default`;
                this.updateMousePointer();
            };
            img.onerror = () => {
                this._PointerType = 'default';
                this.updateMousePointer();
            };
            img.src = url;
			*/
const folder = pointerType.indexOf('/') >= 0 ? '' : 'pictures/';
const noExt  = pointerType.replace(/\.[a-z]+$/i, '');   // 去扩展名
const bitmap = ImageManager.loadBitmap('img/' + folder, noExt); // 自动解密 .rpgmvp

bitmap.addLoadListener(function (bmp) {
    // ------- ① 加载失败时退回默认箭头 -------
    if (bmp.isError()) {
        Graphics._PointerType = 'default';
        Graphics.updateMousePointer();
        return;
    }

    // ------- ② 加载成功：生成 base64 DataURI -------
    var hx = Math.floor(bmp.width  / 2);   // 热点设在中心，可自行调整
    var hy = Math.floor(bmp.height / 2);
    var dataUrl = bmp._canvas.toDataURL('image/png');

    Graphics._PointerType = 'url(' + dataUrl + ') ' + hx + ' ' + hy + ', default';
    Graphics.updateMousePointer();
});		
        }
    };

    // 应用到页面
    Graphics.updateMousePointer = function() {
        const cursor = this._hiddenPointer ? 'none' : (this._PointerType || 'auto');
        let span = document.getElementById('MousePointer');
        if (!span) {
            const canvas = document.getElementById('GameCanvas');
            span = document.createElement('span');
            span.id = 'MousePointer';
            span.style.position = 'absolute';
            span.style.left = '0'; span.style.top = '0';
            span.style.width  = canvas.style.width;
            span.style.height = canvas.style.height;
            span.style.zIndex = 999;
            span.oncontextmenu = () => false;
            document.body.appendChild(span);
        }
        span.style.cursor = cursor;
    };

    // 窗口缩放时同步
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        const span = document.getElementById('MousePointer');
        if (span) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const canvas = document.getElementById('GameCanvas');
                span.style.width  = canvas.style.width;
                span.style.height = canvas.style.height;
            }, 200);
        }
    });
})();

