const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const checks = [];

function fail(message) {
  checks.push({ ok: false, message });
}

function pass(message) {
  checks.push({ ok: true, message });
}

function assertFile(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(`${relativePath} is missing.`);
    return "";
  }

  pass(`${relativePath} exists.`);
  return filePath;
}

function readPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  const signature = buffer.subarray(0, 8).toString("hex");

  if (signature !== "89504e470d0a1a0a") {
    throw new Error(`${path.basename(filePath)} is not a PNG file.`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function assertPng(relativePath, expectedWidth, expectedHeight) {
  const filePath = assertFile(relativePath);
  if (!filePath) return;

  try {
    const dimensions = readPngDimensions(filePath);

    if (dimensions.width !== expectedWidth || dimensions.height !== expectedHeight) {
      fail(
        `${relativePath} is ${dimensions.width}x${dimensions.height}, expected ${expectedWidth}x${expectedHeight}.`
      );
      return;
    }

    pass(`${relativePath} is ${expectedWidth}x${expectedHeight}.`);
  } catch (error) {
    fail(error instanceof Error ? error.message : `${relativePath} could not be checked.`);
  }
}

assertPng("public/og-image.png", 1200, 630);
assertPng("public/apple-touch-icon.png", 180, 180);
assertFile("public/favicon.svg");
assertFile("public/.well-known/security.txt");
assertFile("src/app/robots.ts");
assertFile("src/app/sitemap.ts");
assertFile("src/app/manifest.ts");

const layoutPath = assertFile("src/app/layout.tsx");
if (layoutPath) {
  const layout = fs.readFileSync(layoutPath, "utf8");
  ["metadataBase", "openGraph", "twitter", "icons", "robots"].forEach((token) => {
    if (layout.includes(token)) {
      pass(`layout metadata includes ${token}.`);
    } else {
      fail(`layout metadata is missing ${token}.`);
    }
  });
}

for (const check of checks) {
  console.log(`${check.ok ? "ok" : "fail"} - ${check.message}`);
}

if (checks.some((check) => !check.ok)) {
  process.exit(1);
}
