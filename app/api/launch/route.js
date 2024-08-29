"use server";

import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import connectToDatabase from "../db";
import FairLaunch from "../db/models/launch";

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
      // Retrieve fairFairLaunch from the database by ID
      const launch = await FairLaunch.findById(_id).populate("tokenomics");
      if (!launch) {
        return NextResponse.json(
          { message: "Launch not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ launch }, { status: 200 });
    }

    // Retrieve locks from the database
    const launches = await FairLaunch.find().populate("tokenomics");

    return NextResponse.json({ launches }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const data = await request.formData();

    //props
    const token_address = data.get("token_address");
    const token_name = data.get("token_name");
    const token_symbol = data.get("token_symbol");
    const token_supply = data.get("token_supply");
    const launch_address = data.get("launch_address");
    const owner_address = data.get("owner_address");
    const soft_cap = data.get("soft_cap");
    const hard_cap = data.get("hard_cap");
    const presale_amount = Number(data.get("presale_amount") || 0);
    const listing_rate = Number(data.get("listing_rate") || 0);
    const presale_rate = Number(data.get("presale_rate") || 0);
    const maximum_user_allocation = Number(
      data.get("maximum_user_allocation") || 0
    );
    const minimum_user_allocation = Number(
      data.get("minimum_user_allocation") || 0
    );
    const raised_edu_percentage = Number(
      data.get("raised_edu_percentage") || 0
    );
    const start_date = data.get("start_date");
    const end_date = data.get("end_date");
    const country = data.get("country");
    const liquidity_lock_period = Number(
      data.get("liquidity_lock_period") || 0
    );

    //tokenomics
    const presale = Number(data.get("tokenomics[presale]") || 0);
    const locked = Number(data.get("tokenomics[locked]") || 0);
    const unlocked = Number(data.get("tokenomics[unlocked]") || 0);
    const liquidity = Number(data.get("tokenomics[liquidity]") || 0);
    const burnt = Number(data.get("tokenomics[burnt]") || 0);
    const staking_rewards = Number(
      data.get("tokenomics[staking_rewards]") || 0
    );
    const tokenomics = {
      presale,
      locked,
      unlocked,
      liquidity,
      burnt,
      staking_rewards,
    };

    const name = data.get("name");
    const description = data.get("description");
    const website = data.get("website");
    const telegram = data.get("telegram");
    const twitter = data.get("twitter");
    const github = data.get("github");
    const discord = data.get("discord");
    const youtube = data.get("youtube");
    const logo = data.get("logo");
    const payment_tier = data.get("payment_tier");

    if (!logo) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const arrayBuffer = await logo.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Upload the image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer, // Base64 string or file path
      fileName: `${token_name}_logo${new Date().toISOString()}`,
    });

    const logo_url = uploadResponse.url;

    // Save the fairFairLaunch data to MongoDB
    const newLaunch = new FairLaunch({
      token_name,
      token_symbol,
      token_supply,
      soft_cap,
      hard_cap,
      token_address,
      launch_address,
      owner_address,
      name,
      description,
      website,
      telegram,
      twitter,
      github,
      discord,
      youtube,
      logo_url,
      payment_tier,
      presale_amount,
      presale_rate,
      listing_rate,
      minimum_user_allocation,
      maximum_user_allocation,
      raised_edu_percentage,
      start_date,
      end_date,
      country,
      liquidity_lock_period,
      tokenomics,
    });

    await newLaunch.save();

    return NextResponse.json(
      {
        message: "Launch created successfully",
        launch: newLaunch,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      // MongoDB duplicate key error code
      return NextResponse.json(
        { message: "Launch name or address already exists" },
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
