/*
Title: Mouse System
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.5.0
Release: 07.02.2022
First release: 11.09.2020
*/

/*ru
Название: Система Мыши
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.5.0
Релиз: 07.02.2022
Первый релиз: 11.09.2020
*/

/*:
 * @plugindesc v.1.5.0 [PRO] [MV|MZ] Allows you to change the mouse cursor, activate events by clicking, hovering, etc.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Mouse_System
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.5.0
 Release: 07.02.2022
 First release: 11.09.2020

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Instructions
 ###=========================================================================
 Use event comments to customize the display on mouse hover.

 1. Show icon when hovering over an event*
 <hover_icon: iconIndex>
 Replace iconIndex with the icon number or synonym (don't forget to customize them!)
 Example: <hover_icon: 4>
 Example: <hover_icon: talk>
 You can also use the eval function to specify the icon using Javascript!
 Example: <hover_icon: eval($gameVariables.value(1))>

 2. Start an event by clicking on it*
 <click_activate>

 3. Activate an event on mouse hover*
 <hover_activate>

 4. Replace cursor graphics when hovering over an event*
 <custom_cursor: filename>
 Replace filename with the name of the cursor file from the "img/system/" folder
 You can also use the eval function to specify the icon using Javascript!
 Example: <custom_cursor: eval($gameVariables.value(1))>

 5. Display image from "img/pictures/" folder*
 <hover_image: filename>
 Replace filename with the image filename
 Example: <hover_image: Actor1_1>
 You can also use the eval function to specify the image using Javascript!
 Example: <hover_image: eval($gameVariables.value(1))>

 6. Display window with text*
 <hover_window: [width|height|text]>
 width - Window width
 height - Window height
 text - text
 Example: <hover_window: [120|60|\i[2]Text]>
 You can also use the eval function to specify the text using Javascript!
 Example: <hover_window: [120|60|eval($gameVariables.value(1))]>

 7. Display text*
 <hover_text: text>
 Example: <hover_text: Test>
 You can also use the eval function to specify the text using Javascript!
 Example: <hover_text: eval($gameVariables.value(1))>

 * Note:
 Starting from version 1.3.0, it became possible to set conditions for display using Javascript,
 which are checked during mouse hover.

 Use an end tag to tell the plugin to check for a condition, which is written between 2 tags.
 Example: for icon 10, the condition is set that it will be displayed when switch 1 is on:
 <hover_icon: 10>
 $gameSwitches.value(1)
 </hover_icon>

 Example: for a window the condition is set that it will be displayed if the variable 1 is greater than 10:
 <hover_window: [100|72|Text]>
 $gameVariables.value(1) > 10
 </hover_window>

 Example: for the image, the condition is set that it will be displayed if the variable 1 is equal to 5:
 <hover_image: Actor1_2>
 $gameVariables.value(1) === 5
 </hover_image>

 Example: for the text, the condition is set that it will be displayed if switch 1 is on:
 <hover_text: Text>
 $gameSwitches.value(1)
 </hover_text>

 Example: to activate the event on click, the condition is set that the click will work if switch 1 is on:
 <click_activate>
 $gameSwitches.value(1)
 </click_activate>

 Example: to trigger the mouseover event, the condition is set that the mouseover will work if switch 1 is on:
 <hover_activate>
 $gameSwitches.value(1)
 </hover_activate>

 Example: for custom cursor set to condition that it will be displayed if switch 1 is on:
 <custom_cursor: filename>
 $gameSwitches.value(1)
 </custom_cursor>

 You can combine several of these comments to customize different data for different conditions.
 If you specify several of these settings, then the very first one that satisfies the condition will be used!

 ###=========================================================================
 ## See also
 ###=========================================================================
 1. Scroll Bar (https://dk-plugins.ru/events-glow/)
 Adds a scrollbar for lists. Width, position and color are customizable.

 2. Events Glow (https://dk-plugins.ru/events-glow/)
 Allows highlighting events on mouse hover.

 3. Pictures Glow (https://dk-plugins.ru/pictures-glow/)
 Allows highlighting pictures on mouse hover.

 ###=========================================================================
 ## License and terms of use
 ###=========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###===========================================================================
 ## Support
 ###===========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins



 * @param defaultCursor
 * @text Default Cursor
 * @desc Default cursor
 * @type file
 * @dir img/system/

 * @param iconSynonyms
 * @text Icon synonyms
 * @desc Icon synonyms
 * @type struct<IconSynonym>[]
 * @default []

 * @param transferIcon
 * @text Player transfer icon
 * @desc Automatic display of an icon when hovering over an event that contains this command. 0 - disable.
 * @type number
 * @min 0
 * @default 0

 * @param hoverTextFontSize
 * @text Font size for <hover_text>
 * @desc Font size for <hover_text>
 * @type number
 * @min 1
 * @default 26

 * @param destination
 * @text Destination sprite
 * @desc Setting the destination sprite (white square when clicking on the map)
 * @type struct<Destination>
 * @default {"type":"default","image":"","text":"{\"text\":\"HERE!\",\"fontFace\":\"default\",\"fontSize\":\"26\"}","offsetX":"0","offsetY":"0","color":"white","outlineColor":"default","blendMode":"1","scale":"1.00","animation":"{\"bounceRate\":\"20\",\"minOpacity\":\"16\",\"maxOpacity\":\"192\",\"minScale\":\"0.15\",\"maxScale\":\"1.50\"}"}

*/

/*:ru
 * @plugindesc v.1.5.0 [PRO] [MV|MZ] Позволяет изменять курсор мыши, активировать события нажатием, наведением и др.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Mouse_System
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.5.0
 Релиз: 07.02.2022
 Первый релиз: 11.09.2020

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Инструкции
 ###=========================================================================
 Используйте комментарии события, чтобы настроить отображение при наведении мыши.

 1. Отобразить иконку при наведении на событие*
 <hover_icon: iconIndex>
 Замените iconIndex на номер иконки или синоним (не забудьте их настроить!)
 Пример: <hover_icon: 4>
 Пример: <hover_icon: talk>
 Вы также можете использовать функцию eval, чтобы указать иконку с помощью Javascript!
 Пример: <hover_icon: eval($gameVariables.value(1))>

 2. Запустить событие нажатием на него*
 <click_activate>

 3. Запустить событие наведением мыши*
 <hover_activate>

 4. Заменить графику курсора при наведении на событие*
 <custom_cursor: filename>
 Замените filename на название файла курсора из папки "img/system/"
 Вы также можете использовать функцию eval, чтобы указать иконку с помощью Javascript!
 Пример: <custom_cursor: eval($gameVariables.value(1))>

 5. Отобразить изображение из папки "img/pictures/"*
 <hover_image: filename>
 filename - Название файла
 Пример: <hover_image: Actor1_1>
 Вы также можете использовать функцию eval, чтобы указать изображение с помощью Javascript!
 Пример: <hover_image: eval($gameVariables.value(1))>

 6. Отобразить окно с текстом*
 <hover_window: [width|height|text]>
 width - Ширина окна
 height - Высота окна
 text - Текст
 Пример: <hover_window: [120|60|\i[2]Text]>
 Вы также можете использовать функцию eval, чтобы указать текст с помощью Javascript!
 Пример: <hover_window: [120|60|eval($gameVariables.value(1))]>

 7. Отобразить текст*
 <hover_text: text>
 Пример: <hover_text: Test>
 Вы также можете использовать функцию eval, чтобы указать текст с помощью Javascript!
 Пример: <hover_text: eval($gameVariables.value(1))>

 * Заметка:
 Начиная с версии 1.3.0 появилась возможность устанавливать условия для отображения с помощью Javascript,
 которые проверяются во время наведения мыши.

 Используйте закрывающий тег, чтобы дать плагину понять, что необходимо проверить условие,
 которое записано между 2 тегами.
 Пример: для 10 иконки задано условие, что она будет отображаться при включенном переключателе 1:
 <hover_icon: 10>
 $gameSwitches.value(1)
 </hover_icon>

 Пример: для окна задано условие, что оно будет отображаться, если переменная 1 больше 10:
 <hover_window: [100|72|Text]>
 $gameVariables.value(1) > 10
 </hover_window>

 Пример: для изображения задано условие, что оно будет отображаться, если переменная 1 равна 5:
 <hover_image: Actor1_2>
 $gameVariables.value(1) === 5
 </hover_image>

 Пример: для текста задано условие, что он будет отображаться, если переключатель 1 включен:
 <hover_text: Text>
 $gameSwitches.value(1)
 </hover_text>

 Пример: для активации события по нажатию задано условие, что нажатие будет работать, если переключатель 1 включен:
 <click_activate>
 $gameSwitches.value(1)
 </click_activate>

 Пример: для активации события наведением мыши задано условие, что наведение будет работать, если переключатель 1 включен:
 <hover_activate>
 $gameSwitches.value(1)
 </hover_activate>

 Пример: для пользовательского курсора задано условие, что он будет отображаться, если переключатель 1 включен:
 <custom_cursor: filename>
 $gameSwitches.value(1)
 </custom_cursor>

 Вы можете комбинировать несколько подобных комментариев, чтобы настраивать разные данные под разные условия.
 Если задать несколько таких настроек, то использоваться будет самая первая, которая удовлетворяет условию!

 ###=========================================================================
 ## Смотрите также
 ###=========================================================================
 1. Полоса прокрутки (https://dk-plugins.ru/ru/events-glow/)
 Добавляет полосу прокрутки для списков. Ширина, положение и цвет настраиваются.

 2. Свечение Событий (https://dk-plugins.ru/ru/events-glow/)
 Позволяет подсвечивать события при наведении мыши.

 3. Свечение Изображений (https://dk-plugins.ru/ru/pictures-glow/)
 Позволяет подсвечивать изображения при наведении мыши.

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins



 * @param defaultCursor
 * @text Стандартный курсор
 * @desc Стандартный курсор
 * @type file
 * @dir img/system/

 * @param iconSynonyms
 * @text Синонимы иконок
 * @desc Синонимы иконок
 * @type struct<IconSynonym>[]
 * @default []

 * @param transferIcon
 * @text Иконка перемещения игрока
 * @desc Автоматическое отображение иконки при наведении на событие, которое содержит эту команду. 0 - отключить.
 * @type number
 * @min 0
 * @default 0

 * @param hoverTextFontSize
 * @text Размер шрифта для <hover_text>
 * @desc Размер шрифта для <hover_text>
 * @type number
 * @min 1
 * @default 26

 * @param destination
 * @text Спрайт пункта назначения
 * @desc Настройка спрайта пункта назначения (белый квадрат при клике мышкой по карте)
 * @type struct<Destination>
 * @default {"type":"default","image":"","text":"{\"text\":\"HERE!\",\"fontFace\":\"default\",\"fontSize\":\"26\"}","offsetX":"0","offsetY":"0","color":"white","outlineColor":"default","blendMode":"1","scale":"1.00","animation":"{\"bounceRate\":\"20\",\"minOpacity\":\"16\",\"maxOpacity\":\"192\",\"minScale\":\"0.15\",\"maxScale\":\"1.50\"}"}

*/

/*~struct~IconSynonym:

 * @param iconIndex
 * @text Icon index
 * @desc Icon index
 * @type number
 * @min 1
 * @default 1

 * @param synonym
 * @text Synonym
 * @desc Synonym

*/

/*~struct~IconSynonym:ru

 * @param iconIndex
 * @text Номер иконки
 * @desc Номер иконки
 * @type number
 * @min 1
 * @default 1

 * @param synonym
 * @text Синоним
 * @desc Синоним

*/

/*~struct~Destination:

 * @param type
 * @text Type
 * @desc Type
 * @type select
 * @option default
 * @option hide
 * @option square
 * @option box
 * @option circle
 * @option donut
 * @option text
 * @option image
 * @default default

 * @param image
 * @text Image
 * @parent type
 * @desc Image. ONLY for type="image".
 * @type file
 * @dir img/
 * @require 1

 * @param text
 * @text Text
 * @parent type
 * @desc Text settings. ONLY for type="text".
 * @type struct<DestinationText>
 * @default {"text":"HERE!","fontFace":"default","fontSize":"26"}

 * @param offsetX
 * @text Offset X
 * @desc Offset X
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param offsetY
 * @text Offset Y
 * @desc Offset Y
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param color
 * @text Color
 * @desc Color in format HEX, RGB or RGBA
 * @type combo
 * @option white
 * @default white

 * @param outlineColor
 * @text Outline color
 * @desc Outline color. Color in format HEX, RGB or RGBA.
 * @type combo
 * @option default
 * @default default

 * @param blendMode
 * @text Blend mode
 * @desc Blend mode
 * @type select
 * @option normal
 * @value 0
 * @option add
 * @value 1
 * @default 1

 * @param scale
 * @text Scale
 * @desc Scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.00

 * @param animation
 * @text Animation
 * @desc Animation settings
 * @type struct<DestinationAnimation>
 * @default {"bounceRate":"20","minOpacity":"16","maxOpacity":"192","minScale":"0.15","maxScale":"1.50"}

*/

/*~struct~Destination:ru

 * @param type
 * @text Тип
 * @desc Тип
 * @type select
 * @option стандартный
 * @value default
 * @option скрыть
 * @value hide
 * @option квадрат
 * @value square
 * @option ящик
 * @value box
 * @option круг
 * @value circle
 * @option пончик
 * @value donut
 * @option текст
 * @value text
 * @option изображение
 * @value image
 * @default default

 * @param image
 * @text Изображение
 * @parent type
 * @desc Изображение. ТОЛЬКО для тип="image".
 * @type file
 * @dir img/
 * @require 1

 * @param text
 * @text Текст
 * @parent type
 * @desc Настройки текста. ТОЛЬКО для тип="text".
 * @type struct<DestinationText>
 * @default {"text":"СЮДА!","fontFace":"default","fontSize":"26"}

 * @param offsetX
 * @text Смещение по X
 * @desc Смещение по X
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param offsetY
 * @text Смещение по Y
 * @desc Смещение по Y
 * @type number
 * @min -9999
 * @max 99999
 * @default 0

 * @param color
 * @text Цвет
 * @desc Цвет в формате HEX, RGB или RGBA
 * @type combo
 * @option white
 * @default white

 * @param outlineColor
 * @text Цвет контура
 * @desc Цвет контура. Цвет в формате HEX, RGB или RGBA.
 * @type combo
 * @option default
 * @default default

 * @param blendMode
 * @text Режим смешивания
 * @desc Режим смешивания
 * @type select
 * @option normal
 * @value 0
 * @option add
 * @value 1
 * @default 1

 * @param scale
 * @text Масштабирование
 * @desc Масштабирование
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.00

 * @param animation
 * @text Анимация
 * @desc Настройки анимации
 * @type struct<DestinationAnimation>
 * @default {"bounceRate":"20","minOpacity":"16","maxOpacity":"192","minScale":"0.15","maxScale":"1.50"}

*/

/*~struct~DestinationText:

 * @param text
 * @text Text
 * @desc Text
 * @default HERE!

 * @param fontFace
 * @text Font face
 * @desc Font face
 * @type combo
 * @option default
 * @default default

 * @param fontSize
 * @text Font size
 * @desc Font size
 * @type number
 * @min 1
 * @default 26

*/

/*~struct~DestinationText:ru

 * @param text
 * @text Текст
 * @desc Текст
 * @default СЮДА!

 * @param fontFace
 * @text Шрифт
 * @desc Шрифт
 * @type combo
 * @option default
 * @default default

 * @param fontSize
 * @text Размер шрифта
 * @desc Размер шрифта
 * @type number
 * @min 1
 * @default 26

*/

/*~struct~DestinationAnimation:

 * @param bounceRate
 * @text Bounce rate
 * @desc Bounce effect rate. Less is faster.
 * @type number
 * @min 1
 * @default 20

 * @param minOpacity
 * @text Min opacity
 * @desc Minimum opacity
 * @type number
 * @min 0
 * @default 16

 * @param maxOpacity
 * @text Max opacity
 * @desc Maximum opacity
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param minScale
 * @text Min scale
 * @desc Minimum scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 0.15

 * @param maxScale
 * @text Max scale
 * @desc Maximum scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.50

*/

/*~struct~DestinationAnimation:ru

 * @param bounceRate
 * @text Коэффициент отскока
 * @desc Коэффициент эффекта отскока. Меньше - быстрее.
 * @type number
 * @min 1
 * @default 20

 * @param minOpacity
 * @text Минимальная прозрачность
 * @desc Минимальная прозрачность
 * @type number
 * @min 0
 * @default 16

 * @param maxOpacity
 * @text Максимальная прозрачность
 * @desc Максимальная прозрачность
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param minScale
 * @text Минимальный масштаб
 * @desc Минимальный масштаб
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 0.15

 * @param maxScale
 * @text Максимальный масштаб
 * @desc Максимальный масштаб
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.50

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Mouse_System'] = '1.5.0'; // eslint-disable-line padding-line-between-statements

//===========================================================================
// initialize parameters
//===========================================================================

const MouseSystemParams = (function() {

    function parse(string) {
        try {
            return JSON.parse(string, function(key, value) {
                if (typeof string === 'number' || typeof string === 'boolean') {
                    return string;
                }

                try {
                    if (Array.isArray(value)) {
                        return value.map(val => parse(val));
                    }

                    return parse(value);
                } catch (e) {
                    return value;
                }
            });
        } catch (e) {
            return string;
        }
    }

    const parameters = PluginManager.parameters('DK_Mouse_System');

    return Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = parse(value);

        return acc;
    }, {});

})();

if (!MouseSystemParams.destination) {
    MouseSystemParams.destination = { type: 'default' };
}

MouseSystemParams.findHoverData = function(array) {
    return array.find((data) => {
        if (data.condition) {
            try {
                return eval(data.condition);
            } catch (e) {
                return false;
            }
        }

        return true;
    });
};

//===========================================================================
// TouchInput
//===========================================================================

// methods

const MouseSystem_TouchInput_initialize = TouchInput.initialize;
TouchInput.initialize = function() {
    MouseSystem_TouchInput_initialize.apply(this, arguments);
    this._cursorOffset = { x: 0, y: 0 };
    this.resetCursorImage();
};

TouchInput.hideCursor = function() {
    this._cursorHidden = true;
    document.body.style.cursor = 'none';
};

TouchInput.showCursor = function() {
    if (this._cursorHidden) {
        this._cursorHidden = false;
        this._updateCursor();
    }
};

TouchInput.setCursorOffset = function(offset) {
    if (this._cursorOffset.x !== offset.x || this._cursorOffset.y !== offset.y) {
        this._cursorOffset = offset;
        this._updateCursor();
    }
};

TouchInput.setCursorImage = function(image) {
    if (this._cursorImage !== image) {
        this._cursorImage = image;
        this._updateCursor();
    }
};

TouchInput.resetCursorImage = function() {
    this.setCursorImage(MouseSystemParams.defaultCursor);
};

const MouseSystem_TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    MouseSystem_TouchInput_onMouseMove.apply(this, arguments);

    if (Utils.RPGMAKER_NAME === 'MV') {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);

        this._onMove(x, y);
    }

    const scene = SceneManager._scene;

    if (scene instanceof Scene_Map && scene.isActive() && !$gameMessage.isBusy()) {
        scene.checkEventsUnderMouse(this._x, this._y);
    } else {
        this.resetCursorImage();
    }
};

const MouseSystem_TouchInput_onTrigger = TouchInput._onTrigger;
TouchInput._onTrigger = function(x, y) {
    if (this._activateClickEvents(x, y)) {
        $gameTemp.clearDestination();
    } else {
        MouseSystem_TouchInput_onTrigger.apply(this, arguments);
    }
};

TouchInput._activateClickEvents = function(x, y) {
    const scene = SceneManager._scene;

    if (scene instanceof Scene_Map && scene.isActive() && !$gameMessage.isBusy()) {
        const mapX = $gameMap.canvasToMapX(x);
        const mapY = $gameMap.canvasToMapY(y);

        return $gameMap.eventsXy(mapX, mapY).some((event) => {
            if (event._erased) {
                return false;
            }

            if (event.mouseSettings.clickActivate && event.mouseSettings.clickActivate.length > 0) {
                const data = MouseSystemParams.findHoverData(event.mouseSettings.clickActivate);

                if (data) {
                    event.start();
                    return true;
                }
            }

            return false;
        });
    }

    return false;
};

TouchInput._updateCursor = function() {
    if (this._cursorHidden) {
        document.body.style.cursor = 'none';
        return; // eslint-disable-line padding-line-between-statements
    }

    const cursorImage = this._cursorImage || MouseSystemParams.defaultCursor;

    if (cursorImage) {
        const path = `img/system/${cursorImage}.png`;
        const { x, y } = this._cursorOffset;

        document.body.style.cursor = `url('${path}') ${x} ${y}, default`;
    } else {
        document.body.style.cursor = 'default';
    }
};

//===========================================================================
// Game_Event
//===========================================================================

const MouseSystem_Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    MouseSystem_Game_Event_setupPage.apply(this, arguments);
    this.setupMouseSettings();
};

Game_Event.prototype.setupMouseSettings = function() {
    this.mouseSettings = {
        hoverWindow: [],
        hoverText: [],
        hoverImage: [],
        hoverIcon: [],
        clickActivate: [],
        hoverActivate: [],
        customCursor: [],
    };

    if (this._erased) {
        return;
    }

    const page = this.page();
    const list = (page ? page.list : null);
    let comment;

    const comments = (list ? list.reduce((acc, command) => {
        if (command.code === 108) {
            if (comment) {
                acc.push(comment);
            }

            comment = command.parameters[0];
        }

        if (command.code === 408) {
            comment += '\n' + command.parameters[0];
        }

        return acc;
    }, []) : []);

    // add last comment
    if (comment) {
        comments.push(comment);
    }

    comments.forEach((comment) => {
        if (comment.match(/<hover_window:\s*\[(.+)]>/i)) {
            const data = RegExp.$1.split('|');
            let condition;

            if (comment.endsWith('</hover_window>')) {
                const regex = /<hover_window:.+>(.+)<\/hover_window>/si;
                const exec = regex.exec(comment);

                if (exec) {
                    condition = exec[1];
                }
            }

            this.mouseSettings.hoverWindow.push({
                width: parseInt(data[0]),
                height: parseInt(data[1]),
                text: data[2].trim(),
                condition
            });
        } else if (comment.match(/<hover_text:\s*(\w+)>/i)) {
            const text = RegExp.$1.trim();
            let condition;

            if (comment.endsWith('</hover_text>')) {
                const regex = /<hover_text:.+>(.+)<\/hover_text>/si;
                const exec = regex.exec(comment);

                if (exec) {
                    condition = exec[1];
                }
            }

            this.mouseSettings.hoverText.push({ text, condition });
        } else if (comment.match(/<hover_image:\s*(\w+)>/i)) {
            const filename = RegExp.$1.trim();
            let condition;

            if (comment.endsWith('</hover_image>')) {
                const regex = /<hover_image:.+>(.+)<\/hover_image>/si;
                const exec = regex.exec(comment);

                if (exec) {
                    condition = exec[1];
                }
            }

            this.mouseSettings.hoverImage.push({ filename, condition });
        } else if (comment.match(/<hover_icon:\s*(\w+)>/i)) {
            let iconIndex = RegExp.$1;
            let condition = null;

            if (Number.isFinite(parseInt(iconIndex))) {
                iconIndex = parseInt(iconIndex);
            } else {
                const synonym = MouseSystemParams.iconSynonyms.find(
                    data => data.synonym === iconIndex);

                if (synonym) {
                    iconIndex = parseInt(synonym.iconIndex);
                }
            }

            if (comment.endsWith('</hover_icon>')) {
                const regex = /<hover_icon:.+>(.+)<\/hover_icon>/si;
                const exec = regex.exec(comment);

                if (exec) {
                    condition = exec[1];
                }
            }

            this.mouseSettings.hoverIcon.push({ iconIndex, condition });
        } else if (comment.match(/<click_activate>/i)) {
            let condition;

            if (comment.endsWith('</click_activate>')) {
                const regex = /<click_activate>(.+)<\/click_activate>/si;
                const exec = regex.exec(comment);

                if (exec) {
                    condition = exec[1];
                }
            }

            this.mouseSettings.clickActivate.push({ condition });
        } else if (comment.match(/<hover_activate>/i)) {
            let condition;

            if (comment.endsWith('</hover_activate>')) {
                const regex = /<hover_activate>(.+)<\/hover_activate>/si;
                const exec = regex.exec(comment);

                if (exec) {
                    condition = exec[1];
                }
            }

            this.mouseSettings.hoverActivate.push({ condition });
        } else if (comment.match(/<custom_cursor:\s*(.*?)>/i)) {
            const filename = RegExp.$1.trim();
            let condition;

            if (comment.endsWith('</custom_cursor>')) {
                const regex = /<custom_cursor:.+>(.+)<\/custom_cursor>/si;
                const exec = regex.exec(comment);

                if (exec) {
                    condition = exec[1];
                }
            }

            this.mouseSettings.customCursor.push({ filename, condition });
        }
    });

    if (MouseSystemParams.transferIcon > 0 && this.getPageCommands(201).length > 0) {
        this.mouseSettings.hoverIcon.push({ iconIndex: MouseSystemParams.transferIcon });
    }
};

Game_Event.prototype.getPageCommands = function(code) {
    const page = this.page();
    const list = (page ? page.list : null);

    if (code === undefined) {
        return list || [];
    }

    return (list ?
        list.filter(command => command.code === code)
        : []);
};

//===========================================================================
// Scene_Boot
//===========================================================================

const MouseSystem_Scene_Boot_initialize = Scene_Boot.prototype.initialize;
Scene_Boot.prototype.initialize = function() {
    MouseSystem_Scene_Boot_initialize.apply(this, arguments);

    if (Imported['DKTools'] && DKToolsParam.get('Cursor Graphic', 'Enabled')) {
        throw new Error('Disable function "Cursor Graphic" in the DKTools plugin!');
    }
};

//===========================================================================
// Scene_Map
//===========================================================================

const MouseSystem_Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
    MouseSystem_Scene_Map_createSpriteset.apply(this, arguments);
    this.createMouseSystemSprite();
};

const MouseSystem_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    MouseSystem_Scene_Map_createAllWindows.apply(this, arguments);
    this.createMouseSystemWindow();
};

Scene_Map.prototype.createMouseSystemSprite = function() {
    this._mouseSystemSprite = new Sprite();

    this._mouseSystemSprite.anchor.set(0.5, 0.5);
    this._mouseSystemSprite.drawIcon = Window_Base.prototype.drawIcon;
    this._mouseSystemSprite.createIconBitmap = function() {
        const width = Utils.RPGMAKER_NAME === 'MV' ?
            Window_Base._iconWidth : ImageManager.iconWidth;
        const height = Utils.RPGMAKER_NAME === 'MV' ?
            Window_Base._iconHeight : ImageManager.iconHeight;

        this.bitmap = new Bitmap(width, height);
        this.contents = this.bitmap;
    }.bind(this._mouseSystemSprite);
    this._mouseSystemSprite.drawText = function(text) {
        const temp = this.bitmap || new Bitmap();

        temp.fontSize = MouseSystemParams.hoverTextFontSize;

        const width = Math.ceil(temp.measureTextWidth(text));
        const height = 36;

        this.bitmap = new Bitmap(width, height);
        this.bitmap.fontSize = temp.fontSize;
        this.bitmap.drawText(text, 0, 0, this.width, this.height, 'center');
        this.text = text;
    }.bind(this._mouseSystemSprite);

    this._mouseSystemSprite.visible = false;

    this.addChild(this._mouseSystemSprite);
};

Scene_Map.prototype.createMouseSystemWindow = function() {
    if (Utils.RPGMAKER_NAME === 'MV') {
        this._mouseSystemWindow = new Window_Base(0, 0, 0, 0);
    } else {
        this._mouseSystemWindow = new Window_Base(new Rectangle(0, 0, 0, 0));
    }

    this._mouseSystemWindow.visible = false;

    this.addWindow(this._mouseSystemWindow);
};

Scene_Map.prototype.checkEventsUnderMouse = function(x, y) {
    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);
    const events = $gameMap.eventsXy(mapX, mapY);
    const sprite = this._mouseSystemSprite;
    const window = this._mouseSystemWindow;

    sprite.visible = false;
    window.visible = false;

    TouchInput.resetCursorImage();
    TouchInput.showCursor();

    if (events.length === 0) {
        delete sprite.iconIndex;
        delete sprite.text;
        delete window.text;
    }

    events.forEach((event) => {
        const mouseSettings = event.mouseSettings;

        if (mouseSettings.hoverWindow && mouseSettings.hoverWindow.length > 0) {
            const data = MouseSystemParams.findHoverData(mouseSettings.hoverWindow);

            if (!data) {
                return;
            }

            TouchInput.hideCursor();

            const width = window.width === data.width ?
                window.width : data.width;
            const height = window.height === data.height ?
                window.height : data.height;
            let text = data.text;

            if (text.startsWith('eval(')) {
                const match = /eval\((.+)\)/.exec(text);

                text = eval(match[1]);
            }

            window.visible = true;
            window.move(x - width / 2, y - height / 2, width, height);

            if (window.text !== text) {
                window.createContents();
                window.drawTextEx(text, 0, 0);
                window.text = text;
            }
        } else if (mouseSettings.hoverText && mouseSettings.hoverText.length > 0) {
            const data = MouseSystemParams.findHoverData(mouseSettings.hoverText);

            if (!data) {
                return;
            }

            TouchInput.hideCursor();

            let text = data.text;

            if (text.startsWith('eval(')) {
                const match = /eval\((.+)\)/.exec(text);

                text = eval(match[1]);
            }

            if (sprite.text !== text) {
                sprite.drawText(text);
            }

            sprite.visible = true;
            sprite.move(x, y);
        } else if (mouseSettings.hoverImage && mouseSettings.hoverImage.length > 0) {
            const data = MouseSystemParams.findHoverData(mouseSettings.hoverImage);

            if (!data) {
                return;
            }

            TouchInput.hideCursor();

            let filename = data.filename;

            if (filename.startsWith('eval(')) {
                const match = /eval\((.+)\)/.exec(filename);

                filename = eval(match[1]);
            }

            sprite.bitmap = ImageManager.loadPicture(filename);
            sprite.visible = true;
            sprite.move(x, y);

            delete sprite.iconIndex;
        } else if (mouseSettings.hoverIcon && mouseSettings.hoverIcon.length > 0) {
            const data = MouseSystemParams.findHoverData(mouseSettings.hoverIcon);

            if (!data) {
                return;
            }

            TouchInput.hideCursor();

            let iconIndex = data.iconIndex;

            if (typeof iconIndex === 'string' && iconIndex.startsWith('eval(')) {
                const match = /eval\((.+)\)/.exec(iconIndex);

                iconIndex = eval(match[1]);
            }

            if (sprite.iconIndex !== iconIndex) {
                sprite.iconIndex = iconIndex;
                sprite.createIconBitmap();
                sprite.drawIcon(iconIndex, 0, 0);
            }

            sprite.visible = true;
            sprite.move(x, y);
        }

        if (mouseSettings.hoverActivate && mouseSettings.hoverActivate.length > 0) {
            const data = MouseSystemParams.findHoverData(mouseSettings.hoverActivate);
            data && event.start();
        }

        if (mouseSettings.customCursor && mouseSettings.customCursor.length > 0) {
            const data = MouseSystemParams.findHoverData(mouseSettings.customCursor);

            if (!data) {
                return;
            }

            let cursorImage = data.filename;

            if (typeof cursorImage === 'string' && cursorImage.startsWith('eval(')) {
                const match = /eval\((.+)\)/.exec(cursorImage);

                cursorImage = eval(match[1]);
            }

            TouchInput.setCursorImage(cursorImage);
        }
    });
};

//===========================================================================
// Spriteset_Map
//===========================================================================

const MouseSystem_Spriteset_Map_createDestination =
    Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function () {
    MouseSystem_Spriteset_Map_createDestination.apply(this, arguments);

    if (MouseSystemParams.destination.type === 'hide') {
        if (this._destinationSprite && this._destinationSprite.parent) {
            this._destinationSprite.parent.removeChild(this._destinationSprite);
        }
    }
};

//===========================================================================
// Sprite_Destination
//===========================================================================

const MouseSystem_Sprite_Destination_updatePosition =
    Sprite_Destination.prototype.updatePosition;
Sprite_Destination.prototype.updatePosition = function () {
    MouseSystem_Sprite_Destination_updatePosition.apply(this, arguments);

    if (MouseSystemParams.destination.type !== 'default') {
        this.x += MouseSystemParams.destination.offsetX;
        this.y += MouseSystemParams.destination.offsetY;
    }
};

const MouseSystem_Sprite_Destination_createBitmap =
    Sprite_Destination.prototype.createBitmap;
Sprite_Destination.prototype.createBitmap = function () {
    const { type, color, outlineColor, scale, blendMode } = MouseSystemParams.destination;

    if (type === 'default') {
        MouseSystem_Sprite_Destination_createBitmap.apply(this, arguments);
        return; // eslint-disable-line padding-line-between-statements
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    this.bitmap = new Bitmap(tileWidth, tileHeight);

    if (outlineColor && outlineColor !== 'default') {
        this.bitmap.outlineColor = outlineColor;
    }

    if (type === 'square' || type === 'box') {
        this.bitmap.fillRect(
            (tileWidth - (tileWidth * scale)) / 2,
            (tileHeight - (tileHeight * scale)) / 2,
            tileWidth * scale,
            tileHeight * scale,
            color);

        if (type === 'box') {
            this.bitmap.clearRect(
                ((tileWidth - (tileWidth * scale)) / 2) + 4,
                ((tileHeight - (tileHeight * scale)) / 2) + 4,
                (tileWidth * scale) - 8,
                (tileHeight * scale) - 8);
        }
    }

    if (type === 'circle' || type === 'donut') {
        const minSize = Math.min(tileWidth, tileWidth);

        this.bitmap.drawCircle(
            tileWidth / 2, tileHeight / 2, Math.floor(minSize / 2 * scale) - 1, color);

        if (type === 'donut') {
            this.bitmap.drawCircle(
                tileWidth / 2, tileHeight / 2, Math.floor((minSize / 2) * scale) - 4, 'clear');
        }
    }

    if (type === 'text') {
        const data = MouseSystemParams.destination.text;

        if (data.fontFace && data.fontFace !== 'default') {
            this.bitmap.fontFace = data.fontFace;
        }

        this.bitmap.fontSize = data.fontSize;
        this.bitmap.drawText(
            data.text,
            (tileWidth - (tileWidth * scale)) / 2,
            (tileHeight - (tileHeight * scale)) / 2,
            tileWidth * scale,
            tileHeight * scale,
            'center');
    }

    if (type === 'image') {
        const [folder, filename] = MouseSystemParams.destination.image.split('/');

        this.bitmap = ImageManager.loadBitmap('img/' + folder + '/', filename, 0);
        this.bitmap.resize(tileWidth, tileHeight);
    }

    this.anchor.set(0.5, 0.5);
    this.blendMode = blendMode;
};

const MouseSystem_Sprite_Destination_updateAnimation =
    Sprite_Destination.prototype.updateAnimation;
Sprite_Destination.prototype.updateAnimation = function () {
    if (MouseSystemParams.destination.type === 'default') {
        MouseSystem_Sprite_Destination_updateAnimation.apply(this, arguments);
        return; // eslint-disable-line padding-line-between-statements
    }

    const {
        bounceRate,
        minOpacity, maxOpacity,
        minScale, maxScale
    } = MouseSystemParams.destination.animation;

    const scale = (0.25 + this._frameCount / bounceRate).clamp(minScale, maxScale);

    this._frameCount++;
    this._frameCount %= bounceRate;

    this.opacity = ((bounceRate - this._frameCount) * 10).clamp(minOpacity, maxOpacity);
    this.scale.set(scale, scale);
};
