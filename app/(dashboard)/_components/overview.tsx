"use client"

import { DateRangePicker } from "@/components/ui/date-range-picker"
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants"
import { UserSettings } from "@prisma/client"
import { differenceInDays, startOfMonth } from "date-fns"
import { useState } from "react"
import { toast } from "sonner"

interface OverviewProps{
  userSettings: UserSettings
}

interface dateRageProps {
  from: Date
  to: Date
}

const initialValues = {from: startOfMonth(new Date), 
  to: new Date()}

export function Overview({userSettings}: OverviewProps){
  const [dateRange, setDateRange] = useState<dateRageProps>(initialValues)

  return (
    <>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker 
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={dateValues => {
              // Obtendo os dados de from e to selecionados
              const {from, to} = dateValues.range
              // console.log(from, to)

              if(!from || !to){
                return
              }

              if(differenceInDays(to, from) > MAX_DATE_RANGE_DAYS){
                toast.error(`O intervalo de datas selecionadas é maior que o permitido pelo sistema.`)

                return 
              }

              // Passando por todas validações, fazer o update
              setDateRange({from, to})
            }}
          />
        </div>
      </div>
    </>
  )
}