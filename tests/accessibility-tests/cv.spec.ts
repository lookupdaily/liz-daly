import { test } from "@playwright/test";
import { CvPage } from "../page-object-model/cv-page";

test.describe("Accessibility - Home page", () => {
	let cvPage: CvPage;
	test.beforeEach(({ page }) => {
		cvPage = new CvPage(page);
	});

	test("should have no issues", async () => {
		await cvPage.goTo();
		await cvPage.expect.toBeOnPage();
		await cvPage.expect.toHaveNoAccessibilityIssues();
	});
});
