import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'
interface WrapperProps {
    className?:string,
    children:ReactNode
}
export const Wrapper:React.FC<WrapperProps>=({className,children}) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20',className)}>
        {children}
    </div>
  )
}
