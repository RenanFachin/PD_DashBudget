"use client"

import { TransactionType } from "@/@types/types"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CreateTransactionDialogProps{
  trigger: ReactNode
  type: TransactionType
}

export function CreateTransactionDialog({trigger, type}: CreateTransactionDialogProps){
  return(
    <Dialog>
      {/* O trigger para abrir o dialog vai ser o button criado, ele será passado como prop */}
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Criar nova <span className={cn("m-1", type === 'income' ?'text-emerald-600': 'text-rose-600')}>
              {
                type === 'income' ? "renda" : "despesa"
              }
            </span>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}