//=========================================================
// Cae_SelectItemFilter.js
//=========================================================

/*:
 * @plugindesc v1.1 - Use notetags to filter items displayed in Select Item.
 * @author Caethyril
 *
 * @help Plugin Commands:
 *      SelectItemFilter SET type
 *      SelectItemFilter SET type type type
 * E.g. SelectItemFilter SET potion twig big_sword 700 id6 blah
 *       - the Select Item command will now have its items filtered
 *       - only items with at least one matching SelectItemFilter
 *           notetag value will be shown
 *       - keep reading for details on these notetags~
 *
 *      SelectItemFilter RESET
 *       - clears the item filter (reverts to default behaviour)
 *
 *      SelectItemFilter ADD type
 *      SelectItemFilter ADD type type type
 *       - adds specified type(s) to the filter
 *
 *      SelectItemFilter REM type
 *      SelectItemFilter REM type type type
 *       - removes specified type(s) from the filter, if present
 *
 * Item notetags:
 *   Add this tag to the notebox of any items you want to filter out:
 *      <SelectItemFilter:type>
 * E.g. <SelectItemFilter:cheese>
 * E.g. <SelectItemFilter:croissant duct_tape 123 dodo>
 *   Replace 'type' with any number or text that you want.
 *   - separate multiple 'type' values with spaces
 *   - you can apply the same tags to multiple items
 *
 * Example:
 *   The player has four items:
 *    - Cheese, with notetag <SelectItemFilter:food dairy>
 *    - Apple, with notetag <SelectItemFilter:food fruit>
 *    - Milk, with notetag <SelectItemFilter:drink dairy>
 *    - Plate, with no SelectItemFilter notetag.
 *   Normally all of these show in a Select Item command.
 *   Now for some plugin commands:
 *    - SelectItemFilter SET food drink
 *      > Select Item now shows Cheese, Apple, Milk.
 *    - SelectItemFilter REM food
 *      > Select Item now shows Milk.
 *    - SelectItemFilter ADD fruit
 *      > Select Item now shows Apple, Milk.
 *    - SelectItemFilter RESET
 *      > Select Item now shows all items again (no filter).
 *   Note that the filter will not be saved with the usual game data.
 *
 * Compatibility:
 *   Aliases:
 *     Window_EventItem: includes
 *
 * Terms of use:
 *   Free to use and modify.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.1: Added ADD and REM options to plugin command! \o/
 *        Added failsafe to prevent filter from being empty but still active.
 *   1.0: Initial release.
 */

var Imported = Imported || {};				// Import namespace, var can redefine
Imported.Cae_SelectItemFilter = 1.1;			// Import declaration

var CAE = CAE || {};					// Author namespace, var can redefine
CAE.SelectItemFilter = CAE.SelectItemFilter || {};	// Plugin namespace

(function(_) {

'use strict';

	const PCOM = 'SelectItemFilter'.toUpperCase();

	_.selectFilter = null;

	_.safeList = function(list) { return (list && list.length > 0) ? list : null; };
	_.setFilter = function(list) { _.selectFilter = _.safeList(list); };
	_.addFilter = function(list) { _.setFilter((_.selectFilter || []).concat(list)); };
	_.remFilter = function(list) {
		if (!_.selectFilter) return;
		list.forEach(function(type) {
			let ix = _.selectFilter.indexOf(type);
			if (ix >= 0) _.selectFilter.splice(ix, 1);
		});
		_.setFilter(_.selectFilter);
	};

	_.checkMatch = function(tag) {
		return tag && String(tag).split(' ').some(function(type) { return _.selectFilter.contains(type); });
	}

	_.command = function(args) {
		let subCommand = args.shift(), values = args;
		switch (subCommand.toUpperCase()) {
			case 'SET':
				_.setFilter(values);
				break;
			case 'ADD':
				_.addFilter(values);
				break;
			case 'REM':
				_.remFilter(values);
				break;
			case 'RESET':
				_.setFilter(null);
				break;
			default:		// Oops.
				console.error('Cae_SelectItemFilter.js: subCommand', subCommand, 'not recognised!');
				break;
		}
	};

	_.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;	// Alias
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (command.toUpperCase() === PCOM) _.command(args);
		_.Game_Interpreter_pluginCommand.call(this, command, args);		// Callback
	};

	_.Window_EventItem_includes = Window_EventItem.prototype.includes;		// Alias
	Window_EventItem.prototype.includes = function(item) {
		if (_.selectFilter && item && !_.checkMatch(item.meta.SelectItemFilter)) {
			return false;
		}
		return _.Window_EventItem_includes.call(this, item);
	};

})(CAE.SelectItemFilter);