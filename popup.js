var formTitle = document.getElementById("formTitle");
var formDate = document.getElementById("formDate");
var formTimeStart = document.getElementById("formTimeStart");
//var formTimeEnd = document.getElementById("formTimeEnd");
var formLoc = document.getElementById("formLocation");

chrome.storage.local.get(['Ftitle'], function(result) {
    formTitle.value = result.Ftitle;
});

// chrome.storage.local.get(['Fdate'], function(result) {
    
// });

// chrome.storage.local.get(['Ftime'], function(result) {
    
// });

chrome.storage.local.get(['Floc'], function(result) {
    formLocation = result.Floc;
});