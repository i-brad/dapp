import React from "react";
import EmptyState from "../EmptyState";
import Image from "next/image";
import { TelegramIcon, TwitterIcon2 } from "../IconComponent";
import { Global } from "iconsax-react";
import Link from "next/link";

const LocksTable = ({ transactions }) => {
    return (
        <div>
            {transactions.length < 1 ? (
                <EmptyState title={"No Locks yet"} />
            ) : (
                <>
                    <div className="overflow-x-auto md:overflow-x-auto px-4 text-white scrollbar-change">
                        <table className="min-w-full leading-normal table-auto overflow-x-auto relative order-table">
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
                                            <Link href={'/lock/'+transaction.id} className="flex flex-row items-center gap-2 whitespace-nowrap">
                                                <div className="flex flex-row w-12">
                                                    <div className="w-full h-12 min-h-[30px] relative overflow-hidden featured__card_img block object-contain rounded-full">
                                                        <Image
                                                            src={"/images/icon.png"}
                                                            alt={"fall-back"}
                                                            fill
                                                            className="rounded-t-[16px] w-full h-full object-cover object-center"
                                                            priority
                                                        />
                                                    </div>
                                                    
                                                </div>
                                                <div className='font-medium flex flex-col'>
                                                    <span className="text-white text-base">
                                                        {transaction?.name}
                                                    </span>
                                                    <span className="text-[#A19B99] text-base">
                                                        SAF
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
                                                    <span className="text-white text-sm">
                                                        {transaction?.blockchain}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <p className="text-sm text-white">
                                                {transaction.total}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm whitespace-nowrap">
                                            <div className="text-[#A19B99] text-base flex items-center gap-2 flex-row">
                                                {transaction?.socials?.map((social, index)=>(
                                                    <div key={index} className="">
                                                        {social.twitter ? <Link href={`${social.twitter}`} className='bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full'><TwitterIcon2 width={22} height={22}/></Link>: ''}
                                                        {social.website ? <Link href={`${social.website}`} className='bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full'><Global size={22}/></Link>: ''}
                                                        {social.telegram ? <Link href={`${social.telegram}`} className="bg-[#353432] h-10 w-10 flex items-center justify-center rounded-full"><TelegramIcon/></Link>: ''}
                                                    </div>
                                                ))}
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
