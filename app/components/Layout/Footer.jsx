'use client'

import Link from "next/link";
import {
    TwitterIcon,
    YoutubeIcon,
    LinkedInIcon,
    TelegramIcon,
    FacebookIcon,
    TwitterIcon2,
} from "../IconComponent";
import Image from "next/image";
import { Danger } from "iconsax-react";

const Footer = () => {
    return (
        <footer className="bg-[#272727] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="space-y-16">
                    <div className="py-[18px] px-6 bg-[#3D3D3D] rounded-lg">
                        <div className="flex items-start w-full gap-2">
                            <span>
                                <Danger size={22}/>
                            </span>
                            <p className="text-sm">
                                While Thrustpad facilitates project launches, 
                                we never endorse or encourage investment in any specific project. 
                                Remember, it's your responsibility to research thoroughly and consult a financial 
                                professional before making investment decisions. 
                                We would not be held responsible for any losses.
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center  justify-between flex-wrap">
                            <div className="w-full md:w-1/4 flex items-center mb-4 md:mb-0 ">
                                <Image
                                    src="/images/logo.svg"
                                    alt="logo"
                                    width={200}
                                    height={150}
                                />
                            </div>

                            <div className="flex justify-end w-full md:w-3/4 flex-wrap gap-3">
                                <h4>
                                    Follow Us
                                </h4>
                                <div className="flex space-x-6">
                                    <Link
                                        href="/"
                                        target="_blank"
                                        className="cursor-pointer"
                                    >
                                        <TelegramIcon className={"w-6 h-6"} />
                                    </Link>

                                    <Link
                                        href="/"
                                        target="_blank"
                                        className="cursor-pointer"
                                    >
                                        <TwitterIcon2 className={"w-6 h-6"} />
                                    </Link>

                                    <Link
                                        href="/"
                                        target="_blank"
                                        className="cursor-pointer"
                                    >
                                        <FacebookIcon className={"w-6 h-6"} />
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
