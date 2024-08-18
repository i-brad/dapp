import React from 'react'

const layout = ({children}) => {
  return (
    <>
        <div className='max-w-6xl mx-auto py-4 md:py-12 min-h-[900px]'>
            {children}
        </div>
    </>
  )
}

export default layout
