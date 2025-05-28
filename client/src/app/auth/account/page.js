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

export default function Account() {
  const { userData,user,loading } = useUser()
  // if(loading || !userData) return <Spinner/>
  if(loading || !userData) return <>Loading...</>

  // console.log("user", user);
  // console.log("userData", userData);
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
      {userData.isSuperAdmin && (
        <TabsTrigger value="allusers">כל המשתמשים</TabsTrigger>
      )}
        <TabsTrigger value="users">משתמשים</TabsTrigger>
        <TabsTrigger value="plan">תוכנית</TabsTrigger>
        <TabsTrigger value="account">חשבון</TabsTrigger>
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
        <Card>
          <CardHeader>
            <CardTitle>משתמשים</CardTitle>
            <CardDescription>
              צפייה וניהול משתמשים
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {!userData.isAdmin && <div className="text-red-500">אינך מורשה לצפייה וניהול משתמשים</div>}
            {userData.isAdmin && <div className="text-green-500">
              אתה מורשה לצפייה וניהול משתמשים
              <Button variant="outline" className="flex items-center gap-2">
                <PlusIcon className="size-4" />
                משתמש חדש
              </Button>
              </div>}
          </CardContent>
        </Card>
      </TabsContent>
      {userData.isSuperAdmin && (
      <TabsContent value="allusers">
        <Card>
          <CardHeader>
            <CardTitle>משתמשים</CardTitle>
            <CardDescription>
              צפייה וניהול משתמשים
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          אתה מורשה לצפייה וניהול משתמשים
              <Button variant="outline" className="flex items-center gap-2">
                <PlusIcon className="size-4" />
                משתמש חדש
              </Button>
          </CardContent>
        </Card>
      </TabsContent>)}
    </Tabs>
  )
}
