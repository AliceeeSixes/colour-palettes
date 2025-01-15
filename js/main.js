
// Colour Tile Generation

function newColour(rgb) {
    console.log("New colour generated")
    // Extract individual rgb values back out
    let colours = rgb.slice(4,-1).split(",");
    let red = colours[0];
    let green = colours[1];
    let blue = colours[2];
    console.log(colours);


    // Create and append new element
    let $newColour = $(`<div></div>`).addClass("colour-tile").css("background-color",rgb);
    $newColour = $newColour.html(`<button class="colour-tile-delete">Remove Colour</button><div class="colour-tile-text"><h1>`+rgb+`</h1><h2>Red: `+red+`</h2><h2>Green: `+green+`</h2><h2>Blue: `+blue+`</h2></div>`);
    $("#main__container-contents").append($newColour);
}


function randomRGB() {
    let red = 1 + Math.floor(Math.random() * 255);
    let green = 1 + Math.floor(Math.random() * 255);
    let blue = 1 + Math.floor(Math.random() * 255);
    let rgb = "rgb(" + red +"," + green +"," + blue +")";
    console.log(rgb);
    return(rgb);
}

// Colour Tile Deletion

$("#main__container-contents").on("click","button", (event) => {
    let $tileToDelete = $(event.target).parent();
    $tileToDelete.remove();

});