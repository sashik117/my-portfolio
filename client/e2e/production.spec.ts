import { expect, test } from "@playwright/test";

const productionUrl = process.env.E2E_PRODUCTION_URL?.replace(/\/$/, "");
const adminEmail = process.env.E2E_ADMIN_EMAIL;
const adminPassword = process.env.E2E_ADMIN_PASSWORD;
const contactEmail = process.env.E2E_CONTACT_EMAIL || "portfolio-smoke@example.com";

test.describe("production smoke", () => {
  test.skip(!productionUrl, "Set E2E_PRODUCTION_URL to run production smoke tests.");

  test("public portfolio and contact form are alive", async ({ page }) => {
    await page.goto(productionUrl!);
    await expect(page.getByText("Oleksandra").first()).toBeVisible();

    await page.goto(`${productionUrl}#projects`);
    await expect(page.locator("#projects article").first()).toBeVisible();

    await page.goto(`${productionUrl}#contact`);
    await page.locator("#contact input[required]").first().fill("Production Smoke");
    await page.locator('#contact input[type="email"]').fill(contactEmail);
    await page
      .locator("#contact textarea")
      .fill("Automated production smoke check for the portfolio contact flow.");
    await page.locator('#contact button[type="submit"]').click();

    await expect(page.locator("#contact")).toContainText(/sent|відправлено/i, {
      timeout: 20_000
    });
  });

  test("admin CMS can create, reorder, and delete projects", async ({ page }) => {
    test.skip(
      !adminEmail || !adminPassword,
      "Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD to run admin production smoke tests."
    );

    const stamp = Date.now();
    const firstTitle = `E2E Smoke Alpha ${stamp}`;
    const secondTitle = `E2E Smoke Beta ${stamp}`;

    page.on("dialog", (dialog) => dialog.accept());

    await page.goto(`${productionUrl}/admin`);
    await page.getByPlaceholder("admin@example.com").fill(adminEmail!);
    await page.getByPlaceholder("********").fill(adminPassword!);
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("Portfolio CMS")).toBeVisible({ timeout: 20_000 });

    async function createProject(title: string) {
      await page.getByLabel("Title").fill(title);
      await page
        .getByLabel("Short description")
        .fill("Temporary project created by the production E2E smoke test.");
      await page
        .getByLabel("Details")
        .fill("This project verifies that the deployed admin CMS can write, read, reorder, and delete content.");
      await page.getByLabel("Technologies").fill("React, Node.js, E2E");
      await page.getByLabel("Category").fill("Smoke Test");
      await page.getByLabel("GitHub URL").fill("https://github.com/sashik117/my-portfolio");
      await page.getByRole("button", { name: "Add project" }).click();
      await expect(page.getByText("Project created.")).toBeVisible({ timeout: 20_000 });
      await expect(page.getByText(title)).toBeVisible();
    }

    await createProject(firstTitle);
    await createProject(secondTitle);

    await page
      .locator("article")
      .filter({ hasText: secondTitle })
      .getByRole("button", { name: "Up" })
      .click();
    await expect(page.getByText("Project order updated.")).toBeVisible({ timeout: 20_000 });

    for (const title of [firstTitle, secondTitle]) {
      await page
        .locator("article")
        .filter({ hasText: title })
        .getByRole("button", { name: "Delete" })
        .click();
      await expect(page.getByText("Project deleted.")).toBeVisible({ timeout: 20_000 });
    }
  });
});
