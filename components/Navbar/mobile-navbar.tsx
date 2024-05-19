"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import { Logo, LogoMobile } from "../Logo"
import { MenuItensNavbarProps } from "."
import { NavbarItem } from "./navbar-item"
import { ThemeSwitcherButton } from "../theme-switcher-button"
import { UserButton } from "@clerk/nextjs"

interface MobileNavbarProps{
  items: MenuItensNavbarProps[]
}

export function MobileNavbar({items}: MobileNavbarProps){
  const [isOpen, setIsOpen] = useState(false)

  return(
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-96 sm:w-[540px]" side="left">
            <Logo />

            <div className="flex flex-col gap-1 pt-4">
              {items.map(item => (
                <NavbarItem 
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  clickCallback={() => setIsOpen(prev=> !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex h-20 min-h-[60px] items-center gap-x-4">
            <LogoMobile />

            <div className="flex items-center gap-2">
              <ThemeSwitcherButton />
              <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </div>
      </nav>
    </div>
  )
}