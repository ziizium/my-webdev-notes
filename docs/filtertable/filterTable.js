let searchInput = document.getElementById('searchInput');

searchInput.addEventListener("keyup", filterTable, false);

function filterTable() {
	
	// get the user input
	let filter = searchInput.value.toUpperCase();

	// grab the table
	let table = document.getElementById("table");

	// get all table rows in the selected table
	let tr = table.getElementsByTagName("tr");

	for (let i= 0; i < tr.length; i++) {

		// get the first table data of each row
		let td = tr[i].getElementsByTagName("td")[0];

		if (td) { // we got a data to work with

			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) { // we found a match

				// we show it
				tr[i].style.display = "";

			} else { // no match found

				// we hide the table data
				tr[i].style.display = "none";

			} // end of if (td.innerHTML..)

		} // end of if (td)

	} // end of for()

} // end of function filterTable()