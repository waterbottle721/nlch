//=============================================================================
// NormalDistribution（正規分布プラグイン）
// by フェルミウム湾
//=============================================================================

/*:
 * @plugindesc 正規分布プラグイン
 * 正規乱数の生成などを行います。
 * @author フェルミウム湾
 * 
 * @help 正規分布を扱います。また、正規分布に基づく乱数を求めます。
 * 厳密な手法に基づき、計算には若干時間が掛かります。
 * エンカウントの歩数を正規分布に基づいて決めるときなどに便利です。
 * プラグインコマンドから使用してください。
 * 
 * ======================================================================
 * コマンド『正規乱数』
 * コマンド『NormalRandom』
 * --------------------------------------------------------
 * 正規分布に基づく乱数を生成し、変数に返します。
 * --------------------------------------------------------
 * 引数1）平均μ
 * 引数2）標準偏差σ（分散σのルート）
 * 引数3）出力変数の番号
 * 引数4）割合[％]（省略すると1σ（68.3％））
 * --------------------------------------------------------
 * 例）
 * 入力「正規乱数 100 20 12 80」
 * 平均100, 標準偏差20の正規乱数を生成し、変数12番に代入。
 * 80％の確率で100±20の範囲（80～120）の値になる。
 * 
 * ======================================================================
 * コマンド『正規分布』
 * コマンド『NormalDistribution』
 * --------------------------------------------------------
 * 正規分布を計算し、その結果を定数倍して四捨五入、整数にして変数に返します。
 * --------------------------------------------------------
 * 引数1）入力x
 * 引数2）平均μ
 * 引数3）標準偏差σ（分散σのルート）
 * 引数4）計算後の定数倍
 * 引数5）出力変数の番号
 * --------------------------------------------------------
 * 例）N(123 | 100, 20)を求める。（真値：0.0102968……）
 * 入力「正規分布 123 100 20 100000 12」
 * 変数12番に1030（真値の10万倍）を代入。
 * 
 * ======================================================================
 * 
 * 【利用規約】
 *  どうでもいいです。著作権を放棄するので勝手にぐちゃぐちゃにしてください。
 *  改変も再配布も、アダルト利用も構いません。連絡も不要です。
 * 
 */

(function() {

	// 乱数の精度
	var RandomAccuracy = 10000000;

	// ∫[a→b]f(x)dxを求める
	var Integral = function(f, a, b){
		var n = 100;
		var h = (b - a) / n;
		var ret = f(a) - f(b);
		for(var i = 1; i <= n - 1; i += 2){
			ret += 4 * f(a + i * h);
			ret += 2 * f(a + (i + 1) * h);
		}
		ret *= h / 3;
		return ret;
	};

	// dy／dx＝f(x, y)（初期条件y(x0)＝y0）のときy(x)を求める
	var RungeKutta = function(f, x0, y0, x){
		var n = 100;
		var h = (x - x0) / n;
		var x = x0;
		var y = y0;
		for(var i = 0; i < n; i++){
			var k0 = h * f(x, y);
			var k1 = h * f(x + h / 2, y + k0 / 2);
			var k2 = h * f(x + h / 2, y + k1 / 2);
			var k3 = h * f(x + h, y + k2);
			var k = (k0 + 2 * k1 + 2 * k2 + k3) / 6;
			x += h;
			y += k;
		}
		return y;
	};

	// 誤差関数erf(x)
	var ErrorFunc = function(x){
		return 2 / Math.sqrt(Math.PI) * Integral(function(x){return Math.exp(-x * x);}, 0, x);
	};

	// 逆誤差関数erfinv(x)
	var InvErrorFunc = function(x){
		return RungeKutta(function(x, y){return Math.sqrt(Math.PI) / 2 * Math.exp(y * y);}, 0, 0, x);
	};

	// 正規分布N(x | m, s)（平均m, 分散s^2）
	var NormalDistribution = function(x, m, s){
		return 1 / Math.sqrt(2 * s * s * Math.PI) * Math.exp(-(x - m) * (x - m) / (2 * s * s));
	};

	// 平均m, 分散s^2の正規乱数
	var NormalRand = function(m, s){
		var A = Math.randomInt(RandomAccuracy + 1) / RandomAccuracy;
		return Math.round(Math.sqrt(2) * s * InvErrorFunc(2 * A - ErrorFunc(m / (Math.sqrt(2) * s))) + m);
	}

	var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);

		switch(command){
			case "正規乱数":
			case "NormalRandom":
				var m = Number(args[0]);
				var s = Number(args[1]);
				if(args.length > 3){
					s /= Math.sqrt(2) * InvErrorFunc(Number(args[3]) / 100);
				}
				$gameVariables.setValue(Number(args[2]), NormalRand(m, s));
				break;

			case "正規分布":
			case "NormalDistribution":
				var x = Number(args[0]);
				var m = Number(args[1]);
				var s = Number(args[2]);
				var y = Math.round(NormalDistribution(x, m, s) * Number(args[3]));
				$gameVariables.setValue(Number(args[4]), y);
				break;
		}
	};

})();
