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

const SavedTokenSuccess = ({ isOpen, onClose }) => {
    const handleClose = (e) => {
        console.log('here')
        onClose();
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay 
                    bg={'#272727E5'} 
                    backdropFilter='blur(10px) hue-rotate(90deg)'

            />
                <ModalContent className='bg-[#303030] text-white min-h-[500px] py-[25px] rounded-2xl'>

                    <ModalCloseButton autoFocus={false} className='focus:ring-0 focus:outline-none'/>
                    <ModalBody>
                        <div className='py-4'>
                            <div className='space-y-3'>

                                <div className="flex items-center justify-center w-full">
                                    <div className="w-44 flex h-44 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                        <Image
                                            src={"/images/success.gif"}
                                            alt={"fall-back"}
                                            fill
                                            className="rounded-t-[16px] w-full h-full object-cover object-center"
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className='text-center space-y-2'>
                                    <p className='text-[#A9A4A2] text-sm'>Token Address</p>
                                    <h3 className='text-base font-medium'>
                                        ADDResr32rt5y3DFKLOL6ti70UHUFG
                                    </h3>
                                    <button className='text-[15px] text-[#B3AFAD] inline-flex items-center gap-1'>
                                        <span className='text-[#FFA178]'>
                                            <CopyIcon size={12}/>
                                        </span>
                                        Copy
                                    </button>
                                </div>

                                <div className='w-full px-2'>
                                    <div className='p-2'>
                                        <h3 className="font-medium text-white text-base">
                                            Token details
                                        </h3>
                                    </div>
                                    <div className='bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-4'>
                                        
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                            <h3 className=" font-medium text-[#898582] text-sm">
                                                Token name
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                                SaleFish
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                                Token symbol
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                                SAF
                                            </span>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                                Token decimal
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                                6
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
                                        <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                            <h3 className="font-medium text-[#898582] text-sm">
                                            Logo URL
                                            </h3>
                                            <span className="font-medium text-[#FFFFFF] text-sm">
                                            https://Salefish.com
                                            </span>
                                        </div>

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SavedTokenSuccess
