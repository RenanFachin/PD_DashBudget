import { Logo } from "@/components/Logo"
import { ReactNode } from "react"

interface layoutProps{
  children: ReactNode
}

export default function layout({children}: layoutProps){
  
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Logo />
      <div className="mt-10">
        {children}
      </div>
    </div>
  )
}