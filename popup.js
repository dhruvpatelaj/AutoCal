var formName = document.getElementById("formName");
var formLocation= document.getElementById("formLocation");
var formDate= document.getElementById("formDate")
var formTimeStart= document.getElementById("formTimeStart")
var formTimeEnd= document.getElementById("formTimeEnd")

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = 2019;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

chrome.storage.sync.get(['eventTitle'], function(result) {

	formName.value = result.eventTitle;
});

chrome.storage.sync.get(['location'], function(result) {

	formLocation.value = result.location;
});


chrome.storage.sync.get(['startTime'], function(result) {

	formTimeStart.value = result.startTime;
});

chrome.storage.sync.get(['endTime'], function(result) {

	formTimeEnd.value = result.endTime;
});

chrome.storage.sync.get(['date'], function(result) {

	formDate.value = formatDate(result.date);
});




const inputs = document.querySelectorAll(".input");


document.getElementById("formTimeStart").parentNode.parentNode.classList.add("focus");
document.getElementById("formTimeEnd").parentNode.parentNode.classList.add("focus");
document.getElementById("formDate").parentNode.parentNode.classList.add("focus");
document.getElementById("formName").parentNode.parentNode.classList.add("focus");
document.getElementById("formLocation").parentNode.parentNode.classList.add("focus");



function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
