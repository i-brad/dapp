'use client'
import React from 'react'
import Image from 'next/image'
import { Shuttle, Shuttle2 } from '../../IconComponent'
import { forInvestors, forProjectOwners } from '@/app/lib/constants'
import MySwiperComponent from './slider'

const HomePage = () => {
  return (
    <>
      <section className=''>
        <div className=''>
          <MySwiperComponent/>
        </div>
      </section>
      
      <section className='py-12 lg:py-24'>
        <div className=''>
          <div className='mb-5 text-left space-y-4'>
            <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
             Featured Projects
            </h2>
          </div>

          <div className="py-6 overflow-x-auto lg:overflow-x-scroll xl:overflow-x-visible scrollbar-change">
            <div className="leading-[26px] flex gap-4 w-[200%] md:w-full">
              <div className="min-w-[400px] md:min-w-[50%]">
                <div className="block relative h-40 md:h-60 lg:h-72 items-center justify-between gap-4 rounded-lg">
                  <Image
                    src="/images/grasp-academy.svg"
                    alt="grasp-academy"
                    fill
                    className="object-contain w-full h-full rounded-lg"
                  />
                </div>
              </div>

              <div className="min-w-[400px] md:min-w-[50%]">
                <div className="block relative h-40 md:h-60 lg:h-72 items-center justify-between gap-4 rounded-lg">
                  <Image
                    src="/images/thrustpad.svg"
                    alt="thrustpad"
                    fill
                    className="object-fill  w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className='py-12 lg:py-18'>
        <div className=''>
          <div className='mb-5 text-left space-y-4'>
            <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
            Our Mission Statement
            </h2>
          </div>

          <div className="py-6">
            <div className='text-base leading-[26px]'>
              <p>
                At Thrustpad, we help raise funds for Initial Liquidity Offerings (ILOs) to provide the necessary liquidity for new projects. 
                This liquidity is crucial for facilitating the trading of new tokens in the market. We also give projects the flexibility to access 
                at most 30% of the funds raised, while deploying the rest 70% on DEX as liquidity, 
                assuring not only liquidity for investor security but also marketing 
                and growth budget for the project's sustainability.
              </p> <br/>
              <p>
                Our staking and lock tools also help to mitigate the risk of team dumping liquidity and investors staking to prevent the project from losing liquidity too early.
              </p><br/>
              <p>
              We also provide marketing and tokenomics supports to ensure project success and our community investment security.
              </p><br/>
            </div>
          </div>
        </div>
      </section>

      <section className='py-12 lg:py-24'>
        <div className=''>
          <div className='mb-5 text-left space-y-4'>
            <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
              For Investors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-6">
            {forInvestors.map((item, index)=>(
              <div key={index} className='card flex flex-col gap-5 bg-[#272727] rounded-2xl py-4 px-4 min-h-[180px] md:max-h-[250px] lg:max-h-full'>
                  <div>
                    <span className='card-icon h-14 w-14 rounded-full p-3 text-[#FFA178] bg-[#414040] inline-block flex items-center justify-center'>
                      {item.icon}
                    </span>              
                  </div>

                  <div className='card-body flex flex-col gap-3'>
                    <div className='card-title text-lg leading-6 font-semibold'>
                      {item.title}
                    </div>
                    <div className='card-subtitle text-base leading-5'>
                      {item.subtitle}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-12 lg:py-24'>
        <div className=''>
          <div className='mb-5 text-center max-w-3xl mx-auto space-y-4'>
            <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
              For Project Owners
            </h2>
            <p className='text-base leading-[28px]'>
              Thrustpad makes it easier for you to conduct your raise and make your project successful with tools that we have in place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-6">
            {forProjectOwners.map((item, index)=>(
              <div key={index} className='card flex flex-col gap-5 bg-[#272727] rounded-2xl py-4 px-4 min-h-[180px] md:max-h-[250px] lg:max-h-full'>
                  <div>
                    <span className='card-icon h-14 w-14 rounded-full p-3 text-[#FFA178] bg-[#414040] inline-block flex items-center justify-center'>
                      {item.icon}
                    </span>              
                  </div>

                  <div className='card-body flex flex-col gap-3'>
                    <div className='card-title text-lg leading-6 font-semibold'>
                      {item.title}
                    </div>
                    <div className='card-subtitle text-base leading-5'>
                      {item.subtitle}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
