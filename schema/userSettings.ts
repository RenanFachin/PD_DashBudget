import { Currencies } from '@/lib/currencies'
import {z} from 'zod'

export const UpdatedUserCurrencySchema = z.object({
  currency: z.custom(value => {
    const found = Currencies.some(currency => currency.value === value)

    if(!found){
      throw new Error('Invalid currency')
    }

    return value
  })
})