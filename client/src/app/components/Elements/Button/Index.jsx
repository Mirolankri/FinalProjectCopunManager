'use client'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({children, onClick, disabled,variant,className}) => {

  const variants = {
    default: 'inline-flex w-full justify-center items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs  hover:bg-gray-500',
    outline: 'inline-flex w-full justify-center items-center text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800',
    link: 'inline-flex w-full justify-center items-center text-gray-900 hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800',
    circle: 'flex shadow-xl items-center justify-center bg-white text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-3 w-15 h-15 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800',
  }
  const variantClass = variants[variant] || variants.default
  
  return (
    <button
            disabled={disabled}
            type="button"
            onClick={onClick}
            className={` ${variantClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {children}
          </button>
  )
}

export default Button