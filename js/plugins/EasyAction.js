// EasyAction.js Ver.4.0.2
// MIT License (C) 2021 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ MV
* @plugindesc Reproduce the easy action of the Maker DS series.
* @orderAfter PluginCommonBase
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/482849490.html
* @help Ver.4.0.2
* 【Scripts】
* You will be able to use the following script when setting the movement route.
* this.easySpin(argument)
* //Cartwheel once on the spot.
* this.easyShake(argument)
* //Shake on the spot.
*
* Waits for completion if the argument is true or not entered.
* If false, do not wait.
* The number of sustained frames is 24 frames.
*
* this.easyReverse(argument)
* //Reverses the movement of "Spin" and "Shake" left and right.
*
* It is turned on if the argument is true or not entered,
* and turned off if it is false.
* It is toggled if it is not entered.
*
* this.easyJump()
* //Jump on the spot.
* this.easyBackoff()
* //Back off on the spot.
* this.easyBackstep()
* //Jump one step backwards without changing direction.
*
* The number of frames sustained varies depending
* on the character's movement speed.
*
* this.easyAngle(argument)
* //Change the angle. The argument specifies the angle in degrees.
* If it is 0 or not entered, it will return to the original state.
* this.easyBlink(argument);
* //Make it blink. It is turned on if the argument is true or not entered,
* and turned off if it is false.
* this.easyTra(argument);
* //Make it semi-transparent.
* It is turned on if the argument is true or not entered,
* and turned off if it is false.
*
* 【Plugin Commands（MV）】
* easySpin CharacterID Boolean
* //Cartwheel once on the spot.
* easyShake CharacterID Boolean
* //Shake on the spot.
*
* easyReverse CharacterID Boolean
* //Reverses the movement of "Spin" and "Shake" left and right.
*
* It is turned on if the boolean value is true or not entered,
* and turned off if it is false.
* It is toggled if it is not entered.
*
* Waits for completion if the boolean value is true or not entered.
* If false, do not wait.
* The number of sustained frames is 24 frames.
*
* easyJump CharacterID Boolean
* //Jump on the spot.
* easyBackoff CharacterID Boolean
* //Back off on the spot.
* easyBackstep CharacterID Boolean
* //Jump one step backwards without changing direction.
*
* Waits for completion if the boolean value is true or not entered.
* If false, do not wait.
* The number of frames sustained varies depending
* on the character's movement speed.
*
* easyAngle CharacterID Angle
* //Change the angle. The argument specifies the angle in degrees.
* If it is 0 or not entered, it will return to the original state.
* easyBlink CharacterID Boolean
* //Make it blink. It is turned on if the boolean value is true or not entered,
* and turned off if it is false.
* easyTra CharacterID Boolean
* //Make it semi-transparent.
* It is turned on if the boolean value is true or not entered,
* and turned off if it is false.
*
*【Options】
* Place a comment on the first line of the page you want to set,
* and enter it in the following format.
* By doing so, you can set the initial state when switching pages.
* <easyReverse> //Reverses the movement of "Spin" and "Shake" left and right.
* <easyAngle:180> //Make the angle 180 degrees.
* <easyAngle:50> //Make the angle 50 degrees.
* <easyBlink> //Blink.
* <easyTra> //Make semi-transparent.
*
* @command EasySpin
* @text Spin
* @desc Cartwheel once on the spot.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg wait
* @text Wait for Completion
* @desc Waits until all specified operations are completed.
* @default true
* @type boolean
*
* @command EasyShake
* @text Shake
* @desc Shake on the spot.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg wait
* @text Wait for Completion
* @desc Waits until all specified operations are completed.
* @default true
* @type boolean
*
* @command EasyReverse
* @text Reverse Easy Action
* @desc Reverses the movement of "Spin" and "Shake" left and right.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg bool
* @text Boolean Value
* @desc Enabled with true. Disabled with false.
* @default true
* @type boolean
*
* @command EasyJump
* @text Jump
* @desc Jump on the spot.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg wait
* @text Wait for Completion
* @desc Waits until all specified operations are completed.
* @default true
* @type boolean
*
* @command EasyBackoff
* @text Back Off
* @desc Take a step back.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg wait
* @text Wait for Completion
* @desc Waits until all specified operations are completed.
* @default true
* @type boolean
*
* @command EasyBackstep
* @text Back Step
* @desc Jump one step backwards without changing direction.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg wait
* @text Wait for Completion
* @desc Waits until all specified operations are completed.
* @default true
* @type boolean
*
* @command EasyAngle
* @text Change Angle
* @desc Change the angle.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg angle
* @text Angle
* @desc Specifies the angle in degrees.
* @default 0
* @type number
*
* @command EasyBlink
* @text Blink
* @desc Make it blink.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg bool
* @text Boolean Value
* @desc Enabled with true. Disabled with false.
* @default true
* @type boolean
*
* @command EasyTra
* @text Translucent
* @desc Make it translucent.
*
* @arg eventId
* @text Character ID
* @desc Specify the character's ID.
* This Event:0  Player:-1
* @default -1
*
* @arg bool
* @text Boolean Value
* @desc Enabled with true. Disabled with false.
* @default true
* @type boolean
*
* @param amplitude
* @text Amplitude
* @desc Amplitude of [Easy Action: Shake].
* @type number
* @default 4
*
*/

/*:ja
* @target MZ MV
* @plugindesc ツクールDS系列の簡単アクションを再現します。
* @orderAfter PluginCommonBase
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/482849490.html
* @help
* 【スクリプト】
* 移動ルートの設定で以下のスクリプトが使えるようになります。
* this.easySpin(引数)
* その場で一回転します。
* this.easyShake(引数)
* その場で揺れます。
*
* 引数がtrueもしくは未入力だと終わるまでウェイト。falseだとウェイトしません。
* 持続フレーム数は24フレームです。
*
* this.easyReverse(引数)
* 「一回転」「揺れる」の動きを左右反転します。
*
* 引数がtrueでオン、falseでオフ。
* 未入力で切り替え。
*
* this.easyJump()
* その場でジャンプします。
* this.easyBackoff()
* その場で後退します。
* this.easyBackstep()
* 向きを変えず一歩後方にジャンプします。
* 持続フレーム数はキャラクターの移動速度によって可変します。
*
* this.easyAngle(引数)
* 角度を変更します。引数は度数法で角度を指定します。0もしくは未入力で解除。
* this.easyBlink(引数);
* 点滅させます。引数がtrueもしくは未入力でオン、falseでオフ。
* this.easyTra(引数);
* 半透明にします。引数がtrueもしくは未入力でオン、falseでオフ。
*
* 【プラグインコマンド（MV）】
* easySpin キャラクターID 真偽値
* その場で一回転します。
* easyShake キャラクターID 真偽値
* その場で揺れます。
*
* 真偽値がtrueもしくは未入力だと終わるまでウェイト。falseだとウェイトしません。
* 持続フレーム数は24フレームです。
*
* easyReverse キャラクターID 真偽値
* 「一回転」「揺れる」の動きを左右反転します。
*
* 真偽値がtrueでオン。falseでオフ。
* 未入力で切り替え。
*
* easyJump キャラクターID 真偽値
* その場でジャンプします。
* easyBackoff キャラクターID 真偽値
* その場で後退します。
* easyBackstep キャラクターID 真偽値
* 向きを変えず一歩後方にジャンプします。
*
* 真偽値がtrueもしくは未入力だと終わるまでウェイト。falseだとウェイトしません。
* 持続フレーム数はキャラクターの移動速度によって可変します。
*
* easyAngle キャラクターID 角度
* 角度を変更します。度数法で角度を指定します。0もしくは未入力で解除。
* easyBlink キャラクターID 真偽値
* 点滅させます。真偽値がtrueもしくは未入力でオン、falseでオフ。
* easyTra キャラクターID 真偽値
* 半透明にします。真偽値がtrueもしくは未入力でオン、falseでオフ。
*
*【オプション】
* イベントの設定したいページの１行目に注釈を置き、以下の形式で入力します。
* そうする事でページ切り替え時の初期状態を設定できます。
* <easyReverse> //「一回転」「揺れる」の動きを左右反転します。
* <easyAngle:180> //角度を180度にする。
* <easyAngle:50> //角度を50度にする。
* <easyBlink> //点滅させる。
* <easyTra> //半透明にする。
*
* [更新履歴]
* 2021/08/07：Ver.1.0.0　公開
* 2021/08/09：Ver.1.1.0　バグ修正と機能追加。
* 2021/08/10：Ver.1.1.1　ジャンプ時にフォロワーの移動を禁止。
* 2021/08/17：Ver.1.1.2　例外処理追加。
* 2021/12/08：Ver.2.0.0　「イベントの角度」を追加。
* 2021/12/22：Ver.2.1.0　イベントの角度をメモ欄で設定可能に。
* 2022/02/20：Ver.2.2.0　「点滅」を追加。角度変更時のフキダシ位置を修正。
* 2022/02/21：Ver.2.3.0　「半透明」を追加。有効時、不透明度が設定値の半分になります。
* 2022/03/06：Ver.2.3.1　EventEffects併用時、角度変更適用中にフキダシの位置がおかしくなる現象（MZのみ）を修正。
* 2022/06/18：Ver.2.4.0　「揺れる」の振幅を設定可能に。
* 2022/06/19：Ver.2.4.1　MZで「一回転」終了後に一瞬表示優先度がおかしくなる問題を修正。
* 2022/06/20：Ver.2.5.0　「点滅」の仕様を改善。茂みのタイルで「一回転」したときのグラフィックの不具合を解消。
* 2022/11/20：Ver.3.0.0　競合対策。ページ別設定をメモから注釈に変更。以前のバージョンとは一部互換性がありません。
* 2022/11/21：Ver.3.0.1　注釈解析が複数回行われないように修正。
* 2023/02/23：Ver.3.1.0　プラグインコマンドでキャラクターが存在しない時にフリーズする不具合を修正。
* 2023/09/03：Ver.3.2.0　角度が360度以上にならないように修正。MZに最適化。
* 2023/10/15：Ver.4.0.0　「一回転」「揺れる」の左右反転を可能にしました。
* 2023/10/15：Ver.4.0.1　不具合修正。オプションを追加。
* 2023/11/06：Ver.4.0.2　競合対策。
*
* @command EasySpin
* @text 一回転
* @desc その場で一回転します。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyShake
* @text 揺れる
* @desc その場で揺れます。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyReverse
* @text 簡単アクションの反転
* @desc 「一回転」「揺れる」の動きを左右反転します。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg bool
* @text 真偽値
* @desc 引数がtrueで有効。falseで無効。
* @default true
* @type boolean
*
* @command EasyJump
* @text ジャンプ
* @desc その場でジャンプします。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyBackoff
* @text 後ずさり
* @desc 一歩後退します。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyBackstep
* @text バックステップ
* @desc 向きを変えず一歩後方にジャンプします。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg wait
* @text 完了までウェイト
* @desc 指定した動作がすべて終了するまで待ちます。
* @default true
* @type boolean
*
* @command EasyAngle
* @text キャラクターの角度
* @desc 角度を変更します。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg angle
* @text 角度
* @desc 度数法で角度を指定します。
* @default 0
* @type number
*
* @command EasyBlink
* @text キャラクターの点滅
* @desc 点滅させます。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg bool
* @text 真偽値
* @desc trueで有効。falseで無効。
* @default true
* @type boolean
*
* @command EasyTra
* @text キャラクターの半透明
* @desc 半透明にさせます。
*
* @arg eventId
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  主人公:-1
* @default -1
*
* @arg bool
* @text 真偽値
* @desc trueで有効。falseで無効。
* @default true
* @type boolean
*
* @param amplitude
* @text 振幅
* @desc ［簡単アクション：揺れる］の振幅。
* @type number
* @default 4
*
*/

'use strict';
{
	//プラグイン名取得。
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	const useMZ = Utils.RPGMAKER_NAME === "MZ";

	const parameter = PluginManager.parameters(pluginName);
	const amplitude = Number(parameter["amplitude"]);
	
	//プラグインコマンドの定義。PluginCommonBaseの有無やMZ/MVを判別。
	if (hasPluginCommonBase && useMZ){
		PluginManagerEx.registerCommand(document.currentScript, "EasySpin", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easySpin(false);
				if (args.wait) this.wait(24);
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyAngle", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyAngle(args.angle);
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyShake", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyShake(false);
				if (args.wait) this.wait(24);
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyReverse", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyReverse(args.bool);
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyJump", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyJump(false);
				if (args.wait) this.wait(character._jumpCount);
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyBackoff", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyBackoff();
				if (args.wait) this.wait(1/character.distancePerFrame());
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyBackstep", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyBackstep();
				if (args.wait) this.wait(character._jumpCount);
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyBlink", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyBlink(args.bool);
			}
		});
		PluginManagerEx.registerCommand(document.currentScript, "EasyTra", function(args) {
			const character = this.character(args.eventId);
			if (character) {
				character.easyTra(args.bool);
			}
		});
	} else if (useMZ){
		PluginManager.registerCommand(pluginName, "EasySpin", function(args) {
			const character = this.character(+args.eventId);
			const wait = args.wait === "true";
			if (character) {
				character.easySpin(false);
				if (wait) this.wait(24);
			}
		});
		PluginManager.registerCommand(pluginName, "EasyAngle", function(args) {
			const character = this.character(+args.eventId);
			if (character) {
				character.easyAngle(+args.angle);
			}
		});
		PluginManager.registerCommand(pluginName, "EasyShake", function(args) {
			const character = this.character(+args.eventId);
			const wait = args.wait==="true";
			if (character) {
				character.easyShake(false);
				if (wait) this.wait(24);
			}
		});
		PluginManager.registerCommand(pluginName, "EasyReverse", function(args) {
			const character = this.character(+args.eventId);
			const bool = args.bool === "true";
			if (character) {
				character.easyReverse(bool);
			}
		});
		PluginManager.registerCommand(pluginName, "EasyJump", function(args) {
			const character = this.character(+args.eventId);
			const wait = args.wait === "true";
			if (character) {
				character.easyJump(false);
				if (wait) this.wait(character._jumpCount);
			}
		});
		PluginManager.registerCommand(pluginName, "EasyBackoff", function(args) {
			const character = this.character(+args.eventId);
			const wait = args.wait === "true";
			if (character) {
				character.easyBackoff();
				if (wait) this.wait(1/character.distancePerFrame());
			}
		});
		PluginManager.registerCommand(pluginName, "EasyBackstep", function(args) {
			const character = this.character(+args.eventId);
			const wait = args.wait === "true";
			if (character) {
				character.easyBackstep();
				if (wait) this.wait(character._jumpCount);
			}
		});
		PluginManager.registerCommand(pluginName, "EasyBlink", function(args) {
			const character = this.character(+args.eventId);
			const bool = args.bool === "true";
			if (character) {
				character.easyBlink(bool);
			}
		});
		PluginManager.registerCommand(pluginName, "EasyTra", function(args) {
			const character = this.character(+args.eventId);
			const bool = args.bool === "true";
			if (character) {
				character.easyTra(bool);
			}
		});
	}

	const commandSet1 = new Set(['easySpin', 'easyShake', 'easyJump', 'easyBackoff', 'easyBackstep']);
	const commandSet2 = new Set(['easyTra', 'easyBlink']);
	const commandSet3 = new Set(['easyAngle']);

	//-----------------------------------------------------------------------------
	// Game_Interpreter

	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);
		
		if (commandSet1.has(command)) {
			const character = this.character(+args[0]);
			const bool = args[1] !== "false";
			if (character) {
				character[command](false);
			}

			if (character && bool) {
				switch (command) {
				case 'easySpin':
				case 'easyShake':
					this.wait(24);
					break;

				case 'easyJump':
				case 'easyBackstep':
					this.wait(character._jumpCount);
					break;
					
				case 'easyBackoff':
					this.wait(1/character.distancePerFrame());
					break;
				}
			}
		} else if (commandSet2.has(command)) {
			const character = this.character(+args[0]);
			const bool = args[1]!=="false";
			if (character) {
				character[command](bool);
			}
		} else if (commandSet3.has(command)) {
			const character = this.character(+args[0]);
			const angle = Number(args[1] || 0);
			if (character) {
				character[command](angle);
			}
		} else if (command === "easyReverse") {
			const character = this.character(+args[0]);
			const bool = args[1] ? args[1]=== "true" : undefined;
			if (character) {
				character[command](bool);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase

	//簡単アクションを管理する変数を追加。
	const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_initMembers.call(this);
		this._easySpin = false;
		this._easySpinCount = 0;
		this._easyShake = false;
		this._easyShakeCount = 0;
		this._easyActionX = 0;
		this._easyActionAngle = 0;
		this._easyAngle = 0;
		this._easyBlink = false;
		this._easyBlinkCount = 0;
		this._easyBlinkTra = false;
		this._easyTra = false;
		this._easyActionReversed = false;
	};

	const _Game_Player_initMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
		_Game_Player_initMembers.call(this);
		this._easyActionJumping = false;
	};

	//キャラクターのアップデート処理に簡単アクションのアップデートを追加。
	const _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function() {
		_Game_CharacterBase_update.call(this);
		this.updateEasyAngle();
		this.updateEasyShake();
		this.updateEasyBlink();
	};

	//角度を更新する
	Game_CharacterBase.prototype.updateEasyAngle = function() {
		if (this._easySpin) {
			this._easySpinCount++;
			this.easySpinSetAngle();
		}
	};

	//振動を更新する
	Game_CharacterBase.prototype.updateEasyShake = function() {
		if (this._easyShake) {
			this._easyShakeCount++;
			this.easyShakeSetOffsets();
		}
	};

	const blinkInterval = 8;
	//点滅を更新する
	Game_CharacterBase.prototype.updateEasyBlink = function() {
		if (this._easyBlink) {
			this._easyBlinkCount--;
			if (!this._easyBlinkCount) {
				this.setEasyBlinkTransparent(!this.isTransparent());
				this._easyBlinkCount = blinkInterval;
			}
		}
	};

	Game_CharacterBase.prototype.setEasyBlinkTransparent = function(transparent) {
		this._easyBlinkTra = transparent;
	};

	const _Game_CharacterBase_isTransparent = Game_CharacterBase.prototype.isTransparent;
	Game_CharacterBase.prototype.isTransparent = function() {
		return this._easyBlinkTra || _Game_CharacterBase_isTransparent.call(this);
	};

	Game_CharacterBase.prototype.isEasyRotating  = function() {
		return !!(this._easyActionAngle || this._easyAngle);
	};

	Game_CharacterBase.prototype.easySpinSetAngle = function() {
		let angle = 15 * this._easySpinCount;
		if (angle >= 360){
			angle = 0
			this._easySpin = false;
		}
		this._easyActionAngle = this._easyActionReversed ? -angle : angle;
	};

	Game_CharacterBase.prototype.easyShakeSetOffsets = function() {
		const angle = 37.5 * this._easyShakeCount;
		const rad = angle*Math.PI/180
		let offset = amplitude * Math.sin(rad);
		if (angle >= 900){
			this._easyShake = false;
			this._easyShakeCount = 0;
			offset = 0;
		}
		this._easyActionX = this._easyActionReversed ? -offset : offset;
	};

	Game_CharacterBase.prototype.easySpin = function(bool = true) {
		this._easySpin = true;
		this._easySpinCount = 0;
		if (bool) this._waitCount = 24;
	};

	Game_CharacterBase.prototype.easyAngle = function(angle = 0) {
		this._easyAngle = angle % 360;
	};

	Game_CharacterBase.prototype.easyShake = function(bool = true) {
		this._easyShake = true;
		this._easyShakeCount = 0;
		if (bool) this._waitCount = 24;
	};

	Game_CharacterBase.prototype.easyBackoff = function() {
		this.moveBackward();
	};

	Game_CharacterBase.prototype.easyJump = function() {
		this.jump(0,0);
	};
	
	Game_CharacterBase.prototype.easyBackstep = function() {
		this.backstep();
	};

	Game_CharacterBase.prototype.backstep = function() {
		const dir = this.direction();
		const x = dir===6?-1:dir===4?1:0;
		const y = dir===2?-1:dir===8?1:0;
		const lastDirectionFix = this.isDirectionFixed();
		this.setDirectionFix(true);
		this.jump(x,y);
		this.setDirectionFix(lastDirectionFix);
	};

	Game_CharacterBase.prototype.easyBlink = function(bool = true) {
		if (this._easyBlink !== bool) {
			this.setEasyBlinkTransparent(false);
			this._easyBlink = bool;
			this._easyBlinkCount = blinkInterval;
		}
	};
	
	Game_CharacterBase.prototype.easyTra = function(bool = true) {
		this._easyTra = bool;
	};
	
	Game_CharacterBase.prototype.easyReverse = function(bool = !this._easyActionReversed) {
		this._easyActionReversed = bool;
	};

	Game_CharacterBase.prototype.bushDepth = function() {
		return this.isEasyRotating() ? 0 : this._bushDepth;
	};

	//-----------------------------------------------------------------------------
	// Game_Player

	Game_Player.prototype.easyJump = function() {
		this._easyActionJumping = true;
		Game_CharacterBase.prototype.easyJump.call(this);
	};
	
	Game_Player.prototype.easyBackstep = function() {
		this._easyActionJumping = true;
		Game_CharacterBase.prototype.easyBackstep.call(this);
	};

	const _Game_Player_updateJump = Game_Player.prototype.updateJump;
	Game_Player.prototype.updateJump = function() {
		_Game_Player_updateJump.call(this);
		if (this._jumpCount === 0) {
			this._easyActionJumping = false;
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Followers

	const _Game_Followers_jumpAll = Game_Followers.prototype.jumpAll;
	Game_Followers.prototype.jumpAll = function() {
		if (!$gamePlayer._easyActionJumping) {
			_Game_Followers_jumpAll.call(this);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Follower

	const _Game_Follower_update = Game_Follower.prototype.update;
	Game_Follower.prototype.update = function() {
		_Game_Follower_update.call(this);
		this.easyTra($gamePlayer._easyTra);
	};

	//-----------------------------------------------------------------------------
	// Game_Event

	const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		_Game_Event_setupPageSettings.call(this);
		this.setupSettingsEasyAction();
	};

	Game_Event.prototype.setupSettingsEasyAction = function() {
		const page = this.page();
		this.easyReverse(page.easyReverse || false);
		this.easyAngle(page.easyAngle);
		this.easyBlink(page.easyBlink || false);
		this.easyTra(page.easyTra || false);
	};

	//-----------------------------------------------------------------------------
	// Sprite_Character

	const _Sprite_Character_updateFrame = Sprite_Character.prototype.updateFrame;
	Sprite_Character.prototype.updateFrame = function() {
		_Sprite_Character_updateFrame.call(this);
		this.updateEasyActionFrame();
	};

	Sprite_Character.prototype.updateEasyActionFrame = function() {
		this.updateEasyActionSprite();
		if (this._character.isEasyRotating()) {
			const sx = this._frame.x;
			const sy = this._frame.y;
			const pw = this._frame.width;
			const ph = this._frame.height;
			this._easyActionBody.setFrame(sx, sy, pw, ph);
			this.setFrame(sx, sy, 0, ph);
		}
	};

	Sprite_Character.prototype.updateEasyActionSprite = function() {
		if (this._character.isEasyRotating()) {
			this.createEasyActionSprite();
			this._easyActionBody.bitmap = this.bitmap;
			this._easyActionBody.visible = true;
			this._easyActionBody.y = -this.height/2;;
			this._easyActionBody.setBlendColor(this.getBlendColor());
			this._easyActionBody.setColorTone(this.getColorTone());
			this._easyActionBody.blendMode = this.blendMode;
			this._easyActionBody.rotation = (this._character._easyActionAngle + this._character._easyAngle) * Math.PI / 180;
		} else if (this._easyActionBody) {
			this._easyActionBody.visible = false;
		}
	};

	if (useMZ) {
		Sprite_Character.prototype.updateEasyActionSprite = function() {
			if (this._character.isEasyRotating()) {
				this.createEasyActionSprite();
				this._easyActionBody.bitmap = this.bitmap;
				this._easyActionBody.visible = true;
				this._easyActionBody.y = -this.height/2;;
				this._easyActionBody.setBlendColor(this.getBlendColor());
				this._easyActionBody.setColorTone(this.getColorTone());
				this._easyActionBody.blendMode = this.blendMode;
				this._easyActionBody.angle = this._character._easyActionAngle + this._character._easyAngle;
			} else if (this._easyActionBody) {
				this._easyActionBody.visible = false;
			}
		};
	}

	Sprite_Character.prototype.createEasyActionSprite = function() {
		if (!this._easyActionBody) {
			this._easyActionBody = new Sprite();
			this._easyActionBody.anchor.x = 0.5;
			this._easyActionBody.anchor.y = 0.5;
			this.addChild(this._easyActionBody);
		}
	};

	const _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
	Sprite_Character.prototype.updateOther = function() {
		_Sprite_Character_updateOther.call(this);
		if (this._character._easyTra) {
			this.opacity -= Math.floor(this.opacity/2);
		}
	};

	const _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
	Sprite_Character.prototype.updatePosition = function() {
		_Sprite_Character_updatePosition.call(this);
		const character = this._character;
		if (character._easyActionX) {
			this.x += character._easyActionX;
		}
	};

	//-----------------------------------------------------------------------------
	// DataManager

	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		_DataManager_onLoad.call(this, object);
		if (!!(object.data && object.events) && Array.isArray(object.events)) {
			for (const event of object.events) {
				if (event && event.pages){
					extractMetadata(event);
				}
			}
		}
	};

	function extractMetadata(data) {
		for (const page of data.pages) {
			const comment = findComment(page);
			const commentData = {"note": comment};
			DataManager.extractMetadata(commentData);
			addPageSettings(page, commentData.meta);
		}
	}

	function findComment(page) {
		const list = page.list;
		if (!list[0] && list[0].code !== 108) {
			return "";
		}
		let comment = list[0].parameters[0];
		for (let i = 1; list[i] && list[i].code === 408; i++) {
			comment += list[i].parameters[0];
		}
		return comment;
	}

	function addPageSettings(page, meta) {
		page.easyReverse = !!meta["easyReverse"];
		page.easyAngle = Number(meta['easyAngle'] || 0);
		page.easyBlink = !!meta['easyBlink'];
		page.easyTra = !!meta['easyTra'];
	}

}