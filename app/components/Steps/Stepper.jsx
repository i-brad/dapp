import { useState } from 'react';
import {
  Box,
  Button,
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
  useSteps,
} from '@chakra-ui/react';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import Link from 'next/link';

const steps = [
  { title: 'Verify Token', description: 'Enter token details or create a token for staking and reward' },
  { title: 'Staking Details', description: 'Add all necessary details of your stake' },
  { title: 'Submit', description: 'Completed token details gets listed' },
];

export default function StepperStake() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleFinish = () => {
        alert('Finished!');
    };

    //   const renderStepContent = (step) => {
    //     switch (step) {
    //       case 0:
    //         return <Step1 />;
    //       case 1:
    //         return <Step2 />;
    //       case 2:
    //         return <Step3 />;
    //       default:
    //         return <Step1 />;
    //     }
    //   };

    const periods = [
        {
            id: 1,
            period: '30 days',
        },
        {
            id: 2,
            period: '45 days',
        },
        {
            id: 3,
            period: '60 days',
        },
        {
            id: 4,
            period: '90 days',
        }
    ]


  return (
    <>
        <Stack>
            <Stepper index={activeStep} gap="0" className='max-w-5xl mx-auto w-full'>
                {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator
                                sx={{
                                    '[data-status=complete] &': {
                                        background: 'transparent',
                                        color: '#FC9569',
                                        borderWidth: '1px',
                                        borderColor: '#FC9569',
                                    },
                                    '[data-status=active] &': {
                                        // background: '#FC9569',
                                        color: '#FC9569',
                                        borderColor: '#FC9569',
                                        border: 'none'
                                    },
                                    '[data-status=incomplete] &': {
                                        color: '#575656',
                                        borderColor: '#575656',
                                        border: 'none'
                                    },
                                }}
                            >
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<MdOutlineRadioButtonChecked className='text-lg' height={15}/>}
                                    active={<MdOutlineRadioButtonChecked />}
                                />
                            </StepIndicator>

                            <StepSeparator _horizontal={{ backgroundColor: '#3B3939' }} 
                                sx={{
                                    '[data-status=complete] &': {
                                        background: 'transparent',
                                        color: '#FC9569',
                                        borderWidth: '1px',
                                        borderColor: '#FC9569',
                                    },
                                    // '[data-status=active] &': {
                                    //     // background: '#FC9569',
                                    //     color: '#FC9569',
                                    //     borderColor: '#FC9569',
                                    //     border: 'none'
                                    // },
                                    '[data-status=incomplete] &': {
                                        color: '#3B3939',
                                        borderColor: '#3B3939',
                                        backgroundColor: '#3B3939',
                                        // border: 'none'
                                    },
                                }}
                            />
                        </Step>
                ))}
            </Stepper>

            <div className=' hidden lg:block max-w-7xl mx-auto w-full'>
                <div className='flex items-center justify-between text-center'>
                    {steps.map((step, index) => (
                        <div key={index} className='flex flex-col gap-2 text-center max-w-xs'>
                            <p className={`text-base font-medium ${activeStep === index ? 'text-[#EA6A32]' : 'text-white'}`}>{step.title}</p>
                            <p className='text-[#CCDCDF]'>{step.description}</p>                            
                        </div>
                    ))}
                </div>
            </div>

        </Stack>


        <div className='py-6 md:mt-8'>

            {activeStep === 0 ? 
                <>
                    <div className='bg-[#272727] px-5 py-4 rounded-lg'>
                        <div>

                            <div className="mb-6 flex flex-col gap-1 relative w-full">
                                <div className='flex items-center justify-between flex-wrap mb-1'>

                                
                                    <label
                                        htmlFor="address"
                                        className="text-sm text-[#FFFCFB] "
                                    >
                                        Token Address
                                    </label>
                                    <Link href={'/token'} className='text-[#CCDCDF] text-base p-2 px-4 rounded-3xl border border-[#A8B8C2]'>
                                        Create Token
                                    </Link>
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                    placeholder="For e.g; SDFYJHJLO5465689igDHGJJGYJHG"
                                    name="address"
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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
                                        placeholder=" "
                                        name="name"
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
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
                                        placeholder=" "
                                        name="symbol"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className='flex w-full lg:w-1/2 gap-5 items-center'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                    <label htmlFor="name" className="text-sm text-[#FFFCFB] mb-1">
                                        Enable EDU as yield
                                    </label>

                                    <div>
                                        <label htmlFor="as_edu_yield_yes" className="mr-4">
                                            <input
                                                type="radio"
                                                id="as_edu_yield_yes"
                                                className="mr-2"
                                                value={1}
                                                name="enable_edu_as_yield"
                                                required
                                                autoComplete="off"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="as_edu_yield_no">
                                            <input
                                                type="radio"
                                                id="as_edu_yield_no"
                                                value={0}
                                                name="enable_edu_as_yield"
                                                required
                                                autoComplete="off"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                    <label htmlFor="name" className="text-sm text-[#FFFCFB] mb-1">
                                        Enable SAF as yield
                                    </label>

                                    <div>
                                        <label htmlFor="as_saf_yield_yes" className="mr-4">
                                            <input
                                                type="radio"
                                                id="as_saf_yield_yes"
                                                className="mr-2"
                                                value={1}
                                                name="enable_saf_as_yield"
                                                required
                                                autoComplete="off"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="as_saf_yield_no">
                                            <input
                                                type="radio"
                                                id="as_saf_yield_no"
                                                className="mr-2 text-[#FFA178] caret-[#FFA178]"
                                                value={0}
                                                name="enable_saf_as_yield"
                                                required
                                                autoComplete="off"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>


                            </div>
                            
                        </div>
                    </div>
                </> 
                :
                ''
            }

            {activeStep === 1 ? (
                <>
                    <div className='bg-[#272727] px-5 py-4 rounded-lg'>
                        <div>
                            <div className="mb-6 flex flex-col gap-1 relative w-full">
                                <div className='mb-1'>
                                    <label
                                        htmlFor="address"
                                        className="text-sm text-[#FFFCFB] mb-1"
                                    >
                                        Stake name
                                    </label>
                                    <p className='text-[#898582] text-xs'>This would be seen by all community members</p>
                                </div>
                                <input
                                    type="text"
                                    id="stake_name"
                                    className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                    placeholder=""
                                    name="stake_name"
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            htmlFor="start_date"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Start Date
                                        </label>
                                        <p className='text-[#898582] text-xs'>Date to begin staking</p>
                                    </div>
                                    <input
                                        type="date"
                                        id="start_date"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder=" "
                                        name="start_date"
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            htmlFor="end_date"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            End Date
                                        </label>
                                        <p className='text-[#898582] text-xs'>End date needs to be set as minimum 24h of start date</p>
                                    </div>
                                    <input
                                        type="date"
                                        id="end_date"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder=" "
                                        name="end_date"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Unstake time
                                        </label>
                                        <p className='text-[#898582] text-xs'>Date to unstake all tokens</p>
                                    </div>

                                    <div className='mt-1 flex flex-wrap gap-2'>
                                        {periods?.map((period, index)=>(
                                            <label key={index} htmlFor={`period_${period.id}`} className="mr-4 border border-[#464849] rounded p-2 cursor-pointer ">
                                                <input
                                                    type="checkbox"
                                                    id={`period_${period.id}`}
                                                    className="mr-2 caret-[#FFA178]"
                                                    value={1}
                                                    name="enable_edu_as_yield"
                                                    required
                                                    autoComplete="off"
                                                />
                                                {period.period}
                                            </label>
                                        ))}
                                        
                                    </div>
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Enable EDU Reward
                                        </label>
                                        <p className='text-[#898582] text-xs'>EDU reward would be shared amongst stakers</p>
                                    </div>

                                    <div>
                                        <label htmlFor="as_edu_reward_yes" className="mr-4">
                                            <input
                                                type="radio"
                                                id="as_edu_reward_yes"
                                                className="mr-2"
                                                value={1}
                                                name="enable_edu_reward"
                                                required
                                                autoComplete="off"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="as_edu_reward_no">
                                            <input
                                                type="radio"
                                                id="as_edu_reward_no"
                                                className="mr-2 text-[#FFA178] caret-[#FFA178]"
                                                value={0}
                                                name="enable_edu_reward"
                                                required
                                                autoComplete="off"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>


                            </div>

                            <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                        <label
                                            htmlFor="reward_apy_in_edu"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Reward APY in EDU
                                        </label>
                                    <input
                                        type="text"
                                        id="reward_apy_in_edu"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder="e.g; 5% "
                                        name="reward_apy_in_edu"
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <label
                                        htmlFor="reward_apy_in_token"
                                        className="text-sm text-[#FFFCFB] mb-1"
                                    >
                                        Reward APY in Token
                                    </label>
                                    <input
                                        type="text"
                                        id="reward_apy_in_token"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder=" "
                                        name="reward_apy_in_token"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            htmlFor="hard_cap"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Stake Hard Cap
                                        </label>
                                        <p className='text-[#898582] text-xs'>Maximum amount of token that can be staked</p>
                                    </div>
                                    <input
                                        type="number"
                                        id="hard_cap"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        defaultValue={0}
                                        name="hard_cap"
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            htmlFor="minimum_limit"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Minimum limit to stake
                                        </label>
                                        <p className='text-[#898582] text-xs'>Minimum amount that can be staked</p>
                                    </div>
                                    <input
                                        type="number"
                                        id="minimum_limit"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        defaultValue={0}
                                        name="minimum_limit"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </>
            ): 
            ''}

            {activeStep === 2 ? (
                <>
                    <div className='bg-[#272727] px-5 py-4 rounded-lg'>


                        <h3 className="font-medium text-white text-lg mb-3">
                            Stake Review
                        </h3>
                        <div className='flex gap-8 flex-wrap lg:flex-nowrap'>
                            <div className='w-full md:w-full lg:w-5/12'>
                                <div className='bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]'>
                                    <div className='p-2'>
                                        <h3 className="font-medium text-white text-base">
                                            Token details
                                        </h3>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                            Token name
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                            SaleFish
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap  gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                            Token address
                                        </h3>
                                        <button type='button' className="font-medium text-[#FFFFFF] text-sm">
                                            0x7Fefe59726c7c5f4BD7B0224F1FCfA58BAe508fc
                                        </button>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                            Token symbol
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                            SAF
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

                                </div>
                            </div>
                            <div className='w-full md:w-full lg:w-7/12'>

                                <div className='bg-[#2D2C2C] rounded-lg flex flex-col text-white py-[14px] px-5 w-full min-h-[500px]'>
                                    <div className='p-2'>
                                        <h3 className="font-medium text-white text-base">
                                            Stake details
                                        </h3>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className=" font-medium text-[#898582] text-sm">
                                        Stake name
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                        DENNIE
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        Minimum stake 
                                        </h3>
                                        <button type='button' className="font-medium text-[#FFFFFF] text-sm font-wrap">
                                        100 EDU
                                        </button>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        Hard cap
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                        200 EDU
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        Start date
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                        Tue, 13 Aug 2024 . 2:00PM
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        End date
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm ">
                                        Wed, 18 Aug 2024 . 2:00PM
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        EDU Reward
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                        Yes
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        Unstake time
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                        30 days, 60 days, 90 days
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        Reward EDU APY
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                        4
                                        </span>
                                    </div>
                                    <div className="p-2 w-full flex justify-between items-center flex-wrap gap-1">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                        Reward Token APY
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-sm">
                                        60
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ): 
            ''}
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
                            Approve stake
                        </button>

                        <button onClick={handleFinish} disabled aria-disabled="true" className="bg-[#393737] text-[#878483] min-w-[200px] whitespace-nowrap w-full md:w-auto
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base text-white block"
                        >
                            Create stake
                        </button>
                    </>
                )}
            </div>

        </Box>

    </>
  );
}
