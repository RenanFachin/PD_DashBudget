"use client"

import { TransactionType } from "@/@types/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormDescription, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusSquare } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createCategory } from "../_actions/categories";
import { Category } from "@prisma/client";
import { toast } from "sonner";

interface createCategoryDialogProps{
  type: TransactionType
  onSuccessCallback: (category: Category) => void
}

export function CreateCategoryDialog({type, onSuccessCallback}: createCategoryDialogProps){
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type
    }
  })


  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationFn: createCategory,
    onSuccess: async (data: Category) => {
      form.reset({
        name: "",
        type,
      });

      toast.success(`Categoria ${data.name} adicionar com sucesso! 🎉`, {
        id: "create-category",
      });

      onSuccessCallback(data)

      /* 
      Ao invalidar as consultas relacionadas à criação de categoria, é garantido que a aplicação faça um novo fetch, com as informações mais atualizadas. Isso é crucial para manter a consistência dos dados apresentados ao usuário, especialmente após operações que alteram o estado dos dados no servidor.
      */
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setIsOpen((prev) => !prev);
    },
    onError: (error) => {
      if(error.message.includes('Categoria já existente.')){
      toast.error('Categoria já existente.', {
        id: "create-category",
      })
      } else {
        toast.error("Algo inesperado aconteceu...", {
          id: "create-category",
        });
      }
  }
  });
  
  const handleSubmitForm = useCallback((data: CreateCategorySchemaType) => {
    toast.loading("Criando a categoria...", {
      id: "create-category"
    })

    // Fazendo a chamada para a mutate mandando os dados do formulário
    mutate(data)

  }, [mutate])
  
  
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
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-8">
              <FormField 
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Categoria" defaultValue={""} {...field}/>
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

          <Button onClick={form.handleSubmit(handleSubmitForm)} disabled={isPending}>
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin"/>}
          </Button>
        </DialogFooter>
      </DialogContent>

      
    </Dialog>
  )
}