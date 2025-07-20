'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Button from '@/app/components/Elements/Button/Index'
import Input from '@/app/components/Elements/Forms/components/Input/Input'
import { useUser } from '@/app/components/providers/UserProvider'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import { PencilIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import AccountPage from './components/AccountPage'
import ListMyUsersPage from './components/ListMyUsersPage'
import ListAllUsersPage from './components/ListAllUsersPage'

export default function Account() {
  const { userData,user,loading } = useUser()
  if(loading || !userData) return <Spinner/>
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className=" w-full ">
        <TabsTrigger value="account">חשבון</TabsTrigger>
        <TabsTrigger value="plan">תוכנית</TabsTrigger>
        <TabsTrigger value="users">משתמשים</TabsTrigger>
      {userData.isSuperAdmin && (
        <TabsTrigger value="allusers">כל המשתמשים</TabsTrigger>
      )}
      </TabsList>
      
      <TabsContent value="plan">
        <Card>
          <CardHeader>
            <CardTitle>תוכנית</CardTitle>
            <CardDescription>
              צפייה וניהול תוכניות
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              {/* <Label htmlFor="current">Current password</Label> */}
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              {/* <Label htmlFor="new">New password</Label> */}
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="account">
        <AccountPage userData={userData} />
      </TabsContent>
      <TabsContent value="users">
        <ListMyUsersPage userData={userData} />
      </TabsContent>
      {userData.isSuperAdmin && (
      <TabsContent value="allusers">
        <ListAllUsersPage userData={userData} />
      </TabsContent>)}
    </Tabs>
  )
}
