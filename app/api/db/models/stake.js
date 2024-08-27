// models/stake.ts
import mongoose, { Schema } from "mongoose";

const StakeSchema = new Schema(
  {
    owner_address: {
      type: String,
    },
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
    stake_name: {
      type: String,
      required: true,
    },
    stake_address: {
      type: String,
      required: true,
      unique: true,
    },
    stake_description: {
      type: String,
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
    stake_rate: {
      type: Number,
      required: true,
    },
    staking_periods: {
      type: [Number],
      required: true,
    },
    edu_apy: {
      type: Number,
      required: true,
    },
    token_apy: {
      type: Number,
      required: true,
    },
    hard_cap: {
      type: Number,
      required: true,
    },
    minimum_stake_limit: {
      type: Number,
      required: true,
    },
    reward_deposit_token: {
      type: Number,
      required: true,
    },
    reward_deposit_edu: {
      type: Number,
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

export default mongoose.models.Stake || mongoose.model("Stake", StakeSchema);
