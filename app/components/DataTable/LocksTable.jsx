import { Global } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import EmptyState from "../EmptyState";
import { TelegramIcon, TwitterIcon2 } from "../IconComponent";

const LocksTable = ({ transactions }) => {
  return (
    <div>
      {transactions.length < 1 ? (
        <EmptyState title={"No Locks yet"} />
      ) : (
        <>
          <div className="px-4 overflow-x-auto text-white md:overflow-x-auto scrollbar-change">
            <table className="relative min-w-full overflow-x-auto leading-normal table-auto order-table">
              <thead className="font-normal">
                <tr className="text-[#908D8B]">
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                  >
                    Project name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                  >
                    Blockchain
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                  >
                    Total supply
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-[#363636]  text-left text-sm   whitespace-nowrap"
                  >
                    Social links
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#464849]">
                {transactions?.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 text-sm whitespace-nowrap">
                      <Link
                        href={"/lock/" + transaction._id}
                        className="flex flex-row items-center gap-2 whitespace-nowrap"
                      >
                        <div className="flex flex-row w-12">
                          <div className="w-full h-12 min-h-[30px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                            {transaction?.logo_url ? (
                              <Image
                                src={transaction?.logo_url}
                                alt={"fall-back"}
                                fill
                                className="rounded-t-[16px] w-full h-full object-cover object-center"
                                priority
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="flex flex-col font-medium">
                          <span className="text-base text-white capitalize line-clamp-1 text-ellipsis">
                            {transaction?.lock_name}
                          </span>
                          <span className="text-[#A19B99] line-clamp-1 text-ellipsis capitalize text-base">
                            {transaction?.project_title}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="px-5 py-5 text-sm whitespace-nowrap">
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-row w-8">
                          <div className="w-full h-8 min-h-[30px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                            <Image
                              src={"/images/opencampus-edu.png"}
                              alt={"fall-back"}
                              fill
                              className="rounded-t-[16px] w-full h-full object-cover object-center"
                              priority
                            />
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-white">
                            {/* {transaction?.blockchain} */}
                            Open Campus
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm whitespace-nowrap">
                      <p className="text-sm text-white">
                        {transaction?.lock_amount}
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm whitespace-nowrap">
                      <div className="text-[#A19B99] text-base flex items-center gap-2 flex-row">
                        {transaction?.twitter ? (
                          <Link
                            target="_blank"
                            href={`${transaction?.twitter}`}
                            className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                          >
                            <TwitterIcon2 width={22} height={22} />
                          </Link>
                        ) : null}
                        {transaction?.website ? (
                          <Link
                            target="_blank"
                            href={`${transaction?.website}`}
                            className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                          >
                            <Global size={22} />
                          </Link>
                        ) : null}
                        {transaction?.telegram ? (
                          <Link
                            target="_blank"
                            href={`${transaction?.telegram}`}
                            className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"
                          >
                            <TelegramIcon />
                          </Link>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default LocksTable;
