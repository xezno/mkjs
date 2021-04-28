//
// controlDefault.js
//--------------------
// Manages different control methods
// by xezno
//
// includes: main.js
//

window.playerControls = function() {
	// Layer to pass thru to different input methods where required
	// Makes it so that input switching is possible (i.e. if a controller is plugged in after game starts)

	var currentInput = new controlDefault();

	// Set input method
	setInputAuto();

	function setKart(k) {
		return currentInput.setKart(k);
	}

	function rumble(duration, weakMagnitude, strongMagnitude) {
		return currentInput.rumble(duration, weakMagnitude, strongMagnitude);
	}

	function fetchInput() {
		return currentInput.fetchInput();
	}

	function setInputAuto() {
		if (isMobile) 
			currentInput = new controlMobile();
		else if (hasGamepad) 
			currentInput = new controlGamepad();
	}

	function switchInput(newInput) {
		currentInput = newInput;
	}

	this.setInputAuto = setInputAuto;
	this.switchInput = switchInput;
	this.fetchInput = fetchInput;
	this.setKart = setKart;
	this.rumble = rumble;
}