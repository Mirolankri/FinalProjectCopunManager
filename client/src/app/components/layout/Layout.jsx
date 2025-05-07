'use client'
import React from 'react'
import { Main } from './main/Main'
import { Header } from './header/Header'

export const Layout = ({ children }) => {
  return (
    <div className="min-h-full ">
        <Header />
        <Main>{children}</Main>
    </div>
  )
}
