const inputs = document.querySelectorAll(".input");

document.getElementById("eventDate").value = "2020-01-01";
document.getElementById("eventTime").value = "12:00:00";
document.getElementById("eventTimeEnd").value = "13:00:00";


document.getElementById("eventTime").parentNode.parentNode.classList.add("focus");
document.getElementById("eventTimeEnd").parentNode.parentNode.classList.add("focus");
document.getElementById("eventDate").parentNode.parentNode.classList.add("focus");

document.getElementById("eventName").focus()

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
