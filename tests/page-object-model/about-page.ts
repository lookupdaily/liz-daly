import type { Page } from "@playwright/test";
import { BasePage, PageAssertions } from "./base-page";

export class AboutPage extends BasePage {
	readonly expect: PageAssertions;

	constructor(page: Page) {
		super(page, "/about", "Hello");
		this.expect = new PageAssertions(this);
	}
}
