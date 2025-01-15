
// Colour Tile Generation

function newColour(rgb) {
    console.log("New colour generated")
    // Extract individual rgb values back out
    let colours = rgb.slice(4,-1).split(", ");
    let red = colours[0];
    let green = colours[1];
    let blue = colours[2];
    let opposite = invert(red, green, blue);
    let lighter = rgbLighten(red, green, blue);
    let darker = rgbDarken(red, green, blue);
    red = `<input value="`+red+`" class="red" name="red" type="number" max="255"></input>`;
    green = `<input value="`+green+`" class="green" name="green" type="number" max="255"></input>`;
    blue = `<input value="`+blue+`" class="blue" name="blue" type="number" max="255"></input>`;
    console.log(colours);


    // Create new element

    // Initialise html
    let html = ``;

    // Initialise new DOM element
    let $newColour = $(`<div></div>`).addClass("colour-tile").css("background-color",rgb);

    // HTML for buttons
    let addOppositeButton = `<button class="add-opposite">Add opposite colour</button>`;
    let addDarkerButton = `<button class="add-darker">Add 10% darker</button>`;
    let addLighterButton = `<button class="add-lighter">Add 10% lighter</button>`;
    let buttons = `<div class="colour-tile-buttons">`+addDarkerButton+addOppositeButton+addLighterButton+`</div>`;


    html += `<button class="colour-tile-delete">Remove</button><div class="colour-tile-text"><h1>`+rgb+`</h1><form><h2>Red: `+red+`</h2><h2>Green: `+green+`</h2><h2>Blue: `+blue+`</h2></form></div>`+buttons;


    $newColour.html(html);
    // Colour buttons correctly
    $($newColour).find(".add-opposite").css("background-color",opposite).css("color",rgb);
    $($newColour).find(".add-lighter").css("background-color",lighter).css("color",opposite);
    $($newColour).find(".add-darker").css("background-color",darker).css("color",opposite);

    // Colour Tiles update backgrounds
    $newColour.on("input",(event) => {
        let container = $(event.target).parents(".colour-tile");
        let red = $(container).find(".red").val();
        let green = $(container).find(".green").val();
        let blue = $(container).find(".blue").val();
        let opposite = invert(red, green, blue);
        let lighter = rgbLighten(red, green, blue);
        let darker = rgbDarken(red, green, blue);
        let rgb = `rgb(`+red+`,`+green+`,`+blue+`)`;
        container.css("background-color",rgb);
        let newText = `rgb(`+red+`, `+green+`, `+blue+`)`;
        $(container).find("h1").text(newText);
        $(container).find(".add-opposite").css("background-color",opposite).css("color",rgb);
        $(container).find(".add-lighter").css("background-color",lighter).css("color",opposite);
        $(container).find(".add-darker").css("background-color",darker).css("color",opposite);
    });



    // Append new element
    $("#main__container-contents").append($newColour);
}

// Generate random RGB values
function randomRGB() {
    let red = 1 + Math.floor(Math.random() * 255);
    let green = 1 + Math.floor(Math.random() * 255);
    let blue = 1 + Math.floor(Math.random() * 255);
    let rgb = "rgb(" + red +", " + green +", " + blue +")";
    console.log(rgb);
    return(rgb);
}

// Colour Tile Deletion

$("#main__container-contents").on("click","button.colour-tile-delete", (event) => {
    let $tileToDelete = $(event.target).parent();
    $tileToDelete.remove();

});


// Opposite Colour function
function invert(red, green, blue) {
    let newRed = 255-red;
    let newGreen = 255-green;
    let newBlue = 255-blue;
    let rgb = `rgb(`+newRed+`,`+newGreen+`,`+newBlue+`)`;
    return(rgb);
}


// Buttons create new tiles
$("#main__container-contents").on("click","button", (event) => {
    let colour = $(event.target).css("background-color");
    newColour(colour);
});


// Lighten function

function rgbLighten(red, green, blue) {
    let newRed = Math.min(red/0.9, 255);
    let newBlue = Math.min(blue/0.9, 255);
    let newGreen = Math.min(green/0.9, 255);
    let rgb = `rgb(`+newRed+`,`+newGreen+`,`+newBlue+`)`;
    return(rgb);

}

// Darken function

function rgbDarken(red, green, blue) {
    let newRed = Math.max(red*0.9, 0);
    let newBlue = Math.max(blue*0.9, 0);
    let newGreen = Math.max(green*0.9, 0);
    let rgb = `rgb(`+newRed+`,`+newGreen+`,`+newBlue+`)`;
    return(rgb);

}


// Clear All Colours
function clearColours() {
    $(".colour-tile").remove();
}

