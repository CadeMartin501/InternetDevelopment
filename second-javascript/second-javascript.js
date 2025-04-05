(function () {
    "use strict";
    let x = 42;

    window.addEventListener('load', init);


function init() {
    let myButton = document.getElementById('my-button');
    // alert(myButton);
    myButton.addEventListener('click', buttonClick);
}


function buttonClick() {
    // alert('The button was clicked.');
    let card = document.getElementById('card');
    card.src = "kenney_boardgame-pack/PNG/Cards/cardSpadesA.png";
}
}
)
