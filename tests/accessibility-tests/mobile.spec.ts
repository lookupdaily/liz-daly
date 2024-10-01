import { test } from "@playwright/test";
import { HomePage } from "../page-object-model/home-page";

test.describe("Accessibility - Home page", () => {
	let homePage: HomePage;
	test.beforeEach(({ page }) => {
		homePage = new HomePage(page);
	});

	test("should have no issues", async () => {
		await homePage.goToMobile();
		await homePage.expect.toBeOnPage();
		await homePage.expect.toHaveNoAccessibilityIssues();

		await homePage.clickOnMenu();
		await homePage.expect.menuToBeVisible();
		await homePage.expect.toHaveNoAccessibilityIssues();
	});
});
