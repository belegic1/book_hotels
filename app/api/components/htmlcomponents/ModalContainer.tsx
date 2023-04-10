import React from 'react'

interface ModalContainerProps{
  children: React.ReactNode
}
const ModalContainer:React.FC<ModalContainerProps> = ({children}) => {
  return (
    <div className='flex flex-col gap-8'>{children}</div>
  )
}

export default ModalContainer