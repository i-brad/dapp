import { calculateCompletionPercentage, formatDuration } from "@/app/lib/utils";
import { Progress } from "@chakra-ui/react";
import { Global } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TelegramIcon, TwitterIcon2 } from "../../IconComponent";
import { config } from "@/app/providers/wagmi/config";
import { ethers, formatUnits } from "ethers";
import { StakeAbi } from "@/app/providers/abis/stake";
import { getEthersSigner } from "@/app/providers/ethers";

const CollectionItem = ({ data }) => {
      const [totalStaked, setTotalStaked] = useState(0);
      const [progress, setProgress] = useState(0);

      useEffect(() => {
          if (data?.stake_address) {
              getTotalStaked();
          }
      }, [data]);

      const getTotalStaked = async () => {
          const signer = await getEthersSigner(config);
          const staker = new ethers.Contract(data?.stake_address, StakeAbi, signer);

          staker
              .totalStaked()
              .then((response) => {
                  console.log("total staked", response);
                  setTotalStaked(Number(formatUnits(response)));
                  setProgress((Number(formatUnits(response)) / data?.hard_cap) * 100);
              })
              .catch((error) => {
                  console.log("Failed to get total staked", error);
              });
      };

    console.log(data);
    // const progress = calculateCompletionPercentage(data?.start_date, data?.end_date);
    return (
        <>
            <Link
                href={`/stake/${data?._id}`}
                className="bg-[#272727] min-h-[150px] p-5 rounded-lg font-medium relative hover:translate-y-[-20px] transition-all duration-300 ease-linear"
            >
                <div className="flex flex-col gap-4 justify-between h-full ">
                    <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-row w-20 relative">
                                <div className="w-full h-20 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                    <Image
                                        src={"/images/coin.png"}
                                        alt={"fall-back"}
                                        fill
                                        className="rounded-t-[16px] w-full h-full object-cover object-center"
                                        priority
                                    />
                                </div>

                                <Image
                                    src={"/images/opencampus-edu.png"}
                                    alt={"fall-back"}
                                    height={15}
                                    width={15}
                                    className="rounded-full object-cover object-center absolute bottom-0 right-3"
                                    priority
                                />
                            </div>
                            <div className="font-medium flex flex-col">
                                <span className="text-white text-base capitalize">
                                    {data.stake_description}
                                </span>
                                <p className="text-[#C3C1C1] text-sm">
                                    <span className="text-[#ADB4B9] text-xs">
                                        Min stake: {data?.minimum_stake_limit} {data?.token_symbol}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between font-medium flex-wrap gap-4">
                                <div>
                                    <p className="text-xs text-[#ADB4B9]">Stake Rate</p>
                                    <span className="text-sm text-[#FFA178]">
                                        {" "}
                                        {data?.stake_rate?.toLocaleString()} {data?.token_symbol} -
                                        1 EDU
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#ADB4B9]">Hard cap</p>
                                    <span className="text-sm text-[#FFA178]">
                                        {" "}
                                        {data?.hard_cap?.toLocaleString()} {data?.token_symbol}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#ADB4B9]">Token APY</p>
                                    <span className="text-sm text-[#FFA178]">
                                        {data?.token_apy}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#ADB4B9]">EDU APY</p>
                                    <span className="text-sm text-[#FFA178]">{data?.edu_apy}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-[#00FFA3] block"></span>
                                In Progress
                            </div>
                            <div className="text-[#A19B99] text-base flex items-center justify-between gap-2 flex-row">
                                <Link
                                    href={`#`}
                                    className=" flex items-center justify-center rounded-full"
                                >
                                    <TwitterIcon2 width={24} height={22} />
                                </Link>
                                <Link
                                    href={`#`}
                                    className="flex items-center justify-center rounded-full"
                                >
                                    <Global size={22} />
                                </Link>
                                <Link
                                    href={`#`}
                                    className="flex items-center justify-center rounded-full"
                                >
                                    <TelegramIcon width={24} height={24} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap  flex-col-reverse md:flex-row w-full pt-4 border-t border-[#3C3E3E] gap-2">
                        <div className="flex items-center flex-1 justify-end md:justify-normal w-full">
                            <div>
                                <p className="text-xs text-[#ADB4B9] text-right md:text-left">
                                    Saking ends in:
                                </p>
                                <h4 className="text-[#F0EDED] text-[17px]">
                                    {formatDuration(data?.created_at, data?.end_date)}
                                </h4>
                            </div>
                        </div>

                        <div className="font-medium space-y-1 w-full md:w-10/12">
                            <p className="text-xs text-[#ADB4B9]">
                                Progress ({progress?.toFixed(2)}%)
                            </p>
                            <Progress
                                colorScheme="orange"
                                size="sm"
                                value={progress}
                                className="text-[#EA6A32] rounded-lg"
                                isAnimated={true}
                            />
                            <div className="text-xs text-[#ADB4B9] font-medium flex items-center justify-between">
                                <p>{totalStaked} {data?.token_symbol}</p>
                                <p>
                                    {data?.hard_cap?.toLocaleString()} {data?.token_symbol}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CollectionItem;
