"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import { NotificationBing, SearchNormal } from "iconsax-react";
import Image from "next/image";
import { Category, Search } from "react-iconly";
import { LoaderIcon, LogoutIcon } from "../IconComponent";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    Button,
} from "@chakra-ui/react";

import { Magicpen, More, NoteAdd, Trash, UserAdd } from "iconsax-react";
import { ConnectWallet } from "../shared/ConnectWallet";
import PrimaryButton from "../shared/Buttons";

const Navbar = ({ user }) => {
    const pathname = usePathname();

    const showDashMenu = null;
    return (
        <>
            <header className="bg-[#272727] border-b-[0.5px] border-[#3B3939] z-[999] h-16 md:h-24 ">
                <div className="md:max-w-[calc(100%-14rem)] mx-auto px-4 lg:px-4 h-full">
                    <nav className="flex items-center justify-between flex-wrap py-4 h-full ">
                        <div className="lg:flex hidden h-full items-center">
                            <div className=" relative rounded-full  items-center h-10 min-w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full">
                                    <span className="text-[#BEBDBD] px-3 pr-4">
                                        <SearchNormal size={22} />
                                    </span>
                                </div>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="border border-[#3B3939] py-2  block w-full min-w-full pl-14 pr-12 sm:text-sm rounded-full h-full focus:outline-none  bg-transparent text-[#BEBDBD]"
                                    placeholder="Type project name or address to search"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="w-full  flex-grow flex items-center lg:w-auto justify-end h-full">
                            <div className="flex items-center w-auto gap-5">
                                <button className="rounded-full p-3 border border-[#3B3939] lg:hidden block">
                                    {/* <span className="text-[#BEBDBD]"> */}
                                    <SearchNormal size={22} />
                                    {/* </span> */}
                                </button>

                                <button className="rounded-full p-3 border border-[#3B3939]">
                                    <NotificationBing size={22} variant="Outline" color="#BEBDBD" />
                                </button>

                                <div className="relative flex items-center justify-center z-[999] ">
                                    <ConnectWallet>
                                        <PrimaryButton
                                            text="Connect wallet"
                                            as="span"
                                            className="w-fit"
                                        />
                                    </ConnectWallet>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
