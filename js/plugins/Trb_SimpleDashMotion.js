//=============================================================================
// Trb_SimpleDashMotion.js
//=============================================================================
//Copyright (c) 2016 Trb
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//twitter https://twitter.com/Trb_surasura
/*:
 * @target MZ
 * @plugindesc 簡易的なダッシュモーションを実装します
 * @author Trb
 * @version 1.00 2016/6/3  初版
 *          1.1  2016/6/4  フォロワーがダッシュモーションにならない不具合を修正
 *                         また、構造を少し改変しやすい形に変更
 *          1.2  2020/8/22 上下値、傾き値をパラメータから設定できるように変更
 * 
 * 
 * @param 傾き値
 * @desc 走っている時の傾き具合です
 * @default 14
 * @type number
 * @max 90
 * 
 * @param 上下値
 * @desc 走っている時の上下に動く幅です
 * @default 2
 * @type number
 * @max 100
 * 
 * 
 * @help キャラクターが走っている時、画像を少し傾け上下させることで
 * 簡易的にダッシュモーションのようにします。
 * 
 * MV,MZの両方に対応しています。
 */
(function () {

const parameters = PluginManager.parameters('Trb_SimpleDashMotion');
const lean = Number(parameters['傾き値']);
const shake = Number(parameters['上下値']);

const Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
Sprite_Character.prototype.updateOther = function() {
    Sprite_Character_updateOther.call(this);
    this.updateDashMotion();//ダッシュモーション用の処理を追加
};

//ダッシュモーションの計算
Sprite_Character.prototype.updateDashMotion = function() {
    const chara = this._character;
    const isDashing = chara._memberIndex ? $gamePlayer.isDashing() : chara.isDashing();

    if (isDashing) { // If the character is dashing
        this.y -= chara.pattern() % 2 * shake; // Apply a vertical offset (shaking the image up and down)

        // Adjust the sprite based on the character's direction
        switch (chara.direction()) {
            case 2: // Down
            case 8: // Up
                this.scale.y = 0.92; // Slightly squash the sprite
                this.rotation = 0;
                break;
            case 4: // Left
                this.rotation = lean * -0.01; // Slightly lean to the left
                break;
            case 6: // Right
                this.rotation = lean * 0.01; // Slightly lean to the right
                break;
            // Add the cases for the diagonal directions
            case 1: // Down-left
                this.rotation = lean * -0.005; // Slightly lean to the left
                this.scale.y = 0.96; // Less squash than vertical
                break;
            case 3: // Down-right
                this.rotation = lean * 0.005; // Slightly lean to the right
                this.scale.y = 0.96; // Less squash than vertical
                break;
            case 7: // Up-left
                this.rotation = lean * -0.005; // Slightly lean to the left
                this.scale.y = 0.96; // Less squash than vertical
                break;
            case 9: // Up-right
                this.rotation = lean * 0.005; // Slightly lean to the right
                this.scale.y = 0.96; // Less squash than vertical
                break;
        }
    } else { // If the character is not dashing, reset the rotation and scaling
        this.rotation = 0;
        this.scale.y = 1;
    }
};



})();