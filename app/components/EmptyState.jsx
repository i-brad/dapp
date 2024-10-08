'use client';
import Image from 'next/image';
import React from 'react';

const EmptyState = ({title = 'No data found'}) => {
  return (
    <div className="flex items-center h-full w-full justify-center py-12 text-center">
      <div>
        <Image
          src="/images/Wallet.png"
          alt="wallet"
          width={150}
          height={150}
          className="object-contain"
        />
        <p className="text-sm text-[#C0C0C0] mt-3">{title}</p>
      </div>
    </div>
  );
};

export default EmptyState;
