import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: {
 children: React.ReactNode;
}) {

   const session = await auth() //obtengo la sesion con auth

   if ( session?.user ) { // si hay un usuario en la sesion lo mando al home
    redirect("/")
   }
 

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        { children }
      </div>
    </main>
  );
}