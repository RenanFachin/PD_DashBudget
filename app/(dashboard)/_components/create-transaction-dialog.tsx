"use client"

import { TransactionType } from "@/@types/types"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction"
import { ReactNode, useCallback } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CategoryPicker } from "./category-picker"

interface CreateTransactionDialogProps{
  trigger: ReactNode
  type: TransactionType
}

export function CreateTransactionDialog({trigger, type}: CreateTransactionDialogProps){
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type: type,
      date: new Date(),
    }
  })

  const handleCategoryChange = useCallback((value: string) =>{
    form.setValue("category", value)
  }, [form])

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


        <Form {...form}>
            <form className="space-y-4">
              <FormField 
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input defaultValue={""} {...field}/>
                    </FormControl>

                    <FormDescription>
                      Descrição da transação
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="amount"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input defaultValue={0} type="number" {...field}/>
                    </FormControl>

                    <FormDescription>
                      Valor total da transação
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between gap-2">
                <FormField 
                  control={form.control}
                  name="category"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="mr-2">Categoria</FormLabel>
                      <FormControl>
                        <CategoryPicker type={type} onChange={handleCategoryChange}/>
                      </FormControl>

                      <FormDescription>
                        Selecionar a categoria
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}