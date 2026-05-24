import slugify from "slugify";
import mongoose from "mongoose";
import { z } from "zod";
import Project from "../models/Project.js";

const projectSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(10).max(420),
  longDescription: z.string().max(1600).optional().default(""),
  technologies: z.union([z.string(), z.array(z.string())]),
  githubUrl: z.string().url().or(z.literal("")).optional().default(""),
  liveUrl: z.string().url().or(z.literal("")).optional().default(""),
  category: z.string().max(80).optional().default("Fullstack"),
  featured: z.union([z.boolean(), z.string()]).optional().default(false),
  status: z.enum(["draft", "published"]).optional().default("published")
});

function normalizeProject(body, file) {
  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Invalid project data.";
    const error = new Error(firstError);
    error.statusCode = 400;
    throw error;
  }

  const data = parsed.data;
  const technologies = Array.isArray(data.technologies)
    ? data.technologies
    : data.technologies.split(",").map((tech) => tech.trim()).filter(Boolean);

  return {
    ...data,
    technologies,
    featured: data.featured === true || data.featured === "true",
    ...(file ? { imageUrl: `/uploads/${file.filename}` } : {})
  };
}

async function createUniqueSlug(title, existingId) {
  const base = slugify(title, { lower: true, strict: true }) || "project";
  let slug = base;
  let suffix = 2;

  while (await Project.findOne({ slug, ...(existingId ? { _id: { $ne: existingId } } : {}) })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function getPublishedProjects(_req, res) {
  const projects = await Project.find({ status: "published" }).sort({
    featured: -1,
    createdAt: -1
  });
  res.json(projects);
}

export async function getAllProjects(_req, res) {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
}

export async function getProject(req, res) {
  const identifier = req.params.id;
  const lookup = mongoose.isValidObjectId(identifier)
    ? { $or: [{ _id: identifier }, { slug: identifier }], status: "published" }
    : { slug: identifier, status: "published" };

  const project = await Project.findOne(lookup);

  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  res.json(project);
}

export async function createProject(req, res) {
  const data = normalizeProject(req.body, req.file);
  const slug = await createUniqueSlug(data.title);
  const project = await Project.create({ ...data, slug });
  res.status(201).json(project);
}

export async function updateProject(req, res) {
  const current = await Project.findById(req.params.id);

  if (!current) {
    return res.status(404).json({ message: "Project not found." });
  }

  const data = normalizeProject(req.body, req.file);
  const slug =
    data.title && data.title !== current.title
      ? await createUniqueSlug(data.title, current._id)
      : current.slug;

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { ...data, slug },
    { new: true, runValidators: true }
  );

  res.json(project);
}

export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  res.json({ message: "Project deleted." });
}
