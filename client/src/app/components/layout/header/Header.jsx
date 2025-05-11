'use client'
import React from 'react'
import { NavBar } from './TopNavBar/NavBar'

export const Header = () => {
  return (
    <>
      <NavBar />
      <div className="h-16"></div>
      <header className="bg-white shadow-sm">
        {/* <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        </div> */}
      </header>
    </>
  )
}
