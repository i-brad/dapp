"use client";
import LocksTable from "@/app/components/DataTable/LocksTable";
import { formatNumber } from "@/app/lib/utils";
import { Spacer } from "@chakra-ui/react";
import { SearchNormal, SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const Lock = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = useMemo(() => {
    if (searchQuery && transactions?.length > 0) {
      const filteredTransactions = transactions.filter((transaction) =>
        transaction?.lock_name
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase())
      );
      return filteredTransactions;
    }
    return transactions;
  }, [searchQuery, transactions]);

  useEffect(() => {
    const getLocks = async () => {
      try {
        const response = await fetch("/api/lock");
        if (response.ok) {
          const data = await response.json();
          setTransactions(data?.locks);
        }
      } catch (error) {
        console.error("failed to fetch locks", error);
      }
    };

    getLocks();
    // setTransactions();
  }, []);

  const totalVolume = useMemo(() => {
    if (transactions?.length > 0) {
      const volume = transactions?.reduce((total, item) => {
        return total + item?.lock_amount;
      }, 0);

      return formatNumber(volume || 0);
    }
    return 0;
  }, [transactions]);

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-medium lg:text-4xl">Lock</h1>

          <div className="flex flex-row flex-wrap items-center justify-end w-full gap-6 mt-3 text-md md:mt-0 md:flex-nowrap ">
            <div className=" relative rounded-full  items-center w-40 min-w-[25rem] h-10 hidden lg:block">
              <div className="absolute inset-y-0 left-0 flex items-center h-full pl-1 pointer-events-none">
                <span className="px-3 text-gray-500">
                  <SearchNormal1 size={22} />
                </span>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchQuery}
                onChange={(event) => {
                  const value = event.target.value;
                  setSearchQuery(value);
                }}
                className="border border-[#3B3939] py-2 px-4 block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none bg-transparent !text-white"
                placeholder="search locks"
              />
            </div>

            <button className="rounded-full p-3 border border-[#3B3939] lg:hidden block">
              <SearchNormal1 size={22} />
            </button>

            <Link
              href={"/lock/create-lock"}
              className="w-auto whitespace-nowrap py-3 px-5 bg-[#DA5921] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
            >
              Create lock
            </Link>
          </div>
        </div>

        <div className="space-y-10">
          <div className="rounded-[10px] bg-[#272727]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-3 px-3 w-full divide-y md:divide-y-0 md:divide-x divide-[#524F4D] text-white">
              <div className="flex flex-col items-center justify-center w-full gap-3 px-4 py-4">
                <div className="w-16 h-16 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                  <Image
                    src={"/images/metal-padlocks.svg"}
                    alt={"fall-back"}
                    fill
                    className="rounded-t-[16px] w-full h-full object-contain object-center"
                    priority
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-medium text-white">
                    {totalVolume}
                  </h3>
                  <p className="text-[#CCDCDF] text-sm">Total Volume Locked</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full gap-3 px-4 py-4">
                <div className="w-16 h-16 min-h-[50px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                  <Image
                    src={"/images/metal-padlocks-different.svg"}
                    alt={"fall-back"}
                    fill
                    className="rounded-t-[16px] w-full h-full object-contain object-center"
                    priority
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-medium text-white">
                    {transactions?.length || 0}
                  </h3>
                  <p className="text-[#CCDCDF] text-sm">Locks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] bg-[#272727]">
            <LocksTable transactions={filteredTransactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lock;
