import { Navbar } from "@/components/Navbar"
import { ReactNode } from "react"

interface layoutProps{
  children: ReactNode
}

export default function layout({children}: layoutProps){
  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar />
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}