"use server"

import prisma from "@/lib/prisma";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransactions(data: CreateTransactionSchemaType){
  const parsedBody = CreateTransactionSchema.safeParse(data)

  if(!parsedBody.success){
    throw new Error(parsedBody.error.message)
  }

   // obtendo o usuário
   const user = await currentUser()
   if(!user){
     redirect("/sign-in")
   }

   // Desestruturando
   const {amount, category, date, type, description} = parsedBody.data

   // Validando a categoria
   const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category
    }
   })

   if(!categoryRow){
    throw new Error('Categoria não encontrada')
   }

   // Criando a transação
   // Ao utilizar a $transactions,  todas as operações passadas como argumento são executadas dentro de uma única transação. Caso falhe, terá um rollback
   // prisma.transaction é a tabela em si
   await prisma.$transaction([
    // criar a userTransactions
    prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        date,
        description: description || '',
        type,
        category: categoryRow.name,
      }
    }),

    // Fazer o update das aggregates table (MonthHistory e YearHistory)
    // UPSERT -> combinação entre update e insert, recebe 3 dados: where, create e update
    prisma.monthHistory.upsert({
      where:{
        day_month_year_userId: {
          userId: user.id, 
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear()
        }
      },
      create: {
        userId: user.id,
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        expense: type === 'expense' ? amount : 0,
        income: type === 'income' ? amount : 0,
      },
      update: {
        expense: {
          increment: type === 'expense' ? amount : 0
        },
        income: {
          increment: type === 'income' ? amount : 0
        }
      }
    }),

    prisma.yearHistory.upsert({
      where:{
        month_year_userId: {
          userId: user.id, 
          month: date.getUTCMonth(),
          year: date.getUTCFullYear()
        }
      },
      create: {
        userId: user.id,
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        expense: type === 'expense' ? amount : 0,
        income: type === 'income' ? amount : 0,
      },
      update: {
        expense: {
          increment: type === 'expense' ? amount : 0
        },
        income: {
          increment: type === 'income' ? amount : 0
        }
      }
    })
   ])
}