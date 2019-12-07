// //var formTitle = document.getElementById("formName");
// var formDate = document.getElementById("formDate");
// var formTimeStart = document.getElementById("formTimeStart");
// //var formTimeEnd = document.getElementById("formTimeEnd");
// var formLoc = document.getElementById("formLocation");

// chrome.storage.local.get(['Ftitle'], function(result) {
//     //formTitle.value = result.Ftitle;
// });

// // chrome.storage.local.get(['Fdate'], function(result) {
    
// // });

// // chrome.storage.local.get(['Ftime'], function(result) {
    
// // });

// chrome.storage.local.get(['Floc'], function(result) {
//     formLocation = result.Floc;
// });

const inputs = document.querySelectorAll(".input");


document.getElementById("formTimeStart").parentNode.parentNode.classList.add("focus");
document.getElementById("formTimeEnd").parentNode.parentNode.classList.add("focus");
document.getElementById("formDate").parentNode.parentNode.classList.add("focus");

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
