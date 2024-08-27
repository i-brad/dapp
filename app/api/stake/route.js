import { NextResponse } from "next/server";
import connectToDatabase from "../db";
import Stake from "../db/models/stake";

export async function GET(request) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const _id = searchParams.get("id");

    if (_id) {
      // Retrieve stake from the database by ID
      const stake = await Stake.findById(_id);
      if (!stake) {
        return NextResponse.json(
          { message: "Stake not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ stake }, { status: 200 });
    }

    // Retrieve stakes from the database
    const stakes = await Stake.find();

    return NextResponse.json({ stakes }, { status: 200 });
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

    //props
    const {
      token_address,
      owner_address,
      token_name,
      stake_address,
      token_symbol,
      token_supply,
      stake_name,
      stake_description,
      start_date,
      end_date,
      stake_rate,
      staking_periods,
      edu_apy,
      token_apy,
      hard_cap,
      minimum_stake_limit,
      reward_deposit_token,
      reward_deposit_edu,
    } = await request.json();

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
      !reward_deposit_edu
    ) {
      return NextResponse.json(
        { message: "Invalid request data" },
        {
          status: 400,
        }
      );
    }

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
      staking_periods,
      edu_apy,
      token_apy,
      hard_cap,
      minimum_stake_limit,
      token_supply,
      reward_deposit_token,
      reward_deposit_edu,
    });

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
