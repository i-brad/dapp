'use client';

import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import {
  RecordCircle,
  Profile,
  Profile2User,
  ArrowDown2,
  Add,
  Briefcase,
  More,
  LogoutCurve,
  Setting3,
  ArrowUp2,
  ArrowRight2,
} from 'iconsax-react';
import { useDisclosure } from '@chakra-ui/react';

import Image from 'next/image';
import './nav.css';
import { bottomMenuLinks, topMenuLinks } from '@/app/lib/constants';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [activeDropdowns, setActiveDropdowns] = useState([]);
  const [isDropdown, setIsDropdown] = useState(true);

  // w-56

  const showDropdown = (index) => {
    if (activeDropdowns.includes(index)) {
      setActiveDropdowns(activeDropdowns.filter((i) => i !== index));
    } else {
      setActiveDropdowns([...activeDropdowns, index]);
    }
  };


  return (
    <>
      <div
        className={`h-full sidebar pb-4 bg-[#272727] lg:flex justify-between shadow-sm no-scrollbar flex-col overflow-y-auto overflow-x-hidden border-r-[1px] border-[#3B3939] md:hover:w-56 md:w-20 w-56 z-50 fixed md:translate-x-0 ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
      }`}
        
        onClick={toggleSidebar}
        style={{
          transition: 'all 500ms ease-in-out ',
        }}
      >
        <div className="flex flex-col">
          <div className="h-16 md:h-24">
            <div className="flex items-center justify-center py-2 border-b  border-[#3B3939]  relative h-full ">
              <div className="px-3 w-full block h-full ">
                <Link
                  href={'/'}
                  className="flex gap-2"
                >

                  <div className='flex items-center w-auto md:w-20 justify-center h-auto md:h-20'>
                    <Image
                      src="/images/logo2.svg"
                      height={100}
                      width={100}
                      className="transition 300ms ease object-contain w-auto h-auto"
                      priority
                      alt="logo"
                    />
                  </div>
                  
                  <Image
                    src="/images/logo3.svg"
                    height={50}
                    width={50}
                    className="transition 300ms ease object-contain w-auto h-auto md:hidden block"
                    priority
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
          </div>

          <nav className="mt-6 md:mt-3 grow">
            <div className="flex flex-col space-y-5">
              <div className=" flex-wrap flex flex-col">
                {topMenuLinks.map((menuItem, index) => (
                  <Link href={`${menuItem.href}`} key={menuItem.label}>
                    <div
                      className={`menu-item w-full font-thin ${
                        pathname == menuItem.href ||
                        pathname.startsWith(`${menuItem.href}/`)
                          ? ' text-[#EA6A32]'
                          : 'text-white '
                      }  flex items-center  px-5 transition-colors duration-200 ease-in hover:text-[#EA6A32] justify-between text-sm text-left h-10 ${
                        isDropdown ? 'active-dropdown' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center flex-grow h-full gap-3">
                        <span
                          onClick={menuItem.action}
                          className="text-left flex items-center justify-center w-20 h-20"
                        >
                          {menuItem.icon}
                        </span>
                        {/* <span
                          onClick={menuItem.action}
                          className="text-left h-full flex items-center"
                        >
                          {menuItem.icon}
                        </span> */}
                        <div className=" w-full h-full flex items-center">
                          <div
                            className={classNames(
                              'text-base font-normal w-full flex-1 flex-grow flex items-center h-full'
                            )}
                            
                          >
                            {menuItem.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className=" flex-wrap flex flex-col">
                {bottomMenuLinks.map((menuItem, index) => (
                  <Link href={`${menuItem.href}`} key={menuItem.label}>
                    <div
                      className={`menu-item w-full font-thin ${
                        pathname == menuItem.href ||
                        pathname.startsWith(`${menuItem.href}/`)
                          ? 'text-[#EA6A32]'
                          : 'text-white '
                      }  flex items-center  px-5 transition-colors duration-200 ease-in hover:text-[#EA6A32] justify-between text-sm text-left h-10 ${
                        isDropdown ? 'active-dropdown' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center flex-grow h-full gap-3">
                        <span
                          onClick={menuItem.action}
                          className="text-left flex items-center justify-center w-20 h-20"
                        >
                          {menuItem.icon}
                        </span>
                        <div className=" w-full h-full flex items-center">
                          <div
                            className={classNames(
                              'text-base font-normal w-full flex-1 flex-grow flex items-center h-full'
                            )}
                          >
                            {menuItem.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
