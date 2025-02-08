import { test } from "@playwright/test";
import { AboutPage } from "../page-object-model/about-page";

test.describe("Accessibility - About page", () => {
	let aboutPage: AboutPage;
	test.beforeEach(({ page }) => {
		aboutPage = new AboutPage(page);
	});

	test("should have no issues", async () => {
		await aboutPage.goTo();
		await aboutPage.expect.toBeOnPage();
		await aboutPage.expect.toHaveNoAccessibilityIssues();
	});
});
