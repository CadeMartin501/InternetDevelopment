(function() {
    "use strict";

    window.addEventListener('load', init);

    function init() {
        const input = id('input');
        input.value = 'alsdkj';
        
        const para = id('para');
        para.textContent = 'Something different';

        const zipCode = id('zip-code');
        zipCode.addEventListener('input', checkZipCode);
    }

    function checkZipCode() {
        const zipRegex =  /^\d{5}(-\d{4})?$/;
        const zipCode = id('zip-code');
        if(zipRegex.test(zipCode.value)){
            zipCode.classList.add('match');
            zipCode.classList.remove('nomatch');
        } else {
            zipCode.classList.add('nomatch');
            zipCode.classList.remove('match');
        }
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