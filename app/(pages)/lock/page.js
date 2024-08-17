'use client'
import LocksTable from '@/app/components/DataTable/LocksTable'
import { Spacer } from '@chakra-ui/react'
import { SearchNormal, SearchNormal1 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const dataSourceData = Array.from({
  length: 10,
}).map((_, i) => ({
  key: i++,
  id: i++,
  name: `Edward ${i++}`,
  blockchain: `King ${i++}`,
  total: i * 5000,
  socials: [
    {
      twitter : 'https://x.com'
    },
    {
      telegram : 'https://telegram.com'
    },
    {
      website : 'https://www.google.com'
    },
  ],
}));

const Lock = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() =>{
    setTransactions(dataSourceData);
  }, [])
  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between mb-8">
          <h1 className='font-medium text-2xl lg:text-4xl'>Lock</h1>

          <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">
            <div className=" relative rounded-full  items-center w-40 min-w-[25rem] h-10 hidden lg:block">
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
                placeholder="search locks"
              />
            </div>

            <button className="rounded-full p-3 border border-[#3B3939] lg:hidden block">
                <SearchNormal1 size={22} />
            </button>

            <Link 
            href={'/lock/create-lock'}
              className="w-auto whitespace-nowrap py-3 px-5 bg-[#DA5921] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
            >
              Create lock
            </Link>
          </div>
        </div>

        <div className='space-y-10'>
          <div className='rounded-[10px] bg-[#272727]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-3 px-3 w-full divide-y md:divide-y-0 md:divide-x divide-[#524F4D] text-white">
                <div className='py-4 px-4'>
                    <div className="w-full flex items-center justify-center flex-col gap-3">
                        <div className="w-16 h-16 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                            <Image
                                src={"/images/metal-padlocks.svg"}
                                alt={"fall-back"}
                                fill
                                className="rounded-t-[16px] w-full h-full object-contain object-center"
                                priority
                            />
                        </div>
                        <div className='text-center space-y-1'>
                          <h3 className='text-xl text-white font-medium'>
                            800.5M
                          </h3>
                          <p className='text-[#CCDCDF] text-sm'>Total Volume Locked</p>
                        </div>
                    </div>

                </div>

                <div className='py-4 px-4'>
                    <div className="w-full flex items-center justify-center flex-col gap-3">
                        <div className="w-16 h-16 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                            <Image
                                src={"/images/metal-padlocks-different.svg"}
                                alt={"fall-back"}
                                fill
                                className="rounded-t-[16px] w-full h-full object-contain object-center"
                                priority
                            />
                        </div>
                        <div className='text-center space-y-1'>
                          <h3 className='text-xl text-white font-medium'>
                            20
                          </h3>
                          <p className='text-[#CCDCDF] text-sm'>Locks</p>
                        </div>
                    </div>

                </div>

            </div>
          </div>


          <div className='rounded-[10px] bg-[#272727]'>
            <LocksTable transactions={transactions}/>
          </div>
        </div>


      </div>
    </>
  )
}

export default Lock
