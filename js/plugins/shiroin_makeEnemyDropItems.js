/*:
 * @plugindesc 读取敌人注释判定掉落物
 * @author shiroin
 * @help 通过脚本"$gameMap.makeEnemyDropItems(enemyId)"来判定掉落物情况
 */


Game_Map.prototype.parseDropItemComments = function(enemyId) {
    var note = $dataEnemies[enemyId].note;
    this._customDropItems = {
        items: [],
        weapons: [],
        armors: []
    };

    // Parse items
    var itemMatches = note.match(/<dropItem:(\d+),\s*(\d+)>/ig);
    this.parseDropType(itemMatches, this._customDropItems.items);

    // Parse weapons
    var weaponMatches = note.match(/<dropWeapon:(\d+),\s*(\d+)>/ig);
    this.parseDropType(weaponMatches, this._customDropItems.weapons);

    // Parse armors
    var armorMatches = note.match(/<dropArmor:(\d+),\s*(\d+)>/ig);
    this.parseDropType(armorMatches, this._customDropItems.armors);
};

Game_Map.prototype.parseDropType = function(matches, dropArray) {
    if (matches) {
        for (var i = 0; i < matches.length; i++) {
            var match = matches[i].match(/<drop(?:Item|Weapon|Armor):(\d+),\s*(\d+)>/i);
            if (match) {
                dropArray.push({
                    id: Number(match[1]),
                    chance: Number(match[2]) 
                });
            }
        }
    }
};
	
Game_Map.prototype.makeEnemyDropItems = function(enemyId) {
    this.parseDropItemComments(enemyId);
    
    var drops = {
        items: $gameNumberArray.value(12),
        weapons: $gameNumberArray.value(13),
        armors: $gameNumberArray.value(14)
    };

    this.processDrops(this._customDropItems.items, drops.items, 'item');
    this.processDrops(this._customDropItems.weapons, drops.weapons, 'weapon');
    this.processDrops(this._customDropItems.armors, drops.armors, 'armor');

    $gameNumberArray.setValue(12, drops.items);
    $gameNumberArray.setValue(13, drops.weapons);
    $gameNumberArray.setValue(14, drops.armors);
};

Game_Map.prototype.processDrops = function(dropArray, gameNumberArray, dropType) {
	var isDoubleDropRate = dropType === 'item' && $gameParty.hasDropItemDouble();
	
    dropArray.forEach(function(dropItem) {
        var baseChance = dropItem.chance;
        var chance = isDoubleDropRate ? baseChance * 2 : baseChance;
        var randomChance = Math.randomInt(100) + 1; 
        randomChance -= Math.floor(Math.random() * $gameActors.actor(1).luk * 0.5);
        randomChance = Math.max(0, randomChance);

        if (randomChance <= chance) {
            gameNumberArray.push(dropItem.id);
        }
    });
};