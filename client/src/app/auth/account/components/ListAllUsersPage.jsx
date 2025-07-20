"use client"
import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import Button from '@/app/components/Elements/Button/Index'
import { PlusIcon } from '@heroicons/react/24/outline'
import { DataTable } from '@/app/components/Elements/Table/DataTable/data-table'
import { BadgeCheckIcon, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { labels, roles } from '@/app/components/Elements/Table/DataTable/data'
import { DatePicker } from '@/app/components/Elements/DatePicker'
import useUsers from '@/hooks/users/useUsers'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import { Badge } from '@/components/ui/badge'
import { copyToClipboard } from '@/helpers/Clipboard/copyToClipboard'
import { useAlert } from '@/providers/AlertProvider/AlertProvider'
// import { statuses,labels } from "./data"

const handleChangeRole = (userData) => {
  console.log("userData", userData);
}
export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="text-left font-medium">
  //       <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //     </div>
      
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const AlertInstance = useAlert();
      const userData = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[160px]">
            <DropdownMenuItem>עריכה</DropdownMenuItem>
            <DropdownMenuItem disabled={userData.isSuperAdmin} onClick={() => handleChangeRole(userData)}>
              {userData.isAdmin === true ? "הפוך למשתמש" : "הפוך למנהל"}
            </DropdownMenuItem>
            <DropdownMenuItem
                  onClick={() => copyToClipboard(userData.phone,AlertInstance)}
                >
                  העתקת טלפון
                </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuSub>
              <DropdownMenuSubTrigger className="direction-reverse">Labels</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={payment?.label}>
                  {labels.map((label) => (
                    <DropdownMenuRadioItem key={label.value} value={label.value}>
                      {label.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={userData.isSuperAdmin} className={`!text-red-500 focus:bg-red-200`}>
              הסרת משתמש
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-right">שם מלא</div>,
    cell: ({ row }) => {
      // const name = row.getValue("name")
      const {first,last} = row.original.name
 
      return <div className="text-right font-medium">{first} {last}</div>
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-right">טלפון</div>,
    cell: ({ row }) => {
      const phone = row.getValue("phone")
 
      return <div className="text-right font-medium">{phone}</div>
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-right">Email</div>,
    cell: ({ row }) => {
      const email = row.getValue("email")
 
      return <div className="text-right font-medium">{email}</div>
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="text-right">תפקיד</div>,
    cell: ({ row }) => {
      const {isAdmin,isSuperAdmin,isUser} = row.original
      let roleText = "משתמש"
      if(isAdmin) roleText = "מנהל"
      if(isSuperAdmin) roleText = "מנהל מערכת"
      if(isUser) roleText = "משתמש"

      return <div className="text-right font-medium">
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
          >
          <BadgeCheckIcon />
          {roleText}
        </Badge>
      </div>
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">סטטוס</div>,
    cell: ({ row }) => {
      const status = row.getValue("status")??"פעיל"
      return <div className="text-right font-medium">
        <Badge variant="destructive" className={`${status === "פעיל" ? "bg-green-400" : "bg-red-400"}`}>{status}</Badge>
      </div>
    },
  },
]
const data = [
  {
    id: "72e8ed52f",
    role: "admin",
    status: "todo",
    email: "m@example.com",
    phone: "123456789",
  },
  {
    id: "72e8ed52f",
    role: "user",
    status: "in progress",
    email: "m@example.com",
    phone: "123456789",
  },
  {
    id: "728ed5e2f",
    amount: 123,
    status: "done",
    email: "m@example.com",
  },
  {
    id:"23232323",
    amount: 123,
    status: "canceled",
    email: "m@example.com",
  },
]
const ListAllUsersPage = ({userData}) => {
  const { handleGetAllUsers,value } = useUsers();
  const { isLoading, error, users } = value;

  // console.log("value", value);
  console.log("users", users);
  
  useEffect(() => {
    // simulate delay
    // setTimeout(() => {
      handleGetAllUsers();
    // }, 5000);
  }, []);
  if(isLoading) return <Spinner/>
  return (
    <Card>
          <CardHeader>
            <CardTitle>משתמשים</CardTitle>
            <CardDescription>
              צפייה וניהול משתמשים
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DatePicker value={null} onChange={(e) => {
              console.log("Date changed", e)
            }} />
            {!userData.isSuperAdmin && <div className="text-red-500">אינך מורשה לצפייה וניהול משתמשים</div>}
            {userData.isSuperAdmin && <div className="text-green-500">
              אתה מורשה לצפייה וניהול משתמשים
              <Button variant="outline" className="flex items-center gap-2">
                <PlusIcon className="size-4" />
                משתמש חדש
              </Button>
              </div>}
              {userData.isSuperAdmin && (
                <div className="container mx-auto py-10">
                <DataTable columns={columns} data={users} />
                </div>
              )}
          </CardContent>
        </Card>
  )
}

export default ListAllUsersPage