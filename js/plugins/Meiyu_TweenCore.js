//=========================================================================
// Tween Core - 玫羽
//=========================================================================

/*:
 * @target MZ
 * @plugindesc
 * 图片&窗口万能缓动插件。
 * Version 1.2

 * @author 玫羽

 * @help
 * 可以高度自定义缓动方式（缓动函数）的图片、窗口插件。
 * 
 * 支持图片、窗口的任意属性进行缓动操作，当然一般来说缓动操作只能适用于数字类型
 * 的属性，包含但不限于：位置、大小、透明度等等，并且缓动函数也可以进行自定义。
 * 
 * 除了直接使用该插件进行简单的缓动操作外，由于本插件是将功能直接写入图片和窗口
 * 的底层逻辑，因此功能可以直接继承到任意现有的图片、窗口中，现有的所有图片及窗
 * 口均可以直接调用方法来实现自定义缓动操作。
 * 
 * 使用方式（简单）：
 * 在代码中获取任意图片或窗口对象后，调用其doTween方法，传入参数即可。
 * 
 * 例：
 * 创建新工程后，在任意事件下调用脚本事件，输入以下代码：
 * const bitmap = ImageManager.loadBitmapFromUrl("img/faces/Actor1.png");
 * const sprite = new Sprite(bitmap);
 * SceneManager._scene._spriteset._baseSprite.addChild(sprite);
 * sprite.doTween("x", 100);
 * 然后运行去游戏中看效果吧！
 * 
 * 更多的使用方法请参考以下论坛教程：
 * 
 * 
 * 当前版本只支持代码调用的方式使用，后续如果想到了更好的插件指令方式实现功能再
 * 更新插件。
 * 
 * 注：
 * 本插件可商用可改编，但商用需要和上方论坛地址联系我并在游戏中附上署名即可。
 * 其他情况不需要告知我。
 */

var Meiyu = Meiyu || {};
Meiyu.TweenCore = {};
Meiyu.TweenCore.pluginName = 'Meiyu_TweenCore';
Meiyu.TweenCore.parameters = PluginManager.parameters(Meiyu.TweenCore.pluginName);

//-----------------------------------------------------------------------------
// Meiyu_EasingFunc

function Meiyu_EasingFunc() {
    throw new Error("This is a static class");
}

Meiyu_EasingFunc.linear = function(x) {
    return x;
};

Meiyu_EasingFunc.inSine = function(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
};

Meiyu_EasingFunc.outSine = function(x) {
    return Math.sin((x * Math.PI) / 2);
};

Meiyu_EasingFunc.inOutSine = function(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
};

Meiyu_EasingFunc.inQuad = function(x) {
    return x * x;
};

Meiyu_EasingFunc.outQuad = function(x) {
    return 1 - (1 - x) * (1 - x);
};

Meiyu_EasingFunc.inOutQuad = function(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

Meiyu_EasingFunc.inCubic = function(x) {
    return x * x * x;
};

Meiyu_EasingFunc.outCubic = function(x) {
    return 1 - Math.pow(1 - x, 3);
};

Meiyu_EasingFunc.inOutCubic = function(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

Meiyu_EasingFunc.inQuart = function(x) {
    return x * x * x * x;
};

Meiyu_EasingFunc.outQuart = function(x) {
    return 1 - Math.pow(1 - x, 4);
};

Meiyu_EasingFunc.inOutQuart = function(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

Meiyu_EasingFunc.inQuint = function(x) {
    return x * x * x * x * x;
};

Meiyu_EasingFunc.outQuint = function(x) {
    return 1 - Math.pow(1 - x, 5);
};

Meiyu_EasingFunc.inOutQuint = function(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};

Meiyu_EasingFunc.inExpo = function(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};

Meiyu_EasingFunc.outExpo = function(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

Meiyu_EasingFunc.inOutExpo = function(x) {
    return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
};

Meiyu_EasingFunc.inCirc = function(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
};

Meiyu_EasingFunc.outCirc = function(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
};

Meiyu_EasingFunc.inOutCirc = function(x) {
    return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};

Meiyu_EasingFunc.inBack = function(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
};

Meiyu_EasingFunc.outBack = function(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

Meiyu_EasingFunc.inOutBack = function(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5
        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};

Meiyu_EasingFunc.inElastic = function(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
        ? 0
        : x === 1
        ? 1
        : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};

Meiyu_EasingFunc.outElastic = function(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

Meiyu_EasingFunc.inOutElastic = function(x) {
    const c5 = (2 * Math.PI) / 4.5;
    return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};

Meiyu_EasingFunc.inBounce = function(x) {
    return 1 - easeOutBounce(1 - x);
};

Meiyu_EasingFunc.outBounce = function(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
};

Meiyu_EasingFunc.inOutBounce = function(x) {
    return x < 0.5
        ? (1 - easeOutBounce(1 - 2 * x)) / 2
        : (1 + easeOutBounce(2 * x - 1)) / 2;
};


//-------------------------------------------------------------------------
// Meiyu_Tween

function Meiyu_Tween() {
    this.obj = null;
    this.isFinished = false;
    this.isTweening = false;
    this.paramName = "";
    this.originValue = 0;
    this.targetValue = 0;
    this.duration = 0;
    this.currentTime = 0;
    this.tValue = 0;
    this.easingFunc = null;
    this.onFinished = [];
}

Meiyu.TweenCore.updateTween = function(obj) {
    const deltaTime = Graphics._fpsMeter.fps * 0.001;
    obj._tweenArray = obj._tweenArray.filter(tween => {
        if (tween.isTweening) {
            tween.currentTime += deltaTime;
            tween.tValue = tween.currentTime / tween.duration;
            if (tween.currentTime >= tween.duration) {
                tween.currentTime = tween.duration;
                tween.tValue = 1;
                obj[tween.paramName] = tween.targetValue;
                obj.removeTween(tween.paramName, true);
            } else {
                const origin = tween.originValue;
                const target = tween.targetValue;
                const funcResult = tween.easingFunc.call(obj, tween.tValue);
                const next = origin + (target - origin) * funcResult;
                obj[tween.paramName] = next;
            }
        }
        return !tween.isFinished;
    });
    obj._tweenArray.push(...obj._tempTweenArray);
    obj._tempTweenArray = [];
};

Meiyu.TweenCore.clearTween = function(obj) {
    obj._tweenArray = [];
    obj._tempTweenArray = [];
};

Meiyu.TweenCore.tween = function(obj, paramName) {
    for (let index = 0; index < obj._tweenArray.length; index++) {
        const tween = obj._tweenArray[index];
        if (tween.paramName === paramName) return tween;
    }
    return null;
};

Meiyu.TweenCore.hasTween = function(obj, paramName) {
    return !!obj.tween(paramName);
};

Meiyu.TweenCore.doTween = function(obj, paramName, targetValue, duration, easingFunc = Meiyu_EasingFunc.inOutSine) {
    if (obj[paramName] !== undefined) {
        let tween = obj.tween(paramName);
        if (!tween) {
            tween = new Meiyu_Tween();
            tween.paramName = paramName;
            obj._tempTweenArray.push(tween);
        }
        tween.obj = obj;
        tween.originValue = obj[paramName];
        tween.targetValue = targetValue;
        tween.duration = duration > 0 ? duration : 0;
        tween.currentTime = 0;
        tween.tValue = 0;
        tween.easingFunc = easingFunc;
        tween.isTweening = true;
        return tween;
    }
    return null;
};

Meiyu.TweenCore.removeTween = function(obj, paramName, callOnFinished = false) {
    const tween = obj.tween(paramName);
    if (tween) {
        tween.isFinished = true;
        if (callOnFinished) {
            tween.onFinished.forEach(func => {
                func.call(obj, tween);
            });
        }
    }
};

//-------------------------------------------------------------------------
// Meiyu_TweenSequence

function Meiyu_TweenSequence() {
    this.initialize(...arguments);
}

Meiyu_TweenSequence.prototype.initialize = function() {
    this.clear();
};

Meiyu_TweenSequence.prototype.clear = function() {
    this._sequence = [];
    this._currentIndex = 0;
};

Meiyu_TweenSequence.prototype.append = function(obj, paramName, targetValue, duration, easingFunc) {
    this._sequence.push({ obj, paramName, targetValue, duration, easingFunc });
};

Meiyu_TweenSequence.prototype.insert = function(index, obj, paramName, targetValue, duration, easingFunc) {
    this._sequence.splice(index, 0, {obj, paramName, targetValue, duration, easingFunc});
};

Meiyu_TweenSequence.prototype.play = function() {
    if (this._currentIndex < this._sequence.length) {
        const item = this._sequence[this._currentIndex];
        const sequence = this;
        item.obj.doTween(
            item.paramName,
            item.targetValue,
            item.duration,
            item.easingFunc
        ).onFinished.push(function() {
            sequence._currentIndex++;
            sequence.play();
        });
    }
};

Meiyu_TweenSequence.prototype.stop = function() {
    const item = this._sequence[this._currentIndex];
    item.obj.removeTween(item.paramName);
};


(() => {
    //-------------------------------------------------------------------------
    // Sprite

    const _Sprite_initialize = Sprite.prototype.initialize;
    Sprite.prototype.initialize = function(bitmap) {
        _Sprite_initialize.apply(this, arguments);
        this.clearTween();
    };

    const _Sprite_update = Sprite.prototype.update;
    Sprite.prototype.update = function() {
        _Sprite_update.apply(this, arguments);
        Meiyu.TweenCore.updateTween(this);
    };

    Sprite.prototype.clearTween = function() {
        Meiyu.TweenCore.clearTween(this);
    };

    Sprite.prototype.tween = function(paramName) {
        return Meiyu.TweenCore.tween(this, paramName);
    };

    Sprite.prototype.hasTween = function(paramName) {
        return Meiyu.TweenCore.hasTween(this, paramName);
    };

    Sprite.prototype.doTween = function(paramName, targetValue, duration, easingFunc = Meiyu_EasingFunc.inOutSine) {
        return Meiyu.TweenCore.doTween(this, paramName, targetValue, duration, easingFunc);
    };

    Sprite.prototype.removeTween = function(paramName, callOnFinished = false) {
        Meiyu.TweenCore.removeTween(this, paramName, callOnFinished);
    };


    //-------------------------------------------------------------------------
    // Window

    const _Window_initialize = Window.prototype.initialize;
    Window.prototype.initialize = function() {
        _Window_initialize.apply(this, arguments);
        this.clearTween();
    };

    const _Window_update = Window.prototype.update;
    Window.prototype.update = function() {
        _Window_update.apply(this, arguments);
        Meiyu.TweenCore.updateTween(this);
    };

    Window.prototype.clearTween = function() {
        Meiyu.TweenCore.clearTween(this);
    };

    Window.prototype.tween = function(paramName) {
        return Meiyu.TweenCore.tween(this, paramName);
    };

    Window.prototype.hasTween = function(paramName) {
        return Meiyu.TweenCore.hasTween(this, paramName);
    };

    Window.prototype.doTween = function(paramName, targetValue, duration, easingFunc = Meiyu_EasingFunc.inOutSine) {
        return Meiyu.TweenCore.doTween(this, paramName, targetValue, duration, easingFunc);
    };

    Window.prototype.removeTween = function(paramName, callOnFinished = false) {
        Meiyu.TweenCore.removeTween(this, paramName, callOnFinished);
    };

    
})();

/*----------------------------------------------------------
 * shakeSprite(sprite, opt)
 *   sprite : 要抖动的 Sprite（如 hud）
 *   opt    : {times, amplitude, dur} 皆可省略
 *---------------------------------------------------------*/
function shakeSprite(sprite, opt = {}) {
  if (!sprite || typeof sprite.doTween !== 'function') return;
  if (sprite._shaking) return;                    // 防止叠加
  sprite._shaking = true;

  const TIMES = opt.times      ?? 10;             // 抖动次数
  const AMP   = opt.amplitude  ?? 10;             // 抖幅 (px)
  const DUR   = opt.dur        ?? 0.03;           // 单段时长 (秒)

  const ox = sprite.x, oy = sprite.y;             // 记原坐标
  let count = 0;

  const nextStep = () => {
    if (count >= TIMES) {
      // 最后一次：回到原点后结束
      sprite.doTween("x", ox, DUR);
      sprite.doTween("y", oy, DUR)
            .onFinished.push(() => { sprite._shaking = false; });
      return;
    }

    // 产生随机方向
    const a  = Math.random() * Math.PI * 2;
    const dx = Math.cos(a) * AMP;
    const dy = Math.sin(a) * AMP;

    // tween 到随机点 → tween 回原点 → 回调进入下一轮
    sprite.doTween("x", ox + dx, DUR);
    const tw = sprite.doTween("y", oy + dy, DUR);
    tw.onFinished.push(() => {
      sprite.doTween("x", ox, DUR);
      sprite.doTween("y", oy, DUR)
            .onFinished.push(() => { count++; nextStep(); });
    });
  };

  nextStep();                                     // 启动序列
}
