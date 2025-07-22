'use client'

import { Bars2Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCallback, useState } from "react";
import Link from "next/link";
import { useUser } from '@/app/components/providers/UserProvider';
import { Skeleton } from '@/app/components/Elements/Skeleton/Index';
import { removeToken } from '@/app/services/localStorageService';
import { navigation, userNavigation } from './Menu';
import Search from './Search';
import { GiftIcon } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, loading,setToken,setUser,userData } = useUser();

  const handleLogout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
  }, [setUser]);

  userNavigation[2].onClick = handleLogout;


  return (
    <nav className="fixed top-0 w-full z-80 bg-gray-600">
        <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="w-full flex items-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <div className="shrink-0 flex items-center gap-2">
                  <GiftIcon className="size-8 text-white" />
                  <div className="text-white">CouPoint</div>
                </div>
              </Link>
              <div className="w-full hidden md:block">
                <div className=' flex justify-between'>
                  <div className="mr-4 flex items-center space-x-4">
                    {navigation.map((item) => {
                      if(!item.ShowInMenu) return null;
                      if(loading) return <Skeleton key={item.key} className={`h-5 w-16 px-3 py-2`} />
                      if(item.requiredLogin && !user) return null;
                    
                    return(
                      <Link
                        key={item.key}
                        href={item.href}
                        className={`rounded-md px-3 text-center py-2 text-sm font-medium ${item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    )})}
                  </div>
                  <Search />
                  <div className="mr-4 flex items-center space-x-4">
                    {false && userNavigation.map((item) => {
                      if(loading) return <Skeleton key={item.key} className={`h-5 w-16 px-3 py-2`} />
                      if(item.requiredLogin && !user) return null;
                      if(!item.requiredLogin && user) return null;
                      return(
                      <Link
                        key={item.key}
                        href={item.href}
                        className={` rounded-md px-3  text-center py-2 text-sm font-medium ${item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={item.onClick}
                      >
                        {item.name}
                      </Link>
                    )})}
                  </div>
                </div>
                
              </div>
              <div className="w-full md:hidden block">
                <Search />
              </div>
            </div>
            {/* user profile */}
            <div className="">
              <div className="ml-4 flex items-center md:ml-6">
                <button type="button" className="hidden cursor-pointer relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6 text-white" />
                </button>

                {/* <!-- Profile dropdown --> */}
                <div className="relative ml-3">
                  <div className='hidden md:block'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Image alt='User Profile' src="/assets/images/rabbit.png" className=" rounded-full" width={40} height={40} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-120">
                          <DropdownMenuLabel>{userData && userData.name.first}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {userNavigation.map((item) => {                            
                              if(loading) return <Skeleton key={item.key} className={`h-5 w-16 px-3 py-2`} />
                              if(item.requiredLogin && !user) return null;
                              if(!item.requiredLogin && user) return null;
                              return(
                                <DropdownMenuItem key={item.key}>
                                  <Link
                                    key={item.key}
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    onClick={() => {
                                      item.onClick?.();
                                    }}
                                  >
                                    {item.name}
                                  </Link>
                                </DropdownMenuItem>
                          )})}
                          </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
            {/* user profile */}

            <div className="-mr-2 flex md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button 
              type="button" 
              className="relative cursor-pointer inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" aria-controls="mobile-menu" aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <Bars2Icon className={`transition ease-in duration-100 transform ${mobileMenuOpen ? 'opacity-0 scale-95 hidden' : 'opacity-100 scale-100 !visible'} size-6 text-white`}
                 />
                <XMarkIcon className={`transition ease-out duration-100 transform ${mobileMenuOpen ? 'opacity-100 scale-100 ' : 'opacity-0 scale-95 hidden'} size-6 text-white`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${mobileMenuOpen?'block':'hidden'}`}>
          <div className="bg-gray-600">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => {
                if(!item.ShowInMenu) return null;
                if(loading) return <Skeleton key={item.key} className={`h-5 w-16 px-3 py-2`} />
                if(item.requiredLogin && !user) return null;
                
                return(
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`${item.requiredLogin ? 'hidden' : 'block'} block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`} 
                  aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                </Link>
              )})}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="space-y-1 px-2">
              {userNavigation.map((item) => {
                      if(loading) return <Skeleton key={item.key} className={`h-5 w-16 px-3 py-2`} />
                      if(item.requiredLogin && !user) return null;
                      if(!item.requiredLogin && user) return null;
                      return(
                      <Link
                        key={item.key}
                        href={item.href}
                        className={`block rounded-md px-3  text-right py-2 text-sm font-medium ${item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          item.onClick?.();
                        }}
                      >
                        {item.name}
                      </Link>
                    )})}
              
              </div>
            </div>
          </div>
          <div onClick={() => setMobileMenuOpen(false)} className="h-svh inset-0 bg-white/30 bg-opacity-25 backdrop-blur-sm" />
            
          
        </div>
      </nav>
  )
}
