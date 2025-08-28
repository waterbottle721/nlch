/*:
 * @plugindesc 即兴料理的合成判定
 * @author shiroin
 * @help 通过脚本"$gameMap.checkCraftingFormula()"来判定合成结果
 *
*/

var table = {
    239: ['Slime'],   // 史莱姆果冻
    240: [ ['*CurryBlock', 'Rice'],  
	       ['*CurryBlock', 'Rice','Vegetable'] ], // 普通咖喱饭
    241: [ ['Apple', 'Flour','Fruit'],  
	       ['Apple', 'Flour','Flour','Fruit','Fruit'] ],  // 苹果派
    242: [ ['Apple','Red'],          
           ['Apple','Apple','Red'],  
           ['Apple','Apple','Apple','Red','Red'] ], // 烤苹果
    243: [ ['Seashell'],  
	       ['Seashell','Seashell'],  
		   ['Seashell','Seashell','Seashell'] ],  // 炒贝类
    244: [ ['Fish'],  
	       ['Fish','Fish'],  
		   ['Fish','Fish','Fish'] ],  // 煎鱼肉
	245: [ ['Mushroom'],  
	       ['Mushroom','Mushroom'],  
		   ['Mushroom','Mushroom','Mushroom'] ],  // 炒蘑菇  
	246: [ ['*Meat','Meat','Vegetable','Chilli'], 
	       ['*Meat','Vegetable','Chilli'],
	       ['*Meat','Vegetable','Potato'],
	       ['*Meat','Meat','Vegetable','Potato'], 
	       ['*Meat','Meat','Meat','Vegetable','Potato','Chilli'] ],// 烤肉串    
	247: [ ['Rice'],  
	       ['Rice','Rice'],  
		   ['Rice','Rice','Rice'] ],  // 饭团
    248: ['*Meat','CurryBlock', 'Rice'], // 肉排咖喱   
    249: [ ['*Meat','Meat','Meat','Meat','Meat'],  
	       ['*Meat','Meat','Meat','Meat','Meat','Meat'] ],  // 煎肉拼盘
	250: [ ['Meat'],
	       ['Meat','Vegetable'] ],   // 肉块汤
	251: [ ['*Meat','Meat','Meat'],  
	       ['*Meat','Meat','Meat','Meat'] ],  // 煎大肉排
	252: [ ['Meat','Rice'],   
	       ['Meat','Meat','Rice'],  
		   ['Meat','Rice','Rice'] ],  // 肉饭团
    253: [ ['Slime','Slime'],  
	       ['Slime','Slime','Slime'] ],  // 奇怪的史莱姆果冻
    254: [ ['Slime','Junk'],  
	       ['Slime','Junk','Junk'],  
		   ['Slime','Slime','Junk'] ], // 奇怪的暗黑史莱姆果冻
    255: [ ['Slime','Red'],  
	       ['Slime','Red','Red'],  
		   ['Slime','Slime','Red'] ], // 奇怪的粉红史莱姆果冻
    256: [ ['Slime','Ahoge','Ahoge'],  
		   ['Slime','Slime','Ahoge'] ], // 奇怪的彩虹史莱姆果冻
	257: [ ['Banana'],          
           ['Banana','Banana'],  
           ['Banana','Banana','Banana'] ], // 烤香蕉？	   
	258: [  ['Meat','Potato','Carrot'],  
	        ['Meat','Meat','Potato','Carrot'],
            ['Meat','Vegetable','Potato','Carrot'] ],  // 罗宋汤 
	259: [ ['Octopus'],
	       ['Octopus','Octopus'],  
           ['Octopus','Octopus','Octopus'] ],  // 烤章鱼脚 
	260: [ ['Vegetable','Vegetable','Vegetable'],
	       ['Vegetable','Vegetable','Vegetable','Vegetable'] ],  //蔬菜沙拉
	261: [ ['Potato','Vegetable'],          
           ['Potato','Potato','Vegetable'],  
           ['Potato','Potato','Potato','Vegetable'] ], // 土豆泥
	262: [ ['Carrot', 'Mushroom'],     
           ['Carrot','Carrot', 'Mushroom','Vegetable'] ], // 萝卜菇片汤   	  
    263: [ ['Pasta'],  
	       ['Pasta','Pasta'],  
		   ['Pasta','Pasta','Pasta'] ],  // 普通意大利面
	264: [ ['Pasta','Tomato'],  
	       ['Pasta','Pasta','Tomato'],  
		   ['Pasta','Tomato','Tomato'] ],  // 番茄意面
	265: [ ['Pasta','Seashell'],  
	       ['Pasta','Pasta','Seashell'],
		   ['Pasta','Pasta','Seafood'],
		   ['Pasta','Seafood','Seashell'] ],  // 海鲜意面		   
	266: [ ['Egg','CurryBlock', 'Rice'],  
	       ['Egg','CurryBlock', 'Rice','Vegetable'] ],  // 鸡蛋咖喱饭		   
	267: [ ['Egg', 'Rice'],  
	       ['Egg','Egg', 'Rice'],
		   ['Egg','Rice', 'Rice'] ],  // 蛋包饭		
	268: [ ['Egg', 'Rice','Tomato'],  
	       ['Egg','Egg', 'Rice','Tomato'],
		   ['Egg','Rice', 'Rice','Tomato'] ],  // 番茄蛋包饭		
	269: [ ['Seashell', 'Rice'],  
	       ['Seafood', 'Rice'],
		   ['Seafood','Seashell','Rice'] ],  // 海鲜炖饭		
    270: [ ['Pineapple'],  
	       ['Pineapple','Pineapple'],  
		   ['Pineapple','Pineapple','Pineapple'] ],  // 菠萝饮		   
	271: [ ['Vegetable','Vegetable'],
           ['Vegetable','Vegetable','Vegetable'],
	       ['Vegetable','Vegetable','Vegetable','Vegetable'] ],  //冲绳杂炒
	272: [ ['Chicken','Chicken'],  
           ['Chicken','Chicken','Chicken'] ], // 炸鸡桶		   
	273: [ ['Chicken','Chicken'] ],   // 炸鸡腿		
    274: [ ['Shrimp','Rice'],   
	       ['Shrimp','Shrimp','Rice'],  
		   ['Shrimp','Rice','Rice'] ],  // 天妇罗饭团	
	275: [ ['Lobster'],   
	       ['Lobster','Lobster',],  
		   ['Lobster','Lobster','Seafood'] ],  // 焗龙虾
	276: [ ['Crab'],   
	       ['Crab','Crab',],  
		   ['Crab','Crab','Seafood'] ],  // 煮螃蟹	 
    277: [ ['Maguro','Fish'],   
	       ['Maguro','Maguro','Fish','Fish'] ],    // 金枪鱼头	
    278: [ ['Octopus','Flour'],   
	       ['Octopus','Octopus','Flour'],
		   ['Octopus','Flour','Flour'] ],    // 章鱼丸子		
	279: [ ['*Meat','Meat'],
           ['*Meat','Meat','Vegetable'] ],	// 汉堡肉 	   
    280: [ ['Potato','Chilli','Red'],  
	       ['Potato','Chilli'],  
           ['Potato','Potato','Chilli'] ], // 辣土豆泥
	281: [ ['Chilli','Red'],
	       ['Chilli','Chilli','Chilli','Red','Red','Red'] ],   // 辣椒水		
    282: [ ['Slime','Slime','Slime'],  
	       ['Slime','Slime','Slime','Slime'],
		   ['Slime','Slime','Slime','Slime','Slime']],  // 水怪软糖
    283: [ ['Slime','Slime','Slime'],  
	       ['Slime','Slime','Slime','Slime'],
		   ['Slime','Slime','Slime','Slime','Slime']],  // 黏糊糊刨冰	
    284: [ ['Slime','Slime','Red','Red'],  
		   ['Slime','Slime','Slime','Slime','Red'] ], // 水怪软糖（红）
    285: [ ['Flour'],
	       ['Flour', 'Flour'],  
	       ['Flour', 'Flour','Flour'] ],  // 煎薄饼   
    286: [ ['Flour', 'Strawberry'],  
	       ['Flour', 'Flour','Strawberry'],
		   ['Flour', 'Flour','Strawberry','Strawberry'] ],// 草莓煎薄饼 	
    287: [ ['Tomato','Red'],
	       ['Tomato', 'Tomato','Red'],  
	       ['Tomato', 'Tomato','Tomato','Red'] ],  // 番茄汤	
    288: [ ['Strawberry','Red'],
	       ['Strawberry', 'Strawberry','Red'],  
	       ['Strawberry', 'Strawberry','Strawberry','Red'] ],  // 草莓	   
};

var table2 = createTable2(table);

// 构建有效食材的集合
let validElementsSet = new Set();
for (let key in table) {
    if (table.hasOwnProperty(key)) {
        let value = table[key];
        // 检查是否是嵌套数组
        if (Array.isArray(value[0])) {
            // 处理多个配方的情况
            for (let recipe of value) {
                for (let item of recipe) {
                    validElementsSet.add(item);
                }
            }
        } else {
            // 单个配方
            for (let item of value) {
                validElementsSet.add(item);
            }
        }
    }
}

function createTable2(table) {
    let table2 = {};
    for (let key in table) {
        if (table.hasOwnProperty(key)) {
            let value = table[key];
            let newKey;
            if (Array.isArray(value[0])) {
                // 处理多个配方
                for (let recipe of value) {
                    let sortedArray = recipe.slice().sort();
                    newKey = sortedArray.join(',');
                    if (!table2[newKey]) {
                        table2[newKey] = [];
                    }
                    table2[newKey].push(parseInt(key));
                }
            } else {
                let sortedArray = value.slice().sort();
                newKey = sortedArray.join(',');
                if (!table2[newKey]) {
                    table2[newKey] = [];
                }
                table2[newKey].push(parseInt(key));
            }
        }
    }
    return table2;
}


function calculateSimilarity(target, key) {
    // 将中文逗号替换成英文逗号，并拆分、修剪
    target = target.replace(/，/g, ',');
    key = key.replace(/，/g, ',');
    let targetItems = target.split(',').map(item => item.trim());
    let keyItems = key.split(',').map(item => item.trim());
    
    // 分离必需食材（带 "*" 的项）和普通食材
    let requiredIngredients = [];
    let normalizedKeyItems = [];
    keyItems.forEach(function(item) {
        if (item.startsWith('*')) {
            requiredIngredients.push(item.slice(1));
            normalizedKeyItems.push(item.slice(1));
        } else {
            normalizedKeyItems.push(item);
        }
    });

    // 为必需食材缺失计算额外惩罚：例如每缺少一个必需食材，增加 10 分惩罚（数值可调）
    let penaltyPerMissing = 10;
    let totalPenalty = 0;
    for (let req of requiredIngredients) {
        if (!targetItems.includes(req)) {
            totalPenalty += penaltyPerMissing;
        }
    }

    // 计算普通匹配分：比较 targetItems 与 normalizedKeyItems 的数量差异
    let targetCounts = getCounts(targetItems);
    let keyCounts = getCounts(normalizedKeyItems);
    let diffCount = 0;
    let allItems = new Set([...Object.keys(targetCounts), ...Object.keys(keyCounts)]);
    allItems.forEach(function(item) {
        let tCount = targetCounts[item] || 0;
        let kCount = keyCounts[item] || 0;
        diffCount += Math.abs(tCount - kCount);
    });

    return diffCount + totalPenalty;
}

function getCounts(items) {
    let counts = {};
    items.forEach(function(item) {
        counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
}


function findMostSimilarKey(target) {
    // 将中文逗号替换为英文逗号
    target = target.replace(/，/g, ',');

    // 分割原始输入食材（包括无效食材）
    let targetItems = target.split(",");

    // 构建原始输入的唯一食材集合（包括无效食材）
    let targetUniqueItems = new Set(targetItems);

    // 过滤掉无效的食材，获取有效的输入食材
    let validTargetItems = targetItems.filter(item => validElementsSet.has(item));

    // 如果过滤后没有有效的食材，返回 0
    if (validTargetItems.length === 0) return 3;

    // 构建有效输入食材的集合
    let validTargetUniqueItems = new Set(validTargetItems);

    let minDiff = Infinity;
    let candidateKeys = [];

    for (let key in table2) {
        let keyNormalized = key.replace(/，/g, ',');

        let diff = calculateSimilarity(validTargetItems.join(','), keyNormalized);

        if (diff < minDiff) {
            minDiff = diff;
            candidateKeys = [key];
        } else if (diff === minDiff) {
            candidateKeys.push(key);
        }
    }

    if (candidateKeys.length === 0) return 3;

    // 设定匹配率阈值
    const matchingThreshold = 0.5; // 可以根据需要调整阈值

    // 根据匹配率过滤候选配方
    let filteredCandidates = [];

    for (let key of candidateKeys) {
        let keyItems = key.split(",");
        let keyUniqueItems = new Set(keyItems);

        // 计算有效输入食材与配方食材的交集
        let matchingIngredientsSet = new Set([...validTargetUniqueItems].filter(item => keyUniqueItems.has(item)));
        let matchingIngredients = matchingIngredientsSet.size;

        // 计算输入食材与配方食材的并集
        let unionSet = new Set([...targetUniqueItems, ...keyUniqueItems]);
        let unionSize = unionSet.size;

        // 计算匹配率（使用 Jaccard 相似系数）
        let matchingRate = matchingIngredients / unionSize;

        if (matchingRate >= matchingThreshold) {
            filteredCandidates.push(key);
        }
    }

    if (filteredCandidates.length === 0) return 3;

    // 在匹配率合格的配方中，选择与有效输入食材数量最接近的配方
    let targetLength = validTargetItems.length;
    let minLengthDiff = Infinity;
    let closestKeysByLength = [];

    for (let key of filteredCandidates) {
        let keyItems = key.split(",");
        let lengthDiff = Math.abs(keyItems.length - targetLength);

        if (lengthDiff < minLengthDiff) {
            minLengthDiff = lengthDiff;
            closestKeysByLength = [key];
        } else if (lengthDiff === minLengthDiff) {
            closestKeysByLength.push(key);
        }
    }

    // 如果有多个配方，随机选择一个
    let finalKey;
    if (closestKeysByLength.length > 1) {
        finalKey = closestKeysByLength[Math.floor(Math.random() * closestKeysByLength.length)];
    } else {
        finalKey = closestKeysByLength[0];
    }
    // 从 table2[finalKey] 数组中随机选择一个料理 ID
    let candidates = table2[finalKey];
    if (!candidates || candidates.length === 0) return 3; // 默认值
    let chosenId = candidates[Math.floor(Math.random() * candidates.length)];
    return chosenId;
};



Game_Map.prototype.checkCraftingFormula = function() {
    // 要读取的食材槽列表
    const varIds = [75, 76, 77];

    const ingredients = [];
    const itemIds = [];

    varIds.forEach(varId => {
        const itemId = $gameVariables.value(varId);
        // 先确保对应食材槽放了食材
        if (itemId > 0) {
            const dataItem = $dataItems[itemId];
            // 再确保食材标签存在
            if (dataItem && typeof dataItem.note === 'string') {
                const match = dataItem.note.match(/<Ingredients:\s*(.*?)>/i);
                if (match && match[1]) {
                    ingredients.push(match[1]);
                    itemIds.push(itemId);
                }
            }
        }
    });

    $gameNumberArray.setValue(15, ingredients);
    $gameNumberArray.setValue(16, itemIds);


    const formula = ingredients.join(',');
    return formula ? findMostSimilarKey(formula) : 0;
};



Game_Map.prototype.applyItemEffectsFromDish = function(itemIds) {
    var actor = $gameParty.leader(); // 直接获取队伍领队作为目标
    var target = actor;

    for (var itemIndex = 0; itemIndex < itemIds.length; itemIndex++) {
        var item = $dataItems[itemIds[itemIndex]];
        if (!item || !item.effects || item.effects.length === 0) continue; // 检查道具是否存在以及是否有效果

        var effects = item.effects; // 获取该道具的效果列表

        for (var i = 0; i < effects.length; i++) {
            var effect = effects[i];
            var code = effect.code;
            var dataId = effect.dataId;
            var value1 = effect.value1;
            var value2 = effect.value2;

            switch (code) {
                case 11: // gain HP
                    //if (i < 2) {  return false; }
                    if (target.hp < target.mhp) {
                        var hpGain = (value1 * actor.mhp + value2) * actor.pha;
						hpGain = Math.round(hpGain);
                        target.gainHp(hpGain);
                    }
                    break;

                case 21: // add state
      if (item.scope === 8) {
          var random = Math.random();
          $gameParty.members().forEach(function(member) {
              var stateSuccessRate = value1 * member.stateRate(dataId); // 根据角色状态有效度调整成功率
              if (random < stateSuccessRate) {
                  member.addState(dataId);

              }
          });
      } else {
          var random = Math.random();
          var stateSuccessRate = value1 * target.stateRate(dataId); // 根据角色状态有效度调整成功率
          if (random < stateSuccessRate) {
              target.addState(dataId);
          }
      }
      break;

                case 22: // remove state
                    if (target.isStateAffected(dataId)) {
                        target.removeState(dataId);
                    } else if (i < 2) {
                        return false;
                    }
                    break;

                case 44: // common event
                    $gameParty._targetActorId = $gameParty.leader()._actorId;                   
					$gameMap.steupCEQJ(dataId,1);
                    break;

            }
        }
    }
	actor.removeState(21);	
	actor.removeState(22);
}
