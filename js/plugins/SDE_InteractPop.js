/*:
 * @plugindesc Shows "interact" balloon tip whenever the player is in reach of an event that they can interact with.
 * @author Dustb0
 * @version 1.2
 * 
 * @param balloonID
 * @text Balloon ID
 * @type number
 * @default 11
 * 
 */
(() => {
  const parameters = PluginManager.parameters("SDE_InteractPop");
  const paramBalloonID = Number(parameters["balloonID"]);

  const _Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
  Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
    // Call original startMapEvent
    _Game_Player_startMapEvent.call(this, x, y, triggers, normal);
    
    // Check if any event is behind the player
    if (!$gameMap.isEventRunning()) {
      const direction = this.direction();
      const behindX = $gameMap.roundXWithDirection(x, direction, 0);
      const behindY = $gameMap.roundYWithDirection(y, direction, 0);

      const events = $gameMap.eventsXy(behindX, behindY);
      for (const event of events) {
		if (this.direction() === event.direction()) {
        if (event.page() && event.list().length > 0) {
          const list = event.list();
          const comment = list.find(command => command.code === 108 || command.code === 408);
          if (comment && /\\interact\s*/i.test(comment.parameters[0])) {
            let balloon = comment.parameters[0].match(/balloon\=(\d+)\D*\s*/i);
            //requestBalloon(balloon ? Number(balloon[1]) : paramBalloonID);
			event.requestBalloon(balloon ? Number(balloon[1]) : paramBalloonID);
            break; // Show only one balloon even if multiple events are behind
          }
        }
        if (event.event().meta && event.event().meta["interact"] && event.findProperPageIndex() >= 0) {
          let balloonID = event.event().meta["interact"] === 'string' ? Number(event.event().meta["interact"]) : paramBalloonID;
          //requestBalloon(balloonID);
		  //event.requestBalloon(12);
          break; // Show only one balloon even if multiple events are behind
         }
        }
	  }
    }
  };

  function requestBalloon(balloonID) {
    if ($gamePlayer.requestBalloon) {
      $gamePlayer.requestBalloon(balloonID); // MV
    } else {
      $gameTemp.requestBalloon($gamePlayer, balloonID); // MZ
    }    
  }

})();
