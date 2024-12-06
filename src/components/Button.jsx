import React from 'react'

const Button = ({
    children,
    className,
    buttonClick,
    ...props
},ref) => {

  
  return (
   <button className={`text-white ${className}`}
   ref={ref}
   onClick = {buttonClick}
   >
        {children}
    
   </button>
  )
}

export default React.forwardRef(Button)