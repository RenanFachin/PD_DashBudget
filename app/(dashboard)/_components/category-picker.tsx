"use-client"

import { TransactionType } from "@/@types/types"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { CreateCategoryDialog } from "./create-category-dialog"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown} from 'lucide-react'

interface CategoryPickerProps{
  type: TransactionType
  onChange: (value: string) => void
}

export function CategoryPicker({type, onChange}: CategoryPickerProps){
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
    if(!value) {
      return
    }

    onChange(value)
  }, [onChange, value])
 
  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then(response => response.json())
  })

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  )

  const successCallback = useCallback(
    (category: Category) =>{
      setValue(category.name)
      setIsOpen((prev)=> !prev)
    }, [setValue, setIsOpen])


  return(
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} role="combobox" aria-expanded={isOpen} className="w-[200px] justify-between">
          {
            selectedCategory ? <CategoryRow category={selectedCategory}/> : "Selecionar categoria"
          }

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
          <Command onSubmit={event => event.preventDefault()}>
            <CommandInput placeholder="Procurar categoria..."/>

            {/* Criar nova categoria com um novo dialog */}
            <CreateCategoryDialog type={type} onSuccessCallback={successCallback}/>

            {/* Caso existam categorias cadastrada, será exibido */}
            <CommandEmpty>
              <p>Categoria não encontrada</p>
              <p className="text-xs text-muted-foreground">
                Dica: Crie uma nova categoria
              </p>
            </CommandEmpty>

            {/* Caso exista */}
            <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setIsOpen((prev) => !prev);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 w-4 h-4 opacity-0 text-emerald-500",
                        value === category.name && "opacity-100"
                      )}
                    />

                    <CategoryRow category={category} />
                  </CommandItem>
                ))}
            </CommandList>
            </CommandGroup>
          </Command>
      </PopoverContent>
    </Popover>
  )
}


function CategoryRow({category}: {category:Category}){
  return(
    <div className="flex items-center gap-2">
      <span>
        {category.name}
      </span>
    </div>
  )
}