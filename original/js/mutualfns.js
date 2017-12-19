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
