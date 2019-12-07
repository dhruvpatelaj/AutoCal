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
