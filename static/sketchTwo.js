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
let numberSlider;
let numberSlider2;

//colour change button
let colourButtonA;



//background image
let img;

//interface image
let imgButtonA
let imgButtonB
let imgButtonC
let imgButtonD




//radio 
let radio;
let checkbox;
let answerValue;
let button1;



// Previous values for each slider
let previous_xSliderValue;
let previous_redSliderValue;
let previous_greenSliderValue;
let previous_blueSliderValue;
let previous_numberSliderValue;
let previous_numberSliderValue2;
let previous_colourButtonValue;

let currentButtonValue;


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
 
 //load images
 
img = loadImage('/static/bg.png');

// imgButtonA=createImg('/static/Button A.png')
// imgButtonA.position(0.15*windowWidth,0.5*windowHeight);

// imgButtonB=createImg('/static/Button B.png')
// imgButtonB.position(0.15*windowWidth,0.6*windowHeight);

// imgButtonC=createImg('/static/Button C.png')
// imgButtonC.position(0.15*windowWidth,0.7*windowHeight);

// imgButtonD=createImg('/static/Button D.png')
// imgButtonD.position(0.15*windowWidth,0.8*windowHeight);

// Questions

let myDiv = createDiv('How are you feeling today?');
myDiv.style('font-size', '150px');
myDiv.style('color', '#ffffff');
myDiv.position(0.1*windowWidth,0.2*windowHeight);

//  img = loadImage(
//   'https://media.giphy.com/media/2tNvsKkc0qFdNhJmKk/giphy.gif',
//   'the gradient background'
// );
// img.position(0, 0);
// img.size(windowWidth,windowHeight);




  	//textSize(35);

	// xSlider = createSlider(0, 100, 50, 1);
	// xSlider.position(0.2*windowWidth, 0.2*windowHeight);
	// xSlider.style('width', '520px');
	// previous_xSliderValue = -100; // deliberate different value

	// redSlider = createSlider(0, 255,254, 1);
	// redSlider.position(0.2*windowWidth, 0.4*windowHeight);
	// redSlider.style('width', '520px');
	// previous_redSliderValue = -100; // deliberate different value

	// greenSlider = createSlider(0, 255,254, 1);
	// greenSlider.position(0.2*windowWidth, 0.6*windowHeight);
	// greenSlider.style('width', '520px');
	// previous_greenSliderValue = -100; // deliberate different value

	// blueSlider = createSlider(0, 255,254, 1);
	// blueSlider.position(0.2*windowWidth, 0.8*windowHeight);
	// blueSlider.style('width', '520px');
	// previous_blueSliderValue =-100; // deliberate different value
    

//test slide
    numberSlider = createSlider(0,5,5,1);
	numberSlider.position(0.2*windowWidth, 0.1*windowHeight);
	numberSlider.style('width', '520px');
	previous_numberSliderValue = 0; // deliberate different value
	numberSlider.hide();

	let numberSlider2 = createSlider(0,5,5,1);
	numberSlider2.position(0.2*windowWidth, 0.2*windowHeight);
	previous_numberSliderValue2 =1;
	numberSlider2.style('width', '520px');
	numberSlider2.hide();


// test radio
// radio = createRadio();
//   radio.option('Answer A');
//   radio.option('Answer B');
//   radio.option('Answer C');
//   radio.style('width', '50px');
//   radio.position(0.2*windowWidth, 0.1*windowHeight);
//   radio.select


//test button
button1 = createButton("Happy"); //, "pressed");
 button1.mousePressed(button1Pressed);
 button1.position(0.16*windowWidth,0.5*windowHeight+10);
 let squareColor = color(100, 50, 100,0);
 button1.style('background-color','#fd6229',100);
 button1.style('font-size', '60px');
 button1.style('color', '#ffffff');
 button1.style('border-radius', '50px');
 button1.size(0.7*windowWidth,0.07*windowHeight);



let button2 = createButton("Relax"); //, "pressed");
 button2.mousePressed(button2Pressed);
 button2.position(0.16*windowWidth, 0.6*windowHeight+10);
 button2.style('background-color','#1eb99e');
 button2.style('font-size', '60px');
 button2.style('color', '#ffffff');
 button2.style('border-radius', '50px');
 button2.size(0.7*windowWidth,0.07*windowHeight);


let button3 = createButton("Calm"); //, "pressed");
 button3.mousePressed(button3Pressed);
 button3.position(0.16*windowWidth, 0.7*windowHeight+10);
 button3.style('background-color','#ffc105');
 button3.style('font-size', '60px');
 button3.style('color', '#ffffff');
 button3.style('border-radius', '50px');
 button3.size(0.7*windowWidth,0.07*windowHeight);


let button4 = createButton("Sad"); //, "pressed");
 button4.mousePressed(button4Pressed);
 button4.position(0.16*windowWidth, 0.8*windowHeight+10);
 button4.style('background-color','#12527f');
 button4.style('font-size', '60px');
 button4.style('color', '#ffffff');
 button4.style('border-radius', '50px');
 button4.size(0.7*windowWidth,0.07*windowHeight);


 // let buttonCon = createButton("Confirm"); //, "pressed");
 // buttonCon.mousePressed(button4Pressed);
 // buttonCon.position(0.16*windowWidth, 0.9*windowHeight+10);
 // buttonCon.style('background-color','#98C1D9');
 // buttonCon.style('font-size', '60px');
 // buttonCon.style('color', '#ffffff');
 // buttonCon.style('border-radius', '50px');
 // buttonCon.size(0.7*windowWidth,0.07*windowHeight);

}

// function myCheckedEvent() {
//   if (this.checked()) {
//     answerValue=int(1);
//   } else {
//     answerValue=int(0);
//   }
// }


//button function


function button1Pressed() {
numberSlider.value(1);

}

function button2Pressed() {
numberSlider.value(2);
}

function button3Pressed() {
numberSlider.value(3);
}

function button4Pressed() {
numberSlider.value(4);
}

// function buttonCPressed() {
// numberSlider2.value(0);
// previous_numberSliderValue = numberSlider2.value()
// }


function draw() {

//background(100,100,200);
background(img,50);

	// Test x slider
	// if (xSlider.value() != previous_xSliderValue) {
	// 	previous_xSliderValue = xSlider.value();
	// 	value[0] = xSlider.value();
	// 	sendMessage("/position/1", value);
	// }
	// text('x', xSlider.x * 2 + 0.75*xSlider.width, xSlider.y+10);

	// // Test RED slider
	// if (redSlider.value() != previous_redSliderValue) {
	// 	previous_redSliderValue = redSlider.value();
	// 	value[0] = redSlider.value();
	// 	sendMessage("/colour/red", value);
	// }
	// text('red', redSlider.x * 2 + 0.75*redSlider.width, redSlider.y+10);

	// // Test GREEN slider
	// if (greenSlider.value() != previous_greenSliderValue) {
	// 	previous_greenSliderValue = greenSlider.value();
	// 	value[0] = greenSlider.value();
	// 	sendMessage("/colour/green", value);
	// }
	// text('green', greenSlider.x * 2 + 0.75*greenSlider.width, greenSlider.y+10);

	// // Test BLUE slider
	// if (blueSlider.value() != previous_blueSliderValue) {
	// 	previous_blueSliderValue = blueSlider.value();
	// 	value[0] = blueSlider.value();
	// 	sendMessage("/colour/blue", value);
	// }
	// text('blue', blueSlider.x * 2 + 0.75*blueSlider.width, blueSlider.y+10);

// Test Number slider

// if (previous_numberSliderValue2 = numberSlider2.value(0)){
	if (numberSlider.value() != previous_numberSliderValue) {
		previous_numberSliderValue = numberSlider.value();
		value[0] = numberSlider.value();
		sendMessage("/number/number", value)
	}
// }
	//text('number', numberSlider.x * 2 + 0.75*numberSlider.width, numberSlider.y+10);



// fill(10 + accelerometer_x*10, accelerometer_y*10, 255);
// ellipse(windowWidth/2, windowHeight/2, 10*leftToRight_degrees, 18*frontToBack_degrees);

//send acclerometer data
// value[0] = round(accelerometer_x * 100);
// sendMessage("/acc/x", value);
// print('checked');

// value[0] = round(accelerometer_y * 100);
// sendMessage("/acc/y", value);

// value[0] = round(leftToRight_degrees*100);
// sendMessage("/acc/left", value);

// value[0] = round(frontToBack_degrees*100);
// sendMessage("/acc/front", value);

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
	 	accPermissionButton.position(0.1*windowWidth, windowHeight-100);
	 	accPermissionButton.size(0.8*windowWidth, 50);
	 	accPermissionButton.style('font-size: 30px');
		accPermissionButton.mousePressed(getAccel);
		accPermissionButton.hide();
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

