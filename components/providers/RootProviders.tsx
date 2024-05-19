"use client"

import { ReactNode } from "react"
import {ThemeProvider} from 'next-themes'

interface RootProviderProps{
  children: ReactNode
}

export function RootProvider({children}: RootProviderProps){
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}