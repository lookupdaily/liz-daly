const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const buttonText = document.getElementById("button-text");

menuButton.addEventListener("click", () => {
  let focusableEls;
  let firstFocusableEl;
  let lastFocusableEl;
  const isMenuOpen = !menu.classList.contains("expanded");
  toggleMenu();

  if (isMenuOpen) {
    focusableEls = Array.from(menu.querySelectorAll(".nav__link"));
    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];
    menu.addEventListener("keydown", setFocusTrap);
  } else {
    menu.removeEventListener("keydown", setFocusTrap);
  }

  function setFocusTrap(e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusableEl) {
          if (menuButton) {
            menuButton.focus();
          } else {
            firstFocusableEl.focus();
          }
          e.preventDefault();
        }
      }
    }

    if (e.key === "Escape") {
      toggleMenu();
      menuButton.focus();
      menu.removeEventListener('keydown',setFocusTrap);
    }
  }

  function toggleMenu() {
    menuButton.setAttribute("aria-expanded", isMenuOpen);
    menu.classList.toggle("expanded");
    buttonText.innerText = isMenuOpen ? "close" : "menu";
  }
});

