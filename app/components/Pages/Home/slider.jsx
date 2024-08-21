'use client';
import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.css'
import Link from 'next/link';

const MySwiperComponent = () => {
  return (
    <Swiper 
        // pagination={true}
        spaceBetween={30}
        pagination={{
            clickable: true,
          }}
        modules={[Pagination, Navigation]} 
        navigation={true} 
        loop={true}
        
        className="mySwiper h-80 rounded-lg">
        <SwiperSlide>
            <div className='h-full px-4 md:px-12 lg:px-24 rounded-lg' style={{
                    backgroundImage: `url('/images/e7ec75ea0dc3c2bc8fc9b3327a9d7467.jpeg')`
                }}
                >
                <div className='h-full flex flex-col items-start justify-center z-10'>
                    <div className='space-y-2 z-10'>
                        <h1 className='font-semibold text-3xl text-white'>Fair Token Launchpad and Token Management Protocol</h1>
                        <p className='text-white font-lg'>Thrustpad allows projects organize raise for initial Liquidity, setup staking, create locks and launch token in one place.</p>
                    </div>
                    <div className="relative mt-8 flex flex-col items-start justify-start gap-2">
                        <div className="flex items-center justify-between text-base z-10">
                            <Link className="bg-[#DA5921] border border-[#DA5921] text-[#fff] px-5 py-3 text-base rounded-lg" href="/fair-launch/create">Create now</Link>
                            <div className="flex items-center">
                                <Link href="/" className="inline-block w-auto px-2 py-2.5 font-semibold">
                                    <span className="border-b-2 border-gray-300">Read Docs</span>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-[#31110282] pointer-events-none absolute top-0 left-0 w-full h-full opacity-60 z-[1]'></div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className='h-full px-4 md:px-12 lg:px-24 rounded-lg' style={{
                    backgroundImage: `url('/images/e7ec75ea0dc3c2bc8fc9b3327a9d7467.jpeg')`
                }}
                >
                <div className='h-full flex flex-col items-start justify-center z-10'>
                    <div className='space-y-2 z-10'>
                        <h1 className='font-semibold text-3xl text-white'>Fair Token Launchpad and Token Management Protocol2</h1>
                        <p className='text-white font-lg'>Thrustpad allows projects organize raise for initial Liquidity, setup staking, create locks and launch token in one place.</p>
                    </div>
                    <div className="relative mt-8 flex flex-col items-start justify-start gap-2">
                        <div className="flex items-center justify-between text-base z-10">
                            <Link className="bg-[#DA5921] border border-[#DA5921] text-[#fff] px-5 py-3 text-base rounded-lg" href="/">Create now</Link>
                            <div className="flex items-center">
                                <Link href="/" className="inline-block w-auto px-2 py-2.5 font-semibold">
                                    <span className="border-b-2 border-gray-300">Read Docs</span>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-[#31110282] pointer-events-none absolute top-0 left-0 w-full h-full opacity-60 z-[1]'></div>
            </div>
        </SwiperSlide>
    </Swiper>
  );
};

export default MySwiperComponent;
