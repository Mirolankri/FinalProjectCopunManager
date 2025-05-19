import React from 'react'

const Badge = ({children,color = 'bg-gray-50',size = 'xs'}) => {
  return (
    <span className={`inline-flex items-center rounded-md ${color} px-2 py-1 text-${size} font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset `}>
        {children}
      </span>
  )
}

export default Badge