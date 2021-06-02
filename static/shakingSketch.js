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
// let xSlider;
// let redSlider;
// let greenSlider;
// let blueSlider;

// // Previous values for each slider
// let previous_xSliderValue;
// let previous_redSliderValue;
// let previous_greenSliderValue;
// let previous_blueSliderValue;

let value = [];

//..........................
 let balls=[];
 let img;
//...........................



function setup() {
	/////////////////////////////////////////////
	// FIXED SECION - START: DO NOT CHANGE IT
	/////////////////////////////////////////////
	createCanvas(windowWidth,windowHeight);
img = loadImage('/static/bg.png');
 fill(255);

	initialiseAccelerometer();
	/////////////////////////////////////////////
	// FIXED SECION - END
	/////////////////////////////////////////////


	/////////////////////////////////////////////
	// ADD YOUR SETUP CODE HERE
	/////////////////////////////////////////////
  	textSize(35);



			
	for(let i=0; i<20; i++){
	 balls[i]=new Ball(random(0,width),random(0,height),accelerationX , accelerationY,0,0,random(100,200),1,0.007);
	}
}



function draw() {
background(img);

value[0] = round(leftToRight_degrees*100);
console.log(value[0]);

if (isNaN(value[0]) == false) {
	sendMessage("/acc/left", value);
}

value[0] = round(frontToBack_degrees*100);

if (isNaN(value[0]) == false) {
	sendMessage("/acc/front", value);
}


for(let i=0; i<balls.length; i++ ){
   balls[i].move();
  balls[i].display();
}

}

class Ball {

constructor(x,y,ax, ay,vx,vy,size, bMultiplier,vMultiplier){
this. x = x;
this. y = y;

// Speed - Velocity
this. vx = vx;
this. vy = vy;

// Acceleration
this.ax = ax;
this. ay = ay;

this.size=size;

this. vMultiplier = vMultiplier;
this. bMultiplier = bMultiplier;
	
	}
move(){
   this.ax = accelerationX;
  this.ay = accelerationY;
 // this.ax = accelerometer_x;
 //  this.ay =  accelerometer_y;
  this.vx = this.vx + this.ay;
  this.vy = this.vy + this.ax;
  this.y = this.y + this.vy * this.vMultiplier;
  this.x = this.x + this.vx * this.vMultiplier;

  // Bounce when touch the edge of the canvas
  if (this.x < 0) {
    this.x = 0;
    this.vx = -this.vx * this.bMultiplier;
  }
  if (this.y < 0) {
    this.y = 0;
    this.y = -this.vy * this.bMultiplier;
  }
  if (this.x > width - 20) {
    this.x = width - 20;
    this.vx = -this.vx * this.bMultiplier;
  }
  if (this.y > height - 20) {
    this.y = height - 20;
    this.vy = -this.vy * this.bMultiplier;
  }
}

display(){
	fill(255,255,255,this.size);
	noStroke();
	 ellipse(this.x, this.y, this.size, this.size);
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
		accPermissionButton = createButton('Use accelerometer');
	 	accPermissionButton.position(0.1*windowWidth, windowHeight-150);
	 	accPermissionButton.size(0.8*windowWidth, 100);
	 	accPermissionButton.style('font-size: 50px');
		accPermissionButton.mousePressed(getAccel);
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

