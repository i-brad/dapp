'use client'
import { useDisclosure } from '@chakra-ui/react';
import React from 'react'
import ClaimAirdrop from '../Modals/ClaimAirdrop';
import Link from 'next/link';

const CollectionItem = () => {
    const {
        isOpen: claimAirdropIsOpen,
        onOpen: onClaimAirdropOpen,
        onClose: onClaimAirdropClose,
    } = useDisclosure();


    return (
        <>
            <div className='bg-[#272727] min-h-[250px] p-6 rounded-lg font-medium relative hover:translate-y-[-20px] transition-all duration-300 ease-linear group'>
                <div className='flex flex-col gap-4 justify-between h-full'>
                    
                    <div className="flex flex-row items-center gap-2 justify-between">
                        <Link href={'/airdrop/1'} className='group-hover:underline'>
                            <h1 className="font-medium text-white text-base">
                                Deenie Private Batch 1
                            </h1>
                        </Link>
                        <div className='bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2'>
                            Eligible
                        </div>
                    </div>

                    <div className='flex items-center justify-between gap-4 flex-wrap w-full'>
                        <div className='flex font-medium  gap-2 flex-col'>
                            <p className='text-xs text-[#898582]'>Soft cap</p>
                            <p className='text-sn text-[#FFFFFF]'>Hard cap</p>
                        </div>
                        <div className='flex font-medium  gap-2 flex-col'>
                            <p className='text-xs text-[#898582]'>Total Token</p>
                            <p className='text-sn text-[#FFFFFF]'>500 000</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-between gap-4 flex-wrap w-full'>
                        <div className='flex font-medium  gap-2 flex-col'>
                            <p className='text-xs text-[#898582]'>Quantity per person</p>
                            <p className='text-sn text-[#FFFFFF]'>100</p>
                        </div>
                        <div className='flex font-medium  gap-2 flex-col w-full md:w-auto'>
                            <button 
                            onClick={onClaimAirdropOpen}
                                className="w-full min-w-32 whitespace-nowrap py-3 px-5 bg-[#089864] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded-lg flex items-center justify-center gap-2 "
                            >
                                Claim
                            </button>
                        </div>
                    </div>


                </div>
            </div>

            <ClaimAirdrop isOpen={claimAirdropIsOpen} onClose={onClaimAirdropClose}/>
        </>
    )
}

export default CollectionItem
