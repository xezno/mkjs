//
// controlDefault.js
//--------------------
// Provides default keyboard controls for kart.
// by RHY3756547
//
// includes: main.js
//

window.controlDefault = function() {
	var thisObj = this;
	this.local = true;
	var kart;

	this.setKart = function(k) {
		kart = k;
		thisObj.kart = k;
	}

	this.fetchInput = fetchInput;
	this.rumble = rumble;

	function rumble() { }

	function fetchInput() {
		return {
			accel: keysArray[88], //x
			decel: keysArray[90], //z
			drift: keysArray[83], //s
			item: keysArray[65], //a

			//-1 to 1, intensity.
			turn: (keysArray[37]?-1:0)+(keysArray[39]?1:0),
			airTurn: (keysArray[40]?-1:0)+(keysArray[38]?1:0) //air excitebike turn, item fire direction
		};
	}

}