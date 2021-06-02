/***********************************************************************
  TEMPLATE FOR P5JS INTERFACE TO COMMUNICATE VIA OSC WITh PROCESSING

  Author: Luke Hespanhol
  Date: May 2021
***********************************************************************/

////////////////////////////////////////////////////
// FIXED SECTION: DO NOT CHANGE THESE VARIABLES
////////////////////////////////////////////////////
var HOST = window.location.origin;

let xmlHttpRequest = new XMLHttpRequest();

// Accelerometer veriables

let selectedValue = [];

let selectedColor;

////////////////////////////////////////////////////
// SETTINGS: CHANGE ONLY IF NECESSARY
////////////////////////////////////////////////////
let USE_ACCELEROMETER = true;


////////////////////////////////////////////////////
// CUSTOMIZABLE SECTION - BEGIN: ENTER OUR CODE HERE
////////////////////////////////////////////////////

// from https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/


 function submitColour() {
    const rbs = document.querySelectorAll('input[name="radio"]');
    
            for (const rb of rbs) {
                if (rb.checked == true) {
                    selectedValue[0] = rb.value;
                    sendMessage("/colourPicker/colourPicker", selectedValue);
					sessionStorage.setItem("colour", selectedValue[0]);
                    break;
                }
            }

}



function setup() {
	/////////////////////////////////////////////
	// FIXED SECION - START: DO NOT CHANGE IT
	/////////////////////////////////////////////
	createCanvas(windowWidth, windowHeight);
	initialiseAccelerometer();
	/////////////////////////////////////////////
	// FIXED SECION - END
	/////////////////////////////////////////////


	/////////////////////////////////////////////
	// ADD YOUR SETUP CODE HERE
	/////////////////////////////////////////////
  	textSize(35);

	  // Slider style from https://editor.p5js.org/amygoodchild/sketches/6bWwRNyVB


}

function draw() {
	background(255, 255, 255);


}


////////////////////////////////////////////////////
// CUSTOMIZABLE SECTION - END: ENTER OUR CODE HERE
////////////////////////////////////////////////////





/***********************************************************************
  === PLEASE DO NOT CHANGE OR DELETE THIS SECTION ===
  This function gathers accelerometer values, if permission 
  is given by theuser.
***********************************************************************/
function initialiseAccelerometer() {
	if (USE_ACCELEROMETER) {
		// accPermissionButton = createButton('Use accelerometer');
	 	// accPermissionButton.position(0.1*windowWidth, windowHeight-50);
	 	// accPermissionButton.size(0.8*windowWidth, 50);
	 	// accPermissionButton.style('font-size: 30px');
		// accPermissionButton.mousePressed(getAccel);
	}
}

// Credit: Andy Kong: https://kongmunist.medium.com/accessing-the-iphone-accelerometer-with-javascript-in-ios-14-and-13-e146d18bb175
function getAccel() {
	DeviceMotionEvent.requestPermission().then(response => {
		if (response == 'granted') {
			// Listener to smartphone acceleration
			window.addEventListener('devicemotion', (event) => {
				accelerometer_x = event.acceleration.x;
				accelerometer_y = event.acceleration.y;
				accelerometer_z = event.acceleration.x;
			});

			// Listener to smartphone acceleration
			window.addEventListener('deviceorientation', (event) => {
				rotation_degrees = event.alpha;
				frontToBack_degrees = event.beta;
				leftToRight_degrees = event.gamma;
			});
		}
	})
}

/***********************************************************************
  === PLEASE DO NOT CHANGE OR DELETE THIS SECTION ===
  This function sends a OSC message to server

  Parameters:
  	- address: the OSC message address pattern string
  	- value: single value or array of values as message payload
***********************************************************************/
function sendMessage(address, value) {
	let postData = JSON.stringify({ id: 1, 'address': address,
                  'value': value });

//	xmlHttpRequest.open("POST", HOST + '/sendMessage', true);
	xmlHttpRequest.open("POST", HOST + '/sendMessage', false);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
	xmlHttpRequest.send(postData);
}

