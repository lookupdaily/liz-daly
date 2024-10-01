import type { Page } from "@playwright/test";
import { BasePage, PageAssertions } from "./base-page";

export class CvPage extends BasePage {
	readonly expect: PageAssertions;

	constructor(page: Page) {
		super(page, "/cv", "Tech skills");
		this.expect = new PageAssertions(this);
	}
}
