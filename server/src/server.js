import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { seedAdmin } from "./utils/seedAdmin.js";

async function bootstrap() {
  if (!env.jwtSecret || env.jwtSecret.length < 24) {
    throw new Error("JWT_SECRET must be at least 24 characters long.");
  }

  await connectDatabase();
  await seedAdmin();

  app.listen(env.port, () => {
    console.log(`Portfolio API running on http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
