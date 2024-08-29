"use client";
import TokenChart from "@/app/components/Charts/TokenChart";
import { TelegramIcon, TwitterIcon2 } from "@/app/components/IconComponent";
import useCountdown from "@/app/hooks/useCountdown";
import { LaunchAbi } from "@/app/providers/abis/launch";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { Progress, useToast } from "@chakra-ui/react";
import { ethers, formatUnits } from "ethers";
import { ArrowLeft, Copy, Global } from "iconsax-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useBalance, useReadContract } from "wagmi";
import Loading from "./loading";

const SingleLaunchPad = () => {
  const collection = {
    presale: "0",
    liquidity: "0",
    unlocked: "0",
    locked: "0",
    burnt: "0",
    staking_rewards: "0",
  };
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [launch, setLaunch] = useState(null);
  const [progress, setProgress] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const { isConnected, address } = useAccount();

  //   const { data: myContributions } = useReadContract({
  //     abi: LaunchAbi,
  //     address: launch?.launch_address,
  //     function: "purchaseHistory",
  //     args: [address],
  //   });

  //   console.log({ myContributions });

  //buy amount
  const [amount, setAmount] = useState(0);
  const [buyingToken, setBuyingToken] = useState(false);

  const { data } = useBalance({
    address,
  });

  const balance = useMemo(() => {
    if (data) {
      return Number(formatUnits(data?.value, data?.decimals));
    }
    return 0;
  }, [data]);

  const copyHandler = (value) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Address Copied.", status: "success", duration: 1000 });
  };

  const { days, hours, minutes, seconds } = useCountdown(launch?.end_date);

  const now = new Date().getTime();

  useEffect(() => {
    const getLaunch = async () => {
      try {
        const response = await fetch(`/api/launch?id=${slug}`);
        if (response.ok) {
          const data = await response.json();
          setLaunch(data?.launch);
        }
      } catch (error) {
        console.error("failed to fetch launch", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      getLaunch();
    }
  }, [slug]);

  useEffect(() => {
    if (launch) {
      const getTotalSold = async () => {
        const signer = await getEthersSigner(config);
        const launchContract = new ethers.Contract(
          launch?.launch_address,
          LaunchAbi,
          signer
        );

        launchContract
          .totalSold()
          .then((response) => {
            setTotalSold(Number(formatUnits(response)));
            setProgress(
              (
                (Number(formatUnits(response)) / launch?.hard_cap) *
                100
              ).toFixed(2)
            );
          })
          .catch((error) => {
            console.log("Failed to get total sold", error);
            console.log("Msg:", error.msg);
          });
      };

      //   const getUserLaunch = async () => {
      //     const signer = await getEthersSigner(config);
      //     const launch = new ethers.Contract(
      //       launch?.launch_address,
      //       LaunchAbi,
      //       signer
      //     );
      //     const userLaunch = await launch.getLaunchs(address);

      //     setUserLaunch(userLaunchs);
      //   };

      //   const getUserRewards = async () => {
      //     const signer = await getEthersSigner(config);
      //     const launch = new ethers.Contract(
      //       launch?.launch_address,
      //       LaunchAbi,
      //       signer
      //     );
      //     const userRewards = await launch.getClaimableRewards(address);

      //     setUserRewards(userRewards);
      //     console.log("User rewards", userRewards);
      //   };

      getTotalSold();
      //   getUserLaunch();
      //   getUserRewards();
    }
  }, [launch]);

  const status = useMemo(() => {
    const now = Date.now();
    const start_date = new Date(launch?.start_date);
    const end_date = new Date(launch?.end_date);
    if (start_date.getTime() <= now) {
      return "In Progress";
    }

    if (now > end_date.getTime()) {
      return "Ended";
    }
    return "Upcoming";
  }, [launch]);

  if (slug && loading) {
    return <Loading />;
  }

  if (!loading && !launch) {
    notFound();
  }

  const buyToken = async () => {
    try {
      setBuyingToken(true);
      const signer = await getEthersSigner(config);

      const launchContract = new ethers.Contract(
        launch?.launch_address,
        LaunchAbi,
        signer
      );

      const response = await launchContract.buyToken({
        value: ethers.parseEther(amount.toString()),
      });

      if (response) {
        toast({
          title: "Purchase Successful!",
          description: `Transaction Hash ${response?.hash}`,
          status: "success",
          duration: 3000,
        });
        setAmount(0);
      }
    } catch (error) {
      console.error("Failed purchase", error);
      toast({
        title: "Failed to buy token",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    } finally {
      setBuyingToken(false);
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
        <div className="flex gap-8 py-12 flex-wrap lg:flex-nowrap">
          <div className="w-full md:w-full lg:w-7/12 space-y-8">
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
                    <div className="w-full h-36 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                      {launch?.logo_url ? (
                        <Image
                          src={launch?.logo_url}
                          alt={"fall-back"}
                          fill
                          className="rounded-t-[16px] w-full h-full object-cover object-center"
                          priority
                        />
                      ) : null}
                    </div>

                    <div className="w-5 h-5 overflow-hidden block object-contain rounded-full absolute bottom-0 right-6">
                      <Image
                        src={"/images/opencampus-edu.png"}
                        alt={"fall-back"}
                        fill
                        className="w-full h-full object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="font-medium flex flex-col gap-2">
                  <span className="text-white text-lg">{launch?.name}</span>
                  <div className="text-[#A19B99] text-base flex items-center gap-2">
                    <a
                      href={launch?.website}
                      className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                    >
                      <Global size={22} />
                    </a>
                    <a
                      href={launch?.telegram}
                      className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                    >
                      <TelegramIcon />
                    </a>
                    <a
                      href={launch?.twitter}
                      className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                    >
                      <TwitterIcon2 width={22} height={22} />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: launch?.description,
                }}
              />
              <div>
                <h3 className="font-medium text-white text-lg mb-2">
                  Token Details
                </h3>

                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="p-2 w-full flex justify-between items-center flex-wrap">
                    <h3 className="font-medium text-[#898582] text-sm">
                      Token address
                    </h3>
                    <div>
                      <button
                        type="button"
                        onClick={() => copyHandler(launch?.token_address)}
                        className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap"
                      >
                        {launch?.token_address}
                        <span className="text-[#898582]">
                          <Copy size={14} />
                        </span>
                      </button>
                      <p className="text-[10px] text-[#FF8789] text-right">
                        Do not send EDU to this pool address
                      </p>
                    </div>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className="font-medium text-[#898582] text-sm">
                      Token name
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.token_name}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Token symbol
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.token_symbol}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Total supply
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.token_supply?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-white text-lg mb-2">
                  Pool info
                </h3>

                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="p-2 w-full flex justify-between items-center  flex-wrap">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Pool address
                    </h3>
                    <button
                      type="button"
                      onClick={() => copyHandler(launch?.launch_address)}
                      className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap"
                    >
                      {launch?.launch_address}
                      <span className="text-[#898582]">
                        <Copy size={14} />
                      </span>
                    </button>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Token for Presale
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.presale_amount} {launch?.token_symbol}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Soft cap
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.soft_cap} EDU
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Hard cap
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.hard_cap} EDU
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Presale Rate
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      1 EDU = {launch?.presale_rate} {launch?.token_symbol}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Listing Rate
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      1 EDU = {launch?.listing_rate} {launch?.token_symbol}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Start time
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {new Date(launch?.start_date)?.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      End time
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {new Date(launch?.end_date)?.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Liquidity percent
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.tokenomics?.liquidity}%
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Liquidity Lockup Time
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      30 days after pool ends
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5">
              <div>
                <h3 className="font-medium text-white text-lg mb-2">
                  Tokenomic
                </h3>

                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full min-h-96 h-full items-start justify-center">
                  <div className="h-full flex items-center  w-full">
                    <TokenChart collection={collection} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-full lg:w-5/12">
            <div className="bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5">
              <div>
                <div className="py-2 w-full ">
                  <h3 className="font-medium text-white text-base">
                    Presale ends in
                  </h3>
                </div>
                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="flex justify-center flex-wrap gap-2.5 md:gap-4">
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {days}
                      </div>
                      <p className="text-GreyCloud text-xs md:text-sm">Day</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {hours}
                      </div>
                      <p className="text-GreyCloud text-xs md:text-sm">Hr</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {minutes}
                      </div>
                      <p className="text-GreyCloud text-xs md:text-sm">Min</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                        {seconds}
                      </div>
                      <p className="text-GreyCloud text-xs md:text-sm">Sec</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[#ADB4B9] font-medium text-xs flex-wrap gap-2">
                        <span>Progress ({progress}%)</span>
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
                          <span>{totalSold} EDU</span>
                          <span>{launch?.hard_cap?.toLocaleString()}EDU</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-base mb-3">
                        Contribute
                      </h3>
                      <div className="flex flex-col gap-1 relative w-full">
                        <div className="mb-1 flex items-center justify-between">
                          <label
                            htmlFor="amount"
                            className="text-sm text-[#FFFCFB] font-medium"
                          >
                            Amount
                          </label>
                          <p className="text-[#898582] text-xs">
                            Available:{" "}
                            <span className="text-[#FFA178]">
                              {balance?.toFixed(3)} EDU
                            </span>
                          </p>
                        </div>

                        <div className=" relative w-full h-12">
                          <div className="absolute inset-y-0 left-0 pr-1 flex items-center pointer-events-none h-full">
                            <span className="text-white px-3">
                              <div className="w-5 h-5 relative overflow-hidden block object-contain rounded-full">
                                <Image
                                  src={"/images/opencampus-edu.png"}
                                  alt={"fall-back"}
                                  fill
                                  className="w-full h-full object-cover object-center"
                                  priority
                                />
                              </div>
                            </span>
                          </div>
                          <input
                            type="number"
                            id="amount"
                            className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-12 pr-12 h-full text-white"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            autoComplete="off"
                          />
                          <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                            <button
                              onClick={() => setAmount(balance)}
                              className="text-[#FFA178] px-3 font-medium"
                            >
                              Max
                            </button>
                          </div>
                        </div>
                        <span className="text-xs text-[#00FFA3]">
                          You will receive{" "}
                          {(amount * launch?.presale_rate)?.toFixed(3)}{" "}
                          {launch?.token_symbol}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <button
                        disabled={!isConnected || buyingToken}
                        onClick={buyToken}
                        className="bg-[#DA5921] hover:bg-[#DA5921] w-full whitespace-nowrap 
                                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                                transition-all duration-75 border-none px-5 
                                                font-medium p-3 text-base text-white block"
                      >
                        {buyingToken
                          ? `Buying ${launch?.token_symbol}`
                          : `Buy ${launch?.token_symbol}`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className="font-medium text-[#898582] text-sm">
                      Status
                    </h3>
                    <span
                      className={`font-medium ${
                        status === "Upcoming"
                          ? "text-[#F3BA2F]"
                          : "text-[#00FFA3]"
                      } text-xs`}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Unsold Token
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.hard_cap - totalSold} {launch?.token_symbol}
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Minimum buy
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.minimum_user_allocation} EDU
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Maximum buy
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {launch?.maximum_user_allocation} EDU
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Total Contributors
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      0
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Avg. Contributions
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      0 EDU
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className="font-medium text-[#898582] text-sm">
                      My Contribution
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      0 EDU
                    </span>
                  </div>
                  <div className="p-2 w-full flex justify-between items-center">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      My Reserved Tokens
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      0 {launch?.token_symbol}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLaunchPad;
