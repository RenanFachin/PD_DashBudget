import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Dashboard(){
  // https://clerk.com/docs/references/nextjs/current-user
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }
  
  return(
    <>
      <h1>Dashboard</h1>
      <p>Hello <span className="text-emerald-500">{user.fullName}</span></p>
    </>
  )
}