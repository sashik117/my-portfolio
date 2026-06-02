import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { after, afterEach, before, beforeEach, describe, it } from "node:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64"
);

let app;
let mongo;
let Project;
let Message;
let seedAdmin;
let toUploadPath;
let uploadRoot;

async function loginAsAdmin() {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@example.com",
      password: "strong-password"
    })
    .expect(200);

  return response.body.token;
}

async function clearUploads() {
  await fs.mkdir(uploadRoot, { recursive: true });
  const entries = await fs.readdir(uploadRoot);
  await Promise.all(
    entries
      .filter((entry) => entry !== ".gitkeep")
      .map((entry) => fs.rm(path.join(uploadRoot, entry), { force: true, recursive: true }))
  );
}

describe("portfolio API", () => {
  before(async () => {
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = "test-secret-that-is-long-enough";
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "strong-password";
    process.env.CLIENT_URLS = "http://localhost:3178";

    mongo = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongo.getUri();

    const modules = await Promise.all([
      import("../src/app.js"),
      import("../src/config/db.js"),
      import("../src/utils/seedAdmin.js"),
      import("../src/models/Project.js"),
      import("../src/models/Message.js"),
      import("../src/utils/uploadFiles.js")
    ]);

    app = modules[0].default;
    await modules[1].connectDatabase();
    seedAdmin = modules[2].seedAdmin;
    Project = modules[3].default;
    Message = modules[4].default;
    toUploadPath = modules[5].toUploadPath;
    uploadRoot = modules[5].uploadRoot;
    await seedAdmin();
  });

  beforeEach(async () => {
    await Project.deleteMany({});
    await Message.deleteMany({});
    await clearUploads();
  });

  afterEach(async () => {
    await clearUploads();
  });

  after(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  it("allows the configured local frontend origin and blocks unknown origins", async () => {
    await request(app)
      .get("/api/health")
      .set("Origin", "http://localhost:3178")
      .expect("access-control-allow-origin", "http://localhost:3178")
      .expect(200);

    const blocked = await request(app)
      .get("/api/health")
      .set("Origin", "http://evil.example")
      .expect(403);

    assert.match(blocked.body.message, /CORS blocked origin/);
  });

  it("creates, updates and deletes projects while cleaning replaced upload files", async () => {
    const token = await loginAsAdmin();

    await request(app)
      .post("/api/projects")
      .field("title", "No Token")
      .expect(401);

    const created = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Dream Build")
      .field("description", "A polished project card for the CMS.")
      .field("longDescription", "A longer project description for the modal.")
      .field("technologies", "React, Node.js, MongoDB")
      .field("category", "Fullstack App")
      .field("featured", "true")
      .field("status", "published")
      .attach("image", onePixelPng, {
        filename: "preview.png",
        contentType: "image/png"
      })
      .expect(201);

    assert.equal(created.body.slug, "dream-build");
    assert.equal(created.body.featured, true);
    assert.ok(created.body.imageUrl.startsWith("/uploads/"));

    const firstImagePath = toUploadPath(created.body.imageUrl);
    assert.ok(firstImagePath);
    await fs.access(firstImagePath);

    const updated = await request(app)
      .patch(`/api/projects/${created.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Dream Build Updated")
      .field("description", "A polished project card for the CMS.")
      .field("longDescription", "A longer project description for the modal.")
      .field("technologies", "React, Express, PostgreSQL")
      .field("category", "Fullstack App")
      .field("featured", "false")
      .field("status", "published")
      .attach("image", onePixelPng, {
        filename: "preview-new.png",
        contentType: "image/png"
      })
      .expect(200);

    assert.equal(updated.body.slug, "dream-build-updated");
    assert.notEqual(updated.body.imageUrl, created.body.imageUrl);
    await assert.rejects(() => fs.access(firstImagePath), { code: "ENOENT" });

    const secondImagePath = toUploadPath(updated.body.imageUrl);
    assert.ok(secondImagePath);
    await fs.access(secondImagePath);

    await request(app)
      .delete(`/api/projects/${created.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    await assert.rejects(() => fs.access(secondImagePath), { code: "ENOENT" });
  });

  it("validates contact messages and lets admin manage inbox status", async () => {
    await request(app)
      .post("/api/messages")
      .send({ name: "O", email: "bad", message: "short" })
      .expect(400);

    await request(app)
      .post("/api/messages")
      .send({
        name: "Client Person",
        email: "client@example.com",
        message: "Hello, I want to talk about a possible project."
      })
      .expect(201);

    const token = await loginAsAdmin();
    const inbox = await request(app)
      .get("/api/messages")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    assert.equal(inbox.body.length, 1);
    assert.equal(inbox.body[0].status, "new");

    const read = await request(app)
      .patch(`/api/messages/${inbox.body[0]._id}/read`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    assert.equal(read.body.status, "read");

    await request(app)
      .delete(`/api/messages/${inbox.body[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    assert.equal(await Message.countDocuments(), 0);
  });
});
