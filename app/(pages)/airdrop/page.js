import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from "@chakra-ui/react";
import { Add, Menu } from 'iconsax-react'
import EmptyState from '@/app/components/EmptyState';
import CollectionGrid from '@/app/components/airdrop/CollectionGrid';

const Airdrop = () => {
  return (
    <>
        <div>
                <div className="flex flex-row items-center justify-between mb-8">
                    <div>
                        <div>
                            <h1 className='font-medium text-2xl lg:text-4xl mb-3'>Airdrop Tool</h1>
                            <p className='text-[#A8B8C2] text-[13px]'>Airdrop your tokens to top projects and your upload list to create exposure for your project</p>
                        </div>
                    </div>
                    <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">
                        <Link
                            href={'/lock/create-lock'}
                            className="w-auto whitespace-nowrap py-2 md:py-3 px-3 md:px-5 bg-[#313131] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                        >   
                            <span>
                                <div className="w-6 h-6 relative overflow-hidden block object-contain rounded-full">
                                    <Image
                                        src={"/images/youtube.svg"}
                                        alt={"fall-back"}
                                        fill
                                        className="rounded-t-[16px] w-full h-full object-cover object-center"
                                        priority
                                    />
                                </div>
                            </span>
                            <p className='hidden md:block'>Watch how to create an airdrop</p>
                        </Link>
                    </div>
                </div>

                <div>

                    <div className='rounded-lg py-2 mb-5'>
                        <div className='w-full relative shadow-box py-4'>
                            <Tabs position="relative" variant="unstyled" isLazy>
                                <div className='flex items-center justify-between'>

                                <div>
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
                                            Eligible airdrop
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
                                </div>
                                <div>
                                    <Link href={'/airdrop/create'} 
                                        className="w-auto whitespace-nowrap py-3 px-5 bg-[#DA5921] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                                    >
                                        <span>
                                            <Add size={16}/>
                                        </span>
                                        Create airdrop
                                    </Link>
                                </div>
                                </div>
                                
                                <TabPanels>
                                    <TabPanel className="px-0">
                                        <div className="py-3">
                                            <CollectionGrid
                                                // isLoading={isLoading}
                                            />
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
    </>
  )
}

export default Airdrop
