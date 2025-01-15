
// Colour Tile Generation

function newColour(rgb) {
    console.log("New colour generated")
    // Extract individual rgb values back out
    let colours = rgb.slice(4,-1).split(", ");
    let red = colours[0];
    let green = colours[1];
    let blue = colours[2];
    let opposite = invert(red, green, blue);
    red = `<input value="`+red+`" class="red" name="red" type="number" max="255"></input>`;
    green = `<input value="`+green+`" class="green" name="green" type="number" max="255"></input>`;
    blue = `<input value="`+blue+`" class="blue" name="blue" type="number" max="255"></input>`;
    console.log(colours);


    // Create new element

    let $newColour = $(`<div></div>`).addClass("colour-tile").css("background-color",rgb);
    let buttons = `<div class="colour-tile-buttons"><button class="add-opposite">Add opposite colour</button></div>`;
    $newColour = $newColour.html(`<button class="colour-tile-delete">Remove</button><div class="colour-tile-text"><h1>`+rgb+`</h1><form><h2>Red: `+red+`</h2><h2>Green: `+green+`</h2><h2>Blue: `+blue+`</h2></form></div>`+buttons);
    $($newColour).find(".add-opposite").css("background-color",opposite);

    // Colour Tiles update backgrounds
    $newColour.on("input",(event) => {
        let container = $(event.target).parents(".colour-tile");
        let red = $(container).find(".red").val();
        let green = $(container).find(".green").val();
        let blue = $(container).find(".blue").val();
        let opposite = invert(red, green, blue);
        let rgb = `rgb(`+red+`,`+green+`,`+blue+`)`;
        container.css("background-color",rgb);
        let newText = `rgb(`+red+`, `+green+`, `+blue+`)`;
        $(container).find("h1").text(newText);
        $(container).find(".add-opposite").css("background-color",opposite);
    });



    // Append new element
    $("#main__container-contents").append($newColour);
}


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

$("#main__container-contents").on("click","button.add-opposite", (event) => {
    let colour = $(event.target).css("background-color");
    newColour(colour);
});


// Clear All Colours
function clearColours() {
    $(".colour-tile").remove();
}