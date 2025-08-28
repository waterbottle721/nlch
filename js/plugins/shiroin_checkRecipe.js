/*:
 * @plugindesc Simple recipe checker plugin for RPG Maker MV with 80 editable recipes.
 * @help This plugin checks for crafting recipes in $gameVariables.value(15).
 *
 * @param Recipes
 * @type struct<Recipe>[]
 * @desc Define the recipes that can be checked.
 * @default []
 */

/*~struct~Recipe:
 * @param ID
 * @type number
 * @desc The ID of the recipe.
 * @default 0
 *
 * @param Ingredients
 * @type number[]
 * @desc The ingredients (variable numbers) needed for the recipe.
 * @default []
 *
 * @param Result
 * @type number
 * @desc The resulting item's ID.
 * @default 0
 */

var Imported = Imported || {};
Imported.RecipeChecker = true;

var RecipeChecker = RecipeChecker || {};

function parseStructArray(structArray) {
    try {
        var parsedArray = JSON.parse(structArray);
        for (var i = 0; i < parsedArray.length; i++) {
            parsedArray[i] = JSON.parse(parsedArray[i]);
        }
        return parsedArray;
    } catch (e) {
        return [];
    }
}

var parameters = PluginManager.parameters('RecipeChecker');
var recipeString = parameters['Recipes'];
var recipes = parseStructArray(recipeString); // 正确解析结构体数组

RecipeChecker.checkRecipe = function() {
    var ingredients = $gameNumberArray.value(15).slice().sort(function(a, b) { return a - b; }); // 修正变量引用并确保数值排序
    for (var i = 0; i < recipes.length; i++) { // 使用解析出的配方数组
        var recipe = recipes[i];
        var recipeIngredients = JSON.parse(recipe.Ingredients).map(Number).sort(function(a, b) { return a - b; });
        if (RecipeChecker.compareArrays(ingredients, recipeIngredients)) {
            return Number(recipe.Result); // 如果配方匹配，返回结果 ID
        }
    }
    return 0; // 如果没有配方匹配，返回 0
};

RecipeChecker.compareArrays = function(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

// 将 checkRecipe 函数暴露到全局作用域，以便其他地方可以调用
window.checkRecipe = RecipeChecker.checkRecipe;

