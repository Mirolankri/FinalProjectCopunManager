'use client'
import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useUser } from '@/app/components/providers/UserProvider'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import AccountPage from './components/AccountPage'
import ListMyUsersPage from './components/ListMyUsersPage'

export default function Account() {
  const { userData,user,loading } = useUser()
  if(loading || !userData) return <Spinner/>
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className=" w-full ">
        <TabsTrigger value="account">חשבון</TabsTrigger>
        <TabsTrigger value="users">משתמשים</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <AccountPage userData={userData} />
      </TabsContent>
      <TabsContent value="users">
        <ListMyUsersPage userData={userData} />
      </TabsContent>
    </Tabs>
  )
}
