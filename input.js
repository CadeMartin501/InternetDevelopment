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
        const zipRegex =  /^\d{5}$/;
        const zipCode = id('zip-code');
        console.log(zipRegex.test(zipCode.value));
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