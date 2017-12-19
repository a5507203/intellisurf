//////////////////////
//                  //
//	LOAD FUNCTIONS  //
//                  //
//////////////////////

// loader workflow -- take resource URL
// pass the loaded data to the onLoad function.
// add the loaded object to the scene

// TODO: Change everything to preload, and fade in at the appropriate time

// load0 loads the frame
function load0(first){
	// REFLECTION MATERIAL //
    var urls = [
          'images/pos-x.png',
          'images/neg-x.png',
          'images/pos-y.png',
          'images/neg-y.png',
          'images/pos-z.png',
          'images/neg-z.png'
        ];

    // wrap it up into the object that we need
    var cubemap = THREE.ImageUtils.loadTextureCube(urls);
    cubemap.format = THREE.RGBFormat;
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].texture = cubemap;

    var reflectionMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      envMap: cubemap,
      transparent: true,
      opacity: 0.3,
      needsUpdate: true
    });

    var loader = new THREE.ObjectLoader(manager);
    loader.load("data/set0/frame_sidejamb1.json", function ( obj ) {
    	obj.name = "sidejamb1";
    	obj.position.z = .4;
    	obj.position.y -= ydisp;
    	// obj.visible = false;
	    scene.add( obj );
	    objects.push(obj);
	});
	loader.load("data/set0/frame_sidejamb2.json", function ( obj ) {
    	obj.name = "sidejamb2";
    	obj.position.z = -.4;
    	obj.position.y -= ydisp;
    	// obj.visible = false;
	    scene.add( obj );
	    objects.push(obj);
	});
	loader.load("data/set0/frame_transom_top.json", function ( obj ) {
    	obj.name = "toptransom";
    	obj.position.y = .4;
    	obj.position.y -= ydisp;
    	// obj.visible = false;
	    scene.add( obj );
	    objects.push(obj);
	});
	loader.load("data/set0/frame_transom_bot.json", function ( obj ) {
		obj.name = "bottransom";
		obj.position.y = -.4;
		obj.position.y -= ydisp;
		// obj.visible = false;
	    scene.add( obj );
	    objects.push(obj);
	});
    loader.load("data/set0/gasket_side1.json", function ( obj ) {
    	obj.name = "gasketside1";
    	obj.position.z = .1;
    	obj.position.y -= ydisp;
	    scene.add( obj );
	    objects.push(obj);
	});
	loader.load("data/set0/gasket_side2.json", function ( obj ) {
    	obj.name = "gasketside2";
    	obj.position.z = -.1;
    	obj.position.y -= ydisp;
	    scene.add( obj );
	    objects.push(obj);
	});
	loader.load("data/set0/gasket_transom_upper.json", function ( obj ) {
    	obj.name = "gaskettransomu";
    	obj.position.y = .1;
    	obj.position.y -= ydisp;
	    scene.add( obj );
	    objects.push(obj);
	});
	loader.load("data/set0/gasket_transom_lower.json", function ( obj ) {
		obj.name = "gaskettransoml";
		obj.position.y = -.1;
		obj.position.y -= ydisp;
	    scene.add( obj );
	    objects.push(obj);
	});
    loader.load("data/set0/screws1_1.json", function ( obj ) {
    	obj.name = "screws1_1";
    	obj.position.z = .3;
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	    objects.push(obj);
	});
	loader.load("data/set0/screws1_2.json", function ( obj ) {
    	obj.name = "screws1_2";
    	obj.position.z = -.3;
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	    objects.push(obj);
	});

	// loads louvre assembly elements
    //var loader = new THREE.ObjectLoader();
    loader.load("data/set1/louvre_glass.json", function ( obj ) {
    	obj.name = "louvreglass";
    	obj.position.x = .2;
		obj.position.y -= .1;
    	obj.position.y -= ydispzoom;
    	obj.visible = false;
    	obj.children[0].material = reflectionMaterial;
    	// obj.renderOrder = 1;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_gasket_rebate.json", function ( obj ) {
    	obj.name = "rebategasket";
    	obj.position.x = .2;
    	obj.position.y = .05;
    	obj.position.y -= ydispzoom;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_gasket_glazing.json", function ( obj ) {
    	obj.name = "glazinggasket";
    	obj.position.x = .2;
    	obj.position.y = -0.05;
    	obj.position.y -= ydispzoom;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_bearer.json", function ( obj ) {
		obj.name = "louvrebearer";
    	obj.position.x = .2;
		obj.position.y -= ydispzoom;
		obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set1/louvre_endcap1.json", function ( obj ) {
    	obj.name = "endcap1";
    	obj.position.x = .2;
    	obj.position.z = .1;
		obj.position.y -= ydispzoom;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_endcap2.json", function ( obj ) {
    	obj.name = "endcap2";
    	obj.position.x = .2;
    	obj.position.z = -.1;
    	obj.position.y -= ydispzoom;
    	obj.visible = false;
	    scene.add( obj );
	});
    // axis screws for louvre 1
    loader.load("data/set1/louvre1_axis1.json", function ( obj ) {
        obj.name = "axis1";
        obj.position.z = .3;
        obj.position.y -= 1.8 * ydisp;
        obj.visible = false;
        scene.add( obj );
    });
    loader.load("data/set1/louvre1_axis2.json", function ( obj ) {
        obj.name = "axis2";
        obj.position.z = -.3;
        obj.position.y -= 1.8 * ydisp;
        obj.visible = false;
        scene.add( obj );
    });

	// loads louvres 2 - 19


	for (var i = 2; i <= 19; i++) {
	    (function(index){
	        loader.load("data/set2/louvre" + index + ".json", function ( obj ) {
		    	obj.name = "louvre" + index;
		    	obj.position.y -= 1.8*ydisp;
		    	obj.visible = false;
		    	obj.castShadow = true;
	        	obj.children[7].material = reflectionMaterial;

			    scene.add( obj );
			});
	    })(i);
	}

	// screws from step C (hold louvres to link bar)
	// made visible in load2_1();
    loader.load("data/set2/linkbar1.json", function ( obj ) {
    	obj.position.z = .3;
    	obj.name = "linkbar1";
    	obj.position.y -= 1.8*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set2/linkbar2.json", function ( obj ) {
    	obj.name = "linkbar2";
    	obj.position.z = -.3;
    	obj.position.y -= 1.8*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set2/handle_linkbar_connection.json", function ( obj ) {
    	obj.name = "cams";
    	obj.position.z = .3;
    	obj.position.y -= 1.8*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set2/linkbar_pivots1.json", function ( obj ) {
    	obj.name = "pivots1";
    	obj.position.z = .3;
    	obj.position.y -= 1.8*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set2/linkbar_pivots2.json", function ( obj ) {
		obj.name = "pivots2";
		obj.position.z = -.3;
		obj.position.y -= 1.8*ydisp;
		obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set2/axisscrews2.json", function ( obj ) {
    	obj.name = "screws2_1";
    	obj.position.z = 1;
    	obj.position.y -= 0.825*ydisp;
        obj.position.x = -0.0237;
    	obj.visible = false;
        obj.scale.set(0.001, 0.001, 0.001);
        obj.rotation.x = 90*Math.PI / 180;
	    scene.add( obj );
	});
	loader.load("data/set2/axisscrews2.json", function ( obj ) {
    	obj.name = "screws2_2";
        obj.position.z = -1;
        obj.position.y -= 0.825*ydisp;
        obj.position.x = -0.0237;
    	obj.visible = false;
        obj.scale.set(0.001, 0.001, 0.001);
        obj.rotation.x = 270*Math.PI / 180;
	    scene.add( obj );
	});

	// Loads scene 3 objects -- handles, and covers
	loader.load("data/set3/handle_upper_lever.json", function ( obj ) {
    	obj.position.x = -.4;
    	obj.position.y -= 1.2*ydisp;
    	obj.visible = false;
    	obj.name = "leveru";
	    scene.add( obj );
	});
	loader.load("data/set3/handle_lower_lever.json", function ( obj ) {
    	obj.name = "leverl";
    	obj.position.x = -.4;
    	obj.position.y -= 1.2*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set3/handle_upper_housing.json", function ( obj ) {
    	obj.position.x = -.4;
    	obj.position.y -= 1.2*ydisp;
    	obj.visible = false;
    	obj.name = "housingu";
	    scene.add( obj );
	});
	loader.load("data/set3/handle_lower_housing.json", function ( obj ) {
    	obj.name = "housingl";
    	obj.position.x = -.4;
    	obj.position.y -= 1.2*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
    // loader.load("data/set3/handle_upper_screws.json", function ( obj ) {
    loader.load("data/set3/handlescrews.json", function ( obj ) {
    	obj.position.x = -.5;
    	obj.position.y -= 1.2*ydisp;
    	obj.visible = false;
    	obj.name = "Lever mechanism screws";
	    scene.add( obj );
	});
	// loader.load("data/set3/handle_lower_screws.json", function ( obj ) {
    // 	obj.name = "screws3l";
    // 	obj.position.x = -.5;
    // 	obj.position.y -= 1.2*ydisp;
    // 	obj.visible = false;
	//     scene.add( obj );
	// });
	loader.load("data/set3/jambcover1.json", function ( obj ) {
    	obj.name = "jambcover1";
    	obj.position.z = .4;
    	obj.position.y -= 1.2*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set3/jambcover2.json", function ( obj ) {
		obj.name = "jambcover2";
		obj.position.z = -.4;
		obj.position.y -= 1.2*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set3/drainage_cover.json", function ( obj ) {
    	obj.name = "drainage";
    	obj.position.x = .4;
    	obj.position.y -= .5*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set3/flyscreen.json", function ( obj ) {
    	obj.name = "flyscreen";
    	obj.position.x = -.5;
    	obj.position.y -= .5*ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set3/flyscreen_mesh.json", function ( obj ) {
    	obj.name = "flyscreen mesh";
    	obj.position.x = -.5;
    	obj.position.y -= .5*ydisp;
    	obj.visible = false;
		var flyscreenTexture = new THREE.ImageUtils.loadTexture( 'images/FLYSCREEN TILE.png' );
		flyscreenTexture.wrapS = flyscreenTexture.wrapT = THREE.RepeatWrapping;
		flyscreenTexture.repeat.set( 200, 200 );
		var flyscreenMat = new THREE.MeshBasicMaterial( { color: 0x00ff00, map: flyscreenTexture, transparent: true, overdraw: true, side: THREE.DoubleSide} );
		obj.children[0].material = flyscreenMat;

		scene.add(obj);
	});
	// for (var i in scene3objs){
	// 	(function(index){
	//         var object = scene.getObjectByName(scene3objs[index], true);
	//     	object.position.y -= ydisp;
	//     	object.visible = false;
	//     })(i);
	// }
	return;
}

function showFrameScrews(){
	for (var i in framescrewobjs){
	    (function(index){
	        var object = scene.getObjectByName(framescrewobjs[index], true);
	        if (object) {object.visible = true; objects.push(object);}
	    })(i);
	}
	elementsLoaded = 1;
}

function load1(){
    var louvre1noaxis = ["louvreglass", "louvrebearer", "glazinggasket",
        "rebategasket", "endcap1", "endcap2"]
	for (var i in louvre1noaxis){
	    (function(index){
	        var object = scene.getObjectByName(louvre1noaxis[index], true);
	        if (object) {
                object.visible = true;
                objects.push(object);
            }
	    })(i);
	}
	elementsLoaded = 1;
}
function load1_1(){
    var object = scene.getObjectByName("axis1", true);
    object.visible = true;
    objects.push(object);
    var object = scene.getObjectByName("axis2", true);
    object.visible = true;
    objects.push(object);
	elementsLoaded = 1;
}
function load2() {
	for (var i in louvreobjs){
	    (function(index){
	        var object = scene.getObjectByName(louvreobjs[index], true);
	        if (object) {object.visible = true; objects.push(object); }
	    })(i);
	}
	elementsLoaded = 1;
}
function load2_1(){
	for (var i in linkbarobjs){
	    (function(index){
	        var object = scene.getObjectByName(linkbarobjs[index], true);
	        if (object) {object.visible = true; objects.push(object); }
	    })(i);
	}
	elementsLoaded = 1;
}
function load2_screws(){
    var object = scene.getObjectByName( "screws2_1", true);
    if (object) {object.visible = true;
    	objects.push(object);
    }
    var object = scene.getObjectByName( "screws2_2", true);
    if (object) {object.visible = true;
    	objects.push(object);
    }
	elementsLoaded = 1;
}
function load3_1() {
	// var loader = new THREE.ObjectLoader();
	for (var i in handleobjs){
		(function(index){
	        var object = scene.getObjectByName(handleobjs[index], true);
	        if (object) {object.visible = true; objects.push(object); }
	    })(i);
	}
	elementsLoaded = 1;
}
function load3_2() {
	// var loader = new THREE.ObjectLoader();
	for (var i in miscobjs){
		(function(index){
	        var object = scene.getObjectByName(miscobjs[index], true);
	        if (object) {object.visible = true; objects.push(object); }
	    })(i);
	}
	elementsLoaded = 1;
}
function tare(){
	for (var i in allobjs){
	    (function(index){
	        var object = scene.getObjectByName(allobjs[index], true);
	        if (object) object.position.set( 0, -ydisp, 0 ) ;
	    })(i);
	}
    var object = scene.getObjectByName("screws2_1", true);
    if (object) object.position.set( -0.0237, -0.025*ydisp, 0.66 ) ;
    var object = scene.getObjectByName("screws2_2", true);
    if (object) object.position.set( -0.0237, -0.025*ydisp, -0.66 ) ;

	elementsLoaded = 1;
}
function tare0(){
	for (var i in frameobjs){
	    (function(index){
	        var object = scene.getObjectByName(frameobjs[index], true);

	        if (object) {object.position.set(0, -1.8*ydisp, 0); }

	    })(i);
	}
	elementsLoaded = 1;
}

function replayDemo(){
    camera.position.set(1, 5, 0);
    camera.lookAt( scene.position );

    for (var i in allobjs){
        (function(index){
            var object = scene.getObjectByName(allobjs[index], true);
            if (object) {
                object.position.x = targetDistx[index];
                object.position.y = targetDisty[index] - ydisp;
                object.position.z = targetDistz[index];
                object.visible = false;
            }
        })(i);
    }
    var obj = scene.getObjectByName("drainage", true);
        obj.position.x = .4;
        obj.position.y = -.5*ydisp;
        obj.visible = false;

    var obj = scene.getObjectByName("sidejamb1", true);
        obj.position.z = .4;
        obj.position.y = - ydisp;
        obj.visible = true;
    var obj = scene.getObjectByName("sidejamb2", true);
        obj.position.z = -.4;
        obj.position.y = - ydisp;
        obj.visible = true;
    var obj = scene.getObjectByName("toptransom", true);
        obj.position.y = .4;
        obj.position.y -= ydisp;
        obj.visible = true;
    var obj = scene.getObjectByName("bottransom", true);
        obj.position.y = -.4;
        obj.position.y -= ydisp;
        obj.visible = true;
    var obj = scene.getObjectByName("gasketside1", true);
        obj.position.z = .1;
        obj.position.y = - ydisp;
        obj.visible = true;
    var obj = scene.getObjectByName("gasketside2", true);
        obj.position.z = -.1;
        obj.position.y = - ydisp;
        obj.visible = true;
    var obj = scene.getObjectByName("gaskettransomu", true);
    	obj.position.y = .1;
    	obj.position.y -= ydisp;
        obj.visible = true;
	var obj = scene.getObjectByName("gaskettransoml", true);
		obj.position.y = -.1;
		obj.position.y -= ydisp;
        obj.visible = true;

    var obj = scene.getObjectByName("louvreglass", true);
        obj.position.x = .2;
        obj.position.y = - .1;
        obj.position.y -= ydispzoom;
        obj.rotation.z = 0;
    var obj = scene.getObjectByName("rebategasket", true);
        obj.position.x = .2;
        obj.position.y = .05;
        obj.position.y -= ydispzoom;
        obj.rotation.z = 0;
    var obj = scene.getObjectByName("glazinggasket", true);
        obj.position.x = .2;
        obj.position.y = -0.05;
        obj.position.y -= ydispzoom;
        obj.rotation.z = 0;
    var obj = scene.getObjectByName("louvrebearer", true);
        obj.position.x = .2;
        obj.position.y = -ydispzoom;
        obj.rotation.z = 0;
    var obj = scene.getObjectByName("endcap1", true);
        obj.position.x = .2;
        obj.position.z = .1;
        obj.position.y = - ydispzoom;
        obj.rotation.z = 0;
    var obj = scene.getObjectByName("endcap2", true);
        obj.position.x = .2;
        obj.position.z = -.1;
        obj.position.y = - ydispzoom;
        obj.rotation.z = 0;
    var obj = scene.getObjectByName("axis1", true);
        obj.position.z = .3;
        obj.position.y = - 1.8 * ydisp;
        obj.rotation.z = 0;
    var obj = scene.getObjectByName( "axis2", true);
        obj.position.z = -.3;
        obj.position.y = - 1.8 * ydisp;
        obj.rotation.z = 0;

        var obj = scene.getObjectByName("linkbar1", true);
            obj.position.y = -1.8*ydisp;
        var obj = scene.getObjectByName("linkbar2", true);
            obj.position.y = -1.8*ydisp;
        var obj = scene.getObjectByName("cams", true);
            obj.position.y = -1.8*ydisp;
        var obj = scene.getObjectByName("pivots1", true);
            obj.position.y = -1.8*ydisp;
        var obj = scene.getObjectByName("pivots2", true);
            obj.position.y = -1.8*ydisp;
        var obj = scene.getObjectByName("screws2_1", true);
            obj.position.y = -0.825*ydisp;
            obj.position.z = 1;
            obj.position.x = -0.0237;
        var obj = scene.getObjectByName("screws2_2", true);
            obj.position.y = -0.825*ydisp;
            obj.position.z = -1;
            obj.position.x = -0.0237;

        // Loads scene 3 objects -- handles, and covers
        var obj = scene.getObjectByName("leveru", true);
            obj.position.y = -1.2*ydisp;
            obj.rotation.z = 0;
        var obj = scene.getObjectByName("leverl", true);
            obj.position.y = -1.2*ydisp
            obj.rotation.z = 0;
        var obj = scene.getObjectByName("housingu", true);
            obj.position.y = -1.2*ydisp;
        var obj = scene.getObjectByName("housingl", true);
            obj.position.y = -1.2*ydisp;
        var obj = scene.getObjectByName("Lever mechanism screws", true);
            obj.position.y = -1.2*ydisp;
        // var obj = scene.getObjectByName("screws3l", true);
        //     obj.position.y = -1.2*ydisp;


	for (var i in louvreobjs) {
	    (function(index){
            var obj = scene.getObjectByName(louvreobjs[index], true);
            if (obj) {
    	    	obj.position.x = 0;
    	    	obj.position.y = - 1.8*ydisp;
                obj.rotation.z = 0;
            }
	    })(i);
	}

    $(document.body).removeClass('interact');
    $(document.body).removeClass('notOnExplode');
    document.getElementById("explode").src = "images/EXPLODE CIRCLE.png";
    document.getElementById("shutters").src = "images/CLOSE LOUVRE.png";
    shuttersOpen = true;
    $(document.body).addClass('notOnOpen');
    currState = 0.0;
}
