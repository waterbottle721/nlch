//=============================================================================
// TAA_CharacterPoses.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.cp = {};
TAA.cp.Version = "1.3.5";
TAA.cp.PluginName = "TAA_CharacterPoses";
TAA.cp.alias = {};

/*:
 * @target MV MZ
 * 
 * @plugindesc [1.3.5] Custom Character Poses
 * @author T. A. A. (taaspider)
 * @url http://taaspider.itch.io/ 
 * 
 * @help
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Any plugins developed by taaspider are free for use for both commercial and 
 * noncommercial RPG Maker games, unless specified otherwise. Just remember to
 * credit "Taaspider".
 * 
 * Redistribution of parts or the whole of taaspider plugins is forbidden, unless
 * it comes from the official website: http://taaspider.itch.io. You are allowed 
 * to edit and change the plugin code for your own use, but you're definitely not 
 * allowed to sell or reuse any part of the code as your own. Although not 
 * required to use my plugins, a free copy of your game would be nice!
 * 
 * If you enjoy my work, consider offering a donation when downloading my plugins, 
 * or offering a monthly pledge to my Patreon account. It would be of great help!
 * Also, follow me on facebook to get firsthand news on my activities!
 *  Facebook: https://www.facebook.com/taaspider 
 *  Patreon: https://www.patreon.com/taaspider
 * 
 * =============================================================================
 * Introduction
 * =============================================================================
 * 
 * WARNING: This plugin requires RPG Maker MV 1.5.0 or above! Please make sure 
 * your RPG Maker MV software is up to date before using this plugin.
 * You don't need any specific version if you're using MZ.
 * 
 * -----------------------------------------------------------------------------
 * 
 * When we want to create memorable cutscenes, we need stuff to happen onscreen,
 * not only a long sequence of messages with characters standing in place. Sometimes 
 * we need them to move around and behave like things are really happening there, and 
 * sometimes we need them to express themselves even more. Sometimes a simple movement 
 * of the head to agree or not what's being said, and sometimes even more complex 
 * behaviors like running, jumping, getting scared or simply acting different if left 
 * idle for too long.
 * 
 * You can get all of that by only using events, but if you're like me, going through 
 * a movement route window to configure the same patterns of animation over and over
 * again can get really tiring.
 * 
 * This plugin aims to make character animation easier, and faster to use. It will 
 * allow you to configure whole sets of animations for your actors and call it with 
 * a simple Plugin Command. It will also let you make characters blink, change sprites
 * when running and show a specific behavior when left idle for too long.
 * 
 * Plus, anything you can do for an actor can be done for NPCs using templates, or
 * setting up a new pattern with comments. Not to mention support for spritesheets
 * with more than three frames per direction!
 * 
 * =============================================================================
 * Instructions - Global Config
 * =============================================================================
 * 
 * Global parameters are quite simple, and most of them are related to blinking:
 * 
 * Blink Interval
 *  - Defines the minimum amount of frames between each blink;
 * 
 * Blink Randomness
 *  - A random number between 0 and this value is added to the blink interval, adding
 *    a layer of randomness to character blinking. This way characters won't feel too
 *    robotic;
 * 
 * Blink Duration
 *  - Determines for how many frames blinking lasts;
 * 
 * Idle Wait Time
 *  - Determines for how many frames a character needs to stay still before triggering
 *    the idle pose automatically;
 * 
 * Balloon Poses
 *  - Defines if automatic balloon poses are enabled;
 * 
 * Check Files First
 *  - Defines if character sprite files existence are checked before loading. This can
 *    prevent the game from crashing when loading a new pose, but can lead to unexpected
 *    behaviors if the requested file is not available;
 * 
 * Enable 8 Directions
 *  - Defines if 8 direction movement and sprites are allowed;
 * 
 * Diagonal Event Trigger
 *  - Defines if an event set to trigger on player touch can be triggered by diagonal
 *    movements (which is not possible by default);
 * 
 * 8 Dir Layout
 *  - Defines the layout for the diagonal movement sprites. Diagonal sprites must always
 *    be present in the same sprite sheet as the default movement sets, and always below
 *    them. This parameter is used to set which row of sprites is used for each diagonal
 *    movement;
 * 
 * =============================================================================
 * Character Poses
 * =============================================================================
 * 
 * A pose is a pattern for character animation, where we have a character spritesheet
 * file, an index to identify which set of frames to use (as by default each file
 * can contain one or eight characters at a time), a pattern defining how will sprites
 * alternate and how fast it should happen. Poses can be called using plugin commands,
 * defining how many times its pattern will be displayed or looping until another plugin
 * command is issued to restore the original pose.
 * 
 * There's also three special poses:
 *  - default: it's the one the character uses to walk around. If none is specified,
 *    the plugin will use the engine's default pattern;
 *  - dash: if configured, it will be automatically started when the character starts
 *    to run, and stopped when it turns to walking, or stop moving;
 *  - idle: if configured, is automatically triggered when the character stays still
 *    for more than "Idle Wait Time" frames;
 * 
 * To specify one of this reserved poses, you can just use the names above as Pose Keys,
 * or use plugin commands to define which key should be used in each case. Customizing
 * the reserved pose keys can also be useful if your characters needs to change sprites
 * in the middle of the game, like donning evil guards armor to infiltrate a castle,
 * for example.
 * 
 * Pose setup for actors are done exclusively through plugin parameters. For events, you
 * can setup pose templates, to create a library and pick the patterns you want for each
 * event. You can also define default poses patterns that are automatically applied to
 * all events, or create a custom pose for a single event using event comments.
 * 
 * TIP: For better performance of your game, try to group character poses in as few files
 * as possible. The plugin will always preload character files to not risk "flickering"
 * when changing poses. If poses are scattered through many files more memory ends up
 * being used. So, the fewer files you use, the less consumed memory!
 * 
 * WARNING: When loading pose parameters for actors, or trying to load poses for events,
 * the plugin will always check if the filename specified exists. If it doesn't, the
 * pose is discarded. This helps to prevent game crashes.
 * 
 * =============================================================================
 * More Frames
 * =============================================================================
 * 
 * The plugin supports spritesheets with more than the default three frames per character
 * direction. To make use of it, the character image filename must contain a specific 
 * pattern identifying how many frames are in the file:
 *      character_sprites[f<n>].png
 * Where <n> is the number of frames. For example, for a character with eight frames
 * animations, a filename would be character_sprites[f8].png.
 * 
 * =============================================================================
 * 8 Directions Sprites
 * =============================================================================
 * 
 * The plugin supports 8 directions sprites and movement. The feature must be manually
 * enabled in the plugin parameters, and the character image filename must contain a
 * specific pattern to identify the file as having diagonal sprites:
 *      character_sprites[d8].png
 * This can be used with more frames, just add both tags to the file name:
 *      character_sprites[f8][d8].png
 * 
 * WARNING: Swapping from one 8 directional pose to a 4 direction, or vice versa, while
 * the character is moving (or an animated pose is playing) can lead to unexpected sprite
 * behavior. If possible, avoid this scenario.
 * 
 * =============================================================================
 * Pose Setup - Actor Poses
 * =============================================================================
 * 
 * Actor poses are setup individually, creating individual libraries that can be
 * easily accessed later through plugin commands. Each actor must have a single entry.
 * If an actor ID is configured more than once, only the first entry is considered.
 * 
 * Actor ID
 *  - ID for the actor the poses apply to;
 * 
 * Default Blink Sprites
 *  - If you don't want to setup a default pose but want to setup blinking, use this
 *    parameter to select the spritesheet to use when the character has its eyes closed.
 *    This parameter gets overwritten if a 'default' pose is specified. If you don't want
 *    to use the blinking feature, just leave this parameter blank.
 * 
 * Default Blink Index
 *  - If you don't want to setup a default pose but want to setup blinking, use this
 *    parameter to define the index on the spritesheet for your character. This 
 *    parameter gets overwritten if a 'default' pose is specified.
 * 
 * For each actor pose, the following parameters are presented:
 * 
 * Pose Key
 *  - This is the name of the pose, and what you'll use to trigger it later. This must
 *    be unique for each character, and is case sensitive. Do not start pose names with
 *    special characters like @ or #;
 * 
 * Spritesheet
 *  - The character spritesheet to use for this pose. This parameter must be set with
 *    an image from the img/characters directory containing the desired character sprites,
 *    otherwise the pose is discarded;
 * 
 * Spritesheet Index
 *  - Identifies which character sheet to use from the spritesheet. It starts on 0 for the
 *    upper left character, growing up to 7 for the lower right character. Here's a visual
 *    example, where each letter represents sprites from a character:
 *          a a a b b b c c c d d d
 *          a a a b b b c c c d d d
 *          a a a b b b c c c d d d
 *          a a a b b b c c c d d d
 *          e e e f f f g g g h h h
 *          e e e f f f g g g h h h
 *          e e e f f f g g g h h h
 *          e e e f f f g g g h h h
 *    In this example, character a has index 0, b index 1, c is 2, d is 3, e is 4 all the 
 *    way to h, which is 7.
 *    If your spritesheet has a single character (files with names starting with $) then
 *    the index will always be 0;
 * 
 * Blink Spritesheet
 *  - The character spritesheet to use when the character blinks while in this pose.
 *    If you don't want the blinking feature for this pose, simply leave this parameter
 *    blank;
 * 
 * Blink Index
 *  - Identify which character sheet to use from the blinking spritesheet;
 * 
 * Pattern
 *  - Set a custom pattern for how to alternate sprites from the spritesheet and 
 *    display a pose. If left blank, the engine default pattern is used.
 *    A pattern can be a sequence of numbers, referencing the sprite index in a
 *    spritesheet (starting on 0) and maintaining its direction, or include text 
 *    codes to use change to any sprite direction. See the diagram below as an example:
 * 
 *               0   1   2
 *      down    \o   o   o/                 up = 8
 *      left     d   o   d          left = 4    right = 6
 *      right    b   o   b                 down = 2
 *      up       o/  o  \o
 * 
 *    So, in a character spritesheet with 3 frames for each direction, you have indexes
 *    from 0 to 2. But if you want to set a pose to, for example, play an animation while
 *    the character spins in place, you can define a pattern for it like: d4, d8, d6, d2
 *    This pattern will simply make the character change directions, assuming 2 as down,
 *    4 as left, 8 as up and 6 as right. You can also change direction and the index at
 *    the same frame time by using the letter "i": d4, d8i2, d6i0, d2i1. Just always
 *    remember to place the code for direction before the code for index (never use
 *    i2d6, for example)!
 *    WARNING: When setting patterns that use sprites from multiple directions try to inform
 *    direction for all pattern instances to prevent glitches when changing poses. For example,
 *    for a pattern like 'd2i0, d2i1, d2i2', refrain from setting 'd2i0, 1, 2'. Although it
 *    works, this can cause strange behaviors when changing from one pose to another.
 * 
 * Speed
 *  - This determines how fast will the pose be, by setting the number of frames to wait
 *    before iterating the pattern array and changing sprites. So, the lower the number,
 *    the faster it will be (less frames before jumping to the next sprite).
 * 
 * =============================================================================
 * Pose Setup - Poses Templates
 * =============================================================================
 * 
 * Pose templates are used for events. Despite having a similar structure, the following
 * parameters have a different behavior:
 * 
 * Default Blink Sprites
 *  - Here you won't select a file, but instead define a pattern so the plugin can look
 *    for the right file at runtime. You can set it as the same file the event is
 *    configured with the tag %{char}, or complement it with a specific pattern, like
 *    %{char}_blink. In this example, if the event is using People1 for the character,
 *    the plugin will try to load People1_blink for blinking. If the file don't exist,
 *    the animation will be aborted to prevent a game crash;
 * 
 * Default Blink Index
 *  - This parameter is treated as an eval, and you can reference the character index
 *    used by the event with the tag %{index}. So, if you have spritesheets built in a
 *    way that the first row of characters have open eyes, and the second have closed
 *    eyes (for blinking), you can setup this index as %{index}+4, for example. In this
 *    case, an event that uses sprites from index 0 (which is the upper left character)
 *    will use its blinking sprites from with index 4, which is the lower left character;
 * 
 * Spritesheet
 *  - This works similarly to Default Blink Sprites;
 * 
 * Spritesheet Index
 *  - This works similarly to Default Blink Index;
 * 
 * Blink Spritesheet
 *  - This works the same as previous sprite parameters, but with an additional tag:
 *    use %{pose} to reference the Spritesheet parameter value;
 * 
 * Blink Index
 *  - This works the same as previous index parameters, but with an additional tag: use
 *    %{pIndex} for the Spritesheet Index value;
 * 
 * Speed
 *  - Works the same as for actors, but this parameter overwrites the engine move speed
 *    config in the move route and event page configs. For reference, here are the 
 *    equivalents (considering normal frequency):
 *      + 8x slower = 24
 *      + 4x slower = 21
 *      + 2x slower = 18
 *      + Normal = 15
 *      + 2x faster = 12
 *      + 4x faster = 9
 * 
 * WARNING: As template setup do not reference a file directly, but instead defines a 
 * filename pattern to look for them at runtime, we cannot mark the files as used for 
 * when exporting your game with the option to "Exclude Unused Files". So be careful 
 * when using this feature, as you'll probably have to manually copy the files into the 
 * exported project, or create dummy events using them to trick the engine. I'm still
 * thinking on ways to make it easier to manage.
 * 
 * 
 * =============================================================================
 * Pose Setup - Default Pose Templates
 * =============================================================================
 * 
 * Default pose templates is simply a list of Pose Keys that should be automatically
 * loaded for all events. The keys referenced here should be properly configured as
 * pose templates for them to work. Keep in mind that Pose Keys are case sensitive.
 * 
 * So, Pose Templates needs to be loaded into events through notes or comment tags,
 * while Default Pose Templates are always loaded into all events, unless explicitly
 * stated otherwise through notes or comment tags.
 * 
 * =============================================================================
 * Pose Setup - Balloon Poses
 * =============================================================================
 * 
 * Balloon poses, when configured, are automatically triggered with a balloon 
 * animation. Setup includes a few familiar parameters:
 *  - Balloon ID, identifying the balloon for which the pose refers to. Common ID
 *    values are:
 *      + 1: Exclamation
 *      + 2: Question
 *      + 3: Music Note
 *      + 4: Heart
 *      + 5: Anger
 *      + 6: Sweat
 *      + 7: Cobweb
 *      + 8: Silence
 *      + 9: Light bulb
 *      + 10: Zzz
 *      + 11 or higher: user defined balloons
 *  - Spritesheet, Index, Pattern and Speed, which works similarly to pose setups.
 * 
 * The one thing different here is that if Pattern is set as an empty array,
 * the plugin will simply swap sprites maintaining the character direction and
 * sprite index. However, if a custom pattern is set, the plugin will play it
 * while the balloon is playing. The character will automatically fallback to its
 * previous pose when the balloon stops playing.
 * 
 * =============================================================================
 * Setting up Events
 * =============================================================================
 * 
 * There's three ways to setup poses for events: using the event note to load pose
 * templates; loading pose templates using comments (so that it affects only the 
 * current event page); or build a new pose using event comments.
 * 
 * Using Event Note
 * ----------------
 * 
 * To load a list of pose templates and make them available for an event, you can add
 * the following tag to its note field:
 *      <TAA_CP: lib:pose1,pose2,pose3,...,poseN>
 * 
 * You can also customize the event reserved poses directly from the notes:
 *      <TAA_CP: default:pose1, dash:pose2, idle:pose3, lib:pose4,pose5,...,poseN>
 * 
 * The list of common poses should always use a tag (lib) so the plugin can identify 
 * what is what.
 * 
 * You can use tags to load balloon pose templates as well:
 *      <TAA_CP: balloons:x,y,z...,n>
 * List balloon poses by its corresponding balloon ID.
 * 
 * There's two more possible note tags. The first is shown below, and it's used to 
 * prevent the event from loading default poses (configured in the Plugin Manager):
 *      <TAA_CP: noDefaults>
 * The other is used to enable automatic saving of the event pose setup, so that the 
 * event will remember it if the player leaves the map and come back. This note can be 
 * overwritten with event comments:
 *      <TAA_CP: savePose:true>
 * 
 * You can combine tags as you like, just remember to separate them with a comma.
 * 
 * Starting on version 1.3.3, a new tag can be used to enable or disable character poses
 * on events:
 *      <TAA_CP: enable:true>
 *      <TAA_CP: enable:false>
 * 
 * Setting this tag to false won't prevent poses from being loaded into the event, but 
 * it will prevent any poses from working on the event unless it is enabled through a 
 * plugin command or comment tag. If nothing is specified, the plugin will assume poses 
 * are enabled.
 * 
 * Using Event Comments
 * --------------------
 * 
 * First of all, you don't need to fit everything in a single comment command, as they're
 * quite limited on the number of lines they can handle.
 * 
 * Regardless of using the commands to load a pose, or create a new one, you need to
 * use the <TAA_CP> tag to start setting up poses, and </TAA_CP> to end it (or else the
 * plugin will go through the rest of the event page looking for the ending tag).
 * 
 * After starting the tag, the following commands can be included to create a pose for
 * that specific event page (use one line for each command):
 *
 *  cpLoad:pose1,pose2,...,poseN
 *      - defines a list of pose templates to load into the event;
 * 
 *  cpLoad:reservedKey:poseKey
 *      - you can also customize the events reserved poses through comments. In this 
 *        pattern, reservedKey can be either default, dash or idle, and poseKey is the
 *        pose template to set it to.
 *        This clause can also be used to load balloon templates, like the example below:
 *            cpLoad:balloon:1,2,4
 * 
 *  cpNewPose:poseName
 *      - to start creating a new pose, use this command, where poseName is the Pose Key
 *        to use. Remember, it must be unique.
 *  cpNewBalloonPose:balloonId
 *      - to start creating a new balloon pose, use this command. Remember, balloonId must
 *        be unique, you can't create two balloon poses for the same balloon. You can use
 *        Plugin Commands to alter it if you need though.
 * 
 *  cpSprite:file,index
 *      - it must be used after the cpNewPose. It defines the Spritesheet and Index
 *        pose parameters. file must be the character filename to use, and index is
 *        the character index from the file;
 *        This is used for both creating a new pose and a new balloon pose.
 * 
 *  cpBlinkSprite:file,index
 *      - quite similar to cpSprite, only to define the blinking sprites. You can
 *        omit this command if blinking is not required for the pose;
 * 
 *  cpSpeed:number
 *      - defines how fast the pattern will be played. Its the number of frames to wait
 *        before changing sprites;
 *        This is used for both creating a new pose and a new balloon pose.
 * 
 *  cpPattern:patternList
 *      - its a comma separated list for the custom pattern to use for this pose. You can
 *        omit this if you want the engine's default pattern;
 *        This is used for both creating a new pose and a new balloon pose.
 * 
 *  :cpEndPose:
 *      - use this to tell the plugin that the pose setup has ended. If this command is
 *        not included the plugin will ignore the rest and discard the pose.
 *        This is used for both creating a new pose and a new balloon pose.
 *  
 *  cpAutoSave:true|false
 *      - enables / disables auto saving on the event pose setup
 * 
 * Here's an example on how to use this comment commands:
 * 
 * <TAA_CP>
 * cpLoad:pose1,pose2
 * cpNewPose:spin
 * cpSprite:%{char},%{index}
 * cpBlinkSprite:%{pose}_blink,%{pIndex}
 * cpSpeed:5
 * cpPattern:d4,d8,d6,d2
 * :cpEndPose:
 * </TAA_CP>
 * 
 * As of version 1.2.4, two new tags have been included:
 *  cpDeletePose:poseKey
 *      - This can be effectively used to delete a pose when switching to an event page
 *        to another. One situation that can be useful, for example, is if you setup a
 *        custom idle pose in one page, but want to disable it in the following page.
 *        You can delete the pose when it is no longer needed.
 *        If for some reason you try to delete a default pose, the plugin will 
 *        automatically replace it with a generic default pose, preventing eventual 
 *        crashes;
 * 
 *  cpDeleteBalloonPose:balloonId
 *      - This one is similar pretty similar to the former one. The difference here is
 *        that it can be used to delete a balloon pose instead;
 * 
 * As of version 1.3.3, two new tag has been included:
 *  cpEnable:true|false
 *      - This can be used to enable or disable character poses when the event page is 
 *        triggered. You can change this setting later with plugin commands;
 * 
 *  :cpReset:
 *      - This discards all previous poses loaded into the event and recreates its 
 *        library. All default poses and note tags are reprocessed. Comment tags
 *        on the page AFTER this one are also processed, so try to have this as your
 *        first comment tag command when using it. Any comment tag loaded on the page
 *        before this is discarded.
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * $gameSystem.setPose(id, poseKey)
 *  - sets poseKey as the current pose, but do not animate if the character is not 
 *    moving. id can refer to either an actor, or an event:
 *      + Use 0 for the party leader;
 *      + Use -1, -2, and -3 for a follower;
 *      + Any number starting in 1 will be considered an event. If the event is found
 *        in the current map, sets its pose to poseKey.
 * 
 * $gameSystem.setAnimatedPose(id, poseKey, cycles)
 *  - sets poseKey as the current pose and automatically starts playing its animation
 *    pattern. If cycles is present, it defines how many times the animation cycle
 *    will be played before resetting to default. If it is omitted, the animation pattern
 *    will repeat until a new pose is set;
 * 
 * $gameSystem.setDefaultPose(id, poseKey)
 *  - changes the actor or event default pose to poseKey.
 * 
 * $gameSystem.setDashPose(id, poseKey)
 *  - changes the actor or event dash pose to poseKey.
 * 
 * $gameSystem.setIdlePose(id, poseKey)
 *  - changes the actor or event idle pose to poseKey.
 * 
 * $gameSystem.restorePose(id)
 *  - restores the actor or event to its previous used pose.
 * 
 * $gameSystem.restoreAllActorsPoses()
 *  - restore all actors to their previous poses.
 * 
 * $gameSystem.resetPose(id)
 *  - resets the actor or event to its default pose.
 * 
 * $gameSystem.resetAllActorPoses()
 *  - resets all actors to their default poses.
 * 
 * $gameSystem.isPoseAvailable(id, poseKey)
 *  - returns true if poseKey exists for the specified actor or event;
 * 
 * $gameSystem.poseHasCustomPattern(id, poseKey)
 *  - returns true if poseKey for the specified actor or event has a custom pattern setup;
 * 
 * $gameSystem.getCurrentPose(id)
 *  - returns the current pose key for the specified actor or event;
 * 
 * $gameSystem.getDashPose(id)
 *  - returns the current dashing pose key for the specified actor or event;
 * 
 * $gameSystem.getIdlePose(id)
 *  - returns the current idle pose key for the specified actor or event;
 * 
 * $gameSystem.getCurrentPoseSpeed(id)
 *  - returns the current pose speed for the specified actor or event;
 * 
 * $gameSystem.enableIde(id)
 *  - enable idle pose for the character. When enabled, as soon as the character stays
 *    still for enough time the idle pose is triggered.
 * 
 * $gameSystem.enablePartyIdle()
 *  - enable idle pose for the entire party at the same time.
 * 
 * $gameSystem.disableIdle(id)
 *  - disable idle pose for the character. When disabled, the character won't start the
 *    idle pose, regardless of how long it stays still.
 * 
 * $gameSystem.disablePartyIdle()
 *  - disable idle pose for the entire party at the same time.
 * 
 * $gameSystem.isIdleEnabled(id)
 *  - returns true if the idle pose is enabled for the character, or false if it is
 *    disabled. It doesn't evaluate if the idle pose is present.
 * 
 * $gameSystem.saveEventPoseData(eventId)
 *  - stores the current event pose setup so that it is restored the next time the event
 *    is loaded (like going out, than back to the map). It is run ON THE CURRENT MAP. 
 *    Always.
 * 
 * $gameSystem.deleteEventPoseData(mapId, eventId)
 *  - if an event pose setup has been saved for the informed map, its data is deleted.
 *    The next time the event is loaded it will start poses from scratch. Can be triggered
 *    from any map to any map.
 * 
 * $gameSystem.reloadEventPoses(eventId)
 *  - restore the event original poses (for the current page), but do not delete its saved
 *    pose data. So pose data is still restored if you go out and back from the map.
 * 
 * $gameSystem.cpEnableEventPoses(eventId)
 *  - enable character poses for an event from the current map.
 * 
 * $gameSystem.cpDisableEventPoses(eventId)
 *  - disables character poses for an event from the current map.
 * 
 * $gameSystem.overwriteBalloonPose(id, balloonId, poseKey)
 *  - replaces a balloon pose based on a configured pose, identified by the poseKey.
 * 
 * $gameSystem.resetBalloonPose(id, balloonId)
 *  - restore the balloon id pose configured through the plugin parameters.
 * 
 * $gameSystem.resetBalloonPoseLibrary(id)
 *  - restore all balloon poses configured through the plugin parameters.
 * 
 * $gameSystem.enableBalloonPoses(id)
 *  - enables automatic balloon poses for the specified character.
 * 
 * $gameSystem.disableBalloonPoses(id)
 *  - disables automatic balloon poses for the specified character.
 * 
 * $gameSystem.isBalloonPoseEnabled(id)
 *  - returns true if balloon poses are enabled for the character, or false if they
 *    are disabled.
 * 
 * ============================================================================
 * Plugin Commands (MV)
 * ============================================================================
 * 
 * SetPose target poseKey
 *  - sets poseKey as the current pose, but do not animate if the character is not 
 *    moving. target can refer to either an actor, or an event:
 *      + Use 0 for the party leader;
 *      + Use -1, -2, and -3 for a follower;
 *      + Any number starting in 1 will be considered an event. If the event is found
 *        in the current map, sets its pose to poseKey.
 * 
 * SetAnimatedPose target poseKey
 *  - sets poseKey as the current pose and automatically starts playing its animation
 *    pattern. If cycles is present, it defines how many times the animation cycle
 *    will be played before resetting to default. If it is omitted, the animation pattern
 *    will repeat until a new pose is set;
 * 
 * SetDefaultPose target poseKey
 *  - changes the target's default pose to poseKey.
 * 
 * SetDashPose target poseKey
 *  - changes the target's dash pose to poseKey.
 * 
 * SetIdlePose target poseKey
 *  - changes the target's idle pose to poseKey.
 * 
 * IdlePose target enable
 * IdlePose target allow
 *  - enable idle pose for the character. When enabled, as soon as the character stays
 *    still for enough time the idle pose is triggered. If you want to enable the idle 
 *    pose for all actors, set target to 'actors', or 'party'. Use numbers to run it 
 *    for specific actors or events.
 * 
 * IdlePose target disable
 * IdlePose target restrict
 *  - disable idle pose for the character. When disabled, the character won't start the
 *    idle pose, regardless of how long it stays still. If you want to enable the idle 
 *    pose for all actors, set target to 'actors', or 'party'. Use numbers to run it 
 *    for specific actors or events.
 * 
 * RestorePose target
 *  - restores the target to its previous used pose. If you want to restore poses for
 *    all actors, set target to 'actors', or 'party'. Use numbers to run it for specific
 *    actors or events.
 * 
 * ResetPose target
 *  - resets the target to its default pose. If you want to reset poses for all actors, 
 *    set target to 'actors', or 'party'. Use numbers to run it for specific actors or 
 *    events.
 * 
 * SaveEventPoses eventId
 *  - stores the current event pose setup so that it is restored the next time the event
 *    is loaded (like going out, than back to the map). It is run ON THE CURRENT MAP. 
 *    Always.
 * 
 * DeleteEventPoses mapId eventId
 *  - if an event pose setup has been saved for the informed map, its data is deleted.
 *    The next time the event is loaded it will start poses from scratch. Can be triggered
 *    from any map to any map.
 * 
 * ReloadEventPoses eventId
 *  - restore the event original poses (for the current page), but do not delete its saved
 *    pose data. So pose data is still restored if you go out and back from the map.
 * 
 * EventPose Enable eventId
 * EventPose Disable eventId
 *  - Enable or disable character poses for an event located in the current map.
 * 
 * BalloonPose set id balloonId poseKey
 *  - replaces a balloon pose based on a configured pose, identified by the poseKey.
 * 
 * BalloonPose reset id balloonId
 *  - restore the balloon id pose configured through the plugin parameters. If the
 *    balloonId is not present, restore all balloon poses for the character.
 * 
 * BalloonPose enable id
 * BalloonPose on id
 * BalloonPose allow id
 *  - enables automatic balloon poses for the specified character.
 * 
 * BalloonPose disable id
 * BalloonPose off id
 * BalloonPose block id
 *  - disables automatic balloon poses for the specified character.
 * 
 * ============================================================================
 * Plugin Commands (MZ)
 * ============================================================================
 * 
 * Set Character Pose
 *  - Change the character pose. It has the following parameters:
 *      + Command Target: Apply to either an actor or an event;
 *      + Char ID: If the target is an actor, specify the character party index.
 *        If it's an event, specify the event id;
 *      + Is Animated: if true, trigger the pose animation even if the character is
 *        not moving. If false, animations are only displayed if it moves;
 *      + Animation Cycles: If the pose is animated, specify how many times the
 *        pattern cycle will be played. If left as 0 the pattern will be played
 *        indefinitely, until the pose is changed again.
 * 
 * Set Reserved Pose
 *  - Change the characters reserved poses. The parameters "Command Target" and "Char ID"
 *    works the same as the previous command. The following parameters are also applied:
 *      + Pose Type: specify which reserved pose to alter (default, dash or idle);
 *      + New Pose: specify the reserved pose new pose key;
 *      + Change and Trigger: if true, change the reserved pose and trigger it at the
 *        same time. If false, the reserved pose will be changed, but the current pose
 *        will be sustained;
 * 
 * Idle Pose Settings
 *  - Allows you to enable or disable a character's idle pose.
 * 
 * Balloon Pose Settings
 *  - Allows you to enable or disable a character's balloon poses.
 * 
 * Change Balloon Poses
 *  - Allows you to change a character balloon pose. You need to specify for which balloon
 *    to apply the change, and a pose key to use as reference for the change.
 * 
 * Reset Poses
 *  - Allows you to reset the character's pose setup to its default. It can affect balloon
 *    poses (Balloon Poses) or triggerable poses (Pose Library).
 * 
 * Restore Poses
 *  - Allows you to revert a character's to its previous pose.
 * 
 * Event Pose Library
 *  - Allows you to force an event to save its pose library state, reload or delete a saved
 *    pose library.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 0.5.0:
 *  - Beta release
 * Version 0.6.0:
 *  - New plugin commands and script calls:
 *      + Enable / disable idle poses for characters
 *      + Save / delete / reload event poses, to persist triggered poses if the player
 *        leaves the map
 *  - New note and comment tags to enable/disable auto save on event poses
 *  - Fixed a bug that caused blinking NPCs to remain with eyes closed "forever"
 * Version 0.7.0:
 *  - Added Balloon Poses for actors, templates and event defaults
 *  - Added Plugin Commands and Script Calls for balloons
 *  - Added a parameter to disable balloons entirely (for compatibility purposes)
 * Version 1.0.0:
 *  - First stable release
 * Version 1.1.0:
 *  - MZ compatibility;
 *  - Fixed a bug on starting the idle pose after a balloon pose;
 *  - Fixed some bugs on poses using frames from multiple directions;
 *  - Fixed a bug on walking poses;
 *  - Changed caching behavior to better use cached character files;
 * Version 1.2.0:
 *  - Fixed an issue with MZ Plugin Commands;
 *  - Updated the help section describing MZ Plugin Commands;
 *  - Added script calls to get current idle and dash pose keys;
 *  - Added functions to check if idle and balloon poses are enabled;
 *  - Added a failsafe to prevent balloon poses getting stuck when a balloon pose
 *    is triggered while another one is playing;
 *  - Fixed an issue when leaving the idle pose directly for the dash pose, which
 *    could mess up the default walking pose;
 *  - A few changes to the help section;
 * Version 1.2.1:
 *  - Reworked character spritesheet caching to fix a bug crashing the game on save.
 * Version 1.2.2:
 *  - Fixed an issue when changing an event to an empty page (with no poses loaded),
 *    which would cause the old sprite to remain onscreen
 *  - Fixed an issue which would crash the game if using the "Erase Event" command.
 * Version 1.2.3:
 *  - Fixed an issue that would cause game crash if none of the event pages conditions
 *    are met (for example, have an event with a single page to load only when switch 1
 *    is ON. If it is OFF, the game would crash);
 * Version 1.2.4:
 *  - Fixed a compatibility issue that could cause a crash when entering battle test;
 *  - Fixed a bug that could cause crashes with deployed projects (failure to load image
 *    files);
 *  - Fixed a bug that could cause an event to not have a default pose. So if you setup
 *    an idle pose using comments, for example, the event won't have any way of coming
 *    out of the idle pattern;
 *  - Added two new comment tags:
 *      + cpDeletePose, to delete a pose when switching from one event page to another
 *        (for example, to delete an idle pose that's no longer required);
 *      + cpDeleteBalloonPose, to delete a balloon pose when switching from one event
 *        page to another;
 * Version 1.3.0:
 *  - Reworked the entire character caching method, fixing caching issues that could cause
 *    sprites to disappear when the player is transferred to another map in MZ;
 *  - Changed method that checks if image file exists before trying to load so it can
 *    work properly on web and mobile deployments;
 *  - Added a new parameter to enable / disable checking if files exists before loading;
 *  - Added 8 directions movement and sprite support;
 *      * There's a known issue here. Changing from 8 directions sprites to 4 directions
 *        while a character is moving (for example, from walking to dashing sprites) can
 *        cause weird effects which I don't intend to fix anytime soon, since that transition
 *        doesn't seem to make much sense to me!
 * Version 1.3.1:
 *  - Fixed an issue that could crash the game if 8 directions was not enabled;
 *  - Fixed compatibility with YEP_X_CoreUpdatesOpt. Keep in mind that this fix required
 *    me to completely rewrite the ImageManager.loadNormalBitmap function to restore engine
 *    default, as Yanfly's version changed core variable names that clashes with my code.
 *    That also means that new compatibility issues could arise with other plugins if they
 *    try to extend this function further. To avoid such issues, I recommend placing 
 *    TAA_CharacterPoses right below YEP_X_CoreUpdatesOpt, and as high as you can in your 
 *    game's plugin list!
 * Version 1.3.2:
 *  - Fixed a bug that could mess path finding with 8 directions disabled;
 * Version 1.3.3:
 *  - Fixed a bug that could cause the game to crash if the party leader has no poses
 *    configured in the Plugin Manager
 *  - Fixed a bug that would break the engine function to hide followers. Followers would
 *    always be visible, no exception;
 *  - Fixed a bug that would cause an erased event to remain onscreen;
 *  - Added note and comment tags to enable / disable character poses for an event;
 *  - Added comment tags to reset the event pose library when initializing a new event page;
 *  - Added script calls and plugin commands to enable / disable character poses for an
 *    event in the current map;
 * Version 1.3.4:
 *  - Fixed a bug that would cause the followers dash pose to not work as intended;
 * Version 1.3.5:
 *  - Added support to MV and MZ image encryption when using the Check Files First parameter;
 * 
 * ============================================================================
 * End of Help
 * ============================================================================
 * 
 * ============================================================================
 * MZ Commands
 * ============================================================================
 *  
 * @command setPose
 * @text Set Character Pose
 * @desc Change character pose
 * 
 * @arg charContext
 * @text Command Target
 * @type select
 * @option actor
 * @option event
 * @default actor
 * @desc Character type into which to apply the pose change
 * 
 * @arg charId
 * @text Char ID
 * @type number
 * @min 1
 * @default 1
 * @desc Character ID. It's either an event ID, or a party member index (starting at 1 for the leader)
 * 
 * @arg animated
 * @text Is Animated
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * @desc Defines if the pose should be animated even if the character is not moving.
 * 
 * @arg poseKey
 * @text Pose Key
 * @type text
 * @default
 * @desc Pose key to set.
 * 
 * @arg cycles
 * @text Animation Cycles
 * @type number
 * @min 0
 * @default 0
 * @desc Number of cycles, if it's an animated pose. Leave as 0 to animate continuously.
 * 
 * @command setReservedPose
 * @text Set Reserved Pose
 * @desc Change reserved pose settings
 * 
 * @arg charContext
 * @text Command Target
 * @type select
 * @option actor
 * @option event
 * @default actor
 * @desc Character type into which to apply the pose change
 * 
 * @arg charId
 * @text Char ID
 * @type number
 * @min 1
 * @default 1
 * @desc Character ID. It's either an event ID, or a party member index (starting at 1 for the leader)
 * 
 * @arg poseType
 * @text Pose Type
 * @type select
 * @option Default
 * @value default
 * @option Dash
 * @value dash
 * @option Idle
 * @value idle
 * @default default
 * @desc Select the reserved pose to replace.
 * 
 * @arg poseKey
 * @text New Pose
 * @type text
 * @default 
 * @desc Key to the new pose to use.
 * 
 * @arg triggerPose
 * @text Change and Trigger
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 * @desc Change reserved pose and trigger it?
 * 
 * @command idlePose
 * @text Idle Pose Settings
 * @desc Enable / disable idle pose.
 * 
 * @arg idleContext
 * @text Command Target
 * @type select
 * @option party
 * @option actor
 * @option event
 * @default actor
 * @desc Select the command target (an actor, an event or the whole party)
 * 
 * @arg charId
 * @text Character ID
 * @type number
 * @min 1
 * @default 1
 * @desc Which actor or event to apply the command to. Param ignored when 'Command Target' is set to 'party'.
 * 
 * @arg idleEnable
 * @text Command
 * @type boolean
 * @on Enable
 * @off Disable
 * @default false
 * @desc Enable or disable idle pose?
 * 
 * @command balloonPose
 * @text Balloon Pose Settings
 * @desc Enable / disable balloon poses.
 * 
 * @arg balloonContext
 * @text Command Target
 * @type select
 * @option party
 * @option actor
 * @option event
 * @default actor
 * @desc Select the command target (an actor, an event or the whole party)
 * 
 * @arg charId
 * @text Character ID
 * @type number
 * @min 1
 * @default 1
 * @desc Which actor or event to apply the command to. Param ignored when 'Command Target' is set to 'party'.
 * 
 * @arg balloonEnable
 * @text Command
 * @type boolean
 * @on Enable
 * @off Disable
 * @default false
 * @desc Enable or disable balloon poses?
 * 
 * @command setBalloonPoses
 * @text Change Balloon Poses
 * @desc Change assigned balloon poses
 * 
 * @arg balloonContext
 * @text Command Target
 * @type select
 * @option actor
 * @option event
 * @default actor
 * @desc Select the command target (an actor, an event or the whole party)
 * 
 * @arg charId
 * @text Character ID
 * @type number
 * @min 1
 * @default 1
 * @desc Which actor or event to apply the command to. Param ignored when 'Command Target' is set to 'party'.
 * 
 * @arg balloonId
 * @text Balloon ID
 * @type number
 * @min 1
 * @default 1
 * @desc Balloon ID.
 * 
 * @arg poseKey
 * @text New Pose
 * @type text
 * @default 
 * @desc Key to the new pose to use.
 * 
 * @command resetPose
 * @text Reset Poses
 * @desc Reset to original poses.
 * 
 * @arg resetContext
 * @text Reset Context
 * @type select
 * @option Pose Library
 * @option Balloon Poses
 * @default Pose Library
 * @desc Which context to reset.
 * 
 * @arg poseContext
 * @text Command Target
 * @type select
 * @option actor
 * @option event
 * @option party
 * @default actor
 * @desc Select the command target (an actor, an event or the whole party)
 * 
 * @arg charId
 * @text Character ID
 * @type number
 * @min 1
 * @default 1
 * @desc Which actor or event to apply the command to. Param ignored when 'Command Target' is set to 'party'.
 * 
 * @arg balloonId
 * @text Balloon ID
 * @type number
 * @min 0
 * @default 1
 * @desc Balloon ID to reset. Set to 0 to reset all balloons. This parameter is ignored if 'Reset Context' is set to 'Pose Library'.
 * 
 * @command restorePose
 * @text Restore Poses
 * @desc Restore to previous pose.
 * 
 * @arg poseContext
 * @text Command Target
 * @type select
 * @option actor
 * @option event
 * @default actor
 * @desc Select the command target (an actor, an event or the whole party)
 * 
 * @arg charId
 * @text Character ID
 * @type number
 * @min 1
 * @default 1
 * @desc Which actor or event to apply the command to. Param ignored when 'Command Target' is set to 'party'.
 * 
 * @command eventPoses
 * @text Event Pose Library
 * @desc Save / delete saved / reload original event pose settings.
 * 
 * @arg eventId
 * @text Event ID
 * @type number
 * @min 1
 * @default 1
 * @desc Save / delete saved / reload original event pose settings.
 * 
 * @arg eventPoseCommand
 * @text Command
 * @type select
 * @option save
 * @option delete
 * @option reload
 * @option enable
 * @option disable
 * @default save
 * @desc Command to apply.
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * @param ---Global Config---
 * @default
 * 
 * @param Blink Interval
 * @parent ---Global Config---
 * @type number
 * @min 0
 * @default 45
 * @desc Base number of frames for the interval between character blinks, before applying randomness.
 * 
 * @param Blink Randomness
 * @parent ---Global Config---
 * @type number
 * @min 0
 * @default 90
 * @desc A random number between 0 and this param is added to blink interval. The higher the value, the more random.
 * 
 * @param Blink Duration
 * @parent ---Global Config---
 * @type number
 * @min 0
 * @default 10
 * @desc Number of frames a blink lasts before opening eyes again.
 * 
 * @param Idle Wait Time
 * @parent ---Global Config---
 * @type number
 * @min 0
 * @default 600
 * @desc Number of frames a character needs to be completely still before triggering an idle pose.
 * 
 * @param Balloon Poses
 * @parent ---Global Config---
 * @type boolean
 * @on ENABLE
 * @off DISABLE
 * @default true
 * @desc Enable or disable balloon poses. It's a compatibility param, cannot be changed in game.
 * 
 * @param Check Files First
 * @parent ---Global Config---
 * @type boolean
 * @on ENABLE
 * @off DISABLE
 * @default true
 * @desc If enabled, the plugin will check if image files exists in the game's directory before loading it up.
 * 
 * @param Enable 8 Directions
 * @parent ---Global Config---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Enable or disable player 8 direction movement.
 * 
 * @param Diagonal Event Trigger
 * @parent ---Global Config---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Enable or disable event trigger on player diagonal touch (when moving diagonally).
 * 
 * @param 8 Dir Layout
 * @parent ---Global Config---
 * @type struct<8DirLayout>
 * @default {"Up Left Row":"1","Up Right Row":"2","Down Left Row":"3","Down Right Row":"4"}
 * @desc This settings defines how the plugin reads 8 directional sprites.
 * 
 * @param ---Pose Setup---
 * @default
 * 
 * @param ---Actor Poses---
 * @parent ---Pose Setup---
 * 
 * @param ---Event Poses---
 * @parent ---Pose Setup---
 * 
 * @param Actor Poses
 * @parent ---Actor Poses---
 * @type struct<ActorPose>[]
 * @default []
 * @desc Configure poses for each actor.
 * 
 * @param Pose Templates
 * @parent ---Event Poses---
 * @type struct<EventPose>[]
 * @default []
 * @desc Configure pose templates to manually load on NPC events later.
 * 
 * @param Balloon Pose Templates
 * @parent ---Event Poses---
 * @type struct<EventBalloonPoses>[]
 * @default []
 * @desc List of balloon specific pose templates for events.
 * 
 * @param Default Event Poses
 * @parent ---Event Poses---
 * @type struct<EventPose>[]
 * @default []
 * @desc Configure default poses to automatically load on NPC events.
 * 
 * @param Default Balloon Poses
 * @parent ---Event Poses---
 * @type struct<EventBalloonPoses>[]
 * @default []
 * @desc List of default balloon poses to automatically load on NPC events.
 */

/*~struct~ActorPose:
 * @param Actor ID
 * @type number
 * @default 1
 * @desc Actor ID for which the poses will be made available.
 * 
 * @param Default Blink Sprites
 * @type file
 * @dir img/characters
 * @require 1
 * @default
 * @desc Default blinking spritesheet. This parameter is overwritten if a 'default' pose is specified.
 * 
 * @param Default Blink Index
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Default blinking spritesheet index. This parameter is overwritten if a 'default' pose is specified.
 * 
 * @param Actor Poses
 * @type struct<Pose>[]
 * @default []
 * @desc List of poses available to the actor.
 * 
 * @param Actor Balloon Poses
 * @type struct<ActorBalloonPoses>[]
 * @default []
 * @desc List of balloon specific poses for the actor. Can be altered through plugin commands later.
 */

/*~struct~DefaultPose:
 * @param Default Blink Sprites
 * @type text
 * @default %{char}_blink
 * @desc Default blinking spritesheet. Overwritten if a 'default' pose is specified. Use %{char} for event original sprites.
 * 
 * @param Default Blink Index
 * @type text
 * @default %{index}
 * @desc Default blinking spritesheet index. Overwritten if a 'default' pose is specified. Use %{index} for event original sprite index.
 * 
 * @param Event Poses
 * @type struct<EventPose>[]
 * @default []
 * @desc List of poses available to the actor.
 */

/*~struct~Pose:
 * @param Pose Key
 * @type text
 * @default
 * @desc Use this to reference and trigger this specific pose. It should be unique for each character.
 * 
 * @param Spritesheet
 * @type file
 * @dir img/characters
 * @require 1
 * @default
 * @desc Spritesheet file with animations for this pose.
 * 
 * @param Spritesheet Index
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Identifies which character sheet to use from the spritesheet.
 * 
 * @param Blink Spritesheet
 * @type file
 * @dir img/characters
 * @require 1
 * @default 
 * @desc Spritesheet file with blinking sprites for this pose.
 * 
 * @param Blink Index
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Identifies which character sheet to use from the spritesheet.
 * 
 * @param Pattern
 * @type text[]
 * @default []
 * @desc Set a custom pattern for the pose by specifying frame order. Leave blank to use engine defaults.
 * 
 * @param Speed
 * @type number
 * @min 1
 * @default 15
 * @desc How fast should frames be switched (in number of frames to wait before each sprite swap: the smaller the faster).
 * 
 */

 /*~struct~ActorBalloonPoses:
  * @param Balloon ID
  * @type number
  * @min 1
  * @default 1
  * @desc ID for the balloon for which the balloon animation should play.
  * 
  * @param Spritesheet
  * @type file
  * @dir img/characters
  * @require 1
  * @default
  * @desc Which character spritesheet to use for the balloon pose.
  * 
  * @param Spritesheet Index
  * @type number
  * @min 0
  * @max 7
  * @default 0
  * @desc Identifies which character sheet to use from the spritesheet.
  * 
  * @param Pattern
  * @type text[]
  * @default []
  * @desc Set a custom pattern for the balloon pose by specifying frame order. Leave blank to change char file with no animation.
  * 
  * @param Speed
  * @type number
  * @min 1
  * @default 15
  * @desc How fast should frames be switched (in number of frames to wait before each sprite swap: the smaller the faster)
  * 
  */

/*~struct~EventPose:
 * @param Pose Key
 * @type text
 * @default
 * @desc Use this to reference and trigger this specific pose. It should be unique for each character.
 * 
 * @param Spritesheet
 * @type text
 * @default %{char}
 * @desc Spritesheet file with animations for this pose. Use %{char} as a placeholder for the character default spritesheet.
 * 
 * @param Spritesheet Index
 * @type text
 * @default %{index}
 * @desc Identifies which character sheet to use from the spritesheet. Use %{index} as a placeholder for the default sprite index.
 * 
 * @param Blink Spritesheet
 * @type text
 * @default %{pose}_blink
 * @desc Spritesheet file with blinking sprites for this pose. Use %{char} for default spritesheet and %{pose} for pose spritesheet.
 * 
 * @param Blink Index
 * @type text
 * @default %{pIndex}
 * @desc Identifies which character sheet to use from the spritesheet. Use %{index} for default index and %{pIndex} for pose index.
 * 
 * @param Pattern
 * @type text[]
 * @default []
 * @desc Set a custom pattern for the pose by specifying frame order. Leave blank to use engine defaults.
 * 
 * @param Speed
 * @type number
 * @min 1
 * @default 18
 * @desc How fast should frames be switched (in number of frames to wait before each sprite swap: the smaller the faster).
 * 
 */

/*~struct~EventBalloonPoses:
 * @param Balloon ID
 * @type number
 * @min 1
 * @default 1
 * @desc ID for the balloon for which the balloon animation should play.
 * 
 * @param Spritesheet
 * @type text
 * @default %{char}
 * @desc Which character spritesheet to use for the balloon pose. Use %{char} as a placeholder for the character default spritesheet.
 * 
 * @param Spritesheet Index
 * @type text
 * @default %{index}
 * @desc Identifies which character sheet to use from the spritesheet. Use %{index} as a placeholder for the default sprite index.
 * 
 * @param Pattern
 * @type text[]
 * @default []
 * @desc Set a custom pattern for the balloon pose by specifying frame order. Leave blank to change char file with no animation.
 * 
 * @param Speed
 * @type number
 * @min 1
 * @default 15
 * @desc How fast should frames be switched (in number of frames to wait before each sprite swap: the smaller the faster)
 * 
 */

/*~struct~8DirLayout:
 * @param Up Left Row
 * @type number
 * @min 1
 * @max 4
 * @default 1
 * @desc Defines which row has sprites for walking up and left.
 * 
 * @param Up Right Row
 * @type number
 * @min 1
 * @max 4
 * @default 2
 * @desc Defines which row has sprites for walking up and right.
 * 
 * @param Down Left Row
 * @type number
 * @min 1
 * @max 4
 * @default 3
 * @desc Defines which row has sprites for walking down and left.
 * 
 * @param Down Right Row
 * @type number
 * @min 1
 * @max 4
 * @default 4
 * @desc Defines which row has sprites for walking down and right.
 */

//=============================================================================
// Local Functions & Parameters
//=============================================================================

TAA.cp.functions = TAA.cp.functions || {};
TAA.cp.functions.parsePose = function(rawPose, isEvent){
    var pose = {};
    pose['Pose Key'] = rawPose['Pose Key'];
    pose['Spritesheet'] = rawPose['Spritesheet'];
    if(isEvent)
        pose['Index'] = rawPose['Spritesheet Index'];
    else
        pose['Index'] = parseInt(rawPose['Spritesheet Index']);
    if((!isEvent && isNaN(pose['Index'])) || pose['Spritesheet'] === ''){
        pose['Index'] = isEvent ? '0' : 0;
        pose['Spritesheet'] = '';
    }
    pose['Blink'] = rawPose['Blink Spritesheet'];
    if(isEvent)
        pose['Blink Index'] = rawPose['Blink Index'];
    else
        pose['Blink Index'] = parseInt(rawPose['Blink Index']);
    if((!isEvent && isNaN(pose['Blink Index'])) || pose['Blink'] === ''){
        pose['Blink Index'] = isEvent ? '0' : 0;
        pose['Blink'] = '';
    }
    var p = JSON.parse(rawPose['Pattern']);
    pose['Pattern'] = [];
    if(p !== undefined && p.length > 0){
        for(var k=0; k<p.length; k++){
            var index = p[k];
            if(index.match(/(?:d[12346789])?i?[0-9]+/i))
                pose['Pattern'].push(index);
        }
    }
    pose['Speed'] = parseInt(rawPose['Speed']);
    pose['Speed'] = isNaN(pose['Speed']) ? 15 : pose['Speed'];
    return pose;
};

TAA.cp.functions.loadBalloonPoses = function(array, isEvent){
    var resultArray = [];
    if(isEvent === undefined) isEvent = false;
    for(var i=0; i<array.length; i++){
        var element = JSON.parse(array[i]);
        var balloonId = element['Balloon ID'];

        if(resultArray[balloonId] !== null && resultArray[balloonId] !== undefined) continue;
        if(element['Spritesheet'] === null || element['Spritesheet'] === undefined || element['Spritesheet'] === '') continue;

        resultArray[balloonId] = resultArray[balloonId] || {};
        resultArray[balloonId]['Spritesheet'] = element['Spritesheet'];
        if(isEvent)
            resultArray[balloonId]['Index'] = element['Spritesheet Index'];
        else
            resultArray[balloonId]['Index'] = parseInt(element['Spritesheet Index']);
        var p = JSON.parse(element['Pattern']);
        resultArray[balloonId]['Pattern'] = [];
        if(p !== undefined && p.length > 0){
            for(var k=0; k<p.length; k++){
                var index = p[k];
                if(index.match(/(?:d[12346789])?i?[0-9]+/i))
                    resultArray[balloonId]['Pattern'].push(index);
            }
        }
        resultArray[balloonId]['Speed'] = parseInt(element['Speed']);
        resultArray[balloonId]['Speed'] = isNaN(resultArray[balloonId]['Speed']) ? 15 : resultArray[balloonId]['Speed'];
    }

    return resultArray;
};

TAA.cp.functions.loadActorPoseParameters = function(array){
    var resultArray = [];
    for(var i=0; i<array.length; i++){
        var element = JSON.parse(array[i]);
        var actorId = parseInt(element["Actor ID"]);
        
        if(isNaN(actorId) || (resultArray[actorId] !== null && resultArray[actorId] !== undefined)) continue;

        var poseArray = JSON.parse(element['Actor Poses']);
        for(var j=0; j<poseArray.length; j++){
            var rawPose = JSON.parse(poseArray[j]);
            if(rawPose === undefined || rawPose === {}) continue;
            
            var pose = TAA.cp.functions.parsePose(rawPose, false);
            resultArray[actorId] = resultArray[actorId] || {};
            resultArray[actorId].Poses = resultArray[actorId].Poses || {};
            resultArray[actorId].Poses[pose['Pose Key']] = pose;
        }
    
        if(resultArray[actorId] === undefined || resultArray[actorId].Poses === undefined || resultArray[actorId].Poses.default === undefined){
            resultArray[actorId] = resultArray[actorId] || {};
            resultArray[actorId].Poses = resultArray[actorId].Poses || {};
            resultArray[actorId].Poses.default = {};
            resultArray[actorId].Poses.default['Pose Key'] = 'default';
            resultArray[actorId].Poses.default['Spritesheet'] = '';
            resultArray[actorId].Poses.default['Index'] = 0;
            resultArray[actorId].Poses.default['Blink'] = element['Default Blink Sprites'];
            var tmp = parseInt(element['Default Blink Index']);
            resultArray[actorId].Poses.default['Blink Index'] = (isNaN(tmp)) ? 0 : tmp;
            resultArray[actorId].Poses.default['Pattern'] = [];
            resultArray[actorId].Poses.default['Speed'] = 15;
        }

        if(element['Actor Balloon Poses'] !== undefined && element['Actor Balloon Poses'] !== '' && element['Actor Balloon Poses'].length > 0){
            var balloonPoses = TAA.cp.functions.loadBalloonPoses(JSON.parse(element['Actor Balloon Poses']));
            if(balloonPoses !== undefined && balloonPoses.length > 0)
                resultArray[actorId].Balloons = balloonPoses.slice();
        }
    }
    return resultArray; 
};

TAA.cp.functions.loadEventPoses = function(obj){
    var result = {};
    result.Poses = {};
    result.Balloons = [];
    for(var k=0; k<obj.length; k++){
        var rawPose = JSON.parse(obj[k]);
        if(rawPose === undefined || rawPose === {}) continue;

        var pose = TAA.cp.functions.parsePose(rawPose, true);
        result.Poses[pose['Pose Key']] = pose;
    }

    var balloons = Parameters['Default Balloon Poses'];
    if(balloons !== undefined && balloons !== '' && balloons !== '[]'){
        var balloonPoses = TAA.cp.functions.loadBalloonPoses(JSON.parse(balloons), true);
        if(balloonPoses !== undefined && balloonPoses.length > 0)
        result.Balloons = balloonPoses.slice();
    }
    return result;
};

TAA.cp.functions.loadEventParameters = function(obj){
    var result = {};
    result.Poses = {};
    result.Balloons = [];
    result = TAA.cp.functions.loadEventPoses(obj);
    
    if(result.Poses.default === undefined){
        result.Poses.default = {};
        result.Poses.default['Pose Key'] = 'default';
        result.Poses.default['Spritesheet'] = '%{char}';
        result.Poses.default['Index'] = '%{index}';
        result.Poses.default['Blink'] = '';
        result.Poses.default['Blink Index'] = '0';
        result.Poses.default['Pattern'] = [];
        result.Poses.default['Speed'] = 18;
    }

    var balloons = Parameters['Balloon Pose Templates'];
    if(balloons !== undefined && balloons !== '' && balloons !== '[]'){
        var balloonPoses = TAA.cp.functions.loadBalloonPoses(JSON.parse(balloons), true);
        if(balloonPoses !== undefined && balloonPoses.length > 0)
        result.Balloons = balloonPoses.slice();
    }

    return result; 
};

TAA.cp.functions.parse8DirSettings = function(struct){
    var obj = {};
    var rows = [-1, -1, -1, -1];
    var rowNames = ['7', '9', '1', '3'];
    if(struct === undefined)
        return {'7':0, '9':1, '1': 2, '3':3};
    var keys = Object.keys(JSON.parse(struct));
    for(var i=0; i<keys.length; i++){
        var rowNum = -1 + parseInt(JSON.parse(struct)[keys[i]]);
        if(!rows.contains(rowNum))
            rows[i] = rowNum;
        else{
            var zeroIndex = rows.indexOf(-1);
            rows[zeroIndex] = rowNum;
        }
        obj[rowNames[i]] = zeroIndex !== undefined ? rows[zeroIndex] : rows[i];
    }
    return obj;
};

TAA.cp.Parameters = TAA.cp.Parameters || {};
var Parameters = PluginManager.parameters(TAA.cp.PluginName);

TAA.cp.Parameters.Global = TAA.cp.Parameters.Global || {};
var tmp = parseInt(Parameters['Blink Interval']);
TAA.cp.Parameters.Global.BlinkInterval = isNaN(tmp) ? 45 : tmp;
tmp = parseInt(Parameters['Blink Randomness']);
TAA.cp.Parameters.Global.BlinkRandomness = isNaN(tmp) ? 90 : tmp;
tmp = parseInt(Parameters['Blink Duration']);
TAA.cp.Parameters.Global.BlinkDuration = isNaN(tmp) ? 10 : tmp;
tmp = parseInt(Parameters['Idle Wait Time']);
TAA.cp.Parameters.Global.IdleWait = isNaN(tmp) ? 600 : tmp;
TAA.cp.Parameters.Global.BalloonPoses = Parameters['Balloon Poses'] === "true";
TAA.cp.Parameters.Global.CheckFiles = Parameters['Check Files First'] === 'true';
TAA.cp.Parameters.Global.Enable8Dir = Parameters['Enable 8 Directions'] === 'true';
TAA.cp.Parameters.Global.DiagTriggerTouch = Parameters['Diagonal Event Trigger'] === 'true';
TAA.cp.Parameters.Global.D8Settings = TAA.cp.functions.parse8DirSettings(Parameters['8 Dir Layout']);

TAA.cp.Parameters.Actor = TAA.cp.Parameters.Actor || [];
if(Parameters['Actor Poses'] === undefined || Parameters['Actor Poses'] === '' || Parameters['Actor Poses'].length <= 0)
    TAA.cp.Parameters.Actor = [];
else
    TAA.cp.Parameters.Actor = TAA.cp.functions.loadActorPoseParameters(JSON.parse(Parameters['Actor Poses']));

TAA.cp.Parameters.Event = TAA.cp.Parameters.Event || {};
if(Parameters['Pose Templates'] === undefined || Parameters['Pose Templates'] === '' || Parameters['Pose Templates'].length <= 0)
    TAA.cp.Parameters.Event = {};
else
    TAA.cp.Parameters.Event = TAA.cp.functions.loadEventParameters(JSON.parse(Parameters['Pose Templates']));

TAA.cp.Parameters.Default = TAA.cp.Parameters.Default || {};
if(Parameters['Default Event Poses'] === undefined || Parameters['Default Event Poses'] === '' || Parameters['Default Event Poses'].length <= 0)
    TAA.cp.Parameters.Default = {};
else
    TAA.cp.Parameters.Default = TAA.cp.functions.loadEventPoses(JSON.parse(Parameters['Default Event Poses']));

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.getPoseCharacterById = function(id){
    var char = undefined;
    if(id === 0)
        char = $gamePlayer;
    else if(id < 0)
        char = $gamePlayer.followers().follower(Math.abs(id)-1);
    else
        char = $gameMap._events[id];
    return char;
};

TAA.cp.alias.Game_System = TAA.cp.alias.Game_System || {};
TAA.cp.alias.Game_System.initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    TAA.cp.alias.Game_System.initialize.call(this);
    this.initSavedEventPoses();
};

Game_System.prototype.initSavedEventPoses = function(){
    this._cpSavedEventPoses = {};
};

Game_System.prototype.loadEventPoseData = function(mapId, eventId){
    return this._cpSavedEventPoses[mapId + ':' + eventId];
};

Game_System.prototype.saveEventPoseData = function(eventId){
    if(!$dataMap) return;
    var mapId = $gameMap.mapId();
    var event = $gameMap._events[eventId];
    if(event === undefined) return;
    var obj = {};
    obj._cpPoseCycles = event._cpPoseCycles;
    obj._cpDefaultPose = event._cpDefaultPose;
    obj._cpDashPose = event._cpDashPose;
    obj._cpIdlePose = event._cpIdlePose;
    obj._cpCurrentPose = event._cpCurrentPose;
    obj._cpPreviousPose = event._cpPreviousPose;
    obj._cpAnimateWhileStill = event._cpAnimateWhileStill;
    obj._cpAllowIdle = event._cpAllowIdle;
    obj._cpPoseLibrary = event._cpPoseLibrary;
    obj._cpBalloonPoses = JSON.parse(JSON.stringify(event._cpBalloonPoses));
    obj._cpBalloonPosesEnabled = event._cpBalloonPosesEnabled;
    obj._cpBalloonPreviousState = event._cpBalloonPreviousState;
    obj._cpOriginalBalloonPoses = JSON.parse(JSON.stringify(event._cpOriginalBalloonPoses));
    this._cpSavedEventPoses[mapId + ':' + eventId] = obj;
};

Game_System.prototype.deleteEventPoseData = function(mapId, eventId){
    var key = mapId + ':' + eventId;
    if(this._cpSavedEventPoses[key] !== undefined && this._cpSavedEventPoses[key] !== null)
        delete this._cpSavedEventPoses[key];
};

Game_System.prototype.reloadEventPoses = function(eventId){
    if(!$dataMap) return;
    var event = $gameMap._events[eventId];
    if(event === undefined) return;
    event.clearPoseData();
    event.initializePoses();
};

Game_System.prototype.cpEnableEventPoses = function(eventId){
    if(isNaN(eventId) || eventId <= 0) return;
    var event = $gameMap._events[eventId];
    if(event === undefined) return;
    event.cpEnable();
};

Game_System.prototype.cpDisableEventPoses = function(eventId){
    if(isNaN(eventId) || eventId <= 0) return;
    var event = $gameMap._events[eventId];
    if(event === undefined) return;
    event.cpDisable();
};

Game_System.prototype.setPose = function(id, poseKey){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return;
    char.setPose(poseKey);
};

Game_System.prototype.setAnimatedPose = function(id, poseKey, cycles){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return;
    char.setAnimatedPose(poseKey, cycles);
};

Game_System.prototype.setDefaultPose = function(id, poseKey){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return;
    char.setReservedPose(poseKey, 'default');
};

Game_System.prototype.setDashPose = function(id, poseKey){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return;
    char.setReservedPose(poseKey, 'dash');
};

Game_System.prototype.setIdlePose = function(id, poseKey){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return;
    char.setReservedPose(poseKey, 'idle');
};

Game_System.prototype.restorePose = function(id){
    // restores previous pose
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return;
    char.restorePreviousPose();
};

Game_System.prototype.restoreAllActorsPoses = function(){
    var leader = this.getPoseCharacterById(0);
    leader.restorePreviousPose();
    var followers = $gamePlayer.followers()._data;
    for(var i=0; i<followers.length; i++){
        followers[i].restorePreviousPose();
    }
};

Game_System.prototype.resetPose = function(id){
    // restores DEFAULT pose
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return;
    char.resetPose();
};

Game_System.prototype.resetAllActorsPoses = function(){
    var leader = this.getPoseCharacterById(0);
    leader.resetPose();
    var followers = $gamePlayer.followers()._data;
    for(var i=0; i<followers.length; i++){
        followers[i].resetPose();
    }
};

Game_System.prototype.isPoseAvailable = function(id, poseKey){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.isPoseAvailable(poseKey);
};

Game_System.prototype.poseHasCustomPattern = function(id, poseKey){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.hasCustomPattern(poseKey);
};

Game_System.prototype.getCurrentPose = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.currentPoseKey();
};

Game_System.prototype.getDashPose = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.dashPoseKey();
};

Game_System.prototype.getIdlePose = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.idlePoseKey();
};

Game_System.prototype.getCurrentPoseSpeed = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.currentPose().Speed;
};

Game_System.prototype.enableIdle = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    char.enableIdlePose();
};

Game_System.prototype.enablePartyIdle = function(){
    var leader = this.getPoseCharacterById(0);
    leader.enableIdlePose();
    var followers = $gamePlayer.followers()._data;
    for(var i=0; i<followers.length; i++){
        followers[i].enableIdlePose();
    }
};

Game_System.prototype.disableIdle = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    char.disableIdlePose();
};

Game_System.prototype.disablePartyIdle = function(){
    var leader = this.getPoseCharacterById(0);
    leader.disableIdlePose();
    var followers = $gamePlayer.followers()._data;
    for(var i=0; i<followers.length; i++){
        followers[i].disableIdlePose();
    }
};

Game_System.prototype.isIdleEnabled = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.isIdleAllowed();
};

Game_System.prototype.overwriteBalloonPose = function(id, balloonId, poseKey){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    char.overwriteBalloonPose(balloonId, poseKey);
};

Game_System.prototype.resetBalloonPose = function(id, balloonId){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    char.resetBalloonPose(balloonId);
};

Game_System.prototype.resetBalloonPoseLibrary = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    char.resetAllBalloonPoses();
};

Game_System.prototype.enableBalloonPoses = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    char.enableBalloonPoses();
};

Game_System.prototype.disableBalloonPoses = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    char.disableBalloonPoses();
};

Game_System.prototype.isBalloonPoseEnabled = function(id){
    var char = this.getPoseCharacterById(id);
    if(char === undefined) return false;
    return char.isBalloonPoseEnabled();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// MV Plugin Commands.
TAA.cp.alias.Game_Interpreter = TAA.cp.alias.Game_Interpreter || {};
TAA.cp.alias.Game_Interpreter.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    TAA.cp.alias.Game_Interpreter.pluginCommand.call(this, command, args);
    if(command.toLowerCase() === 'setpose'){
        if(!isNaN(args[0]) && args[1] !== undefined && args[1] !== null && args[1].length > 0){
            var id = parseInt(args[0]);
            var poseKey = args[1];
            $gameSystem.setPose(id, poseKey);
        }
    }
    else if(command.toLowerCase() === 'setanimatedpose'){
        if(!isNaN(args[0]) && args[1] !== undefined && args[1] !== null && args[1].length > 0){
            var id = parseInt(args[0]);
            var poseKey = args[1];
            var cycles = undefined;
            if(!isNaN(args[2])) cycles = parseInt(args[2]);
            $gameSystem.setAnimatedPose(id, poseKey, cycles);
        }
    }
    else if(command.toLowerCase() === 'setdefaultpose'){
        if(!isNaN(args[0]) && args[1] !== undefined && args[1] !== null & args[1].length > 0){
            var id = parseInt(args[0]);
            var poseKey = args[1];
            $gameSystem.setDefaultPose(id, poseKey);
        }
    }
    else if(command.toLowerCase() === 'setdashpose'){
        if(!isNaN(args[0]) && args[1] !== undefined && args[1] !== null & args[1].length > 0){
            var id = parseInt(args[0]);
            var poseKey = args[1];
            $gameSystem.setDashPose(id, poseKey);
        }
    }
    else if(command.toLowerCase() === 'setidlepose'){
        if(!isNaN(args[0]) && args[1] !== undefined && args[1] !== null & args[1].length > 0){
            var id = parseInt(args[0]);
            var poseKey = args[1];
            $gameSystem.setIdlePose(id, poseKey);
        }
    }
    else if(command.toLowerCase() === 'idlepose'){
        if(!isNaN(args[0])){
            if(args[1].toLowerCase() === 'enable' || args[1].toLowerCase() === 'allow'){
                var id = parseInt(args[0]);
                $gameSystem.enableIdle(id);
            }
            else if(args[1].toLowerCase() === 'disable' || args[1].toLowerCase() === 'restrict'){
                var id = parseInt(args[0]);
                $gameSystem.disableIdle(id);
            }
        }
        else {
            if(args[0].toLowerCase() === 'party' || args[0].toLowerCase() === 'actors'){
                if(args[1].toLowerCase() === 'enable' || args[1].toLowerCase() === 'allow'){
                    $gameSystem.enablePartyIdle();
                }
                else if(args[1].toLowerCase() === 'disable' || args[1].toLowerCase() === 'restrict'){
                    $gameSystem.disablePartyIdle();
                }
            }
        }
    }
    else if(command.toLowerCase() === 'balloonpose'){
        if(args[0].toLowerCase() === 'set'){
            if(!isNaN(args[1]) && !isNaN(args[2]) && args[3] !== undefined && args[3].length > 0){
                var id = parseInt(args[1]);
                var balloonId = parseInt(args[2]);
                var poseKey = args[3];
                $gameSystem.overwriteBalloonPose(id, balloonId, poseKey);
            }
        }
        else if(args[0].toLowerCase() === 'reset'){
            if(!isNaN(args[1])){
                var id = parseInt(args[1]);
                if(!isNaN(args[2])){
                    var balloonId = parseInt(args[2]);
                    $gameSystem.resetBalloonPose(id, balloonId);
                }
                else{
                    $gameSystem.resetBalloonPoseLibrary(id);
                }
            }
        }
        else if(['enable', 'on', 'allow'].contains(args[0].toLowerCase())){
            if(!isNaN(args[1])){
                var id = parseInt(args[1]);
                $gameSystem.enableBalloonPoses(id);
            }
        }
        else if(['disable', 'off', 'block'].contains(args[0].toLowerCase())){
            if(!isNaN(args[1])){
                var id = parseInt(args[1]);
                $gameSystem.disableBalloonPoses(id);
            }
        }
    }
    else if(command.toLowerCase() === 'restorepose'){
        if(!isNaN(args[0])){
            var id = parseInt(args[0]);
            $gameSystem.restorePose(id);
        }
        else if(['actors', 'party'].contains(args[0].toLowerCase())){
            $gameSystem.restoreAllActorsPoses();
        }
    }
    else if(command.toLowerCase() === 'resetpose'){
        if(!isNaN(args[0])){
            var id = parseInt(args[0]);
            $gameSystem.resetPose(id);
        }
        else if(['actors', 'party'].contains(args[0].toLowerCase())){
            $gameSystem.resetAllActorsPoses();
        }
    }
    else if(command.toLowerCase() === 'saveeventposes'){
        if(!isNaN(args[0])){
            if(!$dataMap) return;
            var eventId = parseInt(args[0]);
            $gameSystem.saveEventPoseData(eventId);
        }
    }
    else if(command.toLowerCase() === 'deleteeventposes'){
        if(!isNaN(args[0]) && !isNaN(args[1])){
            var mapId = parseInt(args[0]);
            var eventId = parseInt(args[1]);
            $gameSystem.deleteEventPoseData(mapId, eventId);
        }
    }
    else if(command.toLowerCase() === 'reloadeventposes'){
        if(!isNaN(args[0])){
            if(!$dataMap) return;
            var eventId = parseInt(args[0]);
            $gameSystem.reloadEventPoses(eventId);
        }
    }
    else if(command.toLowerCase() === 'eventpose'){
        if(args[0] && args[0].toLowerCase() === 'enable' && !isNaN(args[1]) && parseInt(args[1] > 0)){
            var eventId = parseInt(args[1]);
            $gameSystem.cpEnableEventPoses(eventId);
        }
        else if(args[0] && args[0].toLowerCase() === 'disable' && !isNaN(args[1]) && parseInt(args[1]) > 0){
            var eventId = parseInt(args[1]);
            $gameSystem.cpDisableEventPoses(eventId);
        }
    }
};

//=============================================================================
// Plugin_Manager
//=============================================================================

// MZ Plugin Commands
if(Utils.RPGMAKER_NAME === 'MZ'){
    PluginManager.registerCommand(TAA.cp.PluginName, 'setPose', args => {
        const charType = args.charContext;
        var charId = parseInt(args.charId);
        const animate = args.animated === "true";
        const poseKey = args.poseKey;
        var cycles = parseInt(args.cycles);

        if(isNaN(charId) || charId <= 0 || !(['actor', 'event'].contains(charType))) return;
        if(charType === 'actor'){
            charId = (--charId) * -1;
        }
        if(animate === true){
            if(isNaN(cycles) || cycles <= 0) cycles = undefined;
            $gameSystem.setAnimatedPose(charId, poseKey, cycles);
        }
        else{
            $gameSystem.setPose(charId, poseKey);
        }
    });

    PluginManager.registerCommand(TAA.cp.PluginName, 'setReservedPose', args => {
        const charType = args.charContext;
        var charId = parseInt(args.charId);
        const poseType = args.poseType;
        const poseKey = args.poseKey;
        const trigger = args.triggerPose === 'true';

        if(isNaN(charId) || charId <= 0 || !(['actor', 'event'].contains(charType))) return;
        if(charType === 'actor'){
            charId = (--charId) * -1;
        }

        if(trigger === true) $gameSystem.setPose(charId, poseKey);

        switch(poseType){
            case 'default':
                $gameSystem.setDefaultPose(charId, poseKey);
                break;
            case 'dash':
                $gameSystem.setDashPose(charId, poseKey);
                break;
            case 'idle':
                $gameSystem.setIdlePose(charId, poseKey);
                break;
        }
    });

    PluginManager.registerCommand(TAA.cp.PluginName, 'idlePose', args => {
        const context = args.idleContext;
        var charId = parseInt(args.charId);
        const command = args.idleEnable === 'true';

        if(isNaN(charId) || charId <= 0 || !(['actor', 'party', 'event'].contains(context))) return;
        if(context === 'party'){
            if(command)
                $gameSystem.enablePartyIdle();
            else
                $gameSystem.disablePartyIdle();
            return;
        }
        if(context === 'actor'){
            charId = (--charId) * -1;
        }

        if(command)
            $gameSystem.enableIdle(charId);
        else
            $gameSystem.disableIdle(charId);
    });

    PluginManager.registerCommand(TAA.cp.PluginName, 'balloonPose', args => {
        const context = args.balloonContext;
        var charId = parseInt(args.charId);
        const command = args.balloonEnable === 'true';

        if(isNaN(charId) || charId <= 0 || !(['actor', 'party', 'event'].contains(context))) return;
        if(context === 'party'){
            if(command){
                $gameSystem.enableBalloonPoses(0);
                var followers = $gamePlayer.followers();
                for(var i=0; followers.length; i++){
                    var id = (i+1) * -1
                    $gameSystem.enableBalloonPoses(id);
                }
            }
            else{
                $gameSystem.disableBalloonPoses(0);
                var followers = $gamePlayer.followers();
                for(var i=0; followers.length; i++){
                    var id = (i+1) * -1
                    $gameSystem.disableBalloonPoses(id);
                }
            }
            return;
        }
        if(context === 'actor'){
            charId = (--charId) * -1;
        }

        if(command)
            $gameSystem.enableBalloonPoses(charId);
        else
            $gameSystem.disableBalloonPoses(charId);
    });

    PluginManager.registerCommand(TAA.cp.PluginName, 'setBalloonPoses', args => {
        const context = args.balloonContext;
        var charId = parseInt(args.charId);
        const balloonId = parseInt(args.balloonId);
        const poseKey = args.poseKey;

        if(isNaN(charId) || charId <= 0 || !(['actor', 'event'].contains(context)) || isNaN(balloonId)) return;
        if(context === 'actor'){
            charId = (--charId) * -1;
        }

        $gameSystem.overwriteBalloonPose(charId, balloonId, poseKey);
    });

    PluginManager.registerCommand(TAA.cp.PluginName, 'resetPose', args =>{
        const resetContext = args.resetContext;
        const poseContext = args.poseContext;
        var charId = parseInt(args.charId);
        const balloonId = parseInt(args.balloonId);

        if(isNaN(charId) || charId <= 0 || !(['Pose Library', 'Balloon Poses'].contains(resetContext)) || !(['actor', 'event', 'party'].contains(poseContext))) return;

        if(poseContext === 'party'){
            if(resetContext === 'Pose Library'){
                $gameSystem.resetAllActorsPoses();
            }
            else {
                if(isNaN(balloonId) || balloonId <= 0){
                    $gameSystem.resetBalloonPoseLibrary(0);
                    var followers = $gamePlayer.followers();
                    for(var i=0; followers.length; i++){
                        var id = (i+1) * -1
                        $gameSystem.resetBalloonPoseLibrary(id);
                    }
                }
                else{
                    $gameSystem.resetBalloonPose(0, balloonId);
                    var followers = $gamePlayer.followers();
                    for(var i=0; followers.length; i++){
                        var id = (i+1) * -1
                        $gameSystem.resetBalloonPose(id, balloonId);
                    }
                }
            }
        }

        if(poseContext === 'actor'){
            charId = (--charId) * -1;
        }

        if(resetContext === 'Pose Library'){
            $gameSystem.resetPose(charId);
        }
        else {
            if(isNaN(balloonId) || balloonId <= 0)
                $gameSystem.resetBalloonPose(charId, balloonId);
            else
                $gameSystem.resetBalloonPoseLibrary(charId);
        }
    });

    PluginManager.registerCommand(TAA.cp.PluginName, 'restorePose', args =>{
        const context = args.poseContext;
        var charId = parseInt(args.charId);

        if(isNaN(charId) || charId <= 0 || !(['actor', 'event', 'party'].contains(context))) return;
        if(context === 'party'){
            $gameSystem.restoreAllActorsPoses();
            return;
        }

        if(context === 'actor'){
            charId = (--charId) * -1;
        }

        $gameSystem.restorePose(charId);
    });

    PluginManager.registerCommand(TAA.cp.PluginName, 'eventPoses', args => {
        var eventId = parseInt(args.eventId);
        const command = args.eventPoseCommand;

        if(isNaN(eventId) || eventId <= 0 || !(['save', 'delete', 'reload'].contains(command))) return;
        switch(command){
            case 'save':
                $gameSystem.saveEventPoseData(eventId);
                break;
            case 'delete':
                if(!$gameMap) return;
                $gameSystem.deleteEventPoseData($gameMap.mapId(), eventId);
                break;
            case 'reload':
                $gameSystem.reloadEventPoses(eventId);
                break;
            case 'enable':
                $gameSystem.cpEnableEventPoses(eventId);
                break;
            case 'disable':
                $gameSystem.cpDisableEventPoses(eventId);
        }
    });
}

//=============================================================================
// ImageManager
//=============================================================================

ImageManager._discardCharQueue = [];
ImageManager._partyFiles = [];
ImageManager._eventIndex = [];
ImageManager._invalidCharFiles = [];

ImageManager.mvEncodeURI = function(str){
    return encodeURIComponent(str).replace(/%2F/g, "/");
};

ImageManager.addCharToCache = function(file){
    if(Utils.RPGMAKER_NAME === 'MZ')
        this.loadBitmap('img/characters/', file);
    else
        this.loadBitmap('img/characters/', file, undefined, false)
    if(this._discardCharQueue.contains(file))
        this._discardCharQueue.splice(this._discardCharQueue.indexOf(file), 1);
};

ImageManager.removeCharFromCache = function(file, hue){
    if(this.isCharCached()){
        if(Utils.RPGMAKER_NAME === 'MZ')
            this._cache["img/characters/" + file].destroy();
        else{
            var key = this._generateCacheKey('img/characters/' + this.mvEncodeURI(file) + '.png', hue);
            if(this._imageCache._items[key])
                this._imageCache._items[key].destroy();
        }
    }
};

ImageManager.isCharCached = function(file, hue){
    if(Utils.RPGMAKER_NAME === 'MZ'){
        const url = 'img/characters/' + Utils.encodeURI(file) + ".png";
        if(!this._cache[url])
            return false;
        return true;
    }
    if(!hue) hue = 0;
    var key = this._generateCacheKey('img/characters/' + this.mvEncodeURI(file) + '.png', hue);
    if(this._imageCache.get(key))
        return true;
    return false;
};

ImageManager.prepareCharDiscardQueue = function(){
    for(var i=0; i<this._eventIndex.length; i++){
        if(!(this._partyFiles.contains(this._eventIndex[i]))){
            this._discardCharQueue.push(this._eventIndex[i]);
        }
    }
};

ImageManager.registerCommonFiles = function(file, type){
    if(['Game_Player', 'Game_Follower'].contains(type))
        this._partyFiles.push(file);
    if(['Game_Event'].contains(type))
        this._eventIndex.push(file);
};

ImageManager.clearCharDiscardQueue = function(){
    var cache = this._imageCache;
    if(Utils.RPGMAKER_NAME === 'MZ')
        cache = this._cache;
    for(var i=0; i<this._discardCharQueue.length; i++){
        if(!cache[this._discardCharQueue[i]] || !this.isCharCached(this._discardCharQueue[i])) continue;
        cache[this._discardCharQueue[i]].destroy();
        this._eventIndex.splice(this._eventIndex.indexOf(this._discardCharQueue[i]), 1);
    }
    this._discardCharQueue = [];
};

var Yanfly = Yanfly || {};
if(Yanfly && Yanfly.Param && Yanfly.Param.UpdateDesktop){
    ImageManager.loadNormalBitmap = function(path, hue) {
        var key = this._generateCacheKey(path, hue);
        var bitmap = this._imageCache.get(key) || this.cache.getItem(key);
        if (!bitmap) {
            bitmap = Bitmap.load(decodeURIComponent(path));
            bitmap.addLoadListener(function() {
                bitmap.rotateHue(hue);
            });
            this._imageCache.add(key, bitmap);
            this.cache.setItem(key, bitmap);
        }else if(!bitmap.isReady()){
            bitmap.decode();
        }
    
        return bitmap;
    };
}

//=============================================================================
// Game_CharacterBase
//=============================================================================

TAA.cp.alias.CharBase = TAA.cp.alias.CharBase || {};
TAA.cp.alias.CharBase.initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function(){
    TAA.cp.alias.CharBase.initMembers.call(this);
    this._cpBlinkInterval = TAA.cp.Parameters.Global.BlinkInterval;
    this._cpBlinkRandomness = TAA.cp.Parameters.Global.BlinkRandomness;
    this._cpBlinkDuration = TAA.cp.Parameters.Global.BlinkDuration;
    this._cpBlinkCounter = this._cpBlinkInterval + Math.randomInt(this._cpBlinkRandomness);
    this._cpIdleWaitTime = TAA.cp.Parameters.Global.IdleWait;
    this._cpPatternCounter = 0;
    this._cpPatternCursor = -1;
    this._cpPoseCycles = -1;
    this._cpDefaultPose = 'default';
    this._cpDashPose = 'dash';
    this._cpIdlePose = 'idle';
    this._cpCurrentPose = 'default';
    this._cpPreviousPose = 'default';
    this._cpSpriteDirection = 0;
    this._cpAnimateWhileStill = false;
    this._cpAllowIdle = true;
    this._cpBalloonPoses = this._cpBalloonPoses || [];
    this._cpOriginalBalloonPoses = this._cpOriginalBalloonPoses || {};
    this._cpBalloonPosesEnabled = true;
    this._cpBalloonPreviousState = this._cpBalloonPreviousState || {};
    this._cpBalloonFrameCount = 0;
    this._cpPoseLibrary = {};
    this._cp8Directions = false;
    this._cpEnabled = true;
};

Game_CharacterBase.prototype.cpShouldShowImages = function(){
    return this._cpEnabled && !this._erased;
};

Game_CharacterBase.prototype.cpDisable = function(){
    this._cpEnabled = false;
};

Game_CharacterBase.prototype.cpEnable = function(){
    this._cpEnabled = true;
};

Game_CharacterBase.prototype.cpSpriteDirection = function(){
    return isNaN(this._cpSpriteDirection) ? 0 : this._cpSpriteDirection;
};

Game_CharacterBase.prototype.setReservedPose = function(poseKey, type){
    if(!this.isPoseAvailable(poseKey)) return;

    var isCurrent = false
    switch(type){
        case 'default':
            if(this.isDefaultPose()) isCurrent = true;
            this._cpDefaultPose = poseKey;
            break;
        case 'dash':
            if(this.isDashPose()) isCurrent = true;
            this._cpDashPose = poseKey;
            break;
        case 'idle':
            if(this.isIdlePose()) isCurrent = true;
            this._cpIdlePose = poseKey;
            break;
        default:
            return;
    }
    if(isCurrent) this.setPose(poseKey);
};

Game_CharacterBase.prototype.update8DirStatus = function(characterName){
    if(TAA.cp.Parameters.Global.Enable8Dir === true && characterName && characterName.match(/\[d8\]/i)){
        this._cp8Directions = true;
    }
    else{
        this._cp8Directions = false;
    }
};

TAA.cp.alias.CharBase.setImage = Game_CharacterBase.prototype.setImage;
Game_CharacterBase.prototype.setImage = function(characterName, characterIndex){
    if(characterName === this.characterName() && characterIndex === this.characterIndex()) {
        this.update8DirStatus(characterName);
        return;
    }
    // check if image file exists first, before setting image (prevents game crash)
    if(this.charImgExists(characterName)){
        this.update8DirStatus(characterName);
        TAA.cp.alias.CharBase.setImage.call(this, characterName, characterIndex);
    }
};

Game_CharacterBase.prototype.charImgExists = function(file){
    if(TAA.cp.Parameters.Global.CheckFiles !== true || file === "")
        return true;
    if(!file || ImageManager._invalidCharFiles.contains(file)){
        return false;
    }
    if(ImageManager.isCharCached(file)) return true;
    try{
		var url = "img/characters/" + file + ".png";
        var http = new XMLHttpRequest();
		if(Utils.RPGMAKER_NAME === 'MV' && !Decrypter.checkImgIgnore(url) && Decrypter.hasEncryptedImages){
			url = Decrypter.extToEncryptExt(url);
		}
		else if(Utils.RPGMAKER_NAME === 'MZ' && Utils.hasEncryptedImages()){
			url += "_";
		}
		http.open('HEAD', url, false);
		http.send();
		
        if(http.status >= 400){
            ImageManager._invalidCharFiles.push(file);
            return false;
        }
        ImageManager.addCharToCache(file);
        return true;
    } catch(e){
        ImageManager._invalidCharFiles.push(file);
        return false;
    }
};

Game_CharacterBase.prototype.cacheCharImgFiles = function(){
    if(this._cpPoseLibrary !== undefined && Object.keys(this._cpPoseLibrary).length > 0){
        var keys = Object.keys(this._cpPoseLibrary);
        for(var i=0; i<keys.length; i++){
            if(this._cpPoseLibrary[keys[i]] === undefined) continue;
            var pose = this._cpPoseLibrary[keys[i]];
            if(pose['Spritesheet'] !== undefined && pose['Spritesheet'].length > 0 && this.charImgExists(pose['Spritesheet'])){
                ImageManager.addCharToCache(pose['Spritesheet']);
                ImageManager.registerCommonFiles(pose['Spritesheet'], this.constructor.name);
            }
            if(pose['Blink'] !== undefined && pose['Blink'].length > 0 && this.charImgExists(pose['Blink'])){
                ImageManager.addCharToCache(pose['Blink']);
                ImageManager.registerCommonFiles(pose['Blink'], this.constructor.name);
            }
        }
    }
    if(this._cpBalloonPoses !== undefined && Object.keys(this._cpBalloonPoses).length > 0){
        var keys = Object.keys(this._cpBalloonPoses);
        for(var i=0; i<keys.length; i++){
            if(this._cpBalloonPoses[keys[i]] === undefined) continue;
            var pose = this._cpBalloonPoses[keys[i]];
            if(pose['Spritesheet'] !== undefined && pose['Spritesheet'].length > 0 && this.charImgExists(pose['Spritesheet'])){
                ImageManager.addCharToCache(pose['Spritesheet']);
                ImageManager.registerCommonFiles(pose['Spritesheet'], this.constructor.name);
            }
        }
    }
};

Game_CharacterBase.prototype.resetPose = function(){
    this.setPose(this._cpDefaultPose);
    this._cpAnimateWhileStill = false;
};

Game_CharacterBase.prototype.restorePreviousPose = function(){
    this.setPose(this._cpPreviousPose);
    this._cpAnimateWhileStill = false;
};

Game_CharacterBase.prototype.setPose = function(poseKey){
    if(poseKey === undefined || this.isCurrentPose(poseKey) || !this.isPoseAvailable(poseKey)) return;
    var pose = this.getPoseObj(poseKey);
    this.setImage(pose['Spritesheet'], pose['Index']);
    this._cpPreviousPose = this._cpCurrentPose;
    this._cpCurrentPose = poseKey;
    this._cpPoseCycles = -1;
    this._cpSpriteDirection = 0;
    if(this.hasCustomPattern(poseKey)){
        this._cpPatternCursor = Math.floor((pose.Pattern.length - 1) / 2);
        this._cpPatternCounter = 0;
        this.updateCpPosePattern();
    }
    else{
        this._cpPatternCursor = -1;
        this.resetCpPattern();
    }
};

Game_CharacterBase.prototype.setAnimatedPose = function(poseKey, cycles){
    this.setPose(poseKey);
    if(this._cpCurrentPose = poseKey){
        this._cpPatternCursor = -1;
        this._cpPatternCounter = 0;
        this._cpAnimateWhileStill = true;
        if(!isNaN(cycles) && cycles > 0)
            this._cpPoseCycles = cycles;
    }
    this.updateAnimation();
};

Game_CharacterBase.prototype.isIdleAllowed = function(){
    return this._cpAllowIdle;
};

Game_CharacterBase.prototype.enableIdlePose = function(){
    if(this.isPoseAvailable(this._cpIdlePose)) {
        this._cpAllowIdle = true;
        this.resetStopCount();
    }
};

Game_CharacterBase.prototype.disableIdlePose = function(){
    this._cpAllowIdle = false;
    if(this.isIdlePose())
        this.restorePreviousPose();
};

Game_CharacterBase.prototype.isContinuousAnimation = function(){
    return this._cpAnimateWhileStill;
};

Game_CharacterBase.prototype.isCurrentPose = function(poseKey){
    return this._cpCurrentPose === poseKey;
};

Game_CharacterBase.prototype.isPoseAvailable = function(poseKey){
    var pose = this.getPoseObj(poseKey);
    return (pose !== undefined && this.charImgExists(pose['Spritesheet']));
};

Game_CharacterBase.prototype.currentPoseKey = function(){
    return this._cpCurrentPose;
};

Game_CharacterBase.prototype.currentPoseObj = function(){
    return this.getPoseObj(this._cpCurrentPose);
};

Game_CharacterBase.prototype.dashPoseKey = function(){
    return this._cpDashPose;
};

Game_CharacterBase.prototype.idlePoseKey = function(){
    return this._cpIdlePose;
};

Game_CharacterBase.prototype.getPoseObj = function(poseKey){
    var balloonId = 0;
    if(poseKey !== undefined && poseKey.match(/^@balloon([0-9]+)/))
        balloonId = parseInt(RegExp.$1)
    if(balloonId === 0 || !this.hasBalloonPose(balloonId))
        return this._cpPoseLibrary[poseKey];
    else{
        var pose = this._cpBalloonPoses[balloonId];
        pose['Pose Key'] = poseKey;
        return pose;
    }
};

Game_CharacterBase.prototype.hasCustomPattern = function(poseKey){
    if(!this.isPoseAvailable(poseKey)) return false;
    var pose = this.getPoseObj(poseKey);;
    return pose['Pattern'].length > 0;
};

Game_CharacterBase.prototype.startBlink = function(){
    if(!this.cpShouldShowImages() || this._cpCurrentPose === undefined || this._cpPoseLibrary === undefined) return;
    var pose = this.currentPoseObj();
    if(pose === undefined || pose === null || pose['Blink'] === undefined || pose['Blink'].length <= 0) return;
    var char = pose['Blink'];
    var index = pose['Blink Index'];
    if(char.match(/\[d8\]/i) && this.is8DirChar()){
        if(this._characterIndex < 4)
            index = index % 4;
        else
            index = index % 4 + 4;
    }
    this.setImage(char, index);
    this._cpBlinkCounter = this._cpBlinkDuration;
};

Game_CharacterBase.prototype.endBlink = function(){
    var pose = this.currentPoseObj();
    if(pose === undefined || pose === null) return;
    var char = pose['Spritesheet'];
    var index = pose['Index'];
    if(char.match(/\[d8\]/i) && this.is8DirChar()){
        if(this._characterIndex < 4)
            index = index % 4;
        else
            index = index % 4 + 4;
    }
    this.setImage(char, index);
    this._cpBlinkCounter = this._cpBlinkInterval + Math.randomInt(this._cpBlinkRandomness);
};

Game_CharacterBase.prototype.isBlinking = function(){
    if(!this.cpShouldShowImages() || this._cpCurrentPose === undefined || this._cpPoseLibrary === undefined) return false;
    var pose = this.currentPoseObj();
    if(pose === undefined || pose === null || pose['Blink'] === undefined || pose['Blink'].length <= 0) return false;
    if(this.is8DirChar())
        return (this._characterName === pose['Blink'] && this._characterIndex % 4 === pose['Blink Index'] % 4);
    return (this._characterName === pose['Blink'] && this._characterIndex === pose['Blink Index']);
};

Game_CharacterBase.prototype.shouldBlink = function(){
    if(!this.cpShouldShowImages()) return false;
    var pose = this.currentPoseObj();
    if(pose === undefined || pose['Blink'] === '' || !this.charImgExists(pose['Blink']))
        return false;
    if(!this.isBlinking()){
        if(this._cpBlinkCounter === 0)
            return true;
        else
            return false;
    }
    return false;
};

Game_CharacterBase.prototype.shouldUnblink = function(){
    if(this.isBlinking()){
        if(this._cpBlinkCounter === 0)
            return true;
        else
            return false;
    }
    return false;
};

Game_CharacterBase.prototype.isDefaultPose = function(){
    return this.isCurrentPose(this._cpDefaultPose);
};

Game_CharacterBase.prototype.isDashPose = function(){
    return this.isCurrentPose(this._cpDashPose);
};

Game_CharacterBase.prototype.isIdlePose = function(){
    return this.isCurrentPose(this._cpIdlePose);
};

Game_CharacterBase.prototype.isIdleEnough = function(){
    if(!this.cpShouldShowImages() || !this.isPoseAvailable(this._cpIdlePose) || !this.isIdleAllowed()) return false;
    return !this.isIdlePose() && this._stopCount > this._cpIdleWaitTime;
};

Game_CharacterBase.prototype.shouldDash = function(){
    return (this.cpShouldShowImages() && this.isMoving() && this.isDashing() && this.isPoseAvailable(this._cpDashPose));
};

Game_CharacterBase.prototype.updateDashPose = function(){
    if(!this.isDashPose() && this.shouldDash()){
        this.setPose(this._cpDashPose);
    }
    else if(this.isDashPose() && ((!this.isMoving() && this.checkStop(2)) || (!this.isDashing() && this.isMoving()))){
        this.resetPose();
    }
};

Game_CharacterBase.prototype.updateIdlePose = function(){
    if(this.isIdleEnough() && this.isPoseAvailable(this._cpIdlePose)){
        this.setAnimatedPose(this._cpIdlePose);
    }
};

Game_CharacterBase.prototype.updateBlinking = function(){
    if(this.shouldBlink())
        this.startBlink();
    else if(this.shouldUnblink())
        this.endBlink();
    else if(this._cpBlinkCounter > 0)
        this._cpBlinkCounter--;
};

Game_CharacterBase.prototype.updateBalloonFrameCount = function(){
    if(this.isBalloonPosePlaying()) {
        if(this._cpBalloonFrameCount > 0)
            this._cpBalloonFrameCount--;
        else
            this.endBalloonPose();
    }
};

TAA.cp.alias.CharBase.updateAnimation = Game_CharacterBase.prototype.updateAnimation;
Game_CharacterBase.prototype.updateAnimation = function(){
    if(this.hasCustomPattern(this._cpCurrentPose) && this.cpCustomPatternNeeded()) 
        this.updateCpAnimation();
    else
        TAA.cp.alias.CharBase.updateAnimation.call(this);
    this.updateDashPose();
    this.updateIdlePose();
    this.updateBlinking();
    this.updateBalloonFrameCount();
};

Game_CharacterBase.prototype.cpCustomPatternNeeded = function(){
    if((this.isMoving() && this.hasWalkAnime()) || (!this.isMoving() && !this.checkStop(1)) || this.isContinuousAnimation()){
        return true;
    }
    else if((this.hasStepAnime() || !this.isOriginalPattern())){
        return true;
    }
    return false;
};

Game_CharacterBase.prototype.updateCpAnimation = function(){
    if(this._cpPoseCycles === 0){
        this.resetPose();
    }
    if(!this.hasStepAnime() && this._stopCount > 0 && !this.isContinuousAnimation()){
        this.resetPattern();
    }
    else if(this._cpPatternCounter > 0) {
        this._cpPatternCounter--;
    }
    else this.updateCpPattern();
};

Game_CharacterBase.prototype.updateCpPosePattern = function(){
    var pose = this.currentPoseObj();
    var pattern = pose['Pattern'][this._cpPatternCursor];
    if(isNaN(pattern)){
        if(pattern !== undefined && pattern.match(/(?:d([12346789]))?(?:i([0-9]+))?/i)){
            var d = isNaN(RegExp.$1) ? 0 : parseInt(RegExp.$1);
            var index = isNaN(RegExp.$2) ? -1 : parseInt(RegExp.$2);
            if(d > 0){ 
                this._cpSpriteDirection = d;
            }
            if(index >= 0) this._pattern = index;
        }
    }
    else
        this._pattern = parseInt(pattern);
    this._cpPatternCounter = pose['Speed'];
};

Game_CharacterBase.prototype.updateCpPattern = function(){
    var pose = this.currentPoseObj();
    this._cpPatternCursor = (this._cpPatternCursor + 1) % pose['Pattern'].length;
    this.updateCpPosePattern();
    var cursor = (this._cpPatternCursor + 1) % pose['Pattern'].length;
    if(cursor === 0 && this._cpPatternCursor >= 0) this._cpPoseCycles--;
};

TAA.cp.alias.CharBase.updatePattern = Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function(){
    if(this.hasCustomPattern(this.currentPoseKey()) && this.cpCustomPatternNeeded()){
        this.updateCpAnimation();
    }
    else
        TAA.cp.alias.CharBase.updatePattern.call(this);
};

TAA.cp.alias.CharBase.updateAnimationCount = Game_CharacterBase.prototype.updateAnimationCount;
Game_CharacterBase.prototype.updateAnimationCount = function(){
    if(this.hasCustomPattern(this.currentPoseKey())){
        this.updatePattern();
    }
    else
        TAA.cp.alias.CharBase.updateAnimationCount.call(this);
};

TAA.cp.alias.CharBase.straighten = Game_CharacterBase.prototype.straighten;
Game_CharacterBase.prototype.straighten = function(){
    if(this.isDashPose()) this.restorePreviousPose();
    TAA.cp.alias.CharBase.straighten.call(this);
};

TAA.cp.alias.CharBase.resetPattern = Game_CharacterBase.prototype.resetPattern;
Game_CharacterBase.prototype.resetPattern = function(){
    if(this.isDashPose()){
        this.restorePreviousPose();
    }
    if(this.hasCustomPattern(this.currentPoseKey()) && this.currentPoseObj() !== undefined){
        this.resetCpPattern();
    }
    else
        TAA.cp.alias.CharBase.resetPattern.call(this);
};

Game_CharacterBase.prototype.resetCpPattern = function(){
    var pose = this.currentPoseObj();
    var pat = Math.floor((pose.Pattern.length-1) / 2);
    this._cpPatternCursor = pat;
    this.updateCpPosePattern();
};

TAA.cp.alias.CharBase.resetStopCount = Game_CharacterBase.prototype.resetStopCount;
Game_CharacterBase.prototype.resetStopCount = function(){
    TAA.cp.alias.CharBase.resetStopCount.call(this);
    if(this.isIdlePose()){
        this.restorePreviousPose();
    }
};

Game_CharacterBase.prototype.isBalloonPoseEnabled = function(){
    return this._cpBalloonPosesEnabled;
};

Game_CharacterBase.prototype.enableBalloonPoses = function(){
    this._cpBalloonPosesEnabled = true;
};

Game_CharacterBase.prototype.disableBalloonPoses = function(){
    this._cpBalloonPosesEnabled = false;
};

Game_CharacterBase.prototype.hasBalloonPose = function(balloonId){
    return (this._cpBalloonPoses[balloonId] !== null && this._cpBalloonPoses[balloonId] !== undefined);
};

Game_CharacterBase.prototype.setBalloonPose = function(balloonId){
    var balloonPose = this._cpBalloonPoses[balloonId];
    if(balloonPose === undefined || balloonPose === null || !this.charImgExists(balloonPose['Spritesheet'])) return;
    if(Object.keys(this._cpBalloonPreviousState) <= 0){
        this._cpBalloonPreviousState = {};
        this._cpBalloonPreviousState.direction = this._direction;
        this._cpBalloonPreviousState.spriteDirection = this._cpSpriteDirection;
        this._cpBalloonPreviousState.pattern = this._pattern;
        this._cpBalloonPreviousState.patternCursor = this._cpPatternCursor;
        this._cpBalloonPreviousState.patternCounter = this._cpPatternCounter;
        this._cpBalloonPreviousState.poseCycles = this._cpPoseCycles;
        this._cpBalloonPreviousState.animate = this._cpAnimateWhileStill;
        this._cpBalloonPreviousState.previousPose = this._cpCurrentPose;
    }
    this.setImage(balloonPose['Spritesheet'], balloonPose['Index']);
    this._cpCurrentPose = "@balloon" + balloonId;
    if(balloonPose.Pattern.length > 0){
        this._cpPatternCursor = -1;
        this._cpPoseCycles = -1;
        this._cpPatternCounter = 0;
        this._cpAnimateWhileStill = true;
        this.updateCpPattern();
    }
    this.update();
};

Game_CharacterBase.prototype.endBalloonPose = function(){
    var pose = this.getPoseObj(this._cpBalloonPreviousState.previousPose);
    if(pose === undefined) pose = this.getPoseObj(this._cpDefaultPose);
    this._direction = this._cpBalloonPreviousState.direction;
    this._cpSpriteDirection = this._cpBalloonPreviousState.spriteDirection;
    this._pattern = this._cpBalloonPreviousState.pattern;
    this._cpPatternCursor = this._cpBalloonPreviousState.patternCursor;
    this._cpPatternCounter = this._cpBalloonPreviousState.patternCounter;
    this._cpPoseCycles = this._cpBalloonPreviousState.poseCycles;
    this._cpAnimateWhileStill = this._cpBalloonPreviousState.animate;
    this._cpCurrentPose = this._cpBalloonPreviousState.previousPose;
    this._cpBalloonPreviousState = {};
    this.setImage(pose['Spritesheet'], pose['Index']);
};

Game_CharacterBase.prototype.setBalloonId = function(balloonId){
    this._balloonId = balloonId;
};

TAA.cp.alias.CharBase.startBalloon = Game_CharacterBase.prototype.startBalloon;
Game_CharacterBase.prototype.startBalloon = function(){
    if(TAA.cp.Parameters.Global.BalloonPoses && this.isBalloonPoseEnabled() && this.hasBalloonPose(this._balloonId)){
        this._cpBalloonFrameCount = 80;
        this.resetStopCount();
        this.setBalloonPose(this._balloonId);
    }
    if(Utils.RPGMAKER_NAME === 'MZ') this._balloonId = 0;
    TAA.cp.alias.CharBase.startBalloon.call(this);
};

Game_CharacterBase.prototype.isBalloonPosePlaying = function(){
    return this._cpCurrentPose.match(/^@balloon[0-9]+/);
};

TAA.cp.alias.CharBase.endBalloon = Game_CharacterBase.prototype.endBalloon;
Game_CharacterBase.prototype.endBalloon = function(){
    if(this.isBalloonPosePlaying()){
        this.endBalloonPose();
    }
    TAA.cp.alias.CharBase.endBalloon.call(this);
};

Game_CharacterBase.prototype.overwriteBalloonPose = function(balloonId, poseKey){
    if(!this.isPoseAvailable(poseKey)) return;
    var pose = this.getPoseObj(poseKey);
    this._cpBalloonPoses[balloonId]['Spritesheet'] = pose['Spritesheet'];
    this._cpBalloonPoses[balloonId]['Index'] = pose['Index'];
    this._cpBalloonPoses[balloonId]['Speed'] = pose['Speed'];
    this._cpBalloonPoses[balloonId]['Pattern'] = pose['Pattern'];
};

Game_CharacterBase.prototype.resetBalloonPose = function(balloonId){
    if(this._cpOriginalBalloonPoses[balloonId] === undefined || this._cpOriginalBalloonPoses[balloonId] === null) return;
    this._cpBalloonPoses[balloonId] = this._cpOriginalBalloonPoses[balloonId];
};

Game_CharacterBase.prototype.resetAllBalloonPoses = function(){
    this._cpBalloonPoses = [];
    this._cpBalloonPoses = JSON.parse(JSON.stringify(this._cpOriginalBalloonPoses));
};

TAA.cp.alias.CharBase.isOriginalPattern = Game_CharacterBase.prototype.isOriginalPattern;
Game_CharacterBase.prototype.isOriginalPattern = function(){
    if(this.hasCustomPattern(this._cpCurrentPose)){
        var pose = this.currentPoseObj();
        return this._cpPatternCursor === Math.floor((pose.Pattern.length - 1) / 2);
    }
    else
        return TAA.cp.alias.CharBase.isOriginalPattern.call(this);
};

// Functions to allow sprites with more than 3 frames for each direction
TAA.cp.alias.CharBase.maxPattern = Game_CharacterBase.prototype.maxPattern;
Game_CharacterBase.prototype.maxPattern = function(){
    var pose = this.currentPoseObj();
    if(pose !== undefined && pose['Spritesheet'] !== undefined && pose['Spritesheet'].length > 0 && pose['Spritesheet'].match(/\[f(\d+)\]/i)){
        var frames = parseInt(RegExp.$1);
        if(!isNaN(frames) && frames > 0) return ++frames;
    }
    return TAA.cp.alias.CharBase.maxPattern.call(this);
};

TAA.cp.alias.CharBase.pattern = Game_CharacterBase.prototype.pattern;
Game_CharacterBase.prototype.pattern = function(){
    var frames = this.maxPattern();
    if(frames !== 4)
        return this._pattern < (frames - 1) ? this._pattern : 1;
    return TAA.cp.alias.CharBase.pattern.call(this);
};

// Functions to allow for 8 directions
Game_CharacterBase.prototype.is8DirChar = function(){
    return this._cp8Directions === true;
};

Game_CharacterBase.prototype.update8DirIndex = function(){
    if(this._direction % 2 === 1 && this._characterIndex / 4 < 1)
        this._characterIndex += 4;
    else if(this.is8DirChar() && this._direction % 2 === 0 && this._characterIndex / 4 >= 1)
        this._characterIndex -= 4;
};

TAA.cp.alias.CharBase.moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function(d){
    if(d % 2 === 0){
        TAA.cp.alias.CharBase.moveStraight.call(this, d);
    }
    else{
        switch(d){
            case 1:
                this.moveDiagonally(4, 2);
                break;
            case 3:
                this.moveDiagonally(6, 2);
                break;
            case 7:
                this.moveDiagonally(4, 8);
                break;
            case 9:
                this.moveDiagonally(6, 8);
                break;
            default:
                this.setDirection(d);
        }
    }
};

TAA.cp.alias.CharBase.moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function(horz, vert){
    TAA.cp.alias.CharBase.moveDiagonally.call(this, horz, vert);
    if(TAA.cp.Parameters.Global.Enable8Dir && this.is8DirChar()){
        if(horz === 4){
            if(vert === 8)
                this.setDirection(7);
            else if(vert === 2)
                this.setDirection(1);
            else
                this.setDirection(8);
        }
        else if(horz === 6){
            if(vert === 8)
                this.setDirection(9);
            else if(vert === 2)
                this.setDirection(3);
            else
                this.setDirection(6);
        }
        else if(vert === 8)
            this.setDirection(8);
        else 
            this.setDirection(2);
    }
    if(TAA.cp.Parameters.Global.DiagTriggerTouch)
        this.checkEventTriggerTouchFront(this.direction());
};

TAA.cp.alias.CharBase.canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d){
    if(this._direction % 2 === 0 || !this.is8DirChar() || TAA.cp.Parameters.Global.Enable8Dir !== true)
        return TAA.cp.alias.CharBase.canPass.call(this, x, y, d);
    else{
        switch(d){
            case 1:
                return this.canPassDiagonally(x, y, 4, 2);
            case 3:
                return this.canPassDiagonally(x, y, 6, 2);
            case 7:
                return this.canPassDiagonally(x, y, 4, 8);
            case 9:
                return this.canPassDiagonally(x, y, 6, 8);
            default:
                return TAA.cp.alias.CharBase.canPass.call(this, x, y, d);
        }
    }
};

Game_CharacterBase.prototype.set8DirectionFromCoordinates = function(x, y){
    if(x < 0 && y < 0)
        this.setDirection(1);
    else if(x > 0 && y < 0)
        this.setDirection(3);
    else if(x < 0 && y > 0)
        this.setDirection(7);
    else if(x > 0 && y > 0)
        this.setDirection(9);
};

TAA.cp.alias.CharBase.jump = Game_CharacterBase.prototype.jump;
Game_CharacterBase.prototype.jump = function(xPlus, yPlus){
    TAA.cp.alias.CharBase.jump.call(this, xPlus, yPlus);
    if(this.is8DirChar())
        this.set8DirectionFromCoordinates(xPlus, yPlus);
};

TAA.cp.alias.CharBase.setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function(d){
    if(!this.is8DirChar() && (d % 2 === 1 || d === 5))
        d = (d + 1) % 8 + 2;
    TAA.cp.alias.CharBase.setDirection.call(this, d);
    this.update8DirIndex();
};

//=============================================================================
// Game_Character
//=============================================================================

TAA.cp.alias.Game_Character = TAA.cp.alias.Game_Character || {};
TAA.cp.alias.Game_Character.turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
Game_Character.prototype.turnTowardCharacter = function(character){
    var sx = this.deltaXFrom(character.x);
    var sy = this.deltaYFrom(character.y);
    if(this.is8DirChar() && Math.abs(sx) > 0 && Math.abs(sy) > 0){
        this.set8DirectionFromCoordinates(sx, sy);
    }
    else
        TAA.cp.alias.Game_Character.turnTowardCharacter.call(this, character);
};

TAA.cp.alias.Game_Character.turnAwayFromCharacter = Game_Character.prototype.turnAwayFromCharacter;
Game_Character.prototype.turnAwayFromCharacter = function(character){
    var sx = this.deltaXFrom(character.x) * -1;
    var sy = this.deltaYFrom(character.y) * -1;
    if(this.is8DirChar() && Math.abs(sx) > 0 && Math.abs(sy) > 0){
        this.set8DirectionFromCoordinates(sx, sy);
    }
    else
        TAA.cp.alias.Game_Character.turnAwayFromCharacter.call(this, character);
};

Game_Character.prototype.turnRight45 = function(){
    switch(this.direction()){
        case 1:
            this.setDirection(4);
            break;
        case 4:
            this.setDirection(7);
            break;
        case 7:
            this.setDirection(8);
            break;
        case 8:
            this.setDirection(9);
            break;
        case 9:
            this.setDirection(6);
            break;
        case 6:
            this.setDirection(3);
            break;
        case 3:
            this.setDirection(2);
            break;
        case 2:
            this.setDirection(1);
            break;
    }
};

Game_Character.prototype.turnLeft45 = function(){
    switch(this.direction()){
        case 1:
            this.setDirection(2);
            break;
        case 2:
            this.setDirection(3);
            break;
        case 3:
            this.setDirection(6);
            break;
        case 6:
            this.setDirection(9);
            break;
        case 9:
            this.setDirection(8);
            break;
        case 8:
            this.setDirection(7);
            break;
        case 7:
            this.setDirection(4);
            break;
        case 4:
            this.setDirection(1);
            break;
    }
};

TAA.cp.alias.Game_Character.turnRandom = Game_Character.prototype.turnRandom;
Game_Character.prototype.turnRandom = function(){
    if(this.is8DirChar()){
        var d = Math.randomInt(9) + 1;
        if(d === 5) d = 2;
        this.setDirection(d);
    }
    else
        TAA.cp.alias.Game_Character.turnRandom.call(this);
};

Game_Character.prototype.findDirUpdateBestIndex = function(nodeList){
    var bestIndex = 0;
    for(var i = 0; i<nodeList.length; i++){
        if(nodeList[i].f < nodeList[bestIndex].f)
            bestIndex = i;
    }
    return bestIndex;
};

TAA.cp.alias.Game_Character.findDirectionTo = Game_Character.prototype.findDirectionTo;
Game_Character.prototype.findDirectionTo = function(goalX, goalY){
    if(TAA.cp.Parameters.Global.Enable8Dir === false){
        return TAA.cp.alias.Game_Character.findDirectionTo.call(this, goalX, goalY);
    }
    else{
        var searchLimit = this.searchLimit();
        var mapWidth = $gameMap.width();
        var nodeList = [];
        var openList = [];
        var closedList = [];
        var start = {};
        var best = start;
        
        if(this.x === goalX && this.y === goalY)
            return 0;

        start.parent = null;
        start.x = this.x;
        start.y = this.y;
        start.g = 0;
        start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
        nodeList.push(start);
        openList.push(start.y * mapWidth + start.x);

        while(nodeList.length > 0){
            var bestIndex = this.findDirUpdateBestIndex(nodeList);
            var current = nodeList[bestIndex];
            var x1 = current.x;
            var y1 = current.y;
            var pos1 = y1 * mapWidth + x1;
            var g1 = current.g;

            nodeList.splice(bestIndex, 1);
            openList.splice(openList.indexOf(pos1), 1);
            closedList.push(pos1);

            if(current.x === goalX && current.y === goalY) {
                best = current;
                break;
            }

            if(g1 >= searchLimit)
                continue;
            
            for(var j=1; j<10; j++){
                if(j === 5) continue;
                var d = j;
                var x2 = $gameMap.roundXWithDirection(x1, d);
                var y2 = $gameMap.roundYWithDirection(y1, d);
                var pos2 = y2 * mapWidth + x2;

                if(closedList.contains(pos2) || !this.canPass(x1, y1, d)){
                    continue;
                }

                var g2 = g1 + 1;
                var index2 = openList.indexOf(pos2);

                if(index2 < 0 || g2 < nodeList[index2].g){
                    var neighbor;
                    if(index2 >= 0){
                        neighbor = nodeList[index2];
                    }
                    else{
                        neighbor = {};
                        nodeList.push(neighbor);
                        openList.push(pos2);
                    }
                    neighbor.parent = current;
                    neighbor.x = x2;
                    neighbor.y = y2;
                    neighbor.g = g2;
                    neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
                    if(!best || neighbor.f - neighbor.g < best.f - best.g){
                        best = neighbor;
                    }
                }
            }
        }

        var node = best;
        while(node.parent && node.parent !== start){
            node = node.parent;
        }
        var deltaX1 = $gameMap.deltaX(node.x, start.x);
        var deltaY1 = $gameMap.deltaY(node.y, start.y);
        if(deltaX1 < 0){
            if(deltaY1 < 0)
                return 7;
            else if(deltaY1 > 0)
                return 1;
            else
                return 4;
        }
        else if(deltaX1 > 0){
            if(deltaY1 < 0)
                return 9;
            else if(deltaY1 > 0)
                return 3;
            else
                return 6;
        }
        else if(deltaY1 > 0)
            return 2;
        else if(deltaY1 < 0)
            return 8;

        var deltaX2 = this.deltaXFrom(goalX);
        var deltaY2 = this.deltaYFrom(goalY);
        if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
            return deltaX2 > 0 ? 4 : 6;
        } else if (deltaY2 !== 0) {
            return deltaY2 > 0 ? 8 : 2;
        }

        return 0;
    }
};

//=============================================================================
// Game_Player
//=============================================================================

TAA.cp.alias.Game_Player = TAA.cp.alias.Game_Player || {};
TAA.cp.alias.Game_Player.refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function(){
    this.initializePoses();
    var actor = $gameParty.leader();
    if(actor && this.isPoseAvailable(actor._cpCurrentPose)){
        this.setPose(actor._cpCurrentPose);
        if(actor.followers().isVisible())
            actor.followers().refresh();
    }
    else
        TAA.cp.alias.Game_Player.refresh.call(this);
};

Game_Player.prototype.pattern = function(){
    return Game_CharacterBase.prototype.pattern.call(this);
};

Game_Player.prototype.initializePoses = function(){
    var actor = $gameParty.leader();
    if(actor && TAA.cp.Parameters.Actor[actor.actorId()]){
        this._cpPoseLibrary = TAA.cp.Parameters.Actor[actor.actorId()].Poses;
        if(this._cpPoseLibrary.default['Spritesheet'] === ''){
            this._cpPoseLibrary.default['Spritesheet'] = actor.characterName();
            this._cpPoseLibrary.default['Index'] = actor.characterIndex();
        }
        if(TAA.cp.Parameters.Actor[actor.actorId()].Balloons !== null){
            this._cpBalloonPoses = TAA.cp.Parameters.Actor[actor.actorId()].Balloons || [];
            this._cpOriginalBalloonPoses = JSON.parse(JSON.stringify(this._cpBalloonPoses));
        }
        this.cacheCharImgFiles();
    }
};

TAA.cp.alias.Game_Player.getInputDirection = Game_Player.prototype.getInputDirection;
Game_Player.prototype.getInputDirection = function(){
    if(TAA.cp.Parameters.Global.Enable8Dir === true)
        return Input.dir8;
    return TAA.cp.alias.Game_Player.getInputDirection.call(this);
};

TAA.cp.alias.Game_Player.moveStraight = Game_Player.prototype.moveStraight;
Game_Player.prototype.moveStraight = function(d){
    if(d % 2 === 0){
        TAA.cp.alias.Game_Player.moveStraight.call(this, d);
    }
    else{
        switch(d){
            case 1:
                this.moveDiagonally(4, 2);
                break;
            case 3:
                this.moveDiagonally(6, 2);
                break;
            case 7:
                this.moveDiagonally(4, 8);
                break;
            case 9:
                this.moveDiagonally(6, 8);
                break;
            default:
                this.setDirection(d);
        }
    }
};

//=============================================================================
// Game_Follower
//=============================================================================

TAA.cp.alias.Game_Follower = TAA.cp.alias.Game_Follower || {};
TAA.cp.alias.Game_Follower.refresh = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function(){
    TAA.cp.alias.Game_Follower.refresh.call(this);
    if(this.isVisible()){
        this.cpEnable();
        this.initializePoses();
    }
    else{
        this.cpDisable();
    }
};

Game_Follower.prototype.initializePoses = function(){
    var actor = this.actor();
    if(actor === undefined) return;
    if(TAA.cp.Parameters.Actor[actor.actorId()] !== null && TAA.cp.Parameters.Actor[actor.actorId()] !== undefined){
        this._cpPoseLibrary = TAA.cp.Parameters.Actor[actor.actorId()].Poses;
        if(this._cpPoseLibrary !== undefined && this._cpPoseLibrary.default['Spritesheet'] === ''){
            this._cpPoseLibrary.default['Spritesheet'] = actor.characterName();
            this._cpPoseLibrary.default['Index'] = actor.characterIndex();
        }
        if(TAA.cp.Parameters.Actor[actor.actorId()].Balloons !== null){
            this._cpBalloonPoses = TAA.cp.Parameters.Actor[actor.actorId()].Balloons || [];
            this._cpOriginalBalloonPoses = JSON.parse(JSON.stringify(this._cpBalloonPoses));
        }
        this.cacheCharImgFiles();
    }
};

TAA.cp.alias.Game_Follower.realMoveSpeed = Game_Follower.prototype.realMoveSpeed;
Game_Follower.prototype.realMoveSpeed = function() {
    let speed = 4;
    if(TAA.cp.Parameters.Global.Enable8Dir)
        speed = $gamePlayer.realMoveSpeed();
    else{
        speed = TAA.cp.alias.Game_Follower.realMoveSpeed.call(this);
        if(this.isDashing())
            speed--;
    }
    return speed;
};

Game_Follower.prototype.isDashing = function(){
    return $gamePlayer.isDashing();
};

//=============================================================================
// Game_Event
//=============================================================================

TAA.cp.alias.Game_Event = TAA.cp.alias.Game_Event || {};
TAA.cp.alias.Game_Event.initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId){
    TAA.cp.alias.Game_Event.initialize.call(this, mapId, eventId);
    this._cpAutoSavePoses = this._cpAutoSavePoses === true;
    if(this._pageIndex >= 0) this.initializePoses();
    var savedPoses = $gameSystem.loadEventPoseData(mapId, eventId);
    if(savedPoses !== undefined && savedPoses !== null){
        this.loadSavedPoses(savedPoses);
    }
};

Game_Event.prototype.loadSavedPoses = function(savedData){
    this._cpPoseCycles = savedData._cpPoseCycles;
    this._cpDefaultPose = savedData._cpDefaultPose;
    this._cpDashPose = savedData._cpDashPose;
    this._cpIdlePose = savedData._cpIdlePose;
    this._cpCurrentPose = savedData._cpCurrentPose;
    this._cpPreviousPose = savedData._cpPreviousPose;
    this._cpAnimateWhileStill = savedData._cpAnimateWhileStill;
    this._cpAllowIdle = savedData._cpAllowIdle;
    this._cpPoseLibrary = savedData._cpPoseLibrary;
    this._cpBalloonPoses = JSON.parse(JSON.stringify(savedData._cpBalloonPoses));
    this._cpOriginalBalloonPoses = JSON.parse(JSON.stringify(savedData._cpOriginalBalloonPoses));
    this._cpBalloonPosesEnabled = savedData._cpBalloonPosesEnabled;
    this._cpBalloonPreviousState = savedData._cpBalloonPreviousState;
};

TAA.cp.alias.Game_Event.refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function(){
    TAA.cp.alias.Game_Event.refresh.call(this);
};

Game_Event.prototype.clearPoseData = function(){
    this._cpPoseLibrary = {};
    this._cpBalloonPoses = [];
    this._cpOriginalBalloonPoses = [];
    this._cpCurrentPose = 'default';
    this._cpDashPose = 'dash';
    this._cpIdlePose = 'idle';
};

Game_Event.prototype.initializePoses = function(){
    this.loadDefaultPoses();
    this.loadPosesFromNotes();
    this.loadPosesFromComments();
    this.cacheCharImgFiles();
};

Game_Event.prototype.loadPosesFromNotes = function(){
    var notes = this.event().note;
    if(notes.match(/<TAA_CP:\s*(?:,?noDefaults\s*|,?\s*default:[^\s<>,]+|,?\s*savePose:(?:false|true)|,?\s*dash:[^\s<>,]+|,?\s*idle:[^\s<>,]+|,?\s*lib:[^\s<>,]+(?:,\s*[^\s<>,]+)*|,?\s*balloon[s]?:[0-9]+(?:,\s*[0-9]+)*|,?\s*enable:(?:false|true))+>/i)){
        if(notes.match(/<TAA_CP:[^>]*default:([^\s<>,]+)/i)){
            var poseKey = RegExp.$1;
            if(poseKey !== undefined){
                this.loadPoseTemplate(poseKey);
                this.setReservedPose(poseKey, 'default');
            }
        }
        if(notes.match(/<TAA_CP:[^>]*dash:([^\s<>,]+)/i)){
            var poseKey = RegExp.$1;
            if(poseKey !== undefined){
                this.loadPoseTemplate(poseKey);
                this.setReservedPose(poseKey, 'dash');
            }
        }
        if(notes.match(/<TAA_CP:[^>]*idle:([^\s<>,]+)/i)){
            var poseKey = RegExp.$1;
            if(poseKey != undefined){
                this.loadPoseTemplate(poseKey);
                this.setReservedPose(poseKey, 'idle');
            }
        }
        if(notes.match(/<TAA_CP:[^>]*lib:([^\s<>,]+(?:,\s*[^\s<>,]+)*)/i)){
            var keyStr = RegExp.$1;
            var keyList = keyStr.split(/,\s*/);
            for(var i=0; i<keyList.length; i++){
                this.loadPoseTemplate(keyList[i].replace(/\s/, ''));
            }
        }
        if(notes.match(/<TAA_CP:[^>]*balloon[s]?:([0-9]+(?:,\s*[0-9]+)*)/i)){
            var keyStr = RegExp.$1;
            var keyList = keyStr.split(/,\s*/);
            for(var i=0; i<keyList.length; i++){
                var b = parseInt(keyList[i]);
                if(!isNaN(b))
                    this.loadBalloonPoseTemplate(b);
            }
        }
        if(notes.match(/<TAA_CP:.*savePose:(false|true)/i)){
            var saveOpt = (RegExp.$1).toLowerCase() === 'true';
            this._cpAutoSavePoses = saveOpt;
            if(saveOpt) {
                var savedPoses = $gameSystem.loadEventPoseData(this._mapId, this._eventId);
                if(savedPoses !== undefined && savedPoses !== null){
                    this.loadSavedPoses(savedPoses);
                }
            }
        }
        if(notes.match(/<TAA_CP:.*enable:(false|true)/i)){
            var state = (RegExp.$1).toLowerCase() === 'true';
            if(state)
                this.cpEnable();
            else
                this.cpDisable();
        }
    }
};

Game_Event.prototype.loadPosesFromComments = function(poseKey){
    var foundEndTag = false;
    var foundStartTag = false;
    var poseComments = [];
    var i = 0;
    var pageList = this.list();
    while(i < pageList.length && !foundEndTag){
        var page = pageList[i];
        if(page.code === 108 || page.code === 408){
            if(page.parameters[0].match(/<TAA_CP>/i))
                foundStartTag = true;
            else if(page.parameters[0].match(/<\/TAA_CP>/i))
                foundEndTag = true;
            else if(foundStartTag)
                poseComments.push(page.parameters[0]);
        }
        i++;
    }
    if(foundStartTag && poseComments.length >= 1)
        this.parsePoseComments(poseComments);
};

Game_Event.prototype.parsePoseComments = function(array){
    var isObj = false;
    var newPoseKey = "";
    var balloonId = 0;
    var newPose = {};
    var newBalloon = {};
    for(var i=0; i<array.length; i++){
        if(array[i].match(/cpLoad:/i)){
            if(array[i].match(/:(default|dash|idle):([^\s,<>]+)/i)){
                var type = RegExp.$1;
                var poseKey = RegExp.$2;
                this.loadPoseTemplate(poseKey);
                this.setReservedPose(poseKey, type);
            }
            else if(array[i].match(/:balloon[s]?:([0-9,\s]+)/i)){
                var str = RegExp.$1;
                var balloonList = str.split(',');
                for(var i=0; i<balloonList.length; i++){
                    var b = parseInt(balloonList[i]);
                    if(!isNaN(b))
                        this.loadBalloonPoseTemplate(b);
                }
            }
            else {
                array[i].match(/cpLoad:\s*([^:]+)/g);
                var loadList = RegExp.$1;
                if(loadList === undefined || loadList.length <= 0) continue;
                var libArray = loadList.split(/,\s*/);
                
                for(var j=0; j<libArray.length; j++){
                    var poseKey = libArray[j];
                    this.loadPoseTemplate(poseKey);
                }
            }
        }
        else if(array[i].match(/cpAutoSave:(true|false)/i)){
            var saveOpt = (RegExp.$1).toLowerCase() === 'true';
            this._cpAutoSavePoses = saveOpt;
        }
        else if(array[i].match(/cpDeletePose:([^\s<>,:]+)/i)){
            var key = RegExp.$1;
            this.deleteCustomPose(key);
        }
        else if(array[i].match(/cpDeleteBalloonPose:([0-9]+)/i)){
            var id = RegExp.$1;
            this.deleteCustomBalloonPose(id);
        }
        else if(array[i].match(/cpNewPose:([^\s<>,:]+)/i)){
            newPoseKey = RegExp.$1;
            if(newPose['Pose Key'] !== undefined && newPose['Pose Key'] !== newPoseKey)
                newPose = {};
            newPose['Pose Key'] = newPoseKey;
            isObj = true;
        }
        else if(array[i].match(/cpNewBalloonPose:([0-9]+)/i)){
            balloonId = parseInt(RegExp.$1);
            if(isNaN(balloonId)){
                balloonId = 0;
                continue;
            }
            isObj = true;
        }
        else if(array[i].match(/cpEnable:(false|true)/i)){
            var state = (RegExp.$1).toLowerCase() === 'true';
            if(state)
                this.cpEnable();
            else
                this.cpDisable();
        }
        else if(array[i].match(/:cpReset:/i)){
            this.clearPoseData();
            this.loadDefaultPoses();
            this.loadPosesFromNotes();
        }
        else if(isObj){
            if(array[i].match(/cpSprite:([^,]+),([^\r\n]+)/i)){
                var file = RegExp.$1;
                var indexStr = RegExp.$2;
                file = file.replace(/%{char}/gi, this.characterName());
                indexStr = indexStr.replace(/%{index}/gi, this.characterIndex());
                var index = parseInt(eval(indexStr));
                if(isNaN(index)) index = 0;
                if(balloonId > 0){
                    newBalloon['Spritesheet'] = file;
                    newBalloon['Index'] = index;
                }
                else{
                    newPose['Spritesheet'] = file;
                    newPose['Index'] = index;
                    newPose['Pattern'] = [];
                    newPose['Blink'] = '';
                    newPose['Blink Index'] = 0;
                }
            }
            else if(array[i].match(/cpBlinkSprite:([^,]+),([^\s\r\n]+)/i)){
                var file = RegExp.$1;
                var indexStr = RegExp.$2;
                file = file.replace(/%{char}/gi, this.characterName());
                indexStr = indexStr.replace(/%{index}/gi, this.characterIndex()).replace(/%{pIndex}/ig, newPose['Index']);
                var index = parseInt(eval(indexStr));
                if(isNaN(index)) index = 0;
                newPose['Blink'] = file;
                newPose['Blink Index'] = index;
            }
            else if(array[i].match(/cpSpeed:([0-9]+)/i)){
                var speed = parseInt(RegExp.$1);
                if(balloonId > 0)
                    newBalloon['Speed'] = !isNaN(speed) ? speed : 15;
                else
                    newPose['Speed'] = !isNaN(speed) ? speed : 15;
            }
            else if(array[i].match(/cpPattern:([di0-9]+(?:,\s*[di0-9]+)*)/i)){
                var patternStr = RegExp.$1;
                var patternItems = patternStr.split(/,\s*/);
                if(balloonId > 0) newBalloon['Pattern'] = [];
                else newPose['Pattern'] = [];
                for(var k=0; k<patternItems.length; k++){
                    if(balloonId > 0)
                        newBalloon['Pattern'].push(patternItems[k]);
                    else
                        newPose['Pattern'].push(patternItems[k]);
                }
            }
            else if(array[i].match(/:cpEndPose:/i)){
                isObj = false;
                if(balloonId > 0 && Object.keys(newBalloon).length > 0){
                    if(isNaN(newBalloon['Speed'])) newBalloon['Speed'] = 15;
                    if(newBalloon['Pattern'] === undefined) newBalloon['Pattern'] = [];
                    this.addCustomBalloonPose(newBalloon, balloonId);
                    newBalloon = {};
                    balloonId = 0;
                }
                else if(newPose !== undefined && Object.keys(newPose).length > 0){
                    this.addCustomPose(newPose);
                    newPose = {};
                    newPoseKey = '';
                }
            }
        }
    }
};

Game_Event.prototype.fixEmptyDefaultPose = function(){
    if(this._cpPoseLibrary && !this._cpPoseLibrary[this._cpDefaultPose]){
        this._cpPoseLibrary[this._cpDefaultPose] = {};
        this._cpPoseLibrary[this._cpDefaultPose].Blink = "";
        this._cpPoseLibrary[this._cpDefaultPose]['Blink Index'] = 0;
        this._cpPoseLibrary[this._cpDefaultPose]['Index'] = this._characterIndex;
        this._cpPoseLibrary[this._cpDefaultPose]['Spritesheet'] = this._characterName;
        this._cpPoseLibrary[this._cpDefaultPose]['Speed'] = 15;
        this._cpPoseLibrary[this._cpDefaultPose]['Pose Key'] = 'default';
        this._cpPoseLibrary[this._cpDefaultPose]['Pattern'] = [];
    }
};

Game_Event.prototype.addCustomPose = function(poseObj){
    if(poseObj === undefined || !this.charImgExists(poseObj['Spritesheet'])) return;
    this._cpPoseLibrary[poseObj['Pose Key']] = poseObj;
};

Game_Event.prototype.deleteCustomPose = function(poseKey){
    if(this.isPoseAvailable(poseKey)){
        if(this.isCurrentPose(poseKey))
            this.setPose(this._cpDefaultPose);
        delete this._cpPoseLibrary[poseKey];
    }
    this.fixEmptyDefaultPose();
};

Game_Event.prototype.addCustomBalloonPose = function(poseObj, balloonId){
    if(poseObj === undefined || !this.charImgExists(poseObj['Spritesheet'])) return;
    this._cpBalloonPoses[balloonId] = poseObj;
    this._cpOriginalBalloonPoses[balloonId] = poseObj;
};

Game_Event.prototype.deleteCustomBalloonPose = function(balloonId){
    if(this._cpBalloonPoses[balloonId]){
        delete this._cpBalloonPoses[balloonId];
    }
};

Game_Event.prototype.loadPoseTemplate = function(poseKey){
    if(TAA.cp.Parameters.Event.Poses[poseKey] === undefined) return;
    var pose = {};
    var reference = TAA.cp.Parameters.Event.Poses[poseKey];
    pose['Pose Key'] = poseKey;
    pose['Spritesheet'] = reference['Spritesheet'].replace(/%{char}/ig, this.characterName());
    pose['Index'] = parseInt(eval(reference['Index'].replace(/%{index}/gi, this.characterIndex())));
    if(isNaN(pose['Index'])) pose['Index'] = 0;
    pose['Blink'] = reference['Blink'].replace(/%{char}/gi, this.characterName()).replace(/%{pose}/gi, pose['Spritesheet']);
    pose['Blink Index'] = parseInt(eval(reference['Blink Index'].replace(/%{index}/gi, this.characterIndex()).replace(/%{pIndex}/gi, pose['Index'])));
    if(isNaN(pose['Blink Index'])) pose['Blink Index'] = 0;
    pose['Pattern'] = reference['Pattern'].slice();
    pose['Speed'] = reference['Speed'];

    this._cpPoseLibrary[poseKey] = pose;
};

Game_Event.prototype.loadPoseTemplateLibrary = function(){
    var poses = Object.keys(TAA.cp.Parameters.Event.Poses);
    for(var i=0; i<poses.length; i++){
        this.loadPoseTemplate(poses[i]);
    }
};

Game_Event.prototype.parsePoseData = function(poseData){
    var pose = {};

    pose['Spritesheet'] = poseData['Spritesheet'].replace(/%{char}/ig, this.characterName());
    pose['Index'] = parseInt(eval(poseData['Index'].replace(/%{index}/gi, this.characterIndex())));
    if(isNaN(pose['Index'])) pose['Index'] = 0;
    pose['Blink'] = poseData['Blink'].replace(/%{char}/gi, this.characterName()).replace(/%{pose}/gi, pose['Spritesheet']);
    pose['Blink Index'] = parseInt(eval(poseData['Blink Index'].replace(/%{index}/gi, this.characterIndex()).replace(/%{pIndex}/gi, pose['Index'])));
    if(isNaN(pose['Blink Index'])) pose['Blink Index'] = 0;
    pose['Pattern'] = poseData['Pattern'].slice();
    pose['Speed'] = poseData['Speed'];

    return pose;
};

Game_Event.prototype.parseBalloonPoseData = function(balloonData){
    var balloon = {};

    balloon['Spritesheet'] = balloonData['Spritesheet'].replace(/%{char}/ig, this.characterName());
    balloon['Index'] = parseInt(eval(balloonData['Index'].replace(/%{index}/gi, this.characterIndex())));
    balloon['Pattern'] = balloonData['Pattern'].slice();
    balloon['Speed'] = balloonData['Speed'];

    return balloon;
};

Game_Event.prototype.loadBalloonPoseTemplate = function(balloonId){
    if(TAA.cp.Parameters.Event.Balloons[balloonId] === undefined) return;
    var pose = {};
    var reference = TAA.cp.Parameters.Event.Balloons[balloonId];
    if(reference === undefined) return;
    pose = this.parseBalloonPoseData(reference);

    this._cpBalloonPoses[balloonId] = pose;
    this._cpOriginalBalloonPoses[balloonId] = pose;
};

Game_Event.prototype.loadPoseTemplateLibrary = function(){
    if(TAA.cp.Parameters.Event.Balloons === undefined || TAA.cp.Parameters.Event.Balloons === null) return;
    for(var i=0; i<TAA.cp.Parameters.Event.Balloons.length; i++){
        this.loadBalloonPoseTemplate(i);
    }
};

Game_Event.prototype.loadDefaultPoses = function(){
    if(TAA.cp.Parameters.Default === undefined || Object.keys(TAA.cp.Parameters.Default.Poses).length <= 0) return;

    var notes = this.event().note;
    if(notes.match(/<TAA_CP: [^>]*(?:,?noDefaults\s*)[^>]*>/i))
        return;

    var keys = Object.keys(TAA.cp.Parameters.Default.Poses);
    for(var i=0; i<keys.length; i++){
        var pose = {};
        var reference = TAA.cp.Parameters.Default.Poses[keys[i]];
        pose = this.parsePoseData(reference);
        pose['Pose Key'] = keys[i];
        
        this._cpPoseLibrary[keys[i]] = pose;
    }

    var balloons = TAA.cp.Parameters.Default.Balloons;
    for(var i=0; i<balloons.length; i++){
        if(balloons[i] === undefined || balloons[i] === null) continue;
        var balloon = {};
        balloon = this.parseBalloonPoseData(balloons[i]);

        this._cpBalloonPoses[i] = balloon;
        this._cpOriginalBalloonPoses[i] = balloon;
    }
};

TAA.cp.alias.Game_Event.setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function(){
    TAA.cp.alias.Game_Event.setupPage.call(this);
    if(this._pageIndex < 0) return;
    this.loadPosesFromComments();
    this.fixEmptyDefaultPose();
    this.cacheCharImgFiles();
};

TAA.cp.alias.Game_Event.setPose = Game_Event.prototype.setPose;
Game_Event.prototype.setPose = function(poseKey){
    TAA.cp.alias.Game_Event.setPose.call(this, poseKey);
    if(this.isCurrentPose(poseKey) && this.isCpAutoSaveEnabled()) $gameSystem.saveEventPoseData(this._eventId);
};

Game_Event.prototype.isCpAutoSaveEnabled = function(){
    return this._cpAutoSavePoses;
};

TAA.cp.alias.Game_Event.isOriginalPattern = Game_Event.prototype.isOriginalPattern;
Game_Event.prototype.isOriginalPattern = function(){
    if(this.hasCustomPattern(this._cpCurrentPose)){
        var pose = this.currentPoseObj();
        return this._cpPatternCursor === Math.floor((pose.Pattern.length-1) / 2);
    }
    else
        return TAA.cp.alias.Game_Event.isOriginalPattern.call(this);
};

TAA.cp.alias.Game_Event.resetPattern = Game_Event.prototype.resetPattern;
Game_Event.prototype.resetPattern = function(){
    if(this.isDashPose()){
        this.restorePreviousPose();
    }
    if(this.hasCustomPattern(this.currentPoseKey()) && this.currentPoseObj() !== undefined){
        var pose = this.currentPoseObj();
        var pat = Math.floor((pose.Pattern.length-1) / 2);
        this._cpPatternCursor = pat;
    }
    else
        TAA.cp.alias.Game_Event.resetPattern.call(this);
};

//=============================================================================
// Window_Base
//=============================================================================

TAA.cp.alias.Window_Base = TAA.cp.alias.Window_Base || {};
TAA.cp.alias.Window_Base.drawCharacter = Window_Base.prototype.drawCharacter;
Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y){
    var frames = 3;
    if(characterName.match(/\[f(\d+)\]/i))
        frames = parseInt(RegExp.$1);
    if(isNaN(frames)) frames = 3;
    if(frames === 3) return TAA.cp.alias.Window_Base.drawCharacter.call(this, characterName, characterIndex, x, y);
    else this.drawMoreCharacterFrames(characterName, characterIndex, x, y, frames);
};

Window_Base.prototype.drawMoreCharacterFrames = function(characterName, characterIndex, x, y, frames){
    var bitmap = ImageManager.loadCharacter(characterName);
    var big = ImageManager.isBigCharacter(characterName);
    var pw = bitmap.width / (big ? frames : frames*4);
    var ph = bitmap.height / (big ? 4 : 8);
    var n = characterIndex;
    var sx = (n % (frames + 1) * frames + Math.floor(frames/2)) * pw;
    var sy = (Math.floor(n / 4) * 4) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

//=============================================================================
// Sprite_Character
//=============================================================================

TAA.cp.alias.Sprite_Character = TAA.cp.alias.Sprite_Character || {};
TAA.cp.alias.Sprite_Character.patternWidth = Sprite_Character.prototype.patternWidth;
Sprite_Character.prototype.patternWidth = function(){
    var moreFrames = this._character.characterName().match(/\[f(\d+)\]/i);
    if(moreFrames){
        return this.bitmap.width / moreFrames[1];
    }
    return TAA.cp.alias.Sprite_Character.patternWidth.call(this);
};

TAA.cp.alias.Sprite_Character.characterPatternY = Sprite_Character.prototype.characterPatternY;
Sprite_Character.prototype.characterPatternY = function(){
    if(this._character.cpSpriteDirection() > 0)
        return (this._character.cpSpriteDirection() - 2) / 2;
    else if(!this._isBigCharacter && this._character.is8DirChar() && this._character.direction() % 2 === 1){
        var d = this._character.direction();
        return TAA.cp.Parameters.Global.D8Settings[d];
    }
    else
        return TAA.cp.alias.Sprite_Character.characterPatternY.call(this);
};

//=============================================================================
// Game_Temp
//=============================================================================

if(Utils.RPGMAKER_NAME === 'MZ'){
TAA.cp.alias.Game_Temp = TAA.cp.alias.Game_Temp || {};
    TAA.cp.alias.Game_Temp.requestBalloon = Game_Temp.prototype.requestBalloon;
    Game_Temp.prototype.requestBalloon = function(target, balloonId) {
        target.setBalloonId(balloonId);
        TAA.cp.alias.Game_Temp.requestBalloon.call(this, target, balloonId);
    };
}

//=============================================================================
// Game_Temp
//=============================================================================

TAA.cp.alias.Game_Map = TAA.cp.alias.Game_Map || {};
TAA.cp.alias.Game_Map.setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
    ImageManager.prepareCharDiscardQueue();
    TAA.cp.alias.Game_Map.setupEvents.call(this);
    ImageManager.clearCharDiscardQueue();
};

TAA.cp.alias.Game_Map.roundXWithDirection = Game_Map.prototype.roundXWithDirection;
Game_Map.prototype.roundXWithDirection = function(x, d){
    if(d % 2 === 1 && TAA.cp.Parameters.Global.Enable8Dir){
        if([1, 4, 7].contains(d))
            return this.roundX(x - 1);
        else if([3, 6, 9].contains(d))
            return this.roundX(x + 1);
        else
            return this.roundX(x);
    }
    else
        return TAA.cp.alias.Game_Map.roundXWithDirection.call(this, x, d);
};

TAA.cp.alias.Game_Map.roundYWithDirection = Game_Map.prototype.roundYWithDirection;
Game_Map.prototype.roundYWithDirection = function(y, d){
    if(d % 2 === 1 && TAA.cp.Parameters.Global.Enable8Dir){
        if([1, 4, 7].contains(d))
            return this.roundX(y - 1);
        else if([3, 6, 9].contains(d))
            return this.roundX(y + 1);
        else
            return this.roundX(y);
    }
    else
        return TAA.cp.alias.Game_Map.roundYWithDirection.call(this, y, d);
};