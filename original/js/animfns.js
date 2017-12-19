///////////////////////////
//						 //
//	ANIMATION FUNCTIONS  //
//						 //
///////////////////////////

function pauseAnimation() {
	sleepNSeconds(5);
		playAnim = false;
	setTimeout(function(){
		playAnim = true;
		animate();
		var object = scene.getObjectByName( "sidejamb1", true );
		object.visible = true;
		object = scene.getObjectByName( "sidejamb2", true );
		object.visible = true;
		object = scene.getObjectByName( "toptransom", true );
		object.visible = true;
		object = scene.getObjectByName( "bottransom", true );
		object.visible = true;


	}, (5000));

	currState = 0.0;
	document.getElementById("hero").innerHTML = "INTERNAL RUBBER GASKETS";
}

function gasketToFrame(){
	done++;
	// slides gaskets into frame pieces
	var object = scene.getObjectByName( "gasketside1", true );
	if (object && object.position.z < .4) { object.position.z += .7*delta; done = 0; }
	object = scene.getObjectByName( "gasketside2", true );
	if (object && object.position.z > -.4) { object.position.z -= .7*delta; done = 0; }
	object = scene.getObjectByName( "gaskettransomu", true );
	if (object && object.position.y < .4 - ydisp) { object.position.y += .7*delta; done = 0; }
	object = scene.getObjectByName( "gaskettransoml", true );
	if (object && object.position.y > -.4 - ydisp) { object.position.y -= .7*delta; done = 0; }
	// changes state 0.5s after assembly
	if (done > 0) {
		sleepNSeconds(0.5);
		currState = 0.1;
		document.getElementById("hero").innerHTML = "TRANSOM AND SIDE JAMBS";
	}
}
function frameAssembly(){
	done++;

	// move all objects in frame towards 0,0,0
	var object = scene.getObjectByName( "sidejamb1", true );
	if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
	object = scene.getObjectByName( "sidejamb2", true );
	if (object && object.position.z < 0) { object.position.z += delta; done = 0;}
	object = scene.getObjectByName( "toptransom", true );
	if (object && object.position.y > 0 - ydisp) { object.position.y -= delta; done = 0;}
	object = scene.getObjectByName( "bottransom", true );
	if (object && object.position.y < 0 - ydisp) { object.position.y += delta; done = 0;}

	var object = scene.getObjectByName( "gasketside1", true );
	if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
	object = scene.getObjectByName( "gasketside2", true );
	if (object && object.position.z < 0) { object.position.z += delta; done = 0;}
	object = scene.getObjectByName( "gaskettransomu", true );
	if (object && object.position.y > 0 - ydisp) { object.position.y -= delta; done = 0;}
	object = scene.getObjectByName( "gaskettransoml", true );
	if (object && object.position.y < 0 - ydisp) { object.position.y += delta; done = 0;}

	// changes state after assembled
	if (done > 2) {
		currState = 0.2;
		showFrameScrews();
		sleepNSeconds(0.5);
		document.getElementById("hero").innerHTML = "EIGHT FRAME SCREWS";
	}
}
function frameScrews(){
	done++;
	var object = scene.getObjectByName( "screws1_1", true );
	if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
	object = scene.getObjectByName( "screws1_2", true );
	if (object && object.position.z < 0) { object.position.z += delta; done = 0;}

	if (done > 30) {
		currState = 0.3;
		//sleepNSeconds(0.5);
	}
}
function zoomToLouvre() {
	done++;
	for (var i in allframeobjs){
	    (function(index){
	        var object = scene.getObjectByName(allframeobjs[index], true);
		    if (object && object.position.y > - (1.8 * ydisp - 10 * delta)) {
		        object.position.y -= 4 * delta;
		        done = 0;
		    } else if (object && object.position.y > -1.8 * ydisp + .5* delta) {
		        object.position.y -= delta;
		        done = 0;
		    }
	    })(i);
	}
	if (camera.position.x < 1) {camera.position.x += 3*delta; done = 0;}
	if (camera.position.y > 0.1) {camera.position.y -= 7*delta; done = 0;}
	if (camera.position.z < 2) {camera.position.z += 3*delta; done = 0;}
	if (done > 0 ) {
		tare0();
		load1();
		currState = 1.0;
		sleepNSeconds(1);
		document.getElementById("hero").innerHTML = "LOUVRE GASKETS";
	}
}
function gasketToBearer() {
	// if the louvre elements are not loaded, load them
	//if (elementsLoaded == 0) { load1(); done = 0;}
	// else {
		// louvre bearer is at y=-2.6+.25,
		done++;
		object = scene.getObjectByName( "glazinggasket", true );
		if (object && object.position.y < -ydispzoom) { object.position.y += deltas; done = 0;}
		object = scene.getObjectByName( "rebategasket", true );
		if (object && object.position.y > -ydispzoom) { object.position.y -= deltas; done = 0;}
	// }
	if (done > 0) {
		currState = 1.1;
		elementsLoaded = 0;
		sleepNSeconds(0.5);
		document.getElementById("hero").innerHTML = "6MM GLAZING";
	}
}
function glassToBearer() {
	done++;
	object = scene.getObjectByName( "louvreglass", true );
	if (object && object.position.y < -ydispzoom) { object.position.y += 2*deltas; done = 0;}
	// object = scene.getObjectByName( "glazinggasket", true );
	// if (object && object.position.y > -ydispzoom) { object.position.y -= 2*deltas; done = 0;}
	// object = scene.getObjectByName( "louvrebearer", true );
	// if (object && object.position.y > -ydispzoom) { object.position.y -= 2*deltas; done = 0;}
	if (done > 0) {
		currState = 1.2;
		sleepNSeconds(0.5);
		document.getElementById("hero").innerHTML = "TRAINER BODY";
	}
}
function endcaps() {
	done++;
	object = scene.getObjectByName( "endcap1", true );
	if (object && object.position.z > 0) { object.position.z -= deltas; done = 0;}
	object = scene.getObjectByName( "endcap2", true );
	if (object && object.position.z < 0) { object.position.z += deltas; done = 0;}
	if (done > 30) {currState = 1.3;
	document.getElementById("hero").innerHTML = "LOUVRE ASSEMBLY";
	}
}
function swingCameraForward() {
	done++;
	for (var i in louvre1objs){
	    (function(index){
	        var object = scene.getObjectByName(louvre1objs[index], true);
	        if (object && object.position.x > 0) {
		        object.position.x -= deltas;
		        done = 0;
		    }
		    if (object && object.position.y < - 1.8 * ydisp) {
		        object.position.y += .35*deltas;
		        done = 0;
		    }
	    })(i);
	}
	if (done > 5) {currState = 1.4;}
}
function louvre1ToFrame(){
	done++;

	if (camera.position.x > -.75) {camera.position.x -= 3*delta; done = 0;}
	if (camera.position.y > -0.1) {camera.position.y -= 1*delta; done = 0;}
	if (camera.position.z < 1.9) {camera.position.z += 1*delta; done = 0;}

	if (done > 2) {currState = 1.5;
		document.getElementById("hero").innerHTML = "AXIS RODS";
	}
}
function louvre1AxisIn() {
	done++;
	if (elementsLoaded == 0) {
		//load0();
		load1_1();
	}
	object = scene.getObjectByName( "axis1", true );
	if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
	object = scene.getObjectByName( "axis2", true );
	if (object && object.position.z < 0) { object.position.z += delta; done = 0;}

	if (done > 60) {
		currState = 1.6;
		elementsLoaded = 0;
	}
}
function panToLinkbar(){
	done++;

	if (camera.position.x < -.5) {camera.position.x += delta; done = 0;}

	if (done > 2) {currState = 2.0; }
}
function louvresIn(){
	done++;
	if (elementsLoaded == 0) {
		load2();
		load2_1();
		elementsLoaded = 1;
		done = 0;
	}
	if (done > 0) {
		currState = 2.1;
		elementsLoaded = 0;
		document.getElementById("hero").innerHTML = "LINK BAR";
		sleepNSeconds(1);
	}
}
function linkbarIn(){
	done++;
	if (elementsLoaded == 0) {
		//load2_1();
		elementsLoaded = 1;
		done = 0;
	} else {
		object = scene.getObjectByName( "pivots1", true );
		if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
		object = scene.getObjectByName( "pivots2", true );
		if (object && object.position.z < 0) { object.position.z += delta; done = 0;}
		object = scene.getObjectByName( "linkbar1", true );
		if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
		object = scene.getObjectByName( "cams", true );
		if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
		object = scene.getObjectByName( "linkbar2", true );
		if (object && object.position.z < 0) { object.position.z += delta; done = 0;}
	}
	if (done > 0) {
		currState = 2.2;
		elementsLoaded = 0;
		load2_screws();
		sleepNSeconds(0.5);
		document.getElementById("hero").innerHTML = "AXIS SCREWS";
	}
}
function screwsIn() {
	done++;

	object = scene.getObjectByName( "screws2_1", true );
	if (object && object.position.z > 0.66) {
		object.position.z -= delta;
		done = 0;
	}
	object = scene.getObjectByName( "screws2_2", true );
	if (object && object.position.z < -0.66) {
		object.position.z += delta;
		done = 0;
	}
	if (done > 0) {
		currState = 2.3;
		sleepNSeconds(1);
	}
}
function swingCameraBack() {
	done++;
	var objsToMove = allframeobjs.concat(louvre1objs, louvreobjs, linkbarobjs);
	for (var i in objsToMove){
	    (function(index){
	        var object = scene.getObjectByName(objsToMove[index], true);
		    if (object && object.position.y < -1.25 * ydisp) {
		        object.position.y += 3 * delta;
		        done = 0;
		    } else if (object && object.position.y < -1.2*ydisp) {
		        object.position.y += delta;
		        done = 0;
		    }
	    })(i);
	}
	var screw1 = scene.getObjectByName("screws2_1", true);
	var screw2 = scene.getObjectByName("screws2_2", true);
	if (screw1 && screw2 && screw1.position.y < -0.275 * ydisp) {
		screw1.position.y += 3 * delta;
		screw2.position.y += 3 * delta;
		done = 0;
	} else if (screw1 && screw2 && screw1.position.y < -0.228*ydisp) {
		screw1.position.y += delta;
		screw2.position.y += delta;
		done = 0;
	}
	if (camera.position.x > -1) {camera.position.x -= 3*delta; done = 0;}
	if (camera.position.y < 0.5) {camera.position.y += 3*delta; done = 0;}
	if (camera.position.z < 2) {camera.position.z += 3*delta; done = 0;}
	if (done > 5) {
		currState = 3.0;
		load3_1();
		elementsLoaded = 0;
		document.getElementById("hero").innerHTML = "RIGHT MANEUVER WITH LEVER";
	}
}

function handleIn(){
	done++;
	object = scene.getObjectByName( "leveru", true );
	if (object && object.position.x < 0) { object.position.x += delta; done = 0;}
	object = scene.getObjectByName( "leverl", true );
	if (object && object.position.x < 0) { object.position.x += delta; done = 0;}
	object = scene.getObjectByName( "housingu", true );
	if (object && object.position.x < 0) { object.position.x += delta; done = 0;}
	object = scene.getObjectByName( "housingl", true );
	if (object && object.position.x < 0) { object.position.x += delta; done = 0;}
	object = scene.getObjectByName( "Lever mechanism screws", true );
	if (object && object.position.x < 0) { object.position.x += delta; done = 0;}
	// object = scene.getObjectByName( "screws3l", true );
	// if (object && object.position.x < 0) { object.position.x += delta; done = 0;}
	if (done > 30) {
		currState = 3.1;
		elementsLoaded = 0;
		document.getElementById("hero").innerHTML = "SIDE JAMB COVERS";
	}
}

function jambCoversIn() {
	done++;
	showObject("jambcover1");
	showObject("jambcover2");
	object = scene.getObjectByName( "jambcover1", true );
	if (object && object.position.z > 0) { object.position.z -= delta; done = 0;}
	object = scene.getObjectByName( "jambcover2", true );
	if (object && object.position.z < 0) { object.position.z += delta; done = 0;}
	if (done > 0) {
		currState = 3.2;
		sleepNSeconds(0.5);
	}
}

function zoomToBottom2() {
	done++;
	var objsToMove = allframeobjs.concat(louvre1objs, louvreobjs, linkbarobjs,
	 "screws2_1", "screws2_2", handleobjs, "jambcover1", "jambcover2");
	for (var i in objsToMove){
	    (function(index){
	        var object = scene.getObjectByName(objsToMove[index], true);
		    if (object && object.position.y < -.5*ydisp) {
		        object.position.y += 3 * delta;
		        done = 0;
		    }
	    })(i);
	}
	var screw1 = scene.getObjectByName("screws2_1", true);
	var screw2 = scene.getObjectByName("screws2_2", true);
	if (screw1 && screw2 && screw1.position.y < .525 * ydisp) {
		screw1.position.y += 3 * delta;
		screw2.position.y += 3 * delta;
		done = 0;
	}
	if (camera.position.x < 1.2) {camera.position.x += 3*delta; done = 0;}
	if (camera.position.y > -3) {camera.position.y -= 7*delta; done = 0;}
	if (camera.position.z > 0) {camera.position.z -= 3*delta; done = 0;}
	if (done > 30) {
		currState = 3.3;
		document.getElementById("hero").innerHTML = "DEFLECTORS";
	}
}

function drainageCoverIn(){
	done++;
	showObject("drainage");
	object = scene.getObjectByName( "drainage", true );
	if (object && object.position.x > 0) {
		object.position.x -= delta;
		done = 0;
	}
	if (done > 0) {
		currState = 3.4;
		sleepNSeconds(1);
	}
}

function swingCameraBack2(){
	done++;
	for (var i in noscrewobjs){
	    (function(index){
	        var object = scene.getObjectByName(noscrewobjs[index], true);
		    if (object && object.position.y > -(ydisp+6*delta)) {
		        object.position.y -= 6 * delta;
		        done = 0;
		    } else if (object && object.position.y > -(ydisp+3*delta)) {
		        object.position.y -= 2 * delta;
		        done = 0;
		    }
	    })(i);
	}
	var screw1 = scene.getObjectByName("screws2_1", true);
	var screw2 = scene.getObjectByName("screws2_2", true);
	if (screw1 && screw2 && screw1.position.y > -(ydisp+6*delta) + 1.025*ydisp) {
		screw1.position.y -= 6 * delta;
		screw2.position.y -= 6 * delta;
		done = 0;
	}
	if (camera.position.x > -7) {
		camera.position.x -= 15*delta;
		done = 0;
	}
	if (camera.position.y < 2) {camera.position.y += 10*delta; done = 0;}
	if (camera.position.z < 5) {camera.position.z += 10*delta; done = 0;}
	if (done > 0 ){
		currState = 3.5;
		document.getElementById("hero").innerHTML = "FLYSCREEN ASSEMBLY";
	}

}
function flyscreenIn(){
	done++;
	showObject("flyscreen");
	var object = scene.getObjectByName("flyscreen mesh", true);
	if (object) {
		object.visible = true;
		// object.children[0].material.transparent = true;
	    objects.push(object);
	}

	object = scene.getObjectByName( "flyscreen", true );
	if (object && object.position.x < 0) {
		object.position.x += 2 * delta;
		done = 0;
	}
	object = scene.getObjectByName( "flyscreen mesh", true );
	if (object && object.position.x < 0) {
		object.position.x += 2 * delta;
		done = 0;
	}
	if ( done > 0 ) {
		currState = 3.6;
		sleepNSeconds(0.5);
	}
}

function showObject(toShow){
	var object = scene.getObjectByName(toShow, true);
	if (object && object.visible == false) {
		object.visible = true;
	    objects.push(object);
	    sleepNSeconds(0.5);
	}
}

function swingCameraForward2() {
	done++;

	if (camera.position.x < 7) {camera.position.x += 30*delta; done = 0;}
	if (camera.position.y < 2) {camera.position.y += 3*delta; done = 0;}
	if (camera.position.z < 5) {camera.position.z += 5*delta; done = 0;}
	if (done > 3) {currState = 3.7; tare();}
}
function openLouvres(){
	done++;
	for (var i in louvre1objs){
	    (function(index){
		   var object = scene.getObjectByName(louvre1objs[index], true);
		   if (object && object.rotation.z < 45*Math.PI / 180) {
			   object.rotation.z += 0.01;
			   object.position.x = 19*0.135*Math.sin(object.rotation.z);
			   object.position.y = 19*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
			   object.position.y += object.rotation.z * 0.02;
			   done = 0;
		   }
	    })(i);
	}
	for (var i in louvreobjs){
	    (function(index){
		   var object = scene.getObjectByName(louvreobjs[index], true);
		   if (object && object.rotation.z < 45*Math.PI / 180) {
			   object.rotation.z += 0.01;
			   object.position.x = (18-index)*0.135*Math.sin(object.rotation.z);
			   object.position.y = (18-index)*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
			   object.position.y += object.rotation.z * 0.02;
			   done = 0;
		   }
	    })(i);
	}
	var object = scene.getObjectByName("leverl", true);
    if (object && object.rotation.z < 45*Math.PI / 180) {
	   object.rotation.z += 0.01;
	   object.position.x = 6*0.135*Math.sin(object.rotation.z);
	   object.position.y = 6*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
	   object.position.y += object.rotation.z * 0.02;
	   done = 0;
    }
    var object = scene.getObjectByName("leveru", true);
    if (object && object.rotation.z < 45*Math.PI / 180) {
	   object.rotation.z += 0.01;
	   object.position.x = 13*0.135*Math.sin(object.rotation.z);
	   object.position.y = 13*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
	   object.position.y += object.rotation.z * 0.02;
	   done = 0;
    }

	if (done > 0) {currState = 4;
		$(document.body).addClass('interact');
		document.getElementById("hero").innerHTML = "ORBIT, PAN, OR ZOOM";
	}
}
function closeLouvres() {
	done++;
		for (var i in louvre1objs){
	    (function(index){
		   var object = scene.getObjectByName(louvre1objs[index], true);
		   if (object && object.rotation.z > 0) {
			   object.rotation.z -= 0.01;
			   object.position.x = 19*0.135*Math.sin(object.rotation.z);
			   object.position.y = 19*0.135*(1 - Math.cos(object.rotation.z)) - ydisp + 0.001;
			   object.position.y += object.rotation.z * 0.02;
			   done = 0;
		   }
	    })(i);
	}
	for (var i in louvreobjs){
	    (function(index){
	    	var object = scene.getObjectByName(louvreobjs[index], true);
	        if (object && object.rotation.z > 0) {
				object.rotation.z -= 0.01;
				object.position.x = (18-index)*0.135*Math.sin(object.rotation.z);
				object.position.y = (18-index)*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
				object.position.y += object.rotation.z * 0.02;
				done = 0;
		   }
	    })(i);
	}
	var object = scene.getObjectByName("leverl", true);
    if (object && object.rotation.z > 0) {
	   object.rotation.z -= 0.01;
	   object.position.x = 6*0.135*Math.sin(object.rotation.z);
	   object.position.y = 6*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
	   object.position.y += object.rotation.z * 0.02;
	   done = 0;
    }
    var object = scene.getObjectByName("leveru", true);
    if (object && object.rotation.z > 0) {
	   object.rotation.z -= 0.01;
	   object.position.x = 13*0.135*Math.sin(object.rotation.z);
	   object.position.y = 13*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
	   object.position.y += object.rotation.z * 0.02;
	   done = 0;
    }
	if (done > 0) {currState = 4;}
}
function explodeFrame(){
	// don't explode if shutters open for now -- animations wrong
	done++;
	for (var i in allobjs){
	    (function(index){
	        var object = scene.getObjectByName(allobjs[index], true);
	        if (object) {
	        	delta = 0.005;
	        	// if ( shuttersOpen && index > 9 && index < 36 ) {
	        	// 	var louvreNum;
	        	// 	if (index < 19) {
	        	// 		louvreNum = 19;
	        	// 	} else {
	        	// 		louvreNum = 28 - index;
	        	// 	}
	        	// 	if (object.position.x > targetDistx[index] +
	        	// 		(louvreNum)*0.135*Math.sin(object.rotation.z) + 0.005) {
		        // 		object.position.x -= delta; done = 0;
		        // 	} else if (object.position.x < targetDistx[index] +
		        // 		(louvreNum)*0.135*Math.sin(object.rotation.z) - 0.005) {
		        // 		object.position.x += delta; done = 0;
		        // 	}
		        // 	if (object.position.y > targetDisty[index] +  0.006 - ydisp +
		        // 		(louvreNum)*0.135*(1 - Math.cos(object.rotation.z)) + .79 * 0.02 ) {
		        // 		object.position.y -= delta; done = 0;
		        // 	} else if (object.position.y < targetDisty[index] - 0.004 - ydisp +
		        // 		(louvreNum)*0.135*(1 - Math.cos(object.rotation.z)) + .79 * 0.02) {
		        // 		object.position.y += delta; done = 0;
		        // 	}
	        	// } else {
		        	if (object.position.x > targetDistx[index] + 0.005) {
		        		object.position.x -= delta; done = 0;
		        	} else if (object.position.x < targetDistx[index] - 0.005) {
		        		object.position.x += delta; done = 0;
		        	}
		        	if (object.position.y > targetDisty[index] + 0.005 - ydisp) {
		        		object.position.y -= delta; done = 0;
		        	} else if (object.position.y < targetDisty[index] - 0.005 - ydisp) {
		        		object.position.y += delta; done = 0;
		        	}
		        // }
	        	if (object.position.z > targetDistz[index] + 0.005) {
	        		object.position.z -= delta; done = 0;
	        	} else if (object.position.z < targetDistz[index] - 0.005) {
	        		object.position.z += delta; done = 0;
	        	}
	        }
	    })(i);
	}

	if (done > 30) {currState = 4.0;}
}
function implodeFrame() {
	done++;
	for (var i in noscrewobjs){
	    (function(index){
	        var object = scene.getObjectByName(noscrewobjs[index], true);
	        if (object) {
	        	if (object.position.x > 0.005) {
	        		object.position.x -= delta; done = 0;
	        	} else if (object.position.x < -0.005) {
	        		object.position.x += delta; done = 0;
	        	}
	        	if (object.position.y > -ydisp+0.005) {
	        		object.position.y -= delta; done = 0;
	        	} else if (object.position.y < -ydisp-0.005) {
	        		object.position.y += delta; done = 0;
	        	}
	        	if (object.position.z > 0.005) {
	        		object.position.z -= delta; done = 0;
	        	} else if (object.position.z < -0.005) {
	        		object.position.z += delta; done = 0;
	        	}
	        }
	    })(i);
	}
	var object = scene.getObjectByName("screws2_1", true);
	if (object) {
		if (object.position.z > 0.66) {
			object.position.z -= delta; done = 0;
		}
	}
	var object = scene.getObjectByName("screws2_2", true);
	if (object) {
		if (object.position.z < -0.66) {
			object.position.z += delta; done = 0;
		}
	}

	if (done > 30) {currState = 4.0;}
}
