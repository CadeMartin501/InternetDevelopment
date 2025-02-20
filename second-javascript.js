function init() {
    let myButton = document.getElementById('my-button');
    alert(myButton);
    myButton.addEventListener('click', buttonClick);
}

window.addEventListener('load', init);








function buttonClick() {
    alert('The button was clicked.');
}
