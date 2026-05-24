import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { seedAdmin } from "./utils/seedAdmin.js";

const port = Number(process.env.PORT || 5050);

async function bootstrap() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 24) {
    throw new Error("JWT_SECRET must be at least 24 characters long.");
  }

  await connectDatabase();
  await seedAdmin();

  app.listen(port, () => {
    console.log(`Portfolio API running on http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
