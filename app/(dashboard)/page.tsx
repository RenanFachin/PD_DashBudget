import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {Plus, Minus} from 'lucide-react'
import { CreateTransactionDialog } from "./_components/create-transaction-dialog"
import { Overview } from "./_components/overview"

export default async function Dashboard(){
  // https://clerk.com/docs/references/nextjs/current-user
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  
  // Verificando a moeda que o usário especificou
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id
    }
  })

  // Caso não exista, redirecionar para ele fazer a escolha
  if(!userSettings){
    redirect("/wizard")
  }
  return(
    <div className="h-full bg-background">
      {/* Seção de nome e botões de comando */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-2xl font-bold">
            Hello, 
            <strong className="uppercase"> {user.firstName}</strong>
            👋
          </p>

          <div className="flex items-center gap-4">
            <CreateTransactionDialog type="income" trigger={
              <Button variant={"outline"} className="border-emerald-700 bg-emerald-950 text-white hover:bg-emerald-800 hover:text-white flex items-center gap-2">
              <Plus className="size-4"/>
              Nova renda
            </Button>
            }/>
              
            
            <CreateTransactionDialog type="expense" trigger={<Button variant={"outline"} className="border-rose-700 bg-rose-950 text-white hover:bg-rose-800 hover:text-white flex items-center gap-2">
              <Minus className="size-4"/>
              Nova despesa
            </Button>} />
            
          </div>
        </div>
      </div>

      <Overview userSettings={userSettings}/>
    </div>
  )
}