'use client'
import React from 'react'
import { Main } from './main/Main'
import { Header } from './header/Header'
import BottomMenu from './header/BottomMenu/BottomMenu'

export const Layout = ({ children }) => {
  return (
    <div className="min-h-full ">
        <Header />
        <Main>{children}</Main>
        <BottomMenu />
    </div>
  )
}
