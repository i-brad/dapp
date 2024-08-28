import { NextResponse } from "next/server";
import connectToDatabase from "../db";
import Stake from "../db/models/stake";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function GET(request) {
    try {
        await connectToDatabase();

        const searchParams = request.nextUrl.searchParams;
        const _id = searchParams.get("id");

        if (_id) {
            // Retrieve stake from the database by ID
            const stake = await Stake.findById(_id);
            if (!stake) {
                return NextResponse.json({ message: "Stake not found" }, { status: 404 });
            }

            return NextResponse.json({ stake }, { status: 200 });
        }

        // Retrieve stakes from the database
        const stakes = await Stake.find();

        return NextResponse.json({ stakes }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();

        const data = await request.formData();

        const logo = data.get("logo");

        if (!logo) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const token_address = data.get("token_address");
        const owner_address = data.get("owner_address");
        const token_name = data.get("token_name");
        const stake_address = data.get("stake_address");
        const token_symbol = data.get("token_symbol");
        const token_supply = data.get("token_supply");
        const stake_name = data.get("stake_name");
        const stake_description = data.get("stake_description");
        const start_date = data.get("start_date");
        const end_date = data.get("end_date");
        const stake_rate = data.get("stake_rate");
        const staking_periods = data.get("staking_periods");
        const edu_apy = data.get("edu_apy");
        const token_apy = data.get("token_apy");
        const hard_cap = data.get("hard_cap");
        const minimum_stake_limit = data.get("minimum_stake_limit");
        const reward_deposit_token = data.get("reward_deposit_token");
        const reward_deposit_edu = data.get("reward_deposit_edu");
        const website = data.get("website");
        const telegram = data.get("telegram");
        const twitter = data.get("twitter");
        const github = data.get("github");
        const discord = data.get("discord");
        const youtube = data.get("youtube");

        // Convert the file to a buffer
        const arrayBuffer = await logo.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        // Upload the image to ImageKit
        const uploadResponse = await imagekit.upload({
            file: fileBuffer, // Base64 string or file path
            fileName: `${stake_name}_logo_${new Date().toISOString()}`,
        });

        const logo_url = uploadResponse.url;

        if (
            !stake_name ||
            !stake_address ||
            !token_name ||
            !token_symbol ||
            !start_date ||
            !end_date ||
            !staking_periods ||
            !stake_rate ||
            !token_apy ||
            !edu_apy ||
            !stake_description ||
            !token_address ||
            !hard_cap ||
            !minimum_stake_limit ||
            !token_supply ||
            !reward_deposit_token ||
            !reward_deposit_edu ||
            !logo ||
            !website ||
            !owner_address
        ) {
            return NextResponse.json(
                { message: "Invalid request data" },
                {
                    status: 400,
                }
            );
        }

        //@dev: Todo
        //We don't care if they create
        //multiple stakes with the same name or address

        // Check if the stake name or address already exists
        const existingStake = await Stake.findOne({
            $or: [{ stake_name }, { token_address }],
        });

        if (existingStake) {
            return NextResponse.json(
                { message: "Stake name or address already exists" },
                { status: 409 }
            );
        }

        // Save the stake data to MongoDB
        const newStake = new Stake({
            token_address,
            owner_address,
            token_name,
            token_symbol,
            stake_name,
            stake_address,
            stake_description,
            start_date,
            end_date,
            stake_rate,
            staking_periods: staking_periods.split(",").map((period) => Number(period)),
            edu_apy,
            token_apy,
            hard_cap,
            minimum_stake_limit,
            token_supply,
            reward_deposit_token,
            reward_deposit_edu,
            logo_url,
            website,
            telegram,
            twitter,
            github,
            discord,
            youtube,
        });

        console.log(newStake);

        await newStake.save();

        return NextResponse.json(
            {
                message: "Stake created successfully",
                stake: newStake,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error?.code === 11000) {
            // MongoDB duplicate key error code
            return NextResponse.json(
                { message: "Stake name or address already exists" },
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
