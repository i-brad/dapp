"use client"
import { ArrowDown, ArrowDown2 } from 'iconsax-react';
import Image from 'next/image';
import React, { useState } from 'react';

const CustomDropdown = ({ items, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        onSelect(item);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between px-4 py-2 w-full text-sm text-white bg-[#272727] rounded-md focus:outline-none border-[#464849] border h-12"
            >
                {selectedItem ? (
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 relative overflow-hidden block object-contain rounded-full">
                            <Image
                                src={selectedItem.src}
                                alt={selectedItem.src}
                                fill
                                className="w-full h-full object-cover object-center"
                                priority
                            />
                        </div>
                        {/* <img src={selectedItem.src} alt={selectedItem.name} className="w-6 h-6 rounded-full" /> */}
                        <span>{selectedItem.name}</span>
                    </div>
                ) : (
                    "Select DEX"
                )}

                <ArrowDown2 size={16}/>
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#272727] border border-[#464849] rounded-md shadow-lg z-10">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#3B3939] w-full text-left"
                        >
                            <div className="w-6 h-6 relative overflow-hidden block object-contain rounded-full">
                                <Image
                                    src={item.src}
                                    alt={item.src}
                                    fill
                                    className="w-full h-full object-cover object-center"
                                    priority
                                />
                            </div>
                            {/* <img src={item.src} alt={item.name} className="w-6 h-6 rounded-full" /> */}
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
