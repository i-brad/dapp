'use client'
import { TelegramIcon, TwitterIcon2 } from '@/app/components/IconComponent';
import { Progress } from '@chakra-ui/react';
import { ArrowLeft, Copy, Global } from 'iconsax-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const SingleLock = () => {
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
                    <div className='w-full md:w-full lg:w-7/12'>

                        <div className='bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5'>
                            <div className="flex flex-row items-center gap-4">
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

                                </div>
                                <div className='font-medium flex flex-col gap-2'>
                                    <span className="text-white text-lg">
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
                                <p>
                                    Salefish is a network and real-world investment corporation and was created on top of the Solana network with the aim of creating 
                                    a community around it that believes in merging the real world with the potential of blockchain.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-white text-lg mb-2">
                                    Token Details
                                </h3>

                                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                            Token address
                                        </h3>
                                        <button type='button' className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap">
                                            0x7Fefe59726c7c5f4BD7B0224F1FCfA58BAe508fc
                                            <span className='text-[#898582]'><Copy size={14}/></span>
                                        </button>
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
                                Lock Details
                                </h3>

                                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                    <div className="p-2 w-full flex justify-between items-center  flex-wrap">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                            Token amount locked
                                        </h3>
                                        <button type='button' className="font-medium text-[#FFFFFF] text-xs inline-flex gap-1 items-center text-wrap">
                                            0x7Fefe59726c7c5f4BD7B0224F1FCfA58BAe508fc
                                            <span className='text-[#898582]'><Copy size={14}/></span>
                                        </button>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                            Owner
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            SaleFish
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                            Lock time
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            SAF
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                            Unlock time
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-xs">
                                            10,000,000
                                        </span>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='w-full md:w-full lg:w-5/12'>

                        <div className='bg-[#272727] rounded-lg px-5 py-4'>

                            <div className="p-2 w-full ">
                                <h3 className="font-medium text-white text-base">
                                    Collection Value
                                </h3>
                            </div>
                            <div className="px-2 py-4  border-y border-[#3B3939]">
                                <div className="flex flex-row justify-between items-center flex-wrap">
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="flex flex-row w-20">
                                            <div className="w-full h-20 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                                <Image
                                                    src={"/images/icon.png"}
                                                    alt={"fall-back"}
                                                    fill
                                                    className="rounded-t-[16px] w-full h-full object-cover object-center"
                                                    priority
                                                />
                                            </div>
                                            
                                        </div>
                                        <div className='font-medium flex flex-col'>
                                            <span className="text-white text-base">
                                            SaleFish
                                            </span>
                                            <span className="text-[#A19B99] text-base">
                                            SAF
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className="font-medium text-[#A19B99] text-sm">
                                            Lock time
                                        </span>
                                        <span className="font-medium text-white text-base">
                                            13 days, 2 hours, 10 mins
                                        </span>
                                    </div>
                                </div>
                                
                                <div className='pt-4 space-y-4'>
                                    <div className='space-y-2'>
                                        <div className='flex justify-between items-center text-[#ADB4B9] font-medium text-xs flex-wrap gap-2'>
                                            <span>
                                                Progress (10.00%)
                                            </span>
                                            <span className=''>
                                                Time left: 12 days, 12 hours, 6 mins
                                            </span>
                                        </div>

                                        <div className=''>
                                            <Progress colorScheme='orange' size='sm' value={20} className='text-[#EA6A32] rounded-lg' isAnimated={true} />
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center w-full'>
                                        <button className="bg-[#DA5921] hover:bg-[#DA5921] w-full md:w-1/2 whitespace-nowrap 
                                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                            transition-all duration-75 border-none px-5 
                                            font-medium p-3 text-base text-white block"
                                        >
                                            Withdraw Token
                                        </button>
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

export default SingleLock
