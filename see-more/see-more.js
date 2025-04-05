(function() {
    "use strict";

    window.addEventListener('load', init);

    function init() {
        let seeMoreText = id('see-more');
        seeMoreText.addEventListener('click', seeMoreClick);
    }

    function seeMoreClick() {
        const hiddenList = qsa('.hidden');
        for (let i =0; i<hiddenList.length; i++) {
            hiddenList[i].classList.remove('hidden');
        }
        const seeMore = id('see-more');
        seeMore.textContent = 'See Less';
        seeMore.removeEventListener('click', seeMoreClick);
        seeMore.addEventListener('click', seeLessClick);
    }

    function seeLessClick() {
        const paraList = qsa('#content > p');
        for (let i =paraList.length/2; i<paraList.length; i++) {
            paraList[i].classList.add('hidden');
        }
        const seeMore = id('see-more');
        seeMore.textContent = 'See More';
        seeMore.removeEventListener('click', seeLessClick);
        seeMore.addEventListener('click', seeMoreClick);
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