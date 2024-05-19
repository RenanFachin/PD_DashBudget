"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "../ui/button"

interface NavbarItemProps{
  link: string
  label: string
  clickCallback?: () => void
}

export function NavbarItem({link, label, clickCallback}: NavbarItemProps){
  // Verificando o path atual para estilizar condiconalmente o atual link no navbar
  const pathname = usePathname()
  const isActive = pathname === link

  return(
    <div className="relative flex items-center">
      <Link 
        href={link} 
        className={
          cn(buttonVariants({variant: "ghost"}),
          "w-full justify-start text-muted-foreground hover:text-foreground",
          isActive && "text-foreground" // aplicando a estilização condicional
        )}
        onClick={() => {
          if(clickCallback){
            clickCallback()
          }
        }}
        >
        {label}
      </Link>

      {
        isActive && (
          <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"/>
        )
      }
    </div>
  )
}