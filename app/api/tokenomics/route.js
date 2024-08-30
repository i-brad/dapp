import { NextResponse } from "next/server";
import connectToDatabase from "../db";
import Lock from "../db/models/lock";
import Stake from "../db/models/stake";

export async function GET(request) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const token_address = searchParams.get("address");

    if (!token_address) {
      return NextResponse.json({ message: "Invalid request" }, { status: 404 });
    }

    // Sum the lock_amount for the matching token_address
    const result = await Lock.aggregate([
      { $match: { token_address } },
      { $group: { _id: null, totalLockAmount: { $sum: "$lock_amount" } } },
    ]);

    const totalLockAmount = result.length > 0 ? result[0].totalLockAmount : 0;

    // Find all matching documents and extract stack_address
    const stakes = await Stake.find({ token_address }, "stake_address").exec();

    // Extract stack_address values into an array
    const stakeAddresses = stakes.map((stake) => stake.stake_address);

    return NextResponse.json(
      { totalLockAmount, stakeAddresses },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
