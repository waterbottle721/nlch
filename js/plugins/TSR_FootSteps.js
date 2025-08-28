//========================================================================================
//=== TSR_FootSteps === A Plugin by The Northern Frog ====================================
//========================================================================================

var TSR = TSR || {};
TSR.footStep = TSR.footStep || {};
TSR.footStep.version = 1.45;

var Imported = Imported || {};
Imported.TSR_FootSteps = true;

//========================================================================================

/*:
 * @target MZ
 * @plugindesc v1.4.5 Add foot step prints to player, followers and events, when
 *        walking on map regions Id or terrain Tags defined by Map Notetags. 
 * 
 * @author TSR, The Northern Frog, 2020      
 * @help 
 * =======================================================================================
 * == About this Plugin ==================================================================
 * =======================================================================================
 * The Plugin use the sprite sheet 'FootSteps.png' that must be imported in 
 * the /img/system folder of your game. You can download it on my itch.io
 * account, along with the Plugin file.
 *
 * The sprite sheet is divided into 8 sections, hereafter named Blocks.
 * Blocks are indexed as bellow:
 *
 *      ---------------------------------------------------
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      |    0      |     1     |      2     |     3      |
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      |-----------|-----------|------------|------------|
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      |    4      |     5     |      6     |     7      |
 *      |           |           |            |            |
 *      |           |           |            |            |
 *      ---------------------------------------------------
 *
 * Each Block consist of 12 frames of 48x48px. A Block can be either 
 * 'Regular' or 'Animated'. All Blocks are 'Regular', but can be turned 
 * into 'Animated' Blocks using parameters.
 *
 *   Regular Blocks
 *   ==============
 *   The 12 frames of a Regular Block are arranged in 4 lines corresponding
 *   to the 4 directions of the characters. Each time a character prints a 
 *   step, it alternate between the 3 frames on the line corresponding to 
 *   its direction.
 *
 *   Animated Blocks
 *   ===============
 *   The 12 frames of an Animated Block are read one after the others,
 *   according to parameters settings. You can create various step animation
 *   effect using the parameters (see bellow). The Plugin comes with default
 *   animations settings for Blocks 4 and 5 (Water) and Block 6 (Bush). 
 *
 * 
 *   Adding more Blocks
 *   ==================
 *   The sprite sheet contains 8 Blocks, but more can be added if needed.
 *   To do so, expand the sprite sheet height. Each row of 144 px height
 *   will add 4 additional Blocks to the sheet.
 *
 *
 *
 * NOTETAGS
 * =======================================================================================
 * The Plugin works with Map Notetags that assign Map Region Id or Terrain
 * Tags to specific Blocks. The first parameter of the plugin define if 
 * you're using region Ids or terrain Tags. Bellow, the term 'region id' 
 * is used for simplicity.
 *
 * Map Notetags
 * ============
 *
 *         <FOOT STEP REGIONS: x, y, z>     
 *            When walking on region id x, y or z, the characters will prints
 *            steps from the default Block. 
 *
 *
 *         <WET STEP REGIONS: x, y, z>    
 *            When walking on region id x, y or z, the characters will prints
 *            steps from the default Block.    
 *
 *     
 *         <animation name REGIONS: x, y, z>
 *             These are the Notetags to mark Map Region Id that will print
 *             animated foot steps according to the 'animation name' set in 
 *             the parameters (see bellow).  
 *   
 *             But to serves as an example and template, the Plugin comes
 *             with default settings for 'Water' and 'Bush' step animations.
 *             Hence, you can use the following Notetags as Plug & Play.
 *            
 *                    <WATER REGIONS: x, y, z>
 *
 *                    <BUSH REGIONS: x, y, z>       
 *
 * 
 *          <FOOT STEP SWITCH A: x, y, z>     
 *            This map notetag is used to disable/enable map region Id x
 *            y, z based on the value of game switch A.
 * 
 *                Example:    <FOOT STEP SWITCH 6: x, y, z>
 * 
 *                    *map region Id x, y and z will only be considered as
 *                     foot step regions when the game switch 6 is true.
 *                     Note that the map must also have one of the foot step
 *                     notetags described above to declared x, y, z as foot
 *                     step regions.
 * 
 * 
 *    Wet Feet
 *    =======
 *    The 'Foot Step' and 'Wet Step' Notetags are the same. But when leaving a
 *    region marked as 'Wet Step', the characters will keep printing steps on 
 *    the 3 first tiles outside of the 'wet' area. This may comes useful for 
 *    damp areas like Snow or Mud. 
 *
 *
 *    Default Block
 *    =============
 *    The Default Block is the Block that will be printed whenever the Player,
 *    a Follower or an Event, walk on a map region Id marked as 'Foot Step' or
 *    'Wet Step'. The Default Block is index 0, but it can be changed with the
 *    corresponding Parameter.
 *
 *    But if you want an Actor or an Event to print a specific Block, use the
 *    following Notetags:
 *
 *
 *
 * Actors Notetags or Events Comment Tags
 * ======================================
 *
 *        <FOOT STEP: x>
 *           A character with this Notetag will print steps from Block x when
 *           walking on a map region Id marked as 'Foot Step' or 'Wet Step'.
 *
 *        <animation name STEP: x>
 *           A character with this Notetag will print steps from Block x when
 *           walking on a map region Id marked as 'animation name'.
 * 
 *        The Plug & Play default settings for 'Water' and 'Bush' animations
 *        provides the following Actors Notetags/Event Comment Tags:
 *
 *           <WATER STEP: x>
 *              A character with this Notetag will print steps from Block x when
 *              walking on a map region Id marked as 'Water'. 
 *              
 *           <BUSH STEP: x>
 *              A character with this Notetag will print steps from Block x when
 *              walking on a map region Id marked as 'Bush'. 
 *
 *
 *        <NO STEPS>
 *           A character with this Tag will never print steps, 
 *           no matter the region Id. This is useful for flying characters.
 *
 *        <4 LEGS STEPS>
 *           Use this Tag if the character is 4 legged (Ex: Cat). It will
 *           make the foot steps printed in a more aligned arrangement that
 *           fit better a 4 legged creature walking pattern.
 *
 *        <SMALL STEPS>
 *           Foot Steps are printed in their actual size by default. If a
 *           character have this Tag, its Foot Steps will be scaled at 0.5
 *           ratio. This is in the case the character is supposed to be a
 *           small creature that prints smaller foot steps.
 *
 *        <BIG STEPS>
 *           Foot Steps are printed in their actual size by default. If a
 *           character have this Tag, its Foot Steps will be scaled at 1.5
 *           ratio. This is in the case the character is supposed to be a
 *           big creature that prints bigger foot steps.
 *
 *        <STEP SOUNDS x: fileName, volume, pitch, pan>
 *           This Tag can be used to assign a specific step sound to
 *           a character when it walk on a region Id marked for Block x.
 *
 *              Example:
 *                      <STEP SOUND 4: Water3, 50, 100, 0>
 *
 *              A character with this Tag, will play the SE 'Water3' at
 *              volume 50, pitch 100 and pan 0, when it walk on a region
 *              Id marked for Block index 4. This Block is assigned to
 *              the 'Water' step animation through parameters. Hence, the
 *              character would play this sound when walking on Water areas,
 *              instead of the sound set in the Water step anim parameters.
 *
 *
 *
 * ANIMATED STEPS
 * =======================================================================================
 * The Plugin provides 8 parameter step animation sections. Each of them
 * can assign a Block from the sprite sheet and turn it into an Animated
 * Block.
 *
 * The various parameter settings for Animated Blocks are explained in the
 * Parameters section bellow. But the 2 main parameters for the Step Anim
 * are the 'Name' and 'Block' params.
 *
 * The 'Name' is what will be used in the Map, Actors and Events Notetags.
 * The 'Block' is the sprite sheet Block assigned for the animation.
 *
 *
 *   WATER
 *   =====
 *   The Plugin comes with a Plug & Play step animation for watery areas.
 *   It use the first and second Step Anim Parameters Section. The 'Name'
 *   is 'Water' so it provides the following Notetags as explained above.
 *
 *             Map Notetags:  <WATER REGIONS: x, y, z>
 *
 *                         * x, y, and z are Map Region Id
 * 
 *
 *      Actors Notetags or
 *      Events Comment Tags:  <WATER STEP: x>
 *
 *                         * x is sprite sheet Block replacing 
 *                           Water animation when walking on 
 *                           region Id marked as 'Water'
 *
 *
 *    The Water step animation use 2 Blocks from the sprite sheet. The
 *    first one use Block index 4 and is the main animation used for
 *    setting Map, Actors and Events Notetags. The second animation use
 *    Block index 5 and is automatically played as an overlay animation
 *    above the first one. This is defined by the first step animation 
 *    parameters, as explained bellow.
 *
 *
 *   BUSH
 *   =====
 *   The Plugin comes with a Plug & Play step animation for bush tiles.
 *   It use the third Step Anim Parameters Section. The 'Name' is 'Bush'
 *   so it provides the following Notetags as explained above.
 *
 *             Map Notetags:  <BUSH REGIONS: x, y, z>
 *
 *                         * x, y, and z are Map Region Id
 * 
 *
 *      Actors Notetags or
 *      Events Comment Tags:  <BUSH STEP: x>
 *
 *                         * x is the sprite sheet Block replacing 
 *                           Bush animation when walking on region
 *                           Id marked as 'Bush'
 *
 *
 *   HUE
 *   ===
 *   Step animations can be played at a defined hue value. This is
 *   specific to region Id. Hue values can be assigned to regions
 *   Id by adding the hue value between brackets, following the
 *   region Id in the Map Notetags.
 *
 *      Example:    
 *                  <BUSH REGIONS: x, y(310)>
 *
 *         The Bush animation will be played at normal hue when
 *         in region Id x, and at hue 310 when in regionId y.
 *         
 *   Try it for yourself. Place a regular (green) Bush tiles area
 *   on the map and mark it as region x. Then place another Bush
 *   area using the dry (brownish) Bush tiles, and mark it as 
 *   region y. Then place the above Notetags in the Map note box.
 *   The Bush step animation, which is green on the sprite sheet,
 *   will take a more yellow-brown color tone (hue 310) when Actors
 *   and Events walk on region y; to fit better the dry Bush tiles.
 *
 *
 *
 * PARAMETERS
 * =======================================================================================
 * 
 *   -Foot Steps ID
 *      The fist parameter is used to defined if you're using either
 *      region Id or Terrain Tag for identifying the foot steps areas.
 * 
 * 
 * Base Foot Steps
 * ===============
 * 
 *   -Base Steps Block
 *       This parameter set the sprite sheet default Block index 
 *       for 'Foot Steps' and 'Wet Steps' regions.
 *
 *   -Only Last Follower
 *       If this parameter is toggled ON, only the last follower
 *       of the party will print steps in addition to the player.
 *
 *   -Base Opacity
 *       Opacity of foot steps is decreased by this value each
 *       frames, until faded out. Set it to 0 to disable foot
 *       steps fading out.
 *
 *   -Base Duration
 *       This is the maximum duration in frames the foot steps
 *       can remains on screen.
 *
 *   -Foot Steps Sound
 *       This is the sound to be played along with base foot steps.
 *       It will affect all non animated foot steps, so it is more
 *       recommanded to set specific sound to actor and event using
 *       Notetags.
 * 
 *       Sounds must be imported in /audio/se in both ogg and mp4 
 *       format. Enter the file name (without extension), the volu-
 *       me, the pitch and the pan values, separated by commas.
 *
 *          Example: Attack2, 75, 100, 0
 *
 *            *only the SE file name is required. Other arguments
 *             can be omitted as they will receive a default value.
 *
 *
 *
 * Animated Steps
 * ==============
 * The animated steps parameters are separated in 8 sections. Each
 * section allow to turn a Block from the sprite sheet into a step
 * animation. The 3 first sections have default plugin parameters
 * to provide 'Water' and 'Bush' animations as Plug & Play.
 *
 * You can change the default animation settings or create your own
 * custom step animation by filling the parameters of a step anim
 * section, as described bellow.
 *
 *
 *   -Name
 *      This is the name of the animation. The Name define the note-
 *      tags that can be used.
 *
 *         Example:
 *                   Map Notetags:  <'name' regions: x, y, z>                              
 *
 *                    * x, y, and z are Map Region Id assigned
 *                      to the 'name' animation
 *
 *
 *                   Actor Notetags     <'name' step: x>
 *                   & Events comment
 *                   Tags
 *
 *                    * x is sprite sheet Block replacing 
 *                      'name' animation when walking on 
 *                      region Id marked as 'Name'
 *
 *
 *   -Block
 *      This is the sprite sheet Block index that will be used by the
 *      animation.
 *
 *
 *   -Duration
 *      This is the maximum duration of the step animation in frames.
 *
 *
 *   -Straight Steps
 *      When set to true, the step animation will be printed in a straight
 *      manner, similar to the effect of the <4 legs steps> notetag. This
 *      works well for the Bush animation, for instance.
 *
 *
 *   -Step Under
 *      This make the step animation appears directly under the character,
 *      rather than a little bit behind. Again, this works well for the
 *      Bush animation.
 *
 *
 *   -Start Index
 *      Normally, the step animation start at index 0 (top left frame in
 *      a Block), but it can be changed to accomodate specific needs.*
 *
 *
 *   -End Index
 *      Normally, the step animation end at index 11 (bottom right frame 
 *      in a Block), but it can be changed to accomodate specific needs.*
 *
 *         *This means you can theorically makes 2 step animations out
 *          of the same Block by assigning 2 step animations parameter
 *          sections to the same Block, but with different Start and
 *          End Index.
 *
 *            Example:
 *                     anim 1: startIndex = 0, EndIndex = 5
 *                     anim 2: startIndex = 6, EndIndex = 11
 *
 *
 *   -Frame Rate
 *      This is the frame rate of the step animation. Must be correlated
 *      with the step animation duration, otherwise part of the animation
 *      might be cut off.
 *
 *
 *   -Opacity Rate
 *      This is the rate at which the foot steps opacity fade out.
 *
 *
 *   -Loop Type
 *      You can choose between 3 loop type for your step animations:
 *
 *       1) no loop:        Step animation terminate when it reach the
 *                          last frame, no matter the duration left.
 *
 *       2) loop:           Step animation will keep looping until
 *                          duration is over.
 *  
 *       3) stay on last:   Step animation will stay on the last frame
 *                          until the duration is over.
 *
 *
 *   -Rotate
 *      When this parameter is toggled ON, the step animation will 
 *      rotate according to the character direction. The sprites of
 *      your step animation Block must be drawn facing up on the 
 *      sprite sheet, so the rotation fits the character direction.
 *      Good example of this is the default Bush animation.
 *
 *
 *   -Second Block
 *      This is to assign a second step animation Block to be played
 *      as an overlay animation. The second step anim will play over
 *      the current one, according to its own settings defined in the 
 *      corresponding step animation parameters section. Good example 
 *      of this is the default Water animation.      
 *
 *
 *   -Wet feet
 *      This is to set if the characters will leaves wet foot steps
 *      on 3 tiles after leaving the area that prints the animation.
 *      Good example of this is the default Water animation.
 *   
 *
 *   -Over Anim
 *      This parameter is only valid when the step animation is used
 *      as a second animation. In that case, you can decide if the
 *      second animation is played under OR above the characters.
 *
 *
 *   -Sound
 *      This is to set the sound effect that will be played along with
 *      the animation. Enter the file name without extension, and if
 *      needed, the volume, the pitch and the pan separated by commas.
 *      
 *         Example: Move1, 30, 130, 0
 *                  
 *            *only the SE file name is required. Other arguments
 *             can be omitted as they will receive a default value.
 * 
 *
 *
 * =======================================================================================
 * == Terms of usage =====================================================================
 * =======================================================================================
 * 
 * Use in any independant RPG Maker MZ or MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 * SPRITE SHEET
 * The FootSteps.png sprite sheet is free to download on my itchi.io 
 * account. Editing it to your liking is permited and no credit is asked  
 * for using it. But it shouldn't be used in games that don't use this 
 * plugin, nor in a game not made with RPG Maker MZ or MV.
 *
 * SPECIAL THANKS
 * Thanks to ShadowDragon for testing and bugs report.
 *
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 2020/09/18 Prototype version completed, v0.1.3
 * 2020/09/19 Add notetags object processing and adjust script accordingly, v0.2.3
 * 2020/09/20 Add step sounds and parameters, v0.3.4
 * 2020/09/21 Completed parameters, and add step scaling and sounds adjusting, v1.3.5
 * 2020/09/26 Add more parameters for step anim, v1.3.6
 * 2020/09/27 Add map scroll update to foot step sprites, v1.3.7
 * 2020/11/23 Conversion for RPG Maker MZ v1.3.8
 * 2021/02/19 Add reflection steps to work with TSR_Mirror and minor fixes v1.4.0
 * 2021/07/27 Add terrain Tag Id and turning off animation for stepAnim blocks v1.4.2
 * 2023/04/28 Add a map notetag to disable/enable the regions based on a switch v1.4.3
 * 2023/08/05 Add compatibility with diagonal movements v1.4.4
 * 2023/10/05 fix a bug with wet steps when using terrain tag v1.4.5
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 *
 * @param Foot Steps ID
 * @type combo
 * @option region Id
 * @option terrain Tag
 * @desc Choose the tag Id for marking the foot steps on the map.
 * region Id - terrain Tag
 * @default region Id
 * 
 * 
 *@param ---Base Foot Steps---
 *
 * @param Base Steps Block
 * @parent ---Base Foot Steps---
 * @type number
 * @min 0
 * @desc The default block for base foot steps.
 * Default: 0
 * @default 0
 *
 * @param Only Last Follower
 * @parent ---Base Foot Steps---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc On the last follower prints steps?
 * OFF - false  ON - true
 * @default false
 *
 * @param Base Opacity
 * @parent ---Base Foot Steps---
 * @type number
 * @min 0
 * @desc The base opacity decrement of foot steps.
 * Default: 4
 * @default 4
 *
 * @param Base Duration
 * @parent ---Base Foot Steps---
 * @type number
 * @min 0
 * @desc The base duration of foot steps in frames.
 * Default: 60
 * @default 60
 *
 * @param Foot Steps Sound
 * @parent ---Base Foot Steps---
 * @desc Enter file name of the default foot step sound.
 * Default:
 * @default
 *
 *
 *@param ---Foot Step Anim 1---
 *
 * @param Anim 1 Name
 * @parent ---Foot Step Anim 1---
 * @desc Name of the Anim Step.
 * Default: Water
 * @default Water
 *
 * @param Anim 1 Block
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 1 Duration
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 1 Straight Steps
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Step Under
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Start Index
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 1 End Index
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 11
 * @default 11
 *
 * @param Anim 1 Frame Rate
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 1 Opacity Rate
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 4
 * @default 4
 *
 * @param Anim 1 Loop Type
 * @parent ---Foot Step Anim 1---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 1 Rotate
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Wet Feet
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 1 Second Block
 * @parent ---Foot Step Anim 1---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 5
 * @default 5
 *
 * @param Anim 1 Over Anim
 * @parent ---Foot Step Anim 1---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 1 Sound
 * @parent ---Foot Step Anim 1---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: Water2, 35, 130, 0
 * @default Water2, 35, 130, 0
 *
 *
 *@param ---Foot Step Anim 2---
 *
 * @param Anim 2 Name
 * @parent ---Foot Step Anim 2---
 * @desc Name of the Anim Step.
 * Default: Water Overlay
 * @default Water Overlay
 *
 * @param Anim 2 Block
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 5
 * @default 5
 *
 * @param Anim 2 Duration
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 2 Straight Steps
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Step Under
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Start Index
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 2 End Index
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 11
 * @default 11
 *
 * @param Anim 2 Frame Rate
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 2 Opacity Rate
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 4
 * @default 4
 *
 * @param Anim 2 Loop Type
 * @parent ---Foot Step Anim 2---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 2 Rotate
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Wet Feet
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 2 Second Block
 * @parent ---Foot Step Anim 2---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 2 Over Anim
 * @parent ---Foot Step Anim 2---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 2 Sound
 * @parent ---Foot Step Anim 2---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 3---
 *
 * @param Anim 3 Name
 * @parent ---Foot Step Anim 3---
 * @desc Name of the Anim Step.
 * Default: Bush
 * @default Bush
 *
 * @param Anim 3 Block
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 6
 * @default 6
 *
 * @param Anim 3 Duration
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 3 Straight Steps
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 3 Step Under
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 3 Start Index
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 3 End Index
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 11
 * @default 11
 *
 * @param Anim 3 Frame Rate
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 4
 * @default 4
 *
 * @param Anim 3 Opacity Rate
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 4
 * @default 4
 *
 * @param Anim 3 Loop Type
 * @parent ---Foot Step Anim 3---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 3 Rotate
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 3 Wet Feet
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 3 Second Block
 * @parent ---Foot Step Anim 3---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 3 Over Anim
 * @parent ---Foot Step Anim 3---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default true
 *
 * @param Anim 3 Sound
 * @parent ---Foot Step Anim 3---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: Wind1, 35, 110, 0
 * @default Wind1, 35, 110, 0
 *
 *
 *@param ---Foot Step Anim 4---
 *
 * @param Anim 4 Name
 * @parent ---Foot Step Anim 4---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 4 Block
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Duration
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 4 Straight Steps
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Step Under
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Start Index
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 End Index
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Frame Rate
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Opacity Rate
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Loop Type
 * @parent ---Foot Step Anim 4---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 4 Rotate
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Wet Feet
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Second Block
 * @parent ---Foot Step Anim 4---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 4 Over Anim
 * @parent ---Foot Step Anim 4---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 4 Sound
 * @parent ---Foot Step Anim 4---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 5---
 *
 * @param Anim 5 Name
 * @parent ---Foot Step Anim 5---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 5 Block
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Duration
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 5 Straight Steps
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Step Under
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Start Index
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 End Index
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Frame Rate
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Opacity Rate
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Loop Type
 * @parent ---Foot Step Anim 5---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 5 Rotate
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Wet Feet
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Second Block
 * @parent ---Foot Step Anim 5---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 5 Over Anim
 * @parent ---Foot Step Anim 5---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 5 Sound
 * @parent ---Foot Step Anim 5---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 6---
 *
 * @param Anim 6 Name
 * @parent ---Foot Step Anim 6---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 6 Block
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Duration
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 6 Straight Steps
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Step Under
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Start Index
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 End Index
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Frame Rate
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Opacity Rate
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Loop Type
 * @parent ---Foot Step Anim 6---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 6 Rotate
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Wet Feet
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Second Block
 * @parent ---Foot Step Anim 6---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 6 Over Anim
 * @parent ---Foot Step Anim 6---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 6 Sound
 * @parent ---Foot Step Anim 6---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 7---
 *
 * @param Anim 7 Name
 * @parent ---Foot Step Anim 7---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 7 Block
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Duration
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 7 Straight Steps
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Step Under
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Start Index
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 End Index
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Frame Rate
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Opacity Rate
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Loop Type
 * @parent ---Foot Step Anim 7---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 7 Rotate
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Wet Feet
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Second Block
 * @parent ---Foot Step Anim 7---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 7 Over Anim
 * @parent ---Foot Step Anim 7---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 7 Sound
 * @parent ---Foot Step Anim 7---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *@param ---Foot Step Anim 8---
 *
 * @param Anim 8 Name
 * @parent ---Foot Step Anim 8---
 * @desc Name of the Anim Step.
 * Default:
 * @default
 *
 * @param Anim 8 Block
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc Sprite sheet Block used by the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Duration
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc The duration of this step anim.
 * Default: 60
 * @default 60
 *
 * @param Anim 8 Straight Steps
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed in a straight way?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Step Under
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Step anim are printed directly under the character?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Start Index
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @max 11
 * @desc The starting index inside the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 End Index
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @max 11
 * @desc The last index of the block for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Frame Rate
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc The frame rate for the anim.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Opacity Rate
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc Set the foot steps opacity decrement by frame.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Loop Type
 * @parent ---Foot Step Anim 8---
 * @type combo
 * @option loop
 * @option no loop
 * @option stay on last frame
 * @desc Choose the loop type for the anim.
 * loop - no loop - stay on last frame
 * @default no loop
 *
 * @param Anim 8 Rotate
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Rotate the sprite with characters direction?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Wet Feet
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Leave wet feet prints when leaving the Anim?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Second Block
 * @parent ---Foot Step Anim 8---
 * @type number
 * @min 0
 * @desc Index of the Block for second Anim. 0 for none.
 * Default: 0
 * @default 0
 *
 * @param Anim 8 Over Anim
 * @parent ---Foot Step Anim 8---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Anim is play above characters?
 * OFF - false  ON - true
 * @default false
 *
 * @param Anim 8 Sound
 * @parent ---Foot Step Anim 8---
 * @desc File name, volume, pitch and pan of the anim sound.
 * Default: 
 * @default 
 *
 *
 *
 */

 (() => {
const _0x401110=_0xaa6b;function _0x1888(){const _0x3090c6=['tileWidth','Anim\x202\x20Block','second','Anim\x201\x20Loop\x20Type','create','Anim\x202\x20Straight\x20Steps','Anim\x206\x20Sound','Anim\x208\x20Loop\x20Type','Anim\x201\x20Duration','_reflection','size','Anim\x207\x20Start\x20Index','10aqrzZM','Anim\x208\x20Over\x20Anim','Anim\x201\x20Name','TSR_Mirror','block_x','Anim\x204\x20Name','Anim\x206\x20Frame\x20Rate','_stepUnder','moveSpeed','_stepHue','fct','1563664LosvGr','indexOf','readActorsFootStepTag','createLowerLayer','name','getSpeedFactor','call','_wetFeetCount','reserveSystem','note','_goLeft','setSpritePos','_animationCount','Anim\x205\x20Opacity\x20Rate','setSecondStepHpos','Anim\x206\x20Name','block','Anim\x208\x20Straight\x20Steps','_anim','7bprjWl','Anim\x207\x20Over\x20Anim','baseBlock','isDatabaseLoaded','Anim\x204\x20Frame\x20Rate','rotate','animBlock','Anim\x204\x20Step\x20Under','Foot\x20Steps\x20ID','keys','isAnim','update','slice','Anim\x206\x20Step\x20Under','_footStepSprite','_defaultBlock','_stepFrame','_tileWidth','split','_anim6','Block','anim2_Snd','prototype','startFootSteps','anim5_Snd','_anim8','includes','Anim\x207\x20Sound','_animDash','makeBlock','_loaded','Anim\x208\x20Duration','_stepWait','length','inFrontOfMirror','_noBlock','rotation','contains','1316952nIABMA','anchor','Base\x20Steps\x20Block','checkFootStepTag','page','_rate','Anim\x204\x20Start\x20Index','Base\x20Opacity','_type','battleMembers','_Spriteset_Map_createLowerLayer','Anim\x206\x20Start\x20Index','13898583qZxuIZ','Anim\x202\x20Name','leader','shift','isLeavingAnim','_stepdir','stepBlock','Anim\x205\x20End\x20Index','_Sprite_Character_update','_footStepDiagonal','initialize','_realY','_wetRegion','makeFootSteps','_spriteOverAnim','Anim\x202\x20Over\x20Anim','block_y','setStepBlock','Anim\x202\x20End\x20Index','animated','moveDiagonally','_anim1','_Sprite_Character_initMembers','Anim\x205\x20Block','Anim\x208\x20Name','_onlyLastFollower','Anim\x202\x20Rotate','Anim\x208\x20Wet\x20Feet','Anim\x206\x20Opacity\x20Rate','straight','_animatedStep','_opRate','_character','Anim\x208\x20Sound','region','bitmap','Anim\x204\x20Rotate','_reflectionSteps','Anim\x201\x20Start\x20Index','Anim\x202\x20Second\x20Block','Anim\x207\x20End\x20Index','loadSystemImages','isNextBlockAnim','scaleStep','Anim\x207\x20Wet\x20Feet','_tilemap','FootSteps','playSe','_baseSound','setup','_tagId','Anim\x208\x20Block','Anim\x203\x20Over\x20Anim','isFootStepRegionEnabled','_stepBlock','parameters','_hasFadeIn','_spriteset','regionId','Anim\x203\x20Step\x20Under','_memberIndex','_baseBlock','volume','Anim\x205\x20Duration','Parameters','noBlock','initMembers','_secondAnim','adjustSound','Anim\x204\x20Loop\x20Type','_displayX','over','_anim5','getAngle','loop','Anim\x205\x20Second\x20Block','distance','Anim\x206\x20Over\x20Anim','floor','Anim\x207\x20Duration','removeChild','anim8_Snd','Anim\x201\x20End\x20Index','Anim\x203\x20Block','DataManager_isDatabaseLoaded','height','first','startIndex','_anim7','_stepFrameIndex','pitch','preloadStepSounds','anim4_Snd','Anim\x206\x20Duration','getCombo','_needAdditionalSteps','Anim\x203\x20Start\x20Index','_baseDuration','width','loadSystem','Anim\x202\x20Sound','setStepAnimFrame','Anim\x204\x20Block','setSecondStepVpos','_followers','Anim\x204\x20Opacity\x20Rate','13660384Gdbwga','step','_endFrame','updateStepScroll','_lastDisplayY','_Orate','abs','8756825dlJmeE','_lastDisplayX','_4legs','value','Anim\x206\x20Straight\x20Steps','Anim\x208\x20End\x20Index','Anim\x201\x20Opacity\x20Rate','1690634kkUoro','_footStepsId','_speed','_displayY','_scaleStep','makeSoundObj','_actorId','Anim\x202\x20Start\x20Index','frameRate','loadBitmap','Anim\x202\x20Wet\x20Feet','Anim\x205\x20Start\x20Index','_duration','Anim\x207\x20Frame\x20Rate','visible','_scene','2798892uDUQrO','anim6_Snd','duration','Anim\x202\x20Duration','_anim2','Anim\x203\x20Second\x20Block','Foot\x20Steps\x20Sound','_reflectAnimDash','Anim\x204\x20End\x20Index','2IZZPTh','_visible','_anim3','_footStepsSprite','Anim\x204\x20Sound','Anim\x208\x20Opacity\x20Rate','footStep','Anim\x208\x20Step\x20Under','setupPage','_Game_Event_setupPage','Anim\x206\x20Loop\x20Type','moveStraight','list','code','_wetFeet','stepUnder','requestfootSteps','foot\x20step','addChild','footStepsId','Anim\x207\x20Straight\x20Steps','endIndex','_firstDash','Anim\x206\x20Rotate','Anim\x203\x20Name','anim3_Snd','_reflectfirstDash','Anim\x201\x20Straight\x20Steps','Anim\x201\x20Sound','createStepSprite','toLowerCase','scale','_anim4','Anim\x203\x20Loop\x20Type','push','trim','_animLoop','_diagonalStep','updateFootSteps','Anim\x205\x20Loop\x20Type','_animList','tileHeight','anim1_Snd','Anim\x205\x20Wet\x20Feet','Anim\x201\x20Second\x20Block','Anim\x206\x20Wet\x20Feet','wet','Anim\x207\x20Loop\x20Type','anim7_Snd','terrain\x20Tag','Anim\x201\x20Wet\x20Feet','Anim\x201\x20Step\x20Under','sound','createStepOverAnim','isLeavingUnwetAnim','isPlaying','opacity','setFrame','_sound','_realX','isFootPrintRegionId','Anim\x205\x20Step\x20Under','Anim\x207\x20Rotate','_animStep','_baseOpacity','Anim\x207\x20Block','loadStepSound','stepFrameIndex','loadStaticSe','test','match','Anim\x202\x20Opacity\x20Rate','_Scene_Boot_loadSystemImages','_stepOverAnim','_dashing','Anim\x203\x20End\x20Index'];_0x1888=function(){return _0x3090c6;};return _0x1888();}(function(_0xa98a18,_0x57eecf){const _0x3621a6=_0xaa6b,_0x36c07c=_0xa98a18();while(!![]){try{const _0x2fa61a=parseInt(_0x3621a6(0x253))/0x1*(parseInt(_0x3621a6(0x26c))/0x2)+parseInt(_0x3621a6(0x263))/0x3+-parseInt(_0x3621a6(0x196))/0x4+parseInt(_0x3621a6(0x24c))/0x5+parseInt(_0x3621a6(0x1cf))/0x6+-parseInt(_0x3621a6(0x1a9))/0x7*(parseInt(_0x3621a6(0x245))/0x8)+parseInt(_0x3621a6(0x1db))/0x9*(-parseInt(_0x3621a6(0x18b))/0xa);if(_0x2fa61a===_0x57eecf)break;else _0x36c07c['push'](_0x36c07c['shift']());}catch(_0x1f4807){_0x36c07c['push'](_0x36c07c['shift']());}}}(_0x1888,0xe8598),TSR[_0x401110(0x21b)]=PluginManager['parameters']('TSR_FootSteps'),TSR['footStep'][_0x401110(0x195)]=Object[_0x401110(0x1b2)],TSR[_0x401110(0x272)]['_tagId']=String(TSR['Parameters'][_0x401110(0x1b1)]),TSR[_0x401110(0x272)][_0x401110(0x1b8)]=Number(TSR['Parameters'][_0x401110(0x1d1)]),TSR[_0x401110(0x272)][_0x401110(0x1f4)]=eval(String(TSR[_0x401110(0x21b)]['Only\x20Last\x20Follower'])),TSR['footStep']['_baseOpacity']=Number(TSR[_0x401110(0x21b)][_0x401110(0x1d6)]),TSR[_0x401110(0x272)]['_baseDuration']=Number(TSR['Parameters']['Base\x20Duration']),TSR[_0x401110(0x272)][_0x401110(0x20b)]=String(TSR[_0x401110(0x21b)][_0x401110(0x269)])[_0x401110(0x1bb)](','),TSR[_0x401110(0x272)][_0x401110(0x15d)]=String(TSR[_0x401110(0x21b)][_0x401110(0x14f)])[_0x401110(0x1bb)](','),TSR['footStep'][_0x401110(0x1be)]=String(TSR[_0x401110(0x21b)][_0x401110(0x23f)])[_0x401110(0x1bb)](','),TSR['footStep'][_0x401110(0x14c)]=String(TSR[_0x401110(0x21b)]['Anim\x203\x20Sound'])[_0x401110(0x1bb)](','),TSR[_0x401110(0x272)]['anim4_Snd']=String(TSR['Parameters'][_0x401110(0x270)])[_0x401110(0x1bb)](','),TSR['footStep'][_0x401110(0x1c1)]=String(TSR[_0x401110(0x21b)]['Anim\x205\x20Sound'])[_0x401110(0x1bb)](','),TSR['footStep'][_0x401110(0x264)]=String(TSR[_0x401110(0x21b)][_0x401110(0x185)])['split'](','),TSR[_0x401110(0x272)][_0x401110(0x163)]=String(TSR[_0x401110(0x21b)][_0x401110(0x1c4)])[_0x401110(0x1bb)](','),TSR[_0x401110(0x272)][_0x401110(0x22c)]=String(TSR[_0x401110(0x21b)][_0x401110(0x1fc)])[_0x401110(0x1bb)](','),TSR[_0x401110(0x272)][_0x401110(0x258)]=_0x5f2b12=>{let _0x3e1196=_0x5f2b12[0x0]['trim']()||![],_0x391ae3=parseInt(_0x5f2b12[0x1])||0x64,_0x2d334c=parseInt(_0x5f2b12[0x2])||0x64,_0x387693=parseInt(_0x5f2b12[0x3])||0x0;if(_0x3e1196)return{'name':_0x3e1196,'volume':_0x391ae3,'pitch':_0x2d334c,'pan':_0x387693,'maxVol':_0x391ae3,'cachePitch':_0x2d334c};return![];},TSR[_0x401110(0x272)]['_baseSound']=TSR[_0x401110(0x272)][_0x401110(0x258)](TSR['footStep'][_0x401110(0x20b)]),TSR[_0x401110(0x272)]['anim1_Snd']=TSR[_0x401110(0x272)][_0x401110(0x258)](TSR['footStep']['anim1_Snd']),TSR[_0x401110(0x272)]['anim2_Snd']=TSR[_0x401110(0x272)]['makeSoundObj'](TSR[_0x401110(0x272)][_0x401110(0x1be)]),TSR[_0x401110(0x272)][_0x401110(0x14c)]=TSR[_0x401110(0x272)][_0x401110(0x258)](TSR['footStep']['anim3_Snd']),TSR['footStep']['anim4_Snd']=TSR['footStep']['makeSoundObj'](TSR[_0x401110(0x272)][_0x401110(0x237)]),TSR[_0x401110(0x272)]['anim5_Snd']=TSR[_0x401110(0x272)][_0x401110(0x258)](TSR[_0x401110(0x272)][_0x401110(0x1c1)]),TSR['footStep']['anim6_Snd']=TSR[_0x401110(0x272)][_0x401110(0x258)](TSR['footStep'][_0x401110(0x264)]),TSR[_0x401110(0x272)][_0x401110(0x163)]=TSR['footStep']['makeSoundObj'](TSR[_0x401110(0x272)][_0x401110(0x163)]),TSR[_0x401110(0x272)][_0x401110(0x22c)]=TSR['footStep'][_0x401110(0x258)](TSR[_0x401110(0x272)][_0x401110(0x22c)]),TSR[_0x401110(0x272)][_0x401110(0x239)]=_0x30acc8=>{const _0x593b1c=_0x401110;if(_0x30acc8===_0x593b1c(0x225))return 0x1;else return _0x30acc8==='no\x20loop'?0x0:0x2;},TSR[_0x401110(0x272)]['_anim1']={'name':String(TSR[_0x401110(0x21b)][_0x401110(0x18d)]),'block':Number(TSR[_0x401110(0x21b)]['Anim\x201\x20Block']),'animated':!![],'duration':Number(TSR[_0x401110(0x21b)][_0x401110(0x187)]),'straight':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x14e)])),'stepUnder':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x166)])),'startIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x201)]),'endIndex':Number(TSR['Parameters'][_0x401110(0x22d)]),'frameRate':Number(TSR[_0x401110(0x21b)]['Anim\x201\x20Frame\x20Rate']),'opacity':Number(TSR[_0x401110(0x21b)][_0x401110(0x252)]),'loop':TSR[_0x401110(0x272)][_0x401110(0x239)](String(TSR[_0x401110(0x21b)][_0x401110(0x182)])),'rotate':eval(String(TSR[_0x401110(0x21b)]['Anim\x201\x20Rotate'])),'second':Number(TSR[_0x401110(0x21b)][_0x401110(0x15f)]),'wet':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x165)])),'over':eval(String(TSR[_0x401110(0x21b)]['Anim\x201\x20Over\x20Anim'])),'sound':TSR[_0x401110(0x272)][_0x401110(0x15d)]},TSR['footStep'][_0x401110(0x267)]={'name':String(TSR[_0x401110(0x21b)][_0x401110(0x1dc)]),'block':Number(TSR['Parameters'][_0x401110(0x180)]),'animated':!![],'duration':Number(TSR[_0x401110(0x21b)][_0x401110(0x266)]),'straight':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x184)])),'stepUnder':eval(String(TSR[_0x401110(0x21b)]['Anim\x202\x20Step\x20Under'])),'startIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x25a)]),'endIndex':Number(TSR['Parameters'][_0x401110(0x1ed)]),'frameRate':Number(TSR[_0x401110(0x21b)]['Anim\x202\x20Frame\x20Rate']),'opacity':Number(TSR['Parameters'][_0x401110(0x17a)]),'loop':TSR[_0x401110(0x272)][_0x401110(0x239)](String(TSR[_0x401110(0x21b)]['Anim\x202\x20Loop\x20Type'])),'rotate':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x1f5)])),'second':Number(TSR[_0x401110(0x21b)][_0x401110(0x202)]),'wet':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x25d)])),'over':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x1ea)])),'sound':TSR['footStep'][_0x401110(0x1be)]},TSR[_0x401110(0x272)]['_anim3']={'name':String(TSR[_0x401110(0x21b)][_0x401110(0x14b)]),'block':Number(TSR['Parameters'][_0x401110(0x22e)]),'animated':!![],'duration':Number(TSR[_0x401110(0x21b)]['Anim\x203\x20Duration']),'straight':eval(String(TSR[_0x401110(0x21b)]['Anim\x203\x20Straight\x20Steps'])),'stepUnder':eval(String(TSR['Parameters'][_0x401110(0x216)])),'startIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x23b)]),'endIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x17e)]),'frameRate':Number(TSR[_0x401110(0x21b)]['Anim\x203\x20Frame\x20Rate']),'opacity':Number(TSR['Parameters']['Anim\x203\x20Opacity\x20Rate']),'loop':TSR['footStep'][_0x401110(0x239)](String(TSR[_0x401110(0x21b)][_0x401110(0x154)])),'rotate':eval(String(TSR['Parameters']['Anim\x203\x20Rotate'])),'second':Number(TSR[_0x401110(0x21b)][_0x401110(0x268)]),'wet':eval(String(TSR[_0x401110(0x21b)]['Anim\x203\x20Wet\x20Feet'])),'over':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x20f)])),'sound':TSR[_0x401110(0x272)][_0x401110(0x14c)]},TSR[_0x401110(0x272)][_0x401110(0x153)]={'name':String(TSR[_0x401110(0x21b)][_0x401110(0x190)]),'block':Number(TSR[_0x401110(0x21b)][_0x401110(0x241)]),'animated':!![],'duration':Number(TSR[_0x401110(0x21b)]['Anim\x204\x20Duration']),'straight':eval(String(TSR[_0x401110(0x21b)]['Anim\x204\x20Straight\x20Steps'])),'stepUnder':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x1b0)])),'startIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x1d5)]),'endIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x26b)]),'frameRate':Number(TSR[_0x401110(0x21b)][_0x401110(0x1ad)]),'opacity':Number(TSR[_0x401110(0x21b)][_0x401110(0x244)]),'loop':TSR['footStep'][_0x401110(0x239)](String(TSR['Parameters'][_0x401110(0x220)])),'rotate':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x1ff)])),'second':Number(TSR['Parameters']['Anim\x204\x20Second\x20Block']),'wet':eval(String(TSR[_0x401110(0x21b)]['Anim\x204\x20Wet\x20Feet'])),'over':eval(String(TSR[_0x401110(0x21b)]['Anim\x204\x20Over\x20Anim'])),'sound':TSR[_0x401110(0x272)][_0x401110(0x237)]},TSR[_0x401110(0x272)][_0x401110(0x223)]={'name':String(TSR[_0x401110(0x21b)]['Anim\x205\x20Name']),'block':Number(TSR['Parameters'][_0x401110(0x1f2)]),'animated':!![],'duration':Number(TSR[_0x401110(0x21b)][_0x401110(0x21a)]),'straight':eval(String(TSR[_0x401110(0x21b)]['Anim\x205\x20Straight\x20Steps'])),'stepUnder':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x170)])),'startIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x25e)]),'endIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x1e2)]),'frameRate':Number(TSR[_0x401110(0x21b)]['Anim\x205\x20Frame\x20Rate']),'opacity':Number(TSR['Parameters'][_0x401110(0x1a3)]),'loop':TSR[_0x401110(0x272)]['getCombo'](String(TSR[_0x401110(0x21b)][_0x401110(0x15a)])),'rotate':eval(String(TSR['Parameters']['Anim\x205\x20Rotate'])),'second':Number(TSR['Parameters'][_0x401110(0x226)]),'wet':eval(String(TSR['Parameters'][_0x401110(0x15e)])),'over':eval(String(TSR[_0x401110(0x21b)]['Anim\x205\x20Over\x20Anim'])),'sound':TSR[_0x401110(0x272)][_0x401110(0x1c1)]},TSR[_0x401110(0x272)][_0x401110(0x1bc)]={'name':String(TSR[_0x401110(0x21b)][_0x401110(0x1a5)]),'block':Number(TSR[_0x401110(0x21b)]['Anim\x206\x20Block']),'animated':!![],'duration':Number(TSR['Parameters'][_0x401110(0x238)]),'straight':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x250)])),'stepUnder':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x1b6)])),'startIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x1da)]),'endIndex':Number(TSR[_0x401110(0x21b)]['Anim\x206\x20End\x20Index']),'frameRate':Number(TSR['Parameters'][_0x401110(0x191)]),'opacity':Number(TSR[_0x401110(0x21b)][_0x401110(0x1f7)]),'loop':TSR['footStep']['getCombo'](String(TSR[_0x401110(0x21b)][_0x401110(0x276)])),'rotate':eval(String(TSR['Parameters'][_0x401110(0x14a)])),'second':Number(TSR['Parameters']['Anim\x206\x20Second\x20Block']),'wet':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x160)])),'over':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x228)])),'sound':TSR[_0x401110(0x272)]['anim6_Snd']},TSR[_0x401110(0x272)][_0x401110(0x233)]={'name':String(TSR[_0x401110(0x21b)]['Anim\x207\x20Name']),'block':Number(TSR[_0x401110(0x21b)][_0x401110(0x174)]),'animated':!![],'duration':Number(TSR['Parameters'][_0x401110(0x22a)]),'straight':eval(String(TSR['Parameters'][_0x401110(0x147)])),'stepUnder':eval(String(TSR[_0x401110(0x21b)]['Anim\x207\x20Step\x20Under'])),'startIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x18a)]),'endIndex':Number(TSR[_0x401110(0x21b)][_0x401110(0x203)]),'frameRate':Number(TSR[_0x401110(0x21b)][_0x401110(0x260)]),'opacity':Number(TSR[_0x401110(0x21b)]['Anim\x207\x20Opacity\x20Rate']),'loop':TSR[_0x401110(0x272)]['getCombo'](String(TSR['Parameters'][_0x401110(0x162)])),'rotate':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x171)])),'second':Number(TSR['Parameters']['Anim\x207\x20Second\x20Block']),'wet':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x207)])),'over':eval(String(TSR['Parameters'][_0x401110(0x1aa)])),'sound':TSR[_0x401110(0x272)][_0x401110(0x163)]},TSR[_0x401110(0x272)][_0x401110(0x1c2)]={'name':String(TSR['Parameters'][_0x401110(0x1f3)]),'block':Number(TSR[_0x401110(0x21b)][_0x401110(0x20e)]),'animated':!![],'duration':Number(TSR[_0x401110(0x21b)][_0x401110(0x1c8)]),'straight':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x1a7)])),'stepUnder':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x273)])),'startIndex':Number(TSR[_0x401110(0x21b)]['Anim\x208\x20Start\x20Index']),'endIndex':Number(TSR['Parameters'][_0x401110(0x251)]),'frameRate':Number(TSR['Parameters']['Anim\x208\x20Frame\x20Rate']),'opacity':Number(TSR[_0x401110(0x21b)][_0x401110(0x271)]),'loop':TSR[_0x401110(0x272)][_0x401110(0x239)](String(TSR[_0x401110(0x21b)][_0x401110(0x186)])),'rotate':eval(String(TSR[_0x401110(0x21b)]['Anim\x208\x20Rotate'])),'second':Number(TSR[_0x401110(0x21b)]['Anim\x208\x20Second\x20Block']),'wet':eval(String(TSR['Parameters'][_0x401110(0x1f6)])),'over':eval(String(TSR[_0x401110(0x21b)][_0x401110(0x18c)])),'sound':TSR[_0x401110(0x272)]['anim8_Snd']},TSR[_0x401110(0x272)][_0x401110(0x15b)]={},TSR[_0x401110(0x272)]['_animList'][TSR[_0x401110(0x272)][_0x401110(0x1f0)][_0x401110(0x1a6)]]=TSR[_0x401110(0x272)]['_anim1'],TSR[_0x401110(0x272)][_0x401110(0x15b)][TSR[_0x401110(0x272)][_0x401110(0x267)][_0x401110(0x1a6)]]=TSR['footStep'][_0x401110(0x267)],TSR[_0x401110(0x272)][_0x401110(0x15b)][TSR[_0x401110(0x272)][_0x401110(0x26e)][_0x401110(0x1a6)]]=TSR[_0x401110(0x272)][_0x401110(0x26e)],TSR[_0x401110(0x272)][_0x401110(0x15b)][TSR[_0x401110(0x272)][_0x401110(0x153)][_0x401110(0x1a6)]]=TSR[_0x401110(0x272)][_0x401110(0x153)],TSR[_0x401110(0x272)][_0x401110(0x15b)][TSR['footStep'][_0x401110(0x223)]['block']]=TSR[_0x401110(0x272)][_0x401110(0x223)],TSR['footStep'][_0x401110(0x15b)][TSR['footStep'][_0x401110(0x1bc)][_0x401110(0x1a6)]]=TSR[_0x401110(0x272)][_0x401110(0x1bc)],TSR[_0x401110(0x272)][_0x401110(0x15b)][TSR[_0x401110(0x272)][_0x401110(0x233)][_0x401110(0x1a6)]]=TSR[_0x401110(0x272)]['_anim7'],TSR[_0x401110(0x272)]['_animList'][TSR[_0x401110(0x272)][_0x401110(0x1c2)][_0x401110(0x1a6)]]=TSR[_0x401110(0x272)][_0x401110(0x1c2)],TSR[_0x401110(0x272)][_0x401110(0x22f)]=DataManager[_0x401110(0x1ac)],DataManager[_0x401110(0x1ac)]=function(){const _0x40dc45=_0x401110;if(!TSR[_0x40dc45(0x272)][_0x40dc45(0x22f)][_0x40dc45(0x19c)](this))return![];return!TSR['footStep'][_0x40dc45(0x1c7)]&&(this[_0x40dc45(0x198)]($dataActors),TSR['footStep'][_0x40dc45(0x1c7)]=!![]),!![];},DataManager[_0x401110(0x198)]=function(_0x50da62){const _0x5b8a2d=_0x401110;for(let _0x366394=0x1;_0x366394<_0x50da62[_0x5b8a2d(0x1ca)];_0x366394++){let _0x3e45a5=/<(?:FOOT STEP|FOOT STEPS):[ ](\d+)>/i,_0x523707=/<(.*)(?:STEP|STEPS):[ ](\d+)>/i,_0x4c554a=/<(?:NO STEP|NO STEPS)>/i,_0x1c1ca0=/<(?:BIG STEP|BIG STEPS)>/i,_0x1e70f8=/<(?:SMALL STEP|SMALL STEPS)>/i,_0x351cf8=/<(?:STEP SOUND|STEPS SOUND)[ ](\d+):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0x918813=/<(?:4 LEGS STEP|4 LEGS STEPS)>/i,_0x425eb8=/<(?:STEP DURATION|STEPS DURATION):[ ](\d+)>/i,_0x2fd1fc=_0x50da62[_0x366394],_0x1a0095=_0x2fd1fc['note'][_0x5b8a2d(0x1bb)](/[\r\n]+/);_0x2fd1fc[_0x5b8a2d(0x218)]=null;for(let _0x4dcbe7=0x0;_0x4dcbe7<_0x1a0095[_0x5b8a2d(0x1ca)];_0x4dcbe7++){let _0xad7fa5=_0x1a0095[_0x4dcbe7];if(_0xad7fa5['match'](_0x3e45a5)){let _0x92431e=parseInt(RegExp['$1']);_0x2fd1fc[_0x5b8a2d(0x218)]=_0x92431e;}else{if(_0xad7fa5['match'](_0x523707)){let _0x300918=_0x1a0095[_0x4dcbe7][_0x5b8a2d(0x151)](),_0x31b229=_0x300918[_0x5b8a2d(0x1b5)](_0x300918[_0x5b8a2d(0x197)]('<')+0x1,_0x300918['indexOf'](_0x5b8a2d(0x246)))[_0x5b8a2d(0x156)]();for(let _0x4a6a20 in TSR[_0x5b8a2d(0x272)][_0x5b8a2d(0x15b)]){if(_0x31b229===TSR[_0x5b8a2d(0x272)][_0x5b8a2d(0x15b)][_0x4a6a20][_0x5b8a2d(0x19a)]['toLowerCase']()){let _0x2233ac=parseInt(RegExp['$2']),_0x555a6b='_'+TSR[_0x5b8a2d(0x272)][_0x5b8a2d(0x15b)][_0x4a6a20][_0x5b8a2d(0x19a)][_0x5b8a2d(0x151)]()+_0x5b8a2d(0x1bd);_0x2fd1fc[_0x555a6b]=_0x2233ac;}}}else{if(_0xad7fa5['match'](_0x4c554a))_0x2fd1fc[_0x5b8a2d(0x1cc)]=!![];else{if(_0xad7fa5['match'](_0x1c1ca0))_0x2fd1fc[_0x5b8a2d(0x257)]=1.5;else{if(_0xad7fa5[_0x5b8a2d(0x179)](_0x1e70f8))_0x2fd1fc[_0x5b8a2d(0x257)]=0.5;else{if(_0xad7fa5['match'](_0x351cf8)){let _0x198524=parseInt(RegExp['$1']),_0x305c6e=_0xad7fa5[_0x5b8a2d(0x151)](),_0x4afad3=_0x305c6e[_0x5b8a2d(0x1b5)](_0x305c6e[_0x5b8a2d(0x197)](':')+0x1);_0x4afad3=TSR[_0x5b8a2d(0x272)][_0x5b8a2d(0x258)](_0x4afad3[_0x5b8a2d(0x1bb)](',')),SoundManager['preloadStepSounds'](_0x4afad3),_0x2fd1fc[_0x5b8a2d(0x16d)]=_0x2fd1fc[_0x5b8a2d(0x16d)]||{},_0x2fd1fc[_0x5b8a2d(0x16d)][_0x198524]=_0x4afad3;}else{if(_0xad7fa5['match'](_0x918813))_0x2fd1fc[_0x5b8a2d(0x24e)]=!![];else _0xad7fa5['match'](_0x425eb8)&&(_0x2fd1fc[_0x5b8a2d(0x25f)]=parseInt(RegExp['$1']));}}}}}}}}},DataManager[_0x401110(0x16f)]=function(_0x2e39b7){const _0x582d4f=_0x401110;if(!$dataMap||!this[_0x582d4f(0x210)](_0x2e39b7))return 0x0;let _0x1a9f78=/<(?:FOOT STEP REGION|FOOT STEP REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x1bc767=/<(?:WET STEP REGION|WET STEP REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x143a25=/<(.*)(?:REGION|REGIONS):[ ]*(\d+\s*\(*\d*\)*(?:\s*,\s*\d+\s*\(*\d*\)*)*)>/i,_0x54c4f9=$dataMap[_0x582d4f(0x19f)]['split'](/[\r\n]+/);for(let _0x4f66fd=0x0;_0x4f66fd<_0x54c4f9[_0x582d4f(0x1ca)];_0x4f66fd++){let _0x68d99d=_0x54c4f9[_0x4f66fd];if(_0x68d99d[_0x582d4f(0x179)](_0x1a9f78)||_0x68d99d[_0x582d4f(0x179)](_0x1bc767)){let _0x22906a=_0x54c4f9[_0x4f66fd][_0x582d4f(0x151)](),_0x5dd2a7=_0x22906a[_0x582d4f(0x1b5)](_0x22906a[_0x582d4f(0x197)]('<')+0x1,_0x22906a[_0x582d4f(0x197)](_0x582d4f(0x1fd)))[_0x582d4f(0x156)](),_0x21aa90=_0x54c4f9[_0x4f66fd][_0x582d4f(0x1b5)](_0x54c4f9[_0x4f66fd][_0x582d4f(0x197)](':')+0x1)[_0x582d4f(0x1bb)](',');for(let _0x49a696 in _0x21aa90){if(parseInt(_0x21aa90[_0x49a696])===_0x2e39b7)return[_0x5dd2a7[_0x582d4f(0x151)](),0x0];}}else{if(_0x68d99d[_0x582d4f(0x179)](_0x143a25)){let _0x123d71=_0x54c4f9[_0x4f66fd]['toLowerCase'](),_0x5e65aa=_0x123d71[_0x582d4f(0x1b5)](_0x123d71[_0x582d4f(0x197)]('<')+0x1,_0x123d71[_0x582d4f(0x197)](_0x582d4f(0x1fd)))['trim'](),_0x339368=_0x123d71[_0x582d4f(0x1b5)](_0x123d71[_0x582d4f(0x197)](':')+0x1)['split'](',');for(let _0xc7fb0d in TSR[_0x582d4f(0x272)]['_animList']){if(_0x5e65aa===TSR[_0x582d4f(0x272)][_0x582d4f(0x15b)][_0xc7fb0d][_0x582d4f(0x19a)]['toLowerCase']())for(let _0x5d6439 in _0x339368){if(/\(+\d+\)+/[_0x582d4f(0x178)](_0x339368[_0x5d6439])){let _0xda4a91=parseInt(_0x339368[_0x5d6439][_0x582d4f(0x1b5)](0x0,_0x339368[_0x5d6439][_0x582d4f(0x197)]('('))),_0xc8a60b=parseInt(_0x339368[_0x5d6439][_0x582d4f(0x1b5)](_0x339368[_0x5d6439][_0x582d4f(0x197)]('(')+0x1));if(_0xda4a91===_0x2e39b7)return[_0x5e65aa[_0x582d4f(0x151)](),_0xc8a60b];}else{if(parseInt(_0x339368[_0x5d6439])===_0x2e39b7)return[_0x5e65aa[_0x582d4f(0x151)](),0x0];}}}}}}return 0x0;},DataManager[_0x401110(0x210)]=function(_0x1d39ac){const _0x33e862=_0x401110;if(!$dataMap)return 0x0;let _0x19bac7=/<(?:FOOT STEP SWITCH|FOOT STEPS SWITCH)[ ]*(\d+):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x17cf0a=$dataMap[_0x33e862(0x19f)][_0x33e862(0x1bb)](/[\r\n]+/);for(let _0x30ae16=0x0;_0x30ae16<_0x17cf0a[_0x33e862(0x1ca)];_0x30ae16++){let _0x301821=_0x17cf0a[_0x30ae16];if(_0x301821[_0x33e862(0x179)](_0x19bac7)){let _0x3b863f=_0x17cf0a[_0x30ae16][_0x33e862(0x151)](),_0x4fa002=parseInt(RegExp['$1']),_0x2a9d2e=_0x3b863f[_0x33e862(0x1b5)](_0x3b863f[_0x33e862(0x197)](':')+0x1)[_0x33e862(0x1bb)](',');for(let _0x53e717 in _0x2a9d2e){if(parseInt(_0x2a9d2e[_0x53e717])===_0x1d39ac)return $gameSwitches[_0x33e862(0x24f)](_0x4fa002);}}}return!![];},Game_Event[_0x401110(0x1bf)]['checkFootStepTag']=function(){const _0x29cc61=_0x401110;if(!this[_0x29cc61(0x1d3)]())return;let _0xc3d94e=/<(?:FOOT STEP|FOOT STEPS):[ ](\d+)>/i,_0x272ddd=/<(.*)(?:STEP|STEPS):[ ](\d+)>/i,_0x189170=/<(?:NO STEP|NO STEPS)>/i,_0x800959=/<(?:BIG STEP|BIG STEPS)>/i,_0xd34ec9=/<(?:SMALL STEP|SMALL STEPS)>/i,_0x1f5926=/<(?:STEP SOUND|STEPS SOUND)[ ](\d+):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0x3a1a2f=/<(?:4 LEGS STEP|4 LEGS STEPS)>/i,_0x3f2ece=/<(?:STEP SET|STEPS SET):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x2255ba=this[_0x29cc61(0x13f)](),_0x4e1fe4=_0x2255ba[_0x29cc61(0x1ca)];for(let _0x270fbc=0x0;_0x270fbc<_0x4e1fe4;++_0x270fbc){let _0x28ba08=_0x2255ba[_0x270fbc];if([0x6c,0x198][_0x29cc61(0x1ce)](_0x28ba08[_0x29cc61(0x140)])){if(_0x28ba08[_0x29cc61(0x212)][0x0]['match'](_0xc3d94e)){let _0x1b1901=parseInt(RegExp['$1']);this[_0x29cc61(0x218)]=_0x1b1901;}else{if(_0x28ba08[_0x29cc61(0x212)][0x0][_0x29cc61(0x179)](_0x272ddd)){let _0xf16ab5=_0x28ba08[_0x29cc61(0x212)][0x0][_0x29cc61(0x151)](),_0x47eb0e=_0xf16ab5['slice'](_0xf16ab5[_0x29cc61(0x197)]('<')+0x1,_0xf16ab5['indexOf'](_0x29cc61(0x246)))[_0x29cc61(0x156)]();for(let _0x4da8bb in TSR[_0x29cc61(0x272)][_0x29cc61(0x15b)]){if(_0x47eb0e===TSR[_0x29cc61(0x272)][_0x29cc61(0x15b)][_0x4da8bb][_0x29cc61(0x19a)]['toLowerCase']()){let _0x113dd0=parseInt(RegExp['$2']),_0x461c07='_'+TSR[_0x29cc61(0x272)][_0x29cc61(0x15b)][_0x4da8bb][_0x29cc61(0x19a)][_0x29cc61(0x151)]()+_0x29cc61(0x1bd);this[_0x461c07]=_0x113dd0;}}}else{if(_0x28ba08[_0x29cc61(0x212)][0x0][_0x29cc61(0x179)](_0x189170))this['_noBlock']=!![];else{if(_0x28ba08[_0x29cc61(0x212)][0x0][_0x29cc61(0x179)](_0x800959))this[_0x29cc61(0x257)]=1.5;else{if(_0x28ba08[_0x29cc61(0x212)][0x0][_0x29cc61(0x179)](_0xd34ec9))this['_scaleStep']=0.5;else{if(_0x28ba08[_0x29cc61(0x212)][0x0]['match'](_0x1f5926)){let _0x4b1f2f=parseInt(RegExp['$1']),_0x50df13=_0x28ba08[_0x29cc61(0x212)][0x0],_0xc9910a=_0x50df13[_0x29cc61(0x1b5)](_0x50df13[_0x29cc61(0x197)](':')+0x1);_0xc9910a=TSR[_0x29cc61(0x272)][_0x29cc61(0x258)](_0xc9910a[_0x29cc61(0x1bb)](',')),SoundManager[_0x29cc61(0x236)](_0xc9910a),this['_sound']=this[_0x29cc61(0x16d)]||{},this[_0x29cc61(0x16d)][_0x4b1f2f]=_0xc9910a;}else{if(_0x28ba08[_0x29cc61(0x212)][0x0][_0x29cc61(0x179)](_0x3a1a2f))this['_4legs']=!![];else{if(_0x28ba08[_0x29cc61(0x212)][0x0][_0x29cc61(0x179)](_0x3f2ece)){let _0x5a6e20=_0x28ba08['parameters'][0x0],_0x5e94f4=_0x5a6e20[_0x29cc61(0x1b5)](_0x5a6e20[_0x29cc61(0x197)](':')+0x1)[_0x29cc61(0x1bb)](',');if(_0x5e94f4[0x0])this[_0x29cc61(0x25f)]=parseInt(_0x5e94f4[0x0]);if(_0x5e94f4[0x1])this['_rate']=parseInt(_0x5e94f4[0x1]);if(_0x5e94f4[0x2])this[_0x29cc61(0x24a)]=parseInt(_0x5e94f4[0x2]);}}}}}}}}}}},SoundManager[_0x401110(0x236)]=function(_0x50548d){const _0x133948=_0x401110;if(!_0x50548d){let _0x2b13be=[];if(TSR[_0x133948(0x272)][_0x133948(0x20b)])_0x2b13be[_0x133948(0x155)](TSR['footStep'][_0x133948(0x20b)]);for(let _0x525f4f in TSR[_0x133948(0x272)][_0x133948(0x15b)]){let _0x36e021=TSR[_0x133948(0x272)][_0x133948(0x15b)][_0x525f4f];if(_0x36e021[_0x133948(0x167)])_0x2b13be[_0x133948(0x155)](_0x36e021[_0x133948(0x167)]);}for(let _0x586539 in _0x2b13be){this[_0x133948(0x175)](_0x2b13be[_0x586539]);}}else this[_0x133948(0x175)](_0x50548d);},SoundManager[_0x401110(0x175)]=function(_0xa59e34){const _0x4f3528=_0x401110;if(!_0xa59e34)return;AudioManager[_0x4f3528(0x177)](_0xa59e34);},TSR[_0x401110(0x272)]['_Scene_Boot_loadSystemImages']=Scene_Boot[_0x401110(0x204)],Scene_Boot['loadSystemImages']=function(){const _0x4c2e59=_0x401110;ImageManager[_0x4c2e59(0x19e)](_0x4c2e59(0x209)),SoundManager[_0x4c2e59(0x236)](),TSR[_0x4c2e59(0x272)][_0x4c2e59(0x17b)][_0x4c2e59(0x19c)](this);},Game_Map[_0x401110(0x1bf)][_0x401110(0x21f)]=function(_0x1ba42b,_0x4b85f4,_0x5d7e0c,_0x2e9107,_0x263232){const _0x2579eb=_0x401110;let _0x301c46=$gamePlayer['x'],_0x17e423=$gamePlayer['y'],_0x338470=$gameMap[_0x2579eb(0x227)](_0x4b85f4,_0x5d7e0c,_0x301c46,_0x17e423),_0x2bedff=_0x1ba42b-_0x338470*(_0x1ba42b/0x19),_0x2a267=_0x263232?_0x2e9107*Math[_0x2579eb(0x24b)](0x2-_0x263232):_0x2e9107;return[_0x2bedff>0x0?_0x2bedff:0x0,_0x2a267];},TSR['footStep'][_0x401110(0x275)]=Game_Event[_0x401110(0x1bf)][_0x401110(0x274)],Game_Event[_0x401110(0x1bf)][_0x401110(0x274)]=function(){const _0x2bd0ff=_0x401110;TSR[_0x2bd0ff(0x272)][_0x2bd0ff(0x275)]['call'](this),this[_0x2bd0ff(0x1d2)]();},Game_CharacterBase['prototype'][_0x401110(0x21c)]=function(){return this['_noBlock']||![];},Game_Player[_0x401110(0x1bf)][_0x401110(0x21c)]=function(){const _0x1e5b0c=_0x401110;let _0x2d87da=$gameParty[_0x1e5b0c(0x1dd)]()['_actorId'];return $dataActors[_0x2d87da][_0x1e5b0c(0x1cc)]||![];},Game_Follower[_0x401110(0x1bf)][_0x401110(0x21c)]=function(){const _0x50fa03=_0x401110;let _0x5275e9;if(this[_0x50fa03(0x217)]<=$gameParty[_0x50fa03(0x189)]()-0x1){let _0x32e56f=$gameParty[_0x50fa03(0x1d8)]()[this['_memberIndex']][_0x50fa03(0x259)];_0x5275e9=$dataActors[_0x32e56f][_0x50fa03(0x1cc)];}return _0x5275e9||![];},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x1ab)]=function(){const _0x329797=_0x401110;let _0x560824=this['makeBlock'](0x0);return _0x560824['block']=this['_baseBlock']||TSR[_0x329797(0x272)][_0x329797(0x1b8)],_0x560824;},Game_Player['prototype']['baseBlock']=function(){const _0xaad73c=_0x401110;let _0x146e61=$gameParty[_0xaad73c(0x1dd)]()['_actorId'],_0x29c665=this[_0xaad73c(0x1c6)](0x0);return _0x29c665[_0xaad73c(0x1a6)]=$dataActors[_0x146e61]['_baseBlock']||TSR['footStep']['_defaultBlock'],_0x29c665;},Game_Follower[_0x401110(0x1bf)][_0x401110(0x1ab)]=function(){const _0x3826e5=_0x401110;let _0x8798cc;if(this[_0x3826e5(0x217)]<=$gameParty['size']()-0x1){let _0x340177=$gameParty[_0x3826e5(0x1d8)]()[this[_0x3826e5(0x217)]][_0x3826e5(0x259)];_0x8798cc=$dataActors[_0x340177]['_baseBlock'];}let _0x579575=this[_0x3826e5(0x1c6)](0x0);return _0x579575[_0x3826e5(0x1a6)]=_0x8798cc||TSR[_0x3826e5(0x272)]['_defaultBlock'],_0x579575;},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x1af)]=function(_0x35a071){const _0x1fe76d=_0x401110;let _0x1e296d=this[_0x1fe76d(0x1c6)](_0x35a071)||{},_0x4b1457='_'+_0x35a071+'Block',_0x4f7c44=this[_0x4b1457];return _0x4f7c44?TSR[_0x1fe76d(0x272)]['_animList'][_0x4f7c44]||this['makeBlock'](0x0,_0x4f7c44):_0x1e296d;},Game_Player['prototype'][_0x401110(0x1af)]=function(_0xb8e173){const _0x2baa7d=_0x401110;let _0x344db2=$gameParty[_0x2baa7d(0x1dd)]()[_0x2baa7d(0x259)],_0x20da54=this[_0x2baa7d(0x1c6)](_0xb8e173)||{},_0x556ed8='_'+_0xb8e173+'Block',_0x29b3d8=$dataActors[_0x344db2][_0x556ed8];return _0x29b3d8?TSR[_0x2baa7d(0x272)][_0x2baa7d(0x15b)][_0x29b3d8]||this[_0x2baa7d(0x1c6)](0x0,_0x29b3d8):_0x20da54;},Game_Follower[_0x401110(0x1bf)][_0x401110(0x1af)]=function(_0x1b946f){const _0x54b689=_0x401110;let _0x3b3282;if(this[_0x54b689(0x217)]<=$gameParty[_0x54b689(0x189)]()-0x1){let _0x56a32b=$gameParty[_0x54b689(0x1d8)]()[this[_0x54b689(0x217)]]['_actorId'],_0x3c91b7='_'+_0x1b946f+_0x54b689(0x1bd);_0x3b3282=$dataActors[_0x56a32b][_0x3c91b7];}let _0x559487=this[_0x54b689(0x1c6)](_0x1b946f)||{};return _0x3b3282?TSR[_0x54b689(0x272)]['_animList'][_0x3b3282]||this[_0x54b689(0x1c6)](0x0,_0x3b3282):_0x559487;},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x1c6)]=function(_0x3d8b8c,_0x341d5a){const _0x2a3604=_0x401110;if(!_0x3d8b8c)return{'block':_0x341d5a||TSR[_0x2a3604(0x272)]['_defaultBlock'],'animated':0x0,'duration':TSR[_0x2a3604(0x272)][_0x2a3604(0x23c)],'straight':0x0,'stepUnder':0x0,'startIndex':0x0,'endIndex':0x0,'frameRate':0x0,'opacity':TSR['footStep'][_0x2a3604(0x173)],'loop':0x0,'rotate':0x0,'second':0x0,'wet':0x0,'over':0x0,'sound':TSR[_0x2a3604(0x272)]['_baseSound']};else for(let _0x3520d1 in TSR[_0x2a3604(0x272)]['_animList']){const _0x3cb4c0=TSR[_0x2a3604(0x272)]['_animList'][_0x3520d1];if(_0x3cb4c0[_0x2a3604(0x19a)][_0x2a3604(0x151)]()===_0x3d8b8c)return!_0x3cb4c0[_0x2a3604(0x25b)]&&(_0x3cb4c0[_0x2a3604(0x1ee)]=0x0),_0x3cb4c0;}},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x167)]=function(){const _0xf9f4dc=_0x401110;return this[_0xf9f4dc(0x16d)]||![];},Game_Player[_0x401110(0x1bf)][_0x401110(0x167)]=function(){const _0x245b38=_0x401110;let _0x37e19a=$gameParty[_0x245b38(0x1dd)]()[_0x245b38(0x259)];return $dataActors[_0x37e19a][_0x245b38(0x16d)]||![];},Game_Follower[_0x401110(0x1bf)]['sound']=function(){const _0x2688a6=_0x401110;let _0x39d03b;if(this['_memberIndex']<=$gameParty['size']()-0x1){let _0x3d4ef7=$gameParty['battleMembers']()[this['_memberIndex']][_0x2688a6(0x259)];_0x39d03b=$dataActors[_0x3d4ef7][_0x2688a6(0x16d)];}return _0x39d03b||![];},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x143)]=function(_0x420cef){const _0x3cd86b=_0x401110;this[_0x3cd86b(0x254)]=_0x420cef;},Game_CharacterBase['prototype'][_0x401110(0x146)]=function(){const _0x4b935f=_0x401110;return this[_0x4b935f(0x254)];},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x1e1)]=function(_0x20dde7){const _0x5755aa=_0x401110;let _0x4404a8=_0x20dde7===_0x5755aa(0x181);return this['isLeavingAnim']()&&_0x4404a8?this[_0x5755aa(0x1ab)]():this[_0x5755aa(0x211)];},Game_CharacterBase[_0x401110(0x1bf)]['setStepBlock']=function(_0xaa25d4,_0x54bd77){const _0x51080c=_0x401110,_0x5cbe27=TSR[_0x51080c(0x272)][_0x51080c(0x20d)]===_0x51080c(0x164)?'terrainTag':_0x51080c(0x215);let _0x4f0b58=DataManager[_0x51080c(0x16f)]($gameMap[_0x5cbe27](_0xaa25d4,_0x54bd77));this[_0x51080c(0x194)]=_0x4f0b58[0x1];if(_0x4f0b58[0x0]===_0x51080c(0x144))return this[_0x51080c(0x1e7)]=![],this['_anim']=![],this['baseBlock']();else{if(_0x4f0b58[0x0]==='wet\x20step')return this[_0x51080c(0x1e7)]=!![],this[_0x51080c(0x1a8)]=![],this[_0x51080c(0x1ab)]();else{if(_0x4f0b58[0x0]){let _0x3c07ac=this['animBlock'](_0x4f0b58[0x0]);return this[_0x51080c(0x1e7)]=_0x3c07ac[_0x51080c(0x161)],this[_0x51080c(0x1a8)]=_0x3c07ac[_0x51080c(0x1ee)],_0x3c07ac;}}}return 0x0;},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x1b3)]=function(){const _0x4b7591=_0x401110;return this[_0x4b7591(0x1a8)];},Game_CharacterBase[_0x401110(0x1bf)]['isNextBlockAnim']=function(){const _0x422a8a=_0x401110,_0x9c7c75=TSR[_0x422a8a(0x272)][_0x422a8a(0x20d)]==='terrain\x20Tag'?'terrainTag':_0x422a8a(0x215);let _0x2da48a=DataManager['isFootPrintRegionId'](this[_0x9c7c75]()),_0x5ebbfc=this[_0x422a8a(0x1af)](_0x2da48a[0x0]);return _0x5ebbfc[_0x422a8a(0x1ee)];},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x1df)]=function(){const _0x29528a=_0x401110;return this['isAnim']()&&!this[_0x29528a(0x205)]();},Game_CharacterBase['prototype']['isLeavingUnwetAnim']=function(){const _0x3b5cd8=_0x401110;return this[_0x3b5cd8(0x1b3)]()&&!this[_0x3b5cd8(0x205)]()&&!this[_0x3b5cd8(0x1e7)];},Game_CharacterBase[_0x401110(0x1bf)][_0x401110(0x1c0)]=function(){const _0x2e5b9f=_0x401110;this[_0x2e5b9f(0x254)]=0x0,this['_followerStep']=0x0;},Game_Character[_0x401110(0x1bf)][_0x401110(0x277)]=function(_0xc483ed){const _0x3451c3=_0x401110;Game_CharacterBase[_0x3451c3(0x1bf)][_0x3451c3(0x277)]['call'](this,_0xc483ed),this[_0x3451c3(0x1e8)](_0xc483ed);},Game_Character[_0x401110(0x1bf)][_0x401110(0x1ef)]=function(_0x2973b6,_0x42abd5){const _0x52317c=_0x401110;Game_CharacterBase['prototype'][_0x52317c(0x1ef)][_0x52317c(0x19c)](this,_0x2973b6,_0x42abd5);const _0x5d6ea8={0x4:{0x2:0x1,0x8:0x7},0x6:{0x2:0x3,0x8:0x9}}[_0x2973b6][_0x42abd5];this[_0x52317c(0x1e8)](_0x5d6ea8);},Game_Character[_0x401110(0x1bf)][_0x401110(0x1e8)]=function(_0x358653){const _0x48c07c=_0x401110;let _0x452feb=this[_0x48c07c(0x1ec)](this['_x'],this['_y']),_0x1eceb1=this['_x']!==this[_0x48c07c(0x16e)],_0x477aa8=this['_y']!==this[_0x48c07c(0x1e6)],_0x33e579=_0x1eceb1||_0x477aa8,_0x2704f9=TSR[_0x48c07c(0x272)][_0x48c07c(0x1f4)]?this[_0x48c07c(0x217)]===$gameParty[_0x48c07c(0x189)]()-0x1:this[_0x48c07c(0x217)]<=$gameParty['size']()-0x1;this[_0x48c07c(0x211)]=this[_0x48c07c(0x1ec)](this[_0x48c07c(0x16e)],this[_0x48c07c(0x1e6)]),this[_0x48c07c(0x1f9)]=this[_0x48c07c(0x211)][_0x48c07c(0x1ee)];this[_0x48c07c(0x211)]&&!_0x452feb&&this['_wetRegion']&&(this[_0x48c07c(0x141)]=!![],this[_0x48c07c(0x19d)]=0x0);if(this[_0x48c07c(0x141)]&&this[_0x48c07c(0x19d)]<0x4){if(_0x33e579)this[_0x48c07c(0x19d)]++;}else this[_0x48c07c(0x19d)]=0x0,this[_0x48c07c(0x141)]=0x0;if(this['_wetFeet']&&this[_0x48c07c(0x19d)]>0x1&&!this[_0x48c07c(0x1f9)])this['_stepBlock']=this[_0x48c07c(0x1ab)]();if(this['_stepBlock']&&_0x33e579&&!this['noBlock']()){if(!this[_0x48c07c(0x217)])this[_0x48c07c(0x143)](_0x358653);else _0x2704f9&&$gamePlayer[_0x48c07c(0x243)][_0x48c07c(0x26d)]&&this[_0x48c07c(0x143)](_0x358653);}},TSR[_0x401110(0x272)][_0x401110(0x1f1)]=Sprite_Character[_0x401110(0x1bf)][_0x401110(0x21d)],Sprite_Character[_0x401110(0x1bf)][_0x401110(0x21d)]=function(){const _0x101292=_0x401110;TSR[_0x101292(0x272)][_0x101292(0x1f1)][_0x101292(0x19c)](this),this[_0x101292(0x26f)]=[],this['_stepOverAnim']=[],this[_0x101292(0x200)]=[],this[_0x101292(0x234)]=0x0;},TSR[_0x401110(0x272)]['_Sprite_Character_update']=Sprite_Character['prototype']['update'],Sprite_Character[_0x401110(0x1bf)]['update']=function(){const _0x2f38c0=_0x401110;TSR[_0x2f38c0(0x272)][_0x2f38c0(0x1e3)][_0x2f38c0(0x19c)](this),this['_needAdditionalSteps']&&(Math[_0x2f38c0(0x24b)](this['_character']['_realX']-this[_0x2f38c0(0x1fb)]['x'])===0.5&&(this['startFootSteps'](this['_needAdditionalSteps']),Imported[_0x2f38c0(0x18e)]&&(this[_0x2f38c0(0x1fb)]['inFrontOfMirror']()&&this['startFootSteps'](this['_needAdditionalSteps'],!![])),this[_0x2f38c0(0x23a)]=![])),this['updateFootSteps']();},Sprite_Character[_0x401110(0x1bf)]['setupFootSteps']=function(){const _0x22a311=_0x401110,_0x2fa914=this[_0x22a311(0x1fb)][_0x22a311(0x146)]();_0x2fa914>0x0&&([0x1,0x3,0x7,0x9][_0x22a311(0x1c3)](_0x2fa914)&&(this['_needAdditionalSteps']=_0x2fa914),this[_0x22a311(0x1c0)](_0x2fa914),Imported[_0x22a311(0x18e)]&&(this[_0x22a311(0x1fb)][_0x22a311(0x1cb)]()&&this[_0x22a311(0x1c0)](_0x2fa914,!![])),this[_0x22a311(0x1fb)][_0x22a311(0x1c0)](),this['_diagonalStep']=0x0);},Sprite_Character[_0x401110(0x1bf)][_0x401110(0x1c0)]=function(_0x7d960b,_0x53eb67){const _0x4397b7=_0x401110;[0x1,0x3,0x7,0x9][_0x4397b7(0x1c3)](_0x7d960b)&&(this[_0x4397b7(0x158)]=_0x7d960b,_0x7d960b=0x8);this[_0x4397b7(0x21e)]=!this[_0x4397b7(0x1fb)][_0x4397b7(0x1df)]()?this['_character']['_stepBlock'][_0x4397b7(0x181)]:![];this[_0x4397b7(0x1fb)][_0x4397b7(0x211)][_0x4397b7(0x181)]&&(this['_overAnim']=TSR[_0x4397b7(0x272)][_0x4397b7(0x15b)][this[_0x4397b7(0x1fb)][_0x4397b7(0x211)][_0x4397b7(0x181)]][_0x4397b7(0x222)]);let _0x3d2aca=this[_0x4397b7(0x150)](_0x4397b7(0x231),_0x7d960b,![],_0x53eb67);_0x53eb67?this[_0x4397b7(0x200)][_0x4397b7(0x155)](_0x3d2aca):this[_0x4397b7(0x26f)][_0x4397b7(0x155)](_0x3d2aca);if(this[_0x4397b7(0x21e)]){if(this['_overAnim']){let _0x2017c5=this[_0x4397b7(0x168)](_0x4397b7(0x231),_0x7d960b,this[_0x4397b7(0x21e)],_0x53eb67);_0x53eb67?this[_0x4397b7(0x200)]['push'](_0x2017c5):this[_0x4397b7(0x17c)]['push'](_0x2017c5);}else{let _0x45e87d=this['createStepSprite'](_0x4397b7(0x231),_0x7d960b,this['_secondAnim'],_0x53eb67);_0x53eb67?this[_0x4397b7(0x200)]['push'](_0x45e87d):this['_footStepsSprite'][_0x4397b7(0x155)](_0x45e87d);}}if(!this[_0x4397b7(0x1fb)]['_dashing']){let _0x366f78=this[_0x4397b7(0x150)](_0x4397b7(0x181),_0x7d960b,![],_0x53eb67);_0x53eb67?this[_0x4397b7(0x200)][_0x4397b7(0x155)](_0x366f78):this[_0x4397b7(0x26f)][_0x4397b7(0x155)](_0x366f78);if(this[_0x4397b7(0x21e)]){if(this['_overAnim']){let _0x222cfd=this[_0x4397b7(0x168)](_0x4397b7(0x181),_0x7d960b,this['_secondAnim'],_0x53eb67);_0x53eb67?this[_0x4397b7(0x200)]['push'](_0x222cfd):this['_stepOverAnim'][_0x4397b7(0x155)](_0x222cfd);}else{let _0x3a2532=this[_0x4397b7(0x150)]('second',_0x7d960b,this['_secondAnim'],_0x53eb67);_0x53eb67?this[_0x4397b7(0x200)][_0x4397b7(0x155)](_0x3a2532):this[_0x4397b7(0x26f)]['push'](_0x3a2532);}}}},Sprite_Character[_0x401110(0x1bf)][_0x401110(0x150)]=function(_0x220274,_0x1f590b,_0x22cfc7,_0x1d0322){const _0x26c4fb=_0x401110;let _0x5d8ea5=new Sprite_FootSteps(this[_0x26c4fb(0x1fb)][_0x26c4fb(0x194)]);_0x220274===_0x26c4fb(0x231)?(_0x5d8ea5['x']=this['x'],_0x5d8ea5['y']=this['y']):(_0x5d8ea5['x']=this['x']+this[_0x26c4fb(0x1a4)](_0x1f590b),_0x5d8ea5['y']=this['y']+this[_0x26c4fb(0x242)](_0x1f590b));let _0x24ef5d=this[_0x26c4fb(0x19b)](this[_0x26c4fb(0x1fb)]['moveSpeed'](),this[_0x26c4fb(0x158)]),_0x2defb6=TSR[_0x26c4fb(0x272)]['_animList'][_0x22cfc7],_0x383b78=this[_0x26c4fb(0x1fb)][_0x26c4fb(0x1e1)](_0x220274),_0x3fae2e=_0x22cfc7?_0x2defb6:_0x383b78;if(_0x3fae2e[_0x26c4fb(0x1ae)])_0x5d8ea5['rotation']=this['getAngle'](_0x1f590b)*0x5a*Math['PI']/0xb4;else this[_0x26c4fb(0x158)]&&(_0x5d8ea5[_0x26c4fb(0x1cd)]=this[_0x26c4fb(0x224)](this[_0x26c4fb(0x158)])*0x5a*Math['PI']/0xb4);this[_0x26c4fb(0x1fb)][_0x26c4fb(0x206)]&&_0x3fae2e['animated']&&(_0x5d8ea5[_0x26c4fb(0x152)]['x']=this[_0x26c4fb(0x1fb)][_0x26c4fb(0x257)],_0x5d8ea5[_0x26c4fb(0x152)]['y']=this[_0x26c4fb(0x1fb)][_0x26c4fb(0x257)]);!this[_0x26c4fb(0x1fb)][_0x26c4fb(0x24e)]&&!_0x3fae2e['straight']&&this['setSpritePos'](_0x5d8ea5,_0x1f590b,_0x220274,_0x22cfc7,_0x1d0322);if(this[_0x26c4fb(0x1fb)][_0x26c4fb(0x169)]())_0x5d8ea5['visible']=![];return _0x5d8ea5[_0x26c4fb(0x20c)](_0x3fae2e,_0x1f590b,this[_0x26c4fb(0x176)](),_0x3fae2e[_0x26c4fb(0x1ee)],_0x220274,_0x24ef5d,this[_0x26c4fb(0x1fb)],_0x1d0322),_0x1d0322?SceneManager[_0x26c4fb(0x262)][_0x26c4fb(0x214)][_0x26c4fb(0x200)]['addChild'](_0x5d8ea5):SceneManager[_0x26c4fb(0x262)][_0x26c4fb(0x214)][_0x26c4fb(0x1b7)][_0x26c4fb(0x145)](_0x5d8ea5),_0x5d8ea5;},Sprite_Character[_0x401110(0x1bf)][_0x401110(0x168)]=function(_0x5a3b9b,_0x435a7a,_0xe1be70,_0x4449f1){const _0x5cbc58=_0x401110;let _0x10863a=new Sprite_FootSteps(this[_0x5cbc58(0x1fb)][_0x5cbc58(0x194)]);_0x5a3b9b===_0x5cbc58(0x231)?(_0x10863a['x']=this['x'],_0x10863a['y']=this['y']):(_0x10863a['x']=this['x']+this[_0x5cbc58(0x1a4)](_0x435a7a),_0x10863a['y']=this['y']+this[_0x5cbc58(0x242)](_0x435a7a));let _0x28e503=this[_0x5cbc58(0x19b)](this[_0x5cbc58(0x1fb)][_0x5cbc58(0x193)](),this[_0x5cbc58(0x158)]),_0xdd8a07=TSR[_0x5cbc58(0x272)][_0x5cbc58(0x15b)][_0xe1be70],_0x417ac5=this['_character'][_0x5cbc58(0x1e1)](_0x5a3b9b),_0x39f473=_0xe1be70?_0xdd8a07:_0x417ac5;if(_0x39f473[_0x5cbc58(0x1ae)])_0x10863a[_0x5cbc58(0x1cd)]=this[_0x5cbc58(0x224)](_0x435a7a)*0x5a*Math['PI']/0xb4;else this[_0x5cbc58(0x1fb)][_0x5cbc58(0x1e4)]&&(_0x10863a[_0x5cbc58(0x1cd)]=this[_0x5cbc58(0x224)](this[_0x5cbc58(0x1fb)][_0x5cbc58(0x1e4)])*0x5a*Math['PI']/0xb4);this[_0x5cbc58(0x1fb)]['_scaleStep']&&_0x39f473[_0x5cbc58(0x1ee)]&&(_0x10863a['scale']['x']=this[_0x5cbc58(0x1fb)][_0x5cbc58(0x257)],_0x10863a[_0x5cbc58(0x152)]['y']=this[_0x5cbc58(0x1fb)][_0x5cbc58(0x257)]);!this[_0x5cbc58(0x1fb)][_0x5cbc58(0x24e)]&&!_0x39f473[_0x5cbc58(0x1f8)]&&this[_0x5cbc58(0x1a1)](_0x10863a,_0x435a7a,_0x5a3b9b,_0xe1be70,_0x4449f1);if(this[_0x5cbc58(0x1fb)][_0x5cbc58(0x169)]())_0x10863a[_0x5cbc58(0x261)]=![];return _0x10863a[_0x5cbc58(0x20c)](_0x39f473,_0x435a7a,this[_0x5cbc58(0x176)](),_0x39f473[_0x5cbc58(0x1ee)],_0x5a3b9b,_0x28e503,this[_0x5cbc58(0x1fb)],_0x4449f1),_0x4449f1?SceneManager[_0x5cbc58(0x262)][_0x5cbc58(0x214)][_0x5cbc58(0x200)]['addChild'](_0x10863a):SceneManager[_0x5cbc58(0x262)][_0x5cbc58(0x214)][_0x5cbc58(0x1e9)][_0x5cbc58(0x145)](_0x10863a),_0x10863a;},Sprite_Character['prototype'][_0x401110(0x1a1)]=function(_0x552366,_0x3f0daa,_0x4cb760,_0x14b180,_0x5dd8bb){const _0x4e076f=_0x401110;let _0x48a930=0x0,_0x2e00a0=_0x5dd8bb?_0x4e076f(0x14d):_0x4e076f(0x149),_0xd2e064=_0x5dd8bb?_0x4e076f(0x26a):_0x4e076f(0x1c5);_0x4cb760===_0x4e076f(0x231)?!_0x14b180?this[_0x4e076f(0x1fb)][_0x4e076f(0x17d)]&&!this[_0x2e00a0]?(_0x48a930=!![],this[_0x2e00a0]=!![]):(_0x48a930=![],this[_0x2e00a0]=![]):(this[_0xd2e064]=this[_0x2e00a0]?0x0:0x1,this[_0x4e076f(0x1fb)]['_dashing']&&!this[_0xd2e064]?(_0x48a930=!![],this[_0xd2e064]=!![]):(_0x48a930=![],this[_0xd2e064]=![])):_0x48a930=!![],_0x48a930?_0x3f0daa===0x2||_0x3f0daa===0x8?_0x552366['x']+=0x4:_0x552366['y']+=0x4:_0x3f0daa===0x2||_0x3f0daa===0x8?_0x552366['x']-=0x4:_0x552366['y']-=0x4;},Sprite_Character[_0x401110(0x1bf)][_0x401110(0x176)]=function(){const _0xe0b587=_0x401110;let _0x1936e1=this[_0xe0b587(0x234)];if(!this[_0xe0b587(0x1a0)]&&this['_stepFrameIndex']<0x2){this[_0xe0b587(0x234)]++;if(this['_stepFrameIndex']===0x2)this[_0xe0b587(0x1a0)]=!![];}else{if(this[_0xe0b587(0x1a0)]&&this[_0xe0b587(0x234)]>0x0){this[_0xe0b587(0x234)]--;if(this[_0xe0b587(0x234)]===0x0)this[_0xe0b587(0x1a0)]=![];}}return _0x1936e1;},Sprite_Character[_0x401110(0x1bf)][_0x401110(0x1a4)]=function(_0x32859d){const _0x34b0e5=_0x401110;if(this[_0x34b0e5(0x158)])switch(this[_0x34b0e5(0x158)]){case 0x1:return-0xc;case 0x3:return-0x6;case 0x7:return-0xc;case 0x9:return 0xc;default:break;}if(_0x32859d===0x2||_0x32859d===0x8)return 0x0;return[_0x32859d===0x4]?-0x18:0x18;},Sprite_Character[_0x401110(0x1bf)][_0x401110(0x242)]=function(_0x3866a1){const _0x6e47f5=_0x401110;if(this[_0x6e47f5(0x158)])switch(this['_diagonalStep']){case 0x1:return 0xc;case 0x3:return 0xa;case 0x7:return-0xc;case 0x9:return-0xc;default:break;}if(_0x3866a1===0x4||_0x3866a1===0x6)return 0x0;return _0x3866a1===0x8?-0x18:0x18;},Sprite_Character[_0x401110(0x1bf)]['getSpeedFactor']=function(_0x5534d4,_0x1aa0f8){if(_0x1aa0f8)_0x5534d4+=0x1;switch(_0x5534d4){case 0x1:return 0x3c;case 0x2:return 0x2c;case 0x3:return 0x1b;case 0x4:return 0xa;case 0x5:return 0x8;case 0x6:return 0x6;case 0x7:return 0x4;default:return 0xa;}},Sprite_Character['prototype'][_0x401110(0x224)]=function(_0x9c1fb9){switch(_0x9c1fb9){case 0x1:return 2.5;case 0x2:return 0x2;case 0x3:return 1.5;case 0x4:return 0x3;case 0x6:return 0x1;case 0x7:return 3.5;case 0x8:return 0x0;case 0x9:return 0.5;default:return 0x0;}},Sprite_Character[_0x401110(0x1bf)][_0x401110(0x159)]=function(){const _0x5bce55=_0x401110;this['setupFootSteps'](),this[_0x5bce55(0x26f)][_0x5bce55(0x1ca)]>0x0&&(!this[_0x5bce55(0x26f)][0x0][_0x5bce55(0x16a)]()&&(SceneManager[_0x5bce55(0x262)]['_spriteset'][_0x5bce55(0x1b7)]['removeChild'](this[_0x5bce55(0x26f)][0x0]),this[_0x5bce55(0x26f)][_0x5bce55(0x1de)]())),this[_0x5bce55(0x17c)][_0x5bce55(0x1ca)]>0x0&&(!this[_0x5bce55(0x17c)][0x0][_0x5bce55(0x16a)]()&&(SceneManager[_0x5bce55(0x262)][_0x5bce55(0x214)]['_spriteOverAnim'][_0x5bce55(0x22b)](this[_0x5bce55(0x17c)][0x0]),this[_0x5bce55(0x17c)]['shift']())),this[_0x5bce55(0x200)][_0x5bce55(0x1ca)]>0x0&&(!this[_0x5bce55(0x200)][0x0][_0x5bce55(0x16a)]()&&(SceneManager[_0x5bce55(0x262)][_0x5bce55(0x214)]['_reflectionSteps'][_0x5bce55(0x22b)](this[_0x5bce55(0x200)][0x0]),this[_0x5bce55(0x200)][_0x5bce55(0x1de)]()));},TSR[_0x401110(0x272)][_0x401110(0x1d9)]=Spriteset_Map[_0x401110(0x1bf)][_0x401110(0x199)],Spriteset_Map[_0x401110(0x1bf)][_0x401110(0x199)]=function(){const _0x374ba9=_0x401110;TSR['footStep'][_0x374ba9(0x1d9)][_0x374ba9(0x19c)](this),this['createFootStepSprite']();},Spriteset_Map[_0x401110(0x1bf)]['createFootStepSprite']=function(){const _0x1eae1a=_0x401110;this[_0x1eae1a(0x1b7)]=new Sprite(),this[_0x1eae1a(0x1b7)][_0x1eae1a(0x16c)](0x0,0x0,this['width'],this['height']),this['_footStepSprite']['z']=0x2,this[_0x1eae1a(0x208)]['addChild'](this[_0x1eae1a(0x1b7)]),this['_spriteOverAnim']=new Sprite(),this['_spriteOverAnim'][_0x1eae1a(0x16c)](0x0,0x0,this['width'],this[_0x1eae1a(0x230)]),this[_0x1eae1a(0x1e9)]['z']=0x7,this[_0x1eae1a(0x208)][_0x1eae1a(0x145)](this[_0x1eae1a(0x1e9)]),this[_0x1eae1a(0x200)]=new Sprite(),this[_0x1eae1a(0x200)][_0x1eae1a(0x16c)](0x0,0x0,this[_0x1eae1a(0x23d)],this[_0x1eae1a(0x230)]),this[_0x1eae1a(0x200)]['z']=-0.5,this[_0x1eae1a(0x208)][_0x1eae1a(0x145)](this[_0x1eae1a(0x200)]);});function Sprite_FootSteps(){const _0x4a5b6e=_0x401110;this[_0x4a5b6e(0x1e5)]['apply'](this,arguments);}function _0xaa6b(_0x4443ed,_0x538f58){const _0x1888fc=_0x1888();return _0xaa6b=function(_0xaa6b98,_0x5bcb8b){_0xaa6b98=_0xaa6b98-0x13f;let _0xcc1801=_0x1888fc[_0xaa6b98];return _0xcc1801;},_0xaa6b(_0x4443ed,_0x538f58);}Sprite_FootSteps[_0x401110(0x1bf)]=Object[_0x401110(0x183)](Sprite['prototype']),Sprite_FootSteps['prototype']['constructor']=Sprite_FootSteps,Sprite_FootSteps[_0x401110(0x1bf)][_0x401110(0x1e5)]=function(_0x159f96){const _0x47309c=_0x401110;Sprite[_0x47309c(0x1bf)][_0x47309c(0x1e5)]['call'](this),this[_0x47309c(0x21d)](),this[_0x47309c(0x25c)](_0x159f96);},Sprite_FootSteps[_0x401110(0x1bf)]['initMembers']=function(){const _0x4eb672=_0x401110;this['_footStepsId']=0x0,this['_duration']=0x0,this['_animStep']=0x0,this[_0x4eb672(0x1d0)]['x']=0.5,this[_0x4eb672(0x1d0)]['y']=0.5,this[_0x4eb672(0x16b)]=0x0,this[_0x4eb672(0x1c9)]=0x0;},Sprite_FootSteps[_0x401110(0x1bf)][_0x401110(0x25c)]=function(_0x49b455){const _0x207da0=_0x401110;this['bitmap']=ImageManager[_0x207da0(0x23e)]('FootSteps',_0x49b455),this[_0x207da0(0x16c)](0x0,0x0,0x0,0x0);},Sprite_FootSteps['prototype'][_0x401110(0x20c)]=function(_0x4237ec,_0x110e51,_0x355547,_0x35dfff,_0x3f103f,_0x487b45,_0x5c0561,_0x2d6eba){const _0x9816c0=_0x401110,_0x1459e4=new Sprite(),_0x5a78bf=_0x5c0561[_0x9816c0(0x141)],_0x443663=_0x5c0561[_0x9816c0(0x16e)],_0x3e73de=_0x5c0561['_realY'],_0x596b9d=_0x5c0561['_scaleStep'];if(_0x4237ec[_0x9816c0(0x167)]||_0x5c0561['sound']()){const _0x32bd35=_0x5c0561[_0x9816c0(0x167)]()?_0x5c0561['sound']()[_0x4237ec[_0x9816c0(0x1a6)]]||_0x4237ec[_0x9816c0(0x167)]:_0x4237ec['sound'],_0x1a88e3=_0x32bd35['maxVol'],_0x590af5=_0x32bd35['cachePitch'],_0x18344b=$gameMap['adjustSound'](_0x1a88e3,_0x443663,_0x3e73de,_0x590af5,_0x596b9d);_0x32bd35[_0x9816c0(0x219)]=_0x18344b[0x0],_0x32bd35[_0x9816c0(0x235)]=_0x18344b[0x1];if(!_0x5a78bf)AudioManager[_0x9816c0(0x20a)](_0x32bd35);}_0x1459e4[_0x9816c0(0x1fe)]=this[_0x9816c0(0x1fe)],this[_0x9816c0(0x1fb)]=_0x5c0561,this[_0x9816c0(0x1d7)]=_0x3f103f,this[_0x9816c0(0x255)]=_0x487b45,this['_duration']=_0x5c0561[_0x9816c0(0x25f)]||_0x4237ec[_0x9816c0(0x265)],this[_0x9816c0(0x25f)]+=_0x3f103f===_0x9816c0(0x231)?_0x487b45:_0x487b45*0x2,this[_0x9816c0(0x211)]=_0x4237ec[_0x9816c0(0x1a6)],this[_0x9816c0(0x192)]=_0x4237ec[_0x9816c0(0x142)],this[_0x9816c0(0x1e0)]=_0x110e51,this[_0x9816c0(0x1b9)]=_0x35dfff?_0x4237ec[_0x9816c0(0x232)]:_0x355547,this[_0x9816c0(0x1fa)]=_0x5c0561['_Orate']||_0x4237ec[_0x9816c0(0x16b)],this[_0x9816c0(0x172)]=_0x35dfff,this['_animRate']=_0x5c0561[_0x9816c0(0x1d4)]||_0x4237ec[_0x9816c0(0x25b)],this[_0x9816c0(0x247)]=_0x4237ec[_0x9816c0(0x148)],this['_animLoop']=_0x4237ec[_0x9816c0(0x225)],this[_0x9816c0(0x1a2)]=0x0,this[_0x9816c0(0x188)]=_0x2d6eba,this[_0x9816c0(0x1ba)]=$gameMap[_0x9816c0(0x17f)]();const _0x3603e3=_0x35dfff?Math[_0x9816c0(0x229)](this['_stepFrame']/0x3):(_0x110e51-0x2)/0x2,_0x18352a=this[_0x9816c0(0x1ba)],_0x5694af=this[_0x9816c0(0x1ba)],_0x2e463b=(this[_0x9816c0(0x18f)](this['_stepBlock'])+_0x355547)*_0x18352a,_0x16a9ca=(this[_0x9816c0(0x1eb)](this[_0x9816c0(0x211)])+_0x3603e3)*_0x5694af;this[_0x9816c0(0x16c)](_0x2e463b,_0x16a9ca,_0x18352a,_0x5694af),this[_0x9816c0(0x24d)]=$gameMap[_0x9816c0(0x221)],this['_lastDisplayY']=$gameMap['_displayY'],_0x2d6eba&&(this['y']-=0x2*(this[_0x9816c0(0x1fb)]['distToBottomMirror']()*this['_tileWidth'])-this[_0x9816c0(0x1ba)]);},Sprite_FootSteps[_0x401110(0x1bf)][_0x401110(0x18f)]=function(_0x5ef2cf){return _0x5ef2cf%0x4*0x3;},Sprite_FootSteps['prototype'][_0x401110(0x1eb)]=function(_0x1061fc){const _0x301b87=_0x401110;return Math[_0x301b87(0x229)](_0x1061fc/0x4)*0x4;},Sprite_FootSteps[_0x401110(0x1bf)]['update']=function(){const _0x12c57e=_0x401110;Sprite[_0x12c57e(0x1bf)][_0x12c57e(0x1b4)]['call'](this),this[_0x12c57e(0x248)](),this[_0x12c57e(0x25f)]>0x0&&(this[_0x12c57e(0x192)]&&(this[_0x12c57e(0x16b)]=0xff,this['_hasFadeIn']=!![],this[_0x12c57e(0x1c9)]=this[_0x12c57e(0x255)],this[_0x12c57e(0x192)]=![]),this[_0x12c57e(0x1d7)]===_0x12c57e(0x181)&&this[_0x12c57e(0x1c9)]<this[_0x12c57e(0x255)]?this[_0x12c57e(0x1c9)]++:this[_0x12c57e(0x16b)]<0xff&&!this[_0x12c57e(0x213)]?(this['_duration']--,this[_0x12c57e(0x16b)]+=Math[_0x12c57e(0x229)](0xff/this[_0x12c57e(0x255)])):(this['_hasFadeIn']=!![],this[_0x12c57e(0x172)]&&this[_0x12c57e(0x1a2)]%this['_animRate']===0x0&&this['updateFootStepAnim'](),this[_0x12c57e(0x1a2)]++,this[_0x12c57e(0x25f)]--,this[_0x12c57e(0x16b)]-=this[_0x12c57e(0x1fa)]));},Sprite_FootSteps[_0x401110(0x1bf)]['updateStepScroll']=function(){const _0x40452f=_0x401110;let _0x486eba=0x0,_0x3a9047=0x0;$gameMap[_0x40452f(0x221)]!==this['_lastDisplayX']&&(_0x486eba=$gameMap['_displayX']-this[_0x40452f(0x24d)]),$gameMap[_0x40452f(0x256)]!==this['_lastDisplayY']&&(_0x3a9047=$gameMap['_displayY']-this[_0x40452f(0x249)]),this['x']=this['x']-_0x486eba*$gameMap['tileWidth'](),this['y']=this['y']-_0x3a9047*$gameMap[_0x40452f(0x15c)](),this[_0x40452f(0x24d)]=$gameMap[_0x40452f(0x221)],this[_0x40452f(0x249)]=$gameMap['_displayY'];},Sprite_FootSteps[_0x401110(0x1bf)]['updateFootStepAnim']=function(){const _0x3a1c60=_0x401110,_0x8d8c6=this[_0x3a1c60(0x1ba)],_0x1f6c45=this[_0x3a1c60(0x1b9)],_0x40ab93=Math['floor'](_0x1f6c45/0x3),_0x36891e=_0x8d8c6,_0x2d6f5c=_0x8d8c6,_0x36c180=(this['block_x'](this['_stepBlock'])+_0x1f6c45%0x3)*_0x36891e,_0x4941e2=(this[_0x3a1c60(0x1eb)](this[_0x3a1c60(0x211)])+_0x40ab93)*_0x2d6f5c;this[_0x3a1c60(0x16c)](_0x36c180,_0x4941e2,_0x36891e,_0x2d6f5c),this[_0x3a1c60(0x1b9)]=this[_0x3a1c60(0x240)](_0x1f6c45);},Sprite_FootSteps[_0x401110(0x1bf)][_0x401110(0x240)]=function(_0x4e8d85){const _0x426bec=_0x401110;if(_0x4e8d85<this[_0x426bec(0x247)])_0x4e8d85++;else{if(this[_0x426bec(0x157)]===0x1)_0x4e8d85=0x0;else this[_0x426bec(0x157)]===0x2?_0x4e8d85=this[_0x426bec(0x247)]:this[_0x426bec(0x25f)]=0x0;}return _0x4e8d85;},Sprite_FootSteps[_0x401110(0x1bf)][_0x401110(0x16a)]=function(){return this['_duration']>0x0;};
})();

//== END =================================================================================
//========================================================================================