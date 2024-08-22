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
import { useRouter } from 'next/navigation';

const CreateLaunchPad = ({ isOpen, onClose }) => {
    const handleClose = (e) => {
        console.log('here')
        onClose();
    }
    const router = useRouter()
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
                <ModalOverlay 
                    bg={'#272727E5'} 
                    backdropFilter='blur(10px) hue-rotate(90deg)'

            />
                <ModalContent className='bg-[#303030] text-white min-h-[500px] py-[25px] rounded-2xl'>
                    <ModalHeader>Suggested Actions</ModalHeader>
                    <ModalCloseButton autoFocus={false} className='focus:ring-0 focus:outline-none'/>
                    <ModalBody>
                        <div className='py-4'>

                            

                            <div className='w-full px-2 grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <Link href={'/lock/create-lock'} className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group'>
                                    
                                    <div className="flex items-center justify-center w-full">
                                        <div className="w-36 flex h-36 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                            <Image
                                                src={"/images/lock.png"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1 space-y-1">
                                        <h3 className=" font-semibold text-[#F0EDED] text-base flex items-center gap-2">
                                        1. <span>Create Lock</span>
                                        </h3>
                                        <p className="text-[#F0EDED] text-base">
                                            If you are planning to have allocation for the team. 
                                            We suggest you Lock your tean token using our token 
                                            Locker so we can show it on your tokenomics.
                                        </p>

                                        <Link href={'/lock/create-lock'} className='text-[#F08454] text-base font-medium group-hover:underline '>Create Lock</Link>
                                    </div>

                                </Link>
                                <Link href={'/stake'} className='bg-[#414040] rounded-lg flex flex-col text-white py-[14px] px-4 group'>
                                    
                                    <div className="flex items-center justify-center w-full">
                                        <div className="w-36 flex h-36 min-h-[100px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                            <Image
                                                src={"/images/abstract-geometric.png"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1 space-y-1">
                                        <h3 className=" font-semibold text-[#F0EDED] text-base flex items-center gap-2">
                                            2. <span>Create Staking Campaign</span>
                                        </h3>
                                        <p className="text-[#F0EDED] text-base">
                                        By creating a staking campaign. You can incentivize uses with higher APY, 
                                        in both your token and Native tokens. 
                                        The may reduce selling pressure during level. 
                                        Users can stake starting from token sale between 9 months.
                                        </p>
                                        <Link href={'/stake'} className='text-[#F08454] text-base font-medium group-hover:underline'>Create Staking</Link>
                                    </div>

                                </Link>
                            </div>
                                
                            <div className='flex items-center justify-center w-full mt-4'>
                                <a href={'/fair-launch/create'} className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] w-full md:max-w-[250px] whitespace-nowrap 
                                    disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                    transition-all duration-75 border-none px-5 
                                    font-medium p-3 text-base text-white block text-center"
                                >
                                    Continue to create launch
                                </a>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateLaunchPad
