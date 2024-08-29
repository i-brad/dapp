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
import { useReadContract } from "wagmi";

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
        className="bg-[#272727] min-h-[350px] p-4 rounded-lg font-medium relative hover:translate-y-[-20px] transition-all duration-300 ease-linear"
      >
        <div className="flex flex-col gap-4 justify-between h-full ">
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
              <span className="text-[#C3C1C1] text-sm">Fair Launch</span>
              <span className="text-[#ADB4B9] text-xs">
                Max buy: {data?.maximum_user_allocation} EDU
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between font-medium flex-wrap gap-2">
            <p className="text-xs text-[#ADB4B9]">
              Soft cap{" "}
              <span className="text-sm text-[#FFA178] ml-1">
                {data?.soft_cap?.toLocaleString()} EDU
              </span>
            </p>
            <p className="text-xs text-[#ADB4B9]">
              Hard cap{" "}
              <span className="text-sm text-[#FFA178] ml-1">
                {data?.hard_cap?.toLocaleString()} EDU
              </span>
            </p>
          </div>

          <div className="font-medium space-y-1">
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

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="font-medium">
              <p className="text-[#ADB4B9] text-xs">Liquidity</p>
              <span className="text-[#FFA178] text-sm">
                {data?.tokenomics?.liquidity}%
              </span>
            </div>
            <div>
              <p className="text-[#ADB4B9] text-xs text-right">Lock</p>
              <span className="text-[#FFA178] text-sm">Manual</span>
            </div>
          </div>

          <div className="flex items-end justify-between flex-wrap w-full">
            <div className="text-[#A19B99] text-base flex items-center justify-start gap-2 flex-row">
              <span className=" flex items-center justify-center rounded-full">
                <Link
                  href={data?.twitter}
                  className="flex items-center justify-center rounded-full "
                >
                  <TwitterIcon2 width={24} height={22} />
                </Link>
              </span>
              <span className="flex items-center justify-center rounded-full">
                <Link
                  href={data?.website}
                  className="flex items-center justify-center rounded-full "
                >
                  <Global size={22} />
                </Link>
              </span>
              <span className="flex items-center justify-center rounded-full">
                <Link
                  href={data?.telegram}
                  className="flex items-center justify-center rounded-full "
                >
                  <TelegramIcon width={24} height={24} />
                </Link>
              </span>
            </div>
            <div className="flex items-center justify-end">
              <div>
                <p className="text-xs text-[#ADB4B9] text-right">
                  Sale ends in:
                </p>
                <h4 className="text-[#F0EDED] text-[17px]">
                  {days}d {hours}h {minutes}m {seconds}s
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CollectionItem;
