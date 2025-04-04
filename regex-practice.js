(function() {
    "use strict";

    window.addEventListener('load', init);

    function init() {
        const email = id('email');
        email.addEventListener('input', checkEmail);

        const zipCode = id('zip-code');
        zipCode.addEventListener('input', checkZipCode);

        const DNA = id('dna');
        DNA.addEventListener('input', checkDNA);

        const course = id('course');
        course.addEventListener('input', checkCourse);

        const m_and_q = id('m-and-q');
        m_and_q.addEventListener('input', checkMQ);

        const CS = id('CS');
        CS.addEventListener('input', checkCS);
    }

    function checkEmail() {
        const emailRegex =  /^[a-z]{1,3}\d{5}@obu\.edu$/;
        const email = id('email');
        if(emailRegex.test(email.value)){
            email.classList.add('match');
            email.classList.remove('nomatch');
        } else {
            email.classList.add('nomatch');
            email.classList.remove('match');
        }
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

    function checkDNA() {
        const DNARegex =  /^[ACGT]*$/;
        const DNACode = id('dna');
        if(DNARegex.test(DNACode.value)){
            DNACode.classList.add('match');
            DNACode.classList.remove('nomatch');
        } else {
            DNACode.classList.add('nomatch');
            DNACode.classList.remove('match');
        }
    }

    function checkCourse() {
        const courseRegex =  /^[A-Z]{3,4} [1-4]\d{3}(\.5)?$/;
        const courseCode = id('course');
        if(courseRegex.test(courseCode.value)){
            courseCode.classList.add('match');
            courseCode.classList.remove('nomatch');
        } else {
            courseCode.classList.add('nomatch');
            courseCode.classList.remove('match');
        }
    }

    function checkMQ() {
        const MQRegex =  /^m[a-z]*q[a-z]*$/;
        const MQCode = id('m-and-q');
        if(MQRegex.test(MQCode.value)){
            MQCode.classList.add('match');
            MQCode.classList.remove('nomatch');
        } else {
            MQCode.classList.add('nomatch');
            MQCode.classList.remove('match');
        }
    }

    function checkCS() {
        const CSRegex =  /c[a-z]{1}s/;
        const CSCode = id('CS');
        if(CSRegex.test(CSCode.value)){
            CSCode.classList.add('match');
            CSCode.classList.remove('nomatch');
        } else {
            CSCode.classList.add('nomatch');
            CSCode.classList.remove('match');
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