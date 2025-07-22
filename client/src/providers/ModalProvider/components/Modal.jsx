'use client'
import Button from '@/app/components/Elements/Button/Index'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'

const Modal = ({title,body, setOpen}) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
   


    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      };
    return (
        <div
          className="fixed inset-0  flex top-0 right-0 left-0 z-998 items-center justify-center bg-white/30 bg-opacity-25 backdrop-blur-sm"
          onClick={handleBackgroundClick}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-[100vh] overflow-y-auto ">
            <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-700 ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white w-full">
                        {title || " "}
                    </h3>
                    <div className='w-12 h-12'>
                        <Button  variant={'link'} onClick={() => setOpen(false)}>
                            <XMarkIcon className="size-6" />
                        </Button>
                    </div>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    {body}
                </div>
            </div>
        </div>
        </div>
      );

  return (
    <>
    <div onClick={() => setOpen(false)} tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-998 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/30 bg-opacity-25 backdrop-blur-sm" />

    <div className="fixed flex justify-center items-center p-0 w-full h-full z-999">
        <div className="relative p-4 w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-700 ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white w-full">
                        {title || " "}
                    </h3>
                    <div className='w-12 h-12'>
                        <Button  variant={'link'} onClick={() => setOpen(false)}>
                            <XMarkIcon className="size-6" />
                        </Button>
                    </div>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    {body}
                </div>
                {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                    <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                </div> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default Modal