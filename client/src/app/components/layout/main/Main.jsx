'use client'
import React from 'react'

export const Main = ({ children }) => {
  return (
    <main className='mt-16'>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
        {children}
        </div>
      </main>
  )
}
