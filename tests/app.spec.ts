import { test } from "@playwright/test";
import { CvPage } from "./page-object-model/cv-page";
import { HomePage } from "./page-object-model/home-page";

test.describe("App", () => {
	let homePage: HomePage;
	test.beforeEach(({ page }) => {
		homePage = new HomePage(page);
	});

	test("go to homepage", async () => {
		await homePage.goTo();
		await homePage.expect.toBeOnPage();
	});

	test("has link to CV", async ({ page }) => {
		const cvPage = new CvPage(page);

		await homePage.goTo();
		await homePage.clickCvLink();

		await cvPage.expect.toBeOnPage();
	});
});
