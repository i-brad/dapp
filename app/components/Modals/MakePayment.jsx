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

const MakePayment = ({ isOpen, onClose }) => {
    const handleClose = (e) => {
        console.log('here')
        onClose();
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
                <ModalOverlay 
                    bg={'#272727E5'} 
                    backdropFilter='blur(10px) hue-rotate(90deg)'

            />
                <ModalContent className='bg-[#303030] text-white py-[25px] rounded-2xl'>
                    <ModalHeader>Make payment</ModalHeader>
                    <ModalCloseButton autoFocus={false} className='focus:ring-0 focus:outline-none'/>
                    <ModalBody>
                        <div className='py-4'>

                            

                            <div className='w-full px-2 grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <button className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group'>
                                    <div className="p-2 w-full flex justify-between items-start flex-wrap  gap-3 flex-col text-left">
                                        <span className='text-base font-semibold text-[#F0EDED]'>
                                            Pay with token
                                        </span>

                                        <h3 className="font-semibold text-[#F0EDED] text-2xl">
                                            <span>0.1 %</span>
                                        </h3>

                                        <div className='space-y-2'>
                                            <p className="text-[#F0EDED] text-base">
                                                You'll be charged 1.65 EDU token in addition to the contract amount                                        </p>
                                            <p className="text-[#F0EDED] text-base">
                                                Thrustpad fee is added on top of the contract amount. Also Thrustpad becomes one of the recipients of the airdrops and receives fees 
                                            </p>
                                        </div>

                                        {/* <Link href={'/lock/create-lock'} className='text-[#F08454] text-base font-medium group-hover:underline '>Create Lock</Link> */}
                                    </div>

                                </button>
                                <button className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group'>
                                    <div className="p-2 w-full flex justify-between items-start flex-wrap gap-3 flex-col text-left">
                                        <span className='text-base font-semibold text-[#F0EDED]'>
                                        Organization level client
                                        </span>
                                        <h3 className="font-semibold text-[#F0EDED] text-2xl flex items-center gap-2">
                                            <span>0.1 %</span>
                                        </h3>
                                        <div>
                                            <p className="text-[#F0EDED] text-base">
                                            Organisations can benefit from our team's priority help and reduced prices. 
                                            Contact us to arrange a call for a personalised fee quote.                                      
                                            </p>
                                        </div>

                                        <Link href={'/'} className='text-[#F08454] text-base font-medium w-full py-[10px] px-4 border border-[#787676] text-center rounded-lg'>Schedule a Call</Link>
                                    </div>

                                </button>
                            </div>
                                
                            <div className='flex items-center justify-center w-full mt-4'>
                                <button className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] w-full md:max-w-[250px] whitespace-nowrap 
                                    disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                    transition-all duration-75 border-none px-5 
                                    font-medium p-3 text-base text-white block text-center"
                                >
                                    Create airdrop
                                </button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MakePayment