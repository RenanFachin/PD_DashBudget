"use server"

import prisma from "@/lib/prisma";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createCategory(form: CreateCategorySchemaType){
  // Validando
  const parsedBody = CreateCategorySchema.safeParse(form)

  if(!parsedBody.success){
    throw new Error('Bad request.')
  }

  // obtendo o usuário
  const user = await currentUser()
  if(!user){
    redirect("/sign-in")
  }

  // Obtendo os dados do form
  const {name, type} = parsedBody.data


  // Validação para saber se já existe no db uma categoria com mesmo nome
  const categoryAlreadyExists = await prisma.category.findFirst({
    where:{
      name,
    }
  })

  if (categoryAlreadyExists) {
    throw new Error('Categoria já existente.');
  }

  // Criando a categoria
  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      type
    }
  })

}