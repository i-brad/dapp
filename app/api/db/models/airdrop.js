// models/airdrop.ts
import mongoose, { Schema } from "mongoose";

const AirdropRecipientSchema = new Schema({
    Address: {
        type: String,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
});

const AirdropValueSchema = new Schema({
    value: {
        type: [String],
        required: true,
    },
    treeIndex: {
        type: Number,
        required: true,
    },
});

const AirdropTreeSchema = new Schema({
    format: {
        type: String,
        required: true,
    },
    tree: {
        type: [String],
        required: true,
    },
    values: {
        type: [AirdropValueSchema],
        required: true,
    },
    leafEncoding: {
        type: [String],
        required: true,
    },
});

const AirdropSchema = new Schema(
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
        token_total: {
            type: Number,
            required: true,
        },
        recipient_total: {
            type: Number,
            required: true,
        },
        airdrop_address: {
            type: String,
            required: true,
        },
        airdrop_name: {
            type: String,
            required: true,
        },
        airdrop_recipients: {
            type: [[String]],
            required: true,
        },
        merkle_root: {
            type: String,
            required: true,
        },
        tree: {
            type: AirdropTreeSchema,
            required: true,
        },
        start_date: {
            type: Date,
            required: false,
        },
        end_date: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export default mongoose.models.Airdrop || mongoose.model("Airdrop", AirdropSchema);
