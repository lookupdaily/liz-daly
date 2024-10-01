import { type Locator, type Page, expect } from "@playwright/test";
import { A11yViolation } from "../a11y-violation";

export class BasePage {
	readonly url: string;
	readonly headingLocator: Locator;
	readonly page: Page;

	constructor(page: Page, url: string, headingText: string) {
		this.headingLocator = page.getByRole("heading", { name: headingText });
		this.page = page;
		this.url = url;
	}

	async goTo(): Promise<void> {
		await this.page.goto(this.url);
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

	async toHaveNoAccessibilityIssues(): Promise<void> {
		const violations = await A11yViolation.getAll(this.page.page);
		expect(violations).toEqual([]);
	}
}
