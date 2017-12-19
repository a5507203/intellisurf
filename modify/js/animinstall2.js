///////////////////////////
//						 //
//	ANIMATION FUNCTIONS  //
//						 //
///////////////////////////
function loadInit() {
	done++;
	if (elementsLoaded == 0) { 
		// checks if building loaded, and sets up variabels that may have changes
		var object = scene.getObjectByName("building", true);
		if (object){
			// places camera
			camera.position.set(24, -18, -9);
			// sets correct x, y and z for building
			// y being correct y displacement, raised 6.5 * ydisp
			object.position.set((4 * ydisp), -(14.83 * ydisp), -(0.7 * ydisp));
			elementsLoaded = 1;

			hide1();
			hide2();
		}
		done = 0;
	}
	if (done > 0) {
		currState = 0.0;
		elementsLoaded = 0;
	}
}

function swingCamUp(){
	done++;
	if (camera.position.y < 0) {
		camera.position.y += 25*delta;
		done = 0;
	}
	var object = scene.getObjectByName("building", true);
	if (object && object.position.y > (-20 *ydisp)) {
		object.position.y -= 12*delta;
		done = 0;
	} else if (object && object.position.y > (-21.2 *ydisp)) {
		object.position.y -= 5*delta;
		done = 0;
	}
	if (done > 0) currState = 0.01;
}	

function swingThroughWindow(){
	done++;
	var object = scene.getObjectByName("building", true);
	if (object && object.position.x > (-4 * ydisp)) {
		object.position.x -= 9 * delta;
		done = 0;
	}
	if (object && object.position.y > (-21.311 *ydisp)) { object.position.y -= delta; done = 0; }
	if (camera.position.x > -1.7) {camera.position.x -= 21*delta; done = 0;}
	if (camera.position.z < -1) {camera.position.z += 6.5*delta; done = 0;}    
	if (done > 0) {
		currState = 0.1;
		sleepNSeconds(0.5);
	}
	return;
}
function loadAssembly() {
	done++;
	// if the louvre elements are not loaded, load them
	if (elementsLoaded == 0) {
		show1();
		elementsLoaded = 1;
		done = 0;
	}
	if (done > 0) {
		currState = 1;
		elementsLoaded = 0;
		sleepNSeconds(0.5);
	}
}
function moveForwards(){
	done++;
	for (var i in louvreobjs){ 
	    (function(index){
	        var object = scene.getObjectByName(louvreobjs[index], true);
	        if (object && object.position.x < .62) {
	        	object.position.x += 5*deltas;
	        	done = 0;
	        }
	    })(i);
	}
	if (done > 0) {
		currState = 2.0;
		sleepNSeconds(0.5);
	}
}
function showBolts(){
	done++;
	if (elementsLoaded == 0) {
		show2();
		elementsLoaded = 1;
		done = 0;
	}
	if (camera.position.x < -1.12) {
		camera.position.x += 2*delta;
		done = 0;
	}
	if (done > 0) {
		currState = 2.1;
		elementsLoaded = 0;
		sleepNSeconds(1);
	}
}
function boltsIn() {
	done++;
    var object = scene.getObjectByName("bolt1", true);
	if (object && object.position.z < 0.65) {
        object.position.z += 1.5*deltas;
        done = 0;
    }
    var object = scene.getObjectByName("bolt2", true);
	if (object && object.position.z < 0.65) {
        object.position.z += 1.5*deltas;
        done = 0;
    }
    var object = scene.getObjectByName("bolt3", true);
	if (object && object.position.z > -0.65) {
        object.position.z -= 1.5*deltas;
        done = 0;
    }
    var object = scene.getObjectByName("bolt4", true);
	if (object && object.position.z > -0.65) {
        object.position.z -= 1.5*deltas;
        done = 0;
    }
    if (done > 0) {
    	currState = 3.0;
    	elementsLoaded = 0;
    	sleepNSeconds(0.5);
    }
}
function normalZoom(){
		done++;

		//zoom out
		if (camera.position.x > -1.7) {
			camera.position.x -= 2*delta;
			done = 0;
		}
		if (done > 0) {
			currState = 3.1;
			sleepNSeconds(1);
		}
}

function caulking() {
	currState = 4.0;
	sleepNSeconds(2);
}

// function openLouvres(){
// 	done++;
// 	for (var i in louvre1objs){ 
// 	    (function(index){
// 		   var object = scene.getObjectByName(louvre1objs[index], true);
// 		   if (object && object.rotation.z < 45*Math.PI / 180) {
// 			   object.rotation.z += 0.01;
// 			   object.position.x = 19*0.135*Math.sin(object.rotation.z) + .62;
// 			   object.position.y = 19*0.135*(1 - Math.cos(object.rotation.z)) - ydisp + 0.001;
// 			   object.position.y += object.rotation.z * 0.02;
// 			   done = 0;
// 		   }
// 	    })(i);
// 	}
// 	for (var i in louvreobjs){ 
// 	    (function(index){
// 		   var object = scene.getObjectByName(louvreobjs[index], true);
// 		   if (object && object.rotation.z < 45*Math.PI / 180) {
// 			   object.rotation.z += 0.01;
// 			   object.position.x = (18-index)*0.135*Math.sin(object.rotation.z) + .62;
// 			   object.position.y = (18-index)*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
// 			   object.position.y += object.rotation.z * 0.02;
// 			   done = 0;
// 		   }
// 	    })(i);
// 	}
// 	var object = scene.getObjectByName("leverl", true);
//     if (object && object.rotation.z < 45*Math.PI / 180) {
// 	   object.rotation.z += 0.01;
// 	   object.position.x = 6*0.135*Math.sin(object.rotation.z) + .62;
// 	   object.position.y = 6*0.135*(1 - Math.cos(object.rotation.z)) - ydisp + 0.001;
// 	   object.position.y += object.rotation.z * 0.02;
// 	   done = 0;
//     }
//     var object = scene.getObjectByName("leveru", true);
//     if (object && object.rotation.z < 45*Math.PI / 180) {
// 	   object.rotation.z += 0.01;
// 	   object.position.x = 13*0.135*Math.sin(object.rotation.z) + .62;
// 	   object.position.y = 13*0.135*(1 - Math.cos(object.rotation.z)) - ydisp + 0.001;
// 	   object.position.y += object.rotation.z * 0.02;
// 	   done = 0;
//     }

// 	if (done > 0) {
// 		currState = 4;
// 		sleepNSeconds(2);
// 	}
// }
// function closeLouvres() {
// 	done++;
// 		for (var i in louvre1objs){ 
// 	    (function(index){
// 		   var object = scene.getObjectByName(louvre1objs[index], true);
// 		   if (object && object.rotation.z > 0) {
// 			   object.rotation.z -= 0.01;
// 			   object.position.x = 19*0.135*Math.sin(object.rotation.z) + .62;
// 			   object.position.y = 19*0.135*(1 - Math.cos(object.rotation.z)) - ydisp + 0.001;
// 			   object.position.y += object.rotation.z * 0.02;
// 			   done = 0;
// 		   }
// 	    })(i);
// 	}
// 	for (var i in louvreobjs){ 
// 	    (function(index){
// 	    	var object = scene.getObjectByName(louvreobjs[index], true);
// 	        if (object && object.rotation.z > 0) {
// 				object.rotation.z -= 0.01;
// 				object.position.x = (18-index)*0.135*Math.sin(object.rotation.z) + .62;
// 				object.position.y = (18-index)*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
// 				object.position.y += object.rotation.z * 0.02;
// 				done = 0;
// 		   }
// 	    })(i);
// 	}
// 	var object = scene.getObjectByName("leverl", true);
//     if (object && object.rotation.z > 0) {
// 	   object.rotation.z -= 0.01;
// 	   object.position.x = 6*0.135*Math.sin(object.rotation.z) + .62;
// 	   object.position.y = 6*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
// 	   object.position.y += object.rotation.z * 0.02;
// 	   done = 0;
//     }
//     var object = scene.getObjectByName("leveru", true);
//     if (object && object.rotation.z > 0) {
// 	   object.rotation.z -= 0.01;
// 	   object.position.x = 13*0.135*Math.sin(object.rotation.z) + .62;
// 	   object.position.y = 13*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
// 	   object.position.y += object.rotation.z * 0.02;
// 	   done = 0;
//     }
// 	if (done > 0) {
// 		currState = 4;
// 		sleepNSeconds(2);
// 	}
// }