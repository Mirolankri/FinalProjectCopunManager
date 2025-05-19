import React from 'react'

const ToolTip = ({children, tip, position = 'bottom'}) => {
  const pos = `tooltip-${position}`
  return (
    <div className={`tooltip ${pos}`} data-tip={tip}>
      {children}
    </div>
  )
}

export default ToolTip