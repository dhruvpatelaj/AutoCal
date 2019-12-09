
var value;

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

    
window.onload = function() {

    chrome.storage.sync.get(['login'], function(result) {
        if(result.login){
            removeElement("Oauth")
        }
    });

    
    document.getElementById('Oauth').addEventListener('click', function () {
        chrome.identity.getAuthToken({interactive: true}, function (token) {
            const headers = new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            });

            const queryParams = {headers};

            value = true;
            chrome.storage.sync.set({'login': value}, function () {
                
            });


            fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
                .then((response) => response.json()) // Transform the data into json
                .then(function (data) {
                    console.log(data);
                });

            var makeQuerystring = params =>
                Object.keys(params)
                    .map(key => {
                        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                    })
                    .join("&");

            fetch(
                "https://www.googleapis.com/calendar/v3/calendars/primary/events/quickAdd",
                {
                    method: "post",
                    body: makeQuerystring({
                        text: "Appointment at Somewhere on December 15th 10am-10:25am"
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
                .then(res => res.json())
                .then(json => console.log(json));
        })

    });



    document.getElementById('submit').addEventListener('click', function () {

        var formName = document.getElementById("formName").value;
        var formLocation= document.getElementById("formLocation").value;
        var formDate= document.getElementById("formDate").value
        var formTimeStart= document.getElementById("formTimeStart").value
        var formTimeEnd= document.getElementById("formTimeEnd").value

        var submitString = formName + " at " + formLocation + " on " + formDate + " " + formTimeStart + "-" + formTimeEnd;
        alert(submitString);

        chrome.identity.getAuthToken({interactive: true}, function (token) {
            const headers = new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            });

            const queryParams = {headers};

            fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
                .then((response) => response.json()) // Transform the data into json
                .then(function (data) {
                    console.log(data);
                });

            var makeQuerystring = params =>
                Object.keys(params)
                    .map(key => {
                        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                    })
                    .join("&");

            fetch(
                "https://www.googleapis.com/calendar/v3/calendars/primary/events/quickAdd",
                {
                    method: "post",
                    body: makeQuerystring({
                        text: submitString
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
                .then(res => res.json())
                .then(json => console.log(json));
        })

    });
};