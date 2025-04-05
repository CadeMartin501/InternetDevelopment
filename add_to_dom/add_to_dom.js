(function() {
    "use strict";

    let nextParaNumber = 5;

    window.addEventListener('load', init);

    function init() {
        const seeMore = id('see-more');
        seeMore.addEventListener('click', seeMoreClick);
    }

    function seeMoreClick() {
        const newPara = document.createElement('p');
        newPara.textContent = `This is paragraph ${nextParaNumber}.`;
        nextParaNumber++;
        const contents = id('content');
        contents.appendChild(newPara);
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