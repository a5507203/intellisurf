// window.addEvent("domready",function(){
// 	// loading screen - times out after 3 s
//     setTimeout(function(){
//         $(document.body).addClass('loaded');
//     }, 3000);
// });
var rotateSpd = 0.5;
var zoomSpd = 1.2;
if (Modernizr.touch){
   // bind to touchstart, touchmove, etc and watch `event.streamId`
   // changes help screen to touch on touchscreens
   document.getElementById("helpImage").src = "images/help_mouse.png";
   zoomSpd = 0.5;
   rotateSpd = 0.2;
}

var user_agent = navigator.userAgent.toLowerCase(); // detect the user agent
// var ios_devices = user_agent.match(/(iphone|ipod|ipad)/)  ? "touchstart" : "click"; //check if the devices are ios devices

// window.addEvent("domready",function(){
//
// });
// $('#hamburger').on('tap click', function() {toggleHamburger()});
// $('#helpImage').on('tap',help());
// $('#helpButton').on('tap',help());
// $('#fullButton').on('tap',toggleFullscreen());
// $('#downloadButton').on('tap',"window.open('data/SLJ Design Manual A4 links.pdf')");
// $('#larrow').on('tap',prevState());
// $('#rarrow').on('tap',nextState());
// $('#shutters').on('tap',toggleShutters());
// $('#pause').on('tap',togglePause());
// $('#endInstall').on('tap',"restart()");

// 	$('#soundIcon').click(function() {
// 	   soundEnabled = !soundEnabled;
// 	   resetAudio();
//    });

// loading screen and progress bar
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    console.log(item, loaded, total);
    progressBar.style.width = (loaded / total * 100) + '%';
    if (loaded == total) {
        loadInit();
        $(document.body).addClass('loaded');
        currState = 0;
        elementsLoaded = 0;
    }
};
var progress = document.createElement('div');
progress.id = "progress";
var progressBar = document.createElement('div');
progressBar.id = "progressBar";
progress.appendChild(progressBar);
document.body.appendChild(progress);

var helpOpen = false;
var menuOpen = false;
var shuttersOpen = false;
var isPaused = false;
var seqEnded = false;
var container, stats;
var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(), INTERSECTED;
//var radius = 100, theta = 0;
// delta is the speed at which big things move, deltas for small
var delta = 0.005;
var deltas = 0.001;
var done = 0;
var openDone = 0;
// y displacement to lower all objects a small amount
var ydisp = 1.25;
var ydispzoom = 2.6;
var elementsLoaded = 0;
var cameraSet = 0;
var currState = -1;
var lastState = currState;
var playAnim = true;
var checkedButtons = false;
var louvreobjs = ["sidejamb1", "sidejamb2", "toptransom", "bottransom",
    "gasketside1", "gasketside2", "gaskettransomu", "gaskettransoml",
    "louvreglass", "louvrebearer", "glazinggasket",
    "rebategasket", "endcap1", "endcap2", "axis1", "axis2", "linkbar1", "linkbar2", "pivots1", "pivots2",
    "leveru", "leverl", "housingu", "housingl", "screws3u", "jambcover1", "jambcover2", "drainage"];
    //removed invisible screws
var bolts = ["bolt1", "bolt2", "bolt3", "bolt4"];
var allobjs = louvreobjs.concat(bolts, "building");

var louvre1objs = ["louvreglass", "louvrebearer", "glazinggasket",
    "rebategasket", "endcap1", "endcap2", "axis1", "axis2"];
var louvre2objs = []; // louvres 2-19
for (var i = 2; i <= 19; i++) {
    louvre2objs.push("louvre" + i);
}

var objects = [];

// caulking variables
var nEnd, nMax, nStep = 30; // 30 faces * 3 vertices/face

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

    canvas: !! window.CanvasRenderingContext2D,
    webgl: ( function () {

        try {

            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

        } catch ( e ) {

            return false;

        }

    } )(),
    workers: !! window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    getWebGLErrorMessage: function () {

        var element = document.createElement( 'div' );
        element.id = 'webgl-error-message';
        element.style.fontFamily = 'monospace';
        element.style.fontSize = '13px';
        element.style.fontWeight = 'normal';
        element.style.textAlign = 'center';
        element.style.background = '#fff';
        element.style.color = '#000';
        element.style.padding = '1.5em';
        element.style.width = '400px';
        element.style.margin = '5em auto 0';

        if ( ! this.webgl ) {

            element.innerHTML = window.WebGLRenderingContext ? [
                'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' ) : [
                'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' );

        }

        return element;

    },

    addGetWebGLMessage: function ( parameters ) {

        var parent, id, element;

        parameters = parameters || {};

        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';

        element = Detector.getWebGLErrorMessage();
        element.id = id;

        parent.appendChild( element );

    }

};

// browserify support
if ( typeof module === 'object' ) {

    module.exports = Detector;

}


if (Detector.webgl) {
    init();
    animate();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
    document.getElementById("uiContainer").style.visibility= "hidden" ;
}

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );


    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    scene = new THREE.Scene();

    var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );
    var light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light2 );
    var light3 = new THREE.DirectionalLight( 0x404040, 1);
    light3.position.set( 1, 0, 1 ).normalize();
    scene.add( light3 );
    var light4 = new THREE.PointLight( 0xffffff, 0.6, 0 );
    light4.position.set( 30, 200, 0 );
    scene.add( light4 );

    // SKYDOME

    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
        topColor: 	 { type: "c", value: new THREE.Color( 0x000000 ) },
        bottomColor: { type: "c", value: new THREE.Color( 0xaaaaaa ) },
        offset:		 { type: "f", value: 50 },
        exponent:	 { type: "f", value: 1 }
    };
    //uniforms.topColor.value.copy( light.color );

    var skyGeo = new THREE.SphereGeometry( 200, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    } );

    var sky = new THREE.Mesh( skyGeo, skyMat );
    scene.add( sky );

    //camera.position.set(18, -28, 0);
    camera.position.set(0, 0, 0);
    camera.lookAt( scene.position );

    for (var i = 2; i <= 19; i++) {
        louvreobjs.push("louvre" + i);
    }

    load0();
    load1();
    loadcaulking();

    controls = new THREE.OrbitControls( camera );
    controls.rotateSpeed = rotateSpd;
    controls.zoomSpeed = zoomSpd;
    controls.panSpeed = 0.8;
    controls.enableZoom = true;
    controls.enablePan = true;
    // controls.staticMoving = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.22;
    controls.minDistance = -30;
    controls.maxDistance = 70;
    // controls.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.MIDDLE };

    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer({antialias: true});
    //renderer.setClearColor( 0x333333 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);
    // stats = new Stats();
    // container.appendChild( stats.dom );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
// autoplay once, then press "start" to play again
function animate() {
    if (!playAnim) return;
    if (!isPaused) lastState = currState;
    if (currState == -1) {
        loadInit();
        //if (done > 0) sleepNSeconds(3);
        // if (done = 0){
        // 	togglePause();
        // 	window.addEvent("domready",function(){
        // 		// loading screen - times out after 3 s
        // 	    setTimeout(function(){
        // 	        togglePause();
        // 	    }, 3000);
        // 	});
        // }
    } else if (currState == 0.0) {
        //document.getElementById("infobar").innerHTML = "Architectural finish applied on inner walls";
        swingCamUp();
        if (elementsLoaded == 1) elementsLoaded = 0;
    } else if (currState == 0.01) {
        swingThroughWindow();
    } else if (currState == 0.1) {
        document.getElementById("hero").innerHTML =
            "LOUVRE PLACED INTO WINDOW FRAME";
        $(document.body).addClass('hasNext');
        loadAssembly();
    } else if (currState == 1.0) {
        if (cameraSet == 0) {
            camera.position.set(-1.75, 0.13, -0.97);
            cameraSet = 1;
        }
        moveForwards();
    }
    // else if (currState == 1.1) {
    // 	openLouvres(1);
    // 	if (openDone > 0) {
    // 		currState = 2.0;
    // 		openDone = 0;
    // 	}
    // }
    else if (currState == 2.0) {
        document.getElementById("hero").innerHTML =
            "SCREWS INTO WINDOW FRAME";
        $(document.body).addClass('hasPrev');
        showBolts();
    } else if (currState == 2.01){
        shuttersOpen = true;
        openLouvres(1);
        if (openDone) currState = 2.1;
    } else if (currState == 2.1) {

        boltsIn();
    } else if (currState == 3.0) {
        document.getElementById("hero").innerHTML =
            "FLYSCREEN";
        if (cameraSet == 0) {
            tareAllObjs(.62, -ydisp, 0);
            quickOpenLouvres(0);
            cameraSet = 1;
            camera.position.set(-0.295, 0, -.02);
        }
        normalZoom();
    } else if (currState == 3.1) {
        if (cameraSet == 0) {
            cameraSet = 1;
            camera.position.set(-1.7, 0, -1);
        }
        flyscreen();
    } else if (currState == 3.15) {
        if (cameraSet == 0) {
            cameraSet = 1;
            camera.position.set(-1.7, 0, -1);
        }
        caulkingZoom();
    } else if (currState == 3.2) {
        document.getElementById("hero").innerHTML =
            "CAULKING STEP";
        if (cameraSet == 0) {
            cameraSet = 1;
            camera.position.set(-0.5, 0.4, -0.5);
        }
        caulking();
    } else if (currState == 3.3) {
        if (cameraSet == 0) {
            cameraSet = 1;
            camera.position.set(-1.7, 0, -1);
        }
        // swing round to front and open louvres
        heroShot();
    } else if (currState == 4.0) {
        if (cameraSet == 0) {
            cameraSet = 1;
            camera.position.set(2, 0, -1.5);
        }
        if (checkedButtons == false) {
            document.getElementById("infobar").innerHTML = "";
            document.getElementById("hero").innerHTML = "Orbit, Pan, or Zoom";
            document.getElementById("pause").src = "images/FINISH AUTO PLAY CIRCLE.png";
            $(document.body).addClass('interact');
            seqEnded = true;
            $(document.body).removeClass('hasNext');
        }
        checkedButtons = true;
    } else if (currState == 4.1) {
        openLouvres();
    } else if (currState == 4.2) {
        closeLouvres();
    } else if (currState == 4.3) {
        document.getElementById("hero").innerHTML = "";
        $(document.body).removeClass('interact');
        $(document.body).addClass('end');
        lastState = 0;
        isPaused = false;
        seqEnded = false;
        elementsLoaded = 0;
        $(document.body).removeClass('hasPrev');
        // close louvres if open
        // if( shuttersOpen == true ) {
            for (var i in louvreobjs){
                (function(index){
                    var object = scene.getObjectByName(louvreobjs[index], true);
                    if (object) {
                        object.rotation.z = 0;
                        object.position.set(.62, -ydisp, 0);
                    }
                })(i);
            }
        // }
        checkedButtons = false;
        // loadInit();
        document.getElementById("pause").src = "images/INSTALL PLAY CIRCLE.png";
        // console.log(isPaused);
        togglePause();
        // console.log(isPaused);
    }
    requestAnimationFrame( animate );
    render();
    // stats.update();
}
function render() {
    controls.update();
    renderer.render( scene, camera );
    var object = scene.getObjectByName("building", true);
    // if (object) console.log (object.position);
    // console.log(camera.position);
    // console.log(currState);
}
function restart (){
    currState = -1.0;
    $(document.body).removeClass('end');
}
function prevState(){
    // console.log(currState);
    cameraSet = 0;
    if( currState == -2 ) currState = lastState;
    if (currState == 2.0 || currState == 2.01 || currState == 2.1 ){
        //
        for (var i in louvreobjs){
            (function(index){
                var object = scene.getObjectByName(louvreobjs[index], true);
                if (object) object.position.x = 0;
            })(i);
        }
        boltVis(false, 0.5);
        camera.position.set(-1.7, 0, -1);
        (document.body).removeClass('hasPrev');
        currState = 0.1;
    } else if (currState == 3.0 || currState == 3.1) {
        //
        for (var i in louvreobjs){
            (function(index){
                var object = scene.getObjectByName(louvreobjs[index], true);
                if (object) object.position.x = .62;
            })(i);
        }
        quickCloseLouvres();
        boltVis(true, 0.5);
        camera.position.set(-1.1, 0, -1);

        var object = scene.getObjectByName("flyscreen", true);
        if (object) object.visible = false;
        if (object) object.position.x = 0;
        var object = scene.getObjectByName("flyscreen mesh", true);
        if (object) object.position.x = 0;
        if (object) object.visible = false;

        currState = 2.0;
    } else if (currState == 3.2 ) {
        camera.position.set(-1.7, 0, -1);
        var object = scene.getObjectByName("flyscreen", true);
        if (object) object.position.x = 0;
        var object = scene.getObjectByName("flyscreen mesh", true);
        if (object) object.position.x = 0;
        nEnd = 0;
        caulk1.geometry.setDrawRange( 0, nEnd );
        caulk2.geometry.setDrawRange( 0, nEnd );
        currState = 3.0;
    } else if (currState >= 3.3) {
        //
        $(document.body).removeClass('interact');
        isPaused = false;
        seqEnded = false;
        nEnd = 0;
        $(document.body).addClass('hasNext');
        document.getElementById("pause").src = "images/INSTALL PAUSE CIRCLE.png";
        camera.position.set(-1.7, 0, -1);
        for (var i in louvreobjs){
            (function(index){
                var object = scene.getObjectByName(louvreobjs[index], true);
                if (object) {
                    object.rotation.z = 0;
                    object.position.set(.62, -ydisp, 0);
                }
            })(i);
        }
        currState = 3.2;
    }
    elementsLoaded = 0
}
function nextState(){
    console.log(currState);
    cameraSet = 0;
    if( currState == -2 ) currState = lastState;
    if (currState == 0.1 || currState == 1.0) {
        for (var i in louvreobjs){
            (function(index){
                var object = scene.getObjectByName(louvreobjs[index], true);
                if (object) object.position.x = .62;

            })(i);
        }
        camera.position.set(-1.1, 0, -1);
        currState = 2.0;
    } else if (currState == 2.0 || currState == 2.01 || currState == 2.1 ) {
        //
        boltVis(true, 0.65);
        camera.position.set(-1.7, 0, -1);
        quickOpenLouvres(0);
        currState = 3.0;
    } else if ( currState == 3.0 ||  currState == 3.1) {
        var object = scene.getObjectByName("flyscreen", true);
        if (object) object.position.x = .62;
        var object = scene.getObjectByName("flyscreen mesh", true);
        if (object) object.position.x = .62;
        currState = 3.2;
    } else if (currState == 3.2 || currState == 3.3) {
        nEnd = nMax;
        caulk1.geometry.setDrawRange( 0, nEnd );
        caulk2.geometry.setDrawRange( 0, nEnd );
        camera.position.set(2, 0, -1.5);
        currState = 4.0;
        // toggleShutters();
    }
    elementsLoaded = 0;
}

// function onDocumentTouchStart( event ) {
//
// 	// event.preventDefault();
// 	event.clientX = event.touches[0].clientX;
// 	event.clientY = event.touches[0].clientY;
// 	onDocumentMouseDown( event );
//
// }


function onDocumentMouseDown( event ) {
    if (menuOpen) return;
    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects, true );
    if ( intersects.length > 0 ) {
        if (intersects[0].object.name == "Lever mechanism") toggleShutters();
    }
}
document.addEventListener('mousewheel', function(e){
    if (e.ctrlKey) {
        e.preventDefault();
    }
    if (e.deltaY % 1 !== 0){
        e.preventDefault();
    }
});

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
            boltVis(false, 0.5);
        }
        done = 0;
    }
    // if (done > 0) {
    //  currState = 0.0;
    // 	elementsLoaded = 0;
    // }
}

function swingCamUp(){
    done++;
    if (camera.position.y < -16.5) {
        camera.position.y += 10*delta;
        done = 0;
    } else if (camera.position.y < 0) {
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
    if (object && object.position.x > (-4.03 * ydisp)) {
        object.position.x -= 9 * delta;
        done = 0;
    }
    if (object && object.position.y > (-21.311 *ydisp)) {
        object.position.y -= delta;
        done = 0;
    }
    if (camera.position.x > 0) {
        camera.position.x -= 21*delta;
        done = 0;
    } else if (camera.position.x > -1.7) {
        camera.position.x -= 10*delta;
        done = 0;
    }
    if (camera.position.z < -1) {
        camera.position.z += 6.5*delta;
        done = 0;
    }
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
        cameraSet = 0;
        currState = 2.0;
        sleepNSeconds(0.5);
    }
}
function showBolts(){
    done++;
    if (elementsLoaded == 0) {
        boltVis(true, 0.5);
        elementsLoaded = 1;
        done = 0;
    }
    if (camera.position.x < -0.3) {
        // -.5, 0, 0
        camera.position.x += 3*delta;
        done = 0;
    }
    if (camera.position.y > 0) {
        camera.position.y -= 2*delta;
    }
    if (camera.position.z < -.2) {
        camera.position.z += 5*delta;
        done = 0;
    } else if (camera.position.z < 0) {
        camera.position.z += .6*delta;
        done = 0;
    }
    var object = scene.getObjectByName("building", true);
    if (object && object.position.y > -21.811*ydisp) {
        object.position.y -= 2*delta;
        done = 0;
    }
    for (var i in louvreobjs){
        (function(index){
            var object = scene.getObjectByName(louvreobjs[index], true);
            if (object && object.position.y > -1.5*ydisp) {
                object.position.y -= 2*delta;
                // object.visible = false;
                done = 0;
            }
        })(i);
    }
    var object = scene.getObjectByName("bolt1", true);
    if (object && object.position.y > 0.07 -.95*ydisp) object.position.y -= 2*delta;
    var object = scene.getObjectByName("bolt3", true);
    if (object && object.position.y > 0.07 -.95*ydisp) object.position.y -= 2*delta;
    var object = scene.getObjectByName("bolt2", true);
    if (object && object.position.y > 0.02 + .05*ydisp) object.position.y -= 2*delta;
    var object = scene.getObjectByName("bolt4", true);
    if (object && object.position.y > 0.02 + .05*ydisp) object.position.y -= 2*delta;
    if (done > 0) {
        currState = 2.01;
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
            camera.position.x -= 3*delta;
            done = 0;
        }
        if (camera.position.z > -1) {
            camera.position.z -= 2*delta;
            done = 0;
        }
        var object = scene.getObjectByName("building", true);
        if (object && object.position.y < -21.311*ydisp) {
            object.position.y += 3*delta;
            done = 0;

            var object = scene.getObjectByName("bolt1", true);
            if (object ) object.position.y += 3*delta;
            var object = scene.getObjectByName("bolt3", true);
            if (object ) object.position.y += 3*delta;
            var object = scene.getObjectByName("bolt2", true);
            if (object ) object.position.y += 3*delta;
            var object = scene.getObjectByName("bolt4", true);
            if (object ) object.position.y += 3*delta;
        }
        for (var i in louvreobjs){
            (function(index){
                var object = scene.getObjectByName(louvreobjs[index], true);
                if (object && object.position.y < -ydisp) {
                    object.position.y += 3*delta;
                    done = 0;
                }
            })(i);
        }

        if (done > 0) {
            currState = 3.1;
            sleepNSeconds(1);
            var object = scene.getObjectByName("flyscreen", true);
            object.visible = true;
            var object = scene.getObjectByName("flyscreen mesh", true);
            object.visible = true;
            cameraSet = 0;
        }
}

function flyscreen() {
    done++;
    var object = scene.getObjectByName("flyscreen", true);
    if (object && object.position.x < 0.62) {
        object.position.x += 5*deltas;
        done = 0;
    }
    var object = scene.getObjectByName("flyscreen mesh", true);
    if (object && object.position.x < 0.62) {
        object.position.x += 5*deltas;
        done = 0;
    }
    if (done > 0) {
        currState = 3.15;
        sleepNSeconds(1);
        cameraSet = 0;
    }
}

function caulkingZoom() {
    done++;
    if (camera.position.x < -0.5) {
        camera.position.x += 5*delta;
        done = 0;
    }
    if (camera.position.y < 0.4) {
        camera.position.y += 1.5*delta;
        done = 0;
    }
    if (camera.position.z < -0.5) {
        camera.position.z += 2*delta;
        done = 0;
    }
    if (done > 0) {
        currState = 3.2;
        sleepNSeconds(1);
        cameraSet = 0;
    }
}

function caulking() {
    caulk1.visible = true;
    caulk2.visible = true;
    if (camera.position.x > -1.7) {
        camera.position.x -= 1.5*delta;
        done = 0;
    }
    if (camera.position.y > 0) {
        camera.position.y -= 0.6*delta;
        done = 0;
    }
    if (camera.position.z > -1) {
        camera.position.z -= 0.8*delta;
        done = 0;
    }
    if (nEnd < nMax) {
        nEnd = ( nEnd + nStep );
        caulk1.geometry.setDrawRange( 0, nEnd );
        caulk2.geometry.setDrawRange( 0, nEnd );
    } else {
        currState = 3.3;
        sleepNSeconds(1);
        cameraSet = 0;
    }
}

function heroShot() {
    // if (openDone == 0) {
    // 	document.getElementById("shutters").src = "images/CLOSE LOUVRE.png";
    // 	shuttersOpen = true;
    // 	openLouvres();
    // }
    done++;
    if (camera.position.x < 2) {
        camera.position.x += 10 * delta;
        done = 0;
    }
    if (camera.position.y > 0) {
        camera.position.y -= 10 * delta;
        done = 0;
    }
    if (camera.position.z > -1.5) {
        camera.position.z -= 10 * delta;
        done = 0;
    }
    if (done > 5 ) {//&& openDone > 0
        currState = 4.0;
        sleepNSeconds(0.5);
        cameraSet = 0;
    }
}

function openLouvres(earlyOpen){

    openDone++;
    for (var i in louvre1objs){
        (function(index){
           var object = scene.getObjectByName(louvre1objs[index], true);
           if (object && object.rotation.z < 45*Math.PI / 180) {
               object.rotation.z += 0.01;
               object.position.x = 19*0.135*Math.sin(object.rotation.z) + .62;
               object.position.y = 19*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
               object.position.y += object.rotation.z * 0.02;
               if (earlyOpen) object.position.y -= .5*ydisp;
               openDone = 0;
           }
        })(i);
    }
    for (var i in louvre2objs){
        (function(index){
           var object = scene.getObjectByName(louvre2objs[index], true);
           if (object && object.rotation.z < 45*Math.PI / 180) {
               object.rotation.z += 0.01;
               object.position.x = (18-index)*0.135*Math.sin(object.rotation.z) + .62;
               object.position.y = (18-index)*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
               object.position.y += object.rotation.z * 0.02;
               if (earlyOpen) object.position.y -= .5*ydisp;
               openDone = 0;
           }
        })(i);
    }
    var object = scene.getObjectByName("leverl", true);
    if (object && object.rotation.z < 45*Math.PI / 180) {
       object.rotation.z += 0.01;
       object.position.x = 6*0.135*Math.sin(object.rotation.z) + .62;
       object.position.y = 6*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
       object.position.y += object.rotation.z * 0.02;
       if (earlyOpen) object.position.y -= .5*ydisp;
       openDone = 0;
    }
    var object = scene.getObjectByName("leveru", true);
    if (object && object.rotation.z < 45*Math.PI / 180) {
       object.rotation.z += 0.01;
       object.position.x = 13*0.135*Math.sin(object.rotation.z) + .62;
       object.position.y = 13*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
       object.position.y += object.rotation.z * 0.02;
       if (earlyOpen) object.position.y -= .5*ydisp;
       openDone = 0;
    }
    if (openDone > 0 && !earlyOpen) {
        currState = 4;
        openDone = 0;
    }
}
function closeLouvres() {
    openDone++;
        for (var i in louvre1objs){
        (function(index){
           var object = scene.getObjectByName(louvre1objs[index], true);
           if (object && object.rotation.z > 0) {
               object.rotation.z -= 0.01;
               object.position.x = 19*0.135*Math.sin(object.rotation.z) + .62;
               object.position.y = 19*0.135*(1 - Math.cos(object.rotation.z)) - ydisp + 0.001;
               object.position.y += object.rotation.z * 0.02;
               openDone = 0;
           }
        })(i);
    }
    for (var i in louvre2objs){
        (function(index){
            var object = scene.getObjectByName(louvre2objs[index], true);
            if (object && object.rotation.z > 0) {
                object.rotation.z -= 0.01;
                object.position.x = (18-index)*0.135*Math.sin(object.rotation.z) +.62;
                object.position.y = (18-index)*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
                object.position.y += object.rotation.z * 0.02;
                openDone = 0;
           }
        })(i);
    }
    var object = scene.getObjectByName("leverl", true);
    if (object && object.rotation.z > 0) {
       object.rotation.z -= 0.01;
       object.position.x = 6*0.135*Math.sin(object.rotation.z) + .62;
       object.position.y = 6*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
       object.position.y += object.rotation.z * 0.02;
       openDone = 0;
    }
    var object = scene.getObjectByName("leveru", true);
    if (object && object.rotation.z > 0) {
       object.rotation.z -= 0.01;
       object.position.x = 13*0.135*Math.sin(object.rotation.z)  + .62;
       object.position.y = 13*0.135*(1 - Math.cos(object.rotation.z)) - ydisp+ 0.001;
       object.position.y += object.rotation.z * 0.02;
       openDone = 0;
    }
    if (openDone > 0) {
        currState = 4;
        openDone = 0;
    }
}

////////////////////////
//		   			  //
//	MUTUAL FUNCTIONS  //
//					  //
////////////////////////

//sotres functions mutual to info.html and install.html

// prevents spacebar from scrolling
window.onkeydown = function(e) {
  return !(e.keyCode == 32 && e.target == document.body);
};
// spacebar to pause
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        togglePause();
    }
}
function togglePause() {
    if (seqEnded) {
        currState = 4.3;
    } else if (isPaused == false){
        if (document.getElementById("pause")){
            document.getElementById("pause").src = "images/INSTALL PLAY CIRCLE.png";
        }
        currState = -2;
        isPaused = true;
    } else {
        if (document.getElementById("pause")){
            document.getElementById("pause").src = "images/INSTALL PAUSE CIRCLE.png";
        }
        currState = lastState;
        isPaused = false;
    }
}

window.onresize = function(e) {
    window.devicePixelRatio = 1;
    var scale = 'scale(1)';
    document.body.style.transform = scale;
    document.body.style.webkitTransform = scale;
    document.body.style.msTransform = scale;
}

function sleepNSeconds(n){
    playAnim = false;
    setTimeout(function(){
        playAnim = true;
        animate();
    }, (n * 1000));
}

function toggleShutters(){
    // only opens shutters if all elements loaded
    if (currState != 4.0) { return; }

    if( shuttersOpen == false ){
        document.getElementById("shutters").src = "images/CLOSE LOUVRE.png";
        shuttersOpen = true;
        currState = 4.1;
    }
    else {
        document.getElementById("shutters").src = "images/OPEN LOUVRE.png";
        shuttersOpen = false;
        currState = 4.2;
    }
}
function toggleExplode(){
    if (shuttersOpen) {
        currState = 4.0;
        return;
    }
    if (currState != 4.0) return;
    if (exploded == false) {
        document.getElementById("explode").src = "images/ASSEMBLE CIRCLE.png";
        exploded = true;
        currState = 4.3;
    } else {
        document.getElementById("explode").src = "images/EXPLODE CIRCLE.png";
        exploded = false;
        currState = 4.4;
    }
}

function toggleHamburger(){
    if ( helpOpen ) {
        help();
    } else if( menuOpen == false ){
        document.getElementById("hamburger").src = "images/close2.png";
        if (isPaused == false) togglePause();
        $(document.body).addClass('menu');
        menuOpen = true;
        $(document.body).removeClass('interact');
    }
    else {
        document.getElementById("hamburger").src = "images/hamburger.png";
        togglePause();
        $(document.body).removeClass('menu');
        menuOpen = false;
        if (currState >= 4.0) $(document.body).addClass('interact');
    }
}
function help(){
    // console.log("help clicked");
    if( helpOpen == false ){
        $(document.body).addClass('help');
        helpOpen = true;
    }
    else {
        $(document.body).removeClass('help');
        helpOpen = false;
    }
}
function toggleFullscreen(){
    //
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
       (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }

}
function download(){
    //
}
