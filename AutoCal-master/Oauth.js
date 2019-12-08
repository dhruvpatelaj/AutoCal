
var value;

 
function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
    
window.onload = function() {

    chrome.storage.sync.get(['login'], function(result) {
        if(result.login){
           removeElement('Oauth');
        }
        
    });

    
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
                        text: "Appointment at Somewhere on December 6th 10am-10:25am"
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
                .then(res => res.json())
                .then(json => console.log(json));


            value = true;
            chrome.storage.sync.set({'login': value}, function () {
                document.getElementById("Oauth").style.visibility = "hidden"
            });
            
        })
        
        

    });

    document.getElementById('submit').addEventListener('click', function () {
        
    });
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
                        //text: "Appointment at Somewhere on December 6th 10am-10:25am"
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