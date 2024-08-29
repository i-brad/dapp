"use client";
import StakeAgree from "@/app/components/Modals/StakeAgree";
import StepperStake from "@/app/components/Steps/Stepper";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CreateStake = () => {
  const {
    isOpen: stakeAgreeIsOpen,
    onOpen: onStakeAgreeOpen,
    onClose: onStakeAgreeClose,
  } = useDisclosure();

  useEffect(() => {
    const timer = setTimeout(() => {
      onStakeAgreeOpen();
    }, 0);

    return () => clearTimeout(timer);
  }, [onStakeAgreeOpen]);

  return (
      <>
          <div>
              <div className="flex flex-row items-center justify-between mb-8">
                  <h1 className="text-2xl font-medium lg:text-4xl">Stake</h1>
                  <div className="flex flex-row flex-wrap items-center justify-end w-full gap-6 mt-3 text-md md:mt-0 md:flex-nowrap ">
                      {/* <Tooltip hasArrow label='Watch how to create a Fair Launch' placement='top'> */}

                      <Link
                          href={"https://thrustpad.gitbook.io/docs"}
                          target="_blank"
                          className="w-auto whitespace-nowrap py-2 md:py-3 px-3 md:px-5 bg-[#313131] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                      >
                          <span>
                              <div className="relative block object-contain w-6 h-6 overflow-hidden rounded-full">
                                  <Image
                                      src={"/images/youtube.svg"}
                                      alt={"fall-back"}
                                      fill
                                      className="rounded-t-[16px] w-full h-full object-cover object-center"
                                      priority
                                  />
                              </div>
                          </span>
                          <p className="hidden md:block">Watch how to create a Fair Launch</p>
                      </Link>
                      {/* </Tooltip> */}
                  </div>
              </div>

              <div className="py-4 md:py-8">
                  <StepperStake />
              </div>
          </div>

          {/* <StakeAgree 
                isOpen={stakeAgreeIsOpen}            
                onClose={onStakeAgreeClose}
            /> */}
      </>
  );
};

export default CreateStake;
