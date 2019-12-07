var formName = document.getElementById("formName");
var formLocation= document.getElementById("formLocation");

chrome.storage.sync.get(['eventTitle'], function(result) {

	formName.value = result.eventTitle;
});

chrome.storage.sync.get(['location'], function(result) {

	formLocation.value = result.location;
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
