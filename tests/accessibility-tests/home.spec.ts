import { test } from "@playwright/test";
import { HomePage } from "../page-object-model/home-page";

test.describe("Accessibility - Home page", () => {
	let homePage: HomePage;
	test.beforeEach(({ page }) => {
		homePage = new HomePage(page);
	});

	test("should have no issues", async () => {
		await homePage.goTo();
		await homePage.expect.toBeOnPage();
		await homePage.expect.toHaveNoAccessibilityIssues();
	});
});
