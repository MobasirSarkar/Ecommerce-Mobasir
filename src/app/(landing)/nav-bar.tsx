import Image from "next/image"
import Link from "next/link"
import ecommerceLogo from "@/assets/ecommerceLogo.png"
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "@/components/shopping-cart";

export async function searchProducts(formData:FormData){
  "use server"
  const search = formData.get("search")?.toString();
  if(search){
    redirect("/search?"+search);
  }
}

export  default async function NavBar() {
  const cart = await getCart();
  return(
  <nav className="bg-base-100">
    <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-md text-xl normal-case">
            <Image src={ecommerceLogo} alt="Logo" width={40} height={40}/>
            Ecommerce
          </Link> 
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input name="search" placeholder="Search" className="input input-bordered w-full min-w-[200px]"/>
            </div>
          </form>
          <ShoppingCartButton cart={cart}/>
        </div>
      </div>
    </nav>
  )
}

export const navlinks = [
  {link:"/",name:"Home"},
]
