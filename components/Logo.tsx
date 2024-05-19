import { PiggyBank } from "lucide-react";

export function Logo(){
  return(
    <a href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke size-10 stroke-emerald-500 stroke-2"/>
      <p className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        DashBudget
      </p>
    </a>
  )
}

export function LogoMobile(){
  return(
    <a href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        DashBudget
      </p>
    </a>
  )
}