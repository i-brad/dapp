'use client'
import { ArrowLeft } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const CreateLock = () => {
    const router = useRouter();

    return (
        <div>
            <div className="flex flex-row items-center justify-start mb-8 gap-8">
                <button type='button' onClick={()=>router.back()} className='flex items-center gap-2'>
                    <ArrowLeft /> Back
                </button>

                <div className="text-md w-full">
                    <h1 className='font-medium text-2xl lg:text-4xl'>Create Lock</h1>
                </div>
            </div>


            <div className=''>
                <form>
                    <div className='bg-[#272727] px-5 py-4 rounded-lg'>

                        <div className='flex flex-col gap-12 py-4'>
                            {/* Token Info */}
                            <div>
                                <h4 className='text-lg font-medium mb-2 text-white'>
                                Token Info
                                </h4>
                                <div className='flex w-full gap-5 items-center'>

                                    <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                        <label
                                            htmlFor="address"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Token address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder=" "
                                            name="address"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                        <label
                                            htmlFor="amount"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Amount
                                        </label>
                                        <input
                                            type="text"
                                            id="amount"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder=" "
                                            name="amount"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className='flex w-full gap-5 items-center'>

                                    <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                        <label
                                            htmlFor="owner_address"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Lock owner wallet address
                                        </label>
                                        <input
                                            type="text"
                                            id="owner_address"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder=" "
                                            defaultValue={'0xd....3455'}
                                            name="owner_address"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                        <label
                                            htmlFor="lock_date"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Lock date
                                        </label>
                                        <input
                                            type="date"
                                            id="lock_date"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder=" "
                                            name="lock_date"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 relative w-full ">
                                    <label
                                        htmlFor="lock_name"
                                        className="text-sm text-[#FFFCFB] mb-1"
                                    >
                                        Lock name
                                    </label>
                                    <input
                                        type="text"
                                        id="lock_name"
                                        className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                        placeholder="Enter a name"
                                        name="lock_name"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            {/* Project information */}
                            <div>
                                <h4 className='text-lg font-medium mb-2 text-white'>
                                    Project information
                                </h4>
                                <div className='flex w-full gap-5 items-center'>

                                    <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                        <label
                                            htmlFor="project_title"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Project title
                                        </label>
                                        <input
                                            type="text"
                                            id="project_title"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder=" "
                                            name="project_title"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="mb-6 flex flex-col gap-1 relative w-full md:w-1/2">
                                        <label
                                            htmlFor="project_description"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Project description
                                        </label>
                                        <input
                                            type="text"
                                            id="project_description"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder=" "
                                            name="project_description"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 lg:grid-cols-3 w-full gap-5'>

                                    <div className="mb-6 flex flex-col gap-1 relative w-full">
                                        <label
                                            htmlFor="owner_address"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            id="website"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder="For e.g; https://..."
                                            name="website"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mb-6 flex flex-col gap-1 relative w-full">
                                        <label
                                            htmlFor="telegram"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Telegram
                                        </label>
                                        <input
                                            type="text"
                                            id="telegram"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder="For e.g; https://telegram.com"
                                            name="telegram"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mb-6 flex flex-col gap-1 relative w-full">
                                        <label
                                            htmlFor="twitter"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Twitter
                                        </label>
                                        <input
                                            type="text"
                                            id="twitter"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder="For e.g; https://X.com"
                                            name="twitter"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mb-6 flex flex-col gap-1 relative w-full">
                                        <label
                                            htmlFor="github"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Github
                                        </label>
                                        <input
                                            type="text"
                                            id="github"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder="For e.g; https://github.com"
                                            name="github"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mb-6 flex flex-col gap-1 relative w-full">
                                        <label
                                            htmlFor="discord"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Discord
                                        </label>
                                        <input
                                            type="text"
                                            id="discord"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder="For e.g; https://discord.com"
                                            name="discord"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mb-6 flex flex-col gap-1 relative w-full">
                                        <label
                                            htmlFor="youtube"
                                            className="text-sm text-[#FFFCFB] mb-1"
                                        >
                                            Youtube
                                        </label>
                                        <input
                                            type="text"
                                            id="youtube"
                                            className="block px-2 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                            placeholder="For e.g; https://youtube.com"
                                            name="youtube"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    
                                </div>

                                <div className="flex flex-col gap-1 relative w-full">
                                    <label
                                        htmlFor="youtube"
                                        className="text-sm text-[#FFFCFB] mb-1"
                                    >
                                        Upload Logo
                                    </label>
                                    <input
                                        type="file"
                                        id="logo"
                                        className="block px-2 py-4 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border border-dashed bg-transparent  h-24 rounded-md focus:outline-0 text-center flex items-center justify-center"
                                        placeholder="For e.g; https://youtube.com"
                                        name="logo"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex items-center justify-center w-full mt-4'>
                        <button className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] max-w-[250px] whitespace-nowrap 
                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                            transition-all duration-75 border-none px-5 
                            font-medium p-3 text-base text-white block"
                        >
                            Create lock
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateLock
