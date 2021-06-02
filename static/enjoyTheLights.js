

let chosenColour = sessionStorage.getItem("colour");


console.log(chosenColour);


function changeCircleColour () {

    if (chosenColour == 'colourOne') { this.style.fill = "rgb(255, 255, 0)" }

    else if (chosenColour == 'colourTwo') { this.style.fill = "rgb(0, 255, 255)"}

    else if (chosenColour == 'colourTwo') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

    else if (chosenColour == 'colourOne') { }

   
}

//  taken from https://css-tricks.com/converting-color-spaces-in-javascript/

function RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }









