//
// pianta.js
//--------------------
// Pianta
// by xezno
//
// includes:
// render stuff idk
//

window.ObjPianta = function(obji, scene) {
	var forceBill;
	var obji = obji;
	var res = [];

	var t = this;

	t.pos = vec3.clone(obji.pos);
	t.angle = vec3.clone(obji.angle);
	t.scale = vec3.clone(obji.scale);

	t.requireRes = requireRes;
	t.provideRes = provideRes;
	t.update = update;
	t.draw = draw;

	var mat = mat4.create();
	var frame = 0;
	var anim = null;

  // todo: give each instance its own random color
	var animFrame = 0;
	var animMat = null;

	function draw(view, pMatrix) {
		if (forceBill) nitroRender.setShadBias(0.001);
		mat4.translate(mat, view, t.pos);
				
		if (t.angle[2] != 0) mat4.rotateZ(mat, mat, t.angle[2]*(Math.PI/180));
		if (t.angle[1] != 0) mat4.rotateY(mat, mat, t.angle[1]*(Math.PI/180));
		if (t.angle[0] != 0) mat4.rotateX(mat, mat, t.angle[0]*(Math.PI/180));
		
		mat4.scale(mat, mat, vec3.scale([], t.scale, 16));
		res.mdl[0].draw(mat, pMatrix, animMat);
		if (forceBill) nitroRender.resetShadOff();
	}

	function update() {
		res.mdl[0].setFrame(animFrame);
		if (anim != null) {
			animMat = anim.setFrame(0, 0, animFrame);
		}
	}

	function requireRes() { //scene asks what resources to load
		forceBill = true;
    return {mdl:[{nsbmd:"TownMonte.nsbmd"}], other:[null, null, "TownMonte.nsbtp"]};
	}

	function provideRes(r) {
		res = r; //...and gives them to us. :)

		if (forceBill) {
			t.angle[1] = 0;
			var bmd = r.mdl[0].bmd;
			bmd.hasBillboards = true;
			var models = bmd.modelData.objectData;
			for (var i=0; i<models.length; i++) {
				var objs = models[i].objects.objectData;
				for (var j=0; j<objs.length; j++) {
					objs[i].billboardMode = 2;
				}
			}
		}

		if (r.other != null) {
			if (r.other.length > 0 && r.other[0] != null) {
				res.mdl[0].loadTexAnim(r.other[0]);
			}
			if (r.other.length > 1 && r.other[1] != null) {
				anim = new nitroAnimator(r.mdl[0].bmd, r.other[1]);
			}
			if (r.other.length > 2 && r.other[2] != null) {
				res.mdl[0].loadTexPAnim(r.other[2]);
			}
		}
	}

}