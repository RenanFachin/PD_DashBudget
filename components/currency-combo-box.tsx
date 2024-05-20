"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Currencies, Currency } from "@/lib/currencies"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SkeletonWrapper } from "./skeleton-wrapper"
import { UserSettings } from "@prisma/client"
import { useCallback, useEffect } from "react"
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings"
import { toast } from "sonner"


export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  )

  // Tipando o userSettings com a tipagem que o prisma cria ao gerar o model
  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then(response => response.json())
  })
  
  //  console.log('@@@ USER SETTINGS', userSettings)
  useEffect(() => {
    if (!userSettings.data){
      return
    }
  

    const userCurrency = Currencies.find((currency) => currency.value === userSettings.data.currency)
    
    // Caso exista a moeda definida no banco de dados nas moedas disponíveis
    // Definir a seleção do combobox
    if(userCurrency){
      setSelectedOption(userCurrency)
    }
  }, [userSettings.data])
  
  // Utilizando o serverAction para realizar o update
  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success(`Moeda atualizada com sucesso`, {
        id: 'update-currency'
      })


      // Atualizando
      setSelectedOption(Currencies.find((currency) => currency.value === data.currency) || null) 
    },
    onError: (error) => {
      toast.error(`Algo deu errado`, {
        id: 'update-currency'
      })
    }
  })



  const selectOption = useCallback((currency: Currency | null) => {
    if(!currency){
      toast.error("Selecione uma moeda.")
      return
    }

    // Transformando a mensagem de erro em sucesso ou erro de acordo com o retorno
    toast.loading('Atualizando sua moeda...', {
      id: 'update-currency'
    })

    mutation.mutate(currency.value)
  }, [mutation])

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-[200px] justify-start"
              disabled={mutation.isPending}
            >
              {selectedOption ? <>{selectedOption.label}</> : <>Definir moeda</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <OptionList 
              setOpen={setOpen} 
              setSelectedOption={selectOption} 
            />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    )
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            disabled={mutation.isPending}
          >
            {selectedOption ? <>{selectedOption.label}</> : <>Definir moeda</>}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <OptionList 
              setOpen={setOpen} 
              setSelectedOption={selectOption} 
            />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  )
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void
  setSelectedOption: (status: Currency | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filtrar moedas" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency: Currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                setSelectedOption(
                  Currencies.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
