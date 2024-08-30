"use client";
import TokenChart from "@/app/components/Charts/TokenChart";
import { TelegramIcon, TwitterIcon2 } from "@/app/components/IconComponent";
import useCountdown from "@/app/hooks/useCountdown";
import { StakeAbi } from "@/app/providers/abis/stake";
import { TokenAbi } from "@/app/providers/abis/token";
import { StakeFactory } from "@/app/providers/address";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { Progress, useToast } from "@chakra-ui/react";
import { ethers, formatUnits } from "ethers";
import { ArrowLeft, Copy, Global } from "iconsax-react";
import { set } from "mongoose";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Loading from "./loading";
import { timeAgo, getFormattedDate } from "@/app/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const response = await fetch(
    `https://www.thrustpad.finance/api/stake?id=${slug}`
  );
  if (response.ok) {
    const data = await response.json();
    return {
      title: data?.stake?.stake_name,
      description: data?.stake_description,
      images: [
        {
          url: data?.stake?.logo_url, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    };
  }
}

const SingleStake = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [stake, setStake] = useState(null);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakingPeriod, setStakingPeriod] = useState(0);
  const [staking, setStaking] = useState(false);
  const [totalStaked, setTotalStaked] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userStakes, setUserStakes] = useState([]);
  const [userRewards, setUserRewards] = useState([]);

  const { isConnected, address } = useAccount();

  const { data } = useBalance({
    address,
    token: stake?.token_address,
  });

  const balance = useMemo(() => {
    if (data) {
      return Number(formatUnits(data?.value, data?.decimals));
    }
    return 0;
  }, [data]);

  const status = useMemo(() => {
    const now = Date.now();
    const start_date = new Date(stake?.start_date);
    const end_date = new Date(stake?.end_date);
    if (start_date.getTime() <= now) {
      return "In Progress";
    }

    if (now > end_date.getTime()) {
      return "Ended";
    }
    return "Upcoming";
  }, [stake]);

  const copyHandler = (value) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Address Copied.", status: "success", duration: 1000 });
  };

  const { days, hours, minutes, seconds } = useCountdown(stake?.end_date);

  const now = new Date().getTime();

  useEffect(() => {
    const getStake = async () => {
      try {
        const response = await fetch(`/api/stake?id=${slug}`);
        if (response.ok) {
          const data = await response.json();
          setStake(data?.stake);
        }
      } catch (error) {
        console.error("failed to fetch stake", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      getStake();
    }
  }, [slug]);

  useEffect(() => {
    if (stake) {
      const getTotalStaked = async () => {
        const signer = await getEthersSigner(config);
        const staker = new ethers.Contract(
          stake?.stake_address,
          StakeAbi,
          signer
        );

        staker
          .totalStaked()
          .then((response) => {
            setTotalStaked(Number(formatUnits(response)));
            setProgress(
              ((Number(formatUnits(response)) / stake?.hard_cap) * 100).toFixed(
                2
              )
            );
          })
          .catch((error) => {
            console.log("Failed to get total staked", error);
            console.log("Msg:", error.msg);
          });
      };

      const getUserStakes = async () => {
        const signer = await getEthersSigner(config);
        const staker = new ethers.Contract(
          stake?.stake_address,
          StakeAbi,
          signer
        );
        const userStakes = await staker.getStakes(address);

        setUserStakes(userStakes);
      };

      const getUserRewards = async () => {
        const signer = await getEthersSigner(config);
        const staker = new ethers.Contract(
          stake?.stake_address,
          StakeAbi,
          signer
        );
        const userRewards = await staker.getClaimableRewards(address);

        setUserRewards(userRewards);
        console.log("User rewards", userRewards);
      };

      getTotalStaked();
      getUserStakes();
      getUserRewards();
    }
  }, [stake, address]);

  if (slug && loading) {
    return <Loading />;
  }

  if (!loading && !stake) {
    notFound();
  }

  const claimRewards = async (index) => {
    try {
      const signer = await getEthersSigner(config);
      const staker = new ethers.Contract(
        stake?.stake_address,
        StakeAbi,
        signer
      );

      const response = await staker.claimAvailableRewards(index);

      setUserRewards((prev) => {
        const rewards = [...prev];
        rewards[index] = [0, 0];
        return rewards;
      });

      setUserStakes((prev) => {
        console.log("Update cliamable rewards", prev);
        const userStakes = [...prev];
        userStakes[index][6] += userRewards?.[index][0];
        userStakes[index][7] += userRewards?.[index][1];

        return userStakes;
      });

      if (response) {
        toast({
          title: "Rewards claimed!",
          description: `Transaction Hash ${response?.hash}`,
          status: "success",
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("Failed to claim rewards", error);
      toast({
        title: "Failed to claim rewards",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  };

  const unstake = async (index) => {
    try {
      const signer = await getEthersSigner(config);
      const staker = new ethers.Contract(
        stake?.stake_address,
        StakeAbi,
        signer
      );

      const response = await staker.unstake(index);

      if (response) {
        toast({
          title: "Unstake successful!",
          description: `Transaction Hash ${response?.hash}`,
          status: "success",
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("Failed to unstake", error);
      toast({
        title: "Failed to unstake",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  };

  const directStake = async () => {
    try {
      setStaking(true);
      const signer = await getEthersSigner(config);

      const staker = new ethers.Contract(
        stake?.stake_address,
        StakeAbi,
        signer
      );
      const token = new ethers.Contract(stake?.token_address, TokenAbi, signer);
      const allowance = await token.allowance(address, stake?.stake_address);
      const stakingAmtEthers = ethers.parseEther(stakingAmount.toString());

      console.log("Allowance", allowance, stakingAmtEthers);
      if (allowance < stakingAmtEthers) {
        const tokenApproval = await token.approve(
          stake?.stake_address,
          stakingAmtEthers
        );

        await tokenApproval.wait();
      }

      const response = await staker.directStake(
        stakingAmtEthers,
        Number(stakingPeriod)
      );

      if (response) {
        toast({
          title: "Stake Successful!",
          description: `Transaction Hash ${response?.hash}`,
          status: "success",
          duration: 1000,
        });
        setStakingAmount(0);
        setStakingPeriod(0);
      }
    } catch (error) {
      console.error("Failed staking", error);
      toast({
        title: "Failed to stake",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    } finally {
      setStaking(false);
    }
  };

  return (
    <>
      <div className="text-white">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft /> Back
          </button>
        </div>
        <div className="flex flex-wrap gap-8 py-12 lg:flex-nowrap">
          <div className="w-full space-y-8 md:w-full lg:w-7/12">
            <div className="bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5 relative">
              {status === "In Progress" || status === "Ended" ? (
                <div className="bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 absolute right-2 top-2">
                  <span className="h-1 w-1 rounded-full bg-[#00FFA3] block"></span>
                  {status}
                </div>
              ) : (
                <div className="bg-[#353432] text-[#F9C33F] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 absolute right-5 top-5">
                  <span className="h-1 w-1 rounded-full bg-[#F9C33F] bstake"></span>
                  {status}
                </div>
              )}

              <div className="flex flex-row items-center gap-4">
                <div className="relative">
                  <div className="w-36">
                    <div className="w-full flex h-36 min-h-[100px] relative overflow-hidden featured__card_img bstake object-contain rounded-full">
                      <Image
                        src={stake?.logo_url}
                        alt={"fall-back"}
                        fill
                        className="rounded-t-[16px] w-full h-full object-cover object-center"
                        priority
                      />
                    </div>

                    <div className="absolute bottom-0 object-contain w-5 h-5 overflow-hidden rounded-full bstake right-6">
                      <Image
                        src={"/images/opencampus-edu.png"}
                        alt={"fall-back"}
                        fill
                        className="object-cover object-center w-full h-full"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 font-medium">
                  <span className="text-lg text-white capitalize">
                    {stake?.stake_name}
                  </span>
                  <div className="text-[#A19B99] text-base flex items-center gap-2">
                    <a
                      href={stake?.website}
                      className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                    >
                      <Global size={22} />
                    </a>
                    <a
                      href={stake?.telegram}
                      className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                    >
                      <TelegramIcon />
                    </a>
                    <a
                      href={stake?.twitter}
                      className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                    >
                      <TwitterIcon2 width={22} height={22} />
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm capitalize ">
                  {stake?.stake_description}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  Overview
                </h3>

                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="flex flex-wrap items-center justify-between w-full p-2">
                    <h3 className="font-medium text-[#898582] text-sm">
                      Staking address
                    </h3>
                    <div>
                      <button
                        type="button"
                        onClick={() => copyHandler(stake?.stake_address)}
                        className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap"
                      >
                        {stake?.stake_address}
                        <span className="text-[#898582]">
                          <Copy size={14} />
                        </span>
                      </button>
                      <p className="text-[10px] text-[#FF8789] text-right">
                        Do not send {stake?.token_name} to this pool address
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className="font-medium text-[#898582] text-sm">
                      Staking Token name
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {stake?.token_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Staking Token symbol
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {stake?.token_symbol}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  Stake Details
                </h3>

                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Minimum stake
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {stake?.minimum_stake_limit} {stake?.token_symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Hard cap
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {stake?.hard_cap} {stake?.token_symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Start date
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {new Date(stake?.start_date)?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      End date
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {new Date(stake?.end_date)?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Minimum unstake time
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {stake?.staking_periods?.[0] || "30"} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Reward EDU APY
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {stake?.edu_apy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Reward Token APY
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {stake?.token_apy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-full lg:w-5/12">
            <div className="bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5">
              <div>
                <div className="w-full py-2 ">
                  <h3 className="text-base font-medium text-white">
                    Staking ends in
                  </h3>
                </div>
                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="flex justify-center flex-wrap gap-2.5 md:gap-4">
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {days}
                      </div>
                      <p className="text-xs text-GreyCloud md:text-sm">Day</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {hours}
                      </div>
                      <p className="text-xs text-GreyCloud md:text-sm">Hr</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {minutes}
                      </div>
                      <p className="text-xs text-GreyCloud md:text-sm">Min</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {seconds}
                      </div>
                      <p className="text-xs text-GreyCloud md:text-sm">Sec</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[#ADB4B9] font-medium text-xs flex-wrap gap-2">
                        <span>Progress {progress}%</span>
                      </div>

                      <div className="">
                        <Progress
                          colorScheme="orange"
                          size="sm"
                          value={progress}
                          className="text-[#EA6A32] rounded-lg bg-[#4B4A4A]"
                          isAnimated={true}
                        />
                        <div className="inline-flex items-center justify-between w-full text-[#ADB4B9] text-xs">
                          <span>
                            {totalStaked} {stake?.token_symbol}
                          </span>
                          <span>
                            {stake?.hard_cap} {stake?.token_symbol}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-3 text-base font-medium text-white">
                        Stake
                      </h3>
                      <div className="space-y-3">
                        <div className="relative flex flex-col w-full gap-1">
                          <div className="flex items-center justify-between mb-1">
                            <label
                              htmlFor="amount"
                              className="text-sm text-[#FFFCFB] font-medium"
                            >
                              Amount
                            </label>
                            <p className="text-[#898582] text-xs">
                              Available:{" "}
                              <span className="text-[#FFA178]">
                                {balance?.toFixed(3)} {stake?.token_symbol}
                              </span>
                            </p>
                          </div>

                          <div className="relative w-full h-12 ">
                            <input
                              type="number"
                              id="amount"
                              min={1}
                              value={stakingAmount}
                              onChange={(event) => {
                                const value = event.target.value;
                                setStakingAmount(value);
                              }}
                              className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-4 pr-12 h-full text-white"
                              name="amount"
                              autoComplete="off"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                              <button className="text-[#FFA178] px-3 font-medium">
                                Max
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-sm text-[#FFFCFB] font-medium">
                              Staking period
                            </label>
                          </div>

                          <div className="grid w-full grid-cols-2 gap-2">
                            {stake?.staking_periods?.map((period, index) => (
                              <label
                                key={period}
                                htmlFor={`period_${period}`}
                                className="mr-4 border border-[#464849] px-3 py-[10px] rounded-xl cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id={`period_${period}`}
                                  className="mr-2 cursor-pointer"
                                  value={index}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    const checked = event.target.checked;
                                    if (checked) setStakingPeriod(value);
                                  }}
                                  defaultChecked={period === 45}
                                  name="period"
                                  required
                                  autoComplete="off"
                                />
                                {period} days
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <button
                        disabled={!isConnected || staking}
                        onClick={directStake}
                        className="bg-[#DA5921] hover:bg-[#DA5921] w-full whitespace-nowrap 
                                                disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl 
                                                transition-all duration-75 border-none px-5 
                                                font-medium p-3 text-base text-white bstake text-center "
                      >
                        {staking ? "Staking..." : "Stake"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {userStakes.length > 0 && (
                  <div className="w-full py-2 ">
                    <h3 className="text-base font-medium text-white">
                      Contributions
                    </h3>
                  </div>
                )}
                {userStakes.map((stake, index) => (
                  <div
                    key={index}
                    className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full"
                  >
                    <table class="table-auto text-lefts text-sm">
                      <tbody>
                        <tr>
                          <td>Amount</td>
                          <td>
                            {Number(ethers.formatUnits(stake[0])).toFixed(1)}{" "}
                            {stake?.token_symbol}
                          </td>
                        </tr>
                        <tr>
                          <td>Start Date</td>
                          <td>{timeAgo(Number(stake[1]) * 1000)}</td>
                        </tr>
                        <tr>
                          <td>Maturity</td>
                          <td>
                            {getFormattedDate(
                              new Date(Number(stake[2]) * 1000)
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Claimed EDU</td>
                          <td>
                            {Number(ethers.formatUnits(stake[6])).toFixed(4)}
                          </td>
                        </tr>
                        <tr>
                          <td>Claimed {stake?.token_symbol}</td>
                          <td>
                            {Number(ethers.formatUnits(stake[7])).toFixed(4)}
                          </td>
                        </tr>
                        <tr>
                          <td>Claimable EDU</td>
                          <td>
                            {userRewards?.[index]
                              ? Number(
                                  ethers.formatUnits(userRewards?.[index][0])
                                ).toFixed(5)
                              : 0}
                          </td>
                        </tr>
                        <tr>
                          <td>Claimable {stake?.token_symbol}</td>
                          <td>
                            {" "}
                            {userRewards?.[index]
                              ? Number(
                                  ethers.formatUnits(userRewards?.[index][1])
                                ).toFixed(5)
                              : 0}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              onClick={() => {
                                if (
                                  userRewards?.[index]?.[0] > BigInt(0) &&
                                  userRewards?.[index]?.[1] > BigInt(0)
                                ) {
                                  claimRewards(index);
                                }
                              }}
                              disabled={
                                userRewards?.[index]?.[0] <= BigInt(0) ||
                                userRewards?.[index]?.[1] <= BigInt(0)
                              }
                              className="mt-2 bg-[#DA5921] hover:bg-[#DA5921] w-full whitespace-nowrap 
                                                disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl 
                                                transition-all duration-75 border-none px-5 
                                                text-sm p-1 text-base text-white bstake text-center"
                            >
                              Claim rewards
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                if (now > Number(stake[2]) * 1000) {
                                  unstake(index);
                                }
                              }}
                              disabled={now < Number(stake[2]) * 1000}
                              className="mt-2 bg-[#DA5921] hover:bg-[#DA5921] w-full whitespace-nowrap 
                                                disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl 
                                                transition-all duration-75 border-none px-5 
                                                text-sm p-1 text-base text-white bstake text-center "
                            >
                              Unstake
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStake;
