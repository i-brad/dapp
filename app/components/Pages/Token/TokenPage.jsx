'use client'
import React from 'react'
import { MdQuestionMark } from 'react-icons/md'
import Image from 'next/image';
import { Icon } from '@iconify/react'
import { useDisclosure } from '@chakra-ui/react';
import SaveTokenProgress from '../../Modals/SaveTokenProgress';
import SavedTokenSuccess from '../../Modals/SavedTokenSuccess';


const TokenPage = () => {

    const {
        isOpen: createTokenIsOpen,
        onOpen: onCreateTokenOpen,
        onClose: onCreateTokenClose,
    } = useDisclosure();

    const {
        isOpen: successTokenIsOpen,
        onOpen: onSuccessTokenOpen,
        onClose: onSuccessTokenClose, 
    } = useDisclosure();

    const handleSubmit = () => {
        onCreateTokenOpen();

        setTimeout(() => {
            onSuccessTokenOpen();
            handleProgressClose();
        }, 2000);
    }

    const handleProgressClose =()=>{
        onCreateTokenClose();
    }

    return (
        <>
            <div>
                <div className="flex flex-row items-center justify-between mb-8">
                    <h1 className='font-medium text-2xl lg:text-4xl'>Token</h1>
                </div>
                <form>
                    <div className='bg-[#272727] px-5 py-4 rounded-lg'>
                        
                        <div className='py-3 border-b border-[#414040]'>
                            <h3 className='text-xl font-medium'>Create Token</h3>
                        </div>
                        <div className='py-5'>
                            <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            htmlFor="token_name"
                                            className="text-base text-[#FFFCFB] mb-1"
                                        >
                                            Token Name
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="token_name"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder="For e.g; Awesome token"
                                        name="token_name"
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <div className='mb-1'>
                                        <label
                                            htmlFor="token_symbol"
                                            className="text-base text-[#FFFCFB] mb-1"
                                        >
                                            Token Symbol
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="token_symbol"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder="For e.g; 10000000000"
                                        name="token_symbol"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className='flex w-full gap-5 items-center flex-wrap lg:flex-nowrap'>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/3">
                                    <label
                                        htmlFor="token_decimal"
                                        className="text-base text-[#FFFCFB] mb-1"
                                    >
                                        Token Decimal
                                    </label>
                                    <input
                                        type="text"
                                        id="token_decimal"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder="For e.g; 6"
                                        name="token_decimal"
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                    <label
                                        htmlFor="token_supply"
                                        className="text-base text-[#FFFCFB] mb-1"
                                    >
                                        Total Supply
                                    </label>
                                    <input
                                        type="text"
                                        id="token_supply"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder=" "
                                        name="token_supply"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/3">
                                    <label
                                        htmlFor="blockchain"
                                        className="text-base text-[#FFFCFB] mb-1"
                                    >
                                        Blockchain
                                    </label>
                                    <input
                                        type="text"
                                        id="blockchain"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder=" "
                                        name="blockchain"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-row justify-between   gap-1 relative w-full">
                                <div>
                                    <div className='flex items-center mb-1 '>
                                        <label 
                                            className="text-base text-[#FFFCFB] mr-2"
                                        >
                                            Mintable token
                                        </label>
                                        <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                            <MdQuestionMark size={10}/>
                                        </span>
                                    </div>

                                    <div>
                                        <label htmlFor="mintable_token_yes" className="mr-4">
                                            <input
                                                type="radio"
                                                id="mintable_token_yes"
                                                className="mr-2"
                                                value={1}
                                                name="mintable_token"
                                                required
                                                autoComplete="off"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="mintable_token_no">
                                            <input
                                                type="radio"
                                                id="mintable_token_no"
                                                className="mr-2"
                                                value={0}
                                                name="mintable_token"
                                                required
                                                autoComplete="off"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <div className='flex items-center mb-1 '>
                                        <label 
                                            className="text-base text-[#FFFCFB] mr-2"
                                        >
                                            Pausable token
                                        </label>
                                        <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                            <MdQuestionMark size={10}/>
                                        </span>
                                    </div>

                                    <div>
                                        <label htmlFor="pausable_token_yes" className="mr-4">
                                            <input
                                                type="radio"
                                                id="pausable_token_yes"
                                                className="mr-2"
                                                value={1}
                                                name="pausable_token"
                                                required
                                                autoComplete="off"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="pausable_token_no">
                                            <input
                                                type="radio"
                                                id="pausable_token_no"
                                                className="mr-2"
                                                value={0}
                                                name="pausable_token"
                                                required
                                                autoComplete="off"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <div className='flex items-center mb-1 '>
                                        <label 
                                            className="text-base text-[#FFFCFB] mr-2"
                                        >
                                            Renounce Ownership
                                        </label>
                                        <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                            <MdQuestionMark size={10}/>
                                        </span>
                                    </div>

                                    <div>
                                        <label htmlFor="renounce_ownership_yes" className="mr-4">
                                            <input
                                                type="radio"
                                                id="renounce_ownership_yes"
                                                className="mr-2"
                                                value={1}
                                                name="renounce_ownership"
                                                required
                                                autoComplete="off"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="renounce_ownership_no">
                                            <input
                                                type="radio"
                                                id="renounce_ownership_no"
                                                className="mr-2"
                                                value={0}
                                                name="renounce_ownership"
                                                required
                                                autoComplete="off"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className='flex items-center mb-1 '>
                                        <label 
                                            className="text-base text-[#FFFCFB] mr-2"
                                        >
                                            Burnable
                                        </label>
                                        <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                            <MdQuestionMark size={10}/>
                                        </span>
                                    </div>

                                    <div>
                                        <label htmlFor="burnable_yes" className="mr-4">
                                            <input
                                                type="radio"
                                                id="burnable_yes"
                                                className="mr-2"
                                                value={1}
                                                name="burnable"
                                                required
                                                autoComplete="off"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="burnable_no">
                                            <input
                                                type="radio"
                                                id="burnable_no"
                                                className="mr-2"
                                                value={0}
                                                name="burnable"
                                                required
                                                autoComplete="off"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div> 

                            </div>
                            {/* <div className="flex flex-row justify-between   gap-1 relative w-full">
                                <div className='flex items-center'>
                                    <label htmlFor={`mintable_token`} className="rounded p-2 cursor-pointer inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`mintable_token`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="mintable_token"
                                            required
                                            autoComplete="off"
                                        />
                                        Mintable token
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>

                                <div className='flex items-center'>
                                    <label htmlFor={`pausable_token`} className="rounded p-2 cursor-pointer inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`pausable_token`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="pausable_token"
                                            required
                                            autoComplete="off"
                                        />
                                        Pausable token
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>

                                <div className='flex items-center'>
                                    <label htmlFor={`renounce_ownership`} className="rounded p-2 cursor-pointer inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`renounce_ownership`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="renounce_ownership"
                                            required
                                            autoComplete="off"
                                        />
                                        Renounce Ownership
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>

                                <div className='flex items-center'>
                                    <label htmlFor={`burnable`} className="rounded p-2 cursor-pointer inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`burnable`}
                                            className="mr-2 caret-[#FFA178] text-green-600 border-gray-300 w-4 h-4 rounded-lg bg-transparent"
                                            value={1}
                                            name="burnable"
                                            required
                                            autoComplete="off"
                                        />
                                        Burnable
                                    </label>
                                    <span className='bg-[#5B5958] rounded-full h-4 w-4 flex items-center justify-center'>
                                        <MdQuestionMark size={10}/>
                                    </span>
                                </div>
                                    

                            </div> */}
                            
                        </div>
                    </div>

                    <div className='flex items-center justify-center w-full mt-4'>
                        <button type="button" onClick={handleSubmit} className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px]  whitespace-nowrap 
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base text-white block"
                        >
                            Create Token
                        </button>
                    </div>
                </form>
            </div>

            <SaveTokenProgress 
                isOpen={createTokenIsOpen}            
                onClose={onCreateTokenClose}
                handleProgressClose={handleProgressClose}
            />

            <SavedTokenSuccess 
                isOpen={successTokenIsOpen}            
                onClose={onSuccessTokenClose}
            />
        </>
    )
}

export default TokenPage
