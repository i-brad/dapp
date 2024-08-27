"use client";
import { formDataToObject } from "@/app/lib/utils";
import { StakeFactoryAbi } from "@/app/providers/abis/stake-factory";
import { TokenAbi } from "@/app/providers/abis/token";
import { StakeFactory } from "@/app/providers/address";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { Checkmark } from "@carbon/icons-react";
import {
    Box,
    Button,
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
    useSteps,
    useToast,
} from "@chakra-ui/react";
import { ethers, formatEther, getAddress } from "ethers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { useAccount } from "wagmi";

const steps = [
    {
        title: "Verify Token",
        description: "Enter token details or create a token for staking and reward",
    },
    {
        title: "Staking Details",
        description: "Add all necessary details of your stake",
    },
    { title: "Submit", description: "Completed token details gets listed" },
];

export default function StepperStake() {
    const { isConnected, address } = useAccount();
    const [activeStep, setActiveStep] = useState(0);
    const stepperRef = useRef(null);
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenDetails, setTokenDetails] = useState(null);
    const [dataToSend, setDataToSend] = useState({});
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [stakeApproved, setStakeApproved] = useState(false);
    const [stakerAddress, setStakerAddress] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (stepperRef.current) {
            stepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [activeStep]);

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

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const createStakeHandler = async () => {
        try {
            setLoading(true);
            //save to db
            const savedToDB = await fetch("/api/stake", {
                method: "POST",
                body: JSON.stringify({
                    ...dataToSend,
                    owner_address: address,
                    stake_address: stakerAddress,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (savedToDB.ok) {
                const newStake = await savedToDB.json();

                toast({
                    title: "Stake created successfully.",
                    description: `Stake ID: ${newStake?.stake?._id}`,
                    status: "success",
                    duration: 2000,
                });

                router.push(`/stake/${newStake?.stake?._id}`);
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

    const handleFinish = async () => {
        try {
            setLoading(true);

            console.log(dataToSend?.start_date, dataToSend?.end_date);
            const currBlockTime = new Date(dataToSend?.start_date) / 1000;

            const futureBlockTime = new Date(dataToSend?.end_date) / 1000;

            const options = {
                token: tokenAddress, //token
                startDate: currBlockTime, //start time
                endDate: futureBlockTime, //end time
                hardCap: ethers.parseEther(dataToSend?.hard_cap.toString()), //hardcap
                minTokenStake: ethers.parseEther(dataToSend?.minimum_stake_limit?.toString()), //minimum stake
                apyEdu: dataToSend?.edu_apy, //eduAPY   cannot be less than 2%
                apyToken: dataToSend?.token_apy, //tokenAPY cannot be less than 8%
                rewardPoolToken: ethers.parseEther(dataToSend?.reward_deposit_token.toString()), //total reward pool token,
                rewardPoolEDU: ethers.parseEther(dataToSend?.reward_deposit_edu.toString()), //total reward pool edu,
                tokenToEDURate: dataToSend?.stake_rate, //rate meaning 1 edu = 10,000 token : help to calculate reward since no price oracle to get live price
            };

            const signer = await getEthersSigner(config);

            const factory = new ethers.Contract(StakeFactory, StakeFactoryAbi, signer);

            console.log({ options });

            if (!stakeApproved) {
                const byteCode = await factory.getBytecode(options);
                const salt = await factory.getdeployedStakersLen(address);
                const staker_address = await factory.getAddressCreate2(byteCode, salt);

                if (staker_address) {
                    setStakerAddress(staker_address);
                }

                const token = new ethers.Contract(tokenAddress, TokenAbi, signer);

                const amount = ethers.parseEther(dataToSend?.reward_deposit_token.toString());
                const approveToken = await token.approve(StakeFactory, amount);
                await approveToken.wait();
                if (approveToken) {
                    setStakeApproved(true);
                }
                return;
            }

            const response = await factory.newStaker(options, {
                value: options.rewardPoolEDU,
            });

            await response.wait();
         
            if (response) {
                await createStakeHandler();
            }
        } catch (error) {
            console.error("failed to finish", error);
            const message = error?.message?.split("(")?.[0];
            toast({
                title: "Error creating stake.",
                description: message || "Failed",
                status: "error",
                duration: 2000,
            });
        } finally {
            setLoading(false);
        }
    };
    const isActive = (index) => activeStep === index;
    const isCompleted = (index) => activeStep > index;

    const periods = [
        {
            id: 1,
            period: "30 days",
        },
        {
            id: 2,
            period: "45 days",
        },
        {
            id: 3,
            period: "60 days",
        },
        {
            id: 4,
            period: "90 days",
        },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = formDataToObject(formData);
        console.log({ ...data, ...tokenDetails });

        const hard_cap = parseInt(data.hard_cap);
        const token_apy = parseInt(data.token_apy);
        const edu_apy = parseInt(data.edu_apy);
        const stake_rate = parseInt(data.stake_rate);
        const minimum_stake_limit = parseInt(data.minimum_stake_limit);

        const rewardDepositToken = hard_cap * (token_apy / 100); //8% tokenAPY
        const rewardDepositEdu = (hard_cap * (edu_apy / 100)) / stake_rate; //2% eduAPY

        setDataToSend({
            ...data,
            token_name: tokenDetails?.token_name,
            token_symbol: tokenDetails?.token_symbol,
            token_address: tokenAddress,
            token_supply: formatEther(tokenDetails?.total_supply),
            hard_cap,
            token_apy,
            edu_apy,
            stake_rate,
            minimum_stake_limit,
            reward_deposit_edu: rewardDepositEdu,
            reward_deposit_token: rewardDepositToken,
            staking_periods: [30, 45, 60, 90],
        });

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
                                    <div className="relative flex flex-col w-full gap-1 mb-6">
                                        <div className="flex flex-wrap items-center justify-between mb-1">
                                            <label
                                                htmlFor="address"
                                                className="text-sm text-[#FFFCFB] "
                                            >
                                                Token Address
                                            </label>
                                            <Link
                                                href={"/token"}
                                                className="text-[#CCDCDF] text-base p-2 px-4 rounded-3xl border border-[#A8B8C2]"
                                            >
                                                Create Token
                                            </Link>
                                        </div>
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

                                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                Token Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="block px-2 w-full disabled:bg-[#3E3D3C] text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                value={tokenDetails?.token_name}
                                                name="name"
                                                disabled
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
                                                className="block px-2 w-full text-sm text-white disabled:bg-[#3E3D3C] border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                value={tokenDetails?.token_symbol}
                                                name="symbol"
                                                disabled
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-4 flex-wrap items-center justify-center w-full gap-3">
                                <button
                                    onClick={handleNext}
                                    type={"button"}
                                    disabled={
                                        loading || !isConnected || !tokenDetails || !isAddressValid
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
                                    <div className="relative flex flex-col w-full gap-1 mb-6">
                                        <div className="mb-1">
                                            <label
                                                htmlFor="address"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                Stake name
                                            </label>
                                            <p className="text-[#898582] text-xs">
                                                This would be seen by all community members
                                            </p>
                                        </div>
                                        <input
                                            type="text"
                                            id="stake_name"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder=""
                                            name="stake_name"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="relative flex flex-col w-full gap-1 mb-6">
                                        <label
                                            htmlFor="stake_description"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Stake description
                                        </label>
                                        <textarea
                                            rows={5}
                                            className="block p-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent resize-none rounded-md focus:outline-0"
                                            required
                                            name="stake_description"
                                            id="stake_description"
                                        ></textarea>
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
                                                    Date to begin staking
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
                                                    End date needs to be set as minimum 24h of start
                                                    date
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
                                                <label className="text-sm text-[#FFFCFB] mb-1">
                                                    Staking Periods
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Date to unstake all tokens
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {periods?.map((period, index) => (
                                                    <label
                                                        key={index}
                                                        htmlFor={`period_${period.id}`}
                                                        className="mr-4 border border-[#464849] rounded p-2 cursor-pointer "
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`period_${period.id}`}
                                                            className="mr-2 caret-[#FFA178]"
                                                            checked
                                                            readOnly
                                                            required
                                                            autoComplete="off"
                                                        />
                                                        {period.period}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="stake_rate"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Rate
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    How many of your {tokenDetails?.token_symbol}{" "}
                                                    tokens is worth 1 EDU
                                                </p>
                                            </div>
                                            <input
                                                type="number"
                                                id="stake_rate"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder={`e.g; 1 EDU = 5000 ${tokenDetails?.token_symbol}`}
                                                name="stake_rate"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                            <label
                                                htmlFor="edu_apy"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                APY in EDU
                                            </label>
                                            <input
                                                type="number"
                                                id="edu_apy"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="e.g: 5%"
                                                name="edu_apy"
                                                required
                                                min={2}
                                                max={100}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                            <label
                                                htmlFor="token_apy"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                APY in Token
                                            </label>
                                            <input
                                                type="number"
                                                id="token_apy"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="e.g: 8%"
                                                name="token_apy"
                                                required
                                                min={8}
                                                max={100}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="hard_cap"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Stake Hard Cap
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Maximum amount of token that can be staked
                                                </p>
                                            </div>
                                            <input
                                                type="number"
                                                id="hard_cap"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                name="hard_cap"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                            <div className="mb-1">
                                                <label
                                                    htmlFor="minimum_stake_limit"
                                                    className="text-sm text-[#FFFCFB] mb-1"
                                                >
                                                    Minimum limit to stake
                                                </label>
                                                <p className="text-[#898582] text-xs">
                                                    Minimum amount that can be staked
                                                </p>
                                            </div>
                                            <input
                                                type="number"
                                                id="minimum_stake_limit"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                name="minimum_stake_limit"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-4 items-center justify-center w-full gap-3">
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
                                    Stake Review
                                </h3>
                                <div className="flex flex-wrap gap-8 lg:flex-nowrap">
                                    <div className="w-full md:w-full lg:w-5/12">
                                        <div className="bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]">
                                            <div className="p-2">
                                                <h3 className="text-base font-medium text-white">
                                                    Token details
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                    Token name
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    {dataToSend?.token_name}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Token address
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="font-medium text-[#FFFFFF] text-sm"
                                                >
                                                    {tokenAddress}
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
                                                    Total supply
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    {dataToSend?.token_supply?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-full lg:w-7/12">
                                        <div className="bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]">
                                            <div className="p-2">
                                                <h3 className="text-base font-medium text-white">
                                                    Stake details
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                    Stake name
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    {dataToSend?.stake_name}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Minimum stake
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="font-medium text-[#FFFFFF] text-sm font-wrap"
                                                >
                                                    {dataToSend?.minimum_stake_limit}{" "}
                                                    {tokenDetails?.token_symbol}
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Hard cap
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    {dataToSend?.hard_cap}{" "}
                                                    {tokenDetails?.token_symbol}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Start date
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    {dataToSend?.start_date}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    End date
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm ">
                                                    {dataToSend?.end_date}
                                                </span>
                                            </div>
                                            {/* <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                        <h3 className="font-medium text-[#898582] text-sm">
                          EDU Reward
                        </h3>
                        <span className="font-medium text-[#FFFFFF] text-sm">
                          Yes
                        </span>
                      </div> */}
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Staking Periods
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    30 days, 45 days, 60 days, 90 days
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Reward Pool EDU
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    {dataToSend?.reward_deposit_edu}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between w-full gap-1 p-2">
                                                <h3 className="font-medium text-[#898582] text-sm">
                                                    Reward Pool {tokenDetails?.token_symbol}
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-sm">
                                                    {dataToSend?.reward_deposit_token}{" "}
                                                </span>
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
            </div>
            {activeStep === 2 ? (
                <div className="flex flex-wrap items-center justify-center w-full gap-3">
                    <button
                        disabled={loading || !isConnected || stakeApproved}
                        onClick={handleFinish}
                        aria-disabled="true"
                        className={`${
                            stakeApproved
                                ? "bg-[#393737] text-[#878483]"
                                : "bg-[#DA5921] text-white"
                        } min-w-[200px] whitespace-nowrap w-full md:w-auto
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base block`}
                    >
                        {loading && !stakeApproved
                            ? "Approving..."
                            : stakeApproved
                            ? "Stake Approved"
                            : "Approve stake"}
                    </button>

                    <button
                        onClick={handleFinish}
                        disabled={loading || !isConnected || !stakeApproved}
                        aria-disabled="true"
                        className={`${
                            stakeApproved
                                ? "bg-[#DA5921] text-white"
                                : "bg-[#393737] text-[#878483]"
                        } min-w-[200px] whitespace-nowrap w-full md:w-auto
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base block`}
                    >
                        {loading && stakeApproved ? "Creating stake..." : "Create stake"}
                    </button>
                </div>
            ) : null}
        </>
    );
}
