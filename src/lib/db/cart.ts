import { cookies } from "next/headers";
import prisma from "./prisma";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include:{items:{include:{product:true}}}
}>
export type CartItemsWithProduct = Prisma.CartItemGetPayload<{include:{product:true}}>

export type ShoppingCart = CartWithProducts & { size: number, subtotal: number }

export async function getCart():Promise<ShoppingCart | null> {
  const localeCartId = cookies().get("localeCartId")?.value
  const cart = localeCartId ? await prisma.cart.findUnique({
    where: { id: localeCartId },
    include: { items: { include: { product: true } } }
  }) : null
  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc,item) => acc + item.quantity * item.product.price, 0
    ),
  }
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({ data : {},})
  cookies().set("localeCartId",newCart.id);
  return {
    ...newCart,
    items: [],
    size:0,
    subtotal:0
  }
}
