"use server";

import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import connectToDatabase from "../db";
import Lock from "../db/models/lock";

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
      // Retrieve lock from the database by ID
      const lock = await Lock.findById(_id);
      if (!lock) {
        return NextResponse.json(
          { message: "Lock not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ lock }, { status: 200 });
    }

    // Retrieve locks from the database
    const locks = await Lock.find();

    return NextResponse.json({ locks }, { status: 200 });
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
    const lock_name = data.get("lock_name");
    const token_address = data.get("token_address");
    const lock_address = data.get("lock_address");
    const owner_address = data.get("owner_address");
    const date = new Date();
    const lock_date = new Date(data.get("lock_date") || date.now());
    const lock_amount = Number(data.get("lock_amount") || 0);
    const project_title = data.get("project_title");
    const project_description = data.get("project_description");
    const website = data.get("website");
    const telegram = data.get("telegram");
    const twitter = data.get("twitter");
    const github = data.get("github");
    const discord = data.get("discord");
    const youtube = data.get("youtube");
    const logo = data.get("logo");

    if (!logo) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    if (
      !lock_name ||
      !owner_address ||
      !lock_address ||
      !lock_date ||
      !website ||
      !lock_amount ||
      !project_title ||
      !project_description ||
      !token_address ||
      !logo
    ) {
      return NextResponse.json(
        { message: "Invalid request data" },
        {
          status: 400,
        }
      );
    }

    // Check if the lock name or address already exists
    const existingLock = await Lock.findOne({
      $or: [{ lock_name }, { token_address }],
    });

    if (existingLock) {
      return NextResponse.json(
        { message: "Lock name or address already exists" },
        { status: 409 }
      );
    }

    // Convert the file to a buffer
    const arrayBuffer = await logo.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Upload the image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer, // Base64 string or file path
      fileName: `${lock_name}_logo`,
    });

    const logo_url = uploadResponse.url;

    // Save the lock data to MongoDB
    const newLock = new Lock({
      lock_name,
      token_address,
      lock_address,
      owner_address,
      lock_date,
      lock_amount,
      project_title,
      project_description,
      website,
      telegram,
      twitter,
      github,
      discord,
      youtube,
      logo_url,
    });

    await newLock.save();

    return NextResponse.json(
      {
        message: "Lock created successfully",
        lock: newLock,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      // MongoDB duplicate key error code
      return NextResponse.json(
        { message: "Lock name or address already exists" },
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
