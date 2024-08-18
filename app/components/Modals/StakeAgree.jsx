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

const StakeAgree = ({ isOpen, onClose }) => {
    const handleClose = (e) => {
        console.log('here')
        onClose();
    }
    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay 
                bg={'#272727E5'} 
                backdropFilter='blur(10px) hue-rotate(90deg)'

        />
            <ModalContent className='bg-[#303030] text-white min-h-[300px] py-[25px] px-6'>
                <ModalCloseButton autoFocus={false} className='focus:ring-0 focus:outline-none'/>
                <ModalBody>
                    <div className='flex items-center flex-col justify-center gap-4 max-w-md text-center'>
                        <div className="w-36 flex h-36 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                            <Image
                                src={"/images/coin.png"}
                                alt={"fall-back"}
                                fill
                                className="rounded-t-[16px] w-full h-full object-cover object-center"
                                priority
                            />
                        </div>


                        <div>
                            <p>You will be charged 10 EDU for creating a stake campaign</p>
                        </div>
                        <div className='flex items-center justify-center w-full mt-4'>
                            <button className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] max-w-[250px] whitespace-nowrap 
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                                onClick={()=>handleClose()}
                            >
                                I agree
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default StakeAgree
