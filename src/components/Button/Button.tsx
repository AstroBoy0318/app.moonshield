import React from 'react'

const Button = ( props ) => {
  const { children,className,disabled } = props
  return (
    <button type="button" {...props} className={"bg-gradient-to-r from-green-500 to-blue-400 hover:from-green-500 hover:via-blue-400 hover:to-green-500 text-white px-5 py-2 rounded-full focus:outline-none text-sm ".concat(disabled?"cursor-not-allowed opacity-50 ":"").concat(className)}>
      {children}
    </button>
  )
}

export default Button