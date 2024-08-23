"use client";
import {
  TelegramIcon,
  TwitterIcon2,
  YoutubeIcon,
} from "@/app/components/IconComponent";
import useCountdown from "@/app/hooks/useCountdown";
import { calculateCompletionPercentage, formatDuration } from "@/app/lib/utils";
import { LockAbi } from "@/app/providers/abis/lock";
import { TokenAbi } from "@/app/providers/abis/token";
import { LockFactory } from "@/app/providers/address";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { Progress, useToast } from "@chakra-ui/react";
import { ethers, formatUnits } from "ethers";
import { ArrowLeft, Copy, Global } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { useAccount } from "wagmi";
import Loading from "./loading";

const SingleLock = () => {
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const [loading, setLoading] = useState(true);
  const [lock, setLock] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [releasingLock, setReleasingLock] = useState(false);
  const [released, setReleased] = useState(false);

  const { isConnected, address } = useAccount();

  const copyHandler = (value) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Address Copied.", status: "success", duration: 1000 });
  };

  const { days, hours, minutes, seconds } = useCountdown(lock?.lock_date);

  useEffect(() => {
    const getLock = async () => {
      try {
        const response = await fetch(`/api/lock?id=${slug}`);
        if (response.ok) {
          const data = await response.json();
          setLock(data?.lock);
        }
      } catch (error) {
        console.error("failed to fetch lock", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      getLock();
    }
  }, [slug]);

  useEffect(() => {
    if (lock?.token_address) {
      const getTokenDetails = async () => {
        try {
          const signer = await getEthersSigner(config);
          const tokenAddress = lock?.token_address;
          const token = new ethers.Contract(tokenAddress, TokenAbi, signer);

          const name = await token?.name();
          const symbol = await token?.symbol();
          const total_supply = await token?.totalSupply();

          const lockContract = new ethers.Contract(
            lock?.lock_address,
            LockAbi,
            signer
          );

          const released = await lockContract.released();

          setReleased(released);
          setTokenDetails({
            name,
            symbol,
            total_supply: formatUnits(total_supply, 18),
          });
        } catch (error) {
          console.error("failed to get details", error);
        }
      };

      getTokenDetails();
    }
  }, [lock]);

  const progress = useMemo(() => {
    if (
      lock?.lock_date &&
      days >= 0 &&
      hours >= 0 &&
      minutes >= 0 &&
      seconds >= 0
    ) {
      const value = calculateCompletionPercentage(
        lock?.created_at,
        lock?.lock_date
      );
      return value;
    }
    return 0;
  }, [lock, days, hours, minutes, seconds]);

  const withdraw = async () => {
    try {
      setReleasingLock(true);
      const signer = await getEthersSigner(config);
      const lockContract = new ethers.Contract(
        lock?.lock_address,
        LockAbi,
        signer
      );

      const response = await lockContract.release();
      await response.wait();
      if (response) {
        const released = await lockContract.released();
        setReleased(released);

        toast({
          title: "Lock released successfully.",
          description: `Hash: ${response?.hash}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      const message = error?.message?.split("(")?.[0];
      toast({
        title: "Error releasing lock.",
        description: message || "FAiled",
        status: "error",
        duration: 2000,
      });
    } finally {
      setReleasingLock(false);
    }
  };

  if (slug && loading) {
    return <Loading />;
  }

  if (!loading && !lock) {
    notFound();
  }

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
          <div className="w-full md:w-full lg:w-7/12">
            <div className="bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5">
              <div className="flex flex-row items-center gap-4">
                <div className="w-36">
                  <div className="w-full h-36 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                    {lock?.logo_url ? (
                      <Image
                        src={lock?.logo_url}
                        alt={"fall-back"}
                        fill
                        className="rounded-t-[16px] w-full h-full object-cover object-center"
                        priority
                      />
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col gap-2 font-medium">
                  <span className="text-lg text-white">{lock?.lock_name}</span>
                  <div className="text-[#A19B99] text-base flex items-center gap-2">
                    {lock?.website ? (
                      <Link
                        target="_blank"
                        href={`${lock?.website}`}
                        className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                      >
                        <Global size={22} />
                      </Link>
                    ) : null}
                    {lock?.twitter ? (
                      <Link
                        target="_blank"
                        href={`${lock?.twitter}`}
                        className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                      >
                        <TwitterIcon2 width={22} height={22} />
                      </Link>
                    ) : null}

                    {lock?.telegram ? (
                      <Link
                        target="_blank"
                        href={`${lock?.telegram}`}
                        className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                      >
                        <TelegramIcon />
                      </Link>
                    ) : null}
                    {lock?.youtube ? (
                      <Link
                        target="_blank"
                        href={`${lock?.youtube}`}
                        className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                      >
                        <YoutubeIcon />
                      </Link>
                    ) : null}
                    {lock?.discord ? (
                      <Link
                        target="_blank"
                        href={`${lock?.discord}`}
                        className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                      >
                        <SiDiscord />
                      </Link>
                    ) : null}
                    {lock?.github ? (
                      <Link
                        target="_blank"
                        href={`${lock?.github}`}
                        className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                      >
                        <FaGithub />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
              <div>
                <p className="first-letter:capitalize">
                  {lock?.project_description}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  Token Details
                </h3>

                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="flex flex-wrap items-center justify-between w-full p-2">
                    <h3 className="font-medium text-[#898582] text-sm">
                      Token address
                    </h3>
                    <button
                      type="button"
                      onClick={() => copyHandler(lock?.token_address)}
                      className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap"
                    >
                      {lock?.token_address}
                      <span className="text-[#898582]">
                        <Copy size={14} />
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className="font-medium text-[#898582] text-sm">
                      Token name
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {tokenDetails?.name || "~"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Token symbol
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {tokenDetails?.symbol || "~"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Total supply
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {tokenDetails?.total_supply || "~"}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  Lock Details
                </h3>

                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                  <div className="flex flex-wrap items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Token amount locked
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {lock?.lock_amount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Owner
                    </h3>

                    <button
                      type="button"
                      onClick={() => copyHandler(lock?.owner_address)}
                      className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap"
                    >
                      {lock?.owner_address}
                      <span className="text-[#898582]">
                        <Copy size={14} />
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Lock time
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {lock?.created_at
                        ? new Date(lock?.created_at)?.toLocaleString()
                        : "~"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full p-2">
                    <h3 className=" font-medium text-[#898582] text-sm">
                      Unlock time
                    </h3>
                    <span className="font-medium text-[#FFFFFF] text-xs">
                      {lock?.lock_date
                        ? new Date(lock?.lock_date)?.toLocaleString()
                        : "~"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-full lg:w-5/12">
            <div className="bg-[#272727] rounded-lg px-5 py-4">
              <div className="w-full p-2 ">
                <h3 className="text-base font-medium text-white">
                  Collection Value
                </h3>
              </div>
              <div className="px-2 py-4  border-y border-[#3B3939]">
                <div className="flex flex-row flex-wrap items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row w-20">
                      <div className="w-full h-20 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                        {lock?.logo_url ? (
                          <Image
                            src={lock?.logo_url}
                            alt={"fall-back"}
                            fill
                            className="rounded-t-[16px] w-full h-full object-cover object-center"
                            priority
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col font-medium">
                      <span className="text-base text-white">
                        {lock?.lock_name}
                      </span>
                      <span className="text-[#A19B99] text-base">
                        {lock?.project_title}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[#A19B99] text-sm">
                      Lock time
                    </span>
                    <span className="text-base font-medium text-white">
                      {lock?.lock_date
                        ? formatDuration(lock?.created_at, lock?.lock_date)
                        : null}
                    </span>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[#ADB4B9] font-medium text-xs flex-wrap gap-2">
                      {/* <span>Progress (10.00%)</span> */}
                      <span>Progress ({progress.toFixed(2)}%)</span>
                      <span className="">
                        Time left: {days} days, {hours} hours, {minutes} mins,{" "}
                        {seconds} secs
                      </span>
                    </div>

                    <div className="">
                      <Progress
                        colorScheme="orange"
                        size="sm"
                        value={progress}
                        className="text-[#EA6A32] rounded-lg"
                        isAnimated={true}
                      />
                    </div>
                  </div>

                  {isConnected && address === lock?.owner_address ? (
                    <div className="flex items-center justify-center w-full mt-6">
                      <button
                        disabled={
                          days !== 0 ||
                          hours !== 0 ||
                          minutes !== 0 ||
                          seconds !== 0 ||
                          releasingLock ||
                          released
                        }
                        onClick={withdraw}
                        className="bg-[#DA5921] hover:bg-[#DA5921] w-full md:w-1/2 whitespace-nowrap 
                                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                            transition-all duration-75 border-none px-5 
                                            font-medium p-3 text-base text-white block"
                      >
                        {releasingLock
                          ? "Realeasing lock..."
                          : released
                          ? "Lock Released"
                          : "Withdraw Token"}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLock;
