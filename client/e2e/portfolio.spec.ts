import { expect, type Route, test } from "@playwright/test";

const mockProjects = [
  {
    _id: "project-1",
    title: "DreamTune",
    description: "Full-stack music platform with product-focused mobile UX.",
    longDescription: "Full-stack music platform with playlist sync, backend logic, and polished UI states.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/sashik117/DreamTune",
    liveUrl: "https://example.com/dreamtune",
    imageUrl: "/assets/dreamtune.png",
    category: "Music App",
    featured: true,
    sortOrder: 1000,
    status: "published"
  },
  {
    _id: "project-2",
    title: "Menu Portal",
    description: "Laravel CMS direction with admin CRUD and content structure.",
    longDescription: "Laravel CMS direction with validation, admin CRUD, and structured menu data.",
    technologies: ["PHP", "Laravel", "MySQL"],
    imageUrl: "/assets/menu-portal.svg",
    category: "Laravel App",
    featured: false,
    sortOrder: 2000,
    status: "published"
  }
];

const mockMessages = [
  {
    _id: "message-1",
    name: "Client Person",
    email: "client@example.com",
    message: "I want to discuss a junior fullstack role.",
    status: "new",
    createdAt: "2026-06-02T10:00:00.000Z"
  }
];

const apiHeaders = {
  "access-control-allow-credentials": "true",
  "access-control-allow-headers": "content-type, authorization",
  "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "access-control-allow-origin": "http://localhost:3178"
};

async function fulfillJson(route: Route, body: unknown, status = 200, headers: Record<string, string> = {}) {
  if (route.request().method() === "OPTIONS") {
    await route.fulfill({ headers: apiHeaders, status: 204 });
    return;
  }

  await route.fulfill({
    body: JSON.stringify(body),
    contentType: "application/json",
    headers: { ...apiHeaders, ...headers },
    status
  });
}

test("portfolio user flow opens projects and validates contact form", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Oleksandra").first()).toBeVisible();
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator("#projects")).toBeInViewport();
  await expect(page.locator("#projects article").first()).toBeVisible();

  await page.locator('#projects button[aria-label^="Open"]').first().click();
  const closeModalButton = page.getByRole("button", { name: "Close project details" });
  await expect(closeModalButton).toBeVisible();
  await closeModalButton.evaluate((button) => (button as HTMLButtonElement).click());
  await expect(closeModalButton).toBeHidden();

  await page.goto("/#contact");
  const nameInput = page.locator("#contact input[required]").first();
  await nameInput.fill("O");
  await page.locator('#contact input[type="email"]').fill("client@example.com");
  await page.locator("#contact textarea").fill("short");
  await page.locator('#contact button[type="submit"]').click();

  const isNameValid = await nameInput.evaluate((input) => (input as HTMLInputElement).checkValidity());
  expect(isNameValid).toBe(false);
});

test("admin mocked flow signs in, loads CMS data and reorders projects", async ({ page }) => {
  let currentProjects = [...mockProjects];

  await page.route("**/api/auth/refresh", (route) =>
    fulfillJson(route, { message: "Refresh token is missing." }, 401)
  );

  await page.route("**/api/auth/login", async (route) => {
    await fulfillJson(
      route,
      {
        token: "test-access-token",
        admin: { email: "admin@example.com", role: "admin" }
      },
      200,
      { "set-cookie": "portfolio_refresh=test-refresh; HttpOnly; Path=/api/auth; SameSite=Lax" }
    );
  });

  await page.route("**/api/projects/admin/all", (route) => fulfillJson(route, currentProjects));

  await page.route("**/api/messages", (route) => fulfillJson(route, mockMessages));

  await page.route("**/api/projects/admin/reorder", async (route) => {
    const body = route.request().postDataJSON() as { projectIds: string[] };
    currentProjects = body.projectIds
      .map((id) => currentProjects.find((project) => project._id === id))
      .filter(Boolean) as typeof mockProjects;
    await fulfillJson(route, currentProjects);
  });

  await page.goto("/admin");
  const signInButton = page.getByRole("button", { name: "Sign In" });
  await expect(signInButton).toBeEnabled();
  await page.getByPlaceholder("admin@example.com").fill("admin@example.com");
  await page.getByPlaceholder("********").fill("strong-password");
  await signInButton.click();

  await expect(page.getByText("Portfolio CMS")).toBeVisible();
  await expect(page.getByText("DreamTune")).toBeVisible();
  await expect(page.getByText("Menu Portal")).toBeVisible();

  await page
    .locator("article")
    .filter({ hasText: "Menu Portal" })
    .getByRole("button", { name: "Up" })
    .click();
  await expect(page.getByText("Project order updated.")).toBeVisible();

  await page.getByRole("button", { name: "Messages" }).click();
  await expect(page.getByText("client@example.com")).toBeVisible();
});
