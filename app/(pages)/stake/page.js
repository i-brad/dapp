'use client'
import React, { useEffect } from 'react';
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import StakeAgree from '@/app/components/Modals/StakeAgree';
import Link from 'next/link';
import StepperStake from '@/app/components/Steps/Stepper';
import Image from 'next/image';

const Stake = () => {
    const {
        isOpen: stakeAgreeIsOpen,
        onOpen: onStakeAgreeOpen,
        onClose: onStakeAgreeClose,
    } = useDisclosure();

    useEffect(() => {
        const timer = setTimeout(() => {
            onStakeAgreeOpen();
        }, 0);

        return () => clearTimeout(timer);
    }, [onStakeAgreeOpen]);


    return (
        <>
            <div className="flex flex-row items-center justify-between mb-8">
                <h1 className='font-medium text-2xl lg:text-4xl'>Stake</h1>
                <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">
                    {/* <Tooltip hasArrow label='Watch how to create a Fair Launch' placement='top'> */}

                        <Link
                            href={'/lock/create-lock'}
                            className="w-auto whitespace-nowrap py-3 px-5 bg-[#313131] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                        >   
                            <span>
                                <div className="w-6 h-6 relative overflow-hidden block object-contain rounded-full">
                                    <Image
                                        src={"/images/youtube.svg"}
                                        alt={"fall-back"}
                                        fill
                                        className="rounded-t-[16px] w-full h-full object-cover object-center"
                                        priority
                                    />
                                </div>
                            </span>
                            <p className='hidden md:block'>Watch how to create a Fair Launch</p>
                        </Link>
                    {/* </Tooltip> */}
                </div>
            </div>




            <div className='py-4 md:py-8'>
                <StepperStake/>
            </div>

            <StakeAgree 
                isOpen={stakeAgreeIsOpen}            
                onClose={onStakeAgreeClose}
            />
        </>
    );
}

export default Stake;
