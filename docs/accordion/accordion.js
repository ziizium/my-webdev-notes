(function () {
	/**
	 * We hide the accordion panels with JavaScript
	 */
	let panels = document.getElementsByClassName("accordion__panel");

	for (let i = 0; i < panels.length; i++) {
		panels[i].classList.add("panel-js");
	}

	/**
	 * We grab the accordion title and create
	 * the button and span elements. The button
	 * will serve as the accordion trigger and the
	 * span element will contain the accordion title.
	 *
	 */
	let accordionTitle = document.getElementsByClassName("accordion__title");

	for (let i = 0; i < accordionTitle.length; i++) {
		// Create the button and span elements
		let button = document.createElement("button");
		let span = document.createElement("span"); // We create a text node from the accordion title
		let textNode = document.createTextNode(accordionTitle[i].innerHTML);

		// We append it to the newly created span element
		span.appendChild(textNode);

		// We append the span element to the newly created
		// button element
		button.appendChild(span);

		// Then we append the button to the accordion title
		accordionTitle[i].appendChild(button);

		// We delete the text in the accordion title
		// since we already grabbed it and appended it
		// to the newly created span element.
		button.previousSibling.remove();

		// Set the button attributes
		button.setAttribute("aria-controls", "myID-" + i);
		button.setAttribute("aria-expanded", "false");
		button.setAttribute("class", "accordion__trigger");
		button.setAttribute("id", "accordion" + i + "id");

		// The next sibling of the accordion title
		// is the accordion panel. We need to attach the
		// corresponding attributes to it
		let nextSibling = accordionTitle[i].nextElementSibling;

		if (nextSibling.classList.contains("accordion__panel")) {
			// just to be sure

			// set the attributes
			nextSibling.setAttribute("id", "myID-" + i);
			nextSibling.setAttribute(
				"aria-labelled-by",
				button.getAttribute("id")
			);
			nextSibling.setAttribute("role", "region");
		}
	} // End of for() loop

	for (let i = 0; i < accordionTitle.length; i++) {
		accordionTitle[i].addEventListener("click", function () {
			// Add the active class to the accordion title
			this.classList.toggle("active");

			// grab the accordion panel
			let accordionPanel = this.nextElementSibling;

			// Hide or show the panel
			accordionPanel.classList.toggle("show");

			// Just to be safe, the accordion title
			// must have a single child element which
			// is the button element, therefore, we count
			// the child element
			let childElementCount = this.childElementCount;

			// We get the tag name
			let childTagName = this.children[0].tagName;

			// Then we check its just a single element and
			// it's in fact a button element
			if (childElementCount === 1 && childTagName === "BUTTON") {
				// If the check passed, then we grab the button
				// element which is the only child of the accordion
				// title using the childNodes attribute
				let accordionButton = this.childNodes[0];

				// Grab and switch its aria-expanded value
				// based on user interaction
				let accordionButtonAttr = accordionButton.getAttribute(
					"aria-expanded"
				);

				if (accordionButtonAttr === "false") {
					accordionButton.setAttribute("aria-expanded", "true");
				} else {
					accordionButton.setAttribute("aria-expanded", "false");
				}
			}
		});
	} // End of for() loop

	/**
	 * Accordion Keyboard Navigation based on code
	 * from W3C accordion example
	 */

	// Grab all accordions
	let accordion = document.getElementsByClassName("accordion");

	/**
	 * The querySelectorAll method returns a NodeList
	 * but we will like to loop through the triggers
	 * at a later time so that we can add focus styles
	 * to the accordion title that's why we convert
	 * the resulting NodelIst into an array which will
	 * allow us too used Array methods on it.
	 */
	let accordionTriggers = Array.prototype.slice.call(
		document.querySelectorAll(".accordion__trigger")
	);

	for (let i = 0; i < accordion.length; i++) {
		accordion[i].addEventListener("keydown", function (event) {
			let target = event.target;

			let key = event.keyCode.toString();

			// 33 = Page Up, 34 = Page Down
			let ctrlModifier = event.ctrlKey && key.match(/33|34/);

			if (target.classList.contains("accordion__trigger")) {
				// Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
				// 38 = Up, 40 = Down
				if (key.match(/38|40/) || ctrlModifier) {
					let index = accordionTriggers.indexOf(target);

					let direction = key.match(/34|40/) ? 1 : -1;

					let length = accordionTriggers.length;

					let newIndex = (index + length + direction) % length;

					accordionTriggers[newIndex].focus();

					event.preventDefault();
				} else if (key.match(/35|36/)) {
					// 35 = End, 36 = Home keyboard operations
					switch (key) {
						// Go to first accordion
						case "36":
							accordionTriggers[0].focus();
							break;
						// Go to last accordion
						case "35":
							accordionTriggers[
								accordionTriggers.length - 1
							].focus();
							break;
					}
					event.preventDefault();
				}
			}
		});
	}

	// These are used to style the accordion when one of the buttons has focus
	accordionTriggers.forEach(function (trigger) {
		// we add and remove the focus styles from the
		// h1 element via the parentElment attibuts
		trigger.addEventListener("focus", function (event) {
			trigger.parentElement.classList.add("focus");
		});

		trigger.addEventListener("blur", function (event) {
			trigger.parentElement.classList.remove("focus");
		});
	});
})();
