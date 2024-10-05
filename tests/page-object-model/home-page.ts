import type { Locator, Page } from "@playwright/test";
import { BasePage, PageAssertions } from "./base-page";

export class HomePage extends BasePage {
	readonly expect: PageAssertions;
	readonly cvLinkLocator: Locator;

	constructor(page: Page) {
		super(page, "/", "Liz Daly");
		this.expect = new PageAssertions(this);
		this.cvLinkLocator = page.getByRole("link", { name: "My CV" });
	}

	async clickCvLink(): Promise<void> {
		await this.cvLinkLocator.click();
	}
}
