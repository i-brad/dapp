import React from 'react'

export const metadata = {
    title: "Token Lock",
    keyword: ["ThrustPad", "Launchpad", "Lock Token", "Token Locking Platform"],
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
