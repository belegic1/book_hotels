"use client";
import React, { useState, useEffect } from 'react'
interface ClientOnlyProps{
  children: React.ReactNode
}
const ClientOnly:React.FC<ClientOnlyProps> = ({children}) => {
  const [hasMountend, setHasMountend] = useState(false)
  useEffect(() => {
    setHasMountend(true)
  }, [])
  if (!hasMountend) return null;
  return (
    <>{ children}</>
  )
}

export default ClientOnly