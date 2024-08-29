"use client";
import React, { use, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Stack,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    Text,
    useDisclosure,
    useSteps,
    ArrowLeft,
} from "@chakra-ui/react";
import { Danger } from "iconsax-react";
import { LoaderIcon } from "@/app/components/IconComponent";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Checkmark } from "@carbon/icons-react";
import MakePayment from "../Modals/MakePayment";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { checksumAddress, isAddress, parseEther } from "viem";
import { set } from "mongoose";
import { useAccount } from "wagmi";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { ethers, formatEther, getAddress } from "ethers";
import { TokenAbi } from "@/app/providers/abis/token";

const steps = [
    { title: "Choose type", description: "select the type of airdrop to use" },
    { title: "Add recipients", description: "Add all recipients of your airdrop" },
    { title: "Token details", description: "Add all necessary details of your airdrop" },
    { title: "Submit", description: "Completed airdrop details gets listed" },
];

export default function AirDropStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [airDropType, setAirDropType] = useState(null);
    const [saleVesting, setSaleVesting] = useState(false);
    const stepperRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [jsonRecipients, setJsonRecipients] = useState([]);
    const [totalTokens, setTotalTokens] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenDetails, setTokenDetails] = useState({ token_symbol: "", token_name: "" });
    const [airDropTitle, setAirDropTitle] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [userTokenBalance, setUserTokenBalance] = useState(0);
    const [insufficientBalance, setInsufficientBalance] = useState(false);
    const { isConnected, address } = useAccount();

    const {
        isOpen: makePaymentAirdropOpen,
        onOpen: onMakePaymentAirdropOpen,
        onClose: onMakePaymentAirdropClose,
    } = useDisclosure();

    useEffect(() => {
        if (stepperRef.current) {
            stepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [activeStep]);

    useEffect(() => {
        if (tokenAddress && isConnected) {
            const getTokenDetails = async () => {
                try {
                    setShowLoader(true);
                    const signer = await getEthersSigner(config);
                    const token = new ethers.Contract(tokenAddress, TokenAbi, signer);

                    const token_name = await token?.name();
                    const token_symbol = await token?.symbol();
                    const bal = await token?.balanceOf(address);

                    setUserTokenBalance(bal);
                    if (token_name && token_symbol) {
                        setAddressError(false);

                        setTokenDetails({
                            token_name,
                            token_symbol,
                        });
                    } else {
                        setAddressError(true);
                        setTokenDetails(null);
                    }
                } catch (error) {
                    setAddressError(true);
                    console.error("failed to get details", error);
                } finally {
                    setShowLoader(false);
                }
            };

            getTokenDetails();
        }
    }, [tokenAddress, isConnected]);

    useEffect(() => {
        if (activeStep === 1 && !jsonRecipients.length) {
            setNextDisabled(true);
        } else if (activeStep === 2 && (!tokenAddress || !airDropTitle)) {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [jsonRecipients, airDropTitle, tokenAddress, tokenDetails]);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => ++prevStep);
            setNextDisabled(true);
        }
    };

    const handleFileChange = (e) => {
        setShowLoader(true);
        const file = e.target.files[0];

        if (file) {
            Papa.parse(file, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function (result) {
                    let validated = result?.data?.filter((item) => {
                        return isAddress(item.Recipient) && Number(item.Amount) > 0;
                    });
                    if (validated?.length) {
                        setJsonRecipients(validated);
                        const totalTokens = validated.reduce(
                            (n, { Amount }) => Number(n) + Number(Amount),
                            0
                        );

                        setTotalTokens(totalTokens);
                        setShowLoader(false);
                    }
                },
            });

            setFileName(file.name);
        } else {
            setFileName("");
            setShowLoader(false);
        }
    };

    const handleFinish = () => {
        // onMakePaymentAirdropOpen();
    };

    const isActive = (index) => activeStep === index;
    const isCompleted = (index) => activeStep > index;

    return (
        <>
            <div ref={stepperRef}>
                <div>
                    <div className="flex items-center sm:px-10 md:px-20 mb-3">
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
                            <div className="bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg">
                                <h3 className="font-medium text-white text-lg mb-2">
                                    Choose Airdrop type
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 py-4">
                                    <button
                                        onClick={() => {
                                            setAirDropType(1);
                                        }}
                                        className={`bg-transparent border ${
                                            airDropType === 1
                                                ? "border-[#FFA178]"
                                                : "border-[#464849]"
                                        } hover: border-[#FFA178] rounded-lg flex flex-col text-white py-[14px] px-4 group `}
                                    >
                                        <div className="p-2 w-full flex justify-between items-start flex-wrap  gap-3 flex-col text-left">
                                            <div className="w-16 flex h-16 relative block object-contain">
                                                <Image
                                                    src={
                                                        "/images/three-dimensional-arrows-right.svg"
                                                    }
                                                    alt={"fall-back"}
                                                    fill
                                                    className="w-full h-full object-contain object-center"
                                                    priority
                                                />
                                            </div>
                                            <h3 className="font-semibold text-[#F0EDED] text-2xl">
                                                <span>Instant airdrop</span>
                                            </h3>

                                            <div className="space-y-2">
                                                <p className="text-[#838A8C] text-base">
                                                    Create an airdrop that instantly release tokens
                                                    to your recipients
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAirDropType(2);
                                        }}
                                        className={`bg-transparent border opacity-75 ${
                                            airDropType === 2
                                                ? "border-[#FFA178]"
                                                : "border-[#464849]"
                                        } cursor-not-allowed rounded-lg flex flex-col text-white py-[14px] px-4 group `}
                                    >
                                        <div className="p-2 w-full flex justify-between items-start flex-wrap gap-3 flex-col text-left">
                                            <div className="w-16 flex h-16 relative block object-contain">
                                                <Image
                                                    src={
                                                        "/images/three-dimensional-arrows-left.svg"
                                                    }
                                                    alt={"fall-back"}
                                                    fill
                                                    className="w-full h-full object-contain object-center"
                                                    priority
                                                />
                                            </div>
                                            <h3 className="font-semibold text-[#F0EDED] text-2xl flex items-center gap-2">
                                                <span>Vested airdrop</span>
                                            </h3>
                                            <div>
                                                <p className="text-[#838A8C] text-base">
                                                    Create an airdrop that gradually releases tokens
                                                    to your recipients after a certain period of
                                                    time
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    {activeStep === 1 ? (
                        <>
                            <div className="bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg stepper">
                                <div>
                                    <div>
                                        <h3 className="font-medium text-white text-lg mb-2">
                                            Add Recipients
                                        </h3>
                                        <div className="text-[#AFACAB] space-y-4">
                                            <div className="space-y-1">
                                                <p className="text-sm">
                                                    Upload an existing CSV file, making sure the
                                                    columns match our{" "}
                                                    <Link
                                                        href="https://thrustpad.finance/airdrop_template.csv"
                                                        target="_blank"
                                                        className="text-[#FFA178]"
                                                    >
                                                        template document
                                                    </Link>
                                                    , to add recipients.
                                                </p>
                                                {/* <p className="text-sm">
                                                    You can upload one CSV file to use as
                                                    tiers if you would like to apply varying
                                                    quantities of tokens.
                                                </p> */}
                                                <p className="text-sm">
                                                    You can also select from our pre-populated lists
                                                    of well-liked projects.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-4 mt-6">
                                        <div className="flex items-center justify-end mb-3">
                                            <h3 className="text-sm text-[#AFACAB]">
                                                Total Recipients:{" "}
                                                <span className="text-[#F0EDED] text-lg font-medium">
                                                    {jsonRecipients.length}
                                                </span>
                                            </h3>
                                        </div>
                                        <div className="flex items-center justify-end mb-3">
                                            <h3 className="text-sm text-[#AFACAB]">
                                                Total Tokens Needed:{" "}
                                                <span className="text-[#F0EDED] text-lg font-medium">
                                                    {totalTokens}
                                                </span>
                                            </h3>
                                        </div>
                                        <div className="flex gap-4 items-center flex-wrap lg:flex-nowrap">
                                            <div className="flex flex-shrink-0 flex-col gap-1 relative w-full max-w-full md:max-w-xs h-full">
                                                <label
                                                    htmlFor="recipients"
                                                    className="border-[#464849] border-dashed px-2 py-4 w-full  h-full min-h-52 md:min-h-96  border rounded-md flex items-center justify-center cursor-pointer"
                                                >
                                                    <div>
                                                        <div className="text-sm text-[#A8B8C2] text-center">
                                                            {fileName ? (
                                                                <div className="text-base text-[#FFA178]">
                                                                    {fileName}
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="flex flex-col gap-1">
                                                                        <span className="text-[#FFA178] ">
                                                                            Upload a CSV file
                                                                        </span>
                                                                        <span>
                                                                            {" "}
                                                                            or Drag and drop to
                                                                            upload
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <input
                                                        type="file"
                                                        id="recipients"
                                                        className="block px-2 py-4 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border border-dashed bg-transparent  h-full rounded-md focus:outline-0 text-center flex items-center justify-center hidden"
                                                        name="recipients"
                                                        required
                                                        accept=".csv"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                            </div>

                                            <div className="overflow-x-auto flex scrollbar-change pb-2 gap-3">
                                                {[
                                                    { name: "grasp", logo: "grasp" },
                                                    { logo: "sail", name: "SailFish" },
                                                    { logo: "thrust", name: "Thrustpad" },
                                                ].map((item, index) => (
                                                    <div
                                                        key={item.name}
                                                        className="flex flex-col gap-1 min-w-64 max-w-72 w-64 h-full flex-shrink-0 border border-[#464849] hover:border-[#FFA178] p-3 rounded-md group cursor-no-drop opacity-75"
                                                    >
                                                        <div className="w-full flex items-center justify-center max-h-42 h-42 opacity-75 bg-[#353333] rounded-lg">
                                                            <div className="flex size-28s relative overflow-hidden block object-contains w-full rounded-lg">
                                                                <img
                                                                    src={`/images/partners/${item.logo}.png`}
                                                                    className="rounded-lg  object-cover  h-30 w-96"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className=" flex-1 flex flex-col justify-between">
                                                            <div className="p-2 w-full flex justify-between items-start flex-col">
                                                                <span className="font-medium text-[#807D7C] text-xs">
                                                                    Airdrop to holders of
                                                                </span>
                                                                <h3 className="font-medium text-[#FFFCFB] text-base capitalize">
                                                                    {item.name}
                                                                </h3>
                                                            </div>
                                                            <div className="p-2 w-full flex justify-between items-start flex-col">
                                                                <span className="font-medium text-[#807D7C] text-xs">
                                                                    Total Recipients
                                                                </span>
                                                                <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                    0
                                                                </h3>
                                                            </div>
                                                            <div className="flex justify-between flex-wrap lg:flex-nowrap items-center gap-1">
                                                                <div className="p-2 w-full flex justify-between items-start flex-col">
                                                                    <span className="font-medium text-[#807D7C] text-xs">
                                                                        Quantity per recipients
                                                                    </span>
                                                                    <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                        0
                                                                    </h3>
                                                                </div>
                                                                {/* group-hover:text-[#FFA178] group-hover:border-[#FFA178] */}
                                                                <button className="text-[#464849]  border border-[#343232] rounded-lg py-[10px] px-4 text-xs w-full md:w-auto  transition-all duration-300 ease-in-out">
                                                                    Choose
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    {activeStep === 2 ? (
                        <>
                            <div className="bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg">
                                <div className="mt-3 lg:mt-6">
                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <label
                                                htmlFor="address"
                                                className="text-sm text-[#FFFCFB] "
                                            >
                                                Token Address
                                            </label>

                                            <input
                                                type="text"
                                                id="address"
                                                onChange={(e) => {
                                                    if (checksumAddress(e.target.value)) {
                                                        console.log("checkSum");
                                                        setAddressError(false);
                                                        setTokenAddress(e.target.value);
                                                    } else {
                                                        setAddressError(true);
                                                    }
                                                }}
                                                className={`block px-2 w-full text-sm text-white  ${
                                                    addressError === true
                                                        ? "border-red-500"
                                                        : "border-[#464849]  focus:outline-none focus:border-[#524F4D]"
                                                }  border bg-transparent  h-12 rounded-md focus:outline-0`}
                                                placeholder="For example: 0x83E46e6E193B284d26f7A4B7D865B65952A50Bf2"
                                                name="address"
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <label
                                                htmlFor="airdrop_title"
                                                className="text-sm text-[#FFFCFB] "
                                            >
                                                Airdrop title
                                            </label>

                                            <input
                                                type="text"
                                                id="airdrop_title"
                                                onChange={(e) => setAirDropTitle(e.target.value)}
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="e.g Pre Sale Airdrop"
                                                name="airdrop_title"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                Token Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                disabled
                                                value={tokenDetails?.token_name}
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                name="name"
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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
                                                disabled
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                name="symbol"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    {activeStep === 3 ? (
                        <>
                            <div className="bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg">
                                <h3 className="font-medium text-white text-lg mb-2">
                                    Airdrop Details
                                </h3>

                                <div className="flex gap-6 py-2 flex-wrap lg:flex-nowrap ">
                                    <div className="w-full md:w-full lg:w-7/12 space-y-8">
                                        <div>
                                            <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                                <div className="p-2 w-full flex justify-between items-center">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Airdrop title
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-xs">
                                                        {airDropTitle}
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Type
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-xs">
                                                        Instant
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Total tokens
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-xs">
                                                        {totalTokens} {tokenDetails?.token_symbol}
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Total recipients
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-xs">
                                                        {jsonRecipients.length}
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Token name
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-xs">
                                                        {tokenDetails?.token_name}
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Token symbol
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-xs">
                                                        {tokenDetails?.token_symbol}
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Token address
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-xs">
                                                        {tokenAddress}
                                                    </span>
                                                </div>
                                            </div>
                                            {userTokenBalance <
                                                parseEther(totalTokens.toString()) && (
                                                <div className="py-[18px] px-6 bg-red-200 rounded-lg mt-2">
                                                    <div className="flex items-start w-full gap-2 text-red-500">
                                                        <span>
                                                            <Danger size={22} />
                                                        </span>
                                                        <p className="text-sm text-red-500">
                                                            You do not have{" "}
                                                            <b>
                                                                {totalTokens}{" "}
                                                                {tokenDetails?.token_name}
                                                            </b>{" "}
                                                            in your wallet <b>{address}</b> to cover
                                                            airdrop distribution.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
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
                    <div className="flex items-center justify-center w-full gap-3 flex-wrap">
                        {activeStep < steps.length - 1 ? (
                            showLoader ? (
                                <button
                                    className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block flex items-center justify-center"
                                >
                                    <LoaderIcon className="animate-spin size-32 text-white inline" />
                                </button>
                            ) : (
                                <button
                                    disabled={nextDisabled}
                                    onClick={handleNext}
                                    className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                                >
                                    Next
                                </button>
                            )
                        ) : (
                            <>
                                {userTokenBalance > parseEther(totalTokens.toString()) && (
                                    <button
                                        onClick={handleFinish}
                                        className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                                    >
                                        Create Airdrop
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </Box>
            </div>

            <MakePayment isOpen={makePaymentAirdropOpen} onClose={onMakePaymentAirdropClose} />
        </>
    );
}
