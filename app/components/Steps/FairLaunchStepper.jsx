"use client";
import React, { useEffect, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import ApprovePresales from "../Modals/ApprovePresales";
import SavePresalesProgress from "../Modals/SavePresalesProgress";
import { MoreVertIcon } from "../IconComponent";
import { motion } from "framer-motion";
import { Check } from "iconsax-react";
import { Checkmark } from "@carbon/icons-react";
import NewFairLaunchChart from "../Charts/NewFairLaunchChart";
import CustomDropdown from "../CustomDropdown";

const steps = [
    { title: "Verify Token", description: "Enter token details or create a token" },
    { title: "Tokenomics Details", description: "Add all necessary details of your token" },
    { title: "Submit", description: "Completed token details gets listed" },
];

export default function FairLaunchStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [saleVesting, setSaleVesting] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const stepperRef = useRef(null);

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

    const handleFinish = () => {
        onApproveSalesOpen();
    };

    const handleCloseSelectPlan = () => {
        onSavingProgressOpen();
    };

    const isActive = (index) => activeStep === index;
    const isCompleted = (index) => activeStep > index;

    const collection = {
        presale: "10",
        liquidity: "20",
        fixed: "20",
        unlocked: "10",
        locked: "20",
        burnt: "10",
        staking_rewards: "10",
    };

    const items = [
        { src: "/images/USD-Coin-(USDC).svg", name: "SailFish" },
        { src: "/images/USD-Coin-(USDC).svg", name: "SailFish2" },
        // Add more options as needed
    ];

    const handleSelect = (item) => {
        console.log("Selected item:", item);
    };

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
                            <div className="bg-[#272727] px-5 py-4 rounded-lg">
                                <div>
                                    <div className="flex w-full gap-5 items-center justify-end mb-1">
                                        <Link
                                            href={"/token"}
                                            className="text-[#CCDCDF] text-base p-2 px-4 rounded-3xl border border-[#A8B8C2]"
                                        >
                                            Create Token
                                        </Link>
                                    </div>
                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        {/* <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <label
                                                htmlFor="select_dex"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                Select DEX exchange to launch your token on
                                            </label>
                                            <CustomDropdown items={items} onSelect={handleSelect} />
                                        </div>

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
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="For example: 0x83E46e6E193B284d26f7A4B7D865B65952A50Bf2"
                                                name="address"
                                                required
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
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="For example: SAF Token"
                                                name="name"
                                                required
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
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="For example: SAF"
                                                name="symbol"
                                                required
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

                    {activeStep === 1 ? (
                        <>
                            <div className="bg-[#272727] px-5 py-4 rounded-lg">
                                <div>
                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="start_date"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Fund Raising Token
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Token you will raise the liquidity and funding
                                                    in
                                                </p>
                                            </div>
                                            <input
                                                type="text"
                                                id="fund_raising_token"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder=" "
                                                name="fund_raising_token"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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
                                                <div className="w-6 h-6 relative overflow-hidden block object-contain rounded-full">
                                                    <Image
                                                        src={
                                                            "/images/e447cb96501bff0a8163288ac4aa2c57.jpeg"
                                                        }
                                                        alt={"presale creator"}
                                                        fill
                                                        className="w-full h-full object-cover object-center"
                                                        priority
                                                    />
                                                </div>
                                                <span>0xd....3455</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="thrustpad_pair_created"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Thrustpad pair created
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
                                                    <div className="w-6 h-6 relative overflow-hidden block object-contain rounded-full">
                                                        <Image
                                                            src={"/images/opencampus-edu.png"}
                                                            alt={"thrustpad_pair_created"}
                                                            fill
                                                            className="w-full h-full object-cover object-center"
                                                            priority
                                                        />
                                                    </div>
                                                    <div className="w-6 h-6 relative overflow-hidden block object-contain rounded-full">
                                                        <Image
                                                            src={
                                                                "/images/Deenie USD-Coin (USDC).svg"
                                                            }
                                                            alt={"thrustpad_pair_created"}
                                                            fill
                                                            className="w-full h-full object-cover object-center"
                                                            priority
                                                        />
                                                    </div>
                                                </div>
                                                <span>EDU / DEENIE</span>
                                            </div>
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label className="text-sm text-[#FFFCFB] mb-1">
                                                    How many DEENIE are up for presale?
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Total amount of token to sell to buyers (not
                                                    liquidity tokens)
                                                </p>
                                                <p className="text-white text-right text-xs">
                                                    Available balance: <span>300,000</span>
                                                </p>
                                            </div>

                                            <div className=" relative w-full h-12">
                                                <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                    <span className="text-white px-3">EDU</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    id="deenie_up_presale"
                                                    className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                                                    name="deenie_up_presale"
                                                    defaultValue={0}
                                                    required
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="soft_cap"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Soft Cap (EDU)
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Minimum amount of funds raised. It needs to be
                                                    10% of Hard cap
                                                </p>
                                            </div>

                                            <div className=" relative w-full h-12">
                                                <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                    <span className="text-white px-3">EDU</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    id="soft_cap"
                                                    className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                                                    name="soft_cap"
                                                    defaultValue={0}
                                                    required
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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

                                            <div className=" relative w-full h-12">
                                                <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                    <span className="text-white px-3">EDU</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    id="hard_cap"
                                                    className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                                                    name="hard_cap"
                                                    defaultValue={0}
                                                    required
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="soft_cap"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Percent of raised EDU for liquidity
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Additional tokens required for liquidity is hard
                                                    cap is reached
                                                </p>
                                            </div>

                                            <div className="relative w-full border border-[#464849] p-4 rounded-md text-center">
                                                <div className=" max-w-xl mx-auto space-y-3">
                                                    <div>
                                                        <h3 className="text-[22px] font-medium text-white inline-flex items-center gap-2">
                                                            <div className="flex items-center">
                                                                <div className="w-5 h-5 relative overflow-hidden block object-contain rounded-full">
                                                                    <Image
                                                                        src={
                                                                            "/images/opencampus-edu.png"
                                                                        }
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
                                                            className="range-slider rounded-md block w-full h-1"
                                                            defaultValue={0}
                                                            autoComplete="off"
                                                        />
                                                        <div className="flex items-center justify-between text-sm mt-1">
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

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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

                                            <div className=" relative w-full h-12">
                                                <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                    <span className="text-white px-3">DEENIE</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    id="max_allocation_per_user"
                                                    className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-2 pr-12 h-full text-white"
                                                    name="max_allocation_per_user"
                                                    defaultValue={0.15}
                                                    required
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 mt-1">
                                                <div className="text-[#B7B1AE] inline-flex items-center gap-3">
                                                    <p className="text-xs">
                                                        300 unique participants
                                                    </p>
                                                    <div className="bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2">
                                                        <span className="h-1 w-1 rounded-full bg-[#00FFA3] block"></span>
                                                        Right on spot!!
                                                    </div>
                                                </div>

                                                <div className="inline-flex items-center gap-3">
                                                    <p className="text-[#B7B1AE] text-xs">
                                                        <span className=" text-white">0</span> UNCL
                                                        spots
                                                    </p>
                                                    <p className="text-[#B7B1AE] text-xs">
                                                        <span className=" text-white">200</span>{" "}
                                                        whitelist spots
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="presale_rate"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Presale rate
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    This is gotten by dividing hard cap from the
                                                    total token up for sale
                                                </p>
                                            </div>
                                            <input
                                                type="text"
                                                id="presale_rate"
                                                className="block px-2 w-full text-sm text-[#FFA178] border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-[#3E3D3C]  h-12 rounded-md focus:outline-0 font-medium"
                                                placeholder=" "
                                                defaultValue={`1 EDU = 5678623514 DEENIE`}
                                                name="presale_rate"
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="listing_rate"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Listing rate
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    This is the percent of presale rate you want to
                                                    list
                                                </p>
                                            </div>
                                            <input
                                                type="text"
                                                id="listing_rate"
                                                className="block px-2 w-full text-sm text-[#FFA178] border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-[#3E3D3C]  h-12 rounded-md focus:outline-0 font-medium"
                                                placeholder=" "
                                                defaultValue={`1 EDU = 567 DEENIE`}
                                                name="listing_rate"
                                                autoComplete="off"
                                            />
                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    type="button"
                                                    className="text-xs border border-[#474443] rounded-2xl py-1 px-2 text-white"
                                                >
                                                    0%
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-xs border border-[#474443] rounded-2xl py-1 px-2 text-white"
                                                >
                                                    10%
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-xs border border-[#474443] rounded-2xl py-1 px-2 text-white"
                                                >
                                                    15%
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-xs border border-[#474443] rounded-2xl py-1 px-2 text-white"
                                                >
                                                    25%
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-xs border border-[#474443] rounded-2xl py-1 px-2 text-white"
                                                >
                                                    30%
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="soft_cap"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Percent of raised EDU for liquidity
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Additional tokens required for liquidity is hard
                                                    cap is reached
                                                </p>
                                            </div>

                                            <div className="relative w-full border border-[#464849] p-4 rounded-md text-center">
                                                <div className=" max-w-xl mx-auto space-y-3">
                                                    <div>
                                                        <h3 className="text-[22px] font-medium text-white inline-flex items-center gap-2">
                                                            60% ~
                                                            <div className="flex items-center">
                                                                <div className="w-5 h-5 relative overflow-hidden block object-contain rounded-full">
                                                                    <Image
                                                                        src={
                                                                            "/images/opencampus-edu.png"
                                                                        }
                                                                        alt={"fall-back"}
                                                                        fill
                                                                        className="w-full h-full object-cover object-center"
                                                                        priority
                                                                    />
                                                                </div>
                                                                800
                                                                <span className="text-[#BEBDBD] text-sm">
                                                                    {" "}
                                                                    EDU
                                                                </span>
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="range"
                                                            className="range-slider rounded-md block w-full h-1"
                                                            defaultValue={0}
                                                            autoComplete="off"
                                                        />
                                                        <div className="flex items-center justify-between text-sm mt-1">
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

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="flex items-center flex-wrap justify-center gap-2">
                                                <div className="flex flex-col gap-1 relative w-full lg:w-1/3">
                                                    <div className="mb-1">
                                                        <label
                                                            htmlFor="thrustpad_fee"
                                                            className="text-sm text-[#FFFCFB] mb-1"
                                                        >
                                                            Thrustpad fee
                                                        </label>
                                                    </div>

                                                    <div className=" relative w-full h-12">
                                                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-white px-3">
                                                                EDU
                                                            </span>
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
                                                <div className="flex flex-col gap-1 relative w-full lg:w-1/3">
                                                    <div className="mb-1">
                                                        <label
                                                            htmlFor="edu_liquidity"
                                                            className="text-sm text-[#FFFCFB] mb-1"
                                                        >
                                                            EDU Liquidity
                                                        </label>
                                                    </div>

                                                    <div className=" relative w-full h-12">
                                                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-white px-3">
                                                                EDU
                                                            </span>
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
                                                <div className="flex flex-col gap-1 relative w-full lg:w-1/3">
                                                    <div className="mb-1">
                                                        <label
                                                            htmlFor="your_edu"
                                                            className="text-sm text-[#FFFCFB] mb-1"
                                                        >
                                                            Your EDU
                                                        </label>
                                                    </div>

                                                    <div className=" relative w-full h-12">
                                                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-white px-3">
                                                                EDU
                                                            </span>
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
                                                <div className="flex flex-col gap-1 relative w-full lg:w-1/3">
                                                    <div className="mb-1">
                                                        <label
                                                            htmlFor="dennie_liquidity"
                                                            className="text-sm text-[#FFFCFB] mb-1"
                                                        >
                                                            DEENIE Liquidity
                                                        </label>
                                                    </div>

                                                    <div className=" relative w-full h-12">
                                                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-white px-3">
                                                                DEENIE
                                                            </span>
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
                                                <div className="flex flex-col gap-1 relative w-full lg:w-1/3">
                                                    <div className="mb-1">
                                                        <label
                                                            htmlFor="dennie_sold"
                                                            className="text-sm text-[#FFFCFB] mb-1"
                                                        >
                                                            DEENIE sold
                                                        </label>
                                                    </div>

                                                    <div className=" relative w-full h-12">
                                                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-white px-3">
                                                                DEENIE
                                                            </span>
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
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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
                                                type="date"
                                                id="start_date"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder=" "
                                                name="start_date"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="end_date"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    End Date
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    End date needs to be set as minimum 24h of start
                                                    date
                                                </p>
                                            </div>
                                            <input
                                                type="date"
                                                id="end_date"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder=" "
                                                name="end_date"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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
                                                defaultValue={1}
                                                id="liquidity_lock_period"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                name="liquidity_lock_period"
                                            >
                                                <option value={1}>1 year</option>
                                            </select>
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="liquidity_lock_period"
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
                                                defaultValue={null}
                                                id="liquidity_lock_period"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                name="liquidity_lock_period"
                                            >
                                                <option value={null}>Select a country</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <label
                                                htmlFor={`add_sale_vesting`}
                                                className="cursor-pointer flex items-start"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`add_sale_vesting`}
                                                    className="mr-2 caret-[#FFA178] h-4 w-4 mt-1"
                                                    value={1}
                                                    name="enable_edu_as_yield"
                                                    required
                                                    autoComplete="off"
                                                    onChange={() => {
                                                        setSaleVesting(!saleVesting);
                                                    }}
                                                />
                                                <div className="mb-1">
                                                    <h4 className="text-sm text-[#FFFCFB] mb-1">
                                                        Add Sale Vesting
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
                                                <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                                    <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                                        <label
                                                            htmlFor="token_release_on_launch"
                                                            className="text-sm text-[#FFFCFB] mb-1"
                                                        >
                                                            Token release on launch{" "}
                                                            <span className="text-[#898582]">
                                                                (%)
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="token_release_on_launch"
                                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                            placeholder=" "
                                                            name="token_release_on_launch"
                                                        />
                                                    </div>

                                                    <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                                        <label
                                                            htmlFor="cliff"
                                                            className="text-sm text-[#FFFCFB] mb-1"
                                                        >
                                                            Cliff{" "}
                                                            <span className="text-[#898582]">
                                                                (Extra delay in days before first
                                                                vesting cycle)
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

                                                <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                                    <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                                        <div className="mb-1">
                                                            <label
                                                                htmlFor="token_release"
                                                                className="text-sm text-[#FFFCFB] mb-1"
                                                            >
                                                                Token release per vesting cycle{" "}
                                                                <span className="text-[#898582]">
                                                                    (%)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            id="token_release"
                                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                            name="token_release"
                                                        />
                                                    </div>

                                                    <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                                        <div className="mb-1">
                                                            <label
                                                                htmlFor="vesting_period"
                                                                className="text-sm text-[#FFFCFB] mb-1"
                                                            >
                                                                Vesting period each cycle{" "}
                                                                <span className="text-[#898582]">
                                                                    (days)
                                                                </span>
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
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    {activeStep === 2 ? (
                        <>
                            <div className="bg-[#272727] px-5 py-4 rounded-lg">
                                <h3 className="font-medium text-white text-lg mb-3">
                                    Tokenomics detail
                                </h3>

                                <div className="border border-[#464849] rounded-lg p-5">
                                    <div className="flex gap-8 flex-wrap lg:flex-nowrap">
                                        <div className="w-full md:w-full lg:w-5/12">
                                            <div className="bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]">
                                                <div className="p-2">
                                                    <h3 className="font-medium text-white text-base">
                                                        Tokenomics score
                                                    </h3>
                                                </div>

                                                <div>
                                                    <NewFairLaunchChart collection={collection} />
                                                </div>
                                                {/* <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                Total token
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    SaleFish
                                                </span>
                                            </div>
                                            <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Token address
                                                </h3>
                                                <button type='button' className="font-medium text-[#FFFFFF] text-sm">
                                                    0x7Fefe59726c7c5f4BD7B0224F1FCfA58BAe508fc
                                                </button>
                                            </div>
                                            <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Token symbol
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    SAF
                                                </span>
                                            </div>
                                            <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
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
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className=" font-medium text-[#898582] text-sm">
                                                        Total token
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        500 000 DENNIE
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Token name
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        className="font-medium text-[#FFFFFF] text-sm font-wrap"
                                                    >
                                                        DENNIE
                                                    </button>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Token symbol
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        DENNIE
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Presale rate
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        1000 DENNIE
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Soft cap
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm ">
                                                        100 EDU
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Hard cap
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        200 EDU
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Minimum buy
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        1 EDU
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Maximum buy
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        10 EDU
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Start time
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        Tue, 13 Aug 2024 . 2:00PM
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        End time
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        Tue, 13 Aug 2024 . 2:00PM
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        UNCL spots
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        0
                                                    </span>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                                    <h3 className="font-medium text-[#898582] text-sm">
                                                        Whitelist spots
                                                    </h3>
                                                    <span className="font-medium text-[#FFFFFF] text-sm">
                                                        60
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
                    {/* {activeStep === 2 ? (
                    <>
                        <div className='bg-[#272727] px-5 py-4 rounded-lg'>


                            <h3 className="font-medium text-white text-lg mb-3">
                                Stake Review
                            </h3>
                            <div className='flex gap-8 flex-wrap lg:flex-nowrap'>
                                <div className='w-full md:w-full lg:w-5/12'>
                                    <div className='bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]'>
                                        <div className='p-2'>
                                            <h3 className="font-medium text-white text-base">
                                                Token details
                                            </h3>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                            <h3 className=" font-medium text-[#898582] text-sm">
                                                Token name
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                                SaleFish
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                                Token address
                                            </h3>
                                            <button type='button' className="font-medium text-[#FFFFFF] text-sm">
                                                0x7Fefe59726c7c5f4BD7B0224F1FCfA58BAe508fc
                                            </button>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                                Token symbol
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                                SAF
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                                Total supply
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                                10,000,000
                                            </span>
                                        </div>

                                    </div>
                                </div>
                                <div className='w-full md:w-full lg:w-7/12'>

                                    <div className='bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]'>
                                        <div className='p-2'>
                                            <h3 className="font-medium text-white text-base">
                                                Stake details
                                            </h3>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className=" font-medium text-[#898582] text-sm">
                                            Stake name
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            DENNIE
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            Minimum stake 
                                            </h3>
                                            <button type='button' className="font-medium text-[#FFFFFF] text-sm font-wrap">
                                            100 EDU
                                            </button>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            Hard cap
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            200 EDU
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            Start date
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            Tue, 13 Aug 2024 . 2:00PM
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            End date
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm ">
                                            Wed, 18 Aug 2024 . 2:00PM
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            EDU Reward
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            Yes
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            Unstake time
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            30 days, 60 days, 90 days
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            Reward EDU APY
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            4
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            Reward Token APY
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            60
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    ): 
                ''} */}
                </div>

                <Box mt={4}>
                    <div className="flex items-center justify-center w-full gap-3 flex-wrap">
                        {activeStep < steps.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                            >
                                Next
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleFinish}
                                    className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                                >
                                    Approve presale
                                </button>

                                <button
                                    onClick={handleFinish}
                                    disabled
                                    aria-disabled="true"
                                    className="bg-[#393737] text-[#878483] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                                >
                                    Create presale
                                </button>
                            </>
                        )}
                    </div>
                    <div className="mt-4">
                        <p className="font-medium text-[#878483] text-center text-sm">
                            You will be charged $500 worth of DENNIE token to create this sale
                        </p>
                    </div>
                </Box>
            </div>

            <ApprovePresales
                isOpen={approveSalesIsOpen}
                onClose={onApproveSalesClose}
                handleCloseSelectPlan={handleCloseSelectPlan}
            />

            <SavePresalesProgress isOpen={savingProgressIsOpen} onClose={onSavingProgressClose} />
        </>
    );
}
