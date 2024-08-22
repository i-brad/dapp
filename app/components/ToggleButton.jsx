import React from 'react'

const ToggleButton = ({isOpen, toggleSidebar}) => {
  return (
    <>
      <button
            className={`navbar-burger flex items-center py-3 px-3 text-[#FFFFFF] rounded relative transition-all duration-150 ease-linear md:hidden ${
                isOpen ? "open" : ""
            }`}
            id="nav-icon3"
            onClick={toggleSidebar}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    </>
  )
}

export default ToggleButton
