import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    longDescription: {
      type: String,
      default: ""
    },
    technologies: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      default: ""
    },
    liveUrl: {
      type: String,
      default: ""
    },
    imageUrl: {
      type: String,
      default: ""
    },
    imageStorageProvider: {
      type: String,
      enum: ["local", "cloudinary"],
      default: "local"
    },
    imageStorageKey: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: "Fullstack"
    },
    featured: {
      type: Boolean,
      default: false
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
