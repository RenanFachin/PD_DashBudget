"use-client"

import { TransactionType } from "@/@types/types"
import { Button } from "@/components/ui/button"
import { Command, CommandInput } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { CreateCategoryDialog } from "./create-category-dialog"

interface CategoryPickerProps{
  type: TransactionType
}

export function CategoryPicker({type}: CategoryPickerProps){
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")
 
  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then(response => response.json())
  })

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  )

  return(
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} role="combobox" aria-expanded={isOpen} className="w-[200px] justify-between">
          {
            selectedCategory ? <CategoryRow category={selectedCategory}/> : "Selecionar categoria"
          }
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
          <Command onSubmit={event => event.preventDefault()}>
            <CommandInput placeholder="Procurar categoria..."/>

            {/* Criar nova categoria com um novo dialog */}
            <CreateCategoryDialog type={type}/>
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