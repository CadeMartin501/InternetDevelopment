
(function() {
    'use strict';

    window.addEventListener('load', init);

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", `${UVKey}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    function init() {

        const url = 'https://api.openuv.io/api/v1/uv?lat=34.54&lng=-93.03&alt=100&dt=';
        fetch(url,requestOptions)
        .then(statusCheck)
        .then((response) => response.json())
        .then(addUV)
        .catch(UVError);
    }

    function addUV(result) {
        const UVContainer = id('UVContainer');
        
        const UVMax = result.result.uv_max;
        const UVMaxTime = result.result.uv_max_time;
        const safeTime = result.result.safe_exposure_time.st2;
        const date = new Date(UVMaxTime);
        const newPara = document.createElement('p');
        newPara.textContent = `Today's max UV will be ${Math.round(UVMax)} at ${date.getHours()}:${date.getMinutes()} The recommended time to tan is ${safeTime} minutes`;
        UVContainer.appendChild(newPara);

    }

    function UVError(error) {
        console.log(error);
    }

    /////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

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