'use client'
import TokenChart from '@/app/components/Charts/TokenChart';
import { TelegramIcon, TwitterIcon2 } from '@/app/components/IconComponent';
import { Progress } from '@chakra-ui/react';
import { ArrowLeft, Copy, Global } from 'iconsax-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const SingleStake = () => {

    const router = useRouter();
    return (
        <>
            <div className='text-white'>
                <div>
                    <button type='button' onClick={()=>router.back()} className='flex items-center gap-2'>
                        <ArrowLeft /> Back
                    </button>
                </div>
                <div className='flex gap-8 py-12 flex-wrap lg:flex-nowrap'>
                    <div className='w-full md:w-full lg:w-7/12 space-y-8'>

                        <div className='bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5 relative'>

                            <div className='bg-[#353432] text-[#F9C33F] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 absolute right-5 top-5'>
                                <span className='h-1 w-1 rounded-full bg-[#F9C33F] block'></span>
                                Upcoming
                            </div>

                            <div className="flex flex-row items-center gap-4">
                                <div className='relative'>
                                    <div className="w-36">
                                        <div className="w-full flex h-36 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                            <Image
                                                src={"/images/icon.png"}
                                                alt={"fall-back"}
                                                fill
                                                className="rounded-t-[16px] w-full h-full object-cover object-center"
                                                priority
                                            />
                                        </div>

                                        <div className="w-5 h-5 overflow-hidden block object-contain rounded-full absolute bottom-0 right-6">
                                            <Image
                                                src={"/images/opencampus-edu.png"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-cover object-center"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='font-medium flex flex-col gap-2'>
                                    <span className="text-white text-lg uppercase">
                                        SaleFish
                                    </span>
                                    <div className="text-[#A19B99] text-base flex items-center gap-2">
                                        <button className='bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full'>
                                            <Global size={22}/>
                                        </button>
                                        <button className='bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full'>
                                            <TelegramIcon/>
                                        </button>
                                        <button className='bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full'>
                                            <TwitterIcon2 width={22} height={22}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='text-sm'>
                                    Salefish is a network and real-world investment corporation and was created on top of 
                                    the EDUCHAIN network with the aim of creating a community around it that believes 
                                    in merging the real world with the potential of blockchain.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-white text-lg mb-2">
                                    Token Details
                                </h3>

                                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        Presale address
                                        </h3>
                                        <div>
                                            <button type='button' className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap">
                                            0x7Fefe59726c7c5f4BD7B0224F1FCfA58BAe508fc
                                                <span className='text-[#898582]'><Copy size={14}/></span>
                                            </button>   
                                            <p className='text-[10px] text-[#FF8789] text-right'>Do not send EDU to this pool address</p>
                                        </div>
                                        
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                            Token name
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            SaleFish
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                            Token symbol
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            SAF
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                            Total supply
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            10,000,000
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-white text-lg mb-2">
                                    Stake Details
                                </h3>

                                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                    
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Stake name
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                        SAF
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Minimum stake 
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            100 EDU
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Hard cap
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                        200 EDU
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Start date
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                        Tue, 13 Aug 2024 . 2:00PM
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        End date
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                        Tue, 13 Aug 2024 . 2:00PM
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Minimum unstake time
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                        30 days
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Reward EDU APY
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                        4
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Reward Token APY
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                        60
                                        </span>
                                    </div>
                                    

                                </div>
                            </div>


                        </div>
                    </div>

                    <div className='w-full md:w-full lg:w-5/12'>

                        <div className='bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5'>

                            <div>
                                <div className="py-2 w-full ">
                                    <h3 className="font-medium text-white text-base">
                                        Presale ends in
                                    </h3>
                                </div>
                                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                    <div className="flex justify-center flex-wrap gap-2.5 md:gap-4">
                                        <div className="text-center">
                                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">06</div>
                                            <p className="text-GreyCloud text-xs md:text-sm">Day</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">18</div>
                                            <p className="text-GreyCloud text-xs md:text-sm">Hr</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">54</div>
                                            <p className="text-GreyCloud text-xs md:text-sm">Min</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">02</div>
                                            <p className="text-GreyCloud text-xs md:text-sm">Sec</p>
                                        </div>
                                    </div>
                                    
                                    <div className='pt-4 space-y-4'>
                                        <div className='space-y-2'>
                                            <div className='flex justify-between items-center text-[#ADB4B9] font-medium text-xs flex-wrap gap-2'>
                                                <span>
                                                    Progress (10.00%)
                                                </span>
                                            </div>

                                            <div className=''>
                                                <Progress colorScheme='orange' size='sm' value={20} className='text-[#EA6A32] rounded-lg bg-[#4B4A4A]' isAnimated={true} />
                                                <div className='inline-flex items-center justify-between w-full text-[#ADB4B9] text-xs'>
                                                    <span>
                                                        0 EDU
                                                    </span>
                                                    <span>
                                                        200 EDU
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white text-base mb-3">
                                            Stake
                                            </h3>
                                            <div className='space-y-3'>
                                                <div className="flex flex-col gap-1 relative w-full">
                                                    <div className='mb-1 flex items-center justify-between'>
                                                        <label
                                                            htmlFor='amount'
                                                            className="text-sm text-[#FFFCFB] font-medium"
                                                        >
                                                        Amount
                                                        </label>
                                                        <p className='text-[#898582] text-xs'>Available: <span className='text-[#FFA178]'>300 EDU</span></p>
                                                    </div>

                                                    <div className=" relative w-full h-12">
                                                        
                                                        <div className="absolute inset-y-0 left-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-white px-3">
                                                                <div className="w-5 h-5 relative overflow-hidden block object-contain rounded-full">
                                                                    <Image
                                                                        src={"/images/Binance Coin (BNB).svg"}
                                                                        alt={"fall-back"}
                                                                        fill
                                                                        className="w-full h-full object-cover object-center"
                                                                        priority
                                                                    />
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            id="amount"
                                                            className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-12 pr-12 h-full text-white"
                                                            name="amount"
                                                            defaultValue={5}
                                                            autoComplete="off"
                                                        />
                                                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-[#FFA178] px-3 font-medium">
                                                                Max
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div>
                                                    <div className='mb-1 flex items-center justify-between'>
                                                        <label
                                                            className="text-sm text-[#FFFCFB] font-medium"
                                                        >
                                                            Staking period
                                                        </label>
                                                    </div>

                                                    <div className='flex items-center gap-2 justify-center flex-wrap w-full'>
                                                        <label htmlFor="period_1" className="mr-4 border border-[#464849] px-3 py-[10px] rounded-xl cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                id="period_1"
                                                                className="mr-2 cursor-pointer"
                                                                value={1}
                                                                name="period"
                                                                required
                                                                autoComplete="off"
                                                            />
                                                            30 days
                                                        </label>
                                                        <label htmlFor="period_2"  className="mr-4 border border-[#464849] px-3 py-[10px] rounded-xl cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                id="period_2"
                                                                className="mr-2 cursor-pointer"
                                                                value={2}
                                                                name="period"
                                                                autoComplete="off"
                                                            />
                                                            60 days
                                                        </label>
                                                        <label htmlFor="period_3"  className="mr-4 border border-[#464849] px-3 py-[10px] rounded-xl cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                id="period_3"
                                                                className="mr-2 cursor-pointer"
                                                                value={3}
                                                                name="period"
                                                                autoComplete="off"
                                                            />
                                                            90 days
                                                        </label>
                                                    </div>
                                                </div> 
                                                <div className="flex flex-col gap-1 relative w-full">
                                                    <div className='mb-1 flex items-center justify-between'>
                                                        <label
                                                            htmlFor='amount'
                                                            className="text-sm text-[#FFFCFB] font-medium"
                                                        >
                                                        Staking period
                                                        </label>
                                                    </div>

                                                    <div className=" relative w-full h-12">
                                                        
                                                        <div className="absolute inset-y-0 left-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-white px-3">
                                                                <div className="w-5 h-5 relative overflow-hidden block object-contain rounded-full">
                                                                    <Image
                                                                        src={"/images/Binance Coin (BNB).svg"}
                                                                        alt={"fall-back"}
                                                                        fill
                                                                        className="w-full h-full object-cover object-center"
                                                                        priority
                                                                    />
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            id="amount"
                                                            className="border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent rounded-md block w-full pl-12 pr-12 h-full text-white"
                                                            name="amount"
                                                            defaultValue={5}
                                                            autoComplete="off"
                                                        />
                                                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none h-full">
                                                            <span className="text-[#FFA178] px-3 font-medium">
                                                                Max
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex items-center justify-center w-full'>
                                            <button className="bg-[#DA5921] hover:bg-[#DA5921] w-full whitespace-nowrap 
                                                disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl 
                                                transition-all duration-75 border-none px-5 
                                                font-medium p-3 text-base text-white block text-center "
                                            >
                                                Stake
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div>

                                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                    <div className="py-2 w-full ">
                                        <h3 className="font-medium text-white text-base">
                                        Contribution
                                        </h3>
                                    </div>

                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        My staked amount
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            0 EDU
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        My withdrawn rewards
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            0 SAF
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        My withdrawable rewards
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            0 SAF
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SingleStake