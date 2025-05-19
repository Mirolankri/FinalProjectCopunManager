import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

const ErrorPage = ({error}) => {
  return (
    <div className='flex items-center justify-center h-dvw text-2xl gap-2'>
        {error}
        <MagnifyingGlassIcon className="size-7" />
        </div>
  )
}

export default ErrorPage