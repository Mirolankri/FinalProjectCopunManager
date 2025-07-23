import React from 'react'

const ToolTip = ({children, tip, position = 'top'}) => {
  const positionClasses = {
    top: 'tooltip-top',
    bottom: 'tooltip-bottom', 
    left: 'tooltip-left',
    right: 'tooltip-right'
  }
  
  const tooltipClass = positionClasses[position] || positionClasses.right
  
  return (
    <div className={`tooltip ${tooltipClass}`} data-tip={tip}>
      {children}
    </div>
  )
}

export default ToolTip