import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
import Image from 'next/image';
import { CopyIcon } from '../IconComponent';
import Link from 'next/link';

const ApprovePresales = ({ isOpen, onClose, handleClose, handleCloseSelectPlan }) => {
    // const handleClose = (e) => {
    //     console.log('here')
    //     onClose();
    // }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
                <ModalOverlay 
                    bg={'#272727E5'} 
                    backdropFilter='blur(10px) hue-rotate(90deg)'

            />
                <ModalContent className='bg-[#303030] text-white min-h-[500px] py-[25px] rounded-2xl'>
                    <ModalHeader>Select Fee payment tier</ModalHeader>
                    <ModalCloseButton autoFocus={false} className='focus:ring-0 focus:outline-none'/>
                    <ModalBody>
                        <div className='py-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 w-full px-2 w-full gap-3'>
                                <div className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group min-h-[250px] max-h-[300px] justify-between'>
                                    <div className="flex items-center justify-start w-full">
                                        <div className="w-16 flex h-16 relative overflow-hidden featured__card_img block object-contain rounded-full">
                                            <Image
                                                src={"/images/stairs-abstract-geometric-shapes-background.svg"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="py-2 w-full  gap-1 space-y-2  min-h-24">
                                        <h3 className=" font-semibold text-[#F0EDED] text-base flex items-center gap-2">
                                            <span>Standard</span>
                                        </h3>
                                        <div className='text-[#F0EDED] text-sm'>
                                            <p>The most common tier without any special perks</p>
                                        </div>
                                    </div>
                                    <div className='text-[#F08454] text-base font-medium'>
                                        <h3 className='text-sm text-[#DCDCDC] inline-flex items-center gap-2'>Fee <span className='text-[#F08454] font-semibold text-xl'>100 EDU</span></h3>
                                    </div>
                                </div>

                                <div className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group min-h-[250px] max-h-[300px] justify-between'>
                                    

                                    <div className="flex items-center justify-start w-full">
                                        <div className="w-16 flex h-16 relative overflow-hidden featured__card_img block object-contain rounded-full">
                                            <Image
                                                src={"/images/polygonal-shapes 3.svg"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="py-2 w-full  gap-1 space-y-2 min-h-24">
                                        <h3 className=" font-semibold text-[#F0EDED] text-base flex items-center gap-2">
                                            <span>Standard</span>
                                        </h3>
                                        <div>
                                            <ul className=' list-inside list-disc text-[#F0EDED] text-sm'>
                                                <li>
                                                    Telegram Channel Annoucement
                                                </li>
                                                <li>
                                                Audit Badge
                                                </li>
                                                <li>
                                                KYC Badge
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='text-[#F08454] text-base font-medium'>
                                        <h3 className='text-sm text-[#DCDCDC] inline-flex items-center gap-2'>Fee <span className='text-[#F08454] font-semibold text-xl'>200 EDU</span></h3>
                                    </div>
                                </div>

                                <div className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group min-h-[250px] max-h-[300px] justify-between'>
                                    

                                    <div className="flex items-center justify-start w-full">
                                        <div className="w-16 flex h-16 relative overflow-hidden featured__card_img block object-contain rounded-full">
                                            <Image
                                                src={"/images/polygonal-shapes.svg"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="py-2 w-full  gap-1 space-y-2 min-h-24">
                                        <h3 className=" font-semibold text-[#F0EDED] text-base flex items-center gap-2">
                                            <span>Premium</span>
                                        </h3>
                                        <div className='flex justify-start gap-3'>
                                            <ul className=' list-inside list-disc text-[#F0EDED] text-sm'>
                                                <li>
                                                    Audit Badge
                                                </li>
                                                <li>
                                                    KYC Badge
                                                </li>
                                                <li>
                                                    Telegram Buybot
                                                </li>
                                            </ul>
                                            <ul className=' list-inside list-disc text-[#F0EDED] text-sm'>
                                                <li>
                                                    Featured Banner Ads
                                                </li>
                                                <li>
                                                    Annoucement on all Socials
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='text-[#F08454] text-base font-medium'>
                                        <h3 className='text-sm text-[#DCDCDC] inline-flex items-center gap-2'>Fee <span className='text-[#F08454] font-semibold text-xl'>500 EDU</span></h3>
                                    </div>
                                </div>

                                <div className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group min-h-[250px] max-h-[300px] justify-between'>
                                    <div className="flex items-center justify-start w-full">
                                        <div className="w-16 flex h-16 relative overflow-hidden featured__card_img block object-contain rounded-full">
                                            <Image
                                                src={"/images/polygonal-shapes 1.svg"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="py-2 w-full  gap-1 space-y-2 min-h-24">
                                        <h3 className=" font-semibold text-[#F0EDED] text-base flex items-center gap-2">
                                            <span>Standard</span>
                                        </h3>
                                        <div className='flex justify-start gap-3'>
                                            <ul className=' list-inside list-disc text-[#F0EDED] text-sm'>
                                                <li>
                                                    Audit Badge
                                                </li>
                                                <li>
                                                    KYC Badge
                                                </li>
                                                <li>
                                                    Telegram Buybot
                                                </li>
                                            </ul>
                                            <ul className=' list-inside list-disc text-[#F0EDED] text-sm'>
                                                <li>
                                                    Hero Banner Ads
                                                </li>
                                                <li>
                                                    Project Advisory
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                    <div className='text-[#F08454] text-base font-medium'>
                                        <h3 className='text-sm text-[#DCDCDC] inline-flex items-center gap-2'>Fee <span className='text-[#F08454] font-semibold text-xl'>200 EDU</span></h3>
                                    </div>
                                </div>
                            </div>
                                
                            <div className='flex items-center justify-center w-full mt-4'>
                                <button type='button' onClick={handleCloseSelectPlan} className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] w-full md:max-w-[250px] whitespace-nowrap 
                                    disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                    transition-all duration-75 border-none px-5 
                                    font-medium p-3 text-base text-white block"
                                >
                                    Create Presale
                                </button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ApprovePresales
