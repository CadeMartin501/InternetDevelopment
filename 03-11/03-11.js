(function() {
    "use strict";


    window.addEventListener('load', init);

    function init() {
        let liList = qsa('#todo>li');
        for (let i=0; i<liList.length; i++) {
            liList[i].addEventListener('click', liClick);
        }
    }

    function liClick(event) {
        let clicked = event.currentTarget;
        clicked.classList.toggle('whacked');
    }

    /////////////////////////////////////////////////////////////////////
    // Helper functions
    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();