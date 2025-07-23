"use client"
import React, { useEffect } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import useUsers from '@/hooks/users/useUsers'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import { Badge } from '@/components/ui/badge'
import { useAlert } from '@/providers/AlertProvider/AlertProvider'
import { copyToClipboard } from '@/helpers/Clipboard/copyToClipboard'
import { useModal } from '@/providers/ModalProvider/ModalProvider'
import EditUser from '@/app/components/users/EditUser'
import Container from '@/app/components/Elements/Container/Index'
import { ErrorAlert } from '@/app/components/Elements/Alert/ErrorAlert'
import CreateUser from '@/app/components/users/CreateUser'

const createColumns = (userActions) => [
  {
    id: "actions",
    header: () => <div className="text-right">פעולות</div>,
    cell: ({ row }) => {
      const user = row.original
      const { handleUpdateUser, handleMakeAdmin,handleGetMyUsers, handleDeleteUser, userData, AlertInstance, setModal,onEditUser } = userActions;
 
      const handleEdit = () => {
        setModal('עריכת משתמש', <EditUser userData={user} onEditUser={onEditUser} />)
      };


      const handleRemoveUser = async() => {
        await handleDeleteUser(user._id);
        await handleGetMyUsers();
      };
 
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
            <DropdownMenuItem onClick={handleEdit}>
              עריכה
            </DropdownMenuItem>
            <DropdownMenuItem disabled={user.isSuperAdmin || userData.isUser} onClick={async () => {
              await handleMakeAdmin(user._id)
              await handleGetMyUsers()
            }}>
              {user.isAdmin === true ? "הפוך למשתמש" : "הפוך למנהל"}
            </DropdownMenuItem>
            <DropdownMenuItem
                  onClick={() => copyToClipboard(user.phone,AlertInstance)}
                >
                  העתקת טלפון
                </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className={`${user.active ? "!text-red-500 focus:bg-red-200" : "!text-green-500 focus:bg-green-200"}`}
              disabled={user.isSuperAdmin || userData.isUser}
              onClick={handleRemoveUser}
            >
              {user.active ? "הסרת משתמש" : "הפעלת משתמש"}
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
      if(isUser) roleText = "משתמש"
      if(isAdmin) roleText = "מנהל"
      if(isSuperAdmin) roleText = "מנהל מערכת"

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
    id: "active",
    accessorKey: "active",
    header: () => <div className="text-right">סטטוס</div>,
    cell: ({ row }) => {      
      const active = row.getValue("active")
 
      return <div className="text-right font-medium">
        <Badge className={`${active ? "bg-green-400" : "bg-red-400"}`} variant='destructive'>{active ? "פעיל" : "לא פעיל"}</Badge>
      </div>
    },
    filterFn: (row, id, value) => {
      const rowValue = String(row.getValue(id));
      return value.includes(rowValue);
    },
  },
]
const ListMyUsersPage = ({userData}) => {
  const AlertInstance = useAlert();
  const {setModal} = useModal();
  const { value,handleGetMyUsers, handleUpdateUser, handleMakeAdmin, handleDeleteUser,handleCreateUser } = useUsers();
  const { isLoading, error, users } = value;

  const onEditUser = async (userId,userData) => {
    await handleUpdateUser(userId, userData);
    await handleGetMyUsers();
  };
  const onCreateUser = async (userData) => {
    await handleCreateUser(userData);
    await handleGetMyUsers();    
  };
  const handleCreateNewUser = ()=>{
    setModal('יצירת משתמש', <CreateUser onCreateUser={onCreateUser} />)
  };
  
  const columns = createColumns({
    handleUpdateUser,
    handleMakeAdmin,
    handleGetMyUsers,
    handleDeleteUser,
    AlertInstance,
    setModal,
    userData,
    onEditUser
  });  
  useEffect(() => {
      handleGetMyUsers();
  }, []);
  if(isLoading) return <Spinner/>
  return (
    <Card>
      <CardHeader>
        <CardTitle>משתמשים</CardTitle>
        <CardDescription>
          צפייה וניהול משתמשים
        </CardDescription>
        <CardAction>
          {
            userData.isAdmin && (
              <Button variant="outline" className="flex items-center gap-2" onClick={handleCreateNewUser}>
                <PlusIcon className="size-4" />
                משתמש חדש
              </Button>
            )
          }
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        {!userData.isAdmin && <Container className={`max-w-sm mx-auto`}>
          <ErrorAlert message="אינך מורשה לצפייה וניהול משתמשים" />
        </Container>}
        {userData.isAdmin && (
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ListMyUsersPage