/*:
 * @plugindesc 为状态编辑描述文本并调用显示
 * @author shiroin
 *
 * @help 通过脚本“$dataStates[n].description”来获取指定状态的文本
状态注释格式：
<HELP DESCRIPTION>
……
</HELP DESCRIPTION>      
 */

(function() {

    DataManager.processStatesDescriptions = function() {
        const db = window.statesDescription || {};
        const group = $dataStates;
        for (let n = 1; n < group.length; n++) {
            const obj = group[n];
            if (!obj) continue;

            const entry = db[obj.id] || {};

            // 如果你的 JSON 中 subtitle / description 是「数组」，
            // 这里用 join("\n") 把它们合成 MV 里常用的换行文本
            obj.subtitle    = (entry.subtitle    || []).join("\n");
            obj.description = (entry.description || []).join("\n");

        }
    };



})();

