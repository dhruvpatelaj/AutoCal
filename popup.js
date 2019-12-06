const inputs = document.querySelectorAll(".input");





var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + '-' + dd;

function fillForms(){
	alert("hello")
}

chrome.storage.sync.get(['eventValue'], function(result) {
	
	document.getElementById("eventName").value = result.eventValue;
	document.getElementById("eventName").parentNode.parentNode.classList.add("focus");
});


document.getElementById("eventDate").value = today;
document.getElementById("eventTime").value = "12:00:00";
document.getElementById("eventTimeEnd").value = "13:00:00";


document.getElementById("eventTime").parentNode.parentNode.classList.add("focus");
document.getElementById("eventTimeEnd").parentNode.parentNode.classList.add("focus");
document.getElementById("eventDate").parentNode.parentNode.classList.add("focus");





//document.getElementById("eventName").focus()

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
