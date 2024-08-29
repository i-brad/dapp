"use server";

import { NextResponse } from "next/server";
import connectToDatabase from "../db";
import Airdrop from "../db/models/airdrop";
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

export async function GET(request) {
    try {
        await connectToDatabase();

        const searchParams = request.nextUrl.searchParams;
        const _id = searchParams.get("id");

        if (_id) {
            const airdrop = await Airdrop.findById(_id);
            if (!airdrop) {
                return NextResponse.json({ message: "Airdrop not found" }, { status: 404 });
            }

            return NextResponse.json({ airdrop }, { status: 200 });
        }

        const airdrops = await Airdrop.find();

        return NextResponse.json({ airdrops }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();

        const {
            owner_address,
            token_address,
            token_name,
            token_symbol,
            airdrop_address,
            token_total,
            recipient_total,
            airdrop_name,
            airdrop_recipients,
        } = await request.json();

        if (
            !owner_address ||
            !token_address ||
            !airdrop_address ||
            !token_name ||
            !token_symbol ||
            !token_total ||
            !recipient_total ||
            !airdrop_name ||
            !airdrop_recipients
        ) {
            return NextResponse.json(
                { message: "Invalid request data" },
                {
                    status: 400,
                }
            );
        }

        const tree = StandardMerkleTree.of(airdrop_recipients, ["address", "uint256"]);
        const merkle_root = tree.root;

        // return NextResponse.json({ tree: tree.dump().leafEncoding }, { status: 200 });

        const newAirdrop = new Airdrop({
            owner_address,
            token_address,
            token_name,
            token_symbol,
            token_total,
            airdrop_address,
            recipient_total,
            airdrop_name,
            airdrop_recipients,
            merkle_root,
            tree: tree.dump(),
        });

        await newAirdrop.save();

        return NextResponse.json(
            {
                message: "Airdrop created successfully",
                airdrop: token_total,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error?.code === 11000) {
            // MongoDB duplicate key error code
            return NextResponse.json(
                { message: "Duplicate error, airdrop already exists" },
                { status: 409 }
            );
        }
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            {
                status: 500,
            }
        );
    }
}
