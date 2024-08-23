"use client";
import PrimaryButton from "@/app/components/shared/Buttons";
import { ConnectWallet } from "@/app/components/shared/ConnectWallet";
import { LockFactoryAbi } from "@/app/providers/abis/lock-factory";
import { TokenAbi } from "@/app/providers/abis/token";
import { LockFactory } from "@/app/providers/address";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { useToast } from "@chakra-ui/react";
import { ethers, getAddress } from "ethers";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

const CreateLock = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [tokenAddress, setTokenAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  const toast = useToast();
  const [creatingLock, setCreatingLock] = useState(false);

  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const isAddressValid = useMemo(() => {
    if (tokenAddress) {
      try {
        const checkSum = getAddress(tokenAddress);
        if (typeof checkSum === "string") {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return true;
  }, [tokenAddress]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const date = new Date();
    const lock_date = new Date(data.get("lock_date") || date.now());
    const lock_amount = data.get("lock_amount");

    const now = new Date();
    const timeInSeconds = Math.floor(
      (lock_date.getTime() - now.getTime()) / 1000
    );
    // console.log({ lock_date, timeInSeconds });
    const amount = ethers.parseEther(lock_amount);

    try {
      setCreatingLock(true);
      const signer = await getEthersSigner(config);

      const factory = new ethers.Contract(LockFactory, LockFactoryAbi, signer);

      const byteCode = await factory.getBytecode(
        tokenAddress,
        timeInSeconds,
        amount
      );

      const salt = await factory.getdeployedLocksLen(address);
      const lock_address = await factory.getAddressCreate2(byteCode, salt);

      data.append("lock_address", lock_address);

      const token = new ethers.Contract(tokenAddress, TokenAbi, signer);

      //Allow factory  to spend tokens
      const approveToken = await token.approve(LockFactory, amount);
      await approveToken.wait();

      const response = await factory.newLock(
        tokenAddress,
        timeInSeconds,
        amount
      );

      await response.wait();
      if (response) {
        //save to db
        const savedToDB = await fetch("/api/lock", {
          method: "POST",
          body: data,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        });

        if (savedToDB.ok) {
          const newLock = await savedToDB.json();

          toast({
            title: "Lock created successfully.",
            description: `Lock ID: ${newLock?.lock?._id}`,
            status: "success",
            duration: 2000,
          });
          router.push(`/lock/${newLock?.lock?._id}`);
        }
      }
    } catch (error) {
      const message = error?.message?.split("(")?.[0];
      toast({
        title: "Error creating lock.",
        description: message || "FAiled",
        status: "error",
        duration: 2000,
      });
    } finally {
      setCreatingLock(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-start gap-8 mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft /> Back
        </button>

        <div className="w-full text-md">
          <h1 className="text-2xl font-medium lg:text-4xl">Create Lock</h1>
        </div>
      </div>

      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#272727] px-5 py-4 rounded-lg">
            <div className="flex flex-col gap-12 py-4">
              {/* Token Info */}
              <div>
                <h4 className="mb-4 text-lg font-medium text-white">
                  Token Info
                </h4>
                <div className="flex items-center w-full gap-5">
                  <div className="relative flex flex-col w-full gap-1 mb-6 md:w-1/2">
                    <label
                      htmlFor="address"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Token address
                    </label>
                    <input
                      type="text"
                      id="address"
                      title={!isAddressValid ? "Invalid token address" : ""}
                      value={tokenAddress}
                      onChange={(event) => {
                        const value = event.target.value;
                        setTokenAddress(value);
                      }}
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder=" "
                      name="token_address"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="relative flex flex-col w-full gap-1 mb-6 md:w-1/2">
                    <label
                      htmlFor="amount"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      id="amount"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder=" "
                      name="lock_amount"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="flex items-center w-full gap-5">
                  <div className="relative flex flex-col w-full gap-1 mb-6 md:w-1/2">
                    <label
                      htmlFor="owner_address"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Lock owner wallet address
                    </label>
                    <input
                      type="text"
                      id="owner_address"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder=" "
                      value={userAddress}
                      onChange={(event) => {
                        const value = event.target.value;
                        setUserAddress(value);
                      }}
                      name="owner_address"
                      required
                      readOnly
                      autoComplete="off"
                    />
                  </div>

                  <div className="relative flex flex-col w-full gap-1 mb-6 md:w-1/2">
                    <label
                      htmlFor="lock_date"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Lock date
                    </label>
                    <input
                      type="datetime-local"
                      id="lock_date"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder=" "
                      name="lock_date"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="relative flex flex-col w-full gap-1 ">
                  <label
                    htmlFor="lock_name"
                    className="text-sm text-[#FFFCFB] mb-1"
                  >
                    Lock name
                  </label>
                  <input
                    type="text"
                    id="lock_name"
                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                    placeholder="Enter a name"
                    name="lock_name"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Project information */}
              <div>
                <h4 className="mb-4 text-lg font-medium text-white">
                  Project information
                </h4>
                <div className="relative flex flex-col w-full gap-1 mb-6">
                  <label
                    htmlFor="project_title"
                    className="text-sm text-[#FFFCFB] mb-1"
                  >
                    Project title
                  </label>
                  <input
                    type="text"
                    id="project_title"
                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                    placeholder=" "
                    name="project_title"
                    required
                    autoComplete="off"
                  />
                </div>
                {/* <div className="flex items-center w-full gap-5">

                </div> */}
                <div className="relative flex flex-col w-full gap-1 mb-6">
                  <label
                    htmlFor="project_description"
                    className="text-sm text-[#FFFCFB] mb-1"
                  >
                    Project description
                  </label>
                  {/* <input
                      type="text"
                      id="project_description"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder=" "
                      name="project_description"
                      required
                      autoComplete="off"
                    /> */}
                  <textarea
                    rows={5}
                    className="block p-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent resize-none rounded-md focus:outline-0"
                    required
                    name="project_description"
                    id="project_description"
                  ></textarea>
                </div>

                <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-3">
                  <div className="relative flex flex-col w-full gap-1 mb-6">
                    <label
                      htmlFor="website"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder="For e.g; https://..."
                      name="website"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="relative flex flex-col w-full gap-1 mb-6">
                    <label
                      htmlFor="telegram"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Telegram
                    </label>
                    <input
                      type="url"
                      id="telegram"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder="For e.g; https://telegram.com"
                      name="telegram"
                      autoComplete="off"
                      pattern="https://t\.me/[a-zA-Z0-9_]{5,32}"
                    />
                  </div>
                  <div className="relative flex flex-col w-full gap-1 mb-6">
                    <label
                      htmlFor="twitter"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Twitter
                    </label>
                    <input
                      type="url"
                      id="twitter"
                      pattern="https://(www\.)?(twitter\.com|x\.com)/[a-zA-Z0-9_]+(/status/[0-9]+)?"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder="For e.g; https://x.com"
                      name="twitter"
                      autoComplete="off"
                    />
                  </div>
                  <div className="relative flex flex-col w-full gap-1 mb-6">
                    <label
                      htmlFor="github"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Github
                    </label>
                    <input
                      type="url"
                      id="github"
                      pattern="https://github\.com/[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)?"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder="For e.g; https://github.com"
                      name="github"
                      autoComplete="off"
                    />
                  </div>
                  <div className="relative flex flex-col w-full gap-1 mb-6">
                    <label
                      htmlFor="discord"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Discord
                    </label>
                    <input
                      type="url"
                      id="discord"
                      pattern="https://(www\.)?discord\.gg/[a-zA-Z0-9]{5,}"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder="For e.g; https://discord.com"
                      name="discord"
                      autoComplete="off"
                    />
                  </div>
                  <div className="relative flex flex-col w-full gap-1 mb-6">
                    <label
                      htmlFor="youtube"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Youtube
                    </label>
                    <input
                      type="url"
                      id="youtube"
                      pattern="https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[a-zA-Z0-9_-]{11}"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                      placeholder="For e.g; https://youtube.com"
                      name="youtube"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="relative flex flex-col w-full gap-1">
                  <label className="text-sm text-[#FFFCFB] mb-1">
                    Upload Logo
                  </label>

                  <label
                    htmlFor="logo"
                    className="border-[#464849] border-dashed px-2 py-4 w-full  h-24 border rounded-md flex items-center justify-center cursor-pointer"
                  >
                    <div>
                      <div className="text-sm text-[#A8B8C2] text-center">
                        {fileName ? (
                          <div className="text-base text-[#FFA178]">
                            {fileName}
                          </div>
                        ) : (
                          <>
                            <div>
                              <span className="text-[#FFA178] ">
                                Upload here
                              </span>
                              <span> or Drag and drop to upload</span>
                            </div>
                            <div className="text-xs text-[#898582]">
                              <span>PNG, JPG, JPEG</span>
                              <span>. Max 200KB</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <input
                      type="file"
                      id="logo"
                      className="px-2 py-4 text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border border-dashed bg-transparent rounded-md focus:outline-0 text-center overflow-hidden w-0 opacity-0 h-0"
                      name="logo"
                      required
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {isConnected ? (
            <div className="flex items-center justify-center w-full mt-4">
              <button
                disabled={!isAddressValid || creatingLock}
                className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] max-w-[250px] whitespace-nowrap 
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base text-white block"
              >
                {isAddressValid
                  ? creatingLock
                    ? "Creating Lock..."
                    : "Create lock"
                  : "Invalid token address"}
              </button>
            </div>
          ) : (
            <div className="relative flex items-center max-w-[200px] mx-auto justify-center z-[999] ">
              <ConnectWallet>
                <PrimaryButton
                  text="Connect wallet"
                  as="span"
                  className="w-fit"
                />
              </ConnectWallet>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateLock;
