import { UserButton } from "@clerk/nextjs";
import { Logo } from "../Logo";
import { NavbarItem } from "./navbar-item";
import { ThemeSwitcherButton } from "../theme-switcher-button";
import { MenuItensNavbarProps } from ".";

interface DesktopNavbarProps{
  items: MenuItensNavbarProps[]
}

export function DesktopNavbar({items}: DesktopNavbarProps){
  return(
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-20 min-h-16 items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
          {
            items.map(item => (
              <NavbarItem 
                key={item.label} 
                link={item.link}
                label={item.label}
              />
            ))
          }
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcherButton />

          {/* https://clerk.com/docs/components/user/user-button */}
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  )
}