import AirDropStepper from '@/app/components/Steps/AirDropStepper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CreateAirdrop = () => {

    return (
        <>
            <div>
                <div className="flex flex-row items-center justify-between mb-8">
                    <div>
                        <div>
                            <h1 className="font-medium text-2xl lg:text-4xl mb-3">Airdrop Tool</h1>
                            <p className="text-[#A8B8C2] text-[13px]">
                                Airdrop your tokens to top projects and your upload list to create
                                exposure for your project
                            </p>
                        </div>
                    </div>
                    <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">
                        <Link
                            href={"https://thrustpad.gitbook.io/docs"}
                            target="_blank"
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
                            <p className="hidden md:block">Watch how to create an airdrop</p>
                        </Link>
                    </div>
                </div>

                <AirDropStepper />
            </div>
        </>
    );
}

export default CreateAirdrop
