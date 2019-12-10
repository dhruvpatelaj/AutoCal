
function militaryToStanard(time){

    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
    } else if (hours > 12) {
    timeValue= "" + (hours - 12);
    } else if (hours == 0) {
    timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " pm" : " am";  // get AM/PM

    return timeValue;
}

function militaryToStanardTwo(time){

    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
    } else if (hours > 12) {
    timeValue= "" + (hours - 12);
    } else if (hours == 0) {
    timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    //timeValue += (hours >= 12) ? " pm" : " am";  // get AM/PM

    return timeValue;
}
var value;

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

    
window.onload = function() {

    // chrome.storage.sync.get(['login'], function(result) {
    //     if(result.login){
    //         removeElement("Oauth")
    //     }
    // });

    
    // document.getElementById('Oauth').addEventListener('click', function () {
    //     chrome.identity.getAuthToken({interactive: true}, function (token) {
    //         const headers = new Headers({
    //             'Authorization': 'Bearer ' + token,
    //             'Content-Type': 'application/json'
    //         });

    //         const queryParams = {headers};

    //         value = true;
    //         chrome.storage.sync.set({'login': value}, function () {
                
    //         });


    //         fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
    //             .then((response) => response.json()) // Transform the data into json
    //             .then(function (data) {
    //                 console.log(data);
    //             });

    //         var makeQuerystring = params =>
    //             Object.keys(params)
    //                 .map(key => {
    //                     return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    //                 })
    //                 .join("&");

    //         fetch(
    //             "https://www.googleapis.com/calendar/v3/calendars/primary/events/quickAdd",
    //             {
    //                 method: "post",
    //                 body: makeQuerystring({
    //                     text: "Appointment at Somewhere on December 15th 10am-10:25am"
    //                 }),
    //                 headers: {
    //                     'Authorization': 'Bearer ' + token,
    //                     "Content-Type": "application/x-www-form-urlencoded"
    //                 }
    //             }
    //         )
    //             .then(res => res.json())
    //             .then(json => console.log(json));
    //     })

    // });



    document.getElementById('submit').addEventListener('click', function () {

        var formName = document.getElementById("formName").value;
        var formLocation= document.getElementById("formLocation").value;
        var formDate= document.getElementById("formDate").value
        var formTimeStart= document.getElementById("formTimeStart").value
        var formTimeEnd= document.getElementById("formTimeEnd").value

        formTimeStart = militaryToStanard(formTimeStart);
        formTimeEnd = militaryToStanard(formTimeEnd);


        var submitString = formName + " at " + formLocation + " on " + formDate + " " + formTimeStart + "-" + formTimeEnd;
        //alert(submitString);

        //window.close();

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
        //window.close();
        
    });
};