 "use server"

import { createCart, getCart } from "@/lib/db/cart"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";


export async function setProductQuantity(productId:string,quantity:number){
  const cart = (await getCart()) ?? (await createCart());

  const articleCart = cart.items.find((item) => item.productId === productId);

  if(quantity === 0) {
    if (articleCart) {
      await prisma.cartItem.delete({
        where:{id:articleCart.id}
      })
    }
  }else{
    if(articleCart){
      await prisma.cartItem.update({
        where:{id:articleCart.id},
        data:{quantity}
      })
    }else{
      await prisma.cartItem.create({
        data:{
          cartId: cart.id,
          productId,
          quantity,
        }
      })
    }
  }
  revalidatePath("/cart")
}
