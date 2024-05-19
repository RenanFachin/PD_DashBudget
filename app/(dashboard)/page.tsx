import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Dashboard(){
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }
  
  return(
    <>
      <h1>Dashboard</h1>
      <p>{user.fullName}</p>
    </>
  )
}