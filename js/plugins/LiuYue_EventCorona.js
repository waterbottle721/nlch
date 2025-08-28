/*:
 * @plugindesc v1.05 LiuYue_EventCorona 事件光环
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================ *
 *
 * 为地图中的事件提供光环,使角色靠近时触发效果
 *
 * 
 *
 *
 *
 *-------------------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 * 
 *-------------------------------------------------------------------
 * 
 *
 *
 *
 *
 *
 *---------------------------------------------------------------------------
 *以下是可以使用的插件指令
 *-----------------------PluginCommand-------------------------
 *
 *
 *
 * ZzyECF IsShowCorona x(true/false)                     //这会修改是否显示光环范围
 * ZzyECF CoronaMode x(circle/rect)                      //这会修改显示的光环模式
 * ZzyECF CoronaRange x                                  //这会修改显示的光环的半径范围,x为正整数,对应1范围为地图中的一格距离
 * ZzyECF EffectFrame x                                  //这会修改光环的执行时间间隔,x为帧数
 * ZzyECF EffectCommand x                                //这会修改调用公共事件的ID值
 * ZzyECF RangePic x                                     //这会修改显示光环范围的位图
 * ZzyECF OffsetX x                                      //这会修改显示光环的位置偏移X,x可以是一个正负整数
 * ZzyECF OffsetY x                                      //这会修改显示光环的位置偏移Y,x可以是一个正负整数
 * ZzyECF BlendMode x(normal/add/multiply/screen)        //这会修改图像的叠加模式 ,normal正常 add相加 multiply相乘 screen屏幕
 * ZzyECF ValueBlend x(normal/add/multiply/screen)       //这会修改数值的叠加模式 ,normal正常 add相加 multiply相乘 screen屏幕
 * ZzyECF DefaultColor x                                 //这会修改图像默认颜色
 * ZzyECF PictureHue x                                   //这会修改图像默认色相
 * ZzyECF InCommand x                                    //这会修改进入时的公共事件
 * ZzyECF OutCommand x                                   //这会修改离开时的公共事件
 *
 * ZzyECF IsShowValue x(true/false)                      //这会设置是否显示增减数值
 * ZzyECF ValueSize x                                    //这会设置显示增减数值的尺寸
 *
 *
 *
 *---------------------------------------------------------------------------
 *以下是可以使用的脚本函数
 *-----------------------Script Function-------------------------
 *
 *
 *
 * Zzy.ECF.IsShowCorona(enable)             //这会修改是否显示光环范围
 * Zzy.ECF.CoronaMode(str)                  //这会修改显示的光环模式
 * Zzy.ECF.CoronaRange(range)               //这会修改显示的光环的半径范围,x为正整数,对应1范围为地图中的一格距离
 * Zzy.ECF.EffectFrame(frame)               //这会修改光环的执行时间间隔,x为帧数
 * Zzy.ECF.EffectCommand(commonId)          //这会修改调用公共事件的ID值
 * Zzy.ECF.InCommand(commonId)              //这会修改进入时的公共事件
 * Zzy.ECF.OutCommand(commonId)             //这会修改离开时的公共事件
 * Zzy.ECF.RangePic(picStr)                 //这会修改显示光环范围的位图
 * Zzy.ECF.OffsetX(offsetX)                 //这会修改显示光环的位置偏移X,x可以是一个正负整数
 * Zzy.ECF.OffsetY(offsetY)                 //这会修改显示光环的位置偏移Y,x可以是一个正负整数
 * Zzy.ECF.BlendMode(modeStr)               //这会修改图像的叠加模式 ,normal正常 add相加 multiply相乘 screen屏幕
 * Zzy.ECF.ValueBlend(modeStr)              //这会修改图像的叠加模式 ,normal正常 add相加 multiply相乘 screen屏幕
 * Zzy.ECF.DefaultColor(color)              //这会修改图像默认颜色
 * Zzy.ECF.PictureHue(hue)                  //这会修改图像默认色相
 * Zzy.ECF.IsShowValue(enable)              //这会设置是否显示增减数值
 * Zzy.ECF.ValueSize(size)                  //这会设置显示增减数值的尺寸
 *
 * Zzy.ECF.ShowValue(value,color,pIndex,evId)                      //这会在地图中指定玩家角色显示文本信息,以下是对于参数的介绍
 * -value:需要显示的文本,这可以是一个数值,可以是一段字符串
 * -color:显示文本的颜色,可使用#000000~#ffffff   rgba(0~255,0~255,0~5255,0~1)   这两种颜色码格式
 * -pIndex:当前角色位于对于下标的数值,注意从0开始计数     例如领头者那么下标值是0      如有三位跟随者下标则分别是1,2,3
 * -evId:将采用本地图事件ID的注释指令配置显示文本,如不填写则使用插件参数中的配置
 *
 *
 * 例:Zzy.ECF.ShowValue(50,'#ffff22',0)         领头者会显示数字50,淡黄色的文本
 *
 *
 *
 *
 * *以下是一些数据库中使用到的便签,请将他们写在 数据库->角色/职业->注释   之中
 *---------------------DataBase Note--------------------
 *
 * <ZzyECF NOCorona>                                       //这会使这个角色或是职业之下不会受到任何增益光环的效果
 *
 *
 *
 *
 *
 *以下是一些地图中事件用到的便签信息,请将他们写在  地图->事件->事件指令->注释  之中
 *---------------------Note Case--------------------
 *
 *
 * <ZzyECF Corona>                                        //将事件识别为光环事件,将会监视玩家是否进入光环之中,执行光环效果,此标签必须添加才会被视为光环
 *
 * <ZzyECF Show: x(true/false)>                           //将会设置是否显示光环范围,此设置优先级大于参数中的设置
 * <ZzyECF Mode: x(circle/rect)>                          //将会设置光环范围的显示模式,此设置优先级大于参数中的设置
 * <ZzyECF Range: x>                                      //将会设置光环半径,此设置优先级大于参数中的设置
 * <ZzyECF Frame: x>                                      //将会设置执行效果的间隔期,此设置优先级大于参数中的设置
 * <ZzyECF Command: x>                                    //将会设置持续光环期间调用公共事件,此设置优先级大于参数中的设置
 * <ZzyECF InCommand: x>                                  //将会设置进入光环时调用公共事件,此设置优先级大于参数中的设置
 * <ZzyECF OutCommand: x>                                 //将会设置离开光环时调用公共事件,此设置优先级大于参数中的设置
 * <ZzyECF RangePic: x>                                   //将会设置修改显示光环的位图,此设置优先级大于参数中的设置
 * <ZzyECF OffsetX: x>                                    //将会设置位图的x偏移
 * <ZzyECF OffsetY: x>                                    //将会设置位图的y偏移
 * <ZzyECF BlendMode: x(normal/add/multiply/screen)>      //将会修改图像的叠加模式,此设置优先级大于参数中的设置
 * <ZzyECF ValueBlend: x(normal/add/multiply/screen)>     //将会修改数值图像的叠加模式,此设置优先级大于参数中的设置
 * <ZzyECF DefaultColor: x>                               //将会设置图像默认颜色,此设置优先级大于参数中的设置
 * <ZzyECF PictureHue: x>                                 //将会设置图像默认色相,此设置优先级大于参数中的设置
 *
 * <ZzyECF IsShowValue: x(true/false)>                    //将会设置是否有可视化数值显示,此设置优先级大于参数中的设置
 *
 *
 * <ZzyECF HP: x>                                         //将会在光环内容执行生命值增减,x可以是一个公式
 * <ZzyECF HPPer: x>                                      //将会在光环内容执行生命值增减百分比,数值1代表1%,x可以是一个公式
 * <ZzyECF MP: x>                                         //将会在光环内容执行魔法值增减,x可以是一个公式
 * <ZzyECF MPPer: x>                                      //将会在光环内容执行魔法值增减百分比,数值1代表1%,x可以是一个公式
 * <ZzyECF TP: x>                                         //将会在光环内容执行TP增减,x可以是一个公式
 * <ZzyECF TPPer: x>                                      //将会在光环内容执行TP增减百分比,数值1代表1%,x可以是一个公式
 *
 * <ZzyECF UseCount: x>                                   //将会设置光环能够响应的次数
 * <ZzyECF RecoverFrame: x>                               //将会设置光环次数的恢复时长
 * <ZzyECF RecoverNum: x>                                 //将会设置光环每次的恢复数量
 * <ZzyECF IsReMapCount: x(true/false)>                   //每次进入地图是否会重置次数
 *
 *
 *
------------------------------------------------------------



 我叫坂本: v1.05 拓展函数脚本,增加数值叠加模式
 我叫坂本：v1.04 修复了使用某些事件时导致崩溃的bug
 我叫坂本：v1.03 添加与旧存档兼容,修复一个在多个光环同时存在时显示数据不正确的bug
 我叫坂本：v1.02 添加更多数字文本显示的插件参数控制
 我叫坂本：v1.01 修复再切换地图时,导致的光环贴图错误的问题,更新光环响应次数相关的操作
 我叫坂本：v1.00 完成插件



------------------------------------------------------------


 *
 *
 * @param ---设置---
 * @default
 *
 * @param CoronaMode
 * @text 光环模式
 * @parent ---设置---
 * @type combo
 * @option circle
 * @option rect
 * @desc 光环控制范围的模式，选择circle为圆形范围,选择rect为方形范围
 * @default circle
 *
 *
 * @param CoronaRange
 * @text 光环半径
 * @parent ---设置---
 * @type Number
 * @desc 设置光环的效果范围的半径值
 * @default 3
 *
 *
 * @param EffectFrame
 * @text 执行效果的间隔期
 * @parent ---设置---
 * @type Number
 * @desc 这是在光环效果下,经过多少帧会执行一次光环的效果,默认为30帧
 * @default 30
 *
 *
 * @param EffectCommand
 * @text 执行效果时公共事件
 * @parent ---设置---
 * @type Number
 * @desc 执行光环时执行的公共事件,填写公共事件ID值,0不会执行任何公共事件,默认值为0
 * @default 0
 *
 *
 * @param EffectScript
 * @text 执行效果时脚本
 * @parent ---设置---
 * @type note
 * @desc 执行光环时执行的脚本
 * @default ""
 *
 *
 * @param InCommand
 * @text 进入光环时公共事件
 * @parent ---设置---
 * @type Number
 * @desc 刚刚接触到光环时,会执行的公共事件,填写公共事件ID值,0不会执行任何公共事件,默认值为0
 * @default 0
 *
 * @param OutCommand
 * @text 离开光环时公共事件
 * @parent ---设置---
 * @type Number
 * @desc 刚刚离开光环时,会执行的公共事件,填写公共事件ID值,0不会执行任何公共事件,默认值为0
 * @default 0
 *
 * @param CoronaCount
 * @text 光环使用次数
 * @parent ---设置---
 * @type Number
 * @desc 这是触碰光环能使用的次数,当次数使用结束后,光环就会消失,如果设置次数为0,则代表光环有无限次,默认值为0
 * @default 0
 *
 * @param RecoverFrame
 * @text 光环恢复时长
 * @parent ---设置---
 * @type Number
 * @desc 光环会经过多少帧的时长进行恢复,如果设为0,则代表不会进行恢复,默认值为0
 * @default 0
 *
 * @param RecoverNum
 * @text 光环恢复次数
 * @parent ---设置---
 * @type Number
 * @desc 每次光环记性恢复时,会恢复多少次,默认值为0
 * @default 0
 *
 * @param IsReMapCount
 * @text 重进地图恢复次数
 * @parent ---设置---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 每次从重进地图时,是否会重置光环的次数信息
 * YES - true     NO - false
 * @default true
 *
 *
 *
 *
 * @param ---显示---
 * @default
 *
 *
 * @param IsShowCorona
 * @text 是否显示光环范围
 * @parent ---显示---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 光环的图片是否显示
 * YES - true     NO - false
 * @default true
 *
 *
 * @param RangePic
 * @text 光环范围图片
 * @parent ---显示---
 * @dir img/pictures
 * @type file
 * @desc 可以填写显示光环图片名称,图片放在img/pictures文件夹中,如果没有添写名称,那么会使用系统默认的绘制图片
 * @default
 *
 * @param OffsetX
 * @text 图片偏移X
 * @parent ---显示---
 * @type Text
 * @desc 显示图片的偏移X,用于微调,x可以是一个正负整数,默认值为0
 * @default 0
 *
 * @param OffsetY
 * @text 图片偏移Y
 * @parent ---显示---
 * @type Text
 * @desc 显示图片的偏移Y,用于微调,x可以是一个正负整数,默认值为0
 * @default 0
 *
 * @param BlendMode
 * @text 图形叠加模式
 * @parent ---显示---
 * @type combo
 * @option normal
 * @option add
 * @option multiply
 * @option screen
 * @desc 图像在地图中的叠层模式,normal正常 add相加 multiply相乘 screen屏幕,默认值normal
 * @default normal
 *
 * @param DefaultColor
 * @text 默认光环颜色
 * @parent ---显示---
 * @type Text
 * @desc 显示默认的光环的颜色,这是在没有添加图片时才会显示,可以用#000000 和rgba(0,0,0,0)两种格式
 * @default rgba(40,255,40,0.6)
 *
 * @param PictureHue
 * @text 图像光环色相
 * @parent ---显示---
 * @type Number
 * @desc 显示光环位图的色相偏移,这是在添加图片时才会显示,范围0~360,用来做不同颜色的变化,默认值0
 * @default 0
 *
 * @param ListShowFrame
 * @text 文本显示间隔
 * @parent ---显示---
 * @type Number
 * @desc 在显示文本队列堆的间隔时长,单位为帧数,默认值为20帧
 * @default 20
 *
 *
 *
 * @param ---视化数值---
 * @default
 *
 *
 * @param IsShowValue
 * @text 是否显示增减数值
 * @parent ---视化数值---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 处于光环效果时,是否可以看到每次交互所产生的数值效果
 * YES - true     NO - false
 * @default true
 *
 * @param ValueSize
 * @text 数值字体大小
 * @parent ---视化数值---
 * @type Number
 * @desc 显示在画面上数值字体的大小
 * @default 24
 *
 *
 * @param ValueBlend
 * @text 数值叠加模式
 * @parent ---视化数值---
 * @type combo
 * @option normal
 * @option add
 * @option multiply
 * @option screen
 * @desc 数值在地图中的叠层模式,normal正常 add相加 multiply相乘 screen屏幕,默认值normal
 * @default normal
 *
 *
 * @param HPColor
 * @text 数值生命颜色
 * @parent ---视化数值---
 * @type Text
 * @desc 生命光环时显示的数值颜色,可以用#000000 和rgba(0,0,0,0)两种格式
 * @default rgba(40,255,40,0.8)
 *
 *
 * @param MPColor
 * @text 数值魔法颜色
 * @parent ---视化数值---
 * @type Text
 * @desc 魔法光环时显示的数值颜色,可以用#000000 和rgba(0,0,0,0)两种格式
 * @default rgba(40,40,255,0.8)
 *
 * @param TPColor
 * @text 数值TP颜色
 * @parent ---视化数值---
 * @type Text
 * @desc TP光环时显示的数值颜色,可以用#000000 和rgba(0,0,0,0)两种格式
 * @default rgba(255,40,255,0.8)
 *
 *
 * @param HPPerColor
 * @text 数值百分比生命颜色
 * @parent ---视化数值---
 * @type Text
 * @desc 生命百分比光环时显示的数值颜色,可以用#000000 和rgba(0,0,0,0)两种格式
 * @default rgba(40,255,40,0.8)
 *
 *
 * @param MPPerColor
 * @text 数值百分比魔法颜色
 * @parent ---视化数值---
 * @type Text
 * @desc 魔法百分比光环时显示的数值颜色,可以用#000000 和rgba(0,0,0,0)两种格式
 * @default rgba(40,40,255,0.8)
 *
 * @param TPPerColor
 * @text 数值百分比TP颜色
 * @parent ---视化数值---
 * @type Text
 * @desc TP百分比光环时显示的数值颜色,可以用#000000 和rgba(0,0,0,0)两种格式
 * @default rgba(255,40,255,0.8)
 *
 *
 * @param TextShowFrame
 * @text 文本存在时长
 * @parent ---视化数值---
 * @type Number
 * @desc 出现的文字存在的时长,单位为帧数,默认值为40
 * @default 40
 *
 * @param TextAngle
 * @text 文本角度
 * @parent ---视化数值---
 * @type Text
 * @desc 出现的文字的方向,范围0~360,默认值为0
 * @default 0
 *
 * @param AngleArea
 * @text 角度区域
 * @parent ---视化数值---
 * @type Text
 * @desc 这是文字角度偏移的随机区域范围0~180,请输入小数正数,默认值为0
 * @default 0
 *
 * @param TextSpeed
 * @text 文本速度
 * @parent ---视化数值---
 * @type Text
 * @desc 出现的文字的移动速度,默认值为1
 * @default 1
 *
 * @param SpeedRandPer
 * @text 速度随机百分比
 * @parent ---视化数值---
 * @type Text
 * @desc 出现的文字的移动速度的随机百分比差异,范围0~100,请输入小数正数,默认值为0
 * @default 0
 *
 * @param TextGravity
 * @text 文本重力
 * @parent ---视化数值---
 * @type Text
 * @desc 文本的重力值,默认值为9.8
 * @default 9.8
 *
 * @param GravityRandPer
 * @text 重力随机百分比
 * @parent ---视化数值---
 * @type Text
 * @desc 出现的文字的移动重力的随机百分比差异,范围0~100,请输入小数正数,默认值为0
 * @default 0
 *
 * @param GravityMaxSpeed
 * @text 重力下落最大速度
 * @parent ---视化数值---
 * @type Text
 * @desc 限制重力计算下落的最大速度值,默认值为10
 * @default 10
 *
 * @param TextFadeIn
 * @text 文本渐入时长
 * @parent ---视化数值---
 * @type Number
 * @desc 出现的文字渐入完全透明度的时长,单位为帧数,默认值为5
 * @default 5
 *
 * @param FadeInRandPer
 * @text 文本渐入百分比
 * @parent ---视化数值---
 * @type Text
 * @desc 出现的文字渐入完全透明度的百分比差异,范围0~100,请输入小数正数,默认值为0
 * @default 0
 *
 * @param TextFadeOut
 * @text 文本淡出时长
 * @parent ---视化数值---
 * @type Number
 * @desc 出现的文字渐入完全透明的时长,单位为帧数,默认值为5
 * @default 5
 *
 * @param FadeOutRandPer
 * @text 文本淡出百分比
 * @parent ---视化数值---
 * @type Text
 * @desc 出现的文字渐入完全透明度的百分比差异,范围0~100,请输入小数正数,默认值为0
 * @default 0
 *
 *
 *
 *
 *
 */


var LiuYue = LiuYue || {};
LiuYue.LiuYue_EventCorona = true;//插件启动

var Zzy = Zzy || {};
Zzy.ECF = Zzy.ECF || {};
Zzy.ECF.version = 1.05;  
Zzy.Parameters = PluginManager.parameters('LiuYue_EventCorona');
Zzy.Param = Zzy.Param || {};


Zzy.Param.ECFIsShowCorona = eval(String(Zzy.Parameters['IsShowCorona']));//是否显示光环范围
Zzy.Param.ECFCoronaMode = String(Zzy.Parameters['CoronaMode']);//光环模式
Zzy.Param.ECFCoronaRange = Number(Zzy.Parameters['CoronaRange']);//光环半径
Zzy.Param.ECFEffectFrame = parseInt(Zzy.Parameters['EffectFrame']);//光环内执行效果的间隔期
Zzy.Param.ECFEffectCommand = parseInt(Zzy.Parameters['EffectCommand']);//公共事件
Zzy.Param.ECFEffectScript = new Function(JSON.parse(Zzy.Parameters['EffectScript']));//执行效果时脚本
Zzy.Param.ECFRangePic = String(Zzy.Parameters['RangePic']);//光环范围图片
Zzy.Param.ECFOffsetX = Number(Zzy.Parameters['OffsetX']);//图片偏移X
Zzy.Param.ECFOffsetY = Number(Zzy.Parameters['OffsetY']);//图片偏移Y
Zzy.Param.ECFBlendMode = String(Zzy.Parameters['BlendMode']);//图形叠加模式
Zzy.Param.ECFListShowFrame = parseInt(Zzy.Parameters['ListShowFrame']);//显示间隔

Zzy.Param.ECFInCommand = parseInt(Zzy.Parameters['InCommand']);
Zzy.Param.ECFOutCommand = parseInt(Zzy.Parameters['OutCommand']);

Zzy.Param.ECFDefaultColor = String(Zzy.Parameters['DefaultColor']);//默认光环颜色
Zzy.Param.ECFPictureHue = Number(Zzy.Parameters['PictureHue']);//图像光环色相

Zzy.Param.ECFIsShowValue = eval(String(Zzy.Parameters['IsShowValue']));//是否显示增减数值
Zzy.Param.ECFValueSize = parseInt(Zzy.Parameters['ValueSize']);//数值字体大小
Zzy.Param.ECFValueBlend = String(Zzy.Parameters['ValueBlend']);//数值叠加模式

Zzy.Param.ECFHPColor = String(Zzy.Parameters['HPColor']);//数值生命颜色
Zzy.Param.ECFMPColor = String(Zzy.Parameters['MPColor']);//数值魔法颜色
Zzy.Param.ECFTPColor = String(Zzy.Parameters['TPColor']);//数值TP颜色
Zzy.Param.ECFHPPerColor = String(Zzy.Parameters['HPPerColor']);//数值百分比生命颜色
Zzy.Param.ECFMPPerColor = String(Zzy.Parameters['MPPerColor']);//数值百分比魔法颜色
Zzy.Param.ECFTPPerColor = String(Zzy.Parameters['TPPerColor']);//数值百分比TP颜色

Zzy.Param.ECFCoronaCount = parseInt(Zzy.Parameters['CoronaCount']);//光环使用次数
Zzy.Param.ECFRecoverFrame = parseInt(Zzy.Parameters['RecoverFrame']);//光环恢复时长
Zzy.Param.ECFRecoverNum = parseInt(Zzy.Parameters['RecoverNum']);//光环恢复次数
Zzy.Param.ECFIsReMapCount = eval(String(Zzy.Parameters['IsReMapCount']));//是否重置次数

Zzy.Param.ECFTextShowFrame = parseInt(Zzy.Parameters['TextShowFrame']);//文本存在的时长

Zzy.Param.ECFTextAngle = Number(Zzy.Parameters['TextAngle']);//文本角度
Zzy.Param.ECFAngleArea = Number(Zzy.Parameters['AngleArea']);//角度区域
Zzy.Param.ECFTextSpeed = Number(Zzy.Parameters['TextSpeed']);//文本速度
Zzy.Param.ECFSpeedRandPer = Number(Zzy.Parameters['SpeedRandPer']);//随机随机百分比
Zzy.Param.ECFTextGravity = Number(Zzy.Parameters['TextGravity']);//文本重力
Zzy.Param.ECFGravityRandPer = Number(Zzy.Parameters['GravityRandPer']);//重力随机百分比
Zzy.Param.ECFGravityMaxSpeed = Number(Zzy.Parameters['GravityMaxSpeed']);//重力最大速度值

Zzy.Param.ECFTextFadeIn = parseInt(Zzy.Parameters['TextFadeIn']);//文本渐入时长
Zzy.Param.ECFFadeInRandPer = Number(Zzy.Parameters['FadeInRandPer']);//文本渐入百分比
Zzy.Param.ECFTextFadeOut = parseInt(Zzy.Parameters['TextFadeOut']);//文本淡出时长
Zzy.Param.ECFFadeOutRandPer = Number(Zzy.Parameters['FadeOutRandPer']);//文本淡出百分比


Zzy.ECF.TempMapId = 0;//地图标记
Zzy.ECF.TempEvIdArr = [];
Zzy.ECF.TempColorArr = [Zzy.Param.ECFHPColor,Zzy.Param.ECFMPColor,Zzy.Param.ECFTPColor,Zzy.Param.ECFHPPerColor,Zzy.Param.ECFMPPerColor,Zzy.Param.ECFTPPerColor];


//=================================================================
//DataManager
//=================================================================
Zzy.ECF.DataManager_loadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) //旧存档兼容
{
	var result = Zzy.ECF.DataManager_loadGame.call(this,savefileId);
	
	this.ZzyECFInitData();

	return result;
}

DataManager.ZzyECFInitData = function()//初始化参数
{
	if(!$gameSystem.GetIsZzyECFLoaded())
	{
		//初始化
		$gameSystem.ZzyECFInitData();//初始化数据
		$gameSystem.SetIsZzyECFLoaded(true);
	}	
}

//=================================================================
//Game_System
//=================================================================

Zzy.ECF.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.ECF.Game_System_initialize.call(this);
	this.ZzyECFInitData();//初始化数据
	
	this._IsZzyECFLoaded = true;//是否载入完成
	
};
	
Game_System.prototype.GetIsZzyECFLoaded = function()
{
	if(this._IsZzyECFLoaded === undefined)
	{this._IsZzyECFLoaded = false;}
	return this._IsZzyECFLoaded;
}

Game_System.prototype.SetIsZzyECFLoaded = function(enable)
{
	this._IsZzyECFLoaded = enable;
}

Game_System.prototype.ZzyECFInitData = function()
{
	this._ZzyECFIsShowCorona = Zzy.Param.ECFIsShowCorona;
	this._ZzyECFCoronaMode = Zzy.ECF.CoronaModeToInt(Zzy.Param.ECFCoronaMode);
	this._ZzyECFCoronaRange = Zzy.Param.ECFCoronaRange;
	this._ZzyECFEffectFrame = Zzy.Param.ECFEffectFrame;
	this._ZzyECFEffectCommand = Zzy.Param.ECFEffectCommand;
	this._ZzyECFRangePic = Zzy.Param.ECFRangePic;
	this._ZzyECFOffsetX = Zzy.Param.ECFOffsetX;
	this._ZzyECFOffsetY = Zzy.Param.ECFOffsetY;	
	
	this._ZzyECFBlendMode = Zzy.ECF.BlendModeToInt(Zzy.Param.ECFBlendMode);
	this._ZzyECFInCommand = Zzy.Param.ECFInCommand;
	this._ZzyECFOutCommand = Zzy.Param.ECFOutCommand;

	this._ZzyECFDefaultColor = Zzy.Param.ECFDefaultColor;
	this._ZzyECFPictureHue = Zzy.Param.ECFPictureHue;

	this._ZzyECFIsShowValue = Zzy.Param.ECFIsShowValue;
	this._ZzyECFValueSize = Zzy.Param.ECFValueSize;
	this._ZzyECFValueBlend = Zzy.ECF.BlendModeToInt(Zzy.Param.ECFValueBlend);
	
	
	this._ZzyECFCoronaArr = [];//记录接触光圈
	this._ZzyECFCommonArr = [];//事件队列

	this._ZzyECFEventCountInfo = [];//次数记录
}

Game_System.prototype.setZzyECFRecover = function(ev)//设置恢复配置
{
	var mapId = $gameMap.mapId();
	if(!this._ZzyECFEventCountInfo[mapId])
	{this._ZzyECFEventCountInfo[mapId] = [];}

	var evId = ev.eventId();
	var zzyECF = ev.zzyECF;


	var info = {};
	info.useCount = zzyECF.useCount;
	info.recoverFrame = zzyECF.recoverFrame;
	info.recoverNum = zzyECF.recoverNum;
	info.maxCount = info.useCount;
	info.cFrame = 0;


	if(!zzyECF.isReMapCount)//不可以重置时
	{
		//判断是否没有进行过赋值
		if(this._ZzyECFEventCountInfo[mapId][evId])
		{
			if(!this._ZzyECFEventCountInfo[mapId][evId].maxCount)
			{
				this._ZzyECFEventCountInfo[mapId][evId] = info;
			}
		}
		else
		{
			this._ZzyECFEventCountInfo[mapId][evId] = info;	
		}
		
	}
	else
	{
		this._ZzyECFEventCountInfo[mapId][evId] = info;		
	}

	
	
}

Game_System.prototype.getZzyECFRecoverInfo = function(evId)
{
	var mapId = $gameMap.mapId();
	return this._ZzyECFEventCountInfo[mapId][evId];
}



Game_System.prototype.RecordZzyECFCorona = function(ev)//压入ev
{
	var info = {};
	info.mapId = $gameMap.mapId();
	info.evId = ev.eventId();
	info.inCom = ev.zzyECF.inCommand;
	info.outCom = ev.zzyECF.outCommand;
	
	if(info.inCom){this._ZzyECFCommonArr.push(info.inCom);}//压入到执行队列中

	
	for(var i=0;i<this._ZzyECFCoronaArr.length;i++)
	{
		if(!this._ZzyECFCoronaArr[i])
		{
			this._ZzyECFCoronaArr[i] = info;
			return;
		}
	}
	this._ZzyECFCoronaArr.push(info);//压入光环
}

Game_System.prototype.CheckBeingZzyECFCorona = function(ev)//检测光环是否存在
{
	for(var i=0;i<this._ZzyECFCoronaArr.length;i++)
	{
		var info = this._ZzyECFCoronaArr[i];
		if(info && $gameMap.mapId() === info.mapId)
		{
			if(info.evId === ev.eventId())
			{
				return true;
			}
		}
	}
	return false;
}



Game_System.prototype.setZzyECFIsShowCorona = function(enable)
{
	this._ZzyECFIsShowCorona = enable;
}

Game_System.prototype.getZzyECFIsShowCorona = function()
{
	return this._ZzyECFIsShowCorona;
}

Game_System.prototype.setZzyECFCoronaMode = function(str)
{
	this._ZzyECFCoronaMode = str;
}

Game_System.prototype.getZzyECFCoronaMode = function()
{
	return this._ZzyECFCoronaMode;
}

Game_System.prototype.setZzyECFCoronaRange = function(value)
{
	this._ZzyECFCoronaRange = value;
}

Game_System.prototype.getZzyECFCoronaRange = function()
{
	return this._ZzyECFCoronaRange;
}


Game_System.prototype.setZzyECFEffectFrame = function(frame)
{
	this._ZzyECFEffectFrame = frame;
}

Game_System.prototype.getZzyECFEffectFrame = function()
{
	return this._ZzyECFEffectFrame;
}

Game_System.prototype.setZzyECFEffectCommand = function(commonId)
{
	this._ZzyECFEffectCommand = commonId;
}

Game_System.prototype.getZzyECFEffectCommand = function()
{
	return this._ZzyECFEffectCommand;
}

Game_System.prototype.setZzyECFRangePic = function(picStr)
{
	this._ZzyECFRangePic = picStr;
}

Game_System.prototype.getZzyECFRangePic = function()
{
	return this._ZzyECFRangePic;
}

Game_System.prototype.setZzyECFBlendMode = function(modeId)
{
	this._ZzyECFBlendMode = modeId;
}

Game_System.prototype.getZzyECFBlendMode = function()
{
	return this._ZzyECFBlendMode;
}

Game_System.prototype.setZzyECFValueBlend = function(modeId)
{
	this._ZzyECFValueBlend = modeId;
}

Game_System.prototype.getZzyECFValueBlend = function()
{
	return this._ZzyECFValueBlend;
}


Game_System.prototype.setZzyECFInCommand = function(commonId)
{
	this._ZzyECFInCommand = commonId;
}

Game_System.prototype.getZzyECFInCommand = function()
{
	return this._ZzyECFInCommand;
}

Game_System.prototype.setZzyECFOutCommand = function(commonId)
{
	this._ZzyECFOutCommand = commonId;
}

Game_System.prototype.getZzyECFOutCommand = function()
{
	return this._ZzyECFOutCommand;
}




//================================================================
//Game_Interpreter
//================================================================
Zzy.ECF.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	Zzy.ECF.Game_Interpreter_pluginCommand.call(this,command,args);
	if(command === 'ZzyECF')
	{
		this.ZzyECFCommand(args);
	}
	
}

Game_Interpreter.prototype.ZzyECFCommand = function(args)
{
	var command = String(args[0]);

	switch(command)
	{
		case 'IsShowCorona':
		var enable = eval(String(args[1]));
		Zzy.ECF.IsShowCorona(enable);
		
		//$gameSystem.setZzyECFIsShowCorona(enable);
		break;
		
		case 'CoronaMode':
		var str = Zzy.ECF.CoronaModeToInt(String(args[1]));
		Zzy.ECF.CoronaMode(str);
		
		//$gameSystem.setZzyECFCoronaMode(str);
		break;

		case 'CoronaRange':
		var range = Number(args[1]);
		Zzy.ECF.CoronaRange(range);
		
		//$gameSystem.setZzyECFCoronaRange(range);
		break;
		
		case 'EffectFrame':
		var frame = parseInt(args[1]);
		Zzy.ECF.EffectFrame(frame);
		
		//$gameSystem.setZzyECFEffectFrame(frame);
		break;
		
		case 'EffectCommand':
		var commonId = parseInt(args[1]);
		Zzy.ECF.EffectCommand(commonId);
		
		//$gameSystem.setZzyECFEffectCommand(commonId);
		break
		
		case 'RangePic':
		var picStr = String(args[1]);
		Zzy.ECF.RangePic(picStr);
		
		//$gameSystem.setZzyECFRangePic(picStr);
		break;
		
		case 'OffsetX':
		var offsetX = Number(args[1]);
		Zzy.ECF.OffsetX(offsetX);
		
		//$gameSystem._ZzyECFOffsetX = offsetX;
		break;
		
		case 'OffsetY':
		var offsetY = Number(args[1]);
		Zzy.ECF.OffsetY(offsetY);
		
		//$gameSystem._ZzyECFOffsetY = offsetY;
		break;
		
		case 'BlendMode':
		var modeStr = String(args[1]);
		Zzy.ECF.BlendMode(modeStr);
		
		//$gameSystem.setZzyECFBlendMode(modeStr);
		break;
		
		case 'ValueBlend':
		var modeStr = String(args[1]);
		Zzy.ECF.ValueBlend(modeStr);
		
		//$gameSystem.setZzyECFValueBlend(modeStr);
		break;
		
		case 'InCommand':
		var commonId = parseInt(args[1]);
		Zzy.ECF.InCommand(commonId);
		
		//$gameSystem.setZzyECFInCommand(commonId);
		break;
		
		case 'OutCommand':
		var commonId = parseInt(args[1]);
		Zzy.ECF.OutCommand(commonId);
		
		//$gameSystem.setZzyECFOutCommand(commonId);
		break;
		
		case 'DefaultColor':
		var color = String(args[1]);
		Zzy.ECF.DefaultColor(color);
		
		//$gameSystem._ZzyECFDefaultColor = color;
		break;
		
		case 'PictureHue':
		var hue = Number(args[1]);
		Zzy.ECF.PictureHue(hue);
		
		//$gameSystem._ZzyECFPictureHue = hue;
		break;
		
		case 'IsShowValue':
		var enable = eval(String(args[1]));
		Zzy.ECF.IsShowValue(enable);
		
		//$gameSystem._ZzyECFIsShowValue = enable;
		break;
		
		case 'ValueSize':
		var size = parseInt(args[1]);
		Zzy.ECF.ValueSize(size);
		
		//$gameSystem._ZzyECFValueSize = size;
		break;
		
		case 'ValueBlend':
		var blend = 
		asd
		break;
		
	}
}


this._ZzyECFValueBlend = Zzy.Param.ECFValueBlend;




//================================================================
//DataManager
//================================================================
Zzy.ECF.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
	if (!Zzy.ECF.DataManager_isDatabaseLoaded.call(this)) return false;
	
	this.ZzyECFLoadNoteCase1($dataArmors);//护甲
	this.ZzyECFLoadNoteCase1($dataWeapons);//武器
	return true;
}

DataManager.ZzyECFLoadNoteCase1 = function(objArr)
{
  for (var i = 1; i < objArr.length; i++) 
  {
    var obj = objArr[i];
    var noteData = obj.note.split(/[\r\n]+/);
	obj.zzyECF = {};

	for(var j=0;j<noteData.length;j++)
	{
		var lineStr = noteData[j];
		if(lineStr.match(/<ZZYSEF NOCORONA:[ ](.*)>/i))
		{
			obj.zzyECF.isCorona = false;//不开启
		}		
	}
  }
}




//============================================================================================
//Game_Event
//============================================================================================

Zzy.ECF.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() //加载事件信息
{
	Zzy.ECF.Game_Event_setupPage.call(this);
	this.ZzyECFInitData();//调用初始化数据
	
	this.CreateZzyECFSprite();//创造对象
}
	
Game_Event.prototype.CreateZzyECFSprite = function()
{
	if(this.zzyECF && this.zzyECF.isCorona)
	{
		SceneManager._scene.CreateZzyECFSprite(this);//延迟调用
	}
	
}
	
	

Game_Event.prototype.ZzyECFInitData = function()
{
	if (!this.page()) return;

    var list = this.list();
    var len = list.length;

    this.zzyECF = {};//清空

    this.ZzyECFInitZzyECF();

	
  for (var i = 0; i < len; ++i) 
  {
    var ev = list[i];
	
    if ([108, 408].contains(ev.code)) 
	{	
      if(ev.parameters[0].match(/<ZZYECF[ ]CORONA>/i))//设置为光环
	  {
		 this.zzyECF.isCorona = true;
	  }  
      else if(ev.parameters[0].match(/<ZZYECF[ ]SHOW:[ ](.*)>/i))//设置为光环
	  {
		 this.zzyECF.isShowCorona = eval(String(RegExp.$1));
	  }	  
      else if(ev.parameters[0].match(/<ZZYECF[ ]MODE:[ ](.*)>/i))
	  {
		 this.zzyECF.modeCorona = Zzy.ECF.CoronaModeToInt(String(RegExp.$1));
	  }	  
      else if(ev.parameters[0].match(/<ZZYECF[ ]RANGE:[ ](.*)>/i))
	  {
		 this.zzyECF.range = parseFloat(RegExp.$1);
	  }	 	  
      else if(ev.parameters[0].match(/<ZZYECF[ ]FRAME:[ ](.*)>/i))
	  {
		 this.zzyECF.effectFrame = parseInt(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]COMMAND:[ ](.*)>/i))
	  {
		 this.zzyECF.commonId = parseInt(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]RANGEPIC:[ ](.*)>/i))
	  {
		 this.zzyECF.sprPic = String(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]OFFSETX:[ ](.*)>/i))
	  {
		 this.zzyECF.ofx = Number(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]OFFSETY:[ ](.*)>/i))
	  {
		 this.zzyECF.ofy = Number(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]BLENDMODE:[ ](.*)>/i))
	  {
		 this.zzyECF.modeBlend = Zzy.ECF.BlendModeToInt(String(RegExp.$1));
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]VALUEBLEND:[ ](.*)>/i))
	  {
		 this.zzyECF.valueBlend = Zzy.ECF.BlendModeToInt(String(RegExp.$1));
	  }	  
	  else if(ev.parameters[0].match(/<ZZYECF[ ]INCOMMAND:[ ](.*)>/i))
	  {
		 this.zzyECF.inCommand = parseInt(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]OUTCOMMAND:[ ](.*)>/i))
	  {
		 this.zzyECF.outCommand = parseInt(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]DEFAULTCOLOR:[ ](.*)>/i))
	  {
		 this.zzyECF.defaultColor = String(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]PICTUREHUE:[ ](.*)>/i))
	  {
		 this.zzyECF.pictureHue = Number(RegExp.$1);
	  }
      else if(ev.parameters[0].match(/<ZZYECF[ ]HP:[ ](.*)>/i))
	  {
		 this.zzyECF.param[0] = String(RegExp.$1);
	  }
      else if(ev.parameters[0].match(/<ZZYECF[ ]HPPER:[ ](.*)>/i))
	  {
		 this.zzyECF.paramPer[0] = String(RegExp.$1);
	  }
      else if(ev.parameters[0].match(/<ZZYECF[ ]MP:[ ](.*)>/i))
	  {
		 this.zzyECF.param[1] = String(RegExp.$1);
	  }
      else if(ev.parameters[0].match(/<ZZYECF[ ]MPPER:[ ](.*)>/i))
	  {
		 this.zzyECF.paramPer[1] = String(RegExp.$1);
	  }
      else if(ev.parameters[0].match(/<ZZYECF[ ]TP:[ ](.*)>/i))
	  {
		 this.zzyECF.param[2] = String(RegExp.$1);
	  }
      else if(ev.parameters[0].match(/<ZZYECF[ ]TPPER:[ ](.*)>/i))
	  {
		 this.zzyECF.paramPer[2] = String(RegExp.$1);
	  }
      else if(ev.parameters[0].match(/<ZZYECF[ ]ISSHOWVALUE:[ ](.*)>/i))
	  {
		 this.zzyECF.isShowValue = String(RegExp.$1);
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]USECOUNT:[ ](.*)>/i))
	  {
		  this.zzyECF.useCount = parseInt(RegExp.$1);//使用次数
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]RECOVERFRAME:[ ](.*)>/i))
	  {
		  this.zzyECF.recoverFrame = parseInt(RegExp.$1);//恢复时长
	  }
	  else if(ev.parameters[0].match(/<ZZYECF[ ]RECOVERNUM:[ ](.*)>/i))
	  {
		  this.zzyECF.recoverNum = parseInt(RegExp.$1);//恢复数量
	  }	  
	  else if(ev.parameters[0].match(/<ZZYECF[ ]ISREMAPCOUNT:[ ](.*)>/i))
	  {
		  this.zzyECF.isReMapCount = eval(String(RegExp.$1));//重置次数
	  }
    }
  }	
  $gameSystem.setZzyECFRecover(this);//设置内容
}




Game_Event.prototype.ZzyECFInitZzyECF = function()
{
	this.zzyECF.isCorona = false;
	this.zzyECF.isShowCorona = $gameSystem.getZzyECFIsShowCorona();
	this.zzyECF.modeCorona = $gameSystem.getZzyECFCoronaMode();
	this.zzyECF.range = $gameSystem.getZzyECFCoronaRange();
	this.zzyECF.effectFrame = $gameSystem.getZzyECFEffectFrame();
	this.zzyECF.cEffectFrame = 0;
	this.zzyECF.commonId = $gameSystem.getZzyECFEffectCommand();
	this.zzyECF.sprPic = $gameSystem.getZzyECFRangePic();
	this.zzyECF.ofx = $gameSystem._ZzyECFOffsetX;
	this.zzyECF.ofy = $gameSystem._ZzyECFOffsetY;
	this.zzyECF.modeBlend = $gameSystem.getZzyECFBlendMode();
	this.zzyECF.valueBlend = $gameSystem.getZzyECFValueBlend();
	
	this.zzyECF.inCommand = $gameSystem.getZzyECFInCommand();
	this.zzyECF.outCommand = $gameSystem.getZzyECFOutCommand();
	this.zzyECF.defaultColor = $gameSystem._ZzyECFDefaultColor;
	this.zzyECF.pictureHue = $gameSystem._ZzyECFPictureHue;
	
	this.zzyECF.isShowValue = $gameSystem._ZzyECFIsShowValue;
	
	this.zzyECF.useCount = Zzy.Param.ECFCoronaCount;
	this.zzyECF.recoverFrame = Zzy.Param.ECFRecoverFrame;
	this.zzyECF.recoverNum = Zzy.Param.ECFRecoverNum;
	this.zzyECF.isReMapCount = Zzy.Param.ECFIsReMapCount;
	
	this.zzyECF['param'] = [];
	this.zzyECF['paramPer'] = [];
	
	
}


Zzy.ECF.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function()
{
	Zzy.ECF.Game_Event_update.call(this);
	this.updateZzyECFCorona();
}

Game_Event.prototype.updateZzyECFCorona = function()
{
	if(!this.zzyECF)return;
	if(!this.zzyECF.isCorona)return;//不满足光环

	if(this.zzyECF.cEffectFrame > 0)
	{this.zzyECF.cEffectFrame--;return;}

	var info = $gameSystem.getZzyECFRecoverInfo(this.eventId());
	
	if(info.maxCount)//存在次数
	{
		if(info.recoverFrame)//存在恢复
		{
			if(info.useCount < info.maxCount)
			{
				if(info.cFrame < info.recoverFrame)
				{info.cFrame++;}
				else
				{//对次数进行增加
					info.cFrame = 0;
					info.useCount += info.recoverNum;
					info.useCount = Math.min(info.useCount,info.maxCount);
				}
			}
		}
		if(info.useCount <= 0)return;//不存在次数	
	}



	if(this.CheckZzyECFInRange($gamePlayer))//判断是否在范围中
	{
		this.zzyECF.cEffectFrame = this.zzyECF.effectFrame;
		this.ExeZzyECFCoronaEffect();//执行效果
		
		//减少使用次数
		if(info.useCount > 0)
		{info.useCount--;}
		
		//检测光环中是否拥有
		if(this.zzyECF.inCommand || this.zzyECF.outCommand)//存在时间需处理光环
		{
			if(!$gameSystem.CheckBeingZzyECFCorona(this))
			{
				$gameSystem.RecordZzyECFCorona(this);//压入到光环中
			}			
		}

	}
}


Game_Event.prototype.CheckZzyECFInRange = function(obj)
{
	var disX = Math.abs(obj._realX - this._realX);
	var disY = Math.abs(obj._realY - this._realY);
	
	switch(this.zzyECF.modeCorona)
	{
		case 1:
			if(Math.sqrt(disX*disX+disY*disY) <= this.zzyECF.range)
			{			
				return true;
			}
		break;

		case 2:
			if(disX <= this.zzyECF.range && disY <= this.zzyECF.range)
			{

				return true;
			}
		break;
	}
	return false;
}


Game_Event.prototype.ExeZzyECFCoronaEffect = function()
{
	if(this.zzyECF.param[0])
	{
		var valueArr = this.EvalZzyECFCoronaEffect(this.zzyECF.param[0],0);
		this.ChangeZzyECFValue(valueArr,0);	
		this.ShowZzyECFValue(valueArr,0);
	}
	if(this.zzyECF.param[1])
	{
		var valueArr = this.EvalZzyECFCoronaEffect(this.zzyECF.param[1],1);
		this.ChangeZzyECFValue(valueArr,1);	
		this.ShowZzyECFValue(valueArr,1);
	}
	if(this.zzyECF.param[2])
	{
		var valueArr = this.EvalZzyECFCoronaEffect(this.zzyECF.param[2],2);
		this.ChangeZzyECFValue(valueArr,2);	
		this.ShowZzyECFValue(valueArr,2);
	}
	if(this.zzyECF.paramPer[0])
	{
		var valueArr = this.EvalZzyECFCoronaEffect(this.zzyECF.paramPer[0],0,true);
		this.ChangeZzyECFValue(valueArr,3);	
		this.ShowZzyECFValue(valueArr,3);
	}
	if(this.zzyECF.paramPer[1])
	{
		var valueArr = this.EvalZzyECFCoronaEffect(this.zzyECF.paramPer[1],1,true);
		this.ChangeZzyECFValue(valueArr,4);	
		this.ShowZzyECFValue(valueArr,4);
	}
	if(this.zzyECF.paramPer[2])
	{
		var valueArr = this.EvalZzyECFCoronaEffect(this.zzyECF.paramPer[2],2,true);
		this.ChangeZzyECFValue(valueArr,5);	
		this.ShowZzyECFValue(valueArr,5);
	}	
	
	//执行公共事件,脚本
	if(!$gameTemp.isCommonEventReserved() && this.zzyECF.commonId)
	{$gameTemp.reserveCommonEvent(this.zzyECF.commonId);}

	//执行脚本
	Zzy.Param.ECFEffectScript();
	
}

Game_Event.prototype.ShowZzyECFValue = function(valueArr,colorIndex)
{
	for(var i=0;i<valueArr.length;i++)
	{
		var evId = this.eventId();
		Zzy.ECF.ShowValue(valueArr[i],Zzy.ECF.TempColorArr[colorIndex],i,evId);//数值,颜色,标记,自身对象ID
	}
	
}

Game_Event.prototype.ChangeZzyECFValue = function(valueArr,effectID)//修改数值
{
	var actor = undefined;
	var idList = $gameParty._actors;
	switch(effectID)
	{
		case 0:case 3:
			for(var i=0;i<valueArr.length;i++)
			{
				actor = $gameActors.actor(idList[i]);
				actor.gainHp(valueArr[i]);
			}
			break;
		case 1:case 4:
			for(var i=0;i<valueArr.length;i++)
			{
				actor = $gameActors.actor(idList[i]);
				actor.gainMp(valueArr[i]);
			}
			break;		
		case 2:case 5:
			for(var i=0;i<valueArr.length;i++)
			{
				actor = $gameActors.actor(idList[i]);
				actor.gainTp(valueArr[i]);
			}
			break;			
			
	}
}



Game_Event.prototype.EvalZzyECFCoronaEffect = function(evalStr,paramId,isPer)
{
	var v = $gameVariables._data;
	var w = $gameSwitches._data;
	var e = this;
	var p = $gamePlayer;
	
	var value = eval(evalStr);
	
	//返回小队人数数组
	var actorIdArr = $gameParty._actors;
	
	var valueArr = [];
	
		if(isPer)
		{
			switch(paramId)
			{
				case 0:
					for(var i=0;i<actorIdArr.length;i++)
					{
						var actor = $gameActors.actor(actorIdArr[i]);
						var tvalue = actor.mhp * value * 0.01;
						valueArr[i] = Math.floor(tvalue);
					}
				break;
				case 1:
					for(var i=0;i<actorIdArr.length;i++)
					{
						var actor = $gameActors.actor(actorIdArr[i]);
						var tvalue = actor.mmp * value * 0.01;
						valueArr[i] = Math.floor(tvalue);
					}				
				break;
				case 2:
					for(var i=0;i<actorIdArr.length;i++)
					{
						var actor = $gameActors.actor(actorIdArr[i]);
						var tvalue = actor.maxTp() * value * 0.01;
						valueArr[i] = Math.floor(tvalue);
					}				
				break;
			}
		}
		else
		{
			for(var i=0;i<actorIdArr.length;i++)
			{
				valueArr[i] = value;
			}
		}
	
	return valueArr;
}



//============================================================================================
//Scene_Map
//============================================================================================
Zzy.ECF.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() 
{
	Zzy.ECF.Scene_Map_initialize.call(this);
	this._zzyECFWindow = undefined;
	this._zzyECFVWindow = undefined;
	
	this._zzyECFCache = [];//缓冲ev用于加载

	this._zzyECFCheckList = [];//检测队列
};

Zzy.ECF.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() 
{
	Zzy.ECF.Scene_Map_start.call(this);
	
	
	
	this.CreateZzyECFWindow();//创造窗口
	
	this.CreateZzyECFSprOfEvIdArr();//释放存储对象
};

Scene_Map.prototype.CreateZzyECFSprOfEvIdArr = function()
{
	if(Zzy.ECF.TempMapId === $gameMap.mapId())
	{
		for(var i=0;i<Zzy.ECF.TempEvIdArr.length;i++)
		{
			var evId = Zzy.ECF.TempEvIdArr[i];
			this._zzyECFWindow.CreateSprite($gameMap.event(evId));
		}
		
	}
	Zzy.ECF.TempMapId = $gameMap.mapId();
	Zzy.ECF.TempEvIdArr = [];
}



Scene_Map.prototype.CreateZzyECFWindow = function()
{
	this._zzyECFWindow = new Window_ZzyECFCorona();
	this._zzyECFVWindow = new Window_ZzyECFValue();
	
	this.addChild(this._zzyECFWindow);
	this.addChild(this._zzyECFVWindow);
}

Scene_Map.prototype.CreateZzyECFSprite = function(ev)
{
	if(!this._zzyECFWindow)//对象还未出现,则进行一次缓冲
	{
		this._zzyECFCache.push(ev);
	}
	else
	{
		this._zzyECFWindow.CreateSprite(ev);
	}
}

Zzy.ECF.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function()
{
	Zzy.ECF.Scene_Map_update.call(this);
	this.updateZzyECFWaitCreate();
	this.updateZzyECFCoronaCheck();//光环离开检测
	this.updateZzyECFCommon();
	this.updateZzyECFShowValue();//取出内容
}


Scene_Map.prototype.updateZzyECFCommon = function()
{
	if(!$gameSystem._ZzyECFCommonArr || !$gameSystem._ZzyECFCommonArr.length)return;

		var isHave = false;
		for(var i=0;i<$gameSystem._ZzyECFCommonArr.length;i++)
		{
			if($gameSystem._ZzyECFCommonArr[i])
			{
				if(!$gameTemp.isCommonEventReserved())
				{
					$gameTemp.reserveCommonEvent($gameSystem._ZzyECFCommonArr[i]);//执行公共事件
					$gameSystem._ZzyECFCommonArr[i] = undefined;
				}
				isHave = true;
			}
		}
		
		if(!isHave)
		{
			$gameSystem._ZzyECFCommonArr = [];//清空队列
		}

}

Scene_Map.prototype.updateZzyECFCoronaCheck = function()//光环离开检测
{
	if(!$gameSystem._ZzyECFCoronaArr || !$gameSystem._ZzyECFCoronaArr.length)return;
	
	var isHave = false;
	for(var i = 0;i<$gameSystem._ZzyECFCoronaArr.length;i++)
	{
		if($gameSystem._ZzyECFCoronaArr[i])
		{
			isHave = true;
			var info = $gameSystem._ZzyECFCoronaArr[i];
			if($gameMap.mapId() !== info.mapId)
			{
				if(info.outCom)
				{
					$gameSystem._ZzyECFCommonArr.push(info.outCom);//退出压入到队列中
				}
				$gameSystem._ZzyECFCoronaArr[i] = undefined;
			}
			else
			{
				var ev = $gameMap.event(info.evId);
				if(ev && ev.CheckZzyECFInRange($gamePlayer))
				{
					continue;
				}
				
				if(info.outCom)
				{
					$gameSystem._ZzyECFCommonArr.push(info.outCom);//退出压入到队列中
				}				
				$gameSystem._ZzyECFCoronaArr[i] = undefined;
			}
		}
	}
	
	if(!isHave)
	{
		$gameSystem._ZzyECFCoronaArr = [];
	}
	
}


Scene_Map.prototype.updateZzyECFWaitCreate = function()
{
	if(!this._zzyECFWindow)return;
	for(var i=0;i<this._zzyECFCache.length;i++)
	{
		var ev = this._zzyECFCache[i];
		this._zzyECFWindow.CreateSprite(ev);
	}
	this._zzyECFCache = [];
}


Zzy.ECF.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() 
{
	Zzy.ECF.Scene_Map_terminate.call(this);
	
	this.RecordZzyECFSprIdArr();//记录
};


Scene_Map.prototype.RecordZzyECFSprIdArr = function()
{
	Zzy.ECF.TempEvIdArr = [];
	if(!this._zzyECFWindow){return;}
	
	var infoArr = this._zzyECFWindow.sprInfo;
	for(var i=0;i<infoArr.length;i++)
	{
		Zzy.ECF.TempEvIdArr[i] = infoArr[i].evId;//记录
	}
}

Scene_Map.prototype.PuchZzyECFValue = function(textValue,color,pIndex,evId)
{
	//检测是否存在pIndex下标
	var noIndex = true;
	for(var i=0;i<this._zzyECFCheckList.length;i++)
	{
		if(!this._zzyECFCheckList[i])
		{
			var info = {};
			info.index = pIndex;
			info.valueArr = [];//数值
			info.cIndex = 0;//目前计数下标
			info.cFrame = 0;
			info.evId = evId;
			this._zzyECFCheckList[i] = info;
			break;
		}
		else
		{
			if(this._zzyECFCheckList[i].index === pIndex)//存在下标
			{
				noIndex = false;
				//压入到对应下标队列中
				var info = {};
				info.text = textValue;
				info.color = color;
				info.index = pIndex;
				info.evId = evId;
				this._zzyECFCheckList[i].valueArr.push(info);
				break;
			}			
		}
	}
	
	if(noIndex)
	{
		var info = {};
		info.index = pIndex;
		info.valueArr = [];//数值
		info.cIndex = 0;		
		info.cFrame = 0;
		info.evId = evId;
		this._zzyECFCheckList.push(info);
		this.PuchZzyECFValue(textValue,color,pIndex,evId)
	}
}

Scene_Map.prototype.updateZzyECFShowValue = function()
{
	if(!this._zzyECFCheckList.length)return;
	var len = this._zzyECFCheckList.length;
	var isNoCheck = true;
	for(var i=0;i<len;i++)
	{
		var tInfo = this._zzyECFCheckList[i];//获取每个检测器
		if(tInfo)
		{
			isNoCheck = false;
			if(!tInfo.valueArr.length)
			{
				this._zzyECFCheckList[i] = undefined;
			}
			else
			{
				for(var j=0;j<tInfo.valueArr.length;j++)
				{
					var tArr = tInfo.valueArr;
					if(tInfo.cIndex >= tArr.length)//是否越界
					{
						//代表无法取出数据信息
						this._zzyECFCheckList[i] = undefined;
					}
					else//检测时间
					{
						if(tInfo.cFrame > 0)
						{tInfo.cFrame--;}
						else
						{
							//取出内容
							var cInfo = tArr[tInfo.cIndex];//增加下标
							tInfo.cIndex++;
							tInfo.cFrame = Zzy.Param.ECFListShowFrame;
							this._zzyECFVWindow.CreateSprite(cInfo);
						}
					}
				}				
			}
		}
	}
	if(isNoCheck)
	{
		this._zzyECFCheckList = [];
	}
}


//============================================================================================
//Window_ZzyECFCorona
//============================================================================================
function Window_ZzyECFCorona() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyECFCorona.prototype = Object.create(Window_Base.prototype);
Window_ZzyECFCorona.prototype.constructor = Window_ZzyECFCorona;

Window_ZzyECFCorona.prototype.initialize = function() 
{
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	
	this.InitWindow();
	this.sprInfo = [];//图像管理信息组
	
};

Window_ZzyECFCorona.prototype.InitWindow = function()//初始化
{
	this.opacity = 0;
	
}

Window_ZzyECFCorona.prototype.standardPadding = function() 
{
    return 0;
};

Window_ZzyECFCorona.prototype.textPadding = function() 
{
    return 0;
};


Window_ZzyECFCorona.prototype.CreateSprite = function(ev)//创造事件光环图片
{
	//通过EV来指定图片
	var info = {};
	//申请位图大小
	info.spr = new Sprite_ZzyECFCorona(ev);
	info.evId = ev.eventId();	
	//判断ID是否重复
	
	var isInstall = false;
	
	for(var i=0;i<this.sprInfo.length;i++)
	{
		if(this.sprInfo[i].evId === info.evId)
		{
			isInstall = true;
			//重新安装
			this.removeChild(this.sprInfo[i].spr);
			this.sprInfo[i] = info;
			this.addChild(this.sprInfo[i].spr);
		}
	}
	
	if(!isInstall)
	{
		this.sprInfo.push(info);
		this.addChild(info.spr);
	}
}


//============================================================================================
//Window_ZzyECFValue
//============================================================================================
function Window_ZzyECFValue() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyECFValue.prototype = Object.create(Window_Base.prototype);
Window_ZzyECFValue.prototype.constructor = Window_ZzyECFValue;

Window_ZzyECFValue.prototype.initialize = function() 
{
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	
	this.InitWindow();
	this.sprCache = [];//图像缓存
	
};

Window_ZzyECFValue.prototype.InitWindow = function()//初始化
{
	this.opacity = 0;
	
}

Window_ZzyECFValue.prototype.standardPadding = function() 
{
    return 0;
};

Window_ZzyECFValue.prototype.textPadding = function() 
{
    return 0;
};


Window_ZzyECFValue.prototype.CreateSprite = function(info)//创造精灵
{
	if(!$gameSystem._ZzyECFIsShowValue)return;
	var spr = this.RequestSprite(info);
	
}


Window_ZzyECFValue.prototype.RequestSprite = function(info)
{
	var blendM = this.GetBlendMOfInfo(info);
	
	for(var i=0;i<this.sprCache.length;i++)
	{
		if(this.sprCache[i] && !this.sprCache[i].visible)
		{
			var spr2 = this.sprCache[i];
			spr2.visible = true;
			spr2.resetInfo(info.text,info.color,info.index,blendM);	
			return this.sprCache[i];//返回对象
		}
	}
	
	var spr = new Sprite_ZzyECFValue(info.text,info.color,info.index,blendM);
	this.sprCache.push(spr);
	this.addChild(spr);
	return spr;
	
}


Window_ZzyECFValue.prototype.GetBlendMOfInfo = function(info)
{
	var evId = info.evId;
	if(evId)
	{
		var ev = $gameMap.event(evId);
		return ev.zzyECF.valueBlend === undefined ? $gameSystem.getZzyECFValueBlend() : ev.zzyECF.valueBlend;
	}
	return $gameSystem.getZzyECFValueBlend();
}



//============================================================================================
//Sprite_ZzyECFCorona
//============================================================================================

function Sprite_ZzyECFCorona() {
    this.initialize.apply(this, arguments);
}

Sprite_ZzyECFCorona.prototype = Object.create(Sprite_Base.prototype);
Sprite_ZzyECFCorona.prototype.constructor = Sprite_ZzyECFCorona;

Sprite_ZzyECFCorona.prototype.initialize = function(ev) 
{
    Sprite_Base.prototype.initialize.call(this);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.ev = undefined;//ev位置
	this.bw = 0;
	this.bh = 0;
	this.waitSacle = false;
    this.CreateBitmap(ev);
	
};

Sprite_ZzyECFCorona.prototype.CreateBitmap = function(ev)
{
	this.ev = ev;//记录位置
	var eInfo = ev.zzyECF;//获取信息
	
	
	var tRange = eInfo.range*2+1;	
	this.bw = $gameMap.tileWidth() * tRange;
	this.bh = $gameMap.tileHeight() * tRange;
	
	
	if(!eInfo.sprPic || eInfo.sprPic === '')
	{
		this.bitmap = new Bitmap(this.bw,this.bh);//申请新的位图
		this.scale.x = 1 * $gameScreen.zoomScale();
		this.scale.y = 1 * $gameScreen.zoomScale();
		
		switch(eInfo.modeCorona)
		{
			case 1:
				var color = eInfo.defaultColor;
				this.StrokeCircle(0,0,this.bw,this.bh,color);
			break;
			
			case 2:
				var color = eInfo.defaultColor;
				this.StrokeRect(0,0,this.bw,this.bh,color);
			break;
		}
		
		
	}
	else
	{
		this.bitmap = ImageManager.loadPicture(eInfo.sprPic,eInfo.pictureHue);//申请bitmap位图
		this.waitSacle = true;
		
	}
	
	this.blendMode = eInfo.modeBlend;
	this.visible = eInfo.isShowCorona ? true : false;
	
	this.updatePosition();//更新位置
}


Sprite_ZzyECFCorona.prototype.StrokeRect = function(x, y, width, height, color) 
{
    var context = this.bitmap._context;
    context.save();
	context.lineWidth = 6;
    context.strokeStyle = color;
    context.strokeRect(x, y, width, height);
    context.restore();
    this.bitmap._setDirty();
};

Sprite_ZzyECFCorona.prototype.StrokeCircle = function(x, y, width, height, color) 
{
    var context = this.bitmap._context;
    context.save();
	context.lineWidth = 6;
    context.strokeStyle = color;
	context.beginPath();
    context.arc(x+width/2, y+height/2, width/2-3, 0,2*Math.PI,false);
	context.stroke();
    context.restore();
    this.bitmap._setDirty();	
}

Sprite_ZzyECFCorona.prototype.DrawArcRect = function()
{
	var hdc = this.bitmap._context;
	var r = 6;//半径
	var sx = 0;
	var sy = 0;
	if(this.bw < 2 * r){r = w/2;}
	if(this.bh < 2 * r){r = h/2;}
	hdc.beginPath();
	hdc.moveTo(sx+r,sy);
	hdc.arcTo(sx+this.bw,sy,sx+this.bw,sy+this.bh,r);
	hdc.arcTo(sx+this.bw,sy+this.bh,sx,sy+this.bh,r);
	hdc.arcTo(sx,sy+this.bh,sx,sy,r);
	hdc.arcTo(sx,sy,sx+this.bw,sy,r);
	hdc.closePath();	
}

Sprite_ZzyECFCorona.prototype.update = function()//确认位置
{
	if(!this.visible)return;
	this.updateWaitScale();
	this.updatePosition();
}

Sprite_ZzyECFCorona.prototype.updateWaitScale = function()
{
	if(!this.waitSacle)return;
	if(this.bitmap && this.bitmap.width && this.bitmap.height)
	{
		this.waitSacle = false;
		this.scale.x = this.bw / this.bitmap.width;
		this.scale.y = this.bh / this.bitmap.height;
	}
}

Sprite_ZzyECFCorona.prototype.updatePosition = function()//设置光环位置
{
	this.x = this.ev.screenX()+this.ev.zzyECF.ofx;
	this.y = this.ev.screenY()+this.ev.zzyECF.ofy-this.CharOffsetY();
	this.x *= $gameScreen.zoomScale();
	this.y *= $gameScreen.zoomScale();
}

Sprite_ZzyECFCorona.prototype.CharOffsetY = function()
{
	return 24;
}





//============================================================================================
//Sprite_ZzyECFValue
//============================================================================================

function Sprite_ZzyECFValue() {
    this.initialize.apply(this, arguments);
}

Sprite_ZzyECFValue.prototype = Object.create(Sprite_Base.prototype);
Sprite_ZzyECFValue.prototype.constructor = Sprite_ZzyECFValue;

Sprite_ZzyECFValue.prototype.initialize = function(textValue,color,pIndex,blendM) 
{
    Sprite_Base.prototype.initialize.call(this);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.valueText = 0;
	this.color = 0;
	this.pIndex = 0;//位置

	this.bw = 0;
	this.bh = 0;
	
	this.bFrame = 0;
	this.cbFrame = 0;
	
	this.disX = 0;
	this.disY = 0;
	this.pos = {};
	
	this.angle = 0;//角度
	this.speed = 0;//速度
	this.gravity = 0;
	this.maxSpeed = 0;
	this.gOffY = 0;//重力计数
	
	this.fadeIn = 0;
	this.cFadeIn = 0;
	this.fadeOut = 0;
	this.cFadeOut = 0;
	
	this.blendMode = blendM;
	
	this.resetInfo(textValue,color,pIndex,blendM);


};


Sprite_ZzyECFValue.prototype.resetInfo = function(textValue,color,pIndex,blendM)//初始化
{
	this.bFrame = Zzy.Param.ECFTextShowFrame;//存在时长
	this.cbFrame = 0;
	this.color = color;
	this.valueText = textValue;
	this.pIndex = pIndex;//位置	
	
	this.angle = Zzy.ECF.ReturnRandom(Zzy.Param.ECFTextAngle,Zzy.Param.ECFAngleArea);
	this.speed = Zzy.ECF.ReturnRandomOfPer(Zzy.Param.ECFTextSpeed,Zzy.Param.ECFSpeedRandPer);
	this.gravity = Zzy.ECF.ReturnRandomOfPer(Zzy.Param.ECFTextGravity,Zzy.Param.ECFGravityRandPer);
	this.maxSpeed = Zzy.Param.ECFGravityMaxSpeed;
	
	this.pos = Zzy.ECF.GetPosOfParty(this.pIndex);
	this.disX = $gameMap.tileWidth() * $gameMap.displayX();
	this.disY = $gameMap.tileHeight() * $gameMap.displayY();
	this.gOffY = 0;
	
	this.fadeIn = Math.round(Zzy.ECF.ReturnRandomOfPer(Zzy.Param.ECFTextFadeIn,Zzy.Param.ECFFadeInRandPer));
	this.cFadeIn = 0;
	this.fadeOut = Math.round(Zzy.ECF.ReturnRandomOfPer(Zzy.Param.ECFTextFadeOut,Zzy.Param.ECFFadeOutRandPer));
	this.cFadeOut = 0;	
	
	this.blendMode = blendM;

	this.refresh();
}


Sprite_ZzyECFValue.prototype.refresh = function(text)
{
	if(text){this.valueText = text;}
	
	var isNeedNew = false;

	var tw = $gameSystem._ZzyECFValueSize * this.valueText.length;
	if(this.bw < tw){this.bw = tw;isNeedNew = true;}
	
	var th = $gameSystem._ZzyECFValueSize;
	if(this.bh < th){this.bh = th;isNeedNew = true;}
	
	if(isNeedNew)
	{
		this.bitmap = new Bitmap(this.bw,this.bh);//申请新的位图
	}
	else
	{
		this.bitmap.clear();//清理旧位图
	}
	
	this.setFontSize($gameSystem._ZzyECFValueSize);//字体大小
	this.setTextColor(this.color);//颜色
	
	this.bitmap.drawText(this.valueText,0,0,this.bw,this.bh,'center');
}

Sprite_ZzyECFValue.prototype.setFontSize = function(fontSize)
{
	this.bitmap.fontSize = fontSize;
}

Sprite_ZzyECFValue.prototype.setTextColor = function(textColor)
{
	this.bitmap.textColor = textColor;
}

Sprite_ZzyECFValue.prototype.update = function()
{
	if(!this.visible)return;
	this.updatePosition();//更新位置
	this.updateBeing();
}

Sprite_ZzyECFValue.prototype.CharOffsetY = function()
{
	return 24;
}


Sprite_ZzyECFValue.prototype.updatePosition = function()
{
	
	var tx = this.pos.x;
	var ty = this.pos.y - this.CharOffsetY();
	
	//角度转换弧度
	
	var src = this.angle / 180 * Math.PI;
	
	tx += Math.sin(src) * this.cbFrame * this.speed;	
	ty -= Math.cos(src) * this.cbFrame * this.speed;
	
	//计算镜头偏移	
	var disOffX = this.disX - $gameMap.tileWidth() * $gameMap.displayX();
	var disOffY = this.disY - $gameMap.tileHeight() * $gameMap.displayY();
	tx += disOffX;
	ty += disOffY;	
	
	//重力
	var time = this.cbFrame / 60;//时间
	var gy = this.gravity*time*time;
	gy = gy > this.maxSpeed ? this.maxSpeed : gy;
	this.gOffY += gy;
	ty += this.gOffY;
	//位置
	this.x = tx;
	this.y = ty;
	this.x *= $gameScreen.zoomScale();
	this.y *= $gameScreen.zoomScale();
}




Sprite_ZzyECFValue.prototype.updateBeing = function()//刷新存在
{
	if(this.cFadeIn < this.fadeIn)//渐入
	{
		this.cFadeIn++;
		this.opacity = 255 * this.cFadeIn / this.fadeIn;
		return;
	}

	if(this.cbFrame < this.bFrame)
	{
		this.cbFrame++;
		this.opacity = 255;
		return;
	}


	if(this.cFadeOut < this.fadeOut)
	{
		this.cFadeOut++;
		this.opacity = 255 * (1 - this.cFadeOut / this.fadeOut);
	}
	else
	{
		this.visible = false;
	}

}


//------------------------------Zzy.ECF.Function-------------------------------


Zzy.ECF.CoronaModeToInt = function(str)
{
	switch(str)
	{
		case 'circle':return 1;
		case 'rect':return 2;	
	}
	console.log('Error:来自LiuYue_EventCorona,检查光环模式填写是否正确');return 0;
	return 1;
}

Zzy.ECF.BlendModeToInt = function(str)
{
	switch(str)
	{
		case 'normal':return Graphics.BLEND_NORMAL;
		case 'add':return Graphics.BLEND_ADD;
		case 'multiply':return Graphics.BLEND_MULTIPLY;
		case 'screen':return Graphics.BLEND_SCREEN;		
	}
	console.log('Error:来自LiuYue_EventCorona,检查图像叠加模式填写是否正确');return 0;
	return Graphics.BLEND_NORMAL;	
}

Zzy.ECF.ShowValue = function(value,color,pIndex,evId)//显示数值--这会让玩家队伍头顶出现数值,pIndex如果沒有写入,默认会是第一名角色
{
	pIndex = pIndex ? pIndex : 0;
	evId = evId ? evId : 0;
	if(SceneManager._scene instanceof Scene_Map)
	{
		SceneManager._scene.PuchZzyECFValue(String(value),color,pIndex,evId);//压入数值
	}
}


Zzy.ECF.GetPosOfParty = function(pIndex)//基于队伍下标中获取角色的位置
{
	var info = {};
	if(pIndex === 0)
	{
		info.x = $gamePlayer.screenX();
		info.y = $gamePlayer.screenY();
	}
	else
	{
		var tIndex = pIndex-1;
		//判断是否越界
		var tp = $gamePlayer.followers().follower(tIndex);
		
		if(!tp)
		{
			console.log('Error:来自LiuYue_EventCorona,填写队伍下标值异常');
			info.x = undefined;
			info.y = undefined;
		}
		else
		{
			info.x = tp.screenX();
			info.y = tp.screenY();			
		}
	}
	return info;
}

Zzy.ECF.ReturnRandom = function(value,offVal)
{
	if(!offVal)return value;
	
	var tOff = (Math.random() * offVal);
	if(Math.random()*2<=1)
	{tOff = -tOff;}
	return value + tOff;
}


Zzy.ECF.ReturnRandomOfPer = function(value,offPer)
{
	if(!offPer)return value;
	
	var tOff = value * (Math.random() * offPer*0.01);
	if(Math.random()*2<=1)
	{tOff = -tOff;}
	return value + tOff;
}






Zzy.ECF.IsShowCorona = function(enable)
{
	$gameSystem.setZzyECFIsShowCorona(enable);
}

Zzy.ECF.CoronaMode = function(str)
{
	$gameSystem.setZzyECFCoronaMode(str);
}

Zzy.ECF.CoronaRange = function(range)
{
	$gameSystem.setZzyECFCoronaRange(range);
}

Zzy.ECF.EffectFrame = function(frame)
{
	$gameSystem.setZzyECFEffectFrame(frame);
}

Zzy.ECF.EffectCommand = function(commonId)
{
	$gameSystem.setZzyECFEffectCommand(commonId);
}

Zzy.ECF.RangePic = function(picStr)
{
	$gameSystem.setZzyECFRangePic(picStr);
}

Zzy.ECF.OffsetX = function(offsetX)
{
	$gameSystem._ZzyECFOffsetX = offsetX;
}

Zzy.ECF.OffsetY = function(offsetY)
{
	$gameSystem._ZzyECFOffsetY = offsetY;
}

Zzy.ECF.BlendMode = function(modeStr)
{
	var modeId = Zzy.ECF.BlendModeToInt(modeStr);
	$gameSystem.setZzyECFBlendMode(modeId);
}

Zzy.ECF.ValueBlend = function(modeStr)
{
	var modeId = Zzy.ECF.BlendModeToInt(modeStr);
	$gameSystem.setZzyECFValueBlend(modeId);
}

Zzy.ECF.InCommand = function(commonId)
{
	$gameSystem.setZzyECFInCommand(commonId);
}

Zzy.ECF.OutCommand = function(commonId)
{
	$gameSystem.setZzyECFOutCommand(commonId);
}

Zzy.ECF.DefaultColor = function(color)
{
	$gameSystem._ZzyECFDefaultColor = color;
}

Zzy.ECF.PictureHue = function(hue)
{
	$gameSystem._ZzyECFPictureHue = hue;
}

Zzy.ECF.IsShowValue = function(enable)
{
	$gameSystem._ZzyECFIsShowValue = enable;
}

Zzy.ECF.ValueSize = function(size)
{
	$gameSystem._ZzyECFValueSize = size;
}


