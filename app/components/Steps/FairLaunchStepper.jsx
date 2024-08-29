"use client";
import { TokenAbi } from "@/app/providers/abis/token";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { Checkmark } from "@carbon/icons-react";
import { Box, useDisclosure, useSteps, useToast } from "@chakra-ui/react";

import { formDataToObject, shortenAddress } from "@/app/lib/utils";
import { LaunchFactoryAbi } from "@/app/providers/abis/launch-factory";
import { LaunchFactory } from "@/app/providers/address";
import { City, Country, State } from "country-state-city";
import { ethers, formatEther, formatUnits, getAddress } from "ethers";
import { motion } from "framer-motion";
import { Check } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAccount, useBalance } from "wagmi";
import NewFairLaunchChart from "../Charts/NewFairLaunchChart";
import CustomDropdown from "../CustomDropdown";
import { MoreVertIcon } from "../IconComponent";
import ApprovePresales from "../Modals/ApprovePresales";
import SavePresalesProgress from "../Modals/SavePresalesProgress";

const allCountries = Country.getAllCountries();

const steps = [
  {
    title: "Verify Token",
    description: "Enter token details or create a token",
  },
  {
    title: "Tokenomics Details",
    description: "Add all necessary details of your token",
  },
  { title: "Submit", description: "Completed token details gets listed" },
];

export default function FairLaunchStepper() {
  const toast = useToast();
  const { isConnected, address } = useAccount();
  const [activeStep, setActiveStep] = useState(0);
  const [saleVesting, setSaleVesting] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const stepperRef = useRef(null);

  const [presaleApproved, setPresaleApproved] = useState(false);

  const [description, setDescription] = useState("");
  const [presaleAmount, setPresaleAmount] = useState(0);
  const [hardCap, setHardCap] = useState(0);
  const [listingRatePercentage, setListingRatePercentage] = useState(10);
  const [liquidityPercentage, setLiquidityPercentage] = useState(60);

  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenDetails, setTokenDetails] = useState(null);
  const [socialDetails, setSocialDetails] = useState({
    website: "",
    telegram: "",
    twitter: "",
    github: "",
    discord: "",
    youtube: "",
  });
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const [dataToSend, setDataToSend] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);

      let reader = new FileReader();
      reader.onload = function () {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
    }
  };

  const { data } = useBalance({
    address,
    token: tokenAddress,
  });

  const balance = useMemo(() => {
    if (data) {
      return Number(formatUnits(data?.value, data?.decimals));
    }
    return 0;
  }, [data]);

  useEffect(() => {
    if (tokenAddress && isConnected) {
      const getTokenDetails = async () => {
        try {
          setLoading(true);
          const signer = await getEthersSigner(config);
          const token = new ethers.Contract(tokenAddress, TokenAbi, signer);

          const token_name = await token?.name();
          const token_symbol = await token?.symbol();
          const total_supply = await token?.totalSupply();
          if (token_name && token_symbol && total_supply) {
            setTokenDetails({
              token_name,
              token_symbol,
              total_supply,
            });
          } else {
            setTokenDetails(null);
          }
        } catch (error) {
          console.error("failed to get details", error);
        } finally {
          setLoading(false);
        }
      };

      getTokenDetails();
    }
  }, [tokenAddress, isConnected]);

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

  const {
    isOpen: approveSalesIsOpen,
    onOpen: onApproveSalesOpen,
    onClose: onApproveSalesClose,
  } = useDisclosure();

  const {
    isOpen: savingProgressIsOpen,
    onOpen: onSavingProgressOpen,
    onClose: onSavingProgressClose,
  } = useDisclosure();

  useEffect(() => {
    if (stepperRef.current) {
      stepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const createPresaleHandler = async () => {
    try {
      setLoading(true);
      //save to db
      const savedToDB = await fetch("/api/launch", {
        method: "POST",
        body: dataToSend,
      });

      if (savedToDB.ok) {
        const newLaunch = await savedToDB.json();

        toast({
          title: "Launch created successfully.",
          description: `Launch ID: ${newLaunch?.launch?._id}`,
          status: "success",
          duration: 2000,
        });

        router.push(`/fair-launch/${newLaunch?.launch?._id}`);
      }
    } catch (error) {
      // console.error("failed to finish", error);
      toast({
        title: "Error creating stake.",
        description: "Failed",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
      onSavingProgressClose();
    }
  };

  const planSelectionHandler = () => {
    onApproveSalesOpen();
  };

  const handleFinish = async () => {
    try {
      setLoading(true);

      const _amountForSale = presaleAmount;
      const _hardCap = Number(dataToSend.get("hard_cap") || 0);
      const _softCap = Number(dataToSend.get("soft_cap") || 0); // softCap must be greater than or equal to 25% of hardCa
      const _percentageForLiquidity = liquidityPercentage;
      const _percentageForTeam = 100 - liquidityPercentage;
      const _listingRate = listingRatePercentage;

      const options = {
        token: tokenAddress,
        softCap: ethers.parseEther(_softCap.toString()),
        hardCap: ethers.parseEther(_hardCap.toString()),
        amountForSale: ethers.parseEther(_amountForSale.toString()),
        listingRate: ethers.parseEther(_listingRate.toString()),
        minimumBuy: ethers.parseEther(
          dataToSend.get("minimum_user_allocation")
        ), //0.1 EDU, Max unique 1000 wallets can buy
        maximumBuy: ethers.parseEther(
          dataToSend.get("maximum_user_allocation")
        ),
        percentageForLiquidity: _percentageForLiquidity,
        percentageForTeam: _percentageForTeam,
        startDate: new Date(dataToSend.get("start_date")) / 1000,
        endDate: new Date(dataToSend.get("end_date")) / 1000,
      };

      const totalAmountTokensUserNeedForLaunch =
        _amountForSale +
        (_percentageForLiquidity * _hardCap * _listingRate) / 100;

      const signer = await getEthersSigner(config);
      const factory = new ethers.Contract(
        LaunchFactory,
        LaunchFactoryAbi,
        signer
      );

      console.log({ options });

      const byteCode = await factory.getBytecode(options);
      const salt = await factory.getdeployedLaunchesLen(address);
      const launch_address = await factory.getAddressCreate2(byteCode, salt);

      dataToSend.append("launch_address", launch_address);

      const token = new ethers.Contract(tokenAddress, TokenAbi, signer);
      const amount = ethers.parseEther(
        totalAmountTokensUserNeedForLaunch?.toString()
      );
      const allowance = await token.allowance(address, LaunchFactory);

      if (allowance >= amount) {
        setPresaleApproved(true);
      } else {
        const approveToken = await token.approve(LaunchFactory, amount);
        await approveToken.wait();
        if (approveToken) {
          setPresaleApproved(true);
        }
      }

      const response = await factory.newFairLaunch(options);
      await response.wait();

      if (response) {
        await createPresaleHandler();
      }
    } catch (error) {
      console.error("failed to finish", error);
      const message = error?.message?.split("(")?.[0];
      toast({
        title: "Error creating launch.",
        description: message || "Failed",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
      onSavingProgressClose();
    }
  };

  const handleCloseSelectPlan = () => {
    onSavingProgressOpen();
    onApproveSalesClose();
    handleFinish();
  };

  const isActive = (index) => activeStep === index;
  const isCompleted = (index) => activeStep > index;

  const collection = {
    presale: "0",
    liquidity: "0",
    unlocked: "0",
    locked: "0",
    burnt: "0",
    staking_rewards: "0",
  };

  const items = [
    { src: "/images/USD-Coin-(USDC).svg", name: "SailFish" },
    // Add more options as needed
  ];

  const handleSelect = (item) => {
    console.log("Selected item:", item);
  };

  const presaleRate = presaleAmount / hardCap ?? 0;
  const listingRate =
    presaleAmount / hardCap +
      ((presaleAmount / hardCap) * listingRatePercentage) / 100 ?? 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = formDataToObject(formData);

    const hard_cap = parseInt(formData.get("hard_cap"));
    const soft_cap = parseInt(formData.get("soft_cap"));

    formData.append("description", description);
    formData.append("owner_address", address);
    formData.append("token_name", tokenDetails?.token_name);
    formData.append("token_symbol", tokenDetails?.token_symbol);
    formData.append("token_address", tokenAddress);
    formData.append("token_supply", formatEther(tokenDetails?.total_supply));
    formData.append("hard_cap", hard_cap);
    formData.append("soft_cap", soft_cap);
    formData.append("presale_amount", presaleAmount);
    formData.append("presale_rate", presaleRate);
    formData.append("listing_rate", listingRate);
    formData.append("minimum_user_allocation", data.min_allocation_per_user);
    formData.append("maximum_user_allocation", data.max_allocation_per_user);
    formData.append("raised_edu_percentage", liquidityPercentage);
    formData.append("liquidity_lock_period", 30);
    formData.append("website", socialDetails.website);
    formData.append("telegram", socialDetails.telegram);
    formData.append("twitter", socialDetails.twitter);
    formData.append("github", socialDetails.github);
    formData.append("discord", socialDetails.discord);
    formData.append("youtube", socialDetails.youtube);
    formData.append("logo", file);
    formData.append("payment_tier", "simple");
    formData.append("tokenomics", collection);

    setDataToSend(formData);
    console.log(dataToSend);
    handleNext();
  };

  return (
    <>
      <div ref={stepperRef}>
        <div>
          <div className="flex items-center mb-3 sm:px-10 md:px-20">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <span
                  className={`presale-step-shadow size-6 rounded-full border-[1.5px]  flex justify-center items-center ${
                    isCompleted(index) || isActive(index)
                      ? "border-[#FC9569]"
                      : "bg-[#3B3939] border-[#212121] "
                  }`}
                >
                  {isCompleted(index) ? (
                    <Checkmark className="text-[#FC9569]" />
                  ) : (
                    <span
                      className={`size-2 rounded-full ${
                        isCompleted(index) || isActive(index)
                          ? "bg-[#FC9569]"
                          : "bg-[#575656]"
                      }`}
                    ></span>
                  )}
                </span>
                {index < steps.length - 1 && (
                  <span className="h-0.5 bg-[#3B3939] flex-1">
                    <span
                      className={`block h-full ${
                        isCompleted(index)
                          ? "bg-[#c76b4c] animate-moveProgress"
                          : "bg-[#3B3939]"
                      }`}
                    ></span>
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex justify-between gap-1">
            {steps.map((step, index) => (
              <div className="max-w-[190px] text-center false" key={index}>
                <p
                  className={`text-[0.625rem] sm:text-sm md:text-base font-medium mb-0.5 ${
                    isActive(index) ? "text-[#EA6A32]" : ""
                  } ${isCompleted(index) ? "text-white" : "text-[#A8B8C2]"}`}
                >
                  {step.title}
                </p>
                <p
                  className={`hidden sm:block text-[0.625rem] md:text-sm text-Nebula ${
                    isActive(index) || isCompleted(index)
                      ? "text-white"
                      : "text-[#A8B8C2]"
                  } `}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 md:mt-8">
          {activeStep === 0 ? (
            <>
              <div className="bg-[#272727] px-5 py-4 rounded-lg">
                <div>
                  <div className="flex items-center justify-end w-full gap-5 mb-1">
                    <Link
                      href={"/token"}
                      className="text-[#CCDCDF] text-base p-2 px-4 rounded-3xl border border-[#A8B8C2]"
                    >
                      Create Token
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    {/* <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                        <label
                                            htmlFor="select_dex"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Select DEX exchange to launch your token on
                                        </label>

                                        <select
                                            id="select_dex"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-[#272727]  h-12 rounded-md focus:outline-0"
                                            name="select_dex"
                                        >
                                            <option value="">Select DEX</option>
                                        </select>
                                    </div> */}
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <label
                        htmlFor="select_dex"
                        className="text-sm text-[#FFFCFB] mb-1"
                      >
                        Select DEX exchange to launch your token on
                      </label>
                      <CustomDropdown items={items} onSelect={handleSelect} />
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <label
                        htmlFor="address"
                        className="text-sm text-[#FFFCFB] "
                      >
                        Token Address
                      </label>

                      <input
                        type="text"
                        id="address"
                        value={tokenAddress}
                        onChange={(event) => {
                          const value = event.target.value;
                          setTokenAddress(value);
                        }}
                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                        placeholder="For example: 0x83E46e6E193B284d26f7A4B7D865B65952A50Bf2"
                        name="address"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <label
                        htmlFor="token_name"
                        className="text-sm text-[#FFFCFB] mb-1"
                      >
                        Token Name
                      </label>
                      <input
                        type="text"
                        id="token_name"
                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent disabled:bg-[#3E3D3C] h-12 rounded-md focus:outline-0"
                        placeholder="For example: SAF Token"
                        name="token_name"
                        disabled
                        value={tokenDetails?.token_name}
                        autoComplete="off"
                      />
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <label
                        htmlFor="symbol"
                        className="text-sm text-[#FFFCFB] mb-1"
                      >
                        Token Symbol
                      </label>
                      <input
                        type="text"
                        id="symbol"
                        value={tokenDetails?.token_symbol}
                        className="block px-2 w-full text-sm disabled:bg-[#3E3D3C] text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                        placeholder="For example: SAF"
                        name="symbol"
                        disabled
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                    <label
                      htmlFor="name"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Launch Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent disabled:bg-[#3E3D3C] h-12 rounded-md focus:outline-0"
                      placeholder="For example: SAF Token"
                      name="name"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="relative flex flex-col w-full gap-1 mb-6">
                    <label
                      htmlFor="description"
                      className="text-sm text-[#FFFCFB] mb-1"
                    >
                      Description
                    </label>
                    {/* <textarea
                      rows={5}
                      className="block p-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent resize-none rounded-md focus:outline-0"
                      required
                      name="description"
                      id="description"
                    ></textarea> */}
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      className="border border-[#464849] min-h-16"
                    />
                  </div>
                  <div>
                    <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-3">
                      <div className="relative flex flex-col w-full gap-1 mb-6">
                        <label
                          htmlFor="website"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Website *
                        </label>
                        <input
                          type="url"
                          id="website"
                          className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                          placeholder="For example: https://..."
                          name="website"
                          onChange={(event) => {
                            const value = event.target.value;
                            setSocialDetails((prev) => ({
                              ...prev,
                              website: value,
                            }));
                          }}
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
                          placeholder="For example: https://telegram.com"
                          name="telegram"
                          autoComplete="off"
                          onChange={(event) => {
                            const value = event.target.value;
                            setSocialDetails((prev) => ({
                              ...prev,
                              telegram: value,
                            }));
                          }}
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
                          onChange={(event) => {
                            const value = event.target.value;
                            setSocialDetails((prev) => ({
                              ...prev,
                              twitter: value,
                            }));
                          }}
                          pattern="https://(www\.)?(twitter\.com|x\.com)/[a-zA-Z0-9_]+(/status/[0-9]+)?"
                          className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                          placeholder="For example: https://x.com"
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
                          placeholder="For example: https://github.com"
                          name="github"
                          onChange={(event) => {
                            const value = event.target.value;
                            setSocialDetails((prev) => ({
                              ...prev,
                              github: value,
                            }));
                          }}
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
                          placeholder="For example: https://discord.com"
                          name="discord"
                          onChange={(event) => {
                            const value = event.target.value;
                            setSocialDetails((prev) => ({
                              ...prev,
                              discord: value,
                            }));
                          }}
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
                          placeholder="For example: https://youtube.com"
                          name="youtube"
                          onChange={(event) => {
                            const value = event.target.value;
                            setSocialDetails((prev) => ({
                              ...prev,
                              youtube: value,
                            }));
                          }}
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="relative flex flex-col w-full gap-1">
                      <label className="text-sm text-[#FFFCFB] mb-1">
                        Upload Logo *
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
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center w-full gap-3 mt-4">
                <button
                  onClick={handleNext}
                  type={"button"}
                  disabled={
                    loading ||
                    !isConnected ||
                    !tokenDetails ||
                    !isAddressValid ||
                    !socialDetails?.website ||
                    !file
                  }
                  className="bg-[#DA5921] disabled:cursor-wait hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                            disabled:opacity-50 rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base text-white block"
                >
                  {loading
                    ? "Loading..."
                    : isAddressValid
                    ? "Next"
                    : "Invalid address"}
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          {activeStep === 1 ? (
            <>
              <form
                onSubmit={handleSubmit}
                className="bg-[#272727] px-5 py-4 rounded-lg"
              >
                <div>
                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label className="text-sm text-[#FFFCFB] mb-1">
                          Fund Raising Token
                        </label>
                        <p className="text-[#898582] text-xs">
                          Token you will raise the liquidity and funding in
                        </p>
                      </div>
                      {/* <input
                        type="text"
                        id="fund_raising_token"
                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                        placeholder=" "
                        name="fund_raising_token"
                        required
                        autoComplete="off"
                      /> */}
                      <div className="flex items-center justify-between px-2 w-full cursor-not-allowed text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0">
                        <span className="flex items-center space-x-2">
                          <Image
                            src="/images/opencampus-edu.png"
                            alt="EDU"
                            className="rounded-full"
                            width={24}
                            height={24}
                          />
                          <span>EDU</span>
                        </span>
                      </div>
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="presale_creator"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Presale creator
                        </label>
                        <p className="text-[#898582] text-xs">
                          Only account that can add, edit presale contract
                          information & unlock liquidity
                        </p>
                      </div>
                      <div
                        id="presale_creator"
                        className="flex items-center gap-2 px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-[#3E3D3C]  h-12 rounded-md focus:outline-0"
                      >
                        <div className="relative block object-contain w-6 h-6 overflow-hidden rounded-full">
                          <Image
                            src={
                              "/images/e447cb96501bff0a8163288ac4aa2c57.jpeg"
                            }
                            alt={"presale creator"}
                            fill
                            className="object-cover object-center w-full h-full"
                            priority
                          />
                        </div>
                        <span>{shortenAddress(address)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="thrustpad_pair_created"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          SailFish pair created
                        </label>
                        <p className="text-[#898582] text-xs">
                          This is how the token will be listed
                        </p>
                      </div>
                      <div
                        id="thrustpad_pair_created"
                        className="flex items-center gap-2 px-2 w-full text-sm text-[#9E9794] border-[#464849] border bg-[#3E3D3C]  h-12 rounded-md"
                      >
                        <div className="flex items-center -space-x-2">
                          <div className="relative block object-contain w-6 h-6 overflow-hidden rounded-full">
                            <Image
                              src={"/images/opencampus-edu.png"}
                              alt={"thrustpad_pair_created"}
                              fill
                              className="object-cover object-center w-full h-full"
                              priority
                            />
                          </div>
                          <div className="relative block object-contain w-6 h-6 overflow-hidden rounded-full">
                            {file ? (
                              <Image
                                src={imageUrl}
                                alt={"thrustpad_pair_created"}
                                fill
                                className="object-cover object-center w-full h-full"
                                priority
                              />
                            ) : null}
                          </div>
                        </div>
                        <span>EDU / {tokenDetails?.token_symbol}</span>
                      </div>
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label className="text-sm text-[#FFFCFB] mb-1">
                          How many {tokenDetails?.token_symbol} are up for
                          presale?
                        </label>
                        <p className="text-[#898582] text-xs">
                          Total amount of token to sell to buyers (not liquidity
                          tokens)
                        </p>
                        <p className="text-xs text-right text-white">
                          Available balance: <span>{balance?.toFixed(3)}</span>
                        </p>
                      </div>

                      <div className="relative w-full h-12 ">
                        <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                          <span className="px-3 text-white">
                            {tokenDetails?.token_symbol}
                          </span>
                        </div>
                        <input
                          type="number"
                          id="deenie_up_presale"
                          className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                          name="deenie_up_presale"
                          required
                          autoComplete="off"
                          min={0}
                          value={presaleAmount}
                          onChange={(e) => setPresaleAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="soft_cap"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Soft Cap (EDU)
                        </label>
                        <p className="text-[#898582] text-xs">
                          Minimum amount of funds raised. It needs to be 30% of
                          Hard cap
                        </p>
                      </div>

                      <div className="relative w-full h-12 ">
                        <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                          <span className="px-3 text-white">EDU</span>
                        </div>
                        <input
                          type="number"
                          id="soft_cap"
                          className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                          name="soft_cap"
                          required
                          autoComplete="off"
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="hard_cap"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Hard Cap (EDU)
                        </label>
                        <p className="text-[#898582] text-xs">
                          Maximum amount that can be bought
                        </p>
                      </div>

                      <div className="relative w-full h-12 ">
                        <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                          <span className="px-3 text-white">EDU</span>
                        </div>
                        <input
                          type="number"
                          id="hard_cap"
                          className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                          name="hard_cap"
                          required
                          autoComplete="off"
                          value={hardCap}
                          onChange={(e) => setHardCap(e.target.value)}
                          min={0}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                    <div className="mb-1">
                      <label
                        htmlFor="soft_cap"
                        className="text-sm text-[#FFFCFB] mb-1"
                      >
                        Percent of raised EDU for liquidity
                      </label>
                      <p className="text-[#898582] text-xs">
                        Additional tokens required for liquidity is hard cap is
                        reached
                      </p>
                    </div>

                    <div className="relative w-full border border-[#464849] p-4 rounded-md text-center">
                      <div className="max-w-xl mx-auto space-y-3 ">
                        <div>
                          <h3 className="text-[22px] font-medium text-white inline-flex items-center gap-2">
                            {liquidityPercentage.toFixed(2)}% ~
                            <div className="flex space-x-2 items-center">
                              <div className="relative block object-contain w-5 h-5 overflow-hidden rounded-full">
                                <Image
                                  src={"/images/opencampus-edu.png"}
                                  alt={"fall-back"}
                                  fill
                                  className="object-cover object-center w-full h-full"
                                  priority
                                />
                              </div>
                              <span>
                                {(hardCap * liquidityPercentage) / 100 ?? 0}
                              </span>
                              <span className="text-[#BEBDBD] text-sm">
                                EDU
                              </span>
                            </div>
                          </h3>
                        </div>
                        <div>
                          <input
                            type="range"
                            className="block w-full h-1 rounded-md range-slider"
                            value={liquidityPercentage}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (value >= 60) {
                                setLiquidityPercentage(value);
                              }
                            }}
                            min={60}
                            max={100}
                          />
                          <div className="flex items-center justify-between mt-1 text-sm">
                            <span>60%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>

                      {/* <RangeSlider
                                                aria-label={['min']}
                                                colorScheme='#FFA178'

                                                defaultValue={[0]}
                                            >
                                            <RangeSliderTrack>
                                                <RangeSliderFilledTrack />
                                            </RangeSliderTrack>
                                            <RangeSliderThumb index={0} />
                                            </RangeSlider> */}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    {/* <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="soft_cap"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Percent of raised EDU for liquidity
                        </label>
                        <p className="text-[#898582] text-xs">
                          Additional tokens required for liquidity is hard cap
                          is reached
                        </p>
                      </div>

                      <div className="relative w-full border border-[#464849] p-4 rounded-md text-center">
                        <div className="max-w-xl mx-auto space-y-3 ">
                          <div>
                            <h3 className="text-[22px] font-medium text-white inline-flex items-center gap-2">
                              <div className="flex items-center">
                                <div className="relative block object-contain w-5 h-5 overflow-hidden rounded-full">
                                  <Image
                                    src={"/images/opencampus-edu.png"}
                                    alt={"fall-back"}
                                    fill
                                    className="rounded-t-[16px] w-full h-full object-cover object-center"
                                    priority
                                  />
                                </div>
                                20
                                <span className="text-[#BEBDBD]  text-sm">
                                  {" "}
                                  EDU
                                </span>
                              </div>
                            </h3>
                          </div>
                          <div>
                            <input
                              type="range"
                              className="block w-full h-1 rounded-md range-slider"
                              defaultValue={0}
                              autoComplete="off"
                            />
                            <div className="flex items-center justify-between mt-1 text-sm">
                              <span>60%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="max_allocation_per_user"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Minimum allocation per user
                        </label>
                        <p className="text-[#898582] text-xs">
                          Amount changes based on min allocation per user
                        </p>
                      </div>

                      <div className="relative w-full h-12 ">
                        <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                          <span className="px-3 text-white">EDU</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          id="min_allocation_per_user"
                          className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                          name="min_allocation_per_user"
                          // placeholder={0}
                          // min={0}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="text-[#B7B1AE] inline-flex items-center gap-3">
                          {/* <p className="text-xs">300 unique participants</p> */}
                          {/* <div className="bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[#00FFA3] block"></span>
                            Right on spot!!
                          </div> */}
                        </div>

                        {/* <div className="inline-flex items-center gap-3">
                          <p className="text-[#B7B1AE] text-xs">
                            <span className="text-white ">0</span> UNCL spots
                          </p>
                          <p className="text-[#B7B1AE] text-xs">
                            <span className="text-white ">200</span> whitelist
                            spots
                          </p>
                        </div> */}
                      </div>
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="max_allocation_per_user"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Maximum allocation per user
                        </label>
                        <p className="text-[#898582] text-xs">
                          Amount changes based on max allocation per user
                        </p>
                      </div>

                      <div className="relative w-full h-12 ">
                        <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                          <span className="px-3 text-white">EDU</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          id="max_allocation_per_user"
                          className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                          name="max_allocation_per_user"
                          // placeholder={0}
                          // min={0}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="text-[#B7B1AE] inline-flex items-center gap-3">
                          {/* <p className="text-xs">300 unique participants</p> */}
                          {/* <div className="bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[#00FFA3] block"></span>
                            Right on spot!!
                          </div> */}
                        </div>

                        {/* <div className="inline-flex items-center gap-3">
                          <p className="text-[#B7B1AE] text-xs">
                            <span className="text-white ">0</span> UNCL spots
                          </p>
                          <p className="text-[#B7B1AE] text-xs">
                            <span className="text-white ">200</span> whitelist
                            spots
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-start w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="presale_rate"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Presale rate
                        </label>
                        <p className="text-[#898582] text-xs">
                          This is gotten by dividing hard cap from the total
                          token up for sale
                        </p>
                      </div>
                      <input
                        type="text"
                        id="presale_rate"
                        className="block px-2 w-full text-sm text-[#FFA178] border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-[#3E3D3C]  h-12 rounded-md focus:outline-0 font-medium"
                        placeholder={`1 EDU = 5678623514 ${tokenDetails?.token_symbol}`}
                        disabled
                        value={presaleRate}
                        name="presale_rate"
                        autoComplete="off"
                      />
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="listing_rate"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Listing rate
                        </label>
                        <p className="text-[#898582] text-xs">
                          This is the percent of presale rate you want to list
                        </p>
                      </div>
                      <input
                        type="text"
                        id="listing_rate"
                        className="block px-2 w-full text-sm text-[#FFA178] border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-[#3E3D3C]  h-12 rounded-md focus:outline-0 font-medium"
                        placeholder={`1 EDU = 567 ${tokenDetails?.token_symbol}`}
                        name="listing_rate"
                        value={listingRate}
                        disabled
                        autoComplete="off"
                      />
                      <div className="flex items-center gap-2 mt-1">
                        {[0, 10, 15, 25, 30].map((percent) => (
                          <button
                            key={percent}
                            type="button"
                            onClick={() => setListingRatePercentage(percent)}
                            className={`text-xs border border-[#474443] rounded-2xl py-1 px-2 text-white ${
                              percent === listingRatePercentage
                                ? "border-[#DA5921]"
                                : ""
                            }`}
                          >
                            {percent}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    {/* <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <div className="relative flex flex-col w-full gap-1 lg:w-1/3">
                          <div className="mb-1">
                            <label
                              htmlFor="thrustpad_fee"
                              className="text-sm text-[#FFFCFB] mb-1"
                            >
                              Thrustpad fee
                            </label>
                          </div>

                          <div className="relative w-full h-12 ">
                            <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                              <span className="px-3 text-white">EDU</span>
                            </div>
                            <input
                              type="number"
                              id="thrustpad_fee"
                              className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                              name="thrustpad_fee"
                              defaultValue={0}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="relative flex flex-col w-full gap-1 lg:w-1/3">
                          <div className="mb-1">
                            <label
                              htmlFor="edu_liquidity"
                              className="text-sm text-[#FFFCFB] mb-1"
                            >
                              EDU Liquidity
                            </label>
                          </div>

                          <div className="relative w-full h-12 ">
                            <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                              <span className="px-3 text-white">EDU</span>
                            </div>
                            <input
                              type="number"
                              id="edu_liquidity"
                              className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                              name="edu_liquidity"
                              defaultValue={0}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="relative flex flex-col w-full gap-1 lg:w-1/3">
                          <div className="mb-1">
                            <label
                              htmlFor="your_edu"
                              className="text-sm text-[#FFFCFB] mb-1"
                            >
                              Your EDU
                            </label>
                          </div>

                          <div className="relative w-full h-12 ">
                            <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                              <span className="px-3 text-white">EDU</span>
                            </div>
                            <input
                              type="number"
                              id="your_edu"
                              className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                              name="your_edu"
                              defaultValue={0}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="relative flex flex-col w-full gap-1 lg:w-1/3">
                          <div className="mb-1">
                            <label
                              htmlFor="dennie_liquidity"
                              className="text-sm text-[#FFFCFB] mb-1"
                            >
                              {tokenDetails?.token_symbol} Liquidity
                            </label>
                          </div>

                          <div className="relative w-full h-12 ">
                            <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                              <span className="px-3 text-white">{tokenDetails?.token_symbol}</span>
                            </div>
                            <input
                              type="number"
                              id="dennie_liquidity"
                              className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                              name="dennie_liquidity"
                              defaultValue={0}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="relative flex flex-col w-full gap-1 lg:w-1/3">
                          <div className="mb-1">
                            <label
                              htmlFor="dennie_sold"
                              className="text-sm text-[#FFFCFB] mb-1"
                            >
                              {tokenDetails?.token_symbol} sold
                            </label>
                          </div>

                          <div className="relative w-full h-12 ">
                            <div className="absolute inset-y-0 right-0 flex items-center h-full pr-1 pointer-events-none">
                              <span className="px-3 text-white">{tokenDetails?.token_symbol}</span>
                            </div>
                            <input
                              type="number"
                              id="dennie_sold"
                              className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                              name="dennie_sold"
                              defaultValue={0}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="start_date"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Start Date
                        </label>
                        <p className="text-[#898582] text-xs">
                          Date to begin fair launch sale
                        </p>
                      </div>
                      <input
                        type="datetime-local"
                        id="start_date"
                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                        placeholder=" "
                        name="start_date"
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="end_date"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          End Date
                        </label>
                        <p className="text-[#898582] text-xs">
                          End date needs to be set as minimum 24h of start date
                        </p>
                      </div>
                      <input
                        type="datetime-local"
                        id="end_date"
                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                        placeholder=" "
                        name="end_date"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="liquidity_lock_period"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Liquidity lock period
                        </label>
                        <p className="text-[#898582] text-xs">
                          Estimated period where liquidity would be locked
                        </p>
                      </div>
                      <select
                        defaultValue={30}
                        disabled
                        id="liquidity_lock_period"
                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                        name="liquidity_lock_period"
                      >
                        <option value={30}>30 days</option>
                      </select>
                    </div>

                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <div className="mb-1">
                        <label
                          htmlFor="country"
                          className="text-sm text-[#FFFCFB] mb-1"
                        >
                          Country
                        </label>
                        <p className="text-[#898582] text-xs">
                          Select your country of operation. Where is your
                          business headquartered
                        </p>
                      </div>
                      <select
                        id="country"
                        className="block px-2 w-full text-sm border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                        name="country"
                      >
                        <option value={""} className="text-black">
                          Select a country
                        </option>
                        {allCountries.map((country) => (
                          <option
                            key={country?.isoCode}
                            className="text-black"
                            value={country?.name}
                          >
                            {country?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap opacity-50 items-center w-full gap-5 lg:flex-nowrap">
                    <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                      <label
                        htmlFor={`add_sale_vesting`}
                        className="flex items-start cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`add_sale_vesting`}
                          className="mr-2 caret-[#FFA178] h-4 w-4 mt-1"
                          value={1}
                          name="enable_edu_as_yield"
                          required
                          disabled
                          autoComplete="off"
                          onChange={() => {
                            setSaleVesting(!saleVesting);
                          }}
                        />
                        <div className="mb-1">
                          <h4 className="text-sm text-[#FFFCFB] mb-1">
                            Add Sale Vesting (Coming Soon)
                          </h4>
                          <p className="text-[#898582] text-xs">
                            Add vesting for sale contributors
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {saleVesting ? (
                    <>
                      <div className="px-4">
                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                          <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                            <label
                              htmlFor="token_release_on_launch"
                              className="text-sm text-[#FFFCFB] mb-1"
                            >
                              Token release on launch{" "}
                              <span className="text-[#898582]">(%)</span>
                            </label>
                            <input
                              type="number"
                              id="token_release_on_launch"
                              className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                              placeholder=" "
                              name="token_release_on_launch"
                            />
                          </div>

                          <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                            <label
                              htmlFor="cliff"
                              className="text-sm text-[#FFFCFB] mb-1"
                            >
                              Cliff{" "}
                              <span className="text-[#898582]">
                                (Extra delay in days before first vesting cycle)
                              </span>
                            </label>
                            <input
                              type="number"
                              id="cliff"
                              className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                              placeholder=" "
                              name="cliff"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                          <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                            <div className="mb-1">
                              <label
                                htmlFor="token_release"
                                className="text-sm text-[#FFFCFB] mb-1"
                              >
                                Token release per vesting cycle{" "}
                                <span className="text-[#898582]">(%)</span>
                              </label>
                            </div>
                            <input
                              type="number"
                              id="token_release"
                              className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                              name="token_release"
                            />
                          </div>

                          <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                            <div className="mb-1">
                              <label
                                htmlFor="vesting_period"
                                className="text-sm text-[#FFFCFB] mb-1"
                              >
                                Vesting period each cycle{" "}
                                <span className="text-[#898582]">(days)</span>
                              </label>
                            </div>
                            <input
                              type="number"
                              id="vesting_period"
                              className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                              name="vesting_period"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center w-full gap-3 mt-4">
                  <button
                    type={"submit"}
                    disabled={loading || !isConnected}
                    className="bg-[#DA5921] disabled:cursor-wait hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                        disabled:opacity-50 rounded-lg 
                        transition-all duration-75 border-none px-5 
                        font-medium p-3 text-base text-white block"
                  >
                    {loading ? "Loading..." : "Next"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            ""
          )}

          {activeStep === 2 ? (
            <>
              <div className="bg-[#272727] px-5 py-4 rounded-lg">
                <h3 className="mb-3 text-lg font-medium text-white">
                  Tokenomics detail
                </h3>

                <div className="border border-[#464849] rounded-lg p-5">
                  <div className="flex flex-wrap gap-8 lg:flex-nowrap">
                    <div className="w-full md:w-full lg:w-5/12">
                      <div className="bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]">
                        <div className="p-2">
                          <h3 className="text-base font-medium text-white">
                            Tokenomics score
                          </h3>
                        </div>

                        <div>
                          <NewFairLaunchChart collection={collection} />
                        </div>
                        {/* <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                Total token
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    SaleFish
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Token address
                                                </h3>
                                                <button type='button' className="font-medium text-[#FFFFFF] text-sm">
                                                    0x7Fefe59726c7c5f4BD7B0224F1FCfA58BAe508fc
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Token symbol
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    SAF
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Total supply
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    10,000,000
                                                </span>
                                            </div> */}
                      </div>
                    </div>
                    <div className="w-full md:w-full lg:w-7/12">
                      <div className="bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]">
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className=" font-medium text-[#898582] text-sm">
                            Total token
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            {tokenDetails?.total_supply}{" "}
                            {tokenDetails?.token_symbol}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Token name
                          </h3>
                          <button
                            type="button"
                            className="font-medium text-[#FFFFFF] text-sm font-wrap"
                          >
                            {tokenDetails?.token_name}
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Token symbol
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            {tokenDetails?.token_symbol}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Presale rate
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            1 EDU = {presaleRate} {tokenDetails?.token_symbol}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Soft cap
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm ">
                            {dataToSend?.get("soft_cap")} EDU
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Hard cap
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            {dataToSend?.get("hard_cap")} EDU
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Minimum buy
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            {dataToSend?.get("minimum_user_allocation")} EDU
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Maximum buy
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            {dataToSend?.get("maximum_user_allocation")} EDU
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            Start time
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            {dataToSend.get("start_date")}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                          <h3 className="font-medium text-[#898582] text-sm">
                            End time
                          </h3>
                          <span className="font-medium text-[#FFFFFF] text-sm">
                            {dataToSend.get("end_date")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <Box mt={4}>
          <div className="flex flex-wrap items-center justify-center w-full gap-3">
            {activeStep === 2 ? (
              <>
                <button
                  disabled={loading || !isConnected || presaleApproved}
                  onClick={planSelectionHandler}
                  aria-disabled="true"
                  className={`${
                    presaleApproved
                      ? "bg-[#393737] text-[#878483]"
                      : "bg-[#DA5921] text-white"
                  } min-w-[200px] whitespace-nowrap w-full md:w-auto
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base block`}
                >
                  {/* {loading && !presaleApproved
                    ? "Approving..."
                    : presaleApproved
                    ? "Presale Approved"
                    : "Approve presale"} */}
                  Choose payment tier
                </button>
                {/* 
                <button
                  onClick={handleFinish}
                  disabled={loading || !isConnected || !presaleApproved}
                  aria-disabled="true"
                  className={`${
                    presaleApproved
                      ? "bg-[#DA5921] text-white"
                      : "bg-[#393737] text-[#878483]"
                  } min-w-[200px] whitespace-nowrap w-full md:w-auto
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base block`}
                >
                  {loading && presaleApproved
                    ? "Creating presale..."
                    : "Create presale"}
                </button> */}
              </>
            ) : null}
          </div>
          {/* <div className="mt-4">
            <p className="font-medium text-[#878483] text-center text-sm">
              You will be charged $500 worth of DENNIE token to create this sale
            </p>
          </div> */}
        </Box>
      </div>

      <ApprovePresales
        isOpen={approveSalesIsOpen}
        onClose={onApproveSalesClose}
        handleCloseSelectPlan={handleCloseSelectPlan}
      />

      <SavePresalesProgress
        isOpen={savingProgressIsOpen}
        onClose={onSavingProgressClose}
      />
    </>
  );
}
