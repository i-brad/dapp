"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import {
    RecordCircle,
    Profile,
    Global,
    NotificationBing,
    Profile2User,
    LogoutCurve,
    Setting2,
    Setting3,
    SearchNormal,
    ArrowDown2,
    ArrowUp,
    Copy,
} from "iconsax-react";
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
            <header className="bg-[#272727] border-b-[0.5px] border-[#3B3939] z-[999] h-24 ">
                <div className="container mx-auto px-4 lg:px-4 h-full">
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
                                    {/* <Menu className=" bg-[#034343]" closeOnSelect={false}> */}
                                    {/* <MenuButton className='hover:bg-[#212121]'>
                        <div className="flex items-start justify-start gap-2 border border-[#444445] rounded-t-lg rounded-b-lg h-auto px-2 min-w-[150px] py-2 w-full">
                          <Image
                            src={`${'/images/avatar-1.png'}`}
                            alt=""
                            width={20}
                            height={20}
                            className="rounded-full"
                          />

                          <div className="flex flex-col items-start text-sm pr-2 ">
                            <span className='text-[#F0EDED]'>
                              {`HPZ...7Ng`}
                              ...
                            </span>
                            <span className='text-[#F38656]'>
                              {`0 EDU`}
                            </span>
                          </div>
                          <span>
                            <ArrowDown2 size={12}/>
                          </span>
                        </div>
                      </MenuButton>
                      <MenuList
                        className="bg-[#303030] py-3 text-white text-sm border-none rounded-md z-[99]"
                        minWidth="200px"
                        // maxWidth="180px"
                      >
                        <MenuItem className='p-0 w-full bg-[#303030]'                      
                        >
                          <div className="relative flex items-start justify-start gap-2 h-auto px-2 py-2 w-full hover:bg-[#212121]">
                            <Image
                              src={`${'/images/avatar-1.png'}`}
                              alt=""
                              width={35}
                              height={35}
                              className="rounded-full"
                            />

                            <div className="flex flex-col items-start text-base pr-2 ">
                              <span className='text-[#FFFFFF] font-medium'>
                                {`HPZ...7Ng`}
                                ...
                              </span>
                              <span className='text-[#D0CFCF]'>
                                {`0 EDU`}
                              </span>
                            </div>
                            <span>
                              <Copy size={14}/>
                            </span>
                          </div>
                        </MenuItem>

                        <div className='p-2 w-full'>
                          <button
                            className="bg-[#303030] hover:bg-[#212121]  transition duration-200 ease-in-out p-2 border border-[#6E6B6B] py-1 px-3 rounded-2xl text-xs inline-flex items-center gap-3"
                          >
                            Block explorer <span><ArrowUp size={12} className='rotate-45'/></span>
                          </button>
                        </div>

                        <MenuItem
                          className="bg-[#303030] hover:bg-[#212121] transition duration-200 ease-in-out p-2 inline-flex items-center gap-2 tex-sm"
                        >
                          <span className='bg-[#414040] p-1 rounded-full'>
                            <LogoutCurve size={14} color="#fff" className='rounded-full' />
                          </span>
                          Disconnect
                        </MenuItem>
                      </MenuList> */}
                                    {/* </Menu> */}
                                </div>
                                {/* )} */}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
