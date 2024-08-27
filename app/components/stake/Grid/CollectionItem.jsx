import { calculateCompletionPercentage, formatDuration } from "@/app/lib/utils";
import { Progress } from "@chakra-ui/react";
import { Global } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { TelegramIcon, TwitterIcon2 } from "../../IconComponent";

const CollectionItem = ({ data }) => {
  const progress = 0;

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
        href={`/stake/${data?._id}`}
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
              <span className="text-white text-base">{data?.stake_name}</span>
              <span className="text-[#C3C1C1] text-sm">Presale</span>
              <span className="text-[#ADB4B9] text-xs">
                Min buy: {data?.minimum_stake_limit} {data?.token_symbol}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between font-medium flex-wrap gap-2">
            <p className="text-xs text-[#ADB4B9]">
              Stake Rate{" "}
              <span className="text-sm text-[#FFA178] ml-1">
                {data?.stake_rate?.toLocaleString()} {data?.token_symbol} - 1
                EDU
              </span>
            </p>
            <p className="text-xs text-[#ADB4B9]">
              Hard cap{" "}
              <span className="text-sm text-[#FFA178] ml-1">
                {data?.hard_cap?.toLocaleString()} {data?.token_symbol}
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
              <p>0 {data?.token_symbol}</p>
              <p>
                {data?.hard_cap?.toLocaleString()} {data?.token_symbol}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="font-medium">
              <p className="text-[#ADB4B9] text-xs">Liquidity</p>
              <span className="text-[#FFA178] text-sm">{data?.token_apy}%</span>
            </div>
            <div>
              <p className="text-[#ADB4B9] text-xs text-right">Lock</p>
              <span className="text-[#FFA178] text-sm">Manual</span>
            </div>
          </div>

          <div className="flex items-end justify-between flex-wrap w-full">
            {/* <div className="text-[#A19B99] text-base flex items-center justify-start gap-2 flex-row">
              <span className=" flex items-center justify-center rounded-full">
                <TwitterIcon2 width={24} height={22} />
              </span>
              <span className="flex items-center justify-center rounded-full">
                <Global size={22} />
              </span>
              <span className="flex items-center justify-center rounded-full">
                <TelegramIcon width={24} height={24} />
              </span>
            </div> */}
            <div className="flex">
              <div>
                <p className="text-xs text-[#ADB4B9] text-right">
                  Sale ends in:
                </p>
                <h4 className="text-[#F0EDED] text-[17px]">
                  {formatDuration(data?.created_at, data?.end_date)}
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
