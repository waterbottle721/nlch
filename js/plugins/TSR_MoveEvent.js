//========================================================================================
//=== TSR_MoveEvent === A Plugin by The Northern Frog ====================================
//========================================================================================

var TSR = TSR || {};
TSR.moveEvent = TSR.moveEvent || {};
TSR.moveEvent.version = 1.44;

var Imported = Imported || {};
Imported.TSR_MoveEvent = true;

//========================================================================================

/*:
 * @target MZ
 * @plugindesc v1.4.4 This plugin allow to push, pull, pick-up and throw events. 
 * 
 * @author TSR, The Northern Frog, 2021      
 * @help 
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 * Use the following comment tags to turn the event page into a movable event.
 * 
 * Event Comment Tags:
 * ===================
 * 
 *            <MOVABLE EVENT>
 *                  Event page having this comment tag can be pushed and 
 *                  pulled by the player. 
 * 
 *                  <MOVABLE EVENT: X>
 *                      You can add a switch (X) argument to the comment
 *                      tag. If so, the event will only be movable when
 *                      the game switch X is ON. While the switch is OFF,
 *                      the player will react as if he can push/pull the
 *                      event, but it won't budge unless the switch is
 *                      turned ON.
 * 
 * 
 *            <MOVABLE MYSTERY: X>
 *                  Event page having this comment tag can be pushed and 
 *                  pulled by the player. In addition, these events will  
 *                  play the 'Mystery Sound' (set in parameters), and turn 
 *                  ON the switch specified by X. 
 * 
 *                  This will happen only the first time the event is moved.
 *                  Those events will be considered as regular movable events
 *                  afterwards.
 * 
 * 
 *            <PICKUP EVENT>
 *                  Event page having this comment tags can be picked up and
 *                  thrown by the player. You can use images from tiles sheets
 *                  or character sheets; in both case the event will be fixed
 *                  on the specified image, no matter the direction. The step
 *                  animation can be toggle ON when using a character sheet.
 *
 *              <PICKUP EVENT: X>
 *                  You can add a self switch X argument to the comment tag.
 *                  The event will turn ON the self switch specified by X 
 *                  when it reach the ground after being dropped or thrown. 
 *  
 *
 *            <PICKUP CHARACTER>
 *                  This comment tag have the same effect than the previous
 *                  one. But event having this comment tag must be assigned 
 *                  an image from a character sheet because they will turn
 *                  around according to the player direction when picked up.
 * 
 *                  Example:
 *                      The event is turned down and player comes from down
 *                      side (playing is looking up) and pick up the event.
 *                      The event and player are facing each other, so that
 *                      will remain when player change direction. Hence, if
 *                      player turn left, the event will turn right.
 *                  
 * 
 *            <MOVE EVENT OFFSET: X>
 *                  Use this tag if you need to adjust the distance the
 *                  player has to walk to get closer to the movable event.
 *                  Without the tag, the distance will be defined by the 
 *                  'move event offset' parameter. 
 * 
 *                  This commment tag can also be used on pickup events to
 *                  set the distance between the player and the event it is
 *                  holding.
 * 
 * 
 * Map Note Tag:
 * =============
 * 
 *      By default the thrown events respect the same passability as the player.
 *      You can throw events over some unpassable tiles by using the following
 *      tag in a map notebox.
 * 
 *            <THROW REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as passable
 *                  for throwing event through those regions.
 * 
 * 
 *      Some tiles, like rooftop tiles, aren't accessible by the player, but
 *      are considerated as passable. To prevent throwing event on those tiles.
 *      use the map notetag bellow:
 * 
 *            <PREVENT THROW REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as impassable
 *                  for throwing event through those regions.
 * 
 * 
 *      If you're not using the default tile passability and need to restrict
 *      the movement of movable events on some tiles, use the following map
 *      notetag. 
 * 
 *             <PREVENT MOVE REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as impassable
 *                  for movable event through those regions.
 * 
 * 
 * HOW TO USE:
 * ===========
 * 
 * 
 * 
 *          TO PUSH: Hold the ARROW KEY in the direction toward the movable
 *                   event until it back off one tile.
 * 
 *          TO PULL: Hold the MOVE KEY when standing next to a movable event
 *                   and facing it, and wait until it move one tile.
 * 
 *              *The MOVE KEY is the OK button by default. But it can be
 *               changed to another key in the parameters (see bellow).
 * 
 *             **There's a small delay when pushing or pulling. Keep holding
 *               the key and you'll see the player starting to 'run' against 
 *               the movable event. Then you'll hear the 'Effort Sound' (set
 *               in parameters) and see the 'Effort Balloon' (also set in
 *               parameters). After a few more frames, the event will move
 *               and the player will move along with it.
 * 
 *            ***When pushing and pulling, the player will walk shortly to
 *               get closer to the movable event. The default distance is
 *               set in parameters. There's also an event comment tag to 
 *               assign specific distance to some events. 
 * 
 *           ****The pushing and pulling event will move at the speed set in
 *               the event tab. Player will move at same speed when pushing
 *               or pulling the event.
 * 
 * 
 *         TO PICKUP: Stand in front of a pickable event and hold the MOVE
 *                    KEY to pick it up. Keep holding the key because
 *                    releasing it will drop the event. You can move and
 *                    dash while holding an event. 
 * 
 *          TO THROW: Release the MOVE KEY to drop the event the player is
 *                    holding. The event will be dropped on the tile in front
 *                    of the player. If you drop it while holding an ARROW
 *                    KEY, the event will be thrown one tile away in front
 *                    of the player. And if you drop while holding both the
 *                    DASH BUTTON and an ARROW KEY, the event will be thrown
 *                    2 tiles away in front of the player.
 * 
 * 
 *     MOVE KEY
 *     ========
 *     To change the MOVE KEY, write the new key name in the corresponding
 *     parameter. Since 'escape'(open menu) and 'shift'(dash) can't be used,
 *     that leaves the following key names:
 * 
 *     tab 
 *     control (control, alt)
 *     pageup 
 *     pagedown
 * 
 *     You can also use alphabetic keys if your game is meant for keyboard
 *     control. Just type the key in the parameter, but keep in mind that
 *     using z, x, q or w won't do anything because these are already used
 *     by default.
 * 
 * 
 * 
 * CHARACTER IMAGES
 * ================
 * 
 *      The plugin allow to change the character images while moving events.
 *      To do so, set the sprite sheet name without extension, followed by
 *      the character index, separated by a comma, in the relevant parameter.
 * 
 *      The images that can be changed are as follow:
 * 
 *          -Push image:   will change the character image while the player is
 *                         pushing an event.
 *          -Pull image:   will change the character image while the player is
 *                         pulling an event.
 *          -Pickup image: will change the character image while the player is
 *                         holding an event.
 *          -throw image:  will change the character image while the player is
 *                         throwing an event.
 * 
 *              Example: hero_pushPose, 3
 * 
 *                    *entering the above in the Pushing Character Image
 *                     parameter will change the player image to the index
 *                     3 of the sprite sheet 'hero_pushPose', stored in the
 *                     /img/characters folder of your game. Image will revert
 *                     back to original player image once the pushing process
 *                     is over.
 *
 *      Move Frame Rate
 *      ===============
 *      By default, the character update their motion pattern each 12 frames.
 *      The default plugin update when pushing/pulling is 4, which give the
 *      look of the player 'running' against the movable event before it 
 *      start to move. 
 * 
 *      If you're using a push or pull custom image, that rate of 4 frames
 *      might not be optimal. Hence, the plugin provide a parameter to adjust
 *      that value to your liking.
 * 
 * 
 * SCRIPT CALLS:
 * =============
 * 
 *      In order to manage your movable events interaction on the map, you can 
 *      use a few script calls to check events position on the map.
 * 
 *       
 *      PUSH / PULL events
 *      ==================
 * 
 *      Use the following default call to check an event position at any time:
 * 
 *               $gameMap.event(eventId).pos(x, y) 
 * 
 *      It will return true or false wheter the event is at position x, y on
 *      the map. This can be checked in a parallel process event or in an
 *      autonomous movement script command.
 * 
 * 
 * 
 *      PICK & THROW events
 *      ===================
 *  
 *      These events can be a bit trickier to manage for game mechanics 
 *      purposes. The plugin provide additionnal script calls to check 
 *      these events positions.
 * 
 *               $gamePlayer.isHolding(eventId);
 * 
 *      This call will return true if the map event specified by eventId is 
 *      hold (carried) by the player.
 * 
 * 
 *               $gamePlayer.hasBroughtEvent(eventId, x, y, d)
 * 
 *      This call will return true if the map event specified by eventId is 
 *      hold by the player on tile x, y and turned in direction d.
 * 
 * 
 *               $gamePlayer.hasGaveEvent(eventId, targetEventId)
 * 
 *      This call will return true if the map event specified by eventId is 
 *      hold by the player on the tile in front of the map event specified
 *      by targetEventId The player must be facing the target event.
 * 
 * 
 *              $gamePlayer.hasThrownEvent(eventId, x, y)
 * 
 *      This one will returm true if the player has actually thrown or
 *      drop the map event specified by evenId on that exact tile at 
 *      position x, y.
 *     
 * 
 * 
 * =======================================================================================
 * == Term of Usage ======================================================================
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
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 08/12/2020 completed plugin,                                            v1.0.0
 * 07/03/2021 add parameters and instructions,                             v1.0.1
 * 08/03/2021 add script calls and some code fixes,                        v1.0.2
 * 09/03/2021 made some changes on script calls,                           v1.0.4
 * 10/03/2021 made some changes on throw/drop mechanics,                   v1.0.5
 * 12/03/2021 add move event speed and push/pull smooth transition,        v1.0.7
 * 14/03/2021 fix 'mystery music effect',                                  v1.0.8
 * 16/03/2021 fix some inconsistancies with character images,              v1.0.9
 * 18/03/2021 add more comment tag for pickup event,                       v1.1.0
 * 19/03/2021 add switch option for movable event tag,                     v1.1.1
 * 24/03/2021 add a map notetag to prevent throwing on regionId,           v1.1.2
 * 12/05/2021 add new event comment tag and fix compatibility issue,       v1.1.4
 * 13/05/2021 some changes in the push/pull process,                       v1.1.5
 * 16/05/2021 add the <prevent throw region> map notetag,                  v1.1.6
 * 04/06/2021 add the option to change player image while moving events    v1.2.6
 * 28/07/2021 add the <prevent move region> map notetag,                   v1.2.7
 * 01/09/2021 add the option to change the pull and pickup key             v1.3.7
 * 23/09/2021 small fix for move/pickup key input                          v1.3.8
 * 28/10/2021 small fix and revamp of the key mapping                      v1.4.0
 * 03/05/2022 fix a bug with vehicules speed                               v1.4.1
 * 22/03/2023 fix a bug when running into battle while holding an event    v1.4.2
 * 31/03/2023 fix a bug with followers when pulling                        v1.4.3
 * 18/04/2023 fix a bug when running into battle while throwing an event   v1.4.4
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
 * @param Move Key
 * @desc The name of the key for pulling and picking up
 * Default: ok (See plugin instruction)
 * @default ok
 * 
 * @param Move Event Offset
 * @type Number
 * @min 0
 * @desc The move offset when pushing and pulling events.
 * Default: 12
 * @default 12
 * 
 * @param Pickup Event Offset
 * @type Number
 * @min 0
 * @desc The offset when player hold a pickup event.
 * Default: 24
 * @default 24
 * 
 * @param Effort Balloon Id
 * @type Number
 * @min 1
 * @max 15
 * @desc The effort Balloon Icon Id when pushing/pulling.
 * Default: 11
 * @default 11
 * 
 * @param Move Frame Rate
 * @type Number
 * @min 1
 * @desc The frame rate of the character update when pushing/pulling.
 * Default: 4
 * @default 4
 * 
 * 
 * @param ---Sounds
 * 
 * @param Effort Sound
 * @parent ---Sounds
 * @desc The effort Sound when pushing/pulling
 * Default: Cry2, 60, 150, 0
 * @default Cry2, 60, 150, 0
 * 
 * @param Push Sound
 * @parent ---Sounds
 * @desc The sound when pushing/pulling an event
 * Default: Push, 100, 100, 0
 * @default Push, 100, 100, 0
 * 
 * @param Mystery Music Effect
 * @parent ---Sounds
 * @desc The music effect when pushing/pulling a 'Mystery' event
 * Default: Mystery, 100, 100, 0
 * @default Mystery, 100, 100, 0
 * 
 * @param Pickup Sound
 * @parent ---Sounds
 * @desc The sound when picking up an event
 * Default: Equip1, 60, 150, 0
 * @default Equip1, 60, 150, 0
 * 
 * @param Throw Sound
 * @parent ---Sounds
 * @desc The sound when throwing an event
 * Default: Jump1, 80, 80, 0
 * @default Jump1, 80, 80, 0
 * 
 * @param Drop Sound
 * @parent ---Sounds
 * @desc The sound when the event is drop (touch the ground)
 * Default: Blow1, 60, 150, 0
 * @default Blow1, 60, 150, 0
 * 
 * 
 * @param ---Motion images
 * 
 * @param Pushing Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 * @param Pulling Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 * @param Pickup Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 * @param Throw Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default: 
 * @default
 * 
 */

(() => {
const _0x277321=_0x2279;(function(_0xc6b978,_0x22e4c4){const _0x3deee7=_0x2279,_0x3aabc9=_0xc6b978();while(!![]){try{const _0xa4957=parseInt(_0x3deee7(0x25f))/0x1+-parseInt(_0x3deee7(0x228))/0x2*(-parseInt(_0x3deee7(0x2e1))/0x3)+-parseInt(_0x3deee7(0x2cb))/0x4*(parseInt(_0x3deee7(0x337))/0x5)+parseInt(_0x3deee7(0x2ce))/0x6*(-parseInt(_0x3deee7(0x298))/0x7)+parseInt(_0x3deee7(0x254))/0x8*(parseInt(_0x3deee7(0x323))/0x9)+parseInt(_0x3deee7(0x1f9))/0xa+parseInt(_0x3deee7(0x1f5))/0xb*(parseInt(_0x3deee7(0x242))/0xc);if(_0xa4957===_0x22e4c4)break;else _0x3aabc9['push'](_0x3aabc9['shift']());}catch(_0x316019){_0x3aabc9['push'](_0x3aabc9['shift']());}}}(_0x34da,0xd15e5),TSR['Parameters']=PluginManager['parameters'](_0x277321(0x22c)),TSR['moveEvent'][_0x277321(0x23b)]=String(TSR[_0x277321(0x32f)][_0x277321(0x292)]),TSR[_0x277321(0x2ca)][_0x277321(0x21d)]=Number(TSR[_0x277321(0x32f)][_0x277321(0x30e)]),TSR[_0x277321(0x2ca)][_0x277321(0x2eb)]=Number(TSR[_0x277321(0x32f)][_0x277321(0x2b5)]),TSR['moveEvent']['_effortBallonId']=Number(TSR[_0x277321(0x32f)][_0x277321(0x259)]),TSR[_0x277321(0x2ca)][_0x277321(0x25d)]=Number(TSR[_0x277321(0x32f)][_0x277321(0x31e)]),TSR[_0x277321(0x2ca)][_0x277321(0x1fa)]=String(TSR[_0x277321(0x32f)][_0x277321(0x307)]),TSR[_0x277321(0x2ca)][_0x277321(0x243)]=String(TSR[_0x277321(0x32f)][_0x277321(0x212)]),TSR[_0x277321(0x2ca)][_0x277321(0x1fb)]=String(TSR[_0x277321(0x32f)][_0x277321(0x1fd)]),TSR[_0x277321(0x2ca)][_0x277321(0x336)]=String(TSR[_0x277321(0x32f)][_0x277321(0x237)]),TSR[_0x277321(0x2ca)]['_throwSound']=String(TSR[_0x277321(0x32f)][_0x277321(0x2a3)]),TSR[_0x277321(0x2ca)][_0x277321(0x2df)]=String(TSR['Parameters'][_0x277321(0x28c)]),TSR[_0x277321(0x2ca)][_0x277321(0x303)]=String(TSR[_0x277321(0x32f)][_0x277321(0x31d)]),TSR[_0x277321(0x2ca)][_0x277321(0x30f)]=String(TSR[_0x277321(0x32f)][_0x277321(0x2dc)]),TSR[_0x277321(0x2ca)][_0x277321(0x2b3)]=String(TSR[_0x277321(0x32f)][_0x277321(0x226)]),TSR[_0x277321(0x2ca)][_0x277321(0x2a9)]=String(TSR[_0x277321(0x32f)][_0x277321(0x304)]),TSR[_0x277321(0x2ca)][_0x277321(0x306)]=function(_0x3d8c6f){const _0x52ddf4=_0x277321;array=_0x3d8c6f[_0x52ddf4(0x20a)](',');if(array[_0x52ddf4(0x269)]<0x4)return null;const _0x1420f7=array[0x0],_0x54a685=parseInt(array[0x1]),_0x20221d=parseInt(array[0x2]),_0x3207d6=parseInt(array[0x3]);return{'name':_0x1420f7,'volume':_0x54a685,'pitch':_0x20221d,'pan':_0x3207d6};},TSR['moveEvent'][_0x277321(0x2e6)]=function(_0x1904cc){const _0x500837=_0x277321;array=_0x1904cc[_0x500837(0x20a)](',');if(array[_0x500837(0x269)]<0x2)return null;const _0x586d14=array[0x0],_0x1082b1=parseInt(array[0x1]);return[_0x586d14,_0x1082b1];},TSR[_0x277321(0x2ca)]['_pushSheet']=TSR[_0x277321(0x2ca)][_0x277321(0x2e6)](TSR[_0x277321(0x2ca)][_0x277321(0x303)]),TSR[_0x277321(0x2ca)][_0x277321(0x241)]=TSR['moveEvent'][_0x277321(0x2e6)](TSR['moveEvent'][_0x277321(0x30f)]),TSR[_0x277321(0x2ca)][_0x277321(0x28e)]=TSR['moveEvent'][_0x277321(0x2e6)](TSR[_0x277321(0x2ca)]['_pickupImage']),TSR[_0x277321(0x2ca)][_0x277321(0x261)]=TSR[_0x277321(0x2ca)]['makeSheetInfo'](TSR['moveEvent'][_0x277321(0x2a9)]),TSR['moveEvent'][_0x277321(0x1fa)]=TSR[_0x277321(0x2ca)]['makeSoundObj'](TSR[_0x277321(0x2ca)][_0x277321(0x1fa)]),TSR[_0x277321(0x2ca)][_0x277321(0x243)]=TSR[_0x277321(0x2ca)][_0x277321(0x306)](TSR[_0x277321(0x2ca)][_0x277321(0x243)]),TSR[_0x277321(0x2ca)]['_mysterySound']=TSR[_0x277321(0x2ca)][_0x277321(0x306)](TSR['moveEvent']['_mysterySound']),TSR['moveEvent'][_0x277321(0x336)]=TSR[_0x277321(0x2ca)]['makeSoundObj'](TSR[_0x277321(0x2ca)]['_pickupSound']),TSR[_0x277321(0x2ca)][_0x277321(0x281)]=TSR['moveEvent'][_0x277321(0x306)](TSR['moveEvent']['_throwSound']),TSR[_0x277321(0x2ca)][_0x277321(0x2df)]=TSR[_0x277321(0x2ca)]['makeSoundObj'](TSR[_0x277321(0x2ca)][_0x277321(0x2df)]),TSR['moveEvent'][_0x277321(0x2a1)]={'a':0x41,'b':0x42,'c':0x43,'d':0x44,'e':0x45,'f':0x46,'g':0x47,'h':0x48,'i':0x49,'j':0x4a,'k':0x4b,'l':0x4c,'m':0x4d,'n':0x4e,'o':0x4f,'p':0x50,'r':0x52,'s':0x53,'t':0x54,'u':0x55,'v':0x56,'y':0x59});if(TSR[_0x277321(0x2ca)][_0x277321(0x23b)]!=='ok'){const newKey=TSR[_0x277321(0x2ca)][_0x277321(0x2a1)][TSR[_0x277321(0x2ca)]['_moveKey']];Input[_0x277321(0x20f)][newKey]=TSR[_0x277321(0x2ca)][_0x277321(0x23b)];}function _0x2279(_0x42232e,_0x384c89){const _0x34da09=_0x34da();return _0x2279=function(_0x227975,_0x52fdaa){_0x227975=_0x227975-0x1f0;let _0x44646c=_0x34da09[_0x227975];return _0x44646c;},_0x2279(_0x42232e,_0x384c89);}function _0x34da(){const _0x41e93f=['_isBrought','setThrough','_pullSheet','56076IjQFaF','_pushSound','updatePull','thrownAt','_hasThrew','moveOffset','characterIndex','setPosition','_pushMoved','canPush','TSR_MapJump','reverseDir','setup','hasPickup','normalSpeed','updateThrow','setMovementSuccess','isCollidedWithMovableEvent','8wNOWuG','checkMystery','isCliff','pushDist','_hasPickup','Effort\x20Balloon\x20Id','height','_patternCount','initialize','_moveRate','updatePushEvent','1408224hymDVY','match','_throwSheet','updatePattern','_throwShadowContainer','_direction','forceMove','isPushing','_effortBallonId','_isPickupChar','length','_isPickable','canMoveEvent','requestBalloon','_dirInfo','hasThrew','makeEffort','calcDirection','_characterIndex','call','setPushMoved','regionId','pos','isMovingEvent','isTriggered','_jumpEnable','resetCacheImage','_throwCount','isCollidedWithPickableEvent','playSe','_moveSpeed','isThrow','toUpperCase','eventId','_throwSound','increaseSteps','isInVehicle','_eventId','_pullSpeed','_Sprite_Character_initMembers','name','_cacheCharIndex','push','direction','isPreventThrowRegion','Drop\x20Sound','apply','_pickupSheet','_balloonQueue','gatherFollowers','unsetPause','Move\x20Key','slice','endPickup','isThrowCliff','createThrowShadowContainer','isHolding','14847eSTVZI','_cacheCharName','_isPickup','_duration','_Game_Event_isCollidedWithEvents','isMovable','endMapPickup','setMovingEventPreventMove','_Game_Player_update','_alphaKeyList','_Sprite_Character_updatePosition','Throw\x20Sound','playThrow','tileWidth','setMoveOffset','pullDist','_isPushing','_throwImage','_realX','_realY','_pushSheet','movingEventPreventMove','_movableSwitch','_data','removeChild','update','_normalSpeed','_pickupImage','getInputDirection','Pickup\x20Event\x20Offset','executePull','checkCacheImage','_dist','hasStepAnime','hasGaveEvent','_pullDist','indexOf','initMembers','followers','setThrowDestination','code','resetSpeed','isHoldingOk','throwDestination','_Sprite_Character_update','_threwMidAir','_Game_Player_initMembers','updateThrowShadowSprites','_movingEventPreventMove','resetPushing','moveEvent','6112220FwohjH','resetPulling','roundYWithDirection','4446RKkDWs','eventsXyNt','enableMenu','movableEventCanPass','_lastY','setBackDist','_GamePlayer_canMove','createThrowShadow','isMoving','_scene','playDrop','moveSpeed','_cacheEnableJump','bitmap','Pulling\x20Character\x20Image','isPreventMoveRegion','_throwSpriteSet','_dropSound','_Spriteset_Map_createLowerLayer','1734087SCBxar','updatePosition','screenX','setDirection','some','makeSheetInfo','setRequireThrowShadow','_pushCount','_charSprite','_Game_Follower_chaseChar','_pickupOffset','setPattern','note','hasBroughtEvent','_Game_CharacterBase_updatePattern','setDirectionFix','addChild','setMovableEvent','_lastX','page','_pullMoved','value','width','chaseCharacter','setDirInfo','disableMenu','locate','prototype','_spriteset','_requireThrowShadow','pullSpeed','isPressed','movableEvent','screenZ','_pushImage','Throw\x20Character\x20Image','playPickup','makeSoundObj','Effort\x20Sound','vehicle','playPush','isPickup','isPlaying','roundXWithDirection','xWithDirection','Move\x20Event\x20Offset','_pullImage','_pushDist','mapId','updateShadowPosition','pickupOffset','pushMoved','cacheSpeed','_pullEvent','event','_pushEventCount','mapJump','setPullMoved','setMoveSpeed','Shadow1','Pushing\x20Character\x20Image','Move\x20Frame\x20Rate','parameters','_isMovable','create','stop','6813054tqYiKv','setPullDist','_isMovableChar','setValue','_Scene_Map_stop','_throw','list','_moveEventOffset','_backDist','setPickup','backDist','_tileId','Parameters','executePickup','isEventRunning','requireThrowShadow','canPass','isNormalPriority','pickupEvent','_pickupSound','5FrXFMB','scale','evalDist','setFrame','setPause','setupPage','_pullCount','_throwDestination','_moveJump','1738qibdIB','anchor','isCollidedWithEvents','updatePush','4756960ljObpL','_effortSound','_mysterySound','resetPattern','Mystery\x20Music\x20Effect','throwPass','isPulling','_Game_Event_setupPage','toString','screenY','_character','startThrowShadow','isThrowRegion','_routeUndone','createLowerLayer','_jumpPeak','dirInfo','split','isDashing','isRepeated','_jumpOffset','_isPulling','keyMapper','playMystery','_pullEventCount','Push\x20Sound','canMove','canPull','isPassable','_originalPattern','_cacheDirFix','_pattern','_isBreakable','isPickable','setPriorityType','isCollidedWithCharacters','_moveOffset','_Game_System_initialize','updatePickupEvent','_pushEvent','setThrow','loadBitmap','hasThrownEvent','_throwPattern','_dashing','Pickup\x20Character\x20Image','playMe','2VGYbjf','_moveRouteIndex','pullMoved','moveEventStraight','TSR_MoveEvent','_characterName','mapCoordinates','executePush','_tilemap','moveStraight','throwPickup','playEffort','_mysteryEvents','characterName','_cacheSpeed','Pickup\x20Sound','setNormalSpeed','setupThrowShadow','isPlayer','_moveKey','isBreakable','setPushDist','_pickupEvent'];_0x34da=function(){return _0x41e93f;};return _0x34da();}DataManager[_0x277321(0x205)]=function(_0x21407f){const _0x2b64c0=_0x277321;if(!$dataMap)return![];const _0x3240d4=/<(?:THROW REGION|THREW REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x1d3c29=$dataMap[_0x2b64c0(0x2ed)][_0x2b64c0(0x201)]()[_0x2b64c0(0x20a)](/[\r\n]+/);for(const _0x1c747d of _0x1d3c29){if(_0x1c747d[_0x2b64c0(0x260)](_0x3240d4)){const _0x2c25db=_0x1c747d[_0x2b64c0(0x293)](_0x1c747d[_0x2b64c0(0x2bc)](':')+0x1)[_0x2b64c0(0x20a)](',');for(const _0x1e6646 in _0x2c25db){if(parseInt(_0x2c25db[_0x1e6646])===_0x21407f)return!![];}}}return![];},DataManager[_0x277321(0x28b)]=function(_0x2fd817){const _0x2625b2=_0x277321;if(!$dataMap)return![];const _0x2d1424=/<(?:PREVENT THROW REGION|PREVENT THREW REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x21f8ab=$dataMap[_0x2625b2(0x2ed)][_0x2625b2(0x201)]()[_0x2625b2(0x20a)](/[\r\n]+/);for(const _0x5b8a58 of _0x21f8ab){if(_0x5b8a58[_0x2625b2(0x260)](_0x2d1424)){const _0x59d164=_0x5b8a58[_0x2625b2(0x293)](_0x5b8a58[_0x2625b2(0x2bc)](':')+0x1)[_0x2625b2(0x20a)](',');for(const _0x4ab6ef in _0x59d164){if(parseInt(_0x59d164[_0x4ab6ef])===_0x2fd817)return!![];}}}return![];},DataManager[_0x277321(0x2dd)]=function(_0x5e8a26){const _0xb1185f=_0x277321;if(!$dataMap)return![];const _0x5e6afa=/<(?:PREVENT MOVE REGION|PREVENT MOVE REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,_0x6b1686=$dataMap[_0xb1185f(0x2ed)][_0xb1185f(0x201)]()[_0xb1185f(0x20a)](/[\r\n]+/);for(const _0xc47362 of _0x6b1686){if(_0xc47362[_0xb1185f(0x260)](_0x5e6afa)){const _0x4c741e=_0xc47362[_0xb1185f(0x293)](_0xc47362['indexOf'](':')+0x1)[_0xb1185f(0x20a)](',');for(const _0x36f64f in _0x4c741e){if(parseInt(_0x4c741e[_0x36f64f])===_0x5e8a26)return!![];}}}return![];},SoundManager[_0x277321(0x233)]=function(){const _0x56afac=_0x277321,_0x53d0eb=TSR['moveEvent'][_0x56afac(0x1fa)];_0x53d0eb&&AudioManager[_0x56afac(0x27c)](_0x53d0eb);},SoundManager[_0x277321(0x309)]=function(){const _0x38443a=_0x277321,_0x59175f=TSR[_0x38443a(0x2ca)][_0x38443a(0x243)];_0x59175f&&AudioManager[_0x38443a(0x27c)](_0x59175f);},SoundManager['playMystery']=function(){const _0x138c71=_0x277321,_0x4134de=TSR[_0x138c71(0x2ca)][_0x138c71(0x1fb)];_0x4134de&&AudioManager[_0x138c71(0x227)](_0x4134de);},SoundManager[_0x277321(0x305)]=function(){const _0x8e6269=_0x277321,_0x29bab8=TSR[_0x8e6269(0x2ca)][_0x8e6269(0x336)];_0x29bab8&&AudioManager[_0x8e6269(0x27c)](_0x29bab8);},SoundManager[_0x277321(0x2a4)]=function(){const _0x2031e1=_0x277321,_0xbc6ad7=TSR[_0x2031e1(0x2ca)][_0x2031e1(0x281)];_0xbc6ad7&&AudioManager['playSe'](_0xbc6ad7);},SoundManager[_0x277321(0x2d8)]=function(){const _0x4059f8=_0x277321,_0x24b0f1=TSR['moveEvent'][_0x4059f8(0x2df)];_0x24b0f1&&AudioManager[_0x4059f8(0x27c)](_0x24b0f1);},TSR[_0x277321(0x2ca)][_0x277321(0x327)]=Scene_Map[_0x277321(0x2fc)][_0x277321(0x322)],Scene_Map[_0x277321(0x2fc)][_0x277321(0x322)]=function(){const _0x270705=_0x277321;TSR['moveEvent']['_Scene_Map_stop'][_0x270705(0x272)](this),$gamePlayer[_0x270705(0x2c9)](),$gamePlayer[_0x270705(0x2cc)](),$gamePlayer[_0x270705(0x29e)](SceneManager['isNextScene'](Scene_Battle)),$gamePlayer[_0x270705(0x2d3)](![]),$gamePlayer[_0x270705(0x29f)](![]);},TSR['moveEvent'][_0x277321(0x21e)]=Game_System[_0x277321(0x2fc)][_0x277321(0x25c)],Game_System['prototype'][_0x277321(0x25c)]=function(){const _0x5015bf=_0x277321;TSR['moveEvent'][_0x5015bf(0x21e)][_0x5015bf(0x272)](this),this[_0x5015bf(0x234)]={};},TSR['moveEvent'][_0x277321(0x2ef)]=Game_CharacterBase['prototype'][_0x277321(0x262)],Game_CharacterBase['prototype']['updatePattern']=function(){const _0x2c8b1e=_0x277321;if(this[_0x2c8b1e(0x2a7)]()||this[_0x2c8b1e(0x257)]()||this[_0x2c8b1e(0x32d)]()||this['_throwPattern'])this[_0x2c8b1e(0x218)]=(this[_0x2c8b1e(0x218)]+0x1)%this['maxPattern']();else!this[_0x2c8b1e(0x224)]&&TSR['moveEvent'][_0x2c8b1e(0x2ef)][_0x2c8b1e(0x272)](this);},Game_CharacterBase['prototype'][_0x277321(0x245)]=function(_0x17a3ac,_0x26a61b){const _0x49bce2=_0x277321;this['_x']+=_0x17a3ac,this['_y']+=_0x26a61b;const _0x3ce035=Math['round'](Math['sqrt'](_0x17a3ac*_0x17a3ac+_0x26a61b*_0x26a61b));this[_0x49bce2(0x208)]=0xa+_0x3ce035-this[_0x49bce2(0x27d)],this['_jumpCount']=this['_jumpPeak']*0x2;},Game_CharacterBase[_0x277321(0x2fc)][_0x277321(0x22b)]=function(_0x4660a3){const _0x4aa79d=_0x277321;this[_0x4aa79d(0x252)](this[_0x4aa79d(0x333)](this['_x'],this['_y'],_0x4660a3));if(this['isMovementSucceeded']()){this['_x']=$gameMap[_0x4aa79d(0x30c)](this['_x'],_0x4660a3),this['_y']=$gameMap[_0x4aa79d(0x2cd)](this['_y'],_0x4660a3),this['_realX']=$gameMap[_0x4aa79d(0x30d)](this['_x'],this[_0x4aa79d(0x24d)](_0x4660a3)),this[_0x4aa79d(0x2ab)]=$gameMap['yWithDirection'](this['_y'],this[_0x4aa79d(0x24d)](_0x4660a3));if(this['_isMovableChar'])this[_0x4aa79d(0x282)]();}},Game_Character['prototype'][_0x277321(0x297)]=function(_0x4eb183){const _0xe8c92f=_0x277321,_0x2da2b0=$gameMap[_0xe8c92f(0x317)](_0x4eb183);return this[_0xe8c92f(0x23e)]===_0x2da2b0&&this[_0xe8c92f(0x24f)]();},Game_Character[_0x277321(0x2fc)][_0x277321(0x335)]=function(){const _0x25e721=_0x277321;return this[_0x25e721(0x23e)];},Game_Character[_0x277321(0x2fc)]['hasPickup']=function(){const _0x2bbff3=_0x277321;return this[_0x2bbff3(0x258)];},Game_Character['prototype'][_0x277321(0x23c)]=function(){const _0x193a31=_0x277321;return this[_0x193a31(0x219)];},Game_Character['prototype'][_0x277321(0x32c)]=function(_0x2284a9){const _0x130c13=_0x277321;this[_0x130c13(0x29a)]=_0x2284a9;},Game_Character[_0x277321(0x2fc)][_0x277321(0x30a)]=function(){return this['_isPickup'];},Game_Character[_0x277321(0x2fc)][_0x277321(0x221)]=function(_0x5632c6){const _0x2d7849=_0x277321;this[_0x2d7849(0x328)]=_0x5632c6;},Game_Character[_0x277321(0x2fc)][_0x277321(0x27e)]=function(){const _0x4bcf96=_0x277321;return this[_0x4bcf96(0x328)];},Game_Character[_0x277321(0x2fc)][_0x277321(0x2bf)]=function(_0x243e02,_0x58e95f,_0x518d73,_0x1cdb33,_0x1ed769){const _0x520ece=_0x277321;if(_0x243e02===_0x518d73&&_0x58e95f===_0x1cdb33){const _0x28dfca=0xa-_0x1ed769,_0x50d0a5=_0x1ed769===0x4||_0x1ed769===0x6?0x2:0x4,_0x10809c=0xa-_0x50d0a5,_0x6e1b47=[_0x28dfca,_0x50d0a5,_0x10809c];for(const _0x388fbf of _0x6e1b47){if($gamePlayer[_0x520ece(0x1fe)](_0x518d73,_0x1cdb33,_0x388fbf)){_0x243e02=$gameMap[_0x520ece(0x30c)](_0x518d73,_0x388fbf),_0x58e95f=$gameMap[_0x520ece(0x2cd)](_0x1cdb33,_0x388fbf);break;}}}this['_throwDestination']=[_0x243e02,_0x58e95f];},Game_Character['prototype']['throwDestination']=function(){const _0x13ba0c=_0x277321;return this[_0x13ba0c(0x1f3)];},Game_Character[_0x277321(0x2fc)][_0x277321(0x332)]=function(){const _0x3cfd67=_0x277321;return this[_0x3cfd67(0x2fe)];},Game_Character[_0x277321(0x2fc)][_0x277321(0x2e7)]=function(_0x4b6a04){this['_requireThrowShadow']=_0x4b6a04;},Game_Character[_0x277321(0x2fc)][_0x277321(0x295)]=function(){const _0x397df8=_0x277321;if(Imported[_0x397df8(0x24c)])return this[_0x397df8(0x256)](this[_0x397df8(0x2aa)],this[_0x397df8(0x2ab)]);return![];},Game_Character[_0x277321(0x2fc)][_0x277321(0x276)]=function(){const _0x383e03=_0x277321;return this[_0x383e03(0x2a8)]||this['_isPulling'];},Game_Character[_0x277321(0x2fc)][_0x277321(0x266)]=function(){return![];},Game_Character['prototype'][_0x277321(0x23d)]=function(_0x372d4c){const _0x3a796a=_0x277321;this[_0x3a796a(0x310)]=_0x372d4c;},Game_Character[_0x277321(0x2fc)][_0x277321(0x257)]=function(){return this['_pushDist'];},Game_Character[_0x277321(0x2fc)][_0x277321(0x324)]=function(_0x209e17){const _0x28e617=_0x277321;this[_0x28e617(0x2bb)]=_0x209e17;},Game_Character[_0x277321(0x2fc)][_0x277321(0x2a7)]=function(){return this['_pullDist'];},Game_Character[_0x277321(0x2fc)][_0x277321(0x2d3)]=function(_0x1cc8b1){const _0x3636d8=_0x277321;this[_0x3636d8(0x32b)]=_0x1cc8b1;},Game_Character[_0x277321(0x2fc)][_0x277321(0x32d)]=function(){const _0x3f0cfe=_0x277321;return this[_0x3f0cfe(0x32b)];},Game_Character[_0x277321(0x2fc)]['isPlayer']=function(){return this===$gamePlayer;},TSR[_0x277321(0x2ca)][_0x277321(0x2c6)]=Game_Player[_0x277321(0x2fc)]['initMembers'],Game_Player['prototype'][_0x277321(0x2bd)]=function(){const _0x2feebb=_0x277321;TSR[_0x2feebb(0x2ca)][_0x2feebb(0x2c6)][_0x2feebb(0x272)](this),this[_0x2feebb(0x2b2)]=0x4;},TSR[_0x277321(0x2ca)][_0x277321(0x2a0)]=Game_Player[_0x277321(0x2fc)][_0x277321(0x2b1)],Game_Player[_0x277321(0x2fc)][_0x277321(0x2b1)]=function(_0x59c428){const _0x529235=_0x277321;TSR['moveEvent']['_Game_Player_update'][_0x529235(0x272)](this,_0x59c428),_0x59c428&&(this[_0x529235(0x2ca)](),this[_0x529235(0x21f)](),this[_0x529235(0x25e)]());},TSR[_0x277321(0x2ca)][_0x277321(0x2d4)]=Game_Player[_0x277321(0x2fc)][_0x277321(0x213)],Game_Player[_0x277321(0x2fc)]['canMove']=function(){const _0x3e359c=_0x277321;return this[_0x3e359c(0x266)]()||this[_0x3e359c(0x316)]||this[_0x3e359c(0x2ad)]()?![]:TSR['moveEvent'][_0x3e359c(0x2d4)]['call'](this);},Game_Player['prototype']['setMovingEventPreventMove']=function(_0x1cc719){this['_movingEventPreventMove']=_0x1cc719;},Game_Player[_0x277321(0x2fc)]['movingEventPreventMove']=function(){const _0x2a77da=_0x277321;return this[_0x2a77da(0x2c8)];},Game_Player[_0x277321(0x2fc)][_0x277321(0x2ca)]=function(){const _0x4c351b=_0x277321,_0x46e22d=this[_0x4c351b(0x264)],_0xc970e1=$gameMap['roundXWithDirection'](this['x'],_0x46e22d),_0x592d84=$gameMap[_0x4c351b(0x2cd)](this['y'],_0x46e22d),_0x257019=$gameMap['roundXWithDirection'](_0xc970e1,_0x46e22d),_0x50b9b2=$gameMap[_0x4c351b(0x2cd)](_0x592d84,_0x46e22d);this[_0x4c351b(0x253)](_0xc970e1,_0x592d84)&&(this[_0x4c351b(0x244)](_0xc970e1,_0x592d84,_0x46e22d),this[_0x4c351b(0x1f8)](_0xc970e1,_0x592d84,_0x257019,_0x50b9b2,_0x46e22d)),this['updatePickup'](this['x'],this['y'],_0xc970e1,_0x592d84,_0x46e22d);},Game_Player[_0x277321(0x2fc)][_0x277321(0x25e)]=function(){const _0x39a30a=_0x277321;if(this[_0x39a30a(0x220)]&&this['pushDist']()&&this[_0x39a30a(0x314)]())this['_pushEvent'][_0x39a30a(0x2aa)]===this[_0x39a30a(0x220)]['dx']&&this['_pushEvent'][_0x39a30a(0x2ab)]===this[_0x39a30a(0x220)]['dy']&&this[_0x39a30a(0x2c9)]();else this[_0x39a30a(0x316)]&&this[_0x39a30a(0x2a7)]()&&this['pullMoved']()&&(this[_0x39a30a(0x316)][_0x39a30a(0x2aa)]===this[_0x39a30a(0x316)]['dx']&&this[_0x39a30a(0x316)]['_realY']===this[_0x39a30a(0x316)]['dy']&&this[_0x39a30a(0x2cc)]());if(!this[_0x39a30a(0x316)])this['unsetPause']();},Game_Player[_0x277321(0x2fc)][_0x277321(0x1f8)]=function(_0xc6dcae,_0x258c1e,_0x54fa57,_0x3769f1,_0x1d0cea){const _0x1be3d8=_0x277321;if(!this[_0x1be3d8(0x2c2)]()){if(_0x1d0cea===this['getInputDirection']()&&this[_0x1be3d8(0x26b)]()){if(!this['isMovingEvent']()){this[_0x1be3d8(0x220)]=this['movableEvent'](_0xc6dcae,_0x258c1e),this['_pushCount']=0x0,this[_0x1be3d8(0x318)]=0x0,this['_isPushing']=!![],this[_0x1be3d8(0x225)]=![];const _0x2db243=this[_0x1be3d8(0x220)]['_moveEventOffset']||TSR[_0x1be3d8(0x2ca)][_0x1be3d8(0x21d)];this[_0x1be3d8(0x2a6)](_0x2db243);const _0x47f5c7=_0x1d0cea===0x4||_0x1d0cea===0x6?this[_0x1be3d8(0x2e3)]():this[_0x1be3d8(0x202)](),_0x409f1e=_0x1d0cea===0x2||_0x1d0cea===0x6?_0x2db243:-_0x2db243;this[_0x1be3d8(0x23d)](_0x47f5c7+_0x409f1e),TSR[_0x1be3d8(0x2ca)][_0x1be3d8(0x2ac)]&&(this[_0x1be3d8(0x2b7)](),this[_0x1be3d8(0x22d)]=TSR['moveEvent'][_0x1be3d8(0x2ac)][0x0],this['_characterIndex']=TSR[_0x1be3d8(0x2ca)]['_pushSheet'][0x1]);}else{if(this[_0x1be3d8(0x266)]()){const _0x38b02d=TSR[_0x1be3d8(0x2ca)][_0x1be3d8(0x25d)];this['_pushEventCount']++;if(this[_0x1be3d8(0x318)]%_0x38b02d===0x0)this['updatePattern']();if(this[_0x1be3d8(0x318)]%0x4===0x0)this['executePush'](_0x54fa57,_0x3769f1,_0x1d0cea);}else this[_0x1be3d8(0x2c9)]();}}else this[_0x1be3d8(0x2c9)]();}},Game_Player['prototype'][_0x277321(0x22f)]=function(_0x306cf9,_0x3c1d47,_0x11af5f){const _0x356fda=_0x277321,_0x1fa2b0=this[_0x356fda(0x220)];if(this['_direction']!==this['getInputDirection']()&&this[_0x356fda(0x314)]())this['resetPushing']();else{if(this['_pushCount']<0x18){if(this[_0x356fda(0x2e8)]===0xc)this[_0x356fda(0x26f)]();this[_0x356fda(0x2e8)]++;}else{if(!this['pushMoved']()&&_0x1fa2b0['movableEventCanPass'](_0x306cf9,_0x3c1d47,_0x11af5f)&&this[_0x356fda(0x24b)]()){this['setPushMoved'](!![]),SoundManager[_0x356fda(0x309)](),this[_0x356fda(0x220)]['dx']=$gameMap[_0x356fda(0x30c)](this[_0x356fda(0x220)]['x'],_0x11af5f),this['_pushEvent']['dy']=$gameMap[_0x356fda(0x2cd)](this[_0x356fda(0x220)]['y'],_0x11af5f),this[_0x356fda(0x220)]['sx']=this['_pushEvent']['x'],this['_pushEvent']['sy']=this[_0x356fda(0x220)]['y'],this[_0x356fda(0x238)](this[_0x356fda(0x27d)]);const _0x43ca20=this[_0x356fda(0x220)][_0x356fda(0x2d9)]();this[_0x356fda(0x31b)](this['isDashButtonPressed']()?_0x43ca20-0x1:_0x43ca20),_0x1fa2b0['forceMove'](_0x11af5f),this['checkMystery'](_0x1fa2b0),this[_0x356fda(0x2e8)]=0x0,this[_0x356fda(0x2a8)]=![],this[_0x356fda(0x1fc)]();}else this['resetPushing']();}}},Game_Player['prototype'][_0x277321(0x24b)]=function(){const _0x1dce90=_0x277321,_0x33b471=this[_0x1dce90(0x220)]['_movableSwitch'];return!_0x33b471||$gameSwitches[_0x1dce90(0x2f6)](_0x33b471);},Game_Player[_0x277321(0x2fc)][_0x277321(0x266)]=function(){return this['_isPushing'];},Game_Player[_0x277321(0x2fc)][_0x277321(0x2a6)]=function(_0x2d777b){const _0x41338b=_0x277321;this[_0x41338b(0x21d)]=_0x2d777b;},Game_Player[_0x277321(0x2fc)][_0x277321(0x247)]=function(){return this['_moveOffset'];},Game_Player[_0x277321(0x2fc)][_0x277321(0x238)]=function(_0x47ad3c){const _0x3ae40e=_0x277321;this[_0x3ae40e(0x2b2)]=_0x47ad3c;},Game_Player[_0x277321(0x2fc)][_0x277321(0x250)]=function(){return this['_normalSpeed'];},Game_Player['prototype'][_0x277321(0x273)]=function(_0xd95d2b){this['_pushMoved']=_0xd95d2b;},Game_Player[_0x277321(0x2fc)][_0x277321(0x314)]=function(){const _0x260700=_0x277321;return this[_0x260700(0x24a)];},Game_Player[_0x277321(0x2fc)][_0x277321(0x2c9)]=function(){const _0x36a723=_0x277321;this[_0x36a723(0x2e8)]=0x0,this['_isPushing']=![],this[_0x36a723(0x220)]=null,this[_0x36a723(0x23d)](![]),this[_0x36a723(0x2d3)](!![]),this[_0x36a723(0x273)](![]),this['resetSpeed'](),this[_0x36a723(0x279)]();},Game_Player[_0x277321(0x2fc)][_0x277321(0x244)]=function(_0x2a9a04,_0x455544,_0x31e206){const _0x17ebb1=_0x277321;if(!this[_0x17ebb1(0x2b4)]()){if(this[_0x17ebb1(0x2c2)]()&&this[_0x17ebb1(0x26b)]()){this[_0x17ebb1(0x290)]();if(!this['isMovingEvent']()){this[_0x17ebb1(0x316)]=this[_0x17ebb1(0x301)](_0x2a9a04,_0x455544),this[_0x17ebb1(0x1f2)]=0x0,this[_0x17ebb1(0x211)]=0x0,this[_0x17ebb1(0x20e)]=!![],this[_0x17ebb1(0x225)]=![];const _0x1a0981=this[_0x17ebb1(0x316)][_0x17ebb1(0x32a)]||TSR[_0x17ebb1(0x2ca)][_0x17ebb1(0x21d)];this[_0x17ebb1(0x2a6)](_0x1a0981);const _0x32414e=_0x31e206===0x4||_0x31e206===0x6?this[_0x17ebb1(0x2e3)]():this[_0x17ebb1(0x202)](),_0x569e1b=_0x31e206===0x2||_0x31e206===0x6?_0x1a0981:-_0x1a0981;this[_0x17ebb1(0x324)](_0x32414e+_0x569e1b),this[_0x17ebb1(0x1f0)](),TSR[_0x17ebb1(0x2ca)][_0x17ebb1(0x241)]&&(this[_0x17ebb1(0x2b7)](),this[_0x17ebb1(0x22d)]=TSR[_0x17ebb1(0x2ca)][_0x17ebb1(0x241)][0x0],this['_characterIndex']=TSR['moveEvent'][_0x17ebb1(0x241)][0x1]);}else{if(this[_0x17ebb1(0x1ff)]()){const _0x2a0ae4=TSR[_0x17ebb1(0x2ca)][_0x17ebb1(0x25d)];this[_0x17ebb1(0x211)]++;if(this[_0x17ebb1(0x211)]%_0x2a0ae4===0x0)this[_0x17ebb1(0x262)]();if(this[_0x17ebb1(0x211)]%0x4===0x0)this[_0x17ebb1(0x2b6)](this[_0x17ebb1(0x264)]);}else this[_0x17ebb1(0x2cc)]();}}else this['resetPulling']();}},Game_Player[_0x277321(0x2fc)][_0x277321(0x2b6)]=function(_0x2cafdb){const _0x1e3aa6=_0x277321,_0x36db36=this[_0x1e3aa6(0x316)],_0x508c74=this[_0x1e3aa6(0x24d)](_0x2cafdb);if(this[_0x1e3aa6(0x1f2)]<0x14){if(this[_0x1e3aa6(0x1f2)]===0xa)this[_0x1e3aa6(0x26f)]();this['_pullCount']++;}else{if(!this['pullMoved']()&&this[_0x1e3aa6(0x333)](this['x'],this['y'],_0x508c74)&&_0x36db36[_0x1e3aa6(0x2d1)](this['x'],this['y'],_0x508c74,!![])&&this[_0x1e3aa6(0x214)]()){this[_0x1e3aa6(0x31a)](!![]),SoundManager[_0x1e3aa6(0x309)](),this[_0x1e3aa6(0x316)]['dx']=$gameMap[_0x1e3aa6(0x30c)](this[_0x1e3aa6(0x316)]['x'],_0x508c74),this[_0x1e3aa6(0x316)]['dy']=$gameMap[_0x1e3aa6(0x2cd)](this[_0x1e3aa6(0x316)]['y'],_0x508c74),this[_0x1e3aa6(0x316)]['sx']=_0x36db36['x'],this[_0x1e3aa6(0x316)]['sy']=_0x36db36['y'],this[_0x1e3aa6(0x238)](this[_0x1e3aa6(0x27d)]),this['setPullSpeed'](this[_0x1e3aa6(0x316)][_0x1e3aa6(0x2d9)]());for(const _0x18617f of this[_0x1e3aa6(0x2be)]()[_0x1e3aa6(0x2af)]){_0x18617f[_0x1e3aa6(0x231)](_0x508c74),_0x18617f[_0x1e3aa6(0x2f0)](![]),_0x18617f[_0x1e3aa6(0x2e4)](this[_0x1e3aa6(0x28a)]());}this[_0x1e3aa6(0x231)](_0x508c74),_0x36db36['forceMove'](_0x508c74),this[_0x1e3aa6(0x255)](_0x36db36),this[_0x1e3aa6(0x1f2)]=0x0,this[_0x1e3aa6(0x20e)]=![],this[_0x1e3aa6(0x1fc)]();}else this[_0x1e3aa6(0x2cc)]();}},Game_Player[_0x277321(0x2fc)]['canPull']=function(){const _0x340abc=_0x277321,_0x5424dc=this[_0x340abc(0x316)]['_movableSwitch'];return!_0x5424dc||$gameSwitches['value'](_0x5424dc);},Game_Player[_0x277321(0x2fc)][_0x277321(0x1ff)]=function(){const _0x15d5e0=_0x277321;return this[_0x15d5e0(0x20e)];},Game_Player[_0x277321(0x2fc)][_0x277321(0x31a)]=function(_0x4b8f25){const _0x2979cd=_0x277321;this[_0x2979cd(0x2f5)]=_0x4b8f25;},Game_Player[_0x277321(0x2fc)][_0x277321(0x22a)]=function(){return this['_pullMoved'];},Game_Player[_0x277321(0x2fc)]['setPullSpeed']=function(_0x3b687d){const _0x3edb35=_0x277321;this[_0x3edb35(0x285)]=_0x3b687d;},Game_Player[_0x277321(0x2fc)][_0x277321(0x315)]=function(){const _0x28ed5b=_0x277321;return this[_0x28ed5b(0x236)];},Game_Player[_0x277321(0x2fc)][_0x277321(0x2ff)]=function(){const _0x1fa6ab=_0x277321;return this[_0x1fa6ab(0x285)];},Game_Player[_0x277321(0x2fc)][_0x277321(0x2cc)]=function(){const _0x3098ca=_0x277321;this[_0x3098ca(0x1f2)]=0x0,this[_0x3098ca(0x20e)]=![],this[_0x3098ca(0x316)]=null,this[_0x3098ca(0x324)](![]),this[_0x3098ca(0x2d3)](!![]),this[_0x3098ca(0x31a)](![]),this[_0x3098ca(0x2c1)](),this[_0x3098ca(0x279)]();},Game_Player[_0x277321(0x2fc)][_0x277321(0x2c2)]=function(){const _0x34db9f=_0x277321;return Input[_0x34db9f(0x300)](TSR[_0x34db9f(0x2ca)][_0x34db9f(0x23b)])||Input[_0x34db9f(0x277)](TSR['moveEvent'][_0x34db9f(0x23b)])||Input[_0x34db9f(0x20c)](TSR[_0x34db9f(0x2ca)][_0x34db9f(0x23b)]);},Game_Player[_0x277321(0x2fc)]['updatePickup']=function(_0x324885,_0x3af69e,_0x2fa9b3,_0x1f9b76,_0x7a8f2f){const _0x280725=_0x277321;if(!$gameMap[_0x280725(0x331)]()&&!this[_0x280725(0x26e)]()){if(this[_0x280725(0x27b)](_0x324885,_0x3af69e,_0x2fa9b3,_0x1f9b76)&&!this['isMoving']()&&this[_0x280725(0x2c2)]()){if(!this[_0x280725(0x24f)]())this[_0x280725(0x294)](),this[_0x280725(0x23e)]=this['pickableEvent'](_0x324885,_0x3af69e,_0x2fa9b3,_0x1f9b76),this[_0x280725(0x23e)][_0x280725(0x2f3)]=this[_0x280725(0x23e)]['x'],this[_0x280725(0x23e)][_0x280725(0x2d2)]=this['_pickupEvent']['y'],this[_0x280725(0x23e)][_0x280725(0x2f9)](_0x7a8f2f,this['_pickupEvent'][_0x280725(0x28a)]()),this[_0x280725(0x23e)][_0x280725(0x229)]=0x0,this[_0x280725(0x23e)][_0x280725(0x206)]=![],this['_hasPickup']=!![],this[_0x280725(0x23e)][_0x280725(0x240)](!![]),this['moveStraight'](_0x7a8f2f),$gameSystem[_0x280725(0x2fa)](),SoundManager[_0x280725(0x305)](),TSR[_0x280725(0x2ca)][_0x280725(0x28e)]&&(this[_0x280725(0x2b7)](),this[_0x280725(0x22d)]=TSR['moveEvent'][_0x280725(0x28e)][0x0],this['_characterIndex']=TSR[_0x280725(0x2ca)]['_pickupSheet'][0x1]);else this[_0x280725(0x24f)]()?this[_0x280725(0x330)]():this[_0x280725(0x232)]();}else this[_0x280725(0x2c2)]()&&this[_0x280725(0x24f)]()?this[_0x280725(0x330)]():this['throwPickup']();}},Game_Player['prototype']['executePickup']=function(){const _0x341d0f=_0x277321,_0x4be1fd=this[_0x341d0f(0x23e)];_0x4be1fd&&(_0x4be1fd[_0x341d0f(0x32c)](!![]),_0x4be1fd[_0x341d0f(0x240)](!![]));},Game_Player['prototype'][_0x277321(0x21f)]=function(){const _0x36e0b5=_0x277321;if(this[_0x36e0b5(0x24f)]()){const _0x4228ab=this[_0x36e0b5(0x23e)],_0x3fdc5e=this[_0x36e0b5(0x28a)](),_0x580b93=this[_0x36e0b5(0x2aa)],_0x30a822=this[_0x36e0b5(0x2ab)],_0x251706=this[_0x36e0b5(0x313)](),_0x29ff02=_0x251706/$gameMap[_0x36e0b5(0x2a5)](),_0x4ab97e=_0x3fdc5e===0x4?_0x580b93-_0x29ff02:_0x3fdc5e===0x6?_0x580b93+_0x29ff02:_0x580b93,_0x1a6b3e=_0x3fdc5e===0x2?_0x30a822+_0x29ff02:_0x3fdc5e===0x8?_0x30a822-_0x29ff02:_0x30a822,_0x47be1e=_0x3fdc5e===0x4||_0x3fdc5e===0x6?-0.25:-0.15;if(_0x4228ab[_0x36e0b5(0x268)]){const _0x1e6954=this[_0x36e0b5(0x270)](_0x3fdc5e,_0x4228ab[_0x36e0b5(0x209)]());_0x4228ab[_0x36e0b5(0x2e4)](_0x1e6954);if(!_0x4228ab[_0x36e0b5(0x2b9)]())_0x4228ab['straighten']();}_0x4228ab[_0x36e0b5(0x249)](_0x4ab97e,_0x1a6b3e+_0x47be1e),!_0x4228ab[_0x36e0b5(0x22d)]&&!_0x4228ab[_0x36e0b5(0x32e)]&&(this['_hasPickup']=![],this[_0x36e0b5(0x23e)]=null);}else this['hasThrew']()&&this[_0x36e0b5(0x251)]();},Game_Player['prototype'][_0x277321(0x270)]=function(_0xafef47,_0x59ab36){if(_0x59ab36[0x0]===_0x59ab36[0x1])return _0xafef47;else{if(_0x59ab36[0x0]===0xa-_0x59ab36[0x1])return 0xa-_0xafef47;else{if(_0xafef47===_0x59ab36[0x0])return _0x59ab36[0x1];else return _0xafef47===0xa-_0x59ab36[0x0]?0xa-_0x59ab36[0x1]:_0xafef47===0xa-_0x59ab36[0x1]?_0x59ab36[0x0]:0xa-_0x59ab36[0x0];}}},Game_Player['prototype'][_0x277321(0x313)]=function(){const _0xf328c9=_0x277321;return this[_0xf328c9(0x23e)][_0xf328c9(0x32a)]||TSR[_0xf328c9(0x2ca)][_0xf328c9(0x2eb)];},Game_Player[_0x277321(0x2fc)]['throwPickup']=function(){const _0xbed369=_0x277321;if(this[_0xbed369(0x23e)]){const _0x4945da=this[_0xbed369(0x28a)](),_0x1d0c9e=this['x'],_0x255ff1=this['y'];let _0xde2039=this[_0xbed369(0x339)](_0x1d0c9e,_0x255ff1,_0x4945da),_0x21f6b2=_0x4945da===0x4?_0x1d0c9e-_0xde2039:_0x4945da===0x6?_0x1d0c9e+_0xde2039:_0x1d0c9e,_0x4d2afa=_0x4945da===0x2?_0x255ff1+_0xde2039:_0x4945da===0x8?_0x255ff1-_0xde2039:_0x255ff1,_0x48c59a=$gameMap[_0xbed369(0x30c)](_0x21f6b2,0xa-_0x4945da),_0x3aa314=$gameMap[_0xbed369(0x2cd)](_0x4d2afa,0xa-_0x4945da);while(!this[_0xbed369(0x1fe)](_0x48c59a,_0x3aa314,_0x4945da)){_0xde2039--,_0x21f6b2=_0x4945da===0x4?_0x1d0c9e-_0xde2039:_0x4945da===0x6?_0x1d0c9e+_0xde2039:_0x1d0c9e,_0x4d2afa=_0x4945da===0x2?_0x255ff1+_0xde2039:_0x4945da===0x8?_0x255ff1-_0xde2039:_0x255ff1,_0x48c59a=$gameMap[_0xbed369(0x30c)](_0x21f6b2,0xa-_0x4945da),_0x3aa314=$gameMap[_0xbed369(0x2cd)](_0x4d2afa,0xa-_0x4945da);if(_0xde2039===0x0)break;}this[_0xbed369(0x23e)][_0xbed369(0x2b8)]=_0xde2039,this[_0xbed369(0x23e)][_0xbed369(0x2bf)](_0x21f6b2,_0x4d2afa,_0x1d0c9e,_0x255ff1,_0x4945da),this[_0xbed369(0x23e)][_0xbed369(0x21b)](0x2),this[_0xbed369(0x258)]=![],this[_0xbed369(0x23e)]['setPickup'](![]),this[_0xbed369(0x246)]=!![],this[_0xbed369(0x23e)][_0xbed369(0x221)](!![]);}},Game_Player[_0x277321(0x2fc)][_0x277321(0x339)]=function(_0x3a45a6,_0x4f7a93,_0x29e967){const _0x151317=_0x277321;let _0x5b8a43=0x0;const _0x3c318b=this[_0x151317(0x20b)]()&&this['isMoving']()?0x3:this[_0x151317(0x2b4)]()?0x2:0x1;for(;;){const _0x2be5e4=_0x29e967===0x4?_0x3a45a6-_0x5b8a43:_0x29e967===0x6?_0x3a45a6+_0x5b8a43:_0x3a45a6,_0x280ef1=_0x29e967===0x2?_0x4f7a93+_0x5b8a43:_0x29e967===0x8?_0x4f7a93-_0x5b8a43:_0x4f7a93,_0x4d8278=$gameMap[_0x151317(0x274)](_0x2be5e4,_0x280ef1);if(DataManager['isPreventThrowRegion'](_0x4d8278))return _0x5b8a43;else{if(_0x5b8a43<_0x3c318b)_0x5b8a43++;else return _0x5b8a43;}}},Game_Player['prototype'][_0x277321(0x251)]=function(){const _0x12931a=_0x277321,_0x19736c=this[_0x12931a(0x23e)],_0x3b4e39=_0x19736c[_0x12931a(0x2c3)]();if(_0x19736c[_0x12931a(0x295)]()||_0x19736c[_0x12931a(0x23f)])this[_0x12931a(0x294)](_0x3b4e39);else{if((_0x19736c[_0x12931a(0x2aa)]!==_0x3b4e39[0x0]||_0x19736c[_0x12931a(0x2ab)]!==_0x3b4e39[0x1])&&!this[_0x12931a(0x2c5)]){const _0x5adabd=-(_0x19736c['x']-_0x3b4e39[0x0]),_0x22cda4=-(_0x19736c['y']-_0x3b4e39[0x1]);_0x19736c['thrownAt'](_0x5adabd,_0x22cda4),this[_0x12931a(0x2c5)]=!![],_0x19736c[_0x12931a(0x2e7)](!![]),SoundManager[_0x12931a(0x2a4)](),TSR[_0x12931a(0x2ca)]['_throwSheet']&&(this['checkCacheImage'](),this[_0x12931a(0x22d)]=TSR[_0x12931a(0x2ca)][_0x12931a(0x261)][0x0],this[_0x12931a(0x271)]=TSR[_0x12931a(0x2ca)][_0x12931a(0x261)][0x1],this[_0x12931a(0x2ec)](0x0),this[_0x12931a(0x27a)]=0x0,this[_0x12931a(0x224)]=!![]);}else{if(this[_0x12931a(0x2c5)]){this[_0x12931a(0x27a)]++;if(this[_0x12931a(0x27a)]===0xc||this['_throwCount']===0x18)this[_0x12931a(0x262)]();if(_0x19736c['_realX']===_0x3b4e39[0x0]&&_0x19736c['_realY']===_0x3b4e39[0x1])this['_threwMidAir']=![];}else SoundManager[_0x12931a(0x2d8)](),this[_0x12931a(0x294)](_0x3b4e39);}}},Game_Player[_0x277321(0x2fc)][_0x277321(0x26e)]=function(){const _0x27f2c7=_0x277321;return this[_0x27f2c7(0x246)];},Game_Player[_0x277321(0x2fc)][_0x277321(0x294)]=function(_0x1595f2){const _0x47878d=_0x277321;this[_0x47878d(0x279)]();if(this['_pickupEvent']){this['_pickupEvent'][_0x47878d(0x2fb)](_0x1595f2[0x0],_0x1595f2[0x1]),this['_hasThrew']=![],this[_0x47878d(0x2c5)]=![],this[_0x47878d(0x23e)][_0x47878d(0x240)](![]),this[_0x47878d(0x23e)][_0x47878d(0x218)]=this[_0x47878d(0x23e)][_0x47878d(0x216)],this['_pickupEvent']['setPriorityType'](0x1);if(this[_0x47878d(0x23e)]['isBreakable']()){const _0x226b63=$gameMap[_0x47878d(0x311)](),_0x342f13=this[_0x47878d(0x23e)][_0x47878d(0x280)](),_0x2ba42d=this[_0x47878d(0x23e)]['isBreakable']();$gameSelfSwitches[_0x47878d(0x326)]([_0x226b63,_0x342f13,_0x2ba42d],!![]);}}$gameSystem[_0x47878d(0x2d0)](),this[_0x47878d(0x23e)]=null,this['_throwPattern']=![];},Game_Player[_0x277321(0x2fc)][_0x277321(0x29e)]=function(_0x2a9681){const _0x6bcc22=_0x277321;this[_0x6bcc22(0x279)]();if(this[_0x6bcc22(0x23e)]){if(_0x2a9681){const _0x488f97=this[_0x6bcc22(0x23e)];_0x488f97[_0x6bcc22(0x2bf)](_0x488f97['x'],_0x488f97['y'],this['x'],this['y'],this[_0x6bcc22(0x264)]);const _0x3212b1=_0x488f97[_0x6bcc22(0x1f3)][0x0],_0x49aaf2=_0x488f97[_0x6bcc22(0x1f3)][0x1];this['_pickupEvent']['locate'](_0x3212b1,_0x49aaf2);}else this[_0x6bcc22(0x23e)][_0x6bcc22(0x2fb)](this[_0x6bcc22(0x23e)][_0x6bcc22(0x2f3)],this[_0x6bcc22(0x23e)][_0x6bcc22(0x2d2)]);this[_0x6bcc22(0x23e)][_0x6bcc22(0x240)](![]),this[_0x6bcc22(0x23e)][_0x6bcc22(0x218)]=this[_0x6bcc22(0x23e)][_0x6bcc22(0x216)],this['_pickupEvent']['setPriorityType'](0x1);}this['_hasThrew']=![],this['_threwMidAir']=![],this['_hasPickup']=![],this['_pickupEvent']=null,$gameSystem[_0x6bcc22(0x2d0)]();},Game_Player['prototype'][_0x277321(0x2b7)]=function(){const _0xf9969a=_0x277321;!this[_0xf9969a(0x299)]&&(this['_cacheCharName']=this[_0xf9969a(0x235)](),this[_0xf9969a(0x288)]=this[_0xf9969a(0x248)]());},Game_Player[_0x277321(0x2fc)][_0x277321(0x279)]=function(){const _0x337513=_0x277321;this[_0x337513(0x299)]&&(this[_0x337513(0x22d)]=this[_0x337513(0x299)],this[_0x337513(0x271)]=this[_0x337513(0x288)],this[_0x337513(0x299)]=![],this[_0x337513(0x288)]=![]);},Game_Player['prototype'][_0x277321(0x253)]=function(_0x2866f2,_0x22d4bb){const _0xd29e2a=_0x277321,_0x53d4a3=$gameMap[_0xd29e2a(0x2cf)](_0x2866f2,_0x22d4bb);if(this[_0xd29e2a(0x2d6)]())return![];return _0x53d4a3['some'](_0x5a6d41=>_0x5a6d41[_0xd29e2a(0x29d)]());},Game_Player[_0x277321(0x2fc)][_0x277321(0x27b)]=function(_0x623a3,_0x58f3ae,_0x4b9c82,_0x5a8639){const _0x4101d7=_0x277321,_0x5cf5a1=$gameMap[_0x4101d7(0x2cf)](_0x623a3,_0x58f3ae),_0x15f6a6=$gameMap['eventsXyNt'](_0x4b9c82,_0x5a8639);return _0x5cf5a1[_0x4101d7(0x2e5)](_0x53738a=>_0x53738a['isPickable']())||_0x15f6a6[_0x4101d7(0x2e5)](_0x44fc6c=>_0x44fc6c[_0x4101d7(0x21a)]());},Game_Player[_0x277321(0x2fc)]['movableEvent']=function(_0x324f31,_0x345152){const _0x46b46a=_0x277321,_0x2e71de=$gameMap[_0x46b46a(0x2cf)](_0x324f31,_0x345152);for(const _0xe56d8a of _0x2e71de){if(_0xe56d8a[_0x46b46a(0x29d)]())return _0xe56d8a;}},Game_Player[_0x277321(0x2fc)]['pickableEvent']=function(_0x4e03f6,_0x4da6aa,_0x569829,_0x4f2c35){const _0x47bec7=_0x277321,_0x532e47=$gameMap[_0x47bec7(0x2cf)](_0x4e03f6,_0x4da6aa),_0x5276e8=$gameMap['eventsXyNt'](_0x569829,_0x4f2c35);for(const _0x558558 of _0x532e47){if(_0x558558[_0x47bec7(0x21a)]())return _0x558558;}for(const _0x5b818d of _0x5276e8){if(_0x5b818d[_0x47bec7(0x21a)]())return _0x5b818d;}},Game_Player['prototype']['canMoveEvent']=function(){return!this['_pickupEvent'];},Game_Player[_0x277321(0x2fc)][_0x277321(0x1f0)]=function(){const _0x79c625=_0x277321;!this['_directionFix']&&(this[_0x79c625(0x217)]=!![],this[_0x79c625(0x2f0)](!![])),Imported[_0x79c625(0x24c)]&&TSR[_0x79c625(0x319)]['_jumpEnable']&&(this['_cacheEnableJump']=!![],TSR[_0x79c625(0x319)][_0x79c625(0x278)]=![]);},Game_Player[_0x277321(0x2fc)][_0x277321(0x291)]=function(){const _0x44cc62=_0x277321;this['_cacheDirFix']&&(this[_0x44cc62(0x217)]=![],this['setDirectionFix'](![])),this[_0x44cc62(0x2da)]&&(this['_cacheEnableJump']=![],TSR[_0x44cc62(0x319)][_0x44cc62(0x278)]=!![]);},Game_Player['prototype'][_0x277321(0x26f)]=function(){const _0x1d6b5a=_0x277321;SoundManager['playEffort'](),$gameTemp[_0x1d6b5a(0x28f)]?$gameTemp[_0x1d6b5a(0x26c)](this,TSR[_0x1d6b5a(0x2ca)][_0x1d6b5a(0x267)]):this[_0x1d6b5a(0x26c)](TSR[_0x1d6b5a(0x2ca)]['_effortBallonId']);},Game_Player[_0x277321(0x2fc)][_0x277321(0x2c1)]=function(){const _0x5805dc=_0x277321,_0x39a2b8=this[_0x5805dc(0x283)]()?this[_0x5805dc(0x308)]()['moveSpeed']():this[_0x5805dc(0x250)]();this['setMoveSpeed'](_0x39a2b8);},Game_Player['prototype']['checkMystery']=function(_0x146987){const _0x58fbbc=_0x277321,_0x6cb6f8=$dataMap['events'][_0x146987['_eventId']][_0x58fbbc(0x287)],_0xf552bb=$gameSystem['_mysteryEvents'][_0x6cb6f8];_0xf552bb&&_0xf552bb[0x0]&&(SoundManager[_0x58fbbc(0x210)](),$gameSwitches[_0x58fbbc(0x326)](_0xf552bb[0x1],!![]),_0xf552bb[0x0]=![]);},Game_Player[_0x277321(0x2fc)][_0x277321(0x1fe)]=function(_0xa85ec3,_0x21ab9d,_0xd4749d){const _0x161c15=_0x277321,_0xecffb9=$gameMap[_0x161c15(0x30c)](_0xa85ec3,_0xd4749d),_0x1e3d56=$gameMap['roundYWithDirection'](_0x21ab9d,_0xd4749d),_0x29bd96=$gameMap['regionId'](_0xecffb9,_0x1e3d56),_0x62596c=DataManager[_0x161c15(0x205)](_0x29bd96);if(DataManager[_0x161c15(0x28b)](_0x29bd96))return![];return this[_0x161c15(0x333)](_0xa85ec3,_0x21ab9d,_0xd4749d)||_0x62596c;},Game_Player[_0x277321(0x2fc)][_0x277321(0x2ee)]=function(_0x505457,_0x55df6c,_0x4f47b7,_0x580e90){const _0x35b2ec=_0x277321,_0x297e19=$gameMap[_0x35b2ec(0x317)](_0x505457),_0x58c68a=_0x580e90||this[_0x35b2ec(0x28a)]();if(this['x']===_0x55df6c&&this['y']===_0x4f47b7&&_0x58c68a===this[_0x35b2ec(0x28a)]()&&this['isHolding'](_0x297e19[_0x35b2ec(0x284)]))return _0x297e19[_0x35b2ec(0x23f)]=!![],!![];return![];},Game_Player[_0x277321(0x2fc)][_0x277321(0x2ba)]=function(_0x3faf88,_0x47a541){const _0x374e88=_0x277321,_0x1deeef=$gameMap[_0x374e88(0x317)](_0x3faf88),_0x347500=$gameMap[_0x374e88(0x317)](_0x47a541),_0xe3bea9=_0x347500['x'],_0x2b145a=_0x347500['y'],_0x5e1a3d=_0x347500['direction'](),_0x591c79=_0x5e1a3d===0x4?_0xe3bea9-0x1:_0x5e1a3d===0x6?_0xe3bea9+0x1:_0xe3bea9,_0x4443a7=_0x5e1a3d===0x2?_0x2b145a+0x1:_0x5e1a3d===0x8?_0x2b145a-0x1:_0x2b145a,_0x3801fd=this[_0x374e88(0x28a)]();if(_0x1deeef[_0x374e88(0x275)](_0x591c79,_0x4443a7)&&_0x3801fd===0xa-_0x5e1a3d&&this[_0x374e88(0x297)](_0x1deeef[_0x374e88(0x284)]))return _0x1deeef['_isBrought']=!![],!![];return![];},Game_Player[_0x277321(0x2fc)][_0x277321(0x223)]=function(_0x521c06,_0x363987,_0x125b42){const _0x57d17d=_0x277321,_0x492d45=$gameMap[_0x57d17d(0x317)](_0x521c06);return _0x492d45[_0x57d17d(0x2aa)]===_0x363987&&_0x492d45[_0x57d17d(0x2ab)]===_0x125b42&&!this[_0x57d17d(0x297)](_0x521c06);},TSR['moveEvent'][_0x277321(0x2ea)]=Game_Follower['prototype'][_0x277321(0x2f8)],Game_Follower[_0x277321(0x2fc)]['chaseCharacter']=function(_0x59c930){const _0x1fa484=_0x277321;!$gamePlayer[_0x1fa484(0x22a)]()&&TSR[_0x1fa484(0x2ca)][_0x1fa484(0x2ea)][_0x1fa484(0x272)](this,_0x59c930);},TSR[_0x277321(0x2ca)][_0x277321(0x200)]=Game_Event['prototype'][_0x277321(0x1f1)],Game_Event['prototype'][_0x277321(0x1f1)]=function(){const _0x518746=_0x277321;TSR[_0x518746(0x2ca)][_0x518746(0x200)][_0x518746(0x272)](this),this[_0x518746(0x2f2)]();},Game_Event['prototype'][_0x277321(0x2f2)]=function(){const _0x1ba7f8=_0x277321;if(!this[_0x1ba7f8(0x2f4)]())return;const _0x5d06f3=/<(?:MOVABLE EVENT|MOVABLE)>/i,_0x2333e8=/<(?:MOVABLE MYSTERY|PUSH MYSTERY):[ ](\d+)>/i,_0x47dc8a=/<(?:PICKABLE EVENT|PICKUP EVENT)>/i,_0x4b204e=/<(?:MOVE EVENT OFFSET|MOVE OFFSET):[ ](\d+)>/i,_0x23bf24=/<(?:PICKABLE CHARACTER|PICKUP CHARACTER)>/i,_0x3da39c=/<(?:PICKABLE EVENT|PICKUP EVENT):[ ](.)>/i,_0xf63938=/<(?:MOVABLE EVENT|MOVABLE):[ ](\d+)>/i,_0x7a50b6=/<(?:MOVABLE CHARACTER|MOVABLE CHAR)>/i,_0x5aa23e=this[_0x1ba7f8(0x329)](),_0x3e1647=_0x5aa23e[_0x1ba7f8(0x269)];this['_isMovable']=![],this['_isPickable']=![],this[_0x1ba7f8(0x268)]=![],this[_0x1ba7f8(0x219)]=![],this['_movableSwitch']=![],this[_0x1ba7f8(0x325)]=![],this[_0x1ba7f8(0x32a)]=0x0;for(let _0x12de3b=0x0;_0x12de3b<_0x3e1647;++_0x12de3b){let _0x306fc5=_0x5aa23e[_0x12de3b];if([0x6c,0x198]['contains'](_0x306fc5[_0x1ba7f8(0x2c0)])){if(_0x306fc5['parameters'][0x0]['match'](_0x5d06f3))this['_isMovable']=!![];else{if(_0x306fc5[_0x1ba7f8(0x31f)][0x0][_0x1ba7f8(0x260)](_0x2333e8)){this[_0x1ba7f8(0x320)]=!![];const _0x2000b4=$dataMap['events'][this[_0x1ba7f8(0x284)]][_0x1ba7f8(0x287)],_0x1bf116=parseInt(RegExp['$1']);!$gameSystem[_0x1ba7f8(0x234)][_0x2000b4]&&($gameSystem[_0x1ba7f8(0x234)][_0x2000b4]=[!![],_0x1bf116]);}else{if(_0x306fc5['parameters'][0x0][_0x1ba7f8(0x260)](_0x47dc8a))this[_0x1ba7f8(0x26a)]=!![];else{if(_0x306fc5[_0x1ba7f8(0x31f)][0x0][_0x1ba7f8(0x260)](_0x4b204e))this[_0x1ba7f8(0x32a)]=parseInt(RegExp['$1']);else{if(_0x306fc5[_0x1ba7f8(0x31f)][0x0][_0x1ba7f8(0x260)](_0x23bf24))this[_0x1ba7f8(0x26a)]=!![],this[_0x1ba7f8(0x268)]=!![];else{if(_0x306fc5[_0x1ba7f8(0x31f)][0x0]['match'](_0x3da39c)){const _0x3c856e=_0x306fc5['parameters'][0x0],_0x181202=_0x3c856e['slice'](_0x3c856e[_0x1ba7f8(0x2bc)](':')+0x1,_0x3c856e['indexOf']('>'))['trim']();this[_0x1ba7f8(0x26a)]=!![],this[_0x1ba7f8(0x219)]=_0x181202[_0x1ba7f8(0x27f)]();}else{if(_0x306fc5[_0x1ba7f8(0x31f)][0x0][_0x1ba7f8(0x260)](_0xf63938))this['_isMovable']=!![],this[_0x1ba7f8(0x2ae)]=parseInt(RegExp['$1']);else _0x306fc5[_0x1ba7f8(0x31f)][0x0][_0x1ba7f8(0x260)](_0x7a50b6)&&(this[_0x1ba7f8(0x320)]=!![],this[_0x1ba7f8(0x325)]=!![]);}}}}}}}}},Game_Event[_0x277321(0x2fc)]['isMovable']=function(){return this['_isMovable'];},Game_Event[_0x277321(0x2fc)][_0x277321(0x21a)]=function(){const _0x5054ca=_0x277321;return this[_0x5054ca(0x26a)];},Game_Event[_0x277321(0x2fc)][_0x277321(0x2f9)]=function(_0x2f36c7,_0x3ba3d6){const _0x2802d8=_0x277321;this[_0x2802d8(0x26d)]=[_0x2f36c7,_0x3ba3d6];},Game_Event[_0x277321(0x2fc)][_0x277321(0x209)]=function(){const _0x3dc6e2=_0x277321;return this[_0x3dc6e2(0x26d)];},Game_Event[_0x277321(0x2fc)][_0x277321(0x2d1)]=function(_0x58cfbf,_0x4ad112,_0x3386b7,_0xd452a7){const _0x534ca1=_0x277321;if(DataManager[_0x534ca1(0x2dd)]($gameMap['regionId'](_0x58cfbf,_0x4ad112)))return![];if(!$gameMap[_0x534ca1(0x215)](_0x58cfbf,_0x4ad112,_0x3386b7))return![];if(this[_0x534ca1(0x21c)](_0x58cfbf,_0x4ad112)&&!_0xd452a7)return![];return!![];},Game_Event[_0x277321(0x2fc)][_0x277321(0x274)]=function(){const _0x42349f=_0x277321;if(this[_0x42349f(0x30a)]())return null;return $gameMap[_0x42349f(0x274)](this['_x'],this['_y']);},Game_Event['prototype'][_0x277321(0x265)]=function(_0x36546d){const _0x33b15a=_0x277321;this[_0x33b15a(0x240)](!![]),this[_0x33b15a(0x22b)](_0x36546d);if(this[_0x33b15a(0x325)])this[_0x33b15a(0x264)]=_0x36546d;this[_0x33b15a(0x240)](![]);},TSR['moveEvent'][_0x277321(0x29c)]=Game_Event[_0x277321(0x2fc)][_0x277321(0x1f7)],Game_Event[_0x277321(0x2fc)]['isCollidedWithEvents']=function(_0x5b325a,_0x482bfb){const _0x140be0=_0x277321,_0x235c74=$gameMap[_0x140be0(0x2cf)](_0x5b325a,_0x482bfb),_0x28e484=_0x235c74[_0x140be0(0x2e5)](_0x7aa1e9=>!_0x7aa1e9[_0x140be0(0x334)]());return(this[_0x140be0(0x29d)]()||this[_0x140be0(0x21a)]())&&_0x28e484?![]:TSR[_0x140be0(0x2ca)][_0x140be0(0x29c)][_0x140be0(0x272)](this,_0x5b325a,_0x482bfb);},TSR[_0x277321(0x2ca)][_0x277321(0x2e0)]=Spriteset_Map[_0x277321(0x2fc)]['createLowerLayer'],Spriteset_Map[_0x277321(0x2fc)][_0x277321(0x207)]=function(){const _0x5f1720=_0x277321;TSR['moveEvent'][_0x5f1720(0x2e0)]['call'](this),this[_0x5f1720(0x296)]();},Spriteset_Map[_0x277321(0x2fc)]['createThrowShadowContainer']=function(){const _0xc1d1e4=_0x277321;this[_0xc1d1e4(0x263)]=new Sprite(),this[_0xc1d1e4(0x263)][_0xc1d1e4(0x33a)](0x0,0x0,this[_0xc1d1e4(0x2f7)],this[_0xc1d1e4(0x25a)]),this['_throwShadowContainer']['z']=0x2,this[_0xc1d1e4(0x230)]['addChild'](this[_0xc1d1e4(0x263)]);},TSR[_0x277321(0x2ca)][_0x277321(0x286)]=Sprite_Character[_0x277321(0x2fc)][_0x277321(0x2bd)],Sprite_Character['prototype'][_0x277321(0x2bd)]=function(){const _0x395c11=_0x277321;TSR[_0x395c11(0x2ca)][_0x395c11(0x286)][_0x395c11(0x272)](this),this['_throwSpriteSet']=[],this[_0x395c11(0x25b)]=0x0;},TSR[_0x277321(0x2ca)][_0x277321(0x2c4)]=Sprite_Character[_0x277321(0x2fc)][_0x277321(0x2b1)],Sprite_Character[_0x277321(0x2fc)][_0x277321(0x2b1)]=function(){const _0x289bca=_0x277321;TSR[_0x289bca(0x2ca)][_0x289bca(0x2c4)][_0x289bca(0x272)](this),this['updateThrowShadowSprites']();},TSR[_0x277321(0x2ca)]['_Sprite_Character_updatePosition']=Sprite_Character['prototype'][_0x277321(0x2e2)],Sprite_Character[_0x277321(0x2fc)][_0x277321(0x2e2)]=function(){const _0x24d6b2=_0x277321;if(this[_0x24d6b2(0x203)][_0x24d6b2(0x23a)]()){const _0x63559a=this['_character'][_0x24d6b2(0x28a)](),_0x32f81c=_0x63559a===0x4||_0x63559a===0x6?'x':'y',_0x311df2=_0x32f81c==='x'?'y':'x',_0x2036a5=_0x311df2==='x'?this[_0x24d6b2(0x203)]['screenX']():this[_0x24d6b2(0x203)][_0x24d6b2(0x202)](),_0x8895f5=_0x63559a===0x2||_0x63559a===0x6;let _0x562fc7=![];if(this[_0x24d6b2(0x203)][_0x24d6b2(0x257)]())this[_0x32f81c]=this[_0x24d6b2(0x22e)](_0x8895f5,_0x32f81c,this[_0x24d6b2(0x203)][_0x24d6b2(0x257)]()),this[_0x311df2]=_0x2036a5,this['z']=this[_0x24d6b2(0x203)][_0x24d6b2(0x302)]();else{if(this[_0x24d6b2(0x203)]['pullDist']())this['_character']['pullMoved']()&&(this['_character'][_0x24d6b2(0x31b)](this['_character'][_0x24d6b2(0x2ff)]()),_0x562fc7=!![]),this[_0x32f81c]=this[_0x24d6b2(0x22e)](_0x8895f5,_0x32f81c,this[_0x24d6b2(0x203)][_0x24d6b2(0x2a7)](),![],_0x562fc7),this[_0x311df2]=_0x2036a5,this['z']=this['_character'][_0x24d6b2(0x302)]();else this[_0x24d6b2(0x203)][_0x24d6b2(0x32d)]()?(this[_0x32f81c]=this[_0x24d6b2(0x22e)](!_0x8895f5,_0x32f81c,this[_0x24d6b2(0x203)][_0x24d6b2(0x32d)](),!![]),this[_0x311df2]=_0x2036a5,this['z']=this['_character']['screenZ']()):TSR[_0x24d6b2(0x2ca)][_0x24d6b2(0x2a2)][_0x24d6b2(0x272)](this);}}else TSR[_0x24d6b2(0x2ca)]['_Sprite_Character_updatePosition'][_0x24d6b2(0x272)](this);},Sprite_Character[_0x277321(0x2fc)][_0x277321(0x22e)]=function(_0x28976c,_0x43813d,_0x32b5fa,_0x4f4454,_0x50dbb5){const _0x256550=_0x277321;this[_0x256550(0x25b)]++;const _0x59dba8=this['_character'],_0x35b071=_0x43813d==='x'?_0x59dba8[_0x256550(0x2e3)]():_0x59dba8[_0x256550(0x202)](),_0x2f9a44=_0x4f4454||_0x50dbb5?_0x35b071:_0x32b5fa,_0xf014be=_0x4f4454?0x0:_0x59dba8['moveOffset']();if(_0x28976c){if(this[_0x43813d]<_0x2f9a44)return _0x59dba8[_0x256550(0x29f)](!![]),this[_0x43813d]+0x1;else{_0x59dba8[_0x256550(0x29f)](![]);if(_0x4f4454)_0x59dba8[_0x256550(0x2d3)](![]);return _0x35b071+_0xf014be;}}else{if(this[_0x43813d]>_0x2f9a44)return _0x59dba8[_0x256550(0x29f)](!![]),this[_0x43813d]-0x1;else{_0x59dba8[_0x256550(0x29f)](![]);if(_0x4f4454)_0x59dba8[_0x256550(0x2d3)](![]);return _0x35b071-_0xf014be;}}},Sprite_Character['prototype']['setupThrowShadow']=function(){const _0x565a23=_0x277321;this[_0x565a23(0x203)]['requireThrowShadow']()&&(this[_0x565a23(0x203)][_0x565a23(0x2e7)](![]),this[_0x565a23(0x204)]());},Sprite_Character[_0x277321(0x2fc)]['startThrowShadow']=function(){const _0xf9a7c2=_0x277321,_0x55fcc9=this[_0xf9a7c2(0x2d5)]();this[_0xf9a7c2(0x2de)][_0xf9a7c2(0x289)](_0x55fcc9);},Sprite_Character['prototype'][_0x277321(0x2d5)]=function(){const _0x3fbe83=_0x277321;let _0x39cba9=new Sprite_ThrowShadow();return _0x39cba9['x']=this['x'],_0x39cba9['y']=this['y']-0x10,_0x39cba9[_0x3fbe83(0x338)]['x']=0.8,_0x39cba9[_0x3fbe83(0x338)]['y']=0.8,_0x39cba9['setup'](this,this[_0x3fbe83(0x203)]),SceneManager[_0x3fbe83(0x2d7)][_0x3fbe83(0x2fd)][_0x3fbe83(0x263)][_0x3fbe83(0x2f1)](_0x39cba9),_0x39cba9;},Sprite_Character[_0x277321(0x2fc)][_0x277321(0x2c7)]=function(){const _0x19443f=_0x277321;this[_0x19443f(0x239)](),this['_throwSpriteSet'][_0x19443f(0x269)]>0x0&&(!this[_0x19443f(0x2de)][0x0][_0x19443f(0x30b)]()&&(SceneManager[_0x19443f(0x2d7)][_0x19443f(0x2fd)][_0x19443f(0x263)][_0x19443f(0x2b0)](this[_0x19443f(0x2de)][0x0]),this[_0x19443f(0x2de)]['shift']()));};function Sprite_ThrowShadow(){const _0x4edcc8=_0x277321;this[_0x4edcc8(0x25c)][_0x4edcc8(0x28d)](this,arguments);}Sprite_ThrowShadow[_0x277321(0x2fc)]=Object[_0x277321(0x321)](Sprite['prototype']),Sprite_ThrowShadow[_0x277321(0x2fc)]['constructor']=Sprite_ThrowShadow,Sprite_ThrowShadow['prototype'][_0x277321(0x25c)]=function(){const _0x59e0a1=_0x277321;Sprite[_0x59e0a1(0x2fc)][_0x59e0a1(0x25c)]['call'](this),this['initMembers'](),this[_0x59e0a1(0x222)]();},Sprite_ThrowShadow['prototype'][_0x277321(0x2bd)]=function(){const _0x72b147=_0x277321;this[_0x72b147(0x1f6)]['x']=0.5,this[_0x72b147(0x1f6)]['y']=0.5,this[_0x72b147(0x29b)]=0x0;},Sprite_ThrowShadow[_0x277321(0x2fc)][_0x277321(0x222)]=function(){const _0x265823=_0x277321;this[_0x265823(0x2db)]=ImageManager['loadSystem'](_0x265823(0x31c)),this[_0x265823(0x33a)](0x0,0x0,this[_0x265823(0x2db)][_0x265823(0x2f7)],this[_0x265823(0x2db)][_0x265823(0x25a)]);},Sprite_ThrowShadow[_0x277321(0x2fc)][_0x277321(0x24e)]=function(_0x1159b5,_0x283558){const _0x56eeb6=_0x277321;this[_0x56eeb6(0x2e9)]=_0x1159b5,this['_moveJump']=!![],this[_0x56eeb6(0x264)]=_0x283558['_direction'],this[_0x56eeb6(0x29b)]=_0x283558[_0x56eeb6(0x2b8)]*0x9,this[_0x56eeb6(0x20d)]=0x0;},Sprite_ThrowShadow[_0x277321(0x2fc)][_0x277321(0x2b1)]=function(){const _0xd1541c=_0x277321;this[_0xd1541c(0x29b)]--,this[_0xd1541c(0x312)]();},Sprite_ThrowShadow['prototype'][_0x277321(0x312)]=function(){const _0x562695=_0x277321,_0x5ca5e2=$gamePlayer[_0x562695(0x264)];if(this[_0x562695(0x1f4)]){if(_0x5ca5e2===0x4)this['x']=this['_charSprite']['x']-0x4;else _0x5ca5e2===0x6?this['x']=this[_0x562695(0x2e9)]['x']+0x2:(this[_0x562695(0x20d)]+=-0x1,this['y']=this['_charSprite']['y']+this[_0x562695(0x20d)]);}},Sprite_ThrowShadow[_0x277321(0x2fc)][_0x277321(0x30b)]=function(){const _0x2161e6=_0x277321;return this[_0x2161e6(0x29b)]>0x0;};
})();

//== END ========================================================================
//===============================================================================
