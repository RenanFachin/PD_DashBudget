import { ReactNode } from "react"
import { Skeleton } from "./ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonWrapperProps{
  children: ReactNode,
  isLoading: boolean,
  fullWidth?: boolean
}

export function SkeletonWrapper({children, isLoading, fullWidth=true}: SkeletonWrapperProps){
  if(!isLoading){
    return children
  }

  return(
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-0">
        {children}
      </div>
    </Skeleton>
  )
}