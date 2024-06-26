import { AddtoCartButton } from "@/components/add-cart";
import PriceTag from "@/components/price-tag";
import prisma from "@/lib/db/prisma"
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation"
import { cache } from "react";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  params: {
    id: string,
  },
}
const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound();
  return product;
})



export async function generateMetadata({params:{id}}:ProductPageProps): Promise<Metadata> {
 const product = await getProduct(id);
  return {
    title:product.name + " - Ecommerce",
    description: product.description,
    openGraph:{
      images:[{url:product.imageUrl}]
    }
  }
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image src={product.imageUrl} alt={product.name} width={500} height={300} className="rounded-lg object-cover" priority />
      <div>
        <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
        <PriceTag price={product.price} />
        <p className="py-6">{product.description}</p>
        <AddtoCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity} />
      </div>
    </div>
  )
}
