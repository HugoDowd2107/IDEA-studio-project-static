/***********************************************************************
  TEMPLATE FOR P5JS INTERFACE TO COMMUNICATE VIA OSC WITh PROCESSING

  Author: Luke Hespanhol
  Date: May 2021
***********************************************************************/

////////////////////////////////////////////////////
// FIXED SECTION: DO NOT CHANGE THESE VARIABLES
////////////////////////////////////////////////////
var HOST = self.location;
let xmlHttpRequest = new XMLHttpRequest();

// Accelerometer veriables
let accelerometer_x;
let accelerometer_y;
let accelerometer_z;
let accPermissionButton;
let rotation_degrees;
let frontToBack_degrees;
let leftToRight_degrees;


////////////////////////////////////////////////////
// SETTINGS: CHANGE ONLY IF NECESSARY
////////////////////////////////////////////////////
let USE_ACCELEROMETER = true;


////////////////////////////////////////////////////
// CUSTOMIZABLE SECTION - BEGIN: ENTER OUR CODE HERE
////////////////////////////////////////////////////
// Sliders
let xSlider;
let redSlider;
let greenSlider;
let blueSlider;

let r;
let g;
let b;

// Previous values for each slider
let previous_xSliderValue;
let previous_redSliderValue;
let previous_greenSliderValue;
let previous_blueSliderValue;

let value = [];





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


	redSlider = createSlider(0, 255,254, 1);
	redSlider.addClass("redSlider");
	redSlider.position(0.1*windowWidth, 0.6*windowHeight);
	redSlider.style('width', '80vw');
	previous_redSliderValue = -100; // deliberate different value

	

	greenSlider = createSlider(0, 255,254, 1);
	greenSlider.addClass("blueSlider");
	greenSlider.position(0.1*windowWidth, 0.7*windowHeight);
	greenSlider.style('width', '80vw');
	previous_greenSliderValue = -100; // deliberate different value

	blueSlider = createSlider(0, 255,254, 1);
	blueSlider.addClass("greenSlider");
	blueSlider.position(0.1*windowWidth, 0.8*windowHeight);
	blueSlider.style('width', '80vw');
	previous_blueSliderValue =-100; // deliberate different value

}

function draw() {
	background(255, 255, 255);


	fill(r, g, b);

	ellipse(windowWidth/2, windowHeight*0.45,windowWidth/3, windowWidth/3);


	// Test RED slider
	if (redSlider.value() != previous_redSliderValue) {
		previous_redSliderValue = redSlider.value();
		value[0] = redSlider.value();
		r = redSlider.value();
		sendMessage("/colour/red", value);
	}

	// Test GREEN slider
	if (greenSlider.value() != previous_greenSliderValue) {
		previous_greenSliderValue = greenSlider.value();
		value[0] = greenSlider.value();
		g = greenSlider.value();
		sendMessage("/colour/green", value);

		// from https://stackoverflow.com/questions/14323082/why-doesnt-backgroundcolor-rgba-b-c-work

	}

	// Test BLUE slider
	if (blueSlider.value() != previous_blueSliderValue) {
		previous_blueSliderValue = blueSlider.value();
		value[0] = blueSlider.value();
		b = blueSlider.value();
		sendMessage("/colour/blue", value);


	fill(10 + accelerometer_x*10, accelerometer_y*10, 255);
	ellipse(windowWidth/2, windowHeight/2, 10*leftToRight_degrees, 18*frontToBack_degrees);
}
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

