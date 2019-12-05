
var value;
window.onload = function() {

    chrome.storage.local.get(['login'], function(result) {
        if (result.login == true){
            document.getElementById("Oauth").style.visibility = "hidden"
        }
    });

    document.getElementById('Oauth').addEventListener('click', function () {

        chrome.identity.getAuthToken({interactive: true}, function (token) {
            const headers = new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            });

            value = true;
            chrome.storage.local.set({'login': value}, function () {
                document.getElementById("Oauth").style.visibility = "hidden"
            });

            const queryParams = {headers};

            fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
                .then((response) => response.json()) // Transform the data into json
                .then(function (data) {
                    console.log(data);
                });
        });

            document.getElementById('submit').addEventListener('click', function () {
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
                            text: `Appointment at Somewhere on June 3rd 10am-10:25am`
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
        })

    document.getElementById('submit').addEventListener('click', function () {

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
        });

        document.getElementById('submit').addEventListener('click', function () {
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
                        text: `Appointment at Somewhere on december 6th 10am-10:25am`
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
    })
        };


    //create a few global variables
    //title, date, time, location
    //we will do the rest
