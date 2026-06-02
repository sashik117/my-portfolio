import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true
    },
    tokenFamily: {
      type: String,
      required: true
    },
    replacedByTokenHash: {
      type: String,
      default: ""
    },
    revokedAt: {
      type: Date,
      default: null
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }
    },
    ipAddress: {
      type: String,
      default: ""
    },
    userAgent: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("RefreshToken", refreshTokenSchema);
