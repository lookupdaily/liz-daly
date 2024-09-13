import { getAllByRole, getByRole } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("menu", () => {
	let locators;
	let user;

	beforeEach(() => {
		const container = getExampleDom();
		locators = new Locators(container);
		user = userEvent.setup();
	});

	afterEach(() => {
		jest.resetModules();
		document.innerHTML = "";
	});

	describe("on first click", () => {
		beforeEach(() => {
			locators.button.click();
		});

		it("adds expanded class", () => {
			expect(locators.menu).toHaveClass("expanded");
		});

		it("sets aria-expanded attribute to true", () => {
			expect(locators.button.getAttribute("aria-expanded")).toBe("true");
		});

		it("closes menu on tabbing to the end", async () => {
			await user.keyboard("[Tab]");
			expect(locators.firstNavLink).toHaveFocus();

			await user.keyboard("[Tab]");
			expect(locators.secondNavLink).toHaveFocus();

			await user.keyboard("[Tab]");
			expect(locators.lastNavLink).toHaveFocus();

			await user.keyboard("[Tab]");
			expect(locators.outsideLink).not.toHaveFocus();
			expect(locators.button).toHaveFocus();
			expect(locators.menu).not.toHaveClass("expanded");
		});
	});

	describe("on second click", () => {
		beforeEach(() => {
			locators.button.click();
			locators.button.click();
		});

		it("removes expanded class", () => {
			expect(locators.menu).not.toHaveClass("expanded");
		});

		it("sets aria-expanded attribute to false", () => {
			expect(locators.button.getAttribute("aria-expanded")).toBe("false");
		});

		it("sets button text to menu", () => {
			expect(locators.button).toHaveTextContent("menu");
		});
	});

	describe("on pressing escape key when menu open", () => {
		beforeEach(async () => {
			locators.button.click();
			await user.keyboard("{Escape}");
		});

		it("adds expanded class", () => {
			expect(locators.menu).not.toHaveClass("expanded");
		});

		it("sets aria-expanded attribute to true", () => {
			expect(locators.button.getAttribute("aria-expanded")).toBe("false");
		});

		it("sets button text to close", () => {
			expect(locators.button).toHaveTextContent("menu");
		});

		it("pressing escape closes menu", () => {
			expect(locators.button).toHaveFocus();
		});
	});
});

function getExampleDom() {
	document.body.innerHTML = `
    <button id="menu-button" aria-expanded="false"><span id="button-text">menu</span></button>
    <nav id="menu">
      <a href="/first">First</a>
      <a href="/second">Second</a>
      <a href="/second">Last</a>
    </nav>
    <a href="/another">Another link</a>
  `;
	require("./menu");
	return document;
}

class Locators {
	container;

	constructor(container) {
		this.container = container;
	}

	get button() {
		return getByRole(this.container, "button");
	}

	get menu() {
		return getByRole(this.container, "navigation");
	}

	get links() {
		return getAllByRole(this.container, "link");
	}

	get firstNavLink() {
		return this.links[0];
	}

	get secondNavLink() {
		return this.links[1];
	}

	get lastNavLink() {
		return this.links[2];
	}

	get outsideLink() {
		return this.links[3];
	}
}
