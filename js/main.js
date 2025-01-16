
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
    let $newColour = $(`<div></div>`).addClass("colour-tile").css("background-color",rgb).css("color",opposite);

    // HTML for addition buttons
    let addOppositeButton = `<button class="add-opposite">Add opposite colour</button>`;
    let addDarkerButton = `<button class="add-darker">Add 10% darker</button>`;
    let addLighterButton = `<button class="add-lighter">Add 10% lighter</button>`;
    let buttons = `<div class="colour-tile-buttons">`+addDarkerButton+addOppositeButton+addLighterButton+`</div>`;

    // HTML for copy buttons
    let copyRGB = `<button class="copy-rgb">Copy RGB</button>`;
    let copyHex = `<button class="copy-hex">Copy Hex</button>`;
    let copyButtons = copyRGB + "<br>" + copyHex;

    html += `<button class="colour-tile-delete">Remove</button><div class="colour-tile-text"><form><h2>Red: `+red+`</h2><h2>Green: `+green+`</h2><h2>Blue: `+blue+`</h2></form>`+copyButtons+`</div>`+buttons;


    $newColour.html(html);
    // Colour buttons correctly
    $($newColour).find(".add-opposite").css("background-color",opposite).css("color",rgb);
    $($newColour).find(".add-lighter").css("background-color",lighter).css("color",opposite);
    $($newColour).find(".add-darker").css("background-color",darker).css("color",opposite);
    $($newColour).find(".copy-rgb").text(rgb).css("color",opposite);
    $($newColour).find(".copy-hex").text(rgbToHex(rgb)).css("color",opposite);

    // Size inputs correctly
    let redLen = $($newColour).find(".red").val().length;
    $($newColour).find(".red").css("width",(15 * redLen + 15));
    let greenLen = $($newColour).find(".green").val().length;
    $($newColour).find(".green").css("width",(15 * greenLen + 15));
    let blueLen = $($newColour).find(".blue").val().length;
    $($newColour).find(".blue").css("width",(15 * blueLen + 15));

    // Colour Tiles update backgrounds
    $newColour.on("input",(event) => {
        let container = $(event.target).parents(".colour-tile");
        let red = $(container).find(".red").val();
        let green = $(container).find(".green").val();
        let blue = $(container).find(".blue").val();
        let opposite = invert(red, green, blue);
        let lighter = rgbLighten(red, green, blue);
        let darker = rgbDarken(red, green, blue);
        let rgb = `rgb(`+red+`, `+green+`, `+blue+`)`;
        container.css("background-color",rgb);
        let newText = `rgb(`+red+`, `+green+`, `+blue+`)`;
        $(container).find("h1").text(newText);
        $(container).find(".add-opposite").css("background-color",opposite).css("color",rgb);
        $(container).find(".add-lighter").css("background-color",lighter).css("color",opposite);
        $(container).find(".add-darker").css("background-color",darker).css("color",opposite);
        $(container).css("color",opposite);


        // Resize inputs based on value
        let redLen = $(container).find(".red").val().length;
        $(container).find(".red").css("width",(15 * redLen + 15));
        let greenLen = $(container).find(".green").val().length;
        $(container).find(".green").css("width",(15 * greenLen + 15));
        let blueLen = $(container).find(".blue").val().length;
        $(container).find(".blue").css("width",(15 * blueLen + 15));

        // Update RGB/Hex labels based on input values
        $(container).find(".copy-rgb").text(rgb).css("color",opposite);
        $(container).find(".copy-hex").text(rgbToHex(rgb)).css("color",opposite);
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
$("#main__container-contents").on("click","button.add-opposite", (event) => {
    let colour = $(event.target).css("background-color");
    newColour(colour);
});
$("#main__container-contents").on("click","button.add-lighter", (event) => {
    let colour = $(event.target).css("background-color");
    newColour(colour);
});
$("#main__container-contents").on("click","button.add-darker", (event) => {
    let colour = $(event.target).css("background-color");
    newColour(colour);
});

// Copy value buttons
$("#main__container-contents").on("click","button.copy-rgb", (event) => {
    console.log("copy rgb");
    let colour = $(event.target).parents(".colour-tile").css("background-color");
    copyRgb(colour);

});

$("#main__container-contents").on("click","button.copy-hex", (event) => {
    console.log("copy hex");
    let colour = $(event.target).parents(".colour-tile").css("background-color");
    copyHex(colour);
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

// Popup

function popup(message) {
    // Display Message
    if (message) {
        $(".popup-inner textarea").val(message);
        $(".popup-outer").show();
    } else {
        $(".popup-inner textarea").val("");
        $(".popup-outer").show();
    }
    // Recieve Input
}

function closePopup() {
    $(".popup-outer").hide();
}

closePopup();


// Notif

function notif(message) {
    // Display Message
    $(".notif").text(message);

    // Show notif
    $(".notif").fadeIn(100).delay(1500).fadeOut(100);



}

$(".notif").hide();

// Export palette as string

function exportAsString() {
    let exportString = ``;
    let $tiles = $(".colour-tile");
    $tiles.each((index) => {
        exportString += $tiles[index].style.backgroundColor;
        exportString += `%`
    });
    $(".copy-text").html(`<i class="fa fa-copy"></i> Copy to clipboard`);
    $(".copy-text").show();
    $(".import-string").hide();
    $(".popup-inner p").text(`Your string is:`);
    popup(exportString);
}

// Copy to clipboard

function copyToClipboard() {
    let copyText = $("#string").val();
    navigator.clipboard.writeText(copyText);
    $(".copy-text").html(`<i class="fa fa-check"></i> Copy to clipboard`);
}



// Import palette from string

function importFromString() {
    $(".copy-text").hide();
    $(".import-string").show();
    $(".popup-inner p").text(`Input string:`);
    popup();
    console.log(".");
}

function generateFromString() {
    let importString = $("#string").val();
    importString = importString.split("%");
    importString.pop();
    for (let index in importString) {
        newColour(importString[(index)]);
    }
    closePopup();
}

// RGB to Hex function
function rgbToHex(rgb) {
    let colours = rgb.slice(4,-1).split(", ");
    let red = colours[0];
    let green = colours[1];
    let blue = colours[2];

    let redHex = parseInt(red).toString(16);
    while (redHex.length < 2) {
        redHex = "0" + redHex;
    }
    let greenHex = parseInt(green).toString(16);
    while (greenHex.length < 2) {
        greenHex = "0" + greenHex;
    }
    let blueHex = parseInt(blue).toString (16);
    while (blueHex.length < 2) {
        blueHex = "0" + blueHex;
    }

    newHex = "#"+redHex+greenHex+blueHex;
    return(newHex);


}

// Copy RGB to clipboard

function copyRgb(rgb) {
    let copyText = rgb;
    navigator.clipboard.writeText(copyText);

    // Copy notification
    notif("Copied to clipboard!");
    
}


// Copy Hex to clipboard

function copyHex(rgb) {
    let copyText = rgbToHex(rgb);
    navigator.clipboard.writeText(copyText);

    // Copy notification
    notif("Copied to clipboard!");
    
}