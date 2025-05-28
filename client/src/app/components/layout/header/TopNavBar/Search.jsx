'use client'
import React, { useState } from 'react'
import Input from '@/app/components/Elements/Forms/components/Input/Input'
import { useUser } from '@/app/components/providers/UserProvider';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
    // const [search, setSearch] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const handleChange = ({target}) => {
        const ValueParams = target.value;        
        if(ValueParams === ''){
            const params = new URLSearchParams(searchParams.toString())
            params.delete('q')
            return router.push(`${pathname}`)
        }
        const params = new URLSearchParams(searchParams.toString())
        params.set('q', ValueParams)
        router.push(`/coupons?${params.toString()}`)
    }
  
    const { user } = useUser();
    if(!user) return null;
  return (
    <div className=" mr-4 flex items-center space-x-4">
      <div className="">
        <div className={` outline-gray-300 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-600`}>
          <div className="mr-2 shrink-0 text-base text-gray-500 select-none sm:text-sm/6 size-5">
            <MagnifyingGlassIcon className="size-5" />
          </div>
         

          <input
            id="search"
            name="search"
            type="text"
            // value={searchParams.get('q') ?? ''}
            onChange={ handleChange }
            autoComplete='off'
            placeholder="חיפוש"
            className="block min-w-0 w-1/2 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          
        </div>
        
      </div>
    </div>
  )
}

export default Search