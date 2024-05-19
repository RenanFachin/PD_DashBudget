import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

const items = [
  {label: "Dashboard", link: '/'},
  {label: "Transactions", link: '/transactions'},
  {label: "Manage", link: '/manage'},
]

export interface MenuItensNavbarProps{
  label: string
  link: string
}

export function Navbar(){
  return(
    <>
      <DesktopNavbar items={items}/>
      <MobileNavbar items={items}/>
    </>
  )
}