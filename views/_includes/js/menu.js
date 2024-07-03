const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const buttonText = document.getElementById("button-text");

menuButton.addEventListener("click", () => {
  let focusableEls;
  let firstFocusableEl;
  let lastFocusableEl;
  let isMenuOpen;
  toggleMenu();

  if (isMenuOpen) {
    focusableEls = Array.from(menu.querySelectorAll("a"));
    console.log(focusableEls);
    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];
    document.addEventListener("keydown", setFocusTrap);
  } else {
    document.removeEventListener("keydown", setFocusTrap);
  }

  function setFocusTrap(e) {
    console.log(e)
    console.log(e.key)
    if (e.key === "Tab") {
      if (e.shiftKey) {
        /* shift + tab */ 
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusableEl) {
          menuButton.focus();
          e.preventDefault();
        }
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      toggleMenu();
      menuButton.focus();
      menu.removeEventListener('keydown',setFocusTrap);
    }
  }

  function toggleMenu() {
    isMenuOpen = !menu.classList.contains("expanded");
    menuButton.setAttribute("aria-expanded", isMenuOpen);
    menu.classList.toggle("expanded");
    buttonText.innerHTML = isMenuOpen ? "close" : "menu";
  }
});

