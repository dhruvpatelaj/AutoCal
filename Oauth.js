window.onload = function() {
    document.getElementById('Oauth').addEventListener('click', function () {
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
                        text: "Appointment at Somewhere on June 3rd 10am-10:25am"
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


    //create a few global variables
    //title, date, time, location
    //we will do the rest