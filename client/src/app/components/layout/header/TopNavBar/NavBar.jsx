'use client'

import { Bars2Icon, BellIcon, GiftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCallback, useState } from "react";
import Link from "next/link";
import { useUser } from '@/app/components/providers/UserProvider';
import { Skeleton } from '@/app/components/Elements/Skeleton/Index';
import { removeToken } from '@/app/services/localStorageService';

const navigation = [
  { key: 'home', name: 'בית', href: '/', current: false,requiredLogin:false },
  { key: 'coupons', name: 'קופונים שלי', href: '/coupons', current: false,requiredLogin:true },
  { key: 'account', name: 'החשבון שלי', href: '/auth/account', current: false,requiredLogin:true },
  { key: 'contact', name: 'יצירת קשר', href: '/contact', current: false,requiredLogin:false },
  { key: 'about', name: 'אודות', href: '/about', current: false,requiredLogin:false },
]
const userNavigation = [
  { key: 'login', name: 'התחברות', href: '/auth/login',requiredLogin:false,onClick:null },
  { key: 'register', name: 'הרשמה', href: '/auth/register',requiredLogin:false,onClick:null },
  { key: 'logout', name: 'התנתקות', href: '/',requiredLogin:true,onClick:null },
]
export const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, loading,setToken,setUser } = useUser();

  const handleLogout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
  }, [setUser]);

  userNavigation[2].onClick = handleLogout;


  return (
    <nav className=" fixed top-0 w-full">
        <div className="bg-gray-600 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="w-full flex items-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <div className="shrink-0 flex items-center gap-2">
                  <GiftIcon className="size-8 text-white" />
                  <span className="text-white">CouPoint</span>
                </div>
              </Link>
              <div className="w-full hidden md:block">
                <div className=' flex justify-between'>
                  <div className="mr-4 flex items-center space-x-4 ">
                    {navigation.map((item) => {
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
                  <div className="mr-4 flex items-center space-x-4">
                    {userNavigation.map((item) => {
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
            </div>
            {/* user profile */}
            <div className="hidden">
              <div className="ml-4 flex items-center md:ml-6">
                <button type="button" className="hidden cursor-pointer relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6 text-white" />
                </button>

                {/* <!-- Profile dropdown --> */}
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="relative cursor-pointer flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                    >
                      <span className="sr-only">Open main menu</span>
                      <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                  </div>

                  
                    <div className={`absolute transition ease-out duration-100 ${dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'} right-0 z-100 mt-2 w-24 origin-top-right text-center rounded-md bg-white p-3 shadow-lg ring-1 ring-black/5 focus:outline-hidden`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                      {/* <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" --> */}
                      {userNavigation.map((item) => (
                        <Link key={item.name} href={item.href} className="rounded-md block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" id="user-menu-item-0">{item.name}</Link>
                      ))}
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
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`${item.requiredLogin ? 'hidden' : 'block'} block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`} aria-current={item.current ? 'page' : undefined}>{item.name}</Link>
              ))}
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
