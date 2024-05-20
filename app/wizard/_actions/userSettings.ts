"use server"

import prisma from "@/lib/prisma"
import { UpdatedUserCurrencySchema } from "@/schema/userSettings"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function UpdateUserCurrency(currency: string){
  const parsedBody = UpdatedUserCurrencySchema.safeParse({
    currency
  })

  // throw new Error('teste do toast de onError da mutation')

  if(!parsedBody.success){
    throw parsedBody.error
  }

  const user = await currentUser()
  if(!user){
    redirect("/sign-in")
  }

  // Atualizando as configurações do usuário
  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.id
    },
    data: {
      currency
    }
  })

  return userSettings
}