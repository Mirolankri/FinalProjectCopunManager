import React from 'react'

const ToolTip = ({children, tip, position = 'bottom'}) => {
  return (
    <div className={`tooltip tooltip-${position}`} data-tip={tip}>{children}</div>
  )
}

export default ToolTip