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

const ClaimAirdrop = ({ isOpen, onClose }) => {
    const handleClose = (e) => {
        console.log('here')
        onClose();
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg">
                <ModalOverlay 
                    bg={'#272727E5'} 
                    backdropFilter='blur(10px) hue-rotate(90deg)'

            />
                <ModalContent className='bg-[#303030] text-white min-h-[400px] py-[25px] px-6 rounded-2xl'>
                    <ModalCloseButton autoFocus={false} className='focus:ring-0 focus:outline-none'/>
                    <ModalBody>
                        <div className=''>
                            <div className="flex items-center h-full w-full justify-center py-6 text-center flex-col gap-4">
                                <div className='flex items-center h-full w-full justify-center flex-col'> 
                                    <div className="w-44 flex h-44 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                        <Image
                                            src={"/images/parachute.png"}
                                            alt={"fall-back"}
                                            fill
                                            className="rounded-t-[16px] w-full h-full object-cover object-center"
                                            priority
                                        />
                                    </div>

                                    <p className="text-xl text-white mt-3 font-medium ">Claim 200 DEENIE to your wallet</p>

                                </div>
                                <div className='flex font-medium  gap-2 flex-col w-full md:w-auto'>
                                    <button 
                                        className="w-full min-w-32 whitespace-nowrap py-3 px-5 bg-[#DA5921] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded-lg flex items-center justify-center gap-2 "
                                    >
                                        Claim
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ClaimAirdrop
