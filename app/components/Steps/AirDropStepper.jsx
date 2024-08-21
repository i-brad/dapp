"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useDisclosure,
  useSteps,
} from '@chakra-ui/react';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Checkmark } from '@carbon/icons-react';
import MakePayment from '../Modals/MakePayment';

const steps = [
  { title: 'Choose type', description: 'select the type of airdrop to use' },
  { title: 'Add recipients', description: 'Add all recipients of your airdrop' },
  { title: 'Token details', description: 'Add all necessary details of your airdrop' },
  { title: 'Submit', description: 'Completed airdrop details gets listed' },
];

export default function AirDropStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [airDropType, setAirDropType] = useState(null);
    const [saleVesting, setSaleVesting] = useState(false);
    const stepperRef = useRef(null);

    const {
        isOpen: makePaymentAirdropOpen,
        onOpen: onMakePaymentAirdropOpen,
        onClose: onMakePaymentAirdropClose,
    } = useDisclosure();


    useEffect(() => {
      if (stepperRef.current) {
        stepperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, [activeStep]);
  

    const handleNext = () => {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    };

    const handleFinish = () => {
        onMakePaymentAirdropOpen();
    };

    const isActive = (index) => activeStep === index;
    const isCompleted = (index) => activeStep > index;

    return (
        <>

        <div ref={stepperRef}>
            <div >
                <div className="flex items-center sm:px-10 md:px-20 mb-3">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <span className={`presale-step-shadow size-6 rounded-full border-[1.5px]  flex justify-center items-center ${isCompleted(index) || isActive(index) ? 'border-[#FC9569]' : 'bg-[#3B3939] border-[#212121] '}`}>
                                {isCompleted(index) ? <Checkmark className='text-[#FC9569]' /> : <span className={`size-2 rounded-full ${ isCompleted(index) || isActive(index) ? 'bg-[#FC9569]': 'bg-[#575656]'}`}></span>}
                            </span>
                            {index < steps.length - 1 && (
                                <span className="h-0.5 bg-[#3B3939] flex-1">
                                    <span
                                        className={`block h-full ${
                                            isCompleted(index) ? 'bg-[#c76b4c] animate-moveProgress' : 'bg-[#3B3939]'
                                        }`}
                                    ></span>
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex justify-between gap-1">
                    {steps.map((step, index) =>(
                        <div className="max-w-[190px] text-center false" key={index}>
                            <p className={`text-[0.625rem] sm:text-sm md:text-base font-medium mb-0.5 ${isActive(index) ? 'text-[#EA6A32]': ''} ${isCompleted(index) ? 'text-white': 'text-[#A8B8C2]'}`}>{step.title}</p>
                            <p className={`hidden sm:block text-[0.625rem] md:text-sm text-Nebula ${isActive(index) || isCompleted(index) ? 'text-white': 'text-[#A8B8C2]'} `}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='py-6 md:mt-8'>

                {activeStep === 0 ? 
                    <>

                        <div className='bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg'>
                            <h3 className="font-medium text-white text-lg mb-2">
                            Choose Airdrop type 
                            </h3>

                            <div className='grid grid-cols-2 w-full gap-5 py-4'>
                                <button onClick={()=>{setAirDropType(1)}} 
                                    className={`bg-transparent border ${airDropType === 1 ? 'border-[#FFA178]': 'border-[#464849]' } hover:border-[#FFA178] rounded-lg flex flex-col text-white py-[14px] px-4 group `}>
                                    <div className="p-2 w-full flex justify-between items-start flex-wrap  gap-3 flex-col text-left">
                                        <div className="w-16 flex h-16 relative block object-contain">
                                            <Image
                                                src={"/images/three-dimensional-arrows-right.svg"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                        <h3 className="font-semibold text-[#F0EDED] text-2xl">
                                            <span>Instant airdrop</span>
                                        </h3>

                                        <div className='space-y-2'>
                                            <p className="text-[#838A8C] text-base">
                                                Create an airdrop that instantly release tokens to your recipients
                                            </p>
                                        </div>

                                    </div>

                                </button>
                                <button onClick={()=>{setAirDropType(2)}} 
                                    className={`bg-transparent border ${airDropType === 2 ? 'border-[#FFA178]': 'border-[#464849]' } hover:border-[#FFA178] rounded-lg flex flex-col text-white py-[14px] px-4 group `}>
                                    <div className="p-2 w-full flex justify-between items-start flex-wrap gap-3 flex-col text-left">
                                        <div className="w-16 flex h-16 relative block object-contain">
                                            <Image
                                                src={"/images/three-dimensional-arrows-left.svg"}
                                                alt={"fall-back"}
                                                fill
                                                className="w-full h-full object-contain object-center"
                                                priority
                                            />
                                        </div>
                                        <h3 className="font-semibold text-[#F0EDED] text-2xl flex items-center gap-2">
                                            <span>Vested airdrop</span>
                                        </h3>
                                        <div>
                                            <p className="text-[#838A8C] text-base">
                                            Create an airdrop that gradually releases tokens to your recipients after a certain period of time                                  
                                            </p>
                                        </div>

                                    </div>

                                </button>
                            </div>
                        
                        </div>
                    </> 
                    :
                    ''
                }

                {activeStep === 1 ? (
                    <>
                        <div className='bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg stepper'>
                            <div>
                                <div>
                                    <h3 className="font-medium text-white text-lg mb-2">
                                        Add Recipients
                                    </h3>
                                    <div className='text-[#AFACAB] space-y-4'>
                                        <div className='space-y-1'>
                                            <p className='text-sm'>Upload an existing CSV file, making sure the columns match our <Link href={'/'} className='text-[#FFA178]'>template document</Link>, to add recipients.</p>
                                            <p className='text-sm'>You can upload numerous CSV files to use as tiers if you would like to apply varying quantities of tokens.</p>
                                            <p className='text-sm'>You can also select from our pre-populated lists of well-liked projects.</p>
                                        </div>

                                        <div>
                                            <p className='text-sm'>There is a 150,000 recipient cap. <Link href={'/'} className='text-[#FFA178]'>Schedule a call</Link> to speak with us so we can use our CLI tool for greater airdrops.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='py-4 mt-6'>
                                    <div className='flex items-center justify-end mb-3'>
                                        <h3 className='text-sm text-[#AFACAB]'>Total Recipients: <span className='text-[#F0EDED] text-lg font-medium'>300</span></h3>
                                    </div>
                                    <div className='flex gap-4'>
                                        <div className="flex flex-shrink-0 flex-col gap-1 relative w-full max-w-xs h-full">
                        
                                            <label 
                                                htmlFor="logo" 
                                                className='border-[#464849] border-dashed px-2 py-4 w-full  h-full min-h-96  border rounded-md flex items-center justify-center cursor-pointer'>

                                                <div>
                                                    <div
                                                        className="text-sm text-[#A8B8C2] text-center">   
                                                        {/* {fileName ? (
                                                            <div className="text-base text-[#FFA178]">
                                                                {fileName}
                                                            </div>
                                                        ) : (
                                                            <> */}
                                                                <div className='flex flex-col gap-1'>
                                                                    <span className='text-[#FFA178] '>Upload a CSV file</span>
                                                                    <span> or Drag and drop to upload</span>
                                                                </div>
                                                            {/* </>
                                                        )} */}

                                                    </div>
                                                </div>


                                            
                                                <input
                                                    type="file"
                                                    id="logo"
                                                    className="block px-2 py-4 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border border-dashed bg-transparent  h-full rounded-md focus:outline-0 text-center flex items-center justify-center hidden"
                                                    name="logo"
                                                    required
                                                    accept=".csv"
                                                    // onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    
                                        <div className="overflow-x-auto flex scrollbar-change pb-2 gap-3">
                                            <div className="flex flex-col gap-1 min-w-64 max-w-72 w-64 h-full flex-shrink-0 border border-[#464849] hover:border-[#FFA178] p-3 rounded-md group cursor-pointer">
                                                <div className='w-full flex items-center justify-center max-h-40 h-40 bg-[#353333] rounded-lg'>

                                                    <div className="flex size-28 relative overflow-hidden block object-contain rounded-lg">
                                                        <Image
                                                            src={"/images/Asset.svg"}
                                                            alt={"fall-back"}
                                                            fill
                                                            className="rounded-lg w-full h-full object-contain object-center"
                                                            priority
                                                        />
                                                    </div>
                                                </div>


                                                <div className=' flex-1 flex flex-col justify-between'>

                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                            Airdrop to holders of
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                            Grasp
                                                        </h3>
                                                    </div>
                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                        Total Recipients
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                        1024
                                                        </h3>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap lg:flex-nowrap items-center gap-1'>
                                                        <div className="p-2 w-full flex justify-between items-start flex-col">
                                                            <span className="font-medium text-[#807D7C] text-xs">
                                                                Quantity per recipients
                                                            </span>
                                                            <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                100
                                                            </h3>
                                                        </div>
                                                        {/* group-hover:text-[#FFA178] group-hover:border-[#FFA178] */}
                                                        <button className='text-[#464849]  border border-[#343232] rounded-lg py-[10px] px-4 text-xs w-full md:w-auto  transition-all duration-300 ease-in-out'>
                                                            Choose
                                                        </button>
                                                    </div>
                                                    
                                                </div>



                                            </div>
                                            <div className="flex flex-col gap-1 min-w-64 max-w-72 w-64 h-full flex-shrink-0 border border-[#464849] hover:border-[#FFA178] p-3 rounded-md group cursor-pointer">
                                                <div className='w-full flex items-center justify-center max-h-40 h-40 bg-[#353333] rounded-lg'>

                                                    <div className="flex size-28 relative overflow-hidden block object-contain rounded-lg">
                                                        <Image
                                                            src={"/images/Asset.svg"}
                                                            alt={"fall-back"}
                                                            fill
                                                            className="rounded-lg w-full h-full object-contain object-center"
                                                            priority
                                                        />
                                                    </div>
                                                </div>


                                                <div className=' flex-1 flex flex-col justify-between'>

                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                            Airdrop to holders of
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                            Grasp
                                                        </h3>
                                                    </div>
                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                        Total Recipients
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                        1024
                                                        </h3>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap lg:flex-nowrap items-center gap-1'>
                                                        <div className="p-2 w-full flex justify-between items-start flex-col">
                                                            <span className="font-medium text-[#807D7C] text-xs">
                                                                Quantity per recipients
                                                            </span>
                                                            <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                100
                                                            </h3>
                                                        </div>
                                                        {/* group-hover:text-[#FFA178] group-hover:border-[#FFA178] */}
                                                        <button className='text-[#464849]  border border-[#343232] rounded-lg py-[10px] px-4 text-xs w-full md:w-auto  transition-all duration-300 ease-in-out'>
                                                            Choose
                                                        </button>
                                                    </div>
                                                    
                                                </div>



                                            </div>
                                            <div className="flex flex-col gap-1 min-w-64 max-w-72 w-64 h-full flex-shrink-0 border border-[#464849] hover:border-[#FFA178] p-3 rounded-md group cursor-pointer">
                                                <div className='w-full flex items-center justify-center max-h-40 h-40 bg-[#353333] rounded-lg'>

                                                    <div className="flex size-28 relative overflow-hidden block object-contain rounded-lg">
                                                        <Image
                                                            src={"/images/Asset.svg"}
                                                            alt={"fall-back"}
                                                            fill
                                                            className="rounded-lg w-full h-full object-contain object-center"
                                                            priority
                                                        />
                                                    </div>
                                                </div>


                                                <div className=' flex-1 flex flex-col justify-between'>

                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                            Airdrop to holders of
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                            Grasp
                                                        </h3>
                                                    </div>
                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                        Total Recipients
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                        1024
                                                        </h3>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap lg:flex-nowrap items-center gap-1'>
                                                        <div className="p-2 w-full flex justify-between items-start flex-col">
                                                            <span className="font-medium text-[#807D7C] text-xs">
                                                                Quantity per recipients
                                                            </span>
                                                            <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                100
                                                            </h3>
                                                        </div>
                                                        {/* group-hover:text-[#FFA178] group-hover:border-[#FFA178] */}
                                                        <button className='text-[#464849]  border border-[#343232] rounded-lg py-[10px] px-4 text-xs w-full md:w-auto  transition-all duration-300 ease-in-out'>
                                                            Choose
                                                        </button>
                                                    </div>
                                                    
                                                </div>



                                            </div>
                                            <div className="flex flex-col gap-1 min-w-64 max-w-72 w-64 h-full flex-shrink-0 border border-[#464849] hover:border-[#FFA178] p-3 rounded-md group cursor-pointer">
                                                <div className='w-full flex items-center justify-center max-h-40 h-40 bg-[#353333] rounded-lg'>

                                                    <div className="flex size-28 relative overflow-hidden block object-contain rounded-lg">
                                                        <Image
                                                            src={"/images/Asset.svg"}
                                                            alt={"fall-back"}
                                                            fill
                                                            className="rounded-lg w-full h-full object-contain object-center"
                                                            priority
                                                        />
                                                    </div>
                                                </div>


                                                <div className=' flex-1 flex flex-col justify-between'>

                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                            Airdrop to holders of
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                            Grasp
                                                        </h3>
                                                    </div>
                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                        Total Recipients
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                        1024
                                                        </h3>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap lg:flex-nowrap items-center gap-1'>
                                                        <div className="p-2 w-full flex justify-between items-start flex-col">
                                                            <span className="font-medium text-[#807D7C] text-xs">
                                                                Quantity per recipients
                                                            </span>
                                                            <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                100
                                                            </h3>
                                                        </div>
                                                        {/* group-hover:text-[#FFA178] group-hover:border-[#FFA178] */}
                                                        <button className='text-[#464849]  border border-[#343232] rounded-lg py-[10px] px-4 text-xs w-full md:w-auto  transition-all duration-300 ease-in-out'>
                                                            Choose
                                                        </button>
                                                    </div>
                                                    
                                                </div>



                                            </div>
                                            <div className="flex flex-col gap-1 min-w-64 max-w-72 w-64 h-full flex-shrink-0 border border-[#464849] hover:border-[#FFA178] p-3 rounded-md group cursor-pointer">
                                                <div className='w-full flex items-center justify-center max-h-40 h-40 bg-[#353333] rounded-lg'>

                                                    <div className="flex size-28 relative overflow-hidden block object-contain rounded-lg">
                                                        <Image
                                                            src={"/images/Asset.svg"}
                                                            alt={"fall-back"}
                                                            fill
                                                            className="rounded-lg w-full h-full object-contain object-center"
                                                            priority
                                                        />
                                                    </div>
                                                </div>


                                                <div className=' flex-1 flex flex-col justify-between'>

                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                            Airdrop to holders of
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                            Grasp
                                                        </h3>
                                                    </div>
                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                        Total Recipients
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                        1024
                                                        </h3>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap lg:flex-nowrap items-center gap-1'>
                                                        <div className="p-2 w-full flex justify-between items-start flex-col">
                                                            <span className="font-medium text-[#807D7C] text-xs">
                                                                Quantity per recipients
                                                            </span>
                                                            <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                100
                                                            </h3>
                                                        </div>
                                                        {/* group-hover:text-[#FFA178] group-hover:border-[#FFA178] */}
                                                        <button className='text-[#464849]  border border-[#343232] rounded-lg py-[10px] px-4 text-xs w-full md:w-auto  transition-all duration-300 ease-in-out'>
                                                            Choose
                                                        </button>
                                                    </div>
                                                    
                                                </div>



                                            </div>
                                            <div className="flex flex-col gap-1 min-w-64 max-w-72 w-64 h-full flex-shrink-0 border border-[#464849] hover:border-[#FFA178] p-3 rounded-md group cursor-pointer">
                                                <div className='w-full flex items-center justify-center max-h-40 h-40 bg-[#353333] rounded-lg'>

                                                    <div className="flex size-28 relative overflow-hidden block object-contain rounded-lg">
                                                        <Image
                                                            src={"/images/Asset.svg"}
                                                            alt={"fall-back"}
                                                            fill
                                                            className="rounded-lg w-full h-full object-contain object-center"
                                                            priority
                                                        />
                                                    </div>
                                                </div>


                                                <div className=' flex-1 flex flex-col justify-between'>

                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                            Airdrop to holders of
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                            Grasp
                                                        </h3>
                                                    </div>
                                                    <div className="p-2 w-full flex justify-between items-start flex-col">
                                                        <span className="font-medium text-[#807D7C] text-xs">
                                                        Total Recipients
                                                        </span>
                                                        <h3 className="font-medium text-[#FFFCFB] text-base">
                                                        1024
                                                        </h3>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap lg:flex-nowrap items-center gap-1'>
                                                        <div className="p-2 w-full flex justify-between items-start flex-col">
                                                            <span className="font-medium text-[#807D7C] text-xs">
                                                                Quantity per recipients
                                                            </span>
                                                            <h3 className="font-medium text-[#FFFCFB] text-base">
                                                                100
                                                            </h3>
                                                        </div>
                                                        {/* group-hover:text-[#FFA178] group-hover:border-[#FFA178] */}
                                                        <button className='text-[#464849]  border border-[#343232] rounded-lg py-[10px] px-4 text-xs w-full md:w-auto  transition-all duration-300 ease-in-out'>
                                                            Choose
                                                        </button>
                                                    </div>
                                                    
                                                </div>



                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ): 
                ''}

                {activeStep === 2 ? (
                        <>
                            <div className='bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg'>
                                <div className='mt-3 lg:mt-6'>
                                    <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                        

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <label
                                                    htmlFor="address"
                                                    className="text-sm text-[#FFFCFB] "
                                            >
                                                Token Address
                                            </label>
                                            
                                            <input
                                                type="text"
                                                id="address"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="For e.g; SDFYJHJLO5465689igDHGJJGYJHG"
                                                defaultValue={'SDFYJHJLO5465689igDHGJJGYJHG'}
                                                name="address"
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                            <label
                                                    htmlFor="airdrop_title"
                                                    className="text-sm text-[#FFFCFB] "
                                            >
                                                Airdrop titile
                                            </label>
                                            
                                            <input
                                                type="text"
                                                id="airdrop_title"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="e.g; SAF"
                                                name="airdrop_title"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>


                                    <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/3">
                                            <label
                                                htmlFor="name"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                Token Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="For e.g; SAF Token"
                                                name="name"
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/3">
                                            <label
                                                htmlFor="symbol"
                                                className="text-sm text-[#FFFCFB] mb-1"
                                            >
                                                Token Symbol
                                            </label>
                                            <input
                                                type="text"
                                                id="symbol"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                placeholder="For e.g; SAF"
                                                name="symbol"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/3">
                                            <div className='flex justify-between items-center mb-1'>
                                                
                                                <label
                                                    htmlFor="quantity_per_person"
                                                    className="text-sm text-[#FFFCFB]"
                                                >
                                                    Quantity per Person
                                                </label>
                                                <div>
                                                    <p>Total: <span>10,000</span> tokens</p>
                                                </div>
                                            </div>

                                            <input
                                                type="number"
                                                id="quantity_per_person"
                                                className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                defaultValue={100}
                                                name="quantity_per_person"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    ) : ''}
                
                {activeStep === 3 ? (
                    <>
                        <div className='bg-[#272727] px-3 md:px-6 py-3 md:py-6 rounded-lg'>

                            <h3 className="font-medium text-white text-lg mb-2">
                            Airdrop detail
                            </h3>

                            <div className='flex gap-6 py-2 flex-wrap lg:flex-nowrap '>
                                
                                <div className='w-full md:w-full lg:w-7/12 space-y-8'>
                                    <div>
                                        <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                            
                                            <div className="p-2 w-full flex justify-between items-center">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                Airdrop title
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-xs">
                                                The beginning of great things
                                                </span>
                                            </div>
                                            <div className="p-2 w-full flex justify-between items-center">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                Type
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-xs">
                                                Instant
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
                                                Total recipients
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-xs">
                                                100
                                                </span>
                                            </div>
                                            <div className="p-2 w-full flex justify-between items-center">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                Token name
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-xs">
                                                Salefish
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
                                                Token address
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-xs">
                                                0x9YJHJLO5465689igDHGJJGYJHG
                                                </span>
                                            </div>
                                            <div className="p-2 w-full flex justify-between items-center">
                                                <h3 className=" font-medium text-[#898582] text-sm">
                                                Total token
                                                </h3>
                                                <span className="font-medium text-[#FFFFFF] text-xs">
                                                500 000 SAF
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='w-full md:w-full lg:w-5/12'>

                                    <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 w-full">
                                        
                                        <div className='flex gap-3 flex-wrap'>
                                            <div className='w-1/3 flex items-center justify-center max-h-40 bg-[#353333] rounded-lg'>

                                                <div className="flex size-28 relative overflow-hidden block object-contain rounded-lg">
                                                    <Image
                                                        src={"/images/Asset.svg"}
                                                        alt={"fall-back"}
                                                        fill
                                                        className="rounded-lg w-full h-full object-contain object-center"
                                                        priority
                                                    />
                                                </div>
                                            </div>


                                            <div className=' flex-1 flex flex-col justify-between'>

                                                <div className="p-2 w-full flex justify-between items-start flex-col">
                                                    <span className="font-medium text-[#807D7C] text-xs">
                                                        Airdrop to holders of
                                                    </span>
                                                    <h3 className="font-medium text-[#FFFCFB] text-base">
                                                        Grasp
                                                    </h3>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-start flex-col">
                                                    <span className="font-medium text-[#807D7C] text-xs">
                                                    Total Recipients
                                                    </span>
                                                    <h3 className="font-medium text-[#FFFCFB] text-base">
                                                    1024
                                                    </h3>
                                                </div>
                                                <div className="p-2 w-full flex justify-between items-start flex-col">
                                                    <span className="font-medium text-[#807D7C] text-xs">
                                                    Quantity per recipients
                                                    </span>
                                                    <h3 className="font-medium text-[#FFFCFB] text-base">
                                                    100
                                                    </h3>
                                                </div>
                                            </div>

                                        </div>

                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                ) : ''}
                
            </div>
        
            <Box mt={4}>
                <div className='flex items-center justify-center w-full gap-3 flex-wrap'>
                    {activeStep < steps.length - 1 ? (
                            <button onClick={handleNext} className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                            >
                                Next
                            </button>
                        ) : (
                        <>
                            <button onClick={handleFinish} className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                transition-all duration-75 border-none px-5 
                                font-medium p-3 text-base text-white block"
                            >
                                Next
                            </button>
                        </>
                    )}
                </div>

            </Box>

        </div>
            

            <MakePayment 
                isOpen={makePaymentAirdropOpen} 
                onClose={onMakePaymentAirdropClose}
            />
        </>
    );
}
