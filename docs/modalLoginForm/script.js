let modal = document.getElementById('modal');
let openModal = document.getElementById('openModal');
let closeModal = document.getElementById('closeModal');
let cancelModal = document.getElementById('cancelModal');

openModal.addEventListener("click", () => {
	modal.style.display = 'block';
});

closeModal.addEventListener("click", () => {
	modal.style.display = 'none';
});

cancelModal.addEventListener("click", () => {
	modal.style.display = 'none';
});

// When the user click anywhere outside
// of the modal, close it.
window.onclick = (event) => {
	if (event.target === modal) {
		modal.style.display = 'none'
	}
}