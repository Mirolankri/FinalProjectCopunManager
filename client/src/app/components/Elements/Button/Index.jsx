import React from 'react'

const Button = ({children, onClick, disabled}) => {
  return (
    <button
            disabled={disabled}
            type="button"
            onClick={onClick}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}  inline-flex w-full justify-center items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs  hover:bg-gray-500 `}
          >
            {/* <PencilIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-gray-400" /> */}
            {children}
          </button>
  )
}

export default Button