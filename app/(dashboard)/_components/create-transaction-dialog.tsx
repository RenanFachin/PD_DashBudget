"use client"

import { TransactionType } from "@/@types/types"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction"
import { ReactNode, useCallback, useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CategoryPicker } from "./category-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateTransactions } from "../_actions/transactions"
import { toast } from "sonner"
import { dateToUTCDate } from "@/lib/helpers"

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

  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryChange = useCallback((value: string) =>{
    form.setValue("category", value)
  }, [form])


  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationFn: CreateTransactions,
    onSuccess:() => {
      toast.success("Transação adicionada com sucesso!", {
        id: "create-transaction"
      })

      form.reset({
        type,
        description: "",
        amount: 0,
        date: new Date(),
        category: undefined
      })

      // Após criação da transação
      queryClient.invalidateQueries({
        queryKey: ['overview']
      })


      setIsOpen((prev) => !prev)
    }
  })

  const onsubmit = useCallback((values: CreateTransactionSchemaType) => {
    toast.loading('Criando...', {
      id: 'create-transaction'
    })

    mutate({
      ...values,
      date: dateToUTCDate(values.date)
    })
  }, [mutate])

  return(
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <form className="space-y-4" onSubmit={form.handleSubmit(onsubmit)}>
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
                    <FormItem className="flex flex-col">
                      <FormLabel className="mr-2">Categoria</FormLabel>
                      <FormControl>
                        <CategoryPicker type={type} onChange={handleCategoryChange}/>
                      </FormControl>

                      <FormDescription>
                        Selecione a categoria
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="date"
                  render={({field}) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mr-2">Data da transação</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={'outline'} className={cn("w-[200px] pl-3 text-left", !field.value && "text-muted-foreground")}>
                                {field.value ? 
                                format(field.value, "PPP")
                                 : 
                                (<span>Selecione uma data</span>)
                                }

                                <CalendarIcon className="ml-auto size-4 opacity-50"/>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                            <Calendar 
                              mode="single" 
                              selected={field.value} 
                              onSelect={value => {

                                if(!value){
                                  return
                                }
                                // console.log("@@CALENDAR", value)
                                field.onChange(value)
                              }}
                              initialFocus 
                            />
                        </PopoverContent>
                      </Popover>

                      <FormDescription>
                        Selecione a data
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"} onClick={() => form.reset()}>
              Cancelar
            </Button>
          </DialogClose>

          <Button onClick={form.handleSubmit(onsubmit)} disabled={isPending}>
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin"/>}
          </Button>
        </DialogFooter>

        
      </DialogContent>
    </Dialog>
  )
}