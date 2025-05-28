import React from 'react'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Container = ({children, className}) => {
  return (
    <div className={twMerge("mx-auto", className)}>
            {children}
        </div>
  )
}

Container.propTypes = {
    children: PropTypes.node.isRequired
}

export default Container