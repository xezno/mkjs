//
// controlGamepad.js
//--------------------
// Provides gamepad controls for kart.
// by xezno
//
// includes: main.js
//


window.controlGamepad = function() {
	var thisObj = this;
	this.local = true;
	var kart;

	this.setKart = function(k) {
		kart = k;
		thisObj.kart = k;
	}

	this.fetchInput = fetchInput;
	this.rumble = rumble;

	function rumble(duration, weakMagnitude, strongMagnitude) {
		//basic rumble logic
		var gamepads = navigator.getGamepads();
		var useGamepad = gamepads[0] != undefined;
		if (useGamepad) {
			gamepads[0].vibrationActuator.playEffect("dual-rumble", {
				startDelay: 0,
				duration,
				weakMagnitude,
				strongMagnitude
			});
		}
	}

	function fetchInput() {
		// there aren't any proper events for gamepad
		// inputs, so this kinda stinks... too bad!
		var gamepads = navigator.getGamepads();
		var gamepad = gamepads[0];

		// Deadzones
		var turn = gamepad.axes[0];
		var airTurn = gamepad.axes[2];
		if (Math.abs(turn) < 0.1)
			turn = 0;
		if (Math.abs(airTurn) < 0.1)
			airTurn = 0;
		
		// binds are for xbsx controller (should also work for xbone / x360)
		return {
			accel: gamepad.buttons[1].pressed,
			drift: gamepad.buttons[5].pressed,
			item: gamepad.buttons[2].pressed || gamepad.buttons[4].pressed,
			decel: gamepad.buttons[0].pressed,

			turn,
			airTurn
		}
	}
}