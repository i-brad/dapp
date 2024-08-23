// models/Pool.ts
import mongoose, { Schema } from "mongoose";

const LockSchema = new Schema(
  {
    token_address: {
      type: String,
      required: true,
      unique: true,
    },
    lock_address: {
      type: String,
      required: true,
      unique: true,
    },
    owner_address: {
      type: String,
      required: true,
    },
    lock_amount: {
      type: Number,
      required: true,
    },
    lock_date: {
      type: Date,
      required: true,
    },
    lock_name: {
      type: String,
      required: true,
    },
    project_title: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    telegram: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    github: {
      type: String,
      default: null,
    },
    discord: {
      type: String,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
    logo_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.models.Lock || mongoose.model("Lock", LockSchema);
