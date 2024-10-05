import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle(/Liz Daly/);
});

test("CV link", async ({ page }) => {
	await page.goto("/");

	await page.getByRole("link", { name: "My CV" }).click();

	await expect(
		page.getByRole("heading", { name: "Tech skills" }),
	).toBeVisible();
});
