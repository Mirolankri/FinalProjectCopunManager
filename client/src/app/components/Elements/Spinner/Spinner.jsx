import React from 'react'
import PropTypes from 'prop-types'
import { LoaderCircle } from 'lucide-react';

const Spinner = ({ color = "text-cyan-600", size = 10, height = "100vh" }) => {
  const heightclass = `min-h-[${height}]`
  // const heightclass = `min-h-[50vh]`
  const SizeClass = `size-${size}`;
  // const SizeClass = `size-10`;
  return (
    <div className={`flex items-center justify-center ${heightclass}`}>
      <LoaderCircle className={`animate-spin ${color} ${SizeClass}`} />
      {/* <svg className={`animate-spin ${color} ${SizeClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="m1,12C1,5.92,5.92,1,12,1"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg> */}
    </div>
  )
}

Spinner.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    height: PropTypes.string
}

export default Spinner