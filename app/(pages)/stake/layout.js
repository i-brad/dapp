import React from 'react'

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
