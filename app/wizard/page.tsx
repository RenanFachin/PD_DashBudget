import { Logo } from "@/components/Logo";
import { CurrencyComboBox } from "@/components/currency-combo-box";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link";
import { redirect } from "next/navigation"

export default async function Wizard(){
  const user = await currentUser()

  function capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  if(!user){
    redirect("/sign-in")
  }

  return(
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <Logo />
      </div>

      <div>
      <h1 className="text-center text-2xl">Bem-vindo, 
        <span className="ml-2 font-bold">
          {
           capitalizeFirstLetter(user.firstName!)
          }!
        </span>
      </h1>

        <h2 className="mt-2 text-center text-muted-foreground">
          Bora definir a sua moeda atual
        </h2>


        <h3 className="mt-1 text-center text-xs text-muted-foreground">
            Lembrando que você pode alterar esta informação a qualquer momento
        </h3>
      </div>

      <Separator />

      <Card className="w-full flex items-center justify-between">
        <CardHeader>
          <CardTitle>
            Moeda
          </CardTitle>

          <CardDescription>
            Defina a sua moeda atual
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>

      <Separator/>
      <Button className="w-full" asChild>
          <Link href={"/"}>
            Pronto, Ir ao dashboard!
          </Link>
      </Button>

      
    </div>
  )
}