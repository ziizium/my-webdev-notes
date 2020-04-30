// a jQuery style selector. Inspired by Tod Motto
let $ = function (selector) {
	return document.querySelector(selector);
};

let validateInput = function (strValue)  {
	var objRegExp = /^[0-9a-zA-z\s\-\.\'\?]+$/;
	return objRegExp.test(strValue);
};
		
let removeParent = function (classname) {
	let div = this.parentElement;
	div.remove();
};

let taskForm__submitInput = $('#taskForm__submitInput');

/**
 * By default the submit input is disabled for
 * users with JavaScript disabled in their
 * browser because the application is practically useless
 * without JavaScript.
 * Therefore when they have JavaScript enabled in their
 * browser we remove the disabled attribute.
 */
taskForm__submitInput.removeAttribute('disabled');

let taskForm__input = $("#taskForm__input");


$('.taskForm').onsubmit =  function() {

	let taskName = $("#taskForm__input").value.trim();
	let validatedData = validateInput(taskName);
	
	let taskItem = document.createElement('li');
	let newTask = false;

	if (validatedData && validatedData !== "") {
		newTask = document.createTextNode(taskName); // create the name of the task
	} else {
		taskForm__input.value = ""; // clear the form input
		alert("Your task name contains invalid characters");
	}

	if (newTask !== "" && newTask !== false) {

		taskForm__input.value = ""; // Clear the form input

		taskList.appendChild(taskItem);

		taskItem.appendChild(newTask);

		let deleteTask = document.createElement("SPAN");

		let deleteIcon = document.createTextNode("\u00D7");

		deleteTask.className = "delete-task";

		deleteTask.appendChild(deleteIcon);

		taskItem.appendChild(deleteTask);

	}

	let getDeleteTask = $("#taskList").getElementsByClassName('delete-task');

	for (let i = 0; i < getDeleteTask.length; i++) {
		getDeleteTask[i].onclick = removeParent;
	}

	// Prevent the form from submitting
	return false;

}

let taskList = $('#taskList');

taskList.addEventListener('click', function(event) {
	if (event.target.tagName === 'LI') {
		event.target.classList.toggle('checked')
	}
}, false);

/**
 * DARK MODE settings. Not explained in the blog post
 */

// but the code is easy to understand.
let changeTheme = $("#changeTheme");
let body = $("#body");
let header = $('#header');
let form_instruction = $('#form-instruction');
let changeTheme_js = $('#changeTheme-js')

/**
 * We add CSS classes to the header and toggle
 * switch that's tailored for users with JavaScript
 * enabled.
 */
header.classList.add('header-js');
changeTheme_js.classList.add('changeTheme-js');

changeTheme.addEventListener("click", function() {

	if (changeTheme.checked) {

		body.classList.add('dark-mode-body');
		header.classList.add('dark-mode-header');
		form_instruction.classList.add('dark-mode-form-instruction');
		taskForm__input.classList.add('dark-mode-input');
		taskForm__submitInput.classList.add('dark-mode-submitInput');
		changeTheme.classList.add('dark-mode-slider');
		taskList.classList.add('dark-mode-task');

	} else {
					
		body.classList.remove('dark-mode-body');
		header.classList.remove('dark-mode-header');
		form_instruction.classList.remove('dark-mode-form-instruction');
		taskForm__input.classList.remove('dark-mode-input');
		taskForm__submitInput.classList.remove('dark-mode-submitInput');
		changeTheme.classList.remove('dark-mode-slider');
		taskList.classList.remove('dark-mode-task');

	}

});