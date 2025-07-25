'use client'
import React, { useEffect } from 'react'
import Button from '@/app/components/Elements/Button/Index'
import { XMarkIcon } from '@heroicons/react/24/outline'

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
          <div className="relative p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto ">
            <div className="relative  bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-700 ">
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
}

export default Modal