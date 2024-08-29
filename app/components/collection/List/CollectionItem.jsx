import useCountdown from "@/app/hooks/useCountdown";
import { LaunchAbi } from "@/app/providers/abis/launch";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { Progress } from "@chakra-ui/react";
import { ethers, formatUnits } from "ethers";
import { Global } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { TelegramIcon, TwitterIcon2 } from "../../IconComponent";

const CollectionItem = ({ data }) => {
  const [totalSold, setTotalSold] = useState(0);
  const [progress, setProgress] = useState(0);
  const { days, hours, minutes, seconds } = useCountdown(data?.end_date);

  useEffect(() => {
    if (data?.stake_address) {
      const getTotalSold = async () => {
        const signer = await getEthersSigner(config);
        const launch = new ethers.Contract(
          data?.launch_address,
          LaunchAbi,
          signer
        );

        launch
          .totalSold()
          .then((response) => {
            console.log("total sold", response);
            setTotalSold(Number(formatUnits(response)));
            setProgress((Number(formatUnits(response)) / data?.hard_cap) * 100);
          })
          .catch((error) => {
            console.log("Failed to get total sold", error);
          });
      };

      getTotalSold();
    }
  }, [data]);

  const status = useMemo(() => {
    const now = Date.now();
    const start_date = new Date(data?.start_date);
    const end_date = new Date(data?.end_date);
    if (start_date.getTime() <= now) {
      return "In Progress";
    }

    if (now > end_date.getTime()) {
      return "Ended";
    }
    return "Upcoming";
  }, [data]);
  return (
    <>
      <Link
        href={`/fair-launch/${data?._id}`}
        className="bg-[#272727] min-h-[150px] p-5 rounded-lg font-medium relative hover:translate-y-[-20px] transition-all duration-300 ease-linear"
      >
        <div className="flex flex-col gap-4 justify-between h-full ">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row w-20 relative">
                <div className="w-full h-20 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                  {data?.logo_url ? (
                    <Image
                      src={data?.logo_url}
                      alt={"fall-back"}
                      fill
                      className="rounded-t-[16px] w-full h-full object-cover object-center"
                      priority
                    />
                  ) : null}
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
                <span className="text-white text-base">{data?.name}</span>
                <p className="text-[#C3C1C1] text-sm">
                  Fair Launch -
                  <span className="text-[#ADB4B9] ml-2 text-xs">
                    Max buy: {data?.maximum_user_allocation} EDU
                  </span>
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between font-medium flex-wrap gap-4">
                <div>
                  <p className="text-xs text-[#ADB4B9]">Soft cap</p>
                  <span className="text-sm text-[#FFA178]">
                    {data?.soft_cap?.toLocaleString()} EDU
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#ADB4B9]">Hard cap</p>
                  <span className="text-sm text-[#FFA178]">
                    {data?.hard_cap?.toLocaleString()} EDU
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#ADB4B9]">Liquidity</p>
                  <span className="text-sm text-[#FFA178]">
                    {data?.tokenomics?.liquidity}%
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#ADB4B9]">Lock</p>
                  <span className="text-sm text-[#FFA178]">Manual</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
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
              <div className="text-[#A19B99] text-base flex items-center justify-between gap-2 flex-row">
                <Link
                  href={data?.twitter}
                  className=" flex items-center justify-center rounded-full"
                >
                  <TwitterIcon2 width={24} height={22} />
                </Link>
                <Link
                  href={data?.website}
                  className="flex items-center justify-center rounded-full"
                >
                  <Global size={22} />
                </Link>
                <Link
                  href={data?.telegram}
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
                  Sale ends in:
                </p>
                <h4 className="text-[#F0EDED] text-[17px]">
                  {days}d {hours}h {minutes}m {seconds}s
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
                <p>{totalSold} EDU</p>
                <p>{data?.hard_cap?.toLocaleString()} EDU</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CollectionItem;
