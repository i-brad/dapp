import { Progress } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TelegramIcon, TwitterIcon2 } from '../IconComponent'
import { Global } from 'iconsax-react'

const CollectionItem = () => {
  return (
    <>
        <div className='bg-[#272727] min-h-[350px] p-4 rounded-lg font-medium relative'>
            <div className='flex flex-col gap-4 justify-between h-full '>
                <div className='bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 absolute right-2 top-2'>
                    <span className='h-1 w-1 rounded-full bg-[#00FFA3] block'></span>
                    In Progress
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row w-20 relative">
                        <div className="w-full h-20 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                            <Image
                                src={"/images/icon.png"}
                                alt={"fall-back"}
                                fill
                                className="rounded-t-[16px] w-full h-full object-cover object-center"
                                priority
                            />
                        </div>
                        
                        <Image
                            src={"/images/opencampus-edu.png"}
                            alt={"fall-back"}
                            height={15}
                            width={15}
                            className="rounded-full object-cover object-center absolute bottom-0 right-3"
                            priority
                        />
                    </div>
                    <div className='font-medium flex flex-col'>
                        <span className="text-white text-base">
                            Chakra Simp
                        </span>
                        <span className="text-[#C3C1C1] text-sm">
                            Presale
                        </span>
                        <span className="text-[#ADB4B9] text-xs">
                            Max buy: 10 EDU
                        </span>
                    </div>
                </div>

                <div className='flex items-center justify-between font-medium flex-wrap gap-2'>
                    <p className='text-xs text-[#ADB4B9]'>Soft cap <span className='text-sm text-[#FFA178] ml-1'>300 EDU</span></p>
                    <p className='text-xs text-[#ADB4B9]'>Hard cap <span className='text-sm text-[#FFA178] ml-1'>1,256 EDU</span></p>
                </div>

                <div className='font-medium space-y-1'>
                    <p className='text-xs text-[#ADB4B9]'>Progress (0.00%)</p>
                    <Progress colorScheme='orange' size='sm' value={20} className='text-[#EA6A32] rounded-lg' isAnimated={true} />
                    <div className='text-xs text-[#ADB4B9] font-medium flex items-center justify-between'>
                        <p>0 EDU</p>
                        <p>200 EDU</p>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-2 flex-wrap'>
                    <div className='font-medium'>
                        <p className='text-[#ADB4B9] text-xs'>Liquidity</p>
                        <span className='text-[#FFA178] text-sm'>10%</span>
                    </div>
                    <div>
                        <p className='text-[#ADB4B9] text-xs text-right'>Lock</p>
                        <span className='text-[#FFA178] text-sm'>Manual</span>
                    </div>
                </div>

                <div className='flex items-end justify-between flex-wrap w-full'>
                    <div className="text-[#A19B99] text-base flex items-center justify-start gap-2 flex-row">
                        <Link href={`/`} className=' flex items-center justify-center rounded-full'><TwitterIcon2 width={24} height={22}/></Link>
                        <Link href={`/`} className='flex items-center justify-center rounded-full'><Global size={22}/></Link>
                        <Link href={`/`} className="flex items-center justify-center rounded-full"><TelegramIcon width={24} height={24}/></Link>
                    </div>
                    <div className='flex items-center justify-end'>
                        <div>
                            <p className='text-xs text-[#ADB4B9] text-right'>Sale ends in:</p>
                            <h4 className='text-[#F0EDED] text-[17px]'>12d 20h 10m</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CollectionItem
