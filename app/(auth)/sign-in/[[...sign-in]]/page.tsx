import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
  <SignIn 
    path="/sign-in"
    fallbackRedirectUrl={'/wizard'}
    appearance={{
      elements: {
        formButtonPrimary: "bg-emerald-500 hover:bg-emerald-400"
      }
    }} 
  />
  )
}