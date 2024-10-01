import { type Locator, type Page, expect } from "@playwright/test";
import { A11yViolation } from "../a11y-violation";

export class BasePage {
	readonly url: string;
	readonly headingLocator: Locator;
	readonly menuLocator: Locator;
	readonly menuButtonLocator: Locator;
	readonly page: Page;

	constructor(page: Page, url: string, headingText: string) {
		this.url = url;
		this.headingLocator = page.getByRole("heading", { name: headingText });
		this.menuLocator = page.getByRole("navigation");
		this.menuButtonLocator = page.getByRole("button", { name: "Menu" });
		this.page = page;
	}

	async goTo(): Promise<void> {
		await this.page.goto(this.url);
	}

	async goToMobile(): Promise<void> {
		await this.page.setViewportSize({
			width: 640,
			height: 480,
		});

		await this.goTo();
	}

	async clickOnMenu(): Promise<void> {
		await this.menuButtonLocator.click();
	}
}

export class PageAssertions {
	readonly page: BasePage;
	constructor(page: BasePage) {
		this.page = page;
	}

	async toBeOnPage(): Promise<void> {
		await expect(this.page.headingLocator).toBeVisible();
	}

	async menuToBeVisible(): Promise<void> {
		await expect(this.page.menuLocator).toBeVisible();
	}

	async toHaveNoAccessibilityIssues(): Promise<void> {
		const violations = await A11yViolation.getAll(this.page.page);
		expect(violations).toEqual([]);
	}
}
