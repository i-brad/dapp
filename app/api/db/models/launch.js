// models/Pool.ts
import mongoose, { Schema } from "mongoose";

const TokenomicSchema = new Schema({
  presale: {
    type: Number,
    required: true,
  },
  locked: {
    type: Number,
    required: true,
  },
  liquidity: {
    type: Number,
    required: true,
  },
  burnt: {
    type: Number,
    required: true,
  },
  staking_rewards: {
    type: Number,
    required: true,
  },
  unlocked: {
    type: Number,
    required: true,
  },
});

const FairLaunchSchema = new Schema(
  {
    token_address: {
      type: String,
      required: true,
    },
    token_name: {
      type: String,
      required: true,
    },
    token_symbol: {
      type: String,
      required: true,
    },
    token_supply: {
      type: String,
      required: true,
    },
    soft_cap: {
      type: Number,
      required: true,
    },
    hard_cap: {
      type: Number,
      required: true,
    },
    presale_amount: {
      type: Number,
      required: true,
    },
    presale_rate: {
      type: Number,
      required: true,
    },
    listing_rate: {
      type: Number,
      required: true,
    },
    minimum_user_allocation: {
      type: Number,
      required: true,
    },
    maximum_user_allocation: {
      type: Number,
      required: true,
    },
    raised_edu_percentage: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    liquidity_lock_period: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    tokenomics: {
      type: TokenomicSchema, // Referencing the TokenomicSchema here
      required: true,
    },
    launch_address: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner_address: {
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
    payment_tier: {
      type: String,
      enum: ["simple", "standard", "premium", "diamond"],
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

export default mongoose.models.FairLaunch ||
  mongoose.model("FairLaunch", FairLaunchSchema);
