"use client"
import { Add, Category, Menu, SearchNormal1 } from 'iconsax-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from "@chakra-ui/react";
import Image from 'next/image';
import CollectionGrid from '@/app/components/stake/Grid/CollectionGrid';
import { MdMenu } from 'react-icons/md';
import EmptyState from '@/app/components/EmptyState';
import CollectionList from '@/app/components/stake/List/CollectionList';
import CreateLaunchPad from '@/app/components/Modals/CreateLaunchPad';

const Stake = () => {
    const [viewType, setViewType] = useState(0);

    const handleChange = (index) => {
        setViewType(index);
    };

    const {
        isOpen: createPadIsOpen,
        onOpen: onCreatePadOpen,
        onClose: onCreatePadClose, 
    } = useDisclosure();

    return (
        <>
            <div>
                <div className="flex flex-row items-center justify-between mb-8">
                    <h1 className='font-medium text-2xl lg:text-4xl'>Stake</h1>

                    <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">

                        <Link href={'/stake/create'} 
                            className="w-auto whitespace-nowrap py-3 px-5 bg-[#DA5921] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                        >
                            <span><Add size={16}/></span>
                            Create new
                        </Link>
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-between flex-wrap lg:flex-nowrap gap-3'>
                        <div className='flex items-center gap-2 w-full'>
                            <div className='flex items-center gap-2'>
                                <button 
                                    className={`${viewType === 0 ? 'bg-[#303132] text-[#EA6A32]' : 'bg-[#272727] text-white'} hover:bg-[#303132] hover:text-[#EA6A32] p-2 rounded`} 
                                    onClick={()=>handleChange(0)}>
                                    <Menu size={24}/>
                                </button>
                                <button 
                                    className={`${viewType === 1 ? 'bg-[#303132] text-[#EA6A32]' : 'bg-[#272727] text-white'} hover:bg-[#303132] hover:text-[#EA6A32] p-2 rounded`} 
                                    onClick={()=>handleChange(1)}
                                    >
                                    <MdMenu size={25}/>
                                </button>
                            </div>
                                <div className=" relative rounded-full  items-center w-full max-w-[563px] h-10 ">
                                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none h-full">
                                        <span className="text-gray-500 px-3">
                                            <SearchNormal1 size={22} />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        className="border border-[#3B3939] py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none bg-transparent text-white"
                                        placeholder="Search"
                                    />
                                </div>

                        </div>

                    </div>

                    <div className='rounded-lg py-2 mb-5'>
                        <div className='w-full relative shadow-box py-4'>
                            <Tabs position="relative" variant="unstyled" isLazy>
                                <TabList className="whitespace-nowrap gap-3 border-b border-[#3B3939] text-sm">
                                    <Tab
                                        className="border-b border-[#3B3939] text-[#81878B]" 
                                        _hover={{borderBottomColor: '#FFA178', color: '#FFA178'}} 
                                        _selected={{ color: '#FFA178'}}
                                    >
                                        All
                                    </Tab>
                                    <Tab className="border-b border-[#3B3939]  text-[#81878B]" 
                                        _hover={{borderBottomColor: '#FFA178', color: '#FFA178'}} 
                                        _selected={{ color: '#FFA178'}}>
                                        My Contributions
                                    </Tab>
                                    <Tab
                                        className="border-b border-[#3B3939]  text-[#81878B]" 
                                        _hover={{borderBottomColor: '#FFA178', color: '#FFA178'}} 
                                        _selected={{ color: '#FFA178'}}
                                    >
                                        Created by me
                                    </Tab>
                                </TabList>
                                <TabIndicator
                                    mt="-1.5px"
                                    height="2px"
                                    bg="#FFA178"
                                    borderRadius="1px"
                                />
                                <TabPanels>
                                    <TabPanel className="px-0">
                                        <div className="py-3">
                                            {/* {isLoading ? (
                                                <div className="h-full flex items-center justify-center">
                                                    <Loader />
                                                </div>
                                            ) : (
                                                <> */}
                                                    {viewType === 0 ? 
                                                            (
                                                                <CollectionGrid
                                                                    category={"active"}
                                                                    // isLoading={isLoading}
                                                                />
                                                            ):(<CollectionList/>)                                              
                                                        }
                                                {/* </>
                                            )} */}
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="py-3">
                                            <EmptyState/>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="py-3">
                                            <EmptyState/>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>


                </div>

            </div>

            <CreateLaunchPad 
                isOpen={createPadIsOpen}            
                onClose={onCreatePadClose}
            />
        </>
    )
}

export default Stake
