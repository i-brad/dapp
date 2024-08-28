import React from 'react'

export const metadata = {
    title: "Staking",
    keyword: ["ThrustPad",  "Launchpad", "Stake Token", "Token Staking Platform"],
};

const layout = ({children}) => {
  return (
    <>
        <div className='w-full container mx-auto py-4 md:py-12 min-h-[900px]'>
            {children}
        </div>
    </>
  )
}

export default layout
