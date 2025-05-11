'use client'
import { twMerge } from 'tailwind-merge';

export const Skeleton = ({className,...props}) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}