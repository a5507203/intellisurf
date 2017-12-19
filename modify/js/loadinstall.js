//////////////////////
//					//
//	LOAD FUNCTIONS  //
//					//
//////////////////////

// loader workflow -- take resource URL
// pass the loaded data to the onLoad function.
// add the loaded object to the scene

// black background
// materials
// rubber -- all gaskets, greasy black less black than bg
// glass -- slight grey tint (5-10%)
// frame -- satin aluminium, louvre bearer also
// screws -- shiny metallic, pivots, linkbar, linkbar connection
// handle -- matte black metallic
// endcap -- black plastic
// drainage plugs -- grey plastic

// TODO: Change everything to preload, and fade in at the appropriate time

// load0 loads the frame
function load0(){
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
    loader.load("data/install/buildingwglass.json", function ( obj ) {
    	obj.name = "building";
    	obj.rotation.y = 90* Math.PI / (180);
    	obj.receiveShadow = true;
    	obj.children[0].material.opacity = .7;
    	obj.children[0].material.transparent = true;
    	obj.children[0].material.color.setHex(0xdddddd);
    	obj.children[0].material.shininess = 10;
    	// obj.visible = false;
    	obj.children[1].material = reflectionMaterial;
    	obj.children[2].material = reflectionMaterial;
    	obj.children[3].material = reflectionMaterial;
    	obj.children[4].material = reflectionMaterial;
    	obj.children[5].material = reflectionMaterial;
    	obj.children[6].material = reflectionMaterial;
    	obj.children[7].material = reflectionMaterial;
    	obj.children[8].material = reflectionMaterial;
	   scene.add( obj );
	});
}

//sun
//caulking

function load1(){

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
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set0/frame_sidejamb2.json", function ( obj ) {
    	obj.name = "sidejamb2";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set0/frame_transom_top.json", function ( obj ) {
    	obj.name = "toptransom";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set0/frame_transom_bot.json", function ( obj ) {
		obj.name = "bottransom";
		obj.position.y -= ydisp;
		obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set0/gasket_side1.json", function ( obj ) {
    	obj.name = "gasketside1";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set0/gasket_side2.json", function ( obj ) {
    	obj.name = "gasketside2";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set0/gasket_transom_upper.json", function ( obj ) {
    	obj.name = "gaskettransomu";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set0/gasket_transom_lower.json", function ( obj ) {
		obj.name = "gaskettransoml";
		obj.position.y -= ydisp;
		obj.visible = false;
	    scene.add( obj );
	});
    // loader.load("data/set0/screws1_1.json", function ( obj ) {
    // 	obj.name = "screws1_1";
    // 	obj.position.y -= ydisp;
    // 	obj.visible = false;
	//     scene.add( obj );
	// });
	// loader.load("data/set0/screws1_2.json", function ( obj ) {
    // 	obj.name = "screws1_2";
    // 	obj.position.y -= ydisp;
    // 	obj.visible = false;
	//     scene.add( obj );
	// });
	loader.load("data/set1/louvre_glass.json", function ( obj ) {
    	obj.name = "louvreglass";
    	obj.position.y -= ydisp;
    	obj.visible = false;
    	obj.children[0].material = reflectionMaterial;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_gasket_rebate.json", function ( obj ) {
    	obj.name = "rebategasket";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_gasket_glazing.json", function ( obj ) {
    	obj.name = "glazinggasket";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_bearer.json", function ( obj ) {
		obj.name = "louvrebearer";
		obj.position.y -= ydisp;
		obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set1/louvre_endcap1.json", function ( obj ) {
    	obj.name = "endcap1";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre_endcap2.json", function ( obj ) {
    	obj.name = "endcap2";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre1_axis1.json", function ( obj ) {
    	obj.name = "axis1";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set1/louvre1_axis2.json", function ( obj ) {
    	obj.name = "axis2";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	// loads louvres 2 - 19
	for (var i = 2; i <= 19; i++) {
	    (function(index){
	        loader.load("data/set2/louvre" + index + ".json", function ( obj ) {
		    	obj.name = "louvre" + index;
		    	obj.position.y -= ydisp;
		    	// TODO: work out opacity, so louvres can fade in
		    	//console.log (obj);
		    	obj.visible = false;
		    	obj.castShadow = true;
	        	obj.children[7].material = reflectionMaterial;
			    scene.add( obj );
			});
	    })(i);
	}
    loader.load("data/set2/linkbar1.json", function ( obj ) {
    	obj.name = "linkbar1";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set2/linkbar2.json", function ( obj ) {
    	obj.name = "linkbar2";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set2/linkbar_pivots1.json", function ( obj ) {
    	obj.name = "pivots1";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set2/linkbar_pivots2.json", function ( obj ) {
		obj.name = "pivots2";
		obj.position.y -= ydisp;
		obj.visible = false;
	    scene.add( obj );
	});
    // loader.load("data/set2/screws2_1.json", function ( obj ) {
    // 	obj.name = "screws2_1";
    // 	obj.position.y -= ydisp;
    // 	obj.visible = false;
	//     scene.add( obj );
	// });
	// loader.load("data/set2/screws2_2.json", function ( obj ) {
    // 	obj.name = "screws2_2";
    // 	obj.position.y -= ydisp;
    // 	obj.visible = false;
	//     scene.add( obj );
	// });
    loader.load("data/set3/handle_upper_lever.json", function ( obj ) {
    	obj.name = "leveru";
    	obj.position.y -= ydisp;
    	obj.visible = false;
    	objects.push(obj);
	    scene.add( obj );
	});
	loader.load("data/set3/handle_lower_lever.json", function ( obj ) {
    	obj.name = "leverl";
    	obj.position.y -= ydisp;
    	obj.visible = false;
    	objects.push(obj);
	    scene.add( obj );
	});
    loader.load("data/set3/handle_upper_housing.json", function ( obj ) {
    	obj.name = "housingu";
    	obj.position.y -= ydisp;
    	obj.visible = false;
    	objects.push(obj);
	    scene.add( obj );
	});
	loader.load("data/set3/handle_lower_housing.json", function ( obj ) {
    	obj.name = "housingl";
    	obj.position.y -= ydisp;
    	obj.visible = false;
    	objects.push(obj);
	    scene.add( obj );
	});
    loader.load("data/set3/handlescrews.json", function ( obj ) {
    	obj.name = "screws3u";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set3/jambcover1.json", function ( obj ) {
    	obj.name = "jambcover1";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set3/jambcover2.json", function ( obj ) {
		obj.name = "jambcover2";
		obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
    loader.load("data/set3/drainage_cover.json", function ( obj ) {
    	obj.name = "drainage";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set3/flyscreen.json", function ( obj ) {
    	obj.name = "flyscreen";
    	obj.position.y -= ydisp;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/set3/flyscreen_mesh.json", function ( obj ) {
    	obj.name = "flyscreen mesh";
    	obj.position.y -= ydisp;
    	obj.visible = false;
    	var flyscreenTexture = new THREE.ImageUtils.loadTexture( 'images/FLYSCREEN TILE.png' );
		flyscreenTexture.wrapS = flyscreenTexture.wrapT = THREE.RepeatWrapping;
		flyscreenTexture.repeat.set( 200, 200 );
		var flyscreenMat = new THREE.MeshBasicMaterial( { color: 0x00ff00, map: flyscreenTexture, transparent: true, overdraw: true, side: THREE.DoubleSide} );
		obj.children[0].material = flyscreenMat;

	    scene.add( obj );
	});
    loader.load("data/install/bolt.json", function ( obj ) {
    	obj.name = "bolt1";
    	obj.position.y = - ydisp + 0.07;
    	obj.rotation.x = 180 * Math.PI / (180);
    	obj.position.x = 0.6;
    	obj.position.z = 0.5;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/install/bolt.json", function ( obj ) {
    	obj.name = "bolt2";
    	obj.position.y = ydisp + 0.02;
    	obj.rotation.x = 180* Math.PI / (180);
    	obj.position.x = 0.6;
    	obj.position.z = 0.5;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/install/bolt.json", function ( obj ) {
    	obj.name = "bolt3";
    	obj.position.y = - ydisp + 0.07;
    	obj.position.x = 0.6;
    	obj.position.z = - 0.5;
    	obj.visible = false;
	    scene.add( obj );
	});
	loader.load("data/install/bolt.json", function ( obj ) {
    	obj.name = "bolt4";
    	obj.position.y = ydisp + 0.02;
    	obj.position.x = 0.6;
    	obj.position.z = - 0.5;
    	obj.visible = false;
	    scene.add( obj );
	});

	return;
}

function loadcaulking(){
	// x y and z param for caulk
	var cx1 = 0.555;
	var cx2 = 0.625;
	var cy1 = 1.38;
	var cy2 = -1.24;
	var cz1 = 0.7;// handle side
	var cz2 = -0.7;
	// caulking path and paramaters
	var path1 = new THREE.CatmullRomCurve3( [
		new THREE.Vector3( cx1, cy2, cz1-0.0001 ),
		new THREE.Vector3( cx1, cy2, cz1 ),
		new THREE.Vector3( cx1, cy2, cz1+0.0001 ),
		new THREE.Vector3( cx1, cy1, cz1+0.0001 ),
		new THREE.Vector3( cx1, cy1, cz1 ),
		new THREE.Vector3( cx1, cy1, cz1-0.0001 ),
		new THREE.Vector3( cx1, cy1, cz2-0.0001 ),
		new THREE.Vector3( cx1, cy1, cz2 ),
		new THREE.Vector3( cx1, cy1, cz2+0.0001 ),
		new THREE.Vector3( cx1, cy2, cz2+0.0001 ),
		new THREE.Vector3( cx1, cy2, cz2 ),
		new THREE.Vector3( cx1, cy2, cz2-0.0001 ),
		new THREE.Vector3( cx1, cy2, cz1+0.0001 ),
		new THREE.Vector3( cx1, cy2, cz1 ),
		new THREE.Vector3( cx1, cy2, cz1-0.0001 )
		// new THREE.Vector3( 0, 0, 1 )
	]);
	var path2 = new THREE.CatmullRomCurve3( [
		new THREE.Vector3( cx2, cy2, cz1-0.0001 ),
		new THREE.Vector3( cx2, cy2, cz1 ),
		new THREE.Vector3( cx2, cy2, cz1+0.0001 ),
		new THREE.Vector3( cx2, cy1, cz1+0.0001 ),
		new THREE.Vector3( cx2, cy1, cz1 ),
		new THREE.Vector3( cx2, cy1, cz1-0.0001 ),
		new THREE.Vector3( cx2, cy1, cz2-0.0001 ),
		new THREE.Vector3( cx2, cy1, cz2 ),
		new THREE.Vector3( cx2, cy1, cz2+0.0001 ),
		new THREE.Vector3( cx2, cy2, cz2+0.0001 ),
		new THREE.Vector3( cx2, cy2, cz2 ),
		new THREE.Vector3( cx2, cy2, cz2-0.0001 ),
		new THREE.Vector3( cx2, cy2, cz1+0.0001 ),
		new THREE.Vector3( cx2, cy2, cz1 ),
		new THREE.Vector3( cx2, cy2, cz1-0.0001 )
		// new THREE.Vector3( 0, 0, 1 )
	]);
	var pathSegments = 512;
	var tubeRadius = 0.007;
	var radiusSegments = 4;
	var closed = true;
	// geometry
	var geometry1 = new THREE.TubeGeometry( path1, pathSegments, tubeRadius, radiusSegments, closed );
	var geometry2 = new THREE.TubeGeometry( path2, pathSegments, tubeRadius, radiusSegments, closed );

	// to buffer goemetry
	geometry1 = new THREE.BufferGeometry().fromGeometry( geometry1 );
	nMax = geometry1.attributes.position.count;
	geometry2 = new THREE.BufferGeometry().fromGeometry( geometry2 );
	nMax = geometry2.attributes.position.count;

	// material
	var material = new THREE.MeshPhongMaterial( {
	    //color: 0x4d4d4d,
	    color: 0xffffff,
        // color: 0xf37323,
	    emissive: 0x676767,
	    side: THREE.DoubleSide
	} );

	// mesh
	caulk1 = new THREE.Mesh( geometry1, material );
	scene.add( caulk1 );
	caulk2 = new THREE.Mesh( geometry2, material );
	scene.add( caulk2 );
}

function show1(){
	for (var i in louvreobjs){
	    (function(index){
	        var object = scene.getObjectByName(louvreobjs[index], true);
	        if (object) {
	        // console.log(louvreobjs[index])
	        	object.visible = true;
	        	object.castShadow = true;
	        	// object.position.x = 0;
	        }
	    })(i);
	}
}
function boltVis(isShow, zVal){
	console.log(isShow);
	var object = scene.getObjectByName("bolt1", true);
	if (!object )return;
	object.position.set (0.6, - ydisp + 0.62, zVal);
	object.visible = isShow;
	var object = scene.getObjectByName("bolt2", true);
    if (!object )return;
	object.position.set (0.6, ydisp - 0.53, zVal);
	object.visible = isShow;
	var object = scene.getObjectByName("bolt3", true);
    if (!object )return;
	object.position.set (0.6, - ydisp + 0.62, -zVal);
	object.visible = isShow;
	var object = scene.getObjectByName("bolt4", true);
    if (!object )return;
	object.position.set (0.6, ydisp - 0.53, -zVal );
	object.visible = isShow;

}
function hide1(){
	objToHide = louvreobjs.concat("flyscreen", "flyscreen mesh");
	for (var i in objToHide){
	    (function(index){
	        var object = scene.getObjectByName(objToHide[index], true);
	        // console.log (louvreobjs[index]);
	        if (object) {object.visible = false; object.position.x = 0;}
	    })(i);
	}
	caulk1.visible = false;
	caulk2.visible = false;
	nEnd = 0;
}

function tareAllObjs (xpos, ypos, zpos){
    var object = scene.getObjectByName("building", true);
    if (object){
        object.position.set(-5.08, -(21.311 * ydisp), -(0.7 * ydisp));
    }
    for (var i in louvreobjs){
	    (function(index){
	        var object = scene.getObjectByName(louvreobjs[index], true);
	        if (object) {object.position.set(xpos, ypos, zpos);}
	    })(i);
	}
}

function quickCloseLouvres() {
    for (var i in louvreobjs){
	    (function(index){
	        var object = scene.getObjectByName(louvreobjs[index], true);
	        if (object) {
                object.rotation.z = 0;
                object.position.set(.62, -ydisp, 0);
            }
	    })(i);
	}
}

function quickOpenLouvres(xpos) {
    for (var i in louvre1objs){
        (function(index){
           var object = scene.getObjectByName(louvre1objs[index], true);
           if (object) {
               object.rotation.z = 45*Math.PI / 180;
               object.position.x = 19*0.135*Math.sin(object.rotation.z) + .62 + xpos;
               object.position.y = 19*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
               object.position.y += object.rotation.z * 0.02;
               openDone = 0;
           }
        })(i);
    }
    for (var i in louvre2objs){
        (function(index){
           var object = scene.getObjectByName(louvre2objs[index], true);
           if (object) {
               object.rotation.z = 45*Math.PI / 180;
               object.position.x = (18-index)*0.135*Math.sin(object.rotation.z) + .62 + xpos;
               object.position.y = (18-index)*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
               object.position.y += object.rotation.z * 0.02;
           }
        })(i);
    }

    var object = scene.getObjectByName("leverl", true);
    if (object) {
       object.rotation.z = 45*Math.PI / 180;
       object.position.x = 6*0.135*Math.sin(object.rotation.z) + .62 + xpos;
       object.position.y = 6*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
       object.position.y += object.rotation.z * 0.02;
    }
    var object = scene.getObjectByName("leveru", true);
    if (object) {
       object.rotation.z = 45*Math.PI / 180;
       object.position.x = 13*0.135*Math.sin(object.rotation.z) + .62 + xpos;
       object.position.y = 13*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
       object.position.y += object.rotation.z * 0.02;
    }
}
