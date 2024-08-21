'use client'
import AirdropTable from '@/app/components/DataTable/AirdropTable';
import { ArrowLeft } from 'iconsax-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const dataSourceData = Array.from({
    length: 10,
  }).map((_, i) => ({
    key: i++,
    id: i++,
    name: `Band it on to secure`,
    blockchain: `Educhain`,
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

const SingleAirdrop = () => {
    const router = useRouter();

    const [transactions, setTransactions] = useState([]);
    useEffect(() =>{
      setTransactions(dataSourceData);
    }, [])

    return (
        <>
            <div>

                <div>
                    <div className="flex flex-row items-center justify-start gap-4 mb-8">

                        <button type='button' onClick={()=>router.back()} className='flex items-center gap-2'>
                            <ArrowLeft /> Back
                        </button>

                        <h1 className='font-medium text-2xl lg:text-4xl'>Deenie Private Batch 1</h1>

                    </div>
                </div>

                <div className='space-y-10'>
                    <div className='rounded-[10px] bg-[#272727]'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-3 px-3 w-full divide-y md:divide-y-0 md:divide-x divide-[#524F4D] text-white">
                            <div className="py-4 px-4 w-full flex items-center justify-center flex-col gap-3">
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
                                    20
                                </h3>
                                <p className='text-[#CCDCDF] text-sm'>Total Recipients</p>
                                </div>
                            </div>


                            <div className="py-4 px-4 w-full flex items-center justify-center flex-col gap-3">
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
                                    5/20
                                </h3>
                                <p className='text-[#CCDCDF] text-sm'>Claimed recipients to total</p>
                                </div>
                            </div>
                            <div className="py-4 px-4 w-full flex items-center justify-center flex-col gap-3">
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
                                    350/100,000
                                </h3>
                                <p className='text-[#CCDCDF] text-sm'>Amount claimed to total</p>
                                </div>
                            </div>


                        </div>
                    </div>


                    <div className='rounded-[10px] bg-[#272727]'>
                        <AirdropTable transactions={transactions}/>
                    </div>
                </div>

            </div>
        
        </>
    )
}

export default SingleAirdrop
