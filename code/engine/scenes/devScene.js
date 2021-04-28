//
// devScene.js
//--------------------
// Provides a basic gamemode without any logic (for testing)
// by RHY3756547
//

window.devScene = function(course, wsInstance, res) {
	var res = res; //gameRes
	var t = this;

	t.mode = -1;
	t.activeScene = null;
	t.myKart = null;

	//consistent kart
	var mchar = 0;
	var mkart = 0;
					
	this.update = function() {
		if (t.activeScene != null) {
			t.activeScene.update();
			//simulate what a server would do
			updateServer();
		}
	}

	var advanceTimes = [3,4,-1,-1]

	function updateServer() {
		var m = t.mode;
		m.frameDiv++;
		if (m.frameDiv == 60) {
			m.frameDiv -= 60;
			m.time++;
			var timeAd = advanceTimes[m.id];
			if (timeAd != -1 && m.time >= timeAd) {
				m.id++;
				m.time = 0;
			}
		}

		t.activeScene.updateMode(JSON.parse(JSON.stringify(t.mode)));
	}

	this.render = function() {
		if (t.activeScene != null) sceneDrawer.drawTest(gl, t.activeScene, 0, 0, gl.viewportWidth, gl.viewportHeight)
	}

	begin(course);

	function begin(course) {
		var mainNarc, texNarc
		if (course.substr(0, 5) == "mkds/") {
			var cnum = Number(course.substr(5));
			var course = MKDSCONST.COURSES[cnum];
			var cDir = MKDSCONST.COURSEDIR+course.name;
			var mainNarc = new narc(lz77.decompress(gameROM.getFile(cDir+".carc")));
			var texNarc = new narc(lz77.decompress(gameROM.getFile(cDir+"Tex.carc")));
			setUpCourse(mainNarc, texNarc, course)
		} else throw "custom tracks are not implemented yet!"
	}

	function setUpCourse(mainNarc, texNarc, course) {
		var chars = [];
		chars.push({charN:mchar, kartN:mkart, controller:playerControls, raceCam:true, extraParams:[{k:"name", v:"single"}, {k:"active", v:true}]});

		t.activeScene = new courseScene(mainNarc, texNarc, course, chars, {}, res);

		t.myKart = t.activeScene.karts[0];
		
		// launch directly into race (no countdown)
		t.mode = {
			id:2,
			time:0,
			frameDiv:0,
		}
		
		t.activeScene.updateMode(t.mode);
	}

}