const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", toggleMenu);

function toggleMenu() {
	let focusableEls;
	let lastFocusableEl;

	const isMenuOpen = !menu.classList.contains("expanded");
	menuButton.setAttribute("aria-expanded", isMenuOpen);
	menu.classList.toggle("expanded");

	if (isMenuOpen) {
		focusableEls = Array.from(menu.querySelectorAll("a"));
		lastFocusableEl = focusableEls[focusableEls.length - 1];
		document.addEventListener("keydown", setFocusTrap);
	} else {
		document.removeEventListener("keydown", setFocusTrap);
	}

	menuButton.focus();

	function setFocusTrap(e) {
		if (
			e.key === "Tab" &&
			!e.shiftKey &&
			document.activeElement === lastFocusableEl
		) {
			e.preventDefault();
			toggleMenu();
		}

		if (e.key === "Escape") {
			e.preventDefault();
			toggleMenu();
		}
	}
}
