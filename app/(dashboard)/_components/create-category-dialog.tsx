"use client"

import { TransactionType } from "@/@types/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormDescription, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface createCategoryDialogProps{
  type: TransactionType
}

export function CreateCategoryDialog({type}: createCategoryDialogProps){
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type
    }
  })
  
  return(
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="flex border-separate items-center justify-start rounded-none border-b p-3 text-muted-foreground">
          <PlusSquare className="size-4 mr-2"/>
          Criar nova categoria
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Criar categoria de: <span className={cn(
              'm-1',
              type=== 'income' ? "text-emerald-600": "text-rose-600"
            )}>
              {
                type === 'income' ? "Renda" : "Despesa"
              }
            </span>
          </DialogTitle>

          <DialogDescription>
            As categorias serão utilizadas para agrupar seus gastos/receitas
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
            <form className="space-y-8">
              <FormField 
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input defaultValue={""} {...field}/>
                      </FormControl>

                      <FormDescription>
                        Nome da categoria
                      </FormDescription>
                    </FormItem>
                  )}
                />
            </form>
        </Form>

          <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"} onClick={() => form.reset()}>
              Cancelar
            </Button>
          </DialogClose>

          <Button>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>

      
    </Dialog>
  )
}